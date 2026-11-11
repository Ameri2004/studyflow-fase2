import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Verifica si ya hay un token guardado al recargar la página
  useEffect(() => {
    const verificarUsuario = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUsuario(res.data);
        } catch (error) {
          console.error("Token inválido o expirado");
          localStorage.removeItem('token');
        }
      }
      setCargando(false);
    };
    verificarUsuario();
  }, []);

  const login = async (datos) => {
    try {
      const res = await api.post('/auth/login', datos);
      localStorage.setItem('token', res.data.token);
      
      // Obtener datos del usuario inmediatamente después de loguearse
      const meRes = await api.get('/auth/me');
      setUsuario(meRes.data);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al iniciar sesión');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, error, login, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};