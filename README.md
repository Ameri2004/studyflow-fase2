# 📚 StudyFlow - Fase 2 (Full-Stack)

StudyFlow es una aplicación web orientada a estudiantes universitarios que permite organizar y gestionar su carga académica mediante la administración de materias y tareas en un tablero Kanban interactivo.

El sistema facilita el seguimiento de las actividades académicas, permitiendo visualizar las tareas asociadas a cada materia y actualizar su estado de progreso.

## 1. Tecnologías utilizadas

### Frontend
- React.js 19
- Vite
- Tailwind CSS 3
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- Mongoose

### Base de datos
- MongoDB

### Seguridad
- JSON Web Tokens (JWT)
- bcryptjs para el cifrado de contraseñas
- Middleware de autenticación

### Documentación de API
- Swagger UI
- OpenAPI 3.0

## 2. Funcionalidades principales

### RF01. Autenticación de usuarios
- Registro de nuevas cuentas.
- Inicio de sesión.
- Encriptación de contraseñas.
- Autenticación mediante tokens JWT.
- Consulta de información del usuario autenticado.

### RF02. Gestión de materias
- Registro de materias académicas.
- Visualización de materias del usuario autenticado.
- Personalización de información, incluyendo colores, horarios y aula.

### RF03 y RF04. Gestión de tareas y tablero Kanban
- Creación de tareas vinculadas a una materia.
- Registro de título, tipo, fecha límite y prioridad.
- Organización de tareas por estado.
- Actualización del estado de las tareas.

Los estados contemplados son:
- Pendiente.
- En Proceso.
- Completado.

## 3. Estructura del proyecto

```text
studyflow-fase2/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── GestorMaterias.jsx
│       │   └── Kanban.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── services/
│       │   └── api.js
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── swagger.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

**Descripción de las carpetas principales:**

- `client/`: contiene la interfaz de usuario desarrollada en React.
- `components/`: contiene componentes reutilizables, como el gestor de materias y el tablero Kanban.
- `context/`: administra el contexto de autenticación.
- `pages/`: contiene las páginas de registro, inicio de sesión y panel principal.
- `services/`: centraliza la comunicación con la API.
- `server/`: contiene la lógica del backend.
- `config/`: almacena configuraciones del servidor, incluida Swagger.
- `controllers/`: gestiona la lógica de las operaciones.
- `middleware/`: contiene mecanismos intermedios, como la autenticación.
- `models/`: define los modelos de datos de MongoDB.
- `routes/`: define los endpoints de la API REST.

## 4. Requisitos previos

Para instalar y ejecutar StudyFlow se requiere:

- Node.js y npm.
- MongoDB instalado y ejecutándose localmente.
- Git.
- Un navegador web actualizado.

Puertos utilizados en el entorno local:

| Servicio | Puerto |
|---|---:|
| Frontend (Vite) | 5173 |
| Backend (Express) | 5000 |
| MongoDB | 27017 |

## 5. Instalación y ejecución local

### 5.1. Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta del proyecto:

```bash
cd studyflow-fase2
```

### 5.2. Configurar el backend

Ingresar a la carpeta del servidor:

```bash
cd server
```

Instalar las dependencias:

```bash
npm install
```

### 5.3. Configurar las variables de entorno

Dentro de la carpeta `server/`, crear un archivo llamado `.env`.

Configurar las siguientes variables:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/studyflow
JWT_SECRET=REEMPLAZAR_POR_UNA_CLAVE_SECRETA_ALEATORIA
```

Descripción de las variables:

- `PORT`: puerto en el que se ejecuta el backend.
- `MONGODB_URI`: dirección de conexión a MongoDB y nombre de la base de datos.
- `JWT_SECRET`: clave secreta utilizada para firmar los tokens de autenticación.

**Importante:** reemplazar el valor de `JWT_SECRET` por una clave aleatoria y privada. No compartir ni subir el archivo `.env` al repositorio.

### 5.4. Ejecutar el backend

Desde la carpeta `server/`, ejecutar:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:5000
```

La conexión con MongoDB se realiza mediante Mongoose.

### 5.5. Configurar el frontend

Abrir una segunda terminal e ingresar a la carpeta principal del proyecto:

```bash
cd studyflow-fase2/client
```

Instalar las dependencias:

```bash
npm install
```

### 5.6. Ejecutar el frontend

Ejecutar:

```bash
npm run dev
```

Vite mostrará la dirección local de la aplicación. Por defecto:

```text
http://localhost:5173
```

Abrir esa dirección en el navegador.

**Nota:** mantener abiertas las dos terminales mientras se utiliza la aplicación: una para el backend y otra para el frontend.

## 6. Documentación de la API REST

StudyFlow incorpora Swagger UI para consultar y probar los endpoints del backend.

Acceder desde el navegador:

```text
http://localhost:5000/api-docs
```

La documentación utiliza el estándar OpenAPI 3.0 y contempla autenticación mediante Bearer Token (JWT).

### 6.1. Endpoints de autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registrar un usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/me` | Consultar el usuario autenticado |

### 6.2. Endpoints de materias

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/materias` | Crear una materia |
| GET | `/api/materias` | Obtener las materias del usuario autenticado |

### 6.3. Endpoints de tareas

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/tareas` | Crear una tarea |
| GET | `/api/tareas/materia/:materiaId` | Obtener las tareas de una materia |
| PATCH | `/api/tareas/:id/estado` | Actualizar el estado de una tarea |

Las rutas protegidas requieren enviar un token JWT válido en la cabecera de autorización:

```text
Authorization: Bearer TOKEN_JWT
```

## 7. Seguridad y configuración

El proyecto utiliza mecanismos de seguridad para proteger la información de los usuarios:

- Las contraseñas se almacenan mediante hashing con bcryptjs.
- La autenticación utiliza tokens JWT.
- Las rutas protegidas verifican la identidad del usuario mediante middleware.
- Las variables sensibles se almacenan en archivos de entorno.
- El archivo `.gitignore` excluye los archivos `.env` y las carpetas de dependencias y compilación.

## 8. Solución de problemas frecuentes

**Error de conexión con MongoDB**

Verificar que el servicio de MongoDB esté iniciado y que el puerto `27017` esté disponible.

**Error al registrar una cuenta**

Comprobar que las variables `MONGODB_URI` y `JWT_SECRET` estén configuradas correctamente en `server/.env`.

**El correo ya está registrado**

El sistema no permite registrar nuevamente una cuenta utilizando un correo electrónico que ya existe en la base de datos.

**No se puede acceder al frontend**

Comprobar que Vite esté ejecutándose y utilizar la dirección local que aparece en la terminal.

**No se puede acceder a Swagger**

Verificar que el backend esté iniciado correctamente y acceder a:

```text
http://localhost:5000/api-docs
```

## 9. Ejecución del proyecto

Para utilizar StudyFlow localmente, deben estar ejecutándose simultáneamente:

1. El servicio de MongoDB.
2. El servidor backend de Node.js y Express.
3. El servidor frontend de React y Vite.

Una vez iniciados los servicios, se puede acceder a la aplicación desde el navegador y utilizar sus funcionalidades de autenticación, gestión de materias y administración de tareas mediante Kanban.

---

**StudyFlow - Fase 2 | Proyecto Full-Stack**