// Native Node 22 CDP screenshot script
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9222;

async function run() {
  console.log('Launching Edge headless...');
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\1026229c-9e05-4201-b264-80af40d4ba21\\scratch\\edge_profile',
    'about:blank'
  ]);

  // Wait for CDP to be available
  let wsUrl = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error('Failed to get WebSocket debugger URL');
    edge.kill();
    process.exit(1);
  }

  console.log('Connected to CDP at', wsUrl);
  const ws = new WebSocket(wsUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let msgId = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      cb(msg);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Create new target for mobile sheet open
  async function capture(url, width, height, scrollSelector, outputPath) {
    console.log(`Navigating to ${url} at ${width}x${height}...`);
    const target = await send('Target.createTarget', { url: 'about:blank', width, height });
    const targetWsUrl = `ws://127.0.0.1:${PORT}/devtools/page/${target.targetId}`;
    
    const pageWs = new WebSocket(targetWsUrl);
    await new Promise(r => pageWs.onopen = r);

    let pId = 1;
    const pCbs = new Map();
    pageWs.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && pCbs.has(m.id)) {
        const cb = pCbs.get(m.id);
        pCbs.delete(m.id);
        cb(m);
      }
    };
    function pSend(method, params = {}) {
      return new Promise(r => {
        const id = pId++;
        pCbs.set(id, r);
        pageWs.send(JSON.stringify({ id, method, params }));
      });
    }

    await pSend('Page.enable');
    await pSend('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
      fitWindow: false
    });

    await pSend('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 2000)); // Allow render & animation

    if (scrollSelector) {
      await pSend('Runtime.evaluate', {
        expression: `
          const el = document.querySelector('${scrollSelector}');
          if (el) { el.scrollIntoView(); }
        `
      });
      await new Promise(r => setTimeout(r, 800));
    }

    const snap = await pSend('Page.captureScreenshot', { format: 'png' });
    if (snap.result && snap.result.data) {
      fs.writeFileSync(outputPath, Buffer.from(snap.result.data, 'base64'));
      console.log(`Saved screenshot to ${outputPath}`);
    } else {
      console.error('Screenshot failed', snap);
    }

    await pSend('Target.closeTarget', { targetId: target.targetId });
    pageWs.close();
  }

  const baseDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\1026229c-9e05-4201-b264-80af40d4ba21';

  // 1. Desktop Filters Bar (1440x900 scrolled to filters section)
  await capture(
    'http://localhost:3000/?price=under8&superTutor=true',
    1440,
    900,
    '#tutors-section',
    path.join(baseDir, 'desktop_filters_1440.png')
  );

  // 2. Mobile Filters Closed (390x844 scrolled to filters)
  await capture(
    'http://localhost:3000/?price=under8',
    390,
    844,
    '#tutors-section',
    path.join(baseDir, 'mobile_filters_closed_390.png')
  );

  // 3. Mobile Filters Sheet Open (390x844 with sheet opened)
  await capture(
    'http://localhost:3000/?sheet=filters',
    390,
    844,
    null,
    path.join(baseDir, 'mobile_filters_sheet_open_390.png')
  );

  console.log('All screenshots captured successfully!');
  ws.close();
  edge.kill();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
