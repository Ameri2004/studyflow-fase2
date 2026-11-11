const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');

// Rutas de tareas protegidas
router.post('/', auth, tareaController.crearTarea);
router.get('/materia/:materiaId', auth, tareaController.obtenerTareasPorMateria);
router.patch('/:id/estado', auth, tareaController.actualizarEstadoTarea);

module.exports = router;