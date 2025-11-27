// src/hooks/useAuth.js
import { useLocalStorage } from './useLocalStorage';

/**
 * Hook personalizado para manejar autenticación
 * @returns {Object} - Objeto con usuario, login, logout y utilidades
 */
export const useAuth = () => {
  const [user, setUser, removeUser] = useLocalStorage('usuario', null);

  // Iniciar sesión
  const login = (userData) => {
    setUser(userData);
    return true;
  };

  // Cerrar sesión
  const logout = () => {
    removeUser();
  };

  // Verificar si está autenticado
  const isAuthenticated = !!user;

  // Verificar si es admin
  const isAdmin = user?.rol === 'admin';

  // Verificar si es cliente
  const isCliente = user?.rol === 'cliente';

  return {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isCliente,
  };
};
