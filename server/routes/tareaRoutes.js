const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crea una nueva tarea asignada a una materia
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               tipo:
 *                 type: string
 *               fechaLimite:
 *                 type: string
 *                 format: date
 *               prioridad:
 *                 type: string
 *               estado:
 *                 type: string
 *               materia:
 *                 type: string
 *                 description: ID de la materia
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.post('/', auth, tareaController.crearTarea);

/**
 * @swagger
 * /api/tareas/materia/{materiaId}:
 *   get:
 *     summary: Obtiene las tareas de una materia específica
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: materiaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de tareas de la materia
 */
router.get('/materia/:materiaId', auth, tareaController.obtenerTareasPorMateria);

/**
 * @swagger
 * /api/tareas/{id}/estado:
 *   patch:
 *     summary: Actualiza el estado de una tarea (Kanban)
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [Pendiente, En Proceso, Completado]
 *     responses:
 *       200:
 *         description: Estado de tarea actualizado
 */
router.patch('/:id/estado', auth, tareaController.actualizarEstadoTarea);

module.exports = router;