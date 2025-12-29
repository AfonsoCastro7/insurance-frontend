"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { SimulationRequest, SimulationStatus } from "../types";
import { api } from "@/src/services/api";

const COLUMNS = [
  { id: "NOVO", title: "A Fazer", color: "bg-blue-100 border-blue-300" },
  {
    id: "EM_ANALISE",
    title: "Em Analise",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: "AGUARDA_CLIENTE",
    title: "Pendente",
    color: "bg-orange-100 border-orange-300",
  },
  { id: "GANHO", title: "Fechado", color: "bg-green-100 border-green-300" },
  { id: "PERDIDO", title: "Perdido", color: "bg-gray-100 border-gray-300" },
];

export default function KanbanBoard() {
  const [items, setItems] = useState<SimulationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  function normalizeSimulation(raw: any): SimulationRequest | null {
    const id = raw?.id ?? raw?.simulationId;
    if (id == null) return null;

    const lead =
      raw?.lead ||
      (raw?.leadId
        ? {
            id: raw.leadId,
            name: raw.leadName,
            email: raw.leadEmail,
            phone: raw.leadPhone,
          }
        : undefined);

    return {
      id,
      status: (raw?.status as SimulationStatus) ?? "NOVO",
      type: raw?.type ?? "Simulacao",
      description: raw?.description ?? "",
      value: raw?.value ?? null,
      createdAt: raw?.createdAt,
      lead,
    };
  }

  useEffect(() => {
    api
      .get("/simulations")
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const normalized = list
          .map(normalizeSimulation)
          .filter(Boolean) as SimulationRequest[];
        setItems(normalized);
      })
      .finally(() => setLoading(false));
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newStatus = destination.droppableId;
    const updatedItems = items.map((item) =>
      item.id.toString() === draggableId
        ? { ...item, status: newStatus as SimulationStatus }
        : item
    );
    setItems(updatedItems);

    try {
      await api.put(`/simulations/${draggableId}/status`, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar a mudanca. Recarrega a pagina.");
    }
  };

  if (loading)
    return <div className="p-10 text-center">A carregar o quadro...</div>;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto pb-4 items-start">
        {COLUMNS.map((col) => (
          <Droppable key={col.id} droppableId={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-shrink-0 w-80 rounded-lg p-4 border-t-4 ${col.color} bg-gray-50 shadow-sm min-h-[500px]`}
              >
                <h3 className="font-bold text-gray-700 mb-4 flex justify-between">
                  {col.title}
                  <span className="bg-white px-2 py-0.5 rounded text-sm text-gray-500 shadow-sm">
                    {items.filter((i) => i.status === col.id).length}
                  </span>
                </h3>

                <div className="space-y-3">
                  {items
                    .filter(
                      (item) =>
                        item && item.id != null && item.status === col.id
                    )
                    .map((item, index) =>
                      item && item.id != null ? (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                              style={{ ...provided.draggableProps.style }}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded-full uppercase tracking-wider">
                                  {item.type}
                                </span>
                                {item.value && (
                                  <span className="text-sm font-semibold text-green-600">
                                    {item.value}
                                  </span>
                                )}
                              </div>

                              <h4 className="font-bold text-gray-800">
                                {item.lead?.name ?? "Cliente"}
                              </h4>
                              <p className="text-sm text-gray-500 mb-3 truncate">
                                {item.description}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ) : null
                    )}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
