"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import AppShell from "@/src/app/components/app-shell/AppShell";
import HomeHeader from "@/src/app/components/home-header/HomeHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        A verificar sessao...
      </div>
    );
  }

  if (!user) return null;

  return (
    <AppShell
      header={<HomeHeader expanded={expanded} setExpanded={setExpanded} />}
      expanded={expanded}
    >
      {children}
    </AppShell>
  );
}
