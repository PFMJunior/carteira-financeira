'use client';

import { useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { IoIosMenu, IoMdClose } from "react-icons/io";

export default function Header() {
    const router                    = useRouter();
    const { logout }                = useAuth();
    const [ openMenu, setOpenMenu ] = useState<boolean>(false);

    return(
        <header className={styles.headerMobile}>
            <div className={styles.headerContainer}>
                <img src="/assets/img/logo-cobuccio.png" alt="" />
                {openMenu ? <IoMdClose onClick={() => setOpenMenu(false)} /> : <IoIosMenu onClick={() => setOpenMenu(true)} /> }
            </div>

            <nav className={styles.navigationMobile}>
                {openMenu &&
                    <ul className={styles.listMobile}>
                        <li onClick={() => router.push("/profile")}>Perfil</li>
                        <li onClick={() => router.push("/deposit")}>Deposito</li>
                        <li onClick={() => router.push("/transfer")}>Transferência</li>
                        <li onClick={logout}>Sair</li>
                    </ul>                        
                }
            </nav>
        </header>
    );
}