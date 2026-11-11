const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const swaggerDocs = require('./config/swagger'); // IMPORTACIÓN DE SWAGGER

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); 

// Conexión a MongoDB (Mongoose ODM)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 Conectado exitosamente a MongoDB'))
  .catch((error) => console.error('🔴 Error al conectar a MongoDB:', error));

// Ruta de comprobación de estado de la API
app.get('/api/health', (req, res) => {
  res.json({ estado: 'API de StudyFlow funcionando correctamente' });
});

// Rutas principales de la API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/materias', require('./routes/materiaRoutes'));
app.use('/api/tareas', require('./routes/tareaRoutes'));

// Inicializar Swagger UI
swaggerDocs(app); // INYECCIÓN DE SWAGGER

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});