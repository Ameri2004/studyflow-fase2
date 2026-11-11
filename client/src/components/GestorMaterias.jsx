import { useState, useEffect } from 'react';
import api from '../services/api';

const GestorMaterias = ({ onSelectMateria, materiaActiva }) => {
  const [materias, setMaterias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [profesor, setProfesor] = useState('');
  const [color, setColor] = useState('#4F46E5');

  useEffect(() => {
    obtenerMaterias();
  }, []);

  const obtenerMaterias = async () => {
    try {
      const res = await api.get('/materias');
      setMaterias(res.data);
    } catch (error) {
      console.error("Error al cargar las materias", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre) return alert('El nombre de la materia es obligatorio');
    
    try {
      await api.post('/materias', { nombre, profesor, color });
      setNombre('');
      setProfesor('');
      obtenerMaterias(); 
    } catch (error) {
      console.error("Error al crear materia", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Formulario Mejorado */}
      <form onSubmit={handleSubmit} className="bg-neutral-light p-4 rounded-lg border border-neutral-300">
        <h3 className="font-semibold text-neutral-dark mb-3 text-sm">Añadir Nueva Materia</h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Nombre (Ej. Base de Datos)"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full sm:w-1/2 p-2 border border-neutral-300 rounded focus:ring-2 focus:ring-primary outline-none text-sm"
            />
            <input
              type="text"
              placeholder="Profesor"
              value={profesor}
              onChange={(e) => setProfesor(e.target.value)}
              className="w-full sm:w-1/2 p-2 border border-neutral-300 rounded focus:ring-2 focus:ring-primary outline-none text-sm"
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-medium font-medium">Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border-none p-0"
              />
            </div>
            <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              Guardar
            </button>
          </div>
        </div>
      </form>

      {/* Lista de Materias (Ahora es interactiva) */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {materias.length === 0 ? (
          <p className="text-sm text-neutral-medium italic text-center py-4">No tienes materias registradas aún.</p>
        ) : (
          materias.map((materia) => (
            <div 
              key={materia._id} 
              onClick={() => onSelectMateria && onSelectMateria(materia)}
              className={`flex items-center p-3 rounded-lg border shadow-sm transition-transform cursor-pointer hover:bg-neutral-50 ${materiaActiva === materia._id ? 'ring-2 ring-primary bg-neutral-50' : 'bg-white'}`} 
              style={{ borderLeft: `5px solid ${materia.color}` }}
            >
              <div className="flex-1">
                <h4 className="font-bold text-neutral-dark text-sm">{materia.nombre}</h4>
                <p className="text-xs text-neutral-medium">{materia.profesor || 'Sin profesor'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GestorMaterias;