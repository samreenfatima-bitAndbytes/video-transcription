import { useCallback, useMemo, useSyncExternalStore } from "react";
import { DEMO_USERS } from "../data/seed";
import { AuthCtx } from "./authContext";

const KEY = "videodoc_auth_v2";
let cache = null;
const listeners = new Set();

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      cache = null;
      return null;
    }
    const parsed = JSON.parse(raw);
    cache = parsed && typeof parsed === "object" ? parsed : null;
    return cache;
  } catch {
    cache = null;
    return null;
  }
}

function getSnapshot() {
  return cache;
}

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function emit() {
  listeners.forEach((l) => l());
}

function write(user) {
  cache = user;
  if (user) localStorage.setItem(KEY, JSON.stringify(user));
  else localStorage.removeItem(KEY);
  emit();
}

read();

export function AuthProvider({ children }) {
  const user = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const login = useCallback((email, password) => {
    const found = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === String(email).trim().toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: "Invalid email or password." };
    const { password: _p, ...safe } = found;
    write(safe);
    return { ok: true };
  }, []);

  const logout = useCallback(() => write(null), []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
