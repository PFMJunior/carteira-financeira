import useCurrencyFormatter from "@/app/hooks/useCurrencyFormatter";
import styles from "./styles.module.scss";

interface ModalConfirmation {
    data        : string;
    message     : string;
    close       : () => void;
    confirmation: (event: React.FormEvent) => Promise<void>;
}

export default function ModalConfirmation({ confirmation, close, data, message }: ModalConfirmation) {
    return(
        <div className={styles.modalConfirmation} onClick={close}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <p>{message} R$ <strong>{useCurrencyFormatter(data)}</strong>?</p>
                <div className={styles.btns}>
                    <button type="submit" onClick={confirmation}>Confirmar</button>
                    <button onClick={close}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}