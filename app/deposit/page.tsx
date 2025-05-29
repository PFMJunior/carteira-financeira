'use client';

import axios from 'axios';
import { useState } from "react";
import toast from 'react-hot-toast';
import styles from "./styles.module.scss";
import { useAuth } from "../context/AuthContext";
import { NumericFormat } from 'react-number-format';
import ModalConfirmation from '@/components/ModalConfirmation';
import useCurrencyFormatter from '../hooks/useCurrencyFormatter';

export default function DepositPage() {
    const [valor, setValor]                                 = useState('');
    const [loading, setLoading]                             = useState(false);
    const { user, fetchUserData }                           = useAuth();
    const [openModalConfirmation, setOpenModalConfirmation] = useState<boolean>(false);

    const handleChange = (values: any) => {
        setValor(values.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página

        if (!valor || parseFloat(valor) <= 0) {
            toast.error('Por favor, insira um valor de depósito válido.');
            return;
        }

        setLoading(true); // Ativa o estado de carregamento
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                toast.error('Você não está autenticado.');
                setLoading(false);
                return;
            }

            const response = await axios.post('http://localhost:5000/api/auth/deposit', {
                amount: parseFloat(valor) // Envia o valor como número
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(response.data.message);
            setValor(''); // Limpa o campo após o sucesso
            setOpenModalConfirmation(false);
            await fetchUserData(); // Atualiza os dados do usuário, incluindo o novo saldo
        } catch (error: any) {
            console.error('Erro ao realizar depósito:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Erro ao processar o depósito.');
            }
        } finally {
            setLoading(false); // Desativa o estado de carregamento
        }
    };

    const handleOpenModal = () => {
        if(valor.length >= 4) {
            setOpenModalConfirmation(true);    
        } else {
            toast.error("Preencha o campo!")
        }
    }

    const handleCloseModal = () => {
        setOpenModalConfirmation(false);
    };

    return(
        <>
            <div className={styles.depositPage}>
                <section className={styles.operationFormContainer}>
                    <h1>Depositar Saldo</h1>
                    <div className={styles.formCard}>
                        <p className={styles.currentBalanceInfo}>Seu saldo atual é:
                            <span className={styles.currentBalanceValue}>
                                {useCurrencyFormatter(user?.balance.toFixed(2))}
                            </span>
                        </p>

                        <form className={styles.depositForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="amount">Valor do Depósito:</label>
                                <NumericFormat
                                    id="input-moeda"
                                    value={valor}
                                    onValueChange={handleChange}
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
                                type='button'
                                className={styles.submitButton}
                                onClick={handleOpenModal}
                            >
                                {loading ? 'Processando...' : 'Confirmar Depósito'}
                            </button>
                        </form>
                    </div>
                </section>
            </div>

            {openModalConfirmation &&
                <ModalConfirmation
                    data={valor}
                    close={handleCloseModal}
                    confirmation={handleSubmit}
                    message={"Desejar realizar o Deposito no valor"}
                />
            }
        </>
    );
}