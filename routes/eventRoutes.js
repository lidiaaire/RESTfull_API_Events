// RUTAS DE EVENTOS
// Define los endpoints relacionados con la gestión de eventos,
// inscripcion de asistentes y calculos de ganancias

const express = require("express");
const router = express.Router();

// Middleware para proteger rutas con JWT
const { protect } = require("../middlewares/securityMiddleware");

// Controladores de eventos
const {
  getMyEvents,
  addUserToEvent,
  createEvent,
  getAllEvents,
  getEventById,
  getEventEarnings,
  getTotalEarnings,
} = require("../controllers/eventController");

// Eventos del usuario autenticado
router.get("/my-events", protect, getMyEvents);

// Listado de todos los eventos
router.get("/", getAllEvents);

// Ganancias totales de todos los eventos
router.get("/earnings/total", getTotalEarnings);

// Detalle de un evento por ID
router.get("/:eventId", getEventById);

// Ganancias de un evento concreto
router.get("/:eventId/earnings", getEventEarnings);

// Añadir usuario autenticado como asistente a un evento
router.post("/:eventId/attendees", protect, addUserToEvent);

// Crear un nuevo evento
router.post("/", createEvent);

module.exports = router;
