'use client';

import { useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { AiOutlineDollar } from "react-icons/ai";
import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";

export default function Header() {
    const router                    = useRouter();
    const { logout, user }          = useAuth();
    const [ openMenu, setOpenMenu ] = useState<boolean>(false);

    return(
        <header className={styles.headerMobile}>
            <div className={styles.headerContainer}>
                <img src="/assets/img/logo-cobuccio.png" alt="" />
                <div className={styles.left}>
                    {user && user?.balance &&
                        <div className={styles.value}>
                            <AiOutlineDollar />
                            <span>{useCurrencyFormatter(user?.balance.toFixed(2))}</span>
                        </div>
                    }
                    {openMenu ? <IoMdClose onClick={() => setOpenMenu(false)} /> : <IoIosMenu onClick={() => setOpenMenu(true)} /> }
                </div>
            </div>

            <nav className={styles.navigationMobile}>
                {openMenu &&
                    <ul className={styles.listMobile}>
                        <li onClick={() => (router.push("/profile"), setOpenMenu(false))}>Perfil</li>
                        <li onClick={() => (router.push("/deposit"), setOpenMenu(false))}>Deposito</li>
                        <li onClick={() => (router.push("/transfer"), setOpenMenu(false))}>Transferência</li>
                        <li onClick={logout}>Sair</li>
                    </ul>                        
                }
            </nav>
        </header>
    );
}