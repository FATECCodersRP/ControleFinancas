import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { useAuth } from '../../hooks/auth';

import { 
    Container, 
    Content, 
    Filters, 
    Table, 
    TableRow, 
    TableHeader, 
    TableCell,
    SearchInput,
    Button,
    ButtonDelete
} from './styles';

interface IUser {
    id: string;
    nome: string;
    email: string;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [filterField, setFilterField] = useState<string>('nome');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { userId } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/usuarios');
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const results = users.filter(user =>
            user[filterField as keyof IUser].toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, filterField, users]);

    const handleFilterFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterField(event.target.value);
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (id: string) => {
        console.log(`Edit user with id: ${id}`);
        // Implementar lógica de edição aqui
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/usuarios/${id}`);
            setUsers(users.filter(user => user.id !== id));
            setFilteredUsers(filteredUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error(`Erro ao deletar usuário com id ${id}:`, error);
        }
    };

    return (
        <Container>
            <ContentHeader title="Usuários" lineColor="#4E41F0">
                <SelectInput 
                    options={[
                        { value: 'nome', label: 'Nome' },
                        { value: 'id', label: 'ID' },
                        { value: 'email', label: 'Email' },
                    ]}
                    onChange={handleFilterFieldChange} 
                    defaultValue={filterField}
                />
                <SearchInput 
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </ContentHeader>

            <Content>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>Nome</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Editar</TableHeader>
                            <TableHeader>Deletar</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.nome}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(user.id)}>Editar</Button>
                                </TableCell>
                                <TableCell>
                                    <ButtonDelete onClick={() => handleDelete(user.id)}>Deletar</ButtonDelete>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </Content>
        </Container>
    );
};

export default UserTable;
