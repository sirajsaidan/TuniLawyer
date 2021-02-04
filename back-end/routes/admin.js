const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body } = require("express-validator");
const User = require("../models/user");
const roles = require("../middleware/roles")

const roleMiddleware = require('../middleware/roleMiddleware')
router.get('/list', (req, res) => {
  let { query, zipCode } = req.query;
  query = query && query.length ? {
    $or: [
      {
        firstName: {
          $regex: `.*${query}.*`, $options: 'i'
        }
      },
      {
        firstName: {
          $regex: `.*${query}.*`, $options: 'i'
        }
      },
      {
        firstName: {
          $regex: `.*${query}.*`, $options: 'i'
        }
      }
    ]
  } : {};
  if (zipCode && zipCode.length)
    query = { ...query, zipCode }

  User.find({ role: roles.LAWYER, ...query }, (e, r) => res.json(r))
})
router.post('/add', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      req.body.password = hashedPassword;
      new User({ ...req.body, role: roles.LAWYER }).save((e, r) => {
        console.log({ e, r });
        User.find({ role: roles.LAWYER }, (e, r) => res.json(r))
      })
    });
  });
})
router.post('/edit/:id', roleMiddleware(roles.ADMIN), (req, res) => {
  User.updateOne(req.params.id, {
    $set: req.body
  })
})
router.get('/delete/:id', roleMiddleware(roles.ADMIN), (req, res) => User.remove(req.params.id))



const { LAWYER } = require('../middleware/roles');


module.exports = router;
