# RESTfull_API_Events

API REST desarrollada con **Node.js, Express y MongoDB** para la gestión de eventos y asistentes, con autenticación mediante **JWT**.

Este proyecto forma parte del modulo 7 de CodeSpace cuyo objetivo es aplicar:

- Diseño de modelos con Mongoose
- Autenticación y autorización
- Relación entre colecciones
- Endpoints REST completos

---

📌 Tecnologías utilizadas

El proyecto se ha desarrollado siguiendo el stack propuesto en el enunciado del ejercicio.

Utilizadas en el proyecto

Node.js

Express

MongoDB

Mongoose

JSON Web Token (JWT)

bcrypt

dotenv

Swagger (swagger-jsdoc, swagger-ui-express)

nodemon (entorno de desarrollo)

---

## 📁 Estructura del proyecto

```
RESTfull_API_Events
│
├── controllers/
├── models/
├── routes/
├── docs/
│   └── endpoints.http
├── app.js
├── package.json
└── README.md
```

---

## 🗄️ Modelos

### 👤 User

Campos:

- `name` (String, requerido)
- `lastName` (String, requerido)
- `email` (String, único y requerido)
- `password` (String, encriptado)
- `role` (user | admin)
- `createDate` (Date, por defecto)

---

### 🎟 Event

Campos:

- `title` (String, requerido)
- `description` (String, requerido)
- `date` (Date, fecha del evento)
- `location` (String, requerido)
- `price` (Number, precio del ticket)
- `attendees` (Array de ObjectId referenciando a User)
- `createDate` (Date, por defecto)

---

## 🔐 Autenticación

El login se realiza mediante JWT. Una vez autenticado, el token debe enviarse en los endpoints protegidos usando el header:

```
Authorization: Bearer <TOKEN>
```

---

## 📡 Endpoints

La documentación completa de los endpoints se encuentra en:

```
docs/endpoints.http
```

Este archivo puede utilizarse directamente desde VS Code con la extensión **REST Client** para probar la API.

---

## 📊 Funcionalidades principales

- Registro y login de usuarios
- Creación y listado de eventos
- Inscripción de usuarios en eventos
- Obtención de eventos del usuario autenticado
- Cálculo de ganancias por evento
- Cálculo de ganancias totales

---

## ▶️ Ejecución del proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno (`.env`):

```env
PORT=3000
DATABASE_URL=<tu_url_mongodb>
JWT_SECRET=<tu_secret>
```

3. Iniciar el servidor:

```bash
npm run dev
```

---

## 📝 Notas

- Los nombres de algunos campos (`price`, `createDate`) se han adaptado respecto al enunciado original y se justifican en la implementación.
- El proyecto está preparado para ampliaciones futuras (roles, validaciones, etc.).

---

## 👩‍💻 Autora

Proyecto realizado por **Lidia García Torregrosa** como práctica de API REST con Node.js y MongoDB del modulo 7 de codeSpace
