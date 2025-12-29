"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import NewSimulationModal from "./components/NewSimulationModal";
import HomeHeader from "./components/HomeHeader";
import AppShell from "./components/AppShell";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // chave para forcar o Kanban a recarregar quando criamos algo novo
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
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
    <>
      <AppShell header={<HomeHeader setIsModalOpen={setIsModalOpen} />}>
        <KanbanBoard key={refreshKey} />
      </AppShell>

      <NewSimulationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
