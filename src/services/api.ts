"use client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function parseJson(res: Response) {
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  async get(endpoint: string) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error(res.statusText);

    return parseJson(res);
  },

  async post(endpoint: string, body: any) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(res.statusText);
    return parseJson(res);
  },

  async put(endpoint: string, body: any) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });

    if (!res.ok) throw new Error(res.statusText);
    return parseJson(res);
  },

  async delete(endpoint: string) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error(res.statusText);
  },
};
