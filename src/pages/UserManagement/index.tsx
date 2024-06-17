import React, { useState, useEffect } from 'react';
import UserTable from '../../components/UserTable';
import { Container, SearchInput } from './styles';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
    // Add more mock users as needed
];

const UserManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState(mockUsers);

    useEffect(() => {
        // Fetch users from an API if needed
    }, []);

    const handleEdit = (userId: number) => {
        // Handle edit user logic
        console.log(`Edit user with ID: ${userId}`);
    };

    const handleDelete = (userId: number) => {
        // Handle delete user logic
        console.log(`Delete user with ID: ${userId}`);
        setUsers(users.filter(user => user.id !== userId));
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <h1>User Management</h1>
            <SearchInput
                type="text"
                placeholder="Search user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
        </Container>
    );
};

export default UserManagement;
