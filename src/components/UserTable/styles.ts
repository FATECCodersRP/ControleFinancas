import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        padding: 10px;
        border: 1px solid #ccc;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
    }
`;

export const Button = styled.button`
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:first-of-type {
        background-color: #4CAF50; /* Green */
        color: white;
    }

    &:last-of-type {
        background-color: #f44336; /* Red */
        color: white;
    }
`;
