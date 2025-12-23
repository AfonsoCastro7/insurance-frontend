import { api } from "@/src/services/api";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Para avisar a Home que deve recarregar a lista
}

export default function NewSimulationModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("Automóvel");
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
        lead: { id: savedLead.id },
      });

      // Sucesso!
      onSuccess();
      onClose();
      // Limpar formulário
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Nova Simulação</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dados do Cliente */}
          <div className="p-3 bg-blue-50 rounded border border-blue-100 space-y-3">
            <h3 className="text-sm font-bold text-blue-800 uppercase">
              Dados do Cliente
            </h3>
            <input
              required
              placeholder="Nome do Cliente"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-2">
              <input
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Dados do Pedido */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase">
              Detalhes do Pedido
            </h3>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded bg-white"
            >
              <option>Automóvel</option>
              <option>Saúde</option>
              <option>Casa</option>
              <option>Vida</option>
              <option>Acidentes Trabalho</option>
            </select>
            <textarea
              required
              placeholder="Descrição (ex: Mercedes A180, 2020, Vidros Quebrados)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded h-24"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "A Guardar..." : "Criar Pedido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
