'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const { login }               = useAuth();
    const router                  = useRouter();
    const [error, setError]       = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página

        setError(''); // Limpa mensagens de erro anteriores

        if (!username || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Requisição POST para a sua rota de login do backend
            const response = await axios.post('http://localhost:5000/login', {
                username: username, // O backend espera 'username'
                password: password,
            });

            // Se o login for bem-sucedido
            if (response.status === 200) {
                const { token } = response.data;
                login(token); // Chama a função login do AuthContext para armazenar o token e atualizar o estado
                // Armazena o token no localStorage
                localStorage.setItem('jwt_token', token);
                toast.success('Login efetuado com sucesso!');

                // Redireciona para uma página protegida
                router.push('/profile');
            }
        } catch (err: any) {
            // Lida com erros da requisição
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Erro ao fazer login. Tente novamente.');
                toast.error(error);
            } else {
                setError('Erro desconhecido ao conectar ao servidor.');
                console.error('Erro de login:', err);
            }
        }
    };

    return(
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2>Entrar na sua conta</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        id="username"
                        placeholder="seu_usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Entrar</button>
                <p className={styles.signupLink}>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
            </form>
        </div>
    );
}