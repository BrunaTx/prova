import styled, { keyframes } from 'styled-components';
import { Button } from 'react-bootstrap';

// Card centralizado
export const FormCard = styled.div`
    max-width: 700px;
    margin: 50px auto;
    padding: 40px;
    background: #fff0f8;
    border-radius: 25px;
    box-shadow: 0 12px 30px rgba(233,12,185,0.2);
`;

// Título do formulário
export const FormTitle = styled.h2`
    text-align: center;
    color: #e90cb9ff;
    margin-bottom: 30px;
    font-size: 26px;
    font-weight: bold;
`;

// Seções do formulário (linha de inputs)
export const Section = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 25px;
`;

// Wrapper para cada input/label
export const InputWrapper = styled.div`
    flex: ${props => props.full ? '1 1 100%' : '1'};
    position: relative;
`;

// Inputs estilizados
export const Input = styled.input`
    width: 100%;
    padding: 14px 18px;
    border-radius: 20px;
    border: 2px solid #e90cb9ff;
    font-size: 16px;
    background: #fff;
    transition: 0.3s;

    &:focus {
        outline: none;
        border-color: #f73eacff;
        box-shadow: 0 0 10px rgba(247,62,172,0.3);
    }
`;

// Select estilizado
export const Select = styled.select`
    width: 100%;
    padding: 14px 18px;
    border-radius: 20px;
    border: 2px solid #e90cb9ff;
    font-size: 16px;
    background: #fff;

    &:focus {
        outline: none;
        border-color: #f73eacff;
        box-shadow: 0 0 10px rgba(247,62,172,0.3);
    }
`;

// Label
export const Label = styled.label`
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #e90cb9ff;
`;

// Botão submit com gradiente animado
const moveGradient = keyframes`
    0% { background-position: 0% }
    50% { background-position: 100% }
    100% { background-position: 0% }
`;

export const Submit = styled.input.attrs({ type: 'submit' })`
    width: 100%;
    max-width: 200px;
    padding: 14px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    color: white;
    background: linear-gradient(90deg,#e90cb9ff,#f73eacff);
    background-size: 200% 200%;
    animation: ${moveGradient} 5s ease infinite;
    transition: 0.3s;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 15px rgba(233,12,185,0.4);
    }
`;

// Linha de botões
export const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
`;

export const RosaButton = styled(Button)`
  background-color: #f700adff;
  border-color: #f700adff;
  color: #fff;

  &:hover {
    background-color: #c10099;
    border-color: #c10099;
  }
`;