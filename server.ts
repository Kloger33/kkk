import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolvePort(isProduction: boolean): number {
  const portFlagIndex = process.argv.indexOf('--port');
  if (portFlagIndex !== -1 && process.argv[portFlagIndex + 1]) {
    const parsed = parseInt(process.argv[portFlagIndex + 1], 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  const portEqArg = process.argv.find((arg) => arg.startsWith('--port='));
  if (portEqArg) {
    const parsed = parseInt(portEqArg.split('=')[1], 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (isProduction && process.env.PORT) {
    const parsed = parseInt(process.env.PORT, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return 3000;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  const httpServer = http.createServer(app);
  const isProduction = process.env.NODE_ENV === 'production';
  const PORT = resolvePort(isProduction);

  // 1. Core Middlewares (lightweight, synchronous)
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 2. Defer heavy backend & Vite module loading until after port is bound
  let backendReadyPromise: Promise<import('express').Router> | null = null;
  const ensureBackendReady = () => {
    if (!backendReadyPromise) {
      backendReadyPromise = (async () => {
        const [{ initDatabase }, { apiRouter }] = await Promise.all([
          import('./src/server/database'),
          import('./src/server/routes'),
        ]);
        initDatabase();
        return apiRouter;
      })().catch((err) => {
        console.error('Failed to initialize backend/database:', err);
        process.exit(1);
      });
    }
    return backendReadyPromise;
  };

  app.use('/api', async (req, res, next) => {
    try {
      const apiRouter = await ensureBackendReady();
      apiRouter(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  // 3. Vite Dev Server or Production Static Serving
  type ViteDevServer = import('vite').ViteDevServer;
  let viteInstance: ViteDevServer | null = null;
  let viteReadyPromise: Promise<ViteDevServer> | null = null;

  const ensureViteReady = (): Promise<ViteDevServer> => {
    if (!viteReadyPromise) {
      viteReadyPromise = import('vite')
        .then(({ createServer: createViteServer }) =>
          createViteServer({
            server: {
              middlewareMode: true,
              hmr: false,
              ws: false,
              watch: null,
              allowedHosts: true,
            },
            appType: 'spa',
          })
        )
        .then((vite) => {
          viteInstance = vite;
          console.log('[Server] Vite middleware mounted for development');
          return vite;
        })
        .catch((err) => {
          console.error('[Server] Failed to initialize Vite middleware:', err);
          process.exit(1);
          throw err;
        });
    }
    return viteReadyPromise;
  };

  if (!isProduction) {
    app.use(async (req, res, next) => {
      try {
        const vite = viteInstance ?? (await ensureViteReady());
        vite.middlewares(req, res, next);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
    console.log(`[Server] Serving production static files from ${distPath}`);
  }

  // 4. Bind port immediately so startup health checks pass without delay
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Production-Ready Express + SQLite Backend running on http://0.0.0.0:${PORT}`);
    console.log(`📡 API Endpoints live at http://0.0.0.0:${PORT}/api`);

    // Warm up SQLite/routes and Vite immediately after socket bind
    setImmediate(() => {
      void ensureBackendReady();
      if (!isProduction) {
        void ensureViteReady();
      }
    });
  });

  // 5. Graceful shutdown so port 3000 releases cleanly on restarts
  const shutdown = async () => {
    if (viteInstance) {
      await viteInstance.close().catch(() => {});
    }
    httpServer.close(() => process.exit(0));
    httpServer.closeAllConnections?.();
    setTimeout(() => process.exit(0), 1000).unref();
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
