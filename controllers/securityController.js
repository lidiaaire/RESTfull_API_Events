const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email y contraseña son obligatorios",
      });
    }

    const user = await User.findOne({ email });
    console.log("LOGIN email recibido =>", JSON.stringify(email));
    console.log("LOGIN user encontrado? =>", !!user);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas",
      });
    }

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
