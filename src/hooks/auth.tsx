import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface IAuthContext {
    logged: boolean;
    userId: number | null;
    signIn(email: string, password: string): void;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');
        return !!isLogged;
    });

    const [userId, setUserId] = useState<number | null>(() => {
        const storedUserId = localStorage.getItem('@minha-carteira:userId');
        return storedUserId ? parseInt(storedUserId) : null;
    });

    const signIn = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8080/usuarios/login', {
                email,
                senha: password
            });

            console.log("resposta api --> ", response);

            if (response.status === 200) {
                const { id } = response.data; // Supondo que a resposta contém o ID do usuário
                localStorage.setItem('@minha-carteira:logged', 'true');
                localStorage.setItem('@minha-carteira:userId', id.toString());
                setLogged(true);
                setUserId(id);
            } else {
                alert('Senha ou usuário inválidos!');
            }
        } catch (error) {
            alert('Erro ao fazer login! Por favor, tente novamente.');
            console.log(email);
            console.log(password);
        }
    };

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        localStorage.removeItem('@minha-carteira:userId');
        setLogged(false);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ logged, userId, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
