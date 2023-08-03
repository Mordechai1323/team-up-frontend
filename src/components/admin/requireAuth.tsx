import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface RequireAuthProps {
  allowedRoles: string[];
}

export default function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles.includes(auth?.role) || auth?.role === 'admin' ? (
    <Outlet />
  ) : auth?.name ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}
