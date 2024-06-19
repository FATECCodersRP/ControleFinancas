import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main``;

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #00008b;
    }
`;

export const TableHeader = styled.th`
    padding: 8px;
    text-align: left;
    background-color: #4E41F0;
    color: white;
`;

export const TableCell = styled.td`
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
`;

export const SearchInput = styled.input`
    padding: 8px;
    margin-left: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;

    &:focus {
        outline: none;
        border-color: #4E41F0;
    }
`;

export const Button = styled.button`
    padding: 8px 12px;
    margin: 0 5px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    color: white;
    background-color: #4E41F0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #372ba7;
    }

    &:focus {
        outline: none;
    }
`;

export const ButtonDelete = styled(Button)`
    background-color: #F04141;

    &:hover {
        background-color: #d13333;
    }
`;
