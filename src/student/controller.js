const Pool = require("../../db");
const queries = require("./queries");

const getStudent = (req, res) => {
  Pool.query(queries.getStudent, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  Pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  //* Check if email exists.
  Pool.query(queries.checkEmail, [email], (error, results) => {
    if (results.rows.length)
      return res.status(400).send("Email already exists");
  });
  Pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
    if (error) throw error;
    res.status(201).send(`Student added successfully with name: ${name}`);
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  Pool.query(queries.deleteStudent, [id], (error, results) => {
    if (!results.rowCount)
      return res.status(400).send(`Student with ID: ${id} does not exist`);
    if (error) throw error;
    res.status(200).send(`Student deleted with ID: ${id}`);
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age, dob } = req.body;
  Pool.query(
    queries.updateStudent,
    [name, email, age, dob],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Student modified with ID: ${id}`);
    }
  );
};

module.exports = {
  getStudent,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
