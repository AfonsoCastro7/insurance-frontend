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

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null;

const isUser = (value: unknown): value is User => {
  if (!isRecord(value)) return false;
  return typeof value.email === "string";
};

const extractUser = (data: unknown): User | null => {
  if (isUser(data)) return data;
  if (isRecord(data) && isUser(data.user)) return data.user;
  return null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const data = await api.get("/auth/me");
      setUser(extractUser(data));
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
      const nextUser = extractUser(data);
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
