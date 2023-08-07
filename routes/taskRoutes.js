const express = require("express");
const router = express.Router();
const auth = require("./../middlewares/auth");
const Task = require("./../models/Task");

router.get("/test", auth, (req, res) => {
  res.json({
    message: "Task Routes Are Working",
    user: req.user,
  });
});

// CRUD Tasks For Authenticated Users
router.post("/", auth, async (req, res) => {
  try {
    // description, completed -> from req.body
    // owner -> from req.user._id

    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });

    await task.save();
    res.status(201).json({
      task,
      message: "Task Created Successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
module.exports = router;
