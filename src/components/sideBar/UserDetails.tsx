import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';

const UserDetails = () => {
  const { auth } = useAuth();
  return (
    <UserDetailsStyle>
      <img src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${auth.name}`} alt='' />
      <h2>{auth.name}</h2>
    </UserDetailsStyle>
  );
};

export default UserDetails;

const UserDetailsStyle = styled.div`
  width: 100%;
  height: 4vh;
  display: flex;
  align-items: center;

  & img {
    width: 25%;
    height: 100%;
  }

  & h2 {
    font-size: 1em;
    margin: 0;
    color: #eeeeee;
  }
`;
