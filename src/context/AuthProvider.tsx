import { createContext, useState, ReactNode } from 'react';

export interface AuthState {
  name: string;
  role: string;
  accessToken: string;
}

interface AuthContext {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  persist: boolean;
  setPersist: (persist: boolean) => void;
}

const AuthContext = createContext<AuthContext>({
  auth: { name: '', role: '', accessToken: '' },
  setAuth: () => {},
  persist: true,
  setPersist: () => {},
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState({ name: '', role: '', accessToken: '' });
  const [persist, setPersist] = useState<boolean>(() => {
    const persistValue = localStorage.getItem('persist');
    return persistValue ? JSON.parse(persistValue) : false;
  });

  return <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
