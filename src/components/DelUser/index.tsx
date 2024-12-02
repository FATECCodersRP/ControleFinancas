import React from 'react';
import { PopupOverlay, PopupContent, PopupHeader, PopupMessage, PopupButtonCancel, PopupButtonDelete } from './styles';
import { IUser } from '../../pages/UserManagement';

interface DelUserPopupProps {
    user: IUser | null;
    onClose: () => void;
    onDelete: (userId: string) => void;
}

const DelUserPopup: React.FC<DelUserPopupProps> = ({ user, onClose, onDelete }) => {
    if (!user) return null;

    const handleDelete = () => {
        const confirmDelete = window.confirm(`Tem certeza de que deseja deletar o usuário ${user.nome}?`);
        if (confirmDelete) {
            onDelete(user.id);
        }
    };

    return (
        <PopupOverlay>
            <PopupContent>
                <PopupHeader>Deletar Usuário</PopupHeader>
                <PopupMessage>
                    Tem certeza de que deseja excluir o usuário <strong>{user.nome}</strong>?
                    <br />
                    Esta ação não poderá ser desfeita.
                </PopupMessage>
                <div>
                    <PopupButtonDelete onClick={handleDelete}>Deletar</PopupButtonDelete>
                    <PopupButtonCancel onClick={onClose}>Cancelar</PopupButtonCancel>
                </div>
            </PopupContent>
        </PopupOverlay>
    );
};

export default DelUserPopup;
