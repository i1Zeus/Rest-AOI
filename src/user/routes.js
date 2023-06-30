const { Router } = require("express");
const controller = require("./controller");
const { authenticateToken } = require("./controller");

const router = Router();

//? Get all users
router.get("/", controller.getUsers);

//? Create a new user
router.post("/", authenticateToken, controller.register);

//? Login
router.post("/login", controller.login);

//! Export router
module.exports = router;
