const Pool = require("../../db");
const queries = require("./queries");

//! Controller functions

//? Get all students
const getStudent = (req, res) => {
  Pool.query(queries.getStudent, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

//? Get student by ID number
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  Pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
//? Add a new student
const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  //? Check if email exists.
  Pool.query(queries.checkEmail, [email], (error, results) => {
    if (results.rows.length)
      return res.status(400).send("Email already exists");
  });
  Pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
    if (error) throw error;
    res.status(201).send(`Student added successfully with name: ${name}`);
  });
};

//? Delete a student by the ID number
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  Pool.query(queries.deleteStudent, [id], (error, results) => {
    if (!results.rowCount)
      return res.status(400).send(`Student with ID: ${id} does not exist`);
    if (error) throw error;
    res.status(200).send(`Student deleted with ID: ${id}`);
  });
};

//? Update a student by the ID number
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age, dob } = req.body;

  Pool.query(queries.getStudentById, [id], (error, results) => {
    if (!results.rows.length)
      res.status(400).send(`Student with ID: ${id} does not exist`);

    Pool.query(
      queries.updateStudent,
      [name, email, age, dob, id],
      (error, results) => {
        if (error) throw error;
        res.status(200).send(`Student updated Successfully with ID: ${id}`);
      }
    );
  });
};

//! Export functions
module.exports = {
  getStudent,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
