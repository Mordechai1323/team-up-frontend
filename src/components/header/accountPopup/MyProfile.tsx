import styled from 'styled-components';

interface MyProfileProps {
  onOpen: () => void;
}

const MyProfile = ({ onOpen }: MyProfileProps) => {
  return (
    <MyProfileStyle onClick={onOpen}>
      <i className='fa-regular fa-circle-user'></i>
      <span>My Profile</span>
    </MyProfileStyle>
  );
};

export default MyProfile;

const MyProfileStyle = styled.div`
  color: #eeeeee;
  margin-top: 16px;
  border-radius: 4px;
  padding-left: 4px;
  cursor: pointer;
  & span {
    padding-left: 8px;
  }

  &:hover {
    background: #d5d8df40;
  }
`;
