// RUTAS DE USUARIOS
// Define los endpoints relacionados con la creación de usuarios
// y la autenticación mediante login

const express = require("express");

// Controladores de usuario y seguridad
const { createUser } = require("../controllers/userController");
const { login } = require("../controllers/securityController");

const router = express.Router();

// Ruta de prueba para comprobar que las rutas de usuarios funcionan correctamente
router.get("/test", (req, res) => res.json({ ok: true }));

// Crear un nuevo usuario
router.post("/", createUser);

// Login de usuario y generación de token JWT
router.post("/login", login);

module.exports = router;
