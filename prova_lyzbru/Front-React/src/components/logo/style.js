import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400&family=Poppins:wght@700&display=swap');
`;

export const LogoCaixa = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const LogoTitulo = styled.h1`
  color: #ffffff;
  font-size: 90px;
  font-weight: 800;
  letter-spacing: 2px;
  font-family: 'poller-one-regular';
`;

export const LogoSubtitulo = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-style: italic;
  font-family: 'Lora', serif;
`;
