// CONTROLADOR DE USUARIOS
// Contiene la lógica de creación de usuarios (registro) y encriptación de contraseña

const bcrypt = require("bcrypt");
const User = require("../models/userModels");

// Crear un nuevo usuario (password se guarda hasheada)
const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password, role } = req.body;

    // Validación mínima para evitar usuarios incompletos
    if (!name || !lastName || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Faltan campos obligatorios: name, lastName, email, password",
      });
    }

    // Encriptar contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      lastName,
      email,
      password: hashedPassword,
      role,
      // createDate lo pone el default del modelo
    });

    await user.save();

    return res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    // Error típico cuando el email es único y se intenta repetir
    if (error.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "Email already exists",
      });
    }

    return res.status(400).json({
      status: "error",
      message: "User not created",
      error: error.message,
    });
  }
};

module.exports = { createUser };
