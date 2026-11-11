const Materia = require('../models/Materia');

// POST /api/materias - Crea una nueva materia
exports.crearMateria = async (req, res) => {
  try {
    // Extraemos los datos enviados en el cuerpo de la petición
    const { nombre, codigo, profesor, color, horarios, aula } = req.body;

    // Creamos la instancia de la materia asignando el usuario autenticado (viene del middleware auth)
    const nuevaMateria = new Materia({
      nombre,
      codigo,
      profesor,
      color,
      horarios,
      aula,
      usuario: req.usuario.id 
    });

    // Guardamos en MongoDB
    const materiaGuardada = await nuevaMateria.save();
    res.status(201).json(materiaGuardada);

  } catch (error) {
    console.error('Error al crear materia:', error.message);
    res.status(500).send('Error en el servidor al guardar la materia');
  }
};

// GET /api/materias - Obtiene todas las materias del usuario autenticado
exports.obtenerMaterias = async (req, res) => {
  try {
    // Busca en MongoDB solo las materias que pertenecen al usuario actual
    const materias = await Materia.find({ usuario: req.usuario.id }).sort({ createdAt: -1 });
    res.json(materias);
  } catch (error) {
    console.error('Error al obtener materias:', error.message);
    res.status(500).send('Error en el servidor al consultar materias');
  }
};