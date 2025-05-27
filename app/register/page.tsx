import styles from "./styles.module.scss";

export default function RegisterPage() {
    return(
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <h1 className={styles.registerTitle}>Crie sua Conta</h1>
                <p className={styles.registerSubtitle}>Gerencie suas finanças de forma simples e segura.</p>

                <form className={styles.registerForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeCompleto">Nome Completo</label>
                        <input type="text" id="nomeCompleto" name="nomeCompleto" placeholder="Seu nome completo" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="seuemail@exemplo.com" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title="Formato: 000.000.000-00" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" name="senha" placeholder="Mínimo 8 caracteres" required minLength={8} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>
                        <input type="password" id="confirmarSenha" name="confirmarSenha" placeholder="Digite sua senha novamente" required minLength={8} />
                    </div>

                    <button type="submit" className={styles.btnRegister}>Cadastrar</button>
                </form>

                <p className={styles.registerLoginLink}>Já tem uma conta? <a href="/login">Faça Login</a></p>
            </div>
        </div>
    );
}