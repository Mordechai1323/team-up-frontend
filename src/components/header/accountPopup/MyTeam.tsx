import styled from 'styled-components';

interface MyTeamProps {
  onOpen: () => void;
}

const MyTeam = ({ onOpen }: MyTeamProps) => {
  return (
    <MyTeamStyle onClick={onOpen}>
      <i className='fa-solid fa-users'></i>
      <span>My Team</span>
    </MyTeamStyle>
  );
};

export default MyTeam;

const MyTeamStyle = styled.div`
  color: #eeeeee;
  margin-top: 16px;
  padding-left: 4px;
  border-radius: 4px;
  cursor: pointer;
  & span {
    padding-left: 8px;
  }

  &:hover {
    background: #d5d8df40;
  }
`;
