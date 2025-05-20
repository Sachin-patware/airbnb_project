module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(400).json({
      warning: "You must be logged In ",
    });
  }
  return next();
};
