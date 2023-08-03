import styled from 'styled-components';

interface CreateTeamProps {
  onOpen: () => void;
}

const CreateTeam = ({ onOpen }: CreateTeamProps) => {
  return (
    <CreateTeamStyle onClick={onOpen}>
      <i className='fa-solid fa-users'></i>
      <span>Create Team</span>
    </CreateTeamStyle>
  );
};

export default CreateTeam;

const CreateTeamStyle = styled.div`
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
