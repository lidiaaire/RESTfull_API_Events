const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/securityMiddleware");
const {
  getMyEvents,
  addUserToEvent,
} = require("../controllers/eventController");

router.get("/my-events", protect, getMyEvents);
router.post("/:eventId/attendees", protect, addUserToEvent);

module.exports = router;
