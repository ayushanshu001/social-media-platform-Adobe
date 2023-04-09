const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./config/db");
const { userController } = require("./routes/User.route");
const { postController } = require("./routes/Post.route");
const cors=require('cors');
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to the Homepage");
});

app.use(cors())

app.use("/", userController);

app.use("/", postController);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database connected");
  } catch (error) {
    console.log("Error while connecting to databases");
  }
});
