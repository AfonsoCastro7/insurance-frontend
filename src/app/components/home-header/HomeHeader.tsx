import { useAuth } from "@/src/context/AuthContext";
import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./HomeHeader.module.css";

type HomeHeaderProps = {
  expanded?: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({ expanded, setExpanded }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Menu
          className={styles.menuIcon}
          size={24}
          onClick={() => setExpanded(!expanded)}
        />

        <div className={styles.titleWrapper}>
          <span className={styles.title}>Dashboard</span>
          <span className={styles.subtitle}>
            Acompanha os pedidos e simulações
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
          aria-label="Logout"
        >
          <LogOut size={18} color="#0c4a6e" onClick={handleLogout} />
          Sair
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
