import axios from 'axios';

// Crea una instancia de Axios con la URL base de tu backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Interceptor para inyectar el token JWT en cada petición automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;