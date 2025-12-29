"use client";

import AppShell from "../components/AppShell";
import { useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        A verificar sessao...
      </div>
    );
  }

  if (!user) return null;

  return (
    <AppShell header={<h1 className="text-2xl font-bold text-blue-900">Definições</h1>}>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700">Configurações da conta e preferências.</p>
      </div>
    </AppShell>
  );
}
