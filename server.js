//! Initialize express
const express = require("express");
const studentRoute = require("./src/student/routes");

const app = express();
const port = 3000;

app.use(express.json());

//! Routes
app.get("/", (req, res) => res.send("Hello World!"));
//! V1 Api routes
app.use("/api/v1/students", studentRoute);

//! Listen on port 3000
app.listen(port, () =>
  console.log(
    `Server running on port ${port} Ctrl + click http://localhost:${port}`
  )
);
