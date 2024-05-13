var express = require("express");
var User = require("../models/User");
var Device = require("../models/Device");

var router = express.Router();

//get user
router.route("/get").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            User.find().then((result)=>{  
                res.send({ status: "success", data:result });
            });

           
        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

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
            const exp = time + 36000000;

            //register access token
            var device = new Device();
            device.token = randomAccessToken;
            device.user_id = userId;
            device.time = time;
            device.expire = exp;

            device.save().then(() => {
                res.send({ status: "success", type: type, "access_token": device.token });
            }).catch((e) => {
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
router.route("/register").post((req, res) => {

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
        password == null || password == "") {

        res.send({ "status": "required_failed", "message": "Please send required details." });

        return;
    }

    //check email is already
    User.findOne({ email: email }).then((doc) => {

        if (doc == null) {

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

        } else {
            res.send({ "status": "already_email", "message": "This email is already." });
        }

    }).catch((e) => {
        res.send({ "status": "failed", "message": "Somthing error. Please try again." });
    });

});

router.route("/edit").post((req, res) => {

    //check authentication
    if (req.current_user != null) {
   
       const userId = req.current_user.user_id;
       var firstName = req.body.first_name;
       var lastName = req.body.last_name;
       var mobileNumber = req.body.mobile_number;
       var email = req.body.email;
   
       //validate details
       if (firstName == null || firstName == "" ||
           lastName == null || lastName == "" ||
           mobileNumber == null || mobileNumber == "" ||
           email == null || email == "") {
   
           res.send({ "status": "required_failed", "message": "Please send required details." });
   
           return;
       }
   
       //check email is already
       User.findOneAndUpdate({ _id: userId },{first_name:firstName,last_name:lastName,email:email,mobile_number:mobileNumber}).then(() => {
           res.send({ "status": "success", "message": "Profile details changed." });
       }).catch((e) => {
           res.send({ "status": "failed", "message": "Somthing error. Please try again." });
       });
   
   } else {
       res.send({ status: "auth_failed", message: "User authentication required." });
   }
   
});

//get user profile
router.route("/profile").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        User.findOne({ _id: userId }).then((result) => {

            var profilePic = null;
            if (result.profile_pic != undefined) {
                profilePic = result.profile_pic;
            }

            res.send({ status: "success", profile_pic: profilePic, mobile_number: result.mobile_number, email: result.email, first_name: result.first_name, last_name: result.last_name ,sup_category: result.sup_category  });
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/delete").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        User.deleteOne({ _id: userId }).then((result) => {
            res.send({ status: "success", message: "User profile is deleted." });
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/edit/avatar").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const image = req.files[0];

        //validate image thumbnail
        if (image == null || image.fieldname != "image") {
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }

        User.updateOne({ _id: userId }, { profile_pic: image.filename }).then(() => {
            res.send({ status: "success", "message": "Profile picture updated." });
        }).catch((error) => {
            res.send(error);
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

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


module.exports = router;