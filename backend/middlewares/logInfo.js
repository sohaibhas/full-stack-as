const logInfo = (req, res, next) => {
  // logs information about incoming requests.
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = logInfo;
