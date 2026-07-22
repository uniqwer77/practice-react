import { Navigate, Outlet } from 'react-router-dom';
import { getToken, isTokenValid, logoutUser } from '../services/authService';

export const ProtectedRoute = () => {
  const token = getToken();

  if (!token || !isTokenValid(token)) {
    logoutUser();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};