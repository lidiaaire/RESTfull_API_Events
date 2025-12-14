// CONTROLADOR DE SEGURIDAD
// Contiene la lógica de autenticación (login) y generación de JWT

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

// Login: valida credenciales y devuelve un token JWT
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación mínima del body
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email y contraseña son obligatorios",
      });
    }

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas",
      });
    }

    // Comparar contraseña en texto plano con el hash guardado en BBDD
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas",
      });
    }

    // Generar token con datos mínimos necesarios
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      status: "success",
      message: "Login correcto",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error en el login",
      error: error.message,
    });
  }
};

module.exports = { login };
