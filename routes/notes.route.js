const express = require("express");
const notesRouter = express.Router();
const { NoteModel } = require("../models/note.model");

//all get routers
notesRouter.get("/", async (req, res) => {
  try {
    const data = await NoteModel.find();
    res.send(data);
  } catch (err) {
    console.log({ msg: "something went wrong" }, err);
  }
});

//all post routes
notesRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const data = new NoteModel(payload);
    await data.save();
    res.send("notes created");
  } catch (err) {
    res.send({ msg: "someting went wrong" }, err.message);
  }

  
});

//all update routes
notesRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const Id = req.params.id;
  const note = await NoteModel.findOne({_id:Id}) ;
  const userId_in_note= note.userID ;
  const useID_making_req= req.body.userID
  try {
    if(useID_making_req!==userId_in_note){
res.send("not authorized")
    }else{
 await NoteModel.findByIdAndUpdate({ _id: Id }, payload);

res.send("notes updated");
    }
    
  } catch (err) {
    console.log({ msg: "someting went wrong" }, err);
  }
});

//all delete routes
notesRouter.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const data = await NoteModel.findByIdAndDelete({ _id: Id });
    res.send("notes deleted");
  } catch (err) {
    console.log({ msg: "something went wrong" });
  }
});
module.exports = {
  notesRouter,
};
