const router = require("express").Router();
const Task = require("../model/Task");
const auth = require("../middleware/auth");

// Add Task
router.post("/", auth, async (req, res) => {
  const task = new Task({
    title: req.body.title,
    userId: req.user.id
  });

  await task.save();
  res.json(task);
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;