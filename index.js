const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { authRouter } = require("./routes/auth.route");
const { notesRouter } = require("./routes/notes.route");
const jwt = require("jsonwebtoken");
const { authorization } = require("./middleware/auth.middleware");
var cors = require("cors");

const port = process.env.port;
const app = express();
app.use(cors())
app.use(express.json());

app.use("/auth", authRouter);
app.use(authorization);
app.use("/notes", notesRouter);


//listing server
app.listen(port, async (req, res) => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err.message);
  }

  console.log(`listning on ${port} `);
});
