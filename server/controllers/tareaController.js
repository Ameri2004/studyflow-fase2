const Tarea = require('../models/Tarea');
const Materia = require('../models/Materia');

// POST /api/tareas - Crea una nueva tarea asociada a una materia
exports.crearTarea = async (req, res) => {
  try {
    const { titulo, tipo, fechaLimite, prioridad, estado, recordatorioActivo, materia } = req.body;

    // Verificar que la materia exista y pertenezca al usuario
    const materiaExiste = await Materia.findById(materia);
    if (!materiaExiste || materiaExiste.usuario.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: 'Materia no encontrada o no autorizada' });
    }

    const nuevaTarea = new Tarea({
      titulo,
      tipo,
      fechaLimite,
      prioridad,
      estado,
      recordatorioActivo,
      materia,
      usuario: req.usuario.id
    });

    const tareaGuardada = await nuevaTarea.save();
    res.status(201).json(tareaGuardada);
  } catch (error) {
    console.error('Error al crear tarea:', error.message);
    res.status(500).send('Error en el servidor al guardar la tarea');
  }
};

// GET /api/tareas/materia/:materiaId - Obtiene las tareas de una materia
exports.obtenerTareasPorMateria = async (req, res) => {
  try {
    const tareas = await Tarea.find({ 
      materia: req.params.materiaId, 
      usuario: req.usuario.id 
    }).sort({ fechaLimite: 1 }); // Ordenadas por fecha límite de más próxima a más lejana
    
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error.message);
    res.status(500).send('Error en el servidor al consultar tareas');
  }
};

// PATCH /api/tareas/:id/estado - Actualiza solo el estado (Para el Drag & Drop del Kanban)
exports.actualizarEstadoTarea = async (req, res) => {
  try {
    const { estado } = req.body;
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea || tarea.usuario.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: 'Tarea no encontrada' });
    }

    // Actualiza el estado ('Pendiente', 'En Proceso', 'Completado')
    tarea.estado = estado;
    await tarea.save();
    
    res.json(tarea);
  } catch (error) {
    console.error('Error al actualizar estado:', error.message);
    res.status(500).send('Error en el servidor al actualizar la tarea');
  }
};