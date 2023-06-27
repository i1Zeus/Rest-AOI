//! Queries

const getUsers = "SELECT * FROM users";

const register =
  "INSERT INTO users ( name, email, gender, dob, password, role_id) VALUES ($1, $2, $3, $4, $5, $6)";

const login = "SELECT * FROM users WHERE email = $1 AND password = $2";

//check email if exist
const checkEmail = "SELECT s FROM users s WHERE s.email = $1";

module.exports = {
  getUsers,
  register,
  login,
  checkEmail,
};
