import styled from 'styled-components';

interface ChangePasswordProps {
  onOpen: () => void;
}

const ChangePassword = ({ onOpen }: ChangePasswordProps) => {
  return (
    <ChangePasswordStyle onClick={onOpen}>
      <i className='fa-solid fa-lock'></i>
      <span>Change Password</span>
    </ChangePasswordStyle>
  );
};

export default ChangePassword;

const ChangePasswordStyle = styled.div`
  color: #eeeeee;
  margin-top: 16px;
  border-radius: 4px;
  cursor: pointer;
  padding-left: 4px;
  & span {
    padding-left: 8px;
  }

  &:hover {
    background: #d5d8df40;
  }
`;
