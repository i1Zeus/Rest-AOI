//! Initialize express
const express = require("express");
const studentRoute = require("./src/student/routes");
const userRoute = require("./src/user/routes");

const app = express();
const port = 3000;

app.use(express.json());

//! Routes

app.get("/", (req, res) => res.send("Hello World!"));

//! V1 Api routes

app.use("/api/v1/students", studentRoute);

//!
app.use("/api/v1/users", userRoute);

//! 404 Not found
app.use("*", (req, res) => res.status(404).send("404 Not found"));

//! Listen on port 3000
app.listen(port, () =>
  console.log(
    `Server running on port ${port} Ctrl + click http://localhost:${port}`
  )
);
