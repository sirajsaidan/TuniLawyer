const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  User.findById(req.userId)
    .select("-password")
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send("Server Error");
      console.log(err.message);
    });
});

router.post(
  "/",
  [
    body("email", "Please write a valid email!").isEmail(),
    body("password", "Password is required").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Please register before!" }] });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          } else if (!isMatch) {
            return res
              .status(401)
              .json({ errors: [{ msg: "Wrong Password!" }] });
          } else {
            let payload = {
              id: user._id,
              role: user.role
            };
            jwt.sign(payload, 'secret', (err, token) => {
              if (err) {
                throw err;
              }
              res.json({ token, role: user.role });
            });
          }
        });
      }
    });
  }
);

module.exports = router;

