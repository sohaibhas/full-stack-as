const bcrypt = require("bcrypt");
const {
  findUserByEmail,
  insertUser,
  updateUserInDB,
  deleteUserFromDB,
} = require("./queries");

// Add a new user
const addUser = async (user) => {
  const { name, email, password } = user;

  // Validate required fields
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required fields.");
  }

  // Check if the user already exists by email
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Insert the new user
  const newUser = await insertUser(name, email, hash);
  return newUser;
};

const updateUser = async (id, { name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required fields.");
  }
  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Update the user in the database
  const updatedUser = await updateUserInDB(id, name, email, hash);
  if (!updatedUser) {
    throw new Error("User not found or update failed.");
  }

  return updatedUser;
};

const deleteUserById = async (id) => {
  // Validate that the ID is provided
  if (!id) {
    throw new Error("User ID is required to delete a user.");
  }

  // Delete the user from the database
  const deletedUser = await deleteUserFromDB(id);

  // Check if a user was actually deleted
  if (!deletedUser) {
    throw new Error("User not found or deletion failed.");
  }

  return deletedUser;
};

module.exports = { addUser, updateUser, deleteUserById };
