import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout';
import LoginPage from './components/login/loginPage';
import Page404 from './components/page404';
import ForgotPassword from './components/login/forgotPassword/ForgotPassword.tsx';
import Unauthorized from './components/unauthorized';

import Account from './components/user/account';

import RequireAuth from './components/admin/requireAuth';
import PersistLogin from './components/admin/persistLogin.';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<Page404 />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={['user', 'team_leader']} />}></Route>
          <Route index element={<Account />} />
          <Route element={<RequireAuth allowedRoles={['admin']} />}>{/* <Route path='admin' element={<Admin />} /> */}</Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
