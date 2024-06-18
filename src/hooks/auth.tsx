import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { error } from 'console';

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');

        return !!isLogged;
    });

    const signIn = async (email: string, password: string) => {
        try {

            const email2 = `${email}`
            console.log(email2)
            const senha2 = `${password}`
            console.log(senha2)

            const response = await axios.post('http://localhost:8080/usuarios/login', {
                email: email2,
                senha: senha2
            });

            console.log("resposta api --> ",response)

            if (response.status = 200) {
                localStorage.setItem('@minha-carteira:logged', 'true');
                setLogged(true);
                console.log(email)
                console.log(password)
            } else {
                alert('Senha ou usuário inválidos!');
            }
        } catch (error) {
            alert('Erro ao fazer login! Por favor, tente novamente.');
            console.log(email)
            console.log(password)
        }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
