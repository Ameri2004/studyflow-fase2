const mongoose = require('mongoose');

const MateriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la materia es obligatorio'],
    trim: true
  },
  codigo: {
    type: String,
    trim: true
  },
  profesor: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#4F46E5', // Indigo StudyFlow por defecto
    match: [/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Debe ser un color hexadecimal válido']
  },
  horarios: {
    type: String,
    trim: true
  },
  aula: {
    type: String,
    trim: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Materia', MateriaSchema);