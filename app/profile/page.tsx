'use client';

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { PatternFormat } from "react-number-format";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router                                 = useRouter();
    const [cpf, setCpf]                          = useState('');
    const [message, setMessage]                  = useState('');
    const [password, setPassword]                = useState('');
    const [birthDate, setBirthDate]              = useState('');
    const { isAuthenticated, isLoading, logout } = useAuth();

    // console.log("isAuthenticated", isAuthenticated)

    interface DataRegister {
        username: string
        password: string
        cpf: number
        birthDate: Date
        fullname: string
        confirmPassword: string
    }

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login'); // Redireciona se não estiver autenticado e o carregamento terminou
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <p className={styles.loading}>Carregando...</p>;
    }

    if (!isAuthenticated) {
        return null; // Não renderiza nada enquanto redireciona
    }

    const { handleSubmit, register } = useForm<DataRegister>();

    const {
        control : controlInfo,
    } = useForm()

    return(
        <div className={styles.profilePage}>
            <div className={styles.profileCard}>
                <h1 className={styles.profileTitle}>Detalhes da sua Conta</h1>

                <form className={styles.profileForm}>
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
                        className={styles.btnProfile}
                        // onClick={handleSubmit(handleSubmitRegister)}
                    >
                        Cadastrar
                    </button>
                    <button onClick={logout}>Sair</button>
                </form>
            </div>
        </div>
    );
}