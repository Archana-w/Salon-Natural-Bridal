var express = require("express");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");

var app = express();
dotenv.config({ path: "./config.env" });
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




//default page
app.get("*",(req,res)=>{
    res.send("Hello world!!!");
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on post: ${port}`);
});