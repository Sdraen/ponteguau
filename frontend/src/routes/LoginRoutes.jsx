// src/routes/LoginRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de que el path a AuthContext es correcto

const LoginRoutes = () => {
  const { user } = useAuth(); // Obtiene el usuario del contexto de autenticación

  // Verifica si el usuario está autenticado
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginRoutes;
