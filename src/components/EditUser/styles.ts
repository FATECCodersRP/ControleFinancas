import styled from 'styled-components';

export const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PopupContent = styled.div`
    background: #263238;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const PopupHeader = styled.h2`
    margin-top: 0;
`;

export const PopupLabel = styled.label`
    display: block;
    margin-bottom: 8px;
`;

export const PopupInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

export const PopupButton = styled.button`
    margin-right: 8px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

export const PopupButtonCancel = styled(PopupButton)`
    background-color: #ccc;
`;

export const PopupButtonSave = styled(PopupButton)`
    background-color: #4E41F0;
    color: white;
`;
