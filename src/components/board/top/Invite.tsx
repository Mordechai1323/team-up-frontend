import styled from 'styled-components';

interface InviteProps {
  onClick: () => void;
  icon: string;
  text: string;
}

const Invite = ({ onClick, icon, text }: InviteProps) => {
  return (
    <InviteStyle onClick={onClick}>
      <i className={icon}></i>
      <p>{text}</p>
    </InviteStyle>
  );
};

export default Invite;

export const InviteStyle = styled.div`
  position: relative;
  width: 7%;
  height: 4vh;
  display: flex;
  align-items: center;
  color: #eeeeee;
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    background: #d5d8df40;
    border-radius: 4px;
  }

  & i {
    padding-right: 4px;
    font-size: 1.2em;
  }

  & p {
    font-size: 1.4em;
    margin: 0;
  }

  @media (max-width: 1300px) {
    width: 10%;
  }
`;
