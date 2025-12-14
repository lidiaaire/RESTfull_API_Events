const express = require("express");
const { createUser } = require("../controllers/userController");
const { login } = require("../controllers/securityController");

const router = express.Router();

router.get("/test", (req, res) => res.json({ ok: true }));

router.post("/", createUser);

router.post("/login", login);

module.exports = router;
