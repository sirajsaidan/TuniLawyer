// import express from ("express");
// import { body, validationResult } from ("express-validator");
const express = require('express')
const  { body, validationResult } = require("express-validator")
const bcrypt =require("bcryptjs");
const router = express.Router();
const jwt =require ("jsonwebtoken");
const User =require ("../models/user");
const { USER } = require('../middleware/roles');
// POST req
router.post(
  "/",
  [
    body("firstName", "Please write your firstname").notEmpty().isAlpha(),
    body("lastName", "Please write your lastname").notEmpty().isAlpha(),
    body("email", "Please write a valid email!").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
      max: 20,
    }),
    body("phone", "Please write your number").notEmpty(),
    body("cin", "Please write your Cin").notEmpty(),
   




  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.find({ email: req.body.email }).then((user) => {
      if (user.length) {
        return res.status(400).json({ msg: "Email already exists!" });
      }
      let num = Math.floor(Math.random() * 99);
      req.body.role = USER
      let newUser = new User(req.body);
      console.log(req.body)
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
          newUser.password = hashedPassword;
          newUser.save();
          let payload = {
            id: newUser._id,
            role:newUser.role
          };
          jwt.sign(payload, 'secret', (err, token) => {
            if (err) {
              throw err;
            }
            res.json({ token,role:newUser.role});
          });
        });
      });
    });
  }
)

module.exports = router;


