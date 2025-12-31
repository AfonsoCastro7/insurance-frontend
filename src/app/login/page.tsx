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
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(to bottom right, #f0f8ff, #ffffff, #d8f1ff)",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "28rem",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          borderRadius: "1rem",
          padding: "2rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              color: "#0369a1",
            }}
          >
            MediadorTrack
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginTop: "0.25rem",
            }}
          >
            Acede para continuar a gerir as simulaЗхoes.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "1rem",
          }}
        >
          {error && (
            <div
              style={{
                borderRadius: "0.25rem",
                backgroundColor: "#fef2f2",
                padding: "0.75rem",
                fontSize: "0.875rem",
                color: "#dc2626",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "0.5rem",
            }}
          >
            <label style={{ fontSize: "0.875rem", color: "#4b5563" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                padding: "0.5rem 0.75rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "0.5rem",
            }}
          >
            <label style={{ fontSize: "0.875rem", color: "#4b5563" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="ѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕѓ?Ѕ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                padding: "0.5rem 0.75rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              background: "linear-gradient(to right, #0ea5e9, #0284c7)",
              padding: "0.625rem 0",
              color: "#ffffff",
              fontWeight: 600,
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              border: "none",
              cursor: "pointer",
              transition: "transform 150ms ease",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
