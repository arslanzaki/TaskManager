const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API Is Working!",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
