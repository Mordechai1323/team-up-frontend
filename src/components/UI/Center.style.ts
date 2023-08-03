import styled from 'styled-components';

interface CenterProps {
  width?: string;
  background?: string;
}

export const Center = styled.div<CenterProps>`
  width: ${(p) => (p.width ? p.width : '80%')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: ${(p) => p.background};
  border-radius: 4vw;
`;
