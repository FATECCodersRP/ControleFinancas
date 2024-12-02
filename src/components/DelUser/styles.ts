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
    z-index: 1000;
`;

export const PopupContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
`;

export const PopupHeader = styled.h2`
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
`;

export const PopupMessage = styled.p`
    margin-bottom: 20px;
    color: #555;
    font-size: 1rem;
`;

export const PopupButtonDelete = styled.button`
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        background-color: #c0392b;
    }
`;

export const PopupButtonCancel = styled.button`
    background-color: #ccc;
    color: #333;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #bbb;
    }
`;
