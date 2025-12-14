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
    // Normalizar datos: el backend puede devolver id o userId, rol o role
    const id = userData.id || userData.userId;
    const nombre = userData.nombre || userData.name;
    const rol = userData.rol || userData.role;

    setUsuario({
      id,
      nombre,
      email: userData.email,
      rol
    });

    // GUARDAR EN LOCALSTORAGE PARA PERSISTENCIA Y PARA OTROS COMPONENTES (Ej: Pago.jsx)
    localStorage.setItem("userId", id);
    localStorage.setItem("userName", nombre);
    localStorage.setItem("userRole", rol);

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
