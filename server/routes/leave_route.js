const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");

router.route("/add").post((req,res)=>{

    const date = new Date();
    const time = date.getTime();

    //check authentication
    if(req.current_user != null){

        const userId = req.current_user.user_id;
        const fromDate = req.body.from_date;
        const toDate = req.body.to_date;
        const text = req.body.text;
        
        //validate data
        if (fromDate == null ||
            fromDate == "" ||
            toDate == null ||
            toDate == "" ||
            text == null ||
            text == ""
            ){
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }

        const leave = new Leave();
        leave.user_id = userId;
        leave.from_date = fromDate;
        leave.to_date = toDate;
        leave.text = text;

        leave.save().then(()=>{
            res.send({ status: "success", message: "Item added." });
        });

    }else{
        res.send({status:"auth_failed",message:"User authentication required."});
    }

});

router.route("/get").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const userId = req.current_user.user_id;

            Leave.find().then((doc)=>{
                res.send({status:"success",data:doc});
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
    
});

module.exports = router;