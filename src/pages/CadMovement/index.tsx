import React, { useState } from 'react';

import logoImg from '../../assets/logo.svg';

import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Toggle from '../../components/ToggleMov';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    Logo,
    Form,
    FormTitle,
} from './styles';

const CadMovement: React.FC = () => {
    const [description, setDescription] = useState<string>('');
    const [value, setValue] = useState<number>(0);
    const [frequency, setFrequency] = useState<string>('Recorrente');
    const [date, setDate] = useState<string>('');
    const [isEntrada, setIsEntrada] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { userId, userName, isAdmin } = useAuth();

    console.log('Usuário Admin:', isAdmin);
    console.log('Nome do Usuário:', userName);

    const optionsFreq = [
        { value: 'Recorrente', label: 'Recorrente' },
        { value: 'Eventual', label: 'Eventual' },
    ];

    const handleToggleChange = () => {
        setIsEntrada(!isEntrada);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitting) {
            console.log('Submissão já está em andamento.');
            return;
        }
        setIsSubmitting(true);

        if (userId === null) {
            alert('Usuário não está logado!');
            setIsSubmitting(false);
            return;
        }

        // Determinar o tipo de frequência e movimento
        const frequencyLabel = frequency === 'Recorrente' ? 'recorrentes' : 'eventuais';
        const movementType = isEntrada ? 'entradas' : 'saidas'; // Ajuste para alternar corretamente

        // Preparar o endpoint e o corpo da requisição
        const endpoint = `http://localhost:8080/${movementType}/${frequencyLabel}`;

        const requestBody = {
            descricao: description,
            valor: value,
            frequencia: frequency,
            data: date,
            idUsuario: userId,
        };

        console.log('Movimento:', isEntrada ? 'Entrada' : 'Saída');
        console.log('Endpoint:', endpoint);
        console.log('Body:', requestBody);

        try {
            // Primeira requisição
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            console.log('Resposta da Primeira Requisição:', response);

            if (response.ok) {
                const responseData = await response.json();
                console.log('Dados Retornados da Primeira Requisição:', responseData);

                alert('Movimento cadastrado com sucesso!');

                // Segunda requisição
                const secondEndpoint = `http://localhost:8080/registro/registra/${movementType}/${frequencyLabel}/${userId}`;
                console.log('Preparando para enviar segunda requisição...');
                console.log('Second Endpoint:', secondEndpoint);

                const secondResponse = await fetch(secondEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                console.log('Resposta da Segunda Requisição:', secondResponse);

                if (secondResponse.ok) {
                    const secondResponseData = await secondResponse.json();
                    console.log('Dados Retornados da Segunda Requisição:', secondResponseData);
                } else {
                    console.error(
                        'Erro na segunda requisição:',
                        secondResponse.status,
                        secondResponse.statusText
                    );
                }
            } else {
                console.error(
                    'Erro na primeira requisição:',
                    response.status,
                    response.statusText
                );
                alert('Erro ao cadastrar movimento!');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
            setIsSubmitting(false); // Reativar o botão após a conclusão
        }
    };

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Movimentos da Carteira</h2>
            </Logo>

            <Form onSubmit={handleSubmit}>
                <FormTitle>Cadastro de Movimentos</FormTitle>

                <Toggle
                    labelLeft="Entrada"
                    labelRight="Saída"
                    checked={!isEntrada} // Corrigido para refletir "Saída" ao alternar
                    onChange={handleToggleChange}
                />

                <Select 
                    options={optionsFreq}
                    onChange={(e) => setFrequency(e.target.value)}
                />

                <Input 
                    type="text"
                    placeholder="Descrição"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input 
                    type="number"
                    placeholder="Valor: R$00,00"
                    required
                    onChange={(e) => setValue(parseFloat(e.target.value))}
                />
                <Input 
                    type="date"
                    placeholder="Data"
                    required
                    onChange={(e) => setDate(e.target.value)}
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
            </Form>
        </Container>
    );
};

export default CadMovement;
