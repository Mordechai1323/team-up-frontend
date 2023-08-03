import styled from 'styled-components';

interface ButtonProps {
  text?: string;
  type?: string;
  color?: string;
  background?: string;
  width?: string;
  overBackground?: string;
  onClick?: () => void;
}

const Button = ({ text, color, background, width, overBackground, onClick }: ButtonProps) => {
  return (
    <ButtonStyle color={color} background={background} width={width} overBackground={overBackground} onClick={onClick}>
      {text}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<ButtonProps>`
  width: ${(props) => (props?.width ? props?.width : '')};
  height: 36px;
  background-color: ${(props) => (props.background ? props.background : '#222831')};
  color: ${(props) => (props.color ? props.color : '#EEEEEE')};
  border-radius: 4px;
  border: none;
  margin: 0 8px;
`;
