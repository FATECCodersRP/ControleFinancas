import React, {useState} from 'react';

import logoImg from '../../assets/logo.svg';

import Select from '../../components/Select';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    Logo,
    Form,
    FormTitle,
} from './styles';

const CadMovement: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');    

    const { signIn } = useAuth();

    const optionsMov = [
        { value: '0', label: 'Entrada' },
        { value: '1', label: 'Saida' },
    ];

    const optionsFreq = [
        { value: '0', label: 'Recorrente' },
        { value: '1', label: 'Eventual' },
    ];

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>

            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>Cadastro de Movimentos</FormTitle>

                <Select options={optionsMov}/>

                <Select options={optionsFreq}/>

                <Input 
                    type="text"
                    placeholder="Descrição"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    type="number"
                    placeholder=",Valor: R$00,00"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

               <Button type="submit">Cadastrar</Button>
            </Form>
        </Container>
    );
}

export default CadMovement;