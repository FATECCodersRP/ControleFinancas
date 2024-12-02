import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface IAuthContext {
    logged: boolean;
    userId: number | null;
    userName: string | null;
    isAdmin: boolean | null;
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

    const [userName, setUserName] = useState<string | null>(() => {
        const storedUserName = localStorage.getItem('@minha-carteira:userName');
        return storedUserName ? storedUserName : null;
    });

    const [isAdmin, setIsAdmin] = useState<boolean | null>(() => {
        const storedIsAdmin = localStorage.getItem('@minha-carteira:isAdmin');
        return storedIsAdmin ? JSON.parse(storedIsAdmin) : null;
    });

    const signIn = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8080/usuarios/login', {
                email,
                senha: password
            });

            console.log("resposta api --> ", response);

            if (response.status === 200) {
                const { id, nome, adm } = response.data; // Supondo que a resposta contém o ID, nome e o campo adm do usuário
                localStorage.setItem('@minha-carteira:logged', 'true');
                localStorage.setItem('@minha-carteira:userId', id.toString());
                localStorage.setItem('@minha-carteira:userName', nome);
                localStorage.setItem('@minha-carteira:isAdmin', JSON.stringify(adm));
                setLogged(true);
                setUserId(id);
                setUserName(nome);
                setIsAdmin(adm);
                console.log(email);
                console.log(password);
                console.log(id);
                console.log(nome);
                console.log(adm);
            } else {
                alert('Senha ou usuário inválidos!');
            }
        } catch (error) {
            console.log(error)
            console.log(email);
            console.log(password);
            alert('Erro ao fazer login! Por favor, tente novamente.');
        }
    };

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        localStorage.removeItem('@minha-carteira:userId');
        localStorage.removeItem('@minha-carteira:userName');
        localStorage.removeItem('@minha-carteira:isAdmin');
        setLogged(false);
        setUserId(null);
        setUserName(null);
        setIsAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ logged, userId, userName, isAdmin, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
