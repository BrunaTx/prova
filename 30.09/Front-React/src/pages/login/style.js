import styled from 'styled-components';

export const Background = styled.div`
    background: #e41b97ff;
    display: flex;
    align-items: center;   
    justify-content: center;
    min-height: 100vh;     
    width: 100%;
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    min-width: 100%;
    min-height: 100vh;
    background: white;
    box-sizing: border-box;

    @media (max-width: 800px) {
        grid-template-columns: 1fr; 
    }
`;