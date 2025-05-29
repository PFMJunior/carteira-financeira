'use client';

import axios from "axios";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface UserData {
    id           : number;
    username     : string;
    fullName     : string;
    cpf          : string;
    birthDate    : string;
    balance      : number;
    accountNumber: number;
}

interface AuthContextType {
    user           : UserData | null;
    isAuthenticated: boolean;
    login          : (token: string) => void;
    logout         : () => void;
    isLoading      : boolean;
    fetchUserData  : () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router                                = useRouter();
    const [user, setUser]                       = useState<UserData | null>(null);
    const [isLoading, setIsLoading]             = useState<boolean>(true); // Começa como true para indicar que está carregando
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const fetchUserData = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('jwt_token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/user-data', { // Nova rota que vamos criar
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                // Se o token for inválido/expirado, deslogar
                logout();
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const login = (token: string) => {
        localStorage.setItem('jwt_token', token);
        setIsAuthenticated(true);
        fetchUserData();
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/login'); // Redireciona para a página de login ao deslogar
    };

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading, fetchUserData }}>
            {user && <Header />}
            {children}
          
            <Toaster
                position="top-center"
                reverseOrder={true}
                containerStyle={{
                fontSize : 16,
                }}
                toastOptions={{
                duration : 2500,
                }}
            />
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser adicionado dentro do AuthProvider');
    }
    return context;
};