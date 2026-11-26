import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Database, 
  Key, 
  Lock, 
  UserPlus, 
  LogIn, 
  LogOut, 
  Plus, 
  Trash2, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  RefreshCw,
  Copy,
  Layers,
  FileCode,
  ShieldCheck
} from 'lucide-react';

interface ApiConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DataItem {
  id: number;
  user_id: number;
  title: string;
  payload: any;
  created_at: string;
}

export const ApiConsoleModal: React.FC<ApiConsoleModalProps> = ({ isOpen, onClose }) => {
  // Auth state
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('engineer@khmertutors.com');
  const [password, setPassword] = useState('SecurePassword2026!');
  const [token, setToken] = useState<string>(() => localStorage.getItem('kto_jwt_token') || '');
  const [userProfile, setUserProfile] = useState<{ id: number; email: string; created_at?: string } | null>(null);

  // Data Store state
  const [items, setItems] = useState<DataItem[]>([]);
  const [newTitle, setNewTitle] = useState('Khmer Conversational Module 1');
  const [newPayload, setNewPayload] = useState('{\n  "level": "Intermediate",\n  "topic": "Marketplace Bargaining",\n  "price": 9\n}');

  // UI status
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<string>('Ready to test live backend endpoints.');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [healthStatus, setHealthStatus] = useState<any>(null);

  // Check health and user on mount
  useEffect(() => {
    if (isOpen) {
      fetchHealth();
      if (token) {
        fetchCurrentUser();
        fetchData();
      }
    }
  }, [isOpen, token]);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealthStatus(data);
    } catch (err: any) {
      setHealthStatus({ status: 'offline', error: err.message });
    }
  };

  const fetchCurrentUser = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUserProfile(data.user);
      } else {
        // Token expired or invalid
        handleLogout();
      }
    } catch {
      // ignore
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiResponse('Calling POST /api/auth/register...');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));

      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('kto_jwt_token', data.token);
        setUserProfile(data.user);
      }
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiResponse('Calling POST /api/auth/login...');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));

      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('kto_jwt_token', data.token);
        setUserProfile(data.user);
        setTimeout(() => fetchData(data.token), 100);
      }
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setUserProfile(null);
    setItems([]);
    localStorage.removeItem('kto_jwt_token');
    setApiResponse('Logged out. Token cleared from client.');
  };

  const fetchData = async (authToken = token) => {
    if (!authToken) return;
    setLoading(true);
    try {
      const res = await fetch('/api/data', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const result = await res.json();
      setApiResponse(JSON.stringify(result, null, 2));
      if (res.ok && Array.isArray(result.data)) {
        setItems(result.data);
      }
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);

    let parsedPayload: any = newPayload;
    try {
      parsedPayload = JSON.parse(newPayload);
    } catch {
      parsedPayload = newPayload;
    }

    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ title: newTitle, payload: parsedPayload }),
      });
      const result = await res.json();
      setApiResponse(JSON.stringify(result, null, 2));
      if (res.ok) {
        fetchData();
        setNewTitle('Lesson Record ' + (items.length + 1));
      }
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = async (id: number) => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/data/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      setApiResponse(JSON.stringify(result, null, 2));
      if (res.ok) {
        fetchData();
      }
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleExportDownload = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/data/export', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json();
        setApiResponse(JSON.stringify(err, null, 2));
        return;
      }

      // Download real attachment
      const blob = await res.blob();
      const contentDisposition = res.headers.get('Content-Disposition') || '';
      let filename = `user_export_${Date.now()}.json`;
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) filename = match[1];

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setApiResponse(`Successfully downloaded export attachment: "${filename}"`);
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-5xl rounded-2xl shadow-2xl text-slate-100 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Live SQLite & Express Backend API Console
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  REAL DB ACTIVE (No Mocks)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Connected to SQLite at <code className="text-teal-300">data/app.sqlite</code> with bcrypt password hashing and JWT authentication.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchHealth}
              title="Refresh health status"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Database Health Pill */}
        <div className="px-6 py-2 bg-slate-950/60 border-b border-slate-800 text-xs flex flex-wrap items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {healthStatus?.database || 'SQLite Active'}
            </span>
            <span className="text-slate-400">
              Tables: <strong className="text-slate-200">users</strong>, <strong className="text-slate-200">data_store</strong>
            </span>
          </div>
          <div className="text-slate-400">
            Auth: <strong className="text-amber-400">JWT (HS256)</strong> + <strong className="text-amber-400">bcrypt (10 rounds)</strong>
          </div>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          
          {/* Left Column: Actions & Forms (7 cols) */}
          <div className="lg:col-span-7 p-6 space-y-6 overflow-y-auto">
            
            {/* Step 1: Authentication */}
            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-slate-200">
                    1. Authentication ({userProfile ? 'Authenticated' : 'Logged Out'})
                  </h3>
                </div>
                {userProfile ? (
                  <button
                    onClick={handleLogout}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-500/10 px-2 py-1 rounded-md border border-rose-500/20"
                  >
                    <LogOut className="w-3 h-3" /> Logout
                  </button>
                ) : (
                  <div className="flex bg-slate-900 rounded-lg p-0.5 text-xs">
                    <button
                      onClick={() => setAuthMode('login')}
                      className={`px-2.5 py-1 rounded-md ${authMode === 'login' ? 'bg-teal-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setAuthMode('register')}
                      className={`px-2.5 py-1 rounded-md ${authMode === 'register' ? 'bg-teal-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>

              {userProfile ? (
                <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-3 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Signed in as:</span>
                    <strong className="text-emerald-300 font-mono">{userProfile.email}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Database User ID:</span>
                    <span className="text-emerald-400 font-mono">#{userProfile.id}</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-700/40">
                    <span className="text-slate-400">JWT Token:</span>
                    <button
                      onClick={() => copyToClipboard(token)}
                      className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-mono text-[11px]"
                    >
                      <Copy className="w-3 h-3" /> {copyFeedback ? 'Copied!' : `${token.slice(0, 16)}...`}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        placeholder="user@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">
                      {authMode === 'login' 
                        ? 'Checks bcrypt hash in SQLite database.' 
                        : 'Stores bcrypt password hash in users table.'}
                    </span>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {authMode === 'login' ? <LogIn className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                      {authMode === 'login' ? 'POST /api/auth/login' : 'POST /api/auth/register'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Step 2: Live CRUD Operations */}
            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-400" />
                  <h3 className="text-sm font-semibold text-slate-200">
                    2. Data Store CRUD (POST /api/data & GET /api/data)
                  </h3>
                </div>
                {token && (
                  <button
                    onClick={() => fetchData()}
                    disabled={loading}
                    className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Refresh
                  </button>
                )}
              </div>

              {!token ? (
                <div className="bg-slate-900/60 rounded-lg p-4 text-center border border-dashed border-slate-700 text-slate-400 text-xs">
                  <Lock className="w-5 h-5 mx-auto mb-1.5 text-amber-400/80" />
                  Please register or log in above to unlock protected CRUD endpoints.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Create Record Form */}
                  <form onSubmit={handleCreateData} className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 space-y-2.5">
                    <div className="text-xs font-medium text-slate-300 flex items-center justify-between">
                      <span>Insert New Record to SQLite:</span>
                      <span className="text-[10px] text-teal-400 font-mono">POST /api/data</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500"
                        placeholder="Record Title (e.g. Khmer Student Progress)"
                      />
                    </div>
                    <div>
                      <textarea
                        value={newPayload}
                        onChange={(e) => setNewPayload(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-emerald-400 placeholder-slate-500"
                        placeholder="JSON or text payload..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Save Record to DB
                      </button>
                    </div>
                  </form>

                  {/* Stored Records List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-400">
                        Current User Rows ({items.length} records in SQLite):
                      </span>
                      <button
                        onClick={handleExportDownload}
                        disabled={items.length === 0}
                        className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors disabled:opacity-40"
                      >
                        <Download className="w-3 h-3" /> Export Download (JSON)
                      </button>
                    </div>

                    {items.length === 0 ? (
                      <div className="bg-slate-900/50 p-3 rounded text-center text-xs text-slate-400 border border-slate-800">
                        No rows found for this user. Create one above!
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                        {items.map((item) => (
                          <div 
                            key={item.id} 
                            className="bg-slate-900/80 border border-slate-800 rounded-lg p-2.5 flex items-start justify-between gap-3 text-xs"
                          >
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded">
                                  #{item.id}
                                </span>
                                <strong className="text-white truncate">{item.title}</strong>
                                <span className="text-[10px] text-slate-500">
                                  {new Date(item.created_at).toLocaleTimeString()}
                                </span>
                              </div>
                              <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto bg-slate-950 p-1.5 rounded max-h-20">
                                {typeof item.payload === 'object' ? JSON.stringify(item.payload, null, 2) : item.payload}
                              </pre>
                            </div>
                            <button
                              onClick={() => handleDeleteData(item.id)}
                              className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 rounded transition-colors"
                              title="Delete row from SQLite (DELETE /api/data/:id)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>

            {/* Step 3: Direct cURL Terminal Snippet */}
            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/60">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-semibold text-slate-200">
                    Terminal / cURL Verification
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(`curl -s http://localhost:3000/api/data -H "Authorization: Bearer ${token || '<YOUR_TOKEN>'}"`)}
                  className="text-xs text-purple-300 hover:text-purple-200 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy cURL
                </button>
              </div>
              <pre className="text-[11px] font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto">
                <code>
{`# 1. Fetch user data with real JWT
curl -X GET http://localhost:3000/api/data \\
  -H "Authorization: Bearer ${token ? `${token.slice(0, 24)}...` : '<LOGIN_TOKEN>'}"

# 2. Download export attachment
curl -O -J -X GET http://localhost:3000/api/data/export \\
  -H "Authorization: Bearer ${token ? `${token.slice(0, 24)}...` : '<LOGIN_TOKEN>'}"`}
                </code>
              </pre>
            </div>

          </div>

          {/* Right Column: Live Output & Raw JSON inspector (5 cols) */}
          <div className="lg:col-span-5 p-6 flex flex-col bg-slate-950/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-slate-200">Live API Server Response</h3>
              </div>
              <button
                onClick={() => copyToClipboard(apiResponse)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>

            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs overflow-y-auto max-h-[500px]">
              <pre className="text-emerald-400 whitespace-pre-wrap word-break-all">
                {apiResponse}
              </pre>
            </div>

            {/* Architecture Overview */}
            <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 text-xs space-y-2 text-slate-300">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" /> Production Architecture
              </div>
              <ul className="space-y-1 text-slate-400 list-disc list-inside">
                <li><strong className="text-slate-200">SQLite Database:</strong> WAL Mode, Foreign Keys active</li>
                <li><strong className="text-slate-200">Password Security:</strong> bcrypt salted 10 rounds</li>
                <li><strong className="text-slate-200">Tokens:</strong> Signed JWT (HS256) valid for 7 days</li>
                <li><strong className="text-slate-200">File Download:</strong> Content-Disposition: attachment header</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
