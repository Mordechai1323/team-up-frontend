import styled from 'styled-components';

interface HeaderForgotPasswordProps {
  text: string;
}

export default function HeaderForgotPassword({ text }: HeaderForgotPasswordProps) {
  return (
    <HeaderForgetPasswordStyle>
      <h1>{text}</h1>
    </HeaderForgetPasswordStyle>
  );
}

const HeaderForgetPasswordStyle = styled.div`
  width: 80%;
  text-align: center;
  & h1 {
    font-size: 1.25em;
    font-weight: bold;
  }
`;
