import { useState, useEffect } from 'react';
import api from '../services/api';

const Kanban = ({ materiaId, materiaNombre }) => {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [prioridad, setPrioridad] = useState('Media');

  useEffect(() => {
    if (materiaId) {
      obtenerTareas();
    }
  }, [materiaId]);

  const obtenerTareas = async () => {
    try {
      const res = await api.get(`/tareas/materia/${materiaId}`);
      setTareas(res.data);
    } catch (error) {
      console.error("Error al cargar tareas", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !fechaLimite) return alert('Título y fecha son obligatorios');
    
    try {
      await api.post('/tareas', { 
        titulo, 
        fechaLimite, 
        prioridad, 
        materia: materiaId 
      });
      setTitulo('');
      setFechaLimite('');
      obtenerTareas();
    } catch (error) {
      console.error("Error al crear tarea", error);
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await api.patch(`/tareas/${id}/estado`, { estado: nuevoEstado });
      obtenerTareas();
    } catch (error) {
      console.error("Error al cambiar estado", error);
    }
  };

  if (!materiaId) {
    return (
      <div className="flex items-center justify-center h-64 bg-neutral-100 rounded-lg border border-dashed border-neutral-300">
        <p className="text-neutral-medium text-center">👈 Selecciona una materia de la lista<br/>para ver su tablero Kanban.</p>
      </div>
    );
  }

  // Filtrar tareas por estado para las columnas
  const pendientes = tareas.filter(t => t.estado === 'Pendiente');
  const enProceso = tareas.filter(t => t.estado === 'En Proceso');
  const completadas = tareas.filter(t => t.estado === 'Completado');

  const renderColumna = (tituloColumna, tareasColumna, colorBorde) => (
    <div className="bg-neutral-100 p-3 rounded-lg flex-1 min-w-[200px]">
      <h4 className={`font-bold text-sm mb-3 border-b-2 ${colorBorde} pb-1`}>{tituloColumna} ({tareasColumna.length})</h4>
      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {tareasColumna.map(tarea => (
          <div key={tarea._id} className="bg-white p-3 rounded shadow-sm border border-neutral-200 text-sm">
            <p className="font-semibold text-neutral-dark truncate" title={tarea.titulo}>{tarea.titulo}</p>
            <div className="flex justify-between items-center mt-2 text-xs">
              <span className={`px-2 py-1 rounded-full ${tarea.prioridad === 'Alta' ? 'bg-danger/20 text-danger' : tarea.prioridad === 'Media' ? 'bg-warning/20 text-warning-dark' : 'bg-secondary/20 text-secondary'}`}>
                {tarea.prioridad}
              </span>
              <select 
                value={tarea.estado}
                onChange={(e) => cambiarEstado(tarea._id, e.target.value)}
                className="bg-neutral-light border border-neutral-300 rounded p-1 outline-none cursor-pointer"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-primary">Tablero: {materiaNombre}</h3>
      </div>
      
      {/* Formulario de Tareas Rápidas */}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 bg-neutral-light p-3 rounded-lg border border-neutral-200 items-end">
        <div className="flex-1 min-w-[150px]">
          <input type="text" placeholder="Nueva tarea..." value={titulo} onChange={e => setTitulo(e.target.value)} className="w-full p-2 text-sm border rounded outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <input type="date" value={fechaLimite} onChange={e => setFechaLimite(e.target.value)} className="p-2 text-sm border rounded outline-none" />
        </div>
        <div>
          <select value={prioridad} onChange={e => setPrioridad(e.target.value)} className="p-2 text-sm border rounded outline-none">
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-hover transition-colors font-medium">Añadir</button>
      </form>

      {/* Columnas Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {renderColumna('Pendiente', pendientes, 'border-neutral-medium')}
        {renderColumna('En Proceso', enProceso, 'border-warning')}
        {renderColumna('Completado', completadas, 'border-secondary')}
      </div>
    </div>
  );
};

export default Kanban;