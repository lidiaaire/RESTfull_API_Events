// MODELO DE USUARIOS
// Define la estructura de los documentos de la colección 'users'

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Nombre del usuario
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // Apellidos del usuario
  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  // Email del usuario (único)
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Contraseña del usuario (almacenada encriptada)
  password: {
    type: String,
    required: true,
  },

  // Rol del usuario dentro de la aplicación
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // Fecha de creación del usuario
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
