const express = require("express");
const { reset } = require("nodemon");
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");

//otpGenerator.generate(6, { upperCase: false, specialChars: false });
// app.get('/',(req,res)=>{
//     res.json("hello world");
// });

app.use(morgan("dev"));
app.use(express.json());

const InfoRouter = require('./router');
app.use("/api",InfoRouter);

//local host
const PORT = process.env.port || 8000;
app.listen(PORT,()=>{
    console.log("server started now at " + PORT);
});


mongoose.connect('mongodb://localhost:27017/register_db',
    { useNewUrlparser : true, useunifiedtopology: true}, (err) =>{
    if(!err){
        console.log("database connected");
    }
});