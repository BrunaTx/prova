import styled from 'styled-components';

import Banks_logo from '../../images/Banks_logo.png';

export const Container = styled.div`
    
    background-image: url( ${Banks_logo});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    @media (max-width: 800px) {
        display: none;
    }
`