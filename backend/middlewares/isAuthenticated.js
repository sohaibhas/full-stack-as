function isAuthenticated(req, res, next) {
  // check if the user is authenticated
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    status: 401,
    error: "Unauthorized access",
    message: "You must be logged in to access this resource.",
  });
}

module.exports = isAuthenticated;
