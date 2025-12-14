// CONTROLADOR DE EVENTOS
// Contiene la lógica de negocio de los endpoints de eventos:
// listado, detalle, creación, inscripción de asistentes y cálculo de ganancias

const Event = require("../models/eventModels");

// Obtener los eventos en los que participa el usuario autenticado (req.user viene del middleware JWT)
const getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ attendees: userId });

    return res.status(200).json({
      status: "success",
      results: events.length,
      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los eventos del usuario",
      error: error.message,
    });
  }
};

// Añadir el usuario autenticado como asistente a un evento (sin duplicados)
const addUserToEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "error", message: "Evento no encontrado" });
    }

    // Evitar que el mismo usuario se registre más de una vez
    const alreadyIn = event.attendees.some((id) => id.toString() === userId);
    if (alreadyIn) {
      return res.status(400).json({
        status: "error",
        message: "El usuario ya está registrado en este evento",
      });
    }

    event.attendees.push(userId);
    await event.save();

    return res.status(200).json({
      status: "success",
      message: "Usuario añadido al evento correctamente",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al añadir el usuario al evento",
      error: error.message,
    });
  }
};

// Crear un evento (campos obligatorios según el modelo)
const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, price } = req.body;

    // Validación mínima para no crear eventos incompletos
    if (!title || !description || !date || !location || price === undefined) {
      return res.status(400).json({
        status: "error",
        message:
          "Faltan campos obligatorios: title, description, date, location, price",
      });
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      price,
      attendees: [],
    });

    return res.status(201).json({
      status: "success",
      message: "Evento creado correctamente",
      data: newEvent,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al crear el evento",
      error: error.message,
    });
  }
};

// Obtener todos los eventos
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    return res.status(200).json({
      status: "success",
      results: events.length,
      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los eventos",
      error: error.message,
    });
  }
};

// Obtener un evento por ID
const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Evento no encontrado",
      });
    }

    return res.status(200).json({
      status: "success",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener el evento",
      error: error.message,
    });
  }
};

// Calcular las ganancias de un evento (precio * nº asistentes)
const getEventEarnings = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Evento no encontrado",
      });
    }

    const earnings = event.price * event.attendees.length;

    return res.status(200).json({
      status: "success",
      data: {
        eventId: event._id,
        title: event.title,
        price: event.price,
        attendees: event.attendees.length,
        earnings,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al calcular las ganancias del evento",
      error: error.message,
    });
  }
};

// Calcular las ganancias totales sumando las ganancias de todos los eventos
const getTotalEarnings = async (req, res) => {
  try {
    const events = await Event.find();

    const totalEarnings = events.reduce((total, event) => {
      return total + event.price * event.attendees.length;
    }, 0);

    return res.status(200).json({
      status: "success",
      data: {
        totalEarnings,
        totalEvents: events.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al calcular las ganancias totales",
      error: error.message,
    });
  }
};

module.exports = {
  getMyEvents,
  addUserToEvent,
  createEvent,
  getAllEvents,
  getEventById,
  getEventEarnings,
  getTotalEarnings,
};
