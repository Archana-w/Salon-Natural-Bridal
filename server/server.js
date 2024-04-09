var express = require("express");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
var cors = require('cors');
var mongoose = require("mongoose");
var tokenRoute = require("./routes/token_route");
var userRoute = require("./routes/user_route");
var productRoute = require("./routes/product_route")


var app = express();
dotenv.config({ path: "./config.env" });
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//connect mongo db
var DB_URI = process.env.ATLAS_URI;
var option = { dbName:"sms"};
mongoose.connect(DB_URI, option).then(()=>{
    console.log("Database connected!!!");
}).catch((error)=>{
    console.log("Db connect failed - "+error);
});

//routes
app.use("/token", tokenRoute);
app.use("/user",userRoute);
app.use("/product", productRoute);


//default page
app.get("*",(req,res)=>{
    res.send("Hello world!!!");
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on post: ${port}`);
});