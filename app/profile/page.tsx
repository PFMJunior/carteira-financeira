'use client';

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { PatternFormat } from "react-number-format";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router                               = useRouter();
    const [cpf, setCpf]                        = useState('');
    const [message, setMessage]                = useState('');
    const [password, setPassword]              = useState('');
    const { control: controlInfo }             = useForm();
    const [birthDate, setBirthDate]            = useState('');
    const { isAuthenticated, isLoading, user } = useAuth();

    interface DataRegister {
        username       : string
        password       : string
        cpf            : string
        birthDate      : string
        fullname       : string
        accountNumber  : number
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

    console.log("user", user)

    return(
        <div className={styles.profilePage}>
            <div className={styles.profileCard}>
                <h1 className={styles.profileTitle}>Detalhes da sua Conta</h1>

                <form className={styles.profileForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nomeCompleto">Nome Completo</label>
                        <input
                            type="text"
                            defaultValue={user?.fullName}
                            // {...register("fullname", {
                            //     validate: (value) =>
                            //         value.length >= 2 ||
                            //         "Seu nome deve possuir 2 caracteres no mínimo"
                            //     })
                            // }
                            placeholder="Seu nome completo"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            defaultValue={user?.username}
                            placeholder="seuemail@exemplo.com"
                            // {...register("username", {
                            //         required: "Este campo é obrigatório!",
                            //         pattern: {
                            //             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //             message: "Email inválido",
                            //         },
                            //     }
                            // )}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cpf">CPF</label>
                        <Controller
                            name="cpf"
                            control={controlInfo}
                            defaultValue={user?.cpf}
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
                            defaultValue={user?.birthDate}
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
                        <label htmlFor="nomeCompleto">Número da Conta</label>
                        <input
                            type="tel"
                            // {...register("accountNumber", {
                            //     validate: (value) =>
                            //         value === 4 ||
                            //         "Está faltando algum digito"
                            //     })
                            // }
                            defaultValue={user?.accountNumber}
                            placeholder="Número da Conta"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}