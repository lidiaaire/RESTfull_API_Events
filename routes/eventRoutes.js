const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/securityMiddleware");
const {
  getMyEvents,
  addUserToEvent,
  createEvent,
  getAllEvents,
  getEventById,
  getEventEarnings,
  getTotalEarnings,
} = require("../controllers/eventController");

router.get("/my-events", protect, getMyEvents);
router.get("/", getAllEvents);
router.get("/earnings/total", getTotalEarnings);
router.get("/:eventId", getEventById);
router.get("/:eventId/earnings", getEventEarnings);
router.post("/:eventId/attendees", protect, addUserToEvent);
router.post("/", createEvent);

module.exports = router;
