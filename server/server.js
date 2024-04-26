const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
const multer = require("multer");
const mongoose = require("mongoose");
const Supplier = require("./models/Supplier");
const tokenRoute = require("./routes/token_route");
const supplierRoute = require("./routes/supplier_route"); 
const userRoute = require("./routes/user_route");
const productRoute = require("./routes/product_route");
const cartRoute = require("./routes/cart_route");
const checkoutRoute = require("./routes/checkout_route");
const orderRoute = require("./routes/order_route");
const appointmentRoute = require("./routes/appointment_route");
const empRoute = require("./routes/emp_route");

var app = express();
dotenv.config({ path: "./config.env" });
var form = multer({ dest: 'uploads/' });
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(form.any());

//connect mongo db
var DB_URI = process.env.ATLAS_URI;
var option = { dbName:"sms"};
mongoose.connect(DB_URI, option).then(()=>{
    console.log("Database connected!!!");
}).catch((error)=>{
    console.log("Db connect failed - "+error);
});

//authentication
app.use((req, res, next) => {

    const token = req.body.token;

    //validate token
    if (token != null) {

        const date = new Date();
        const time = date.getTime();
        const token = req.body.token;

        //validate token
        Device.findOne({ token: token }).then((doc) => {

            if (doc == null) {
                res.send({ "status": "invalid_token", "message": "This token is invalid." });
                return;
            }

            const userId = doc.user_id;
            const expire = doc.expire;
            //check token is expire
            if (time > expire) {
                res.send({ "status": "token_expired", "message": "This token is expired." });
                return;
            }

            //get user details
            User.findOne({ _id: userId }).then((doc) => {
                req.current_user = { "user_id": userId, "user": doc };
                next();
                return;
            }).catch((e) => {
                res.send({ status: "failed", "message": "Please try again 1." });
                return;
            });

        }).catch((e) => {
            res.send("error - " + e);
            return;
        });

    } else {
        req.current_user = null;
        next();
    }

});


//routes
app.use("/token", tokenRoute);
app.use("/supplier", supplierRoute); 
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/checkout", checkoutRoute);
app.use("/order", orderRoute);
app.use("/appointment", appointmentRoute);
app.use("/emp", empRoute);


//give access image 
app.get("/image/:imageName", (req, res) => {
    var imageName = req.params.imageName;
    res.sendFile(__dirname + "/uploads/" + imageName);
});

//default page
app.get("*",(req,res)=>{
    res.send("Hello world!!!");
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on post: ${port}`);
});