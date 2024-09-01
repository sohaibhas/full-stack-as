const express = require("express");
const passport = require("passport");
const { getAllUsers } = require("../models/queries");
const { addUser, updateUser, deleteUserById } = require("../models/user");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

// Public route to fetch all users
router.get("/user", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
});

// Register a new user
router.post("/user/add", async (req, res) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).json({ status: "success", user: newUser });
  } catch (error) {
    if (error.message.includes("already exists")) {
      res.status(400).json({ status: "failed", error: error.message });
    } else if (error.message.includes("required fields")) {
      res.status(400).json({ status: "failed", error: error.message });
    } else {
      res
        .status(500)
        .json({ status: "failed", error: "An unexpected error occurred." });
    }
  }
});

// Login route
router.post(
  "/user/login",
  passport.authenticate("local", {
    successRedirect: "/api/dashboard",
    failureRedirect: "/api/login",
    failureFlash: false, // Optionally add flash messages for errors
  })
);

// Protected route - only accessible if logged in
router.get("/dashboard", isAuthenticated, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, to your dashboard!` });
});

// // Route to update a user  - protected route
router.put("/user/update/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params; // Extract id from URL parameters
    const { name, email, password } = req.body;

    // Update the user with the provided information
    const updatedUser = await updateUser(id, { name, email, password });
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/user/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await deleteUserById(userId);
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deleteUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
