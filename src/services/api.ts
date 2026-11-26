/**
 * apiFetch: one place for calls to our own /api routes.
 * - Adds the saved login token as `Authorization: Bearer <token>`.
 * - Sends JSON bodies with the right header.
 * - On 401, tells AuthContext to log the user out (event `kto:unauthorized`).
 */
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  const token = localStorage.getItem('kto_auth_token');
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (init.body && typeof init.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(path, { ...init, headers });
  if (res.status === 401 && token) {
    window.dispatchEvent(new Event('kto:unauthorized'));
  }
  return res;
}
