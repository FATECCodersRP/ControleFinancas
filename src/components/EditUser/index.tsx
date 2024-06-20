import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PopupOverlay, PopupContent, PopupHeader, PopupLabel, PopupInput, PopupButtonCancel, PopupButtonSave } from './styles';
import { IUser } from '../../pages/UserManagement'; 
import { useAuth } from '../../hooks/auth';

interface EditUserPopupProps {
    user: IUser | null;
    onClose: () => void;
    onSave: (user: IUser) => void;
}

const EditUserPopup: React.FC<EditUserPopupProps> = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState<IUser>(user || { id: '', nome: '', email: '', adm: false });

    useEffect(() => {
        if (user) {
            setEditedUser(user);
        }
    }, [user]);

    const { userId } = useAuth();

    if (!user) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setEditedUser({ ...editedUser, [name]: newValue });
    };

    const handleSave = async () => {
        const confirmSave = window.confirm("Tem certeza que deseja salvar as alterações?");
        if (confirmSave) {
            try {
                await axios.put(`http://localhost:8080/usuarios/${editedUser.id}`, editedUser);
                onSave(editedUser);
            } catch (error) {
                console.error(`Erro ao atualizar usuário com id ${editedUser.id}:`, error);
            }
        }
    };

    return (
        <PopupOverlay>
            <PopupContent>
                <PopupHeader>Editar Usuário</PopupHeader>
                <PopupLabel>
                    Nome:
                    <PopupInput type="text" name="nome" value={editedUser.nome} onChange={handleInputChange} />
                </PopupLabel>
                <PopupLabel>
                    Email:
                    <PopupInput type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
                </PopupLabel>
                <PopupLabel>
                    Administrador:
                    <input type="checkbox" name="adm" checked={editedUser.adm} onChange={handleInputChange} />
                </PopupLabel>
                <PopupButtonSave onClick={handleSave}>Salvar</PopupButtonSave>
                <PopupButtonCancel onClick={onClose}>Cancelar</PopupButtonCancel>
            </PopupContent>
        </PopupOverlay>
    );
};

export default EditUserPopup;
