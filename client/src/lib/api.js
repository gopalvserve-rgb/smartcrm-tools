const TOKEN_KEY = "sct_token";
const ADMIN_KEY = "sct_admin_token";

export function getToken() { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } }
export function setToken(t) { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch {} }
export function getAdminToken() { try { return localStorage.getItem(ADMIN_KEY); } catch { return null; } }
export function setAdminToken(t) { try { t ? localStorage.setItem(ADMIN_KEY, t) : localStorage.removeItem(ADMIN_KEY); } catch {} }

async function req(path, { method = "GET", body, admin = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = admin ? getAdminToken() : getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

export const api = {
  // auth
  signup: (b) => req("/auth/signup", { method: "POST", body: b }),
  login: (b) => req("/auth/login", { method: "POST", body: b }),
  me: () => req("/auth/me"),
  // tools + generate
  tools: () => req("/tools"),
  qrImage: (b) => req("/generate/qr-image", { method: "POST", body: b }),
  save: (b) => req("/generate", { method: "POST", body: b }),
  mine: () => req("/generate/mine"),
  remove: (id) => req(`/generate/${id}`, { method: "DELETE" }),
  publicView: (shortId) => req(`/public/${shortId}`),
  // leads
  lead: (b) => req("/leads", { method: "POST", body: b }),
  // admin
  adminLogin: (b) => req("/admin/login", { method: "POST", body: b }),
  adminStats: () => req("/admin/stats", { admin: true }),
  adminLeads: () => req("/admin/leads", { admin: true }),
  adminUsers: () => req("/admin/users", { admin: true }),
  adminTools: () => req("/admin/tools", { admin: true }),
  adminToggleTool: (id, status) => req(`/admin/tools/${id}`, { method: "PATCH", admin: true, body: { status } }),
};
