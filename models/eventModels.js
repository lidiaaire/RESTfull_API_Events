// MODELO DE EVENTOS
// Define la estructura de los documentos de la colección 'events'

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  // Título del evento
  title: {
    type: String,
    required: true,
    trim: true,
  },

  // Descripción del evento
  description: {
    type: String,
    required: true,
  },

  // Fecha en la que se celebra el evento
  date: {
    type: Date,
    required: true,
  },

  // Ubicación donde se realiza el evento
  location: {
    type: String,
    required: true,
  },

  // Precio del ticket del evento
  price: {
    type: Number,
    required: true,
    min: 0,
  },

  // Usuarios inscritos en el evento
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // Fecha de creación del evento
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
