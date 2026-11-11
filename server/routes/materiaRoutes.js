const express = require('express');
const router = express.Router();
const materiaController = require('../controllers/materiaController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/materias:
 *   post:
 *     summary: Crea una nueva materia
 *     tags: [Materias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               codigo:
 *                 type: string
 *               profesor:
 *                 type: string
 *               color:
 *                 type: string
 *               horarios:
 *                 type: string
 *               aula:
 *                 type: string
 *     responses:
 *       201:
 *         description: Materia creada
 */
router.post('/', auth, materiaController.crearMateria);

/**
 * @swagger
 * /api/materias:
 *   get:
 *     summary: Obtiene todas las materias del usuario autenticado
 *     tags: [Materias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de materias
 */
router.get('/', auth, materiaController.obtenerMaterias);

module.exports = router;