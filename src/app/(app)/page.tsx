"use client";

import { useState } from "react";
import KanbanBoard from "@/src/app/components/kanban-board/KanbanBoard";
import SimulationModal from "@/src/app/components/simulation-modal/SimulationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <KanbanBoard key={refreshKey} />

      <SimulationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
