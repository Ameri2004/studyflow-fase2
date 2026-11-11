import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Componente para proteger las rutas privadas
const RutaPrivada = ({ children }) => {
  const { usuario, cargando } = useContext(AuthContext);
  
  if (cargando) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  
  // Si no hay usuario en sesión, lo devuelve al Login
  return usuario ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <RutaPrivada>
                <Dashboard />
              </RutaPrivada>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;