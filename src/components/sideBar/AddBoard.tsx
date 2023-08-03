import styled from 'styled-components';

interface AddBoardProps {
  onClick?: () => void;
  width?: string;
  height?: string;
  text?: string;
}

const AddBoard = ({ onClick, width, height, text = '+' }: AddBoardProps) => {
  return (
    <AddBoardStyle width={width} height={height}>
      <div onClick={onClick}>
        <span>{text}</span>
      </div>
    </AddBoardStyle>
  );
};

export default AddBoard;

const AddBoardStyle = styled.div<AddBoardProps>`
  width: ${(props) => (props.width ? props.width : '15%')};
  height: 4vh;

  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    cursor: pointer;
    width: 90%;
    height: ${(props) => (props.height ? props.height : '90%')};
    border-radius: 4px;
    background: #fd7014;
    display: flex;
    justify-content: center;
    align-items: center;
    & span {
      text-align: center;
      color: #eeeeee;
      font-size: 1em;
    }
  }

  @media (max-width: 1300px) {
    height: 6vh;

    & div {
      & span {
        font-size: 0.75em;
      }
    }
  }
`;
