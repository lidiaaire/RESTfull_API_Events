const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const eventRoutes = require("./routes/eventRoutes");
app.use("/events", eventRoutes);

app.get("/", (req, res) => {
  res.json({ ok: true });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo conectado");
    console.log("DB ACTUAL =>", mongoose.connection.name);
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
});
