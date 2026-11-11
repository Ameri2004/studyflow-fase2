const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST - StudyFlow',
      version: '1.0.0',
      description: 'Documentación interactiva de la API para la Segunda Entrega del Proyecto Integrador.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor Local de Desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Le indicamos a Swagger dónde buscar los comentarios de documentación
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Documentación Swagger disponible en http://localhost:5000/api-docs');
};

module.exports = swaggerDocs;