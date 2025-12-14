// ARCHIVO PRINCIPAL DE LA APLICACIÓN
// Inicializa el servidor Express, configura middlewares,
// registra las rutas y establece la conexión con MongoDB

const express = require("express");
const mongoose = require("mongoose");

// Carga de variables de entorno desde el archivo .env
require("dotenv").config();

// Inicialización de Express y middleware para leer JSON
const app = express();
app.use(express.json());

// Rutas de usuarios (registro y autenticación con JWT)
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Rutas de eventos (gestión de eventos y asistentes)
const eventRoutes = require("./routes/eventRoutes");
app.use("/events", eventRoutes);

// Ruta raíz de comprobación para verificar que la API está activa
app.get("/", (req, res) => {
  res.json({ ok: true });
});

// Conexión a MongoDB usando Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo conectado");
    console.log("DB ACTUAL =>", mongoose.connection.name);
  })
  .catch((err) => console.log(err));

// Arranque del servidor en el puerto definido en el archivo .env
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
});
