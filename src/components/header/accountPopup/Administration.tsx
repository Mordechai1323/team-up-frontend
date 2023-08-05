import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Administration = () => {
  const nav = useNavigate();
  return (
    <AdministrationStyle onClick={() => nav('admin')}>
      <i className='fa-solid fa-gear'></i>
      <span>Administration</span>
    </AdministrationStyle>
  );
};

export default Administration;

const AdministrationStyle = styled.div`
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
