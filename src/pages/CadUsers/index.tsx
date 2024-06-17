import React, { useState } from 'react';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    Logo,
    Form,
    FormTitle,
} from './styles';

const CadUsers: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isAdm, setIsAdm] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validação simples de senha
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const userData = {
            nome: name,
            email,
            senha: password,
            adm: isAdm ? 1 : 0,
        };

        try {
            const response = await fetch('http://localhost:8080/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });console.log(userData)

            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar usuário!');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar usuário!');
        }
    };

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Adicionar Usuários</h2>
            </Logo>

            <Form onSubmit={handleSubmit}>
                <FormTitle>Cadastro de usuário</FormTitle>

                <Input 
                    type="text"
                    placeholder="Digite seu nome"
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <Input 
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    type="password"
                    placeholder="Senha"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input 
                    type="password"
                    placeholder="Confirme a senha"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label>
                    <input 
                        type="checkbox"
                        checked={isAdm}
                        onChange={(e) => setIsAdm(e.target.checked)}
                    />
                    Administrador
                </label>

                <Button type="submit">Cadastrar</Button>
            </Form>
        </Container>
    );
}

export default CadUsers;
