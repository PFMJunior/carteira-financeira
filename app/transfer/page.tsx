'use client';

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./styles.module.scss";
import { useAuth } from "../context/AuthContext";
import { NumericFormat } from 'react-number-format';
import useCurrencyFormatter from "../hooks/useCurrencyFormatter";
import ModalConfirmation from "@/components/ModalConfirmation";

export default function TransferPage() {
    const [amount, setAmount]                                 = useState('');
    const { user, fetchUserData }                             = useAuth();
    const [isLoading, setIsLoading]                           = useState(false);
    const [openModalTransfers, setOpenModalTransfers]         = useState<boolean>(false);
    const [recipientAccountNumber, setRecipientAccountNumber] = useState('');

    const handleAmountChange = (values: any) => {
        setAmount(values.value);
    };

    const handleTransfer = async (event: React.FormEvent) => {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página
        setIsLoading(true); // Ativa o estado de carregamento

        if (!recipientAccountNumber || !amount || parseFloat(amount) <= 0) {
            toast.error('Por favor, preencha o número da conta do destinatário e um valor válido.');
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem('jwt_token');
        if (!token) {
            toast.error('Você não está autenticado.');
            setIsLoading(false);
            return;
        }

        if(amount > recipientAccountNumber) {
            toast.error('Saldo insuficiente para a transferência.');
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/transfer', {
                    recipientAccountNumber: parseInt(recipientAccountNumber, 10),
                    amount: parseFloat(amount)
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                toast.success(response.data.message);
                setRecipientAccountNumber(''); // Limpa o campo do destinatário
                setAmount(''); // Limpa o campo do valor
                setOpenModalTransfers(false);
                fetchUserData(); // Atualiza o saldo do usuário no contexto
            } catch (error: any) {
                console.error('Erro na transferência:', error);
                const errorMessage = error.response?.data?.message || 'Erro ao realizar a transferência.';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false); // Desativa o estado de carregamento
            }
        }
    };

    const handleOpenModalTransfer = () => {
        if(amount.length >= 4 && recipientAccountNumber.length == 4) {
            setOpenModalTransfers(true);    
        } else {
            toast.error("Preencha os campos!")
        }
    }

    const handleCloseModalTransfer = () => {
        setOpenModalTransfers(false);
    };

    return(
        <>
            <div className={styles.transferPage}>
                <section className={styles.operationFormContainer}>
                    <h1>Transferir Saldo</h1>
                    <div className={styles.formCard}>
                        <p className={styles.currentBalanceInfo}>Seu saldo atual é:
                            <span className={styles.currentBalanceValue}>
                                {useCurrencyFormatter(user?.balance.toFixed(2))}
                            </span>
                        </p>

                        <form className={styles.depositForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="amount">ID do Usuário Destino:</label>
                                <input
                                    type="text"
                                    id="recipient-account-number"
                                    name="recipientAccountNumber"
                                    placeholder="Ex: 123456"
                                    value={recipientAccountNumber}
                                    maxLength={4}
                                    onChange={(e) => setRecipientAccountNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="amount">Valor do Transferência:</label>
                                <NumericFormat
                                    id="input-moeda"
                                    value={amount}
                                    onValueChange={handleAmountChange}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowNegative={false}
                                    placeholder="R$ 0,00"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                disabled={isLoading}
                                className={styles.submitButton}
                                onClick={handleOpenModalTransfer}
                            >
                                {isLoading ? 'Transferindo...' : 'Confirmar Transferência'}
                            </button>
                        </form>
                    </div>
                </section>
            </div>

            {openModalTransfers &&
                <ModalConfirmation
                    data={amount}
                    confirmation={handleTransfer}
                    close={handleCloseModalTransfer}
                    message={"Desejar realizar essa Transferência no valor"}
                />
            }
        </>
    );
}