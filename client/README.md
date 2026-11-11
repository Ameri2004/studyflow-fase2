# 📚 StudyFlow - Fase 2 (Full-Stack)

StudyFlow es una aplicación web orientada a estudiantes universitarios para gestionar su carga académica y tareas mediante un sistema de tableros Kanban interactivos.

## 🚀 Tecnologías Utilizadas
* **Frontend:** React.js, Vite, Tailwind CSS v3, React Router DOM, Axios.
* **Backend:** Node.js, Express.js, Mongoose.
* **Base de Datos:** MongoDB.
* **Seguridad:** JSON Web Tokens (JWT) y Bcryptjs.
* **Documentación:** Swagger UI (OpenAPI 3.0).

## ⚙️ Funcionalidades (Requisitos Fase 2)
* **Autenticación (RF01):** Registro y Login con encriptación de contraseñas y validación de sesiones por token JWT.
* **Gestor de Materias (RF02):** Creación y visualización de asignaturas vinculadas al usuario, con personalización de colores.
* **Tablero Kanban (RF03/RF04):** Panel interactivo para gestionar tareas y cambiar su estado (Pendiente, En Proceso, Completado).
* **API RESTful Documentada:** Endpoints interactivos accesibles y probables a través de Swagger.

## 🛠️ Instalación y Ejecución Local

### 1. Requisitos Previos
* Node.js instalado.
* MongoDB ejecutándose localmente (puerto 27017).

### 2. Configurar el Backend (Servidor)
Abre una terminal y ejecuta:
```bash
cd server
npm install