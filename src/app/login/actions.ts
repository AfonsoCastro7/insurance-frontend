"use server";

import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Simulação de verificação (aqui ligarias à tua base de dados)
  await new Promise((res) => setTimeout(res, 1000)); // Simular atraso de rede

  if (email === "admin@jogo.com" && password === "123456") {
    // Em produção, aqui criarias um Cookie ou Sessão
    redirect("/dashboard");
  } else {
    return { error: "Email ou palavra-passe incorretos." };
  }
}
