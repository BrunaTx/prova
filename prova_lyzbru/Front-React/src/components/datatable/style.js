import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Title = styled.h3`
   color: #e41b97ff;
    margin-top: 18px;
`
export const RosaButton = styled(Button)`
  background-color: #f700adff;
  border-color: #f700adff;
  color: #fff;

  &:hover {
    background-color: #c10099;
    border-color: #c10099;
  }
`;