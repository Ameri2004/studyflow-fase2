import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, setError, usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si ya está logueado, lo mandamos directo al dashboard
  useEffect(() => {
    if (usuario) {
      navigate('/dashboard');
    }
  }, [usuario, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Todos los campos son obligatorios');
    }
    const exito = await login({ email, password });
    if (exito) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light">
      <div className="bg-surface p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">StudyFlow</h1>
          <p className="text-neutral-medium">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="bg-danger/10 text-danger p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-medium">
          ¿No tienes cuenta? <Link to="/register" className="text-primary hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;