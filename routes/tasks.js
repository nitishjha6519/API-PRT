const express = require("express");
const tasksCollection = require("../models/tasks");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    console.log(data.tasks);

    //for array of tasks
    let tasksArr = [];
    if (data.tasks) {
      let arr = data.tasks;
      for (let i = 0; i < arr.length; i++) {
        const uniqueid = Math.floor(Math.random() * 10000000);

        const creationData = await tasksCollection.create({
          ...arr[i],
          id: uniqueid,
        });
        tasksArr.push({ id: uniqueid });
      }
      return res.status(201).json({
        tasks: tasksArr,
      });
    }

    //for single task
    const uniqueid = await tasksCollection.count();
    const creationData = await tasksCollection.create({
      ...data,
      id: uniqueid,
      is_completed: false,
    });

    return res.status(201).json({
      id: uniqueid,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

//fetch all data
router.get("/", async (req, res) => {
  const allData = await tasksCollection.find();

  return res.status(200).json({
    tasks: allData,
  });
});

//fetch specific data
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const specificTask = await tasksCollection.find({ id });
    if (specificTask.length === 0) {
      return res.status(404).json({
        error: "There is no task at that id",
      });
    }
    return res.status(200).json({
      id: specificTask,
    });
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    });
  }
});

//delete specific data
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const specificTask = await tasksCollection.deleteOne({ id });
    if (specificTask.length === 0) {
      return res.status(204).json({});
    }
    return res.status(204).json({});
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let { title, is_completed } = req.body;
    console.log(title, is_completed);
    const specificTask = await tasksCollection.find({ id });
    if (specificTask.length === 0) {
      return res.status(404).json({
        error: "There is no task at that id",
      });
    }
    const titleTask = await tasksCollection.updateOne(
      { id },
      { $set: { title: title } }
    );
    console.log(titleTask);
    const is_completedTask = await tasksCollection.updateOne(
      { id },
      { $set: { is_completed } }
    );
    console.log(is_completedTask);

    return res.status(204).json({});
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    });
  }
});

module.exports = router;
