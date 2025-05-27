import styles from "./styles.module.scss";

export default function LoginPage() {
    return(
        <div className={styles.loginContainer}>
            <form className={styles.loginForm}>
                <h2>Entrar na sua conta</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="seu@email.com" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" placeholder="********" />
                </div>
                <button type="submit" className={styles.submitButton}>Entrar</button>
                <p className={styles.signupLink}>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
                {/* Exemplo de mensagem de erro */}
                {/* {error && <p className={styles.errorMessage}>{error}</p>} */}
            </form>
        </div>
    );
}