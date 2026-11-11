import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email || !password) {
      return setError('Todos los campos son obligatorios');
    }
    
    try {
      // Llamada directa al backend para registrar al usuario
      await api.post('/auth/register', { nombre, email, password });
      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      navigate('/'); // Redirige al login
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al registrar la cuenta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light">
      <div className="bg-surface p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Crear Cuenta</h1>
          <p className="text-neutral-medium">Regístrate en StudyFlow</p>
        </div>

        {error && (
          <div className="bg-danger/10 text-danger p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-1">Nombre Completo</label>
            <input 
              type="text" 
              className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Ej. Mateo Silva"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="estudiante@uab.edu.bo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-1">Contraseña</label>
            <input 
              type="password" 
              className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Registrarse
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-neutral-medium">
          ¿Ya tienes cuenta? <Link to="/" className="text-primary hover:underline">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;