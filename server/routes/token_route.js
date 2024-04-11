var express = require("express");
var Device = require("../models/Device");
var User = require("../models/User");

var router = express.Router();

router.route("/validate").post((req,res)=>{
    
    const date = new Date();
    const time = date.getTime();

    var token = req.body.token;

    if(token == null || token == ""){
        res.send({ "status": "required_failed", "message": "Please send required details." });
        return;
    }

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
            res.send({ status: "success", user_id: userId, user: doc });
        }).catch((e) => {
            res.send({ status: "failed", "message": "Please try again 1." });
        });

    }).catch((e) => {
        res.send("error - " + e);
        return;
    });
    
});


module.exports = router;