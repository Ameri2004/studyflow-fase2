const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título de la tarea es obligatorio'],
    trim: true
  },
  tipo: {
    type: String,
    enum: ['Examen', 'TP', 'Lectura', 'Otro'],
    default: 'TP'
  },
  fechaLimite: {
    type: Date,
    required: [true, 'La fecha límite es obligatoria']
  },
  prioridad: {
    type: String,
    enum: ['Baja', 'Media', 'Alta'],
    default: 'Media'
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'En Proceso', 'Completado'],
    default: 'Pendiente'
  },
  recordatorioActivo: {
    type: Boolean,
    default: false
  },
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Tarea', TareaSchema);  