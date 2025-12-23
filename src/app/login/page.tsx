"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  // O React 19 introduziu o useActionState para gerir estados de formulários
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Entrar no Jogo
        </h2>

        <form action={formAction} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ color: "red" }}
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="exemplo@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Palavra-passe
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-500 font-medium">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors disabled:bg-gray-400"
          >
            {isPending ? "A verificar..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
