const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ msg: "You are not authorized!" });
  }

  jwt.verify(token, 'secret', (err, payload) => {
    if (err) {
      throw err;
    }

    req.userId = payload.id;
    next();
  });
};
