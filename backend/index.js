const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todomodel = require("./models/todo");
// const { default: Todo } = require('../mern/src/Todo');

var app = express();
app.use(cors());
app.use(express.json());
const port=process.env.PORT||3001;
mongoose.connect(
  "mongodb+srv://mohanraj08022004:Mohanraj%40123@spidey7.3vmmauu.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/get", (req, res) => {
  Todomodel.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  Todomodel.findByIdAndUpdate({ _id: id },{ finish: true})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.delete("/delete/:id",(req,res)=>{
  const {id}=req.params;
  Todomodel.findByIdAndDelete({_id:id}).then((result)=>res.json(result))
  .catch((err)=>res.json(err));
})
app.post("/add", (req, res) => {
  Todomodel.create({
    task: req.body.task,
    finish:req.body.finish
  })
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err));
});
app.listen(port, () => {
  console.log(Date());
  console.log("Server is Running");
});
