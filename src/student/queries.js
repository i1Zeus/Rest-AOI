//! Queries for student table

//? Get all students
const getStudent = "SELECT * FROM students ORDER BY id ASC";

//? Get student by ID number
const getStudentById = "SELECT * FROM students WHERE id = $1";

//? Check if email exists
const checkEmail = "SELECT s FROM students s WHERE s.email = $1";

//? Add a new student
const addStudent =
  "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";

//? Delete a student by the ID number
const deleteStudent = "DELETE FROM students WHERE id = $1";

//? Update a student by the ID number
const updateStudent =
  "UPDATE students SET name = $1, email = $2, age = $3, dob = $4 WHERE id = $5";

//! Export queries
module.exports = {
  getStudent,
  getStudentById,
  checkEmail,
  addStudent,
  deleteStudent,
  updateStudent,
};
