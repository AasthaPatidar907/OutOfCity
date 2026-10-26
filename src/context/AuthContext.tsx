import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@/types";
import { load, save } from "@/lib/storage";

const STORAGE_KEY = "ooc_user";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Demo auth: registered "accounts" are stored in localStorage so a returning
// user can log back in, but this is NOT real authentication — no server,
// no password hashing, no session token. Clearly labelled in the UI.
const ACCOUNTS_KEY = "ooc_accounts";
interface StoredAccount {
  name: string;
  email: string;
  password: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load<User | null>(STORAGE_KEY, null));

  useEffect(() => {
    save(STORAGE_KEY, user);
  }, [user]);

  const login = useCallback((email: string, password: string) => {
    const accounts = load<StoredAccount[]>(ACCOUNTS_KEY, []);
    const match = accounts.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );
    if (!match) return { ok: false, error: "No matching account found. Check your details or register." };
    setUser({ name: match.name, email: match.email });
    return { ok: true };
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const accounts = load<StoredAccount[]>(ACCOUNTS_KEY, []);
    const exists = accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) return { ok: false, error: "An account with this email already exists." };
    const next = [...accounts, { name: name.trim(), email: email.trim(), password }];
    save(ACCOUNTS_KEY, next);
    setUser({ name: name.trim(), email: email.trim() });
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, register, logout, isDemo: true }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
