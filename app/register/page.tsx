'use client';

import { useState } from "react";
import toast from 'react-hot-toast';
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { PatternFormat } from "react-number-format";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

export default function RegisterPage() {
    const router                                = useRouter();
    const [cpf, setCpf]                         = useState('');
    const [message, setMessage]                 = useState('');
    const [password, setPassword]               = useState('');
    const [birthDate, setBirthDate]             = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    interface DataRegister {
        username: string
        password: string
        cpf: number
        birthDate: Date
        fullname: string
        confirmPassword: string
    }
    const { handleSubmit, register } = useForm<DataRegister>();

    const {
        control : controlInfo,
    } = useForm();

    const handleSubmitRegister: SubmitHandler<DataRegister> = async (data) => {
        // console.log('chegou', data)
        // event.preventDefault(); // Previne o comportamento padrão de recarregar a página

        // Validação básica de senhas
        if (data.password !== data.confirmPassword) {
            setMessage('As senhas não coincidem.');
            toast.error(message);
            return;
        }

        // Você pode adicionar mais validações aqui (e-mail válido, CPF, etc.)
        if (data.password.length < 8) {
            setMessage('A senha deve ter no mínimo 8 caracteres.');
            toast.error(message);
            return;
        }

        // Prepara os dados para o backend (usando o email como username)
        const newData = {
            data : {
                username  : data.username,
                cpf       : cpf,
                fullName  : data.fullname,
                birthDate : birthDate,
                password  : data.password,
            }
        };
        // console.log('newData', newData.data)

        try {
            // Requisição para o backend
            const response = await fetch('http://localhost:5000/register', { // Certifique-se que a porta é a correta do seu backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData.data),
            });
            // console.log('chegou', response)

            const result = await response.json();
            // console.log('result', result)

            if (response.ok) {
                setMessage(result.message); // Exibe mensagem de sucesso do backend
                toast.success(message);
                router.push("/login");
            } else {
                toast.error(result.message);
                setMessage(result.message || 'Erro ao cadastrar usuário.'); // Exibe mensagem de erro do backend
            }
        } catch (error) {
            console.error('Erro de rede ou servidor:', error);
            setMessage('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
        }
    };

    return(
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <h1 className={styles.registerTitle}>Crie sua Conta</h1>
                <p className={styles.registerSubtitle}>Gerencie suas finanças de forma simples e segura.</p>

                <form className={styles.registerForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeCompleto">Nome Completo</label>
                        <input
                            type="text"
                            {...register("fullname", {
                                validate: (value) =>
                                    value.length >= 2 ||
                                    "Seu nome deve possuir 2 caracteres no mínimo"
                                })
                            }
                            placeholder="Seu nome completo"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="seuemail@exemplo.com"
                            {...register("username", {
                                    required: "Este campo é obrigatório!",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido",
                                    },
                                }
                            )}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cpf">CPF</label>
                        <Controller
                            name="cpf"
                            control={controlInfo}
                            render={({ field }) => (
                                <PatternFormat
                                    {...field}
                                    format="###.###.###-##"
                                    type="tel"
                                    autoComplete="new-password"
                                    placeholder="000.000.000-00"
                                    allowEmptyFormatting={false}
                                    className={styles.input}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            )}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cpf">Data de Nascimento</label>
                        <Controller
                            name="birthday"
                            control={controlInfo}
                            render={({ field }) => (
                                <PatternFormat
                                    {...field}
                                    format="##/##/####"
                                    type="tel"
                                    autoComplete="new-password"
                                    placeholder="ex: 08/09/1994"
                                    allowEmptyFormatting={false}
                                    className={styles.input}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            )}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            {...register("password")}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            {...register("confirmPassword")}
                            placeholder="Digite sua senha novamente"
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.btnRegister}
                        onClick={handleSubmit(handleSubmitRegister)}
                    >
                        Cadastrar
                    </button>
                </form>

                <p className={styles.registerLoginLink}>Já tem uma conta? <a href="/login">Faça Login</a></p>
            </div>
        </div>
    );
}