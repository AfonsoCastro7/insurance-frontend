"use client";

import { api } from "@/src/services/api";
import { useState } from "react";
import styles from "./SimulationModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SimulationModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

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

      onSuccess();
      onClose();

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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nova Simulação</h2>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={`${styles.section} ${styles.sectionBlue}`}>
            <h3 className={`${styles.sectionTitle} ${styles.sectionTitleBlue}`}>
              Dados do Cliente
            </h3>

            <input
              required
              placeholder="Nome do Cliente"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />

            <div className={styles.row}>
              <input
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={`${styles.section} ${styles.sectionInset}`}>
            <h3 className={`${styles.sectionTitle} ${styles.sectionTitleGray}`}>
              Detalhes do Pedido
            </h3>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={styles.select}
            >
              <option>Automovel</option>
              <option>Saude</option>
              <option>Casa</option>
              <option>Vida</option>
              <option>Acidentes Trabalho</option>
            </select>

            <textarea
              required
              placeholder="Descrição (ex: Mercedes A180, 2020, Vidros Quebrados)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "A Guardar..." : "Criar Pedido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
