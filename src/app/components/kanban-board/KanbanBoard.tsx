"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { api } from "@/src/services/api";
import styles from "./KanbanBoard.module.css";
import { SimulationRequest, SimulationStatus } from "../../types";

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null;

const isSimulationStatus = (value: unknown): value is SimulationStatus =>
  value === "NOVO" ||
  value === "EM_ANALISE" ||
  value === "AGUARDA_CLIENTE" ||
  value === "GANHO" ||
  value === "PERDIDO";

const toNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

const toString = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

const COLUMNS = [
  {
    id: "NOVO",
    title: "A Fazer",
    backgroundColor: "#dbeafe",
    borderColor: "#93c5fd",
  },
  {
    id: "EM_ANALISE",
    title: "Em Analise",
    backgroundColor: "#fef9c3",
    borderColor: "#fde047",
  },
  {
    id: "AGUARDA_CLIENTE",
    title: "Pendente",
    backgroundColor: "#ffedd5",
    borderColor: "#fdba74",
  },
  {
    id: "GANHO",
    title: "Fechado",
    backgroundColor: "#dcfce7",
    borderColor: "#86efac",
  },
];

export default function KanbanBoard() {
  const [items, setItems] = useState<SimulationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  function normalizeSimulation(raw: unknown): SimulationRequest | null {
    if (!isRecord(raw)) return null;

    const id = toNumber(raw.id ?? raw.simulationId);
    if (id == null) return null;

    let lead: SimulationRequest["lead"];
    if (isRecord(raw.lead)) {
      const leadId = toNumber(raw.lead.id);
      if (leadId != null) {
        lead = {
          id: leadId,
          name: toString(raw.lead.name),
          email: toString(raw.lead.email),
          phone: toString(raw.lead.phone),
        };
      }
    } else if (raw.leadId != null) {
      const leadId = toNumber(raw.leadId);
      if (leadId != null) {
        lead = {
          id: leadId,
          name: toString(raw.leadName),
          email: toString(raw.leadEmail),
          phone: toString(raw.leadPhone),
        };
      }
    }

    return {
      id,
      status: isSimulationStatus(raw.status) ? raw.status : "NOVO",
      type: typeof raw.type === "string" ? raw.type : "Simulacao",
      description: typeof raw.description === "string" ? raw.description : "",
      value: toNumber(raw.value),
      createdAt: toString(raw.createdAt),
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

    const newStatus = destination.droppableId as SimulationStatus;

    setItems((prev) =>
      prev.map((item) =>
        item.id.toString() === draggableId
          ? { ...item, status: newStatus }
          : item
      )
    );

    try {
      await api.put(`/simulations/${draggableId}/status`, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar a mudanca. Recarregue a pagina.");
    }
  };

  if (loading) {
    return <div className={styles.loading}>A carregar o quadro...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {COLUMNS.map((col) => (
          <Droppable key={col.id} droppableId={col.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.column}
                style={{
                  backgroundColor: col.backgroundColor,
                  borderTop: `4px solid ${col.borderColor}`,
                }}
              >
                <div className={styles.columnHeader}>
                  {col.title}
                  <span className={styles.columnCount}>
                    {items.filter((i) => i.status === col.id).length}
                  </span>
                </div>

                <div className={styles.cardList}>
                  {items
                    .filter((item) => item.status === col.id)
                    .map((item, index) => (
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
                            className={styles.card}
                            style={provided.draggableProps.style}
                          >
                            <div className={styles.cardTop}>
                              <span className={styles.cardType}>
                                {item.type}
                              </span>
                              {item.value && (
                                <span className={styles.cardValue}>
                                  {item.value}
                                </span>
                              )}
                            </div>

                            <h4 className={styles.cardTitle}>
                              {item.lead?.name ?? "Cliente"}
                            </h4>

                            <p className={styles.cardDescription}>
                              {item.description}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}

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
