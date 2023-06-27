//! Initialize express
const crypto = require("crypto");
const express = require("express");
const studentRoute = require("./src/student/routes");
const userRoute = require("./src/user/routes");

const app = express();
const port = 3000;

//* pass
function cryptPassword(password, salt) {
  const iterations = 10000;
  const keyLength = 64;
  const digest = "sha512";

  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, digest)
    .toString("hex");
  return hashedPassword;
}
function verifyPassword(password, hashedPassword, salt) {
  const iterations = 10000;
  const keylen = 64;
  const digest = "sha512";

  const hashedPasswordToCompare = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("hex");
  return hashedPassword === hashedPasswordToCompare;
}
const pass = "123456";
const salt = crypto.randomBytes(16).toString("hex");
const hashedPassword = cryptPassword(pass, salt);


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
