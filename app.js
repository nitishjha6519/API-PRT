const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const tasksRoute = require("./routes/tasks");

mongoose.connect("mongodb://127.0.0.1/prt2", (err) => {
  if (!err) {
    console.log("connected to DB");
  } else {
    console.log(err.message);
  }
});
const app = express();

app.use(bodyparser.json());
app.use("/v1/tasks", tasksRoute);

app.listen(3000, () => console.log("Server listening at port 3000"));
