"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id?: number;
  name?: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const data = await api.get("/auth/me");
      const nextUser = (data as any)?.user ?? data ?? null;
      setUser(nextUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const data = await api.post("/auth/login", { email, password });
      const nextUser = (data as any)?.user ?? data ?? null;
      if (nextUser) {
        setUser(nextUser);
      } else {
        await loadUser();
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await api.post("/auth/logout", {});
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
