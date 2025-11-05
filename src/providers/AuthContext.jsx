import { createContext, useContext, useState, useEffect } from "react";
import { usuarios } from "../data/usuarios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const guardado = localStorage.getItem("usuario");
    if (guardado) setUsuario(JSON.parse(guardado));
  }, []);

  const login = (email, password) => {
    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setUsuario(user);
      localStorage.setItem("usuario", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
