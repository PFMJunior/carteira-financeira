import styles from "./styles.module.scss";

export default function Login() {
    return(
        <div className={styles.loginContainer}>
            <img src="/assets/img/logo-cobuccio.png" alt="Wallet Logo" className={styles.logo} />
            <h1>Sua Carteira Financeira Inteligente</h1>
            <p>Gerencie suas finanças com facilidade e segurança.</p>
            <div className={styles.buttons}>
                <a href="/login"><button className={styles.loginButton}>Entrar</button></a>
                <a href="/register"><button className={styles.registerButton}>Criar Conta</button></a>
            </div>
        </div>
    );
}