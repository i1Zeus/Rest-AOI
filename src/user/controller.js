const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Pool = require("../../db");
const queries = require("./queries");

const secretKey =
  "84e5a6d8453dd6c958bd99394910c926ef599d162b0006e386605c102c110e7f67d6fa32e7b0969fe031872bcbce1f4fbf57f0b02cf10e2bb32b67476fec5c04";

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

//* Get all users
const getUsers = (req, res) => {
  Pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

//* create user
const register = async (req, res) => {
  try {
    const { name, email, gender, dob, password, role_id } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user details in the database
    const query =
      "INSERT INTO users (name, email, gender, dob, password, role_id) VALUES ($1, $2, $3, $4, $5, $6)";
    const values = [name, email, gender, dob, hashedPassword, role_id];
    await Pool.query(query, values);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

//* Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user details from the database
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await Pool.query(query, values);

    const user = result.rows[0];
    if (!user) {
      return res.sendStatus(401);
    }

    // Compare the provided password with the hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.sendStatus(401);
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, secretKey);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getUsers,
  register,
  login,
  authenticateToken,
};
