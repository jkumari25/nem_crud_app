const express= require('express');
const { connections } = require("./db");
const {userRouter}= require("./routes/User.routes");
const {noteRouter}= require("./routes/Note.route")
const {authenticate} = require("./middleware/Authenticate.middleware");
const cors= require("cors");
require("dotenv").config();

const app= express();

app.use(express.json());
app.use(cors({
    origin:"*"
}));

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users",userRouter); 
//authenticate midlleware
app.use(authenticate);
app.use("/notes",noteRouter);


app.listen(process.env.port, async()=>{
    try {
      await connections
      console.log("Connected to DB")  
    } 
    catch (error) {
        console.log(error.message)
    }
    console.log(`Server is running on port ${process.env.port}`);
})