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

    const { signIn } = useAuth();

    const optionsFreq = [
        { value: 'Recorrente', label: 'Recorrente' },
        { value: 'Eventual', label: 'Eventual' },
    ];

    const handleToggleChange = () => {
        setIsEntrada(!isEntrada);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Determine frequency label
        const frequencyLabel = frequency === 'Recorrente' ? 'recorrentes' : 'eventuais';

        // Determine if it's an "Entrada" or "Saída"
        const movementType = !isEntrada ? 'entradas' : 'saidas';

        // Prepare the endpoint
        const endpoint = `http://localhost:8080/${movementType}/${frequencyLabel}`;

        // Prepare the request body
        const requestBody = {
            descricao: description,
            valor: value,
            frequencia: frequency,
            data: date,
            idUsuario: 10
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });console.log(requestBody)

            if (response.ok) {
                alert('Movimento cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar movimento!');
            }
        } catch (error) {
            console.error('Erro:', error);
            console.log(requestBody)
            console.log(endpoint)
            alert('Erro ao cadastrar movimento!');
        }
    };

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>

            <Form onSubmit={handleSubmit}>
                <FormTitle>Cadastro de Movimentos</FormTitle>

                <Toggle 
                    labelLeft="Entrada"
                    labelRight="Saída"
                    checked={isEntrada}
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

                <Button type="submit">Cadastrar</Button>
            </Form>
        </Container>
    );
}

export default CadMovement;
