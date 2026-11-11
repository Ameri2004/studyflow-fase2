const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const Usuario = require('../models/Usuario');

// Rutas públicas
router.post('/register', authController.registrarUsuario);
router.post('/login', authController.loginUsuario);

// Ruta protegida (Requiere el token JWT) - GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    // Busca al usuario por el ID del token, omitiendo la contraseña
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json(usuario);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;