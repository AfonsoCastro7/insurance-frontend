"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type AppShellProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/reports", label: "Relatorios", icon: "📊" },
  { href: "/settings", label: "Definicoes", icon: "⚙️" },
];

export default function AppShell({ header, children }: AppShellProps) {
  const pathname = usePathname();
  const [pinned, setPinned] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const isExpanded = expanded || pinned;

  const handleMouseEnter = () => setExpanded(true);
  const handleMouseLeave = () => {
    if (!pinned) setExpanded(false);
  };

  const togglePin = () => {
    setPinned((prev) => {
      const next = !prev;
      if (!next) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
      return next;
    });
  };

  const renderNavItem = (item: NavItem, active: boolean) => (
    <li key={item.href}>
      <Link
        href={item.href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
          active
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="text-lg">{item.icon}</span>
        <span
          className={`transition-all duration-150 ${
            isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          {item.label}
        </span>
      </Link>
    </li>
  );

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      <aside
        className={`${
          isExpanded ? "w-56" : "w-16"
        } bg-white border-r shadow-sm flex flex-col transition-all duration-200`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="px-4 py-4 text-xl font-bold text-blue-900 flex items-center justify-between">
          <span
            className={`transition-all duration-150 ${
              isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            MediadorTrack
          </span>
          <button
            type="button"
            onClick={togglePin}
            aria-label={pinned ? "Desafixar menu" : "Fixar menu"}
            className="text-sm text-gray-500 hover:text-blue-700"
          >
            {pinned ? "✕" : "≡"}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {NAV_ITEMS.map((item) =>
              renderNavItem(item, pathname === item.href)
            )}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow px-6 py-4 flex-shrink-0">
          {header}
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
