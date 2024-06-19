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
        background-color: #f2f2f2;
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
