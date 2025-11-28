import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage (guardados por usuarioService)
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    if (userId && userRole) {
      setUsuario({
        id: parseInt(userId),
        nombre: userName || "Usuario",
        rol: userRole
      });
    }
  }, []);

  const login = (userData) => {
    // userData viene del backend con: userId, nombre, apellido, email, rol
    setUsuario({
      id: userData.userId,
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol
    });
    return true;
  };

  const logout = () => {
    // Limpiar todos los carritos del localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('cart_')) {
        localStorage.removeItem(key);
      }
    });
    localStorage.removeItem('cart');
    localStorage.removeItem('cart_guest');
    
    setUsuario(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
  };

  const esAdministrador = () => {
    return usuario?.rol === "ADMIN";
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, esAdministrador }}>
      {children}
    </AuthContext.Provider>
  );
};
