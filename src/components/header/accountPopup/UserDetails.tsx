import styled from 'styled-components';
import useAuth from '../../../hooks/useAuth';

const UserDetails = () => {
  const { auth } = useAuth();
  return <UserDetailsStyle>{auth.name}</UserDetailsStyle>;
};

export default UserDetails;

const UserDetailsStyle = styled.div`
  color: #eeeeee;
  padding-left: 4px;
  font-size: 1.25em;
  border-bottom: 1px solid #eeeeee56;
`;
