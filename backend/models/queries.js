const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Create User Table
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `;
  await pool.query(query);
};

// Check if a user exists by email
const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

// Add a new user to the database
const insertUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

// Update user by id
const updateUserInDB = async (id, name, email, password) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
    [name, email, password, id]
  );
  return result.rows[0];
};

// Delete user from database
const deleteUserFromDB = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0]; // Returns the deleted user if successful
};

// Fetch all users from the database
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

module.exports = {
  createUserTable,
  findUserByEmail,
  insertUser,
  getAllUsers,
  updateUserInDB,
  deleteUserFromDB
};
