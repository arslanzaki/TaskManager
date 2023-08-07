const express = require("express");
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User Routes Are Working");
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ user, message: "User Created Successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Unable To Login, Invalid Credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable To Login, Invalid Credentials");
    }
    const token = jwt.sign(
      {
        _id: user._id.toString(),
      },
      process.env.JWT_SECRET_KEY
    );
    res.send({ user, token, message: "Logged In Successfully"});
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
