import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-light p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center bg-surface p-6 rounded-xl shadow-sm mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-dark">
              ¡Hola, {usuario?.nombre || 'Estudiante'}!
            </h1>
            <p className="text-neutral-medium">Bienvenido a tu panel de StudyFlow</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-danger hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface p-6 rounded-xl shadow-sm border-t-4 border-primary">
            <h2 className="text-xl font-bold text-neutral-dark mb-2">Mis Materias</h2>
            <p className="text-neutral-medium">Próximamente implementaremos el listado aquí.</p>
          </div>
          <div className="bg-surface p-6 rounded-xl shadow-sm border-t-4 border-warning">
            <h2 className="text-xl font-bold text-neutral-dark mb-2">Tareas Pendientes</h2>
            <p className="text-neutral-medium">Próximamente implementaremos el tablero Kanban.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;