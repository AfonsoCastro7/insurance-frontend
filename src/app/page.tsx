import { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import NewSimulationModal from "./components/NewSimulationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Usamos esta chave para forçar o Kanban a recarregar quando criamos algo novo
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1); // Muda a key, o React recria o componente Kanban
  };

  return (
    <main className="min-h-screen bg-gray-200 flex flex-col">
      <header className="bg-white shadow p-4 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">
            MediadorTrack App🚀
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm active:transform active:scale-95"
          >
            + Nova Simulação
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto p-6">
        {/* Passamos a key para forçar refresh */}
        <KanbanBoard key={refreshKey} />
      </div>

      <NewSimulationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </main>
  );
}
