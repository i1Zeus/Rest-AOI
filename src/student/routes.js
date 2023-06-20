const { Router } = require("express");
const controller = require("./controller");

const router = Router();

//! Routes on Localhost:3000

//? GET all the students
router.get("/", controller.getStudent);

//? GET a single student by ID
router.get("/:id", controller.getStudentById);

//? POST a new student
router.post("/", controller.addStudent);

//? DELETE a student by ID
router.delete("/:id", controller.deleteStudent);

//? UPDATE a student by ID
router.put("/:id", controller.updateStudent);

//! Export router
module.exports = router;
