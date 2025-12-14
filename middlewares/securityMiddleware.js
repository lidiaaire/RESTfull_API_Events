// MIDDLEWARE DE SEGURIDAD
// Protege las rutas que requieren autenticación mediante JWT
// Verifica el token enviado en el header Authorization

const jwt = require("jsonwebtoken");

// Middleware que valida el token JWT y permite el acceso a rutas protegidas
const protect = (req, res, next) => {
  try {
    // Obtener el header Authorization
    const authHeader = req.headers.authorization;

    // Comprobar que existe y que tiene el formato Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "No autorizado",
      });
    }

    // Extraer el token eliminando la palabra 'Bearer'
    const token = authHeader.split(" ")[1];

    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar la información del usuario en la request
    req.user = decoded;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    // Token inválido o expirado
    return res.status(401).json({
      status: "error",
      message: "Token incorrecto o expirado",
    });
  }
};

module.exports = { protect };
