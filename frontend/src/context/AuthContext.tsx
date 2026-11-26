
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "@/types";
import { load, save } from "@/lib/storage";

const STORAGE_KEY = "ooc_user";
const TOKEN_KEY = "ooc_token";
const API_URL = "http://localhost:5000/api/auth";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(
    () => load<User | null>(STORAGE_KEY, null)
  );

  useEffect(() => {
    save(STORAGE_KEY, user);
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { ok: false, error: data.message || "Login failed." };
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      setUser({ name: data.user.name, email: data.user.email });

      return { ok: true };
    } catch {
      return { ok: false, error: "Cannot connect to the server. Please try again." };
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { ok: false, error: data.message || "Registration failed." };
      }

      // Register first, then log in to obtain a session token.
      const loginResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        return { ok: false, error: "Account created. Please log in." };
      }

      localStorage.setItem(TOKEN_KEY, loginData.token);
      setUser({ name: loginData.user.name, email: loginData.user.email });

      return { ok: true };
    } catch {
      return { ok: false, error: "Cannot connect to the server. Please try again." };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, register, logout, isDemo: false }),
    [user, login, register, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
