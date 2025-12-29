export interface Lead {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
}

export type SimulationStatus =
  | "NOVO"
  | "EM_ANALISE"
  | "AGUARDA_CLIENTE"
  | "GANHO"
  | "PERDIDO";

export interface SimulationRequest {
  id: number;
  status: SimulationStatus;
  type: string;
  description?: string;
  value?: number | null;
  createdAt?: string;
  lead?: Lead;
}
