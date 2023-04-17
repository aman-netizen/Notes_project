const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const db = require("./config/db");

app.use(express.json());
const notesRoute = require("./routes/notesRoutes");

app.use("/api/notes", notesRoute);
  
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});