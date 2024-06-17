import styled from 'styled-components';

export const Container = styled.select`
    width: 100%;

    margin: 7px 0;
    padding: 10px;

    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
    font-size: 16px;

    &:focus {
        border-color: #007BFF;
        outline: none;
    }
`;
