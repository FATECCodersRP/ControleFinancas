import React from 'react';
import { Table, Button } from './styles';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type UserTableProps = {
    users: User[];
    onEdit: (userId: number) => void;
    onDelete: (userId: number) => void;
};

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <Button onClick={() => onEdit(user.id)}>Edit</Button>
                            <Button onClick={() => onDelete(user.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UserTable;
