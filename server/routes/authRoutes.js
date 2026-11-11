const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const Usuario = require('../models/Usuario');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente (Devuelve token JWT)
 */
router.post('/register', authController.registrarUsuario);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso (Devuelve token JWT)
 */
router.post('/login', authController.loginUsuario);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtiene los datos del usuario autenticado
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario (sin contraseña)
 */
router.get('/me', auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.json(usuario);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;