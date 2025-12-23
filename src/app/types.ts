export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface SimulationRequest {
  id: number;
  status: "NOVO" | "EM_ANALISE" | "AGUARDA_CLIENTE" | "GANHO" | "PERDIDO";
  type: string;
  description: string;
  value: number | null;
  createdAt: string;
  lead: Lead;
}
