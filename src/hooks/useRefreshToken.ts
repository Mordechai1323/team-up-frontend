import axios from '../api/axios';
import useAuth from './useAuth';
import { AuthState } from '../context/AuthProvider';

function UseRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
	//check this
    const responseData: AuthState = response.data;
    setAuth(responseData);
	//js
    // setAuth((prev: IAuthState) => {
    //   return {
    //     ...prev,
    //     name: response.data.name,
    //     role: response.data.role,
    //     accessToken: response.data.accessToken,
    //   };
    // });
    return response.data.accessToken;
  };

  return refresh;
}

export default UseRefreshToken;
