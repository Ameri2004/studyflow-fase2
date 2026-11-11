import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GestorMaterias from '../components/GestorMaterias';
import Kanban from '../components/Kanban'; // Importamos el Kanban

const Dashboard = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Estado para saber qué materia clickeó el usuario
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-light p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-surface p-6 rounded-xl shadow-sm mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-dark">
              ¡Hola, {usuario?.nombre || 'Estudiante'}!
            </h1>
            <p className="text-neutral-medium">Bienvenido a tu panel de StudyFlow</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-danger hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-colors font-medium shadow-sm"
          >
            Cerrar Sesión
          </button>
        </header>

        {/* Contenido Principal en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Columna Izquierda: Materias (Ocupa 4/12 espacios) */}
          <div className="lg:col-span-4 bg-surface p-5 rounded-xl shadow-sm border-t-4 border-primary">
            <h2 className="text-xl font-bold text-neutral-dark mb-4">Mis Materias</h2>
            <GestorMaterias onSelectMateria={setMateriaSeleccionada} materiaActiva={materiaSeleccionada?._id} />
          </div>

          {/* Columna Derecha: Kanban (Ocupa 8/12 espacios) */}
          <div className="lg:col-span-8 bg-surface p-5 rounded-xl shadow-sm border-t-4 border-warning overflow-hidden">
            <h2 className="text-xl font-bold text-neutral-dark mb-4">Gestión de Tareas</h2>
            <Kanban 
              materiaId={materiaSeleccionada?._id} 
              materiaNombre={materiaSeleccionada?.nombre} 
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;