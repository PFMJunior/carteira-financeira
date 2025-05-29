'use client';

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { AiOutlineDollar } from "react-icons/ai";
import { useAuth } from "@/app/context/AuthContext";
import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";

export default function Header() {
    const router           = useRouter();
    const { logout, user } = useAuth();

    return(
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img src="/assets/img/logo-cobuccio.png" alt="" />

                <nav className={styles.navigationDesktop}>
                    <ul>
                        <div className={styles.value}>
                            <AiOutlineDollar />
                            <span>{useCurrencyFormatter(user?.balance.toFixed(2))}</span>
                        </div>
                        <li onClick={() => router.push("/profile")}>Perfil</li>
                        <li onClick={() => router.push("/deposit")}>Deposito</li>
                        <li onClick={() => router.push("/transfer")}>Transferência</li>
                        <li onClick={logout}>Sair</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}