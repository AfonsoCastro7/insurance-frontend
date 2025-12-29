"use client";

import { api } from "@/src/services/api";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // avisa a Home que deve recarregar a lista
}

export default function NewSimulationModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  // Estados do formulario
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("Automovel");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const savedLead = await api.post("/leads", {
        name,
        phone,
        email,
        source: "APP_WEB",
      });

      await api.post("/simulations", {
        status: "NOVO",
        type,
        description,
        leadId: savedLead.id,
      });

      // Sucesso!
      onSuccess();
      onClose();
      // Limpar formulario
      setName("");
      setPhone("");
      setEmail("");
      setDescription("");
    } catch (error) {
      alert("Ocorreu um erro ao salvar.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-white/60">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Nova Simulacao</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 space-y-3">
              <h3 className="text-sm font-bold text-sky-800 uppercase">
                Dados do Cliente
              </h3>
              <input
                required
                placeholder="Nome do Cliente"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <div className="flex gap-2">
                <input
                  placeholder="Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-100 space-y-3 shadow-inner">
              <h3 className="text-sm font-bold text-gray-600 uppercase">
                Detalhes do Pedido
              </h3>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                <option>Automovel</option>
                <option>Saude</option>
                <option>Casa</option>
                <option>Vida</option>
                <option>Acidentes Trabalho</option>
              </select>
              <textarea
                required
                placeholder="Descricao (ex: Mercedes A180, 2020, Vidros Quebrados)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 border rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg hover:shadow disabled:opacity-50"
            >
              {loading ? "A Guardar..." : "Criar Pedido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
