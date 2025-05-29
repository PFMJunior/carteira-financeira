'use client';

import styles from "./styles.module.scss";
import { IoIosMenu } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
    const router                    = useRouter();
    const { logout }                = useAuth();

    return(
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img src="/assets/img/logo-cobuccio.png" alt="" />

                <nav className={styles.navigationDesktop}>
                    <ul>
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