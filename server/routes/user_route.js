var express = require("express");
var User = require("../models/User");
var Device = require("../models/Device");

var router = express.Router();

//login API endpoint
router.route("/login").post((req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email, password: password }).then((doc) => {

        if (doc != null) {

            const date = new Date();
            const time = date.getTime();

            //valid user
            var randomAccessToken = makeid(100);

            //get user details
            const userId = doc._id;
            const type = doc.type;

            //calc expire time
            const exp = time + 3600000;

            //register access token
            var device = new Device();
            device.token = randomAccessToken;
            device.user_id = userId;
            device.time = time;
            device.expire = exp;
            
            device.save().then(()=>{
                res.send({ status: "success", type: type, "access_token": device.token});
            }).catch((e)=>{
                res.send({ status: "failed", "message": "Login failed. Please try again." });
            });

        } else {
            //invalid user
            res.send({ status: "invalid_user", "message": "Incorrent email or password." });
        }

    }).catch((e) => {
        res.send({ status: "failed", "message": "Login failed. Please try again." });
    });

});


//register API endpoint
router.route("/register").post((req,res)=>{

    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var mobileNumber = req.body.mobile_number;
    var email = req.body.email;
    var password = req.body.password;

    //validate details
    if (firstName == null || firstName == "" || 
        lastName == null || lastName == "" || 
        mobileNumber == null || mobileNumber == "" || 
        email == null || email == "" || 
        password == null || password == ""){

        res.send({"status":"required_failed","message":"Please send required details."});
    
        return;
    }

    //check email is already
    User.findOne({email:email}).then((doc)=>{

        if(doc == null){

            //save user details
            var user = new User();
            user.first_name = firstName;
            user.last_name = lastName;
            user.mobile_number = mobileNumber;
            user.email = email;
            user.password = password;
            user.type = "client";

            user.save().then(() => {
                res.send({ "status": "success", "message": "User is register success." });
            }).catch((e) => {
                res.send({ "status": "failed", "message": "Somthing error. Please try again." });
            });
            
        }else{
            res.send({ "status": "already_email", "message": "This email is already." });
        }

    }).catch((e)=>{
        res.send({ "status": "failed", "message": "Somthing error. Please try again." });
    });

});


function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


module.exports = router;