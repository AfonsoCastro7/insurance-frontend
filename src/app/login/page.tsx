"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, loading, user } = useAuth(); // pega o user
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // se ja esta logado, sai do login
  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch {
      setError("Credenciais invalidas");
    }
  };
  if (loading) return <>Carregando...</>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f8ff] via-white to-[#d8f1ff] px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-2xl p-8 shadow-2xl border border-white/70">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-sky-700">MediadorTrack</div>
          <p className="text-sm text-gray-500 mt-1">
            Acede para continuar a gerir as simulaçoes.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="email@exemplo.com"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 py-2.5 text-white font-semibold shadow hover:shadow-md transition-transform active:scale-95">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
