const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const auth = require('../middleware/auth');

// Todas las rutas de materias son protegidas, requieren token JWT
router.post('/', auth, materiaController.crearMateria);
router.get('/', auth, materiaController.obtenerMaterias);

module.exports = router;