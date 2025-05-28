import styles from "./styles.module.scss";

export default function TransferPage() {
    return(
        <div className={styles.transferPage}>
            <section className={styles.operationFormContainer}>
                <h1>Transferir Saldo</h1>
                <div className={styles.formCard}>
                    <p className={styles.currentBalanceInfo}>Seu saldo atual é: <span className={styles.currentBalanceValue}>R$ 1.234,56</span></p>

                    <form className={styles.depositForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="amount">ID do Usuário Destino:</label>
                            <input
                                type="text"
                                id="recipient-id"
                                name="recipientId"
                                placeholder="Ex: 12345ABCDE"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="amount">Valor do Transferência:</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                placeholder="Ex: 100.00"
                                step="0.01"
                                min="0.01"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="description">Observação (opcional):</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                placeholder="Ex: Depósito mensal"
                            ></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>Confirmar Transferência</button>
                    </form>
                </div>
            </section>
        </div>
    );
}