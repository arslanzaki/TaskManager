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

// Create A Task
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

// Get User Tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id,
    });
    res.status(200).json({
      tasks,
      count: tasks.length,
      message: "Tasks Fetched Successfully!",
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get Own Task By Id
router.get("/:id", auth, async (req, res) => {
  const taskid = req.params.id;

  try {
    const task = await Task.findOne({
      _id: taskid,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json({ task, message: "Task Fetched Successfully!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
