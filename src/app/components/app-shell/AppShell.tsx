"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./AppShell.module.css";

type AppShellProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  expanded: boolean;
};

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/reports", label: "Relatórios", icon: "📊" },
  { href: "/settings", label: "Definições", icon: "⚙️" },
];

export default function AppShell({
  header,
  children,
  expanded,
}: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className={styles.root}>
      {/* SIDEBAR */}
      <aside
        className={`${styles.sidebar} ${
          expanded ? styles.sidebarExpanded : styles.sidebarCollapsed
        }`}
      >
        <div className={styles.logo}>
          <Image
            src="/insurance-baner.png"
            alt="Logo"
            width={expanded ? 120 : 40}
            height={40}
          />
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navItem} ${
                      active ? styles.navItemActive : ""
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span
                      className={`${styles.navLabel} ${
                        expanded
                          ? styles.navLabelExpanded
                          : styles.navLabelCollapsed
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className={styles.content}>
        <header className={styles.header}>{header}</header>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
