require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const userRoutes = require("./routes/user-routes");
const logInfo = require("./middlewares/logInfo");
const { createUserTable } = require("./models/queries");
require('./config/passport-config')(passport); // Passport configuration

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logInfo);

// Session setup
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialize the user table
(async () => {
  try {
    await createUserTable();
    console.log('User table created or already exists.');
  } catch (error) {
    console.error('Error creating user table:', error.message);
  }
})();

// Routes
app.use("/api", userRoutes);

// Catch-all route for undefined endpoints
app.use("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "Route not Found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
