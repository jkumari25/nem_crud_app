const express= require('express');
const {NoteModel}= require("../models/Note.model");

const noteRouter= express.Router();

noteRouter.get("/", async(req,res)=>{
    const notes= await NoteModel.find();
    res.send(notes)
})

noteRouter.post("/create", async(req,res)=>{
    const payload= req.body;
    try {
        const note= new NoteModel(payload);
        await note.save();
        res.send("Notes created successfully")
    } 
    catch (error) {
        res.send({"msg":"Notes not Created"}) 
    }
})

noteRouter.patch("/update/:id", async(req,res)=>{
    const payload= req.body;
    const noteID= req.params.id;
    const note= await NoteModel.findOne({_id: noteID})
    const userID_in_note= note.userID;
    const userID_making_req= req.body.userID ;

    try {
        if(userID_making_req !== userID_in_note){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await NoteModel.findByIdAndUpdate({_id:noteID},payload)
            res.send({"msg":`Notes with id: ${noteID} has been updated`});
        }
    }
    catch (error) {
       res.send({"msg":`Note with id: ${noteID} has not been updated`}) 
    }
})

noteRouter.delete("/delete/:id", async(req,res)=>{
    const noteID= req.params.id;
    const note= await NoteModel.findOne({_id: noteID})
    const userID_in_note= note.userID;
    const userID_making_req= req.body.userID ;
    try {
        if(userID_making_req !== userID_in_note){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.send({"msg":`Notes with id: ${noteID} has been deleted`});
        }
    } 
    catch (error) {
      res.send({"msg":"Notes not Deleted"})  
    }
})



module.exports={
    noteRouter
}

// 63ef3181c347fe62b8a99c66