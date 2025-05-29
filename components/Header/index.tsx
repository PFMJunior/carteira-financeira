'use client';

import styles from "./styles.module.scss";
import HeaderMobile  from "./HeaderMobile";
import HeaderDesktop  from "./HeaderDesktop";

export default function Header() {
    return(
        <>
            <div className={styles.desktop}>
                <HeaderDesktop />
            </div>

            <div className={styles.mobile}>
                <HeaderMobile />
            </div>
        </>
    );
}