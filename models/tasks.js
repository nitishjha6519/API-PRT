const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    is_completed: { type: Boolean },
  },
  { collection: "todotasks" }
);

const taskModel = mongoose.model("todotasks", tasksSchema);

module.exports = taskModel;
