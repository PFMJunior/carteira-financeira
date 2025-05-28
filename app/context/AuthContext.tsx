'use client';

import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface UserData {
    username : string
    fullName : string
    cpf      : number
    birthDate: Date
}

interface AuthContextType {
    // user           : UserData | null;
    isAuthenticated: boolean;
    login          : (token: string) => void;
    logout         : () => void;
    isLoading      : boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router                                = useRouter();
    const [isLoading, setIsLoading]             = useState<boolean>(true); // Começa como true para indicar que está carregando
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            // Aqui você poderia adicionar uma lógica para validar o token no backend
            // Se for um JWT, você pode decodificá-lo e verificar a expiração
            // Por simplicidade, vamos apenas verificar se ele existe
            setIsAuthenticated(true);
        }
        setIsLoading(false); // Termina o carregamento após a verificação inicial
    }, []);

    const login = (token: string) => {
        localStorage.setItem('jwt_token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setIsAuthenticated(false);
        router.push('/login'); // Redireciona para a página de login ao deslogar
    };

    return(
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
            {children}
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