const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const api = {
  // Buscar dados (GET)
  async get(endpoint: string) {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`Erro no fetch: ${res.statusText}`);
    return res.json();
  },

  // Enviar dados (POST)
  async post(endpoint: string, body: any) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Erro no post: ${res.statusText}`);
    return res.json();
  },

  // Atualizar (PUT) - Para o Drag & Drop
  async put(endpoint: string, body: any) {
    // Se o body for string simples (como o status), não fazemos JSON.stringify
    const isString = typeof body === "string";

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: isString ? body : JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Erro no put: ${res.statusText}`);
    return isJson(res) ? res.json() : null; // Proteção caso o backend não devolva JSON
  },

  // Apagar (DELETE)
  async delete(endpoint: string) {
    await fetch(`${BASE_URL}${endpoint}`, { method: "DELETE" });
  },
};

// Pequeno helper para verificar se a resposta é JSON
const isJson = (res: Response) => {
  const contentType = res.headers.get("content-type");
  return contentType && contentType.indexOf("application/json") !== -1;
};
