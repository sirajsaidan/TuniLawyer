
const express =require ("express");
const router = express.Router();
const User = require ("../models/user");
const authMiddleware =require ("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { ADMIN } = require("../middleware/roles");
// UPDATE PRFOIL
router.put("/", authMiddleware, (req, res) => {
  User.findByIdAndUpdate(req.userId, { $set: req.body })
    .then(() => res.send("User Updated"))
    .catch((err) => {
      res.status(500).send("Server Error");
      console.log(err.message);
    });
});
router.post("/test",roleMiddleware(ADMIN),(req,res)=>{
  res.send("jlhjk")
})
// GET USERS
router.get("/", authMiddleware, (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Server Error");
    });
});

module.exports = router;
