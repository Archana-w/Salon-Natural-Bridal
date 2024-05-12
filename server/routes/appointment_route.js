var express = require("express");
var router = express.Router();
var Appointment = require("../models/Appointment");
var User = require("../models/User");

router.route("/create").post((req, res) => {

    const date = new Date();
    const currentTime = date.getTime();

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const userType = req.current_user.user.type;

        if (userType == "client") {

            const time = req.body.time;
            const date = req.body.date;
            const stylistId = req.body.stylist_id;
            const hairCare = req.body.hair_care;
            const nailCare = req.body.nail_care;
            const skinCare = req.body.skin_care;

            if (time == null || time == "" ||
                date == null || date == "" ||
                stylistId == null || stylistId == ""){
                res.send({ status: "required_failed", "message": "Required values are not received." });
               return; 
            }

            Appointment.findOne({ appoinment_time: time, appoinment_date: date }).then((doc)=>{
                if(doc == null){

                    var a = new Appointment();
                    a.appoinment_time = time;
                    a.appoinment_date = date;
                    a.time = currentTime;
                    a.stylist_id = stylistId;
                    a.user_id = userId;
                    a.hair_care = hairCare;
                    a.skin_care = skinCare;
                    a.nail_care = nailCare;
                    a.status = "reserved";

                    a.save().then(() => {
                        res.send({ status: "success", message: "Appointment created." });
                    });

                }else{
                    res.send({ status: "already", message: "Already appoinment this time range." });
                }
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/update").post((req, res) => {

    const date = new Date();
    const time = date.getTime();

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const userType = req.current_user.user.type;

        if (userType == "client") {

            const appId = req.body.appointment_id;
            const time = req.body.time;
            const date = req.body.date;
            const stylistId = req.body.stylist_id;
            const hairCare = req.body.hair_care;
            const nailCare = req.body.nail_care;
            const skinCare = req.body.skin_care;

            if (appId == null || appId == "" ||
                time == null || time == "" ||
                date == null || date == "" ||
                stylistId == null || stylistId == ""){
                res.send({ status: "required_failed", "message": "Required values are not received." });
               return; 
            }

            Appointment.findOneAndUpdate({ _id: appId }, { hair_care:hairCare,skin_care:nailCare,nail_care:skinCare,stylist_id:stylistId, appoinment_time:time, appoinment_date:date, }).then(()=>{
                res.send({ status: "success", message: "Appointment updated." });
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/delete").post((req, res) => {

    const date = new Date();
    const time = date.getTime();

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const userType = req.current_user.user.type;

        if (userType == "client") {

            const appId = req.body.appointment_id;
    
            if (appId == null || appId == "") {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            Appointment.findOneAndDelete({ _id: appId }).then(()=>{
                res.send({ status: "success", message: "Appointment deleted." });
            }).catch(()=>{
                res.send({ status: "failed", message: "Can not delete this appointment." });
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

///get user appoinment
router.route("/get").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const userType = req.current_user.user.type;

        if (userType == "client") {
            
            Appointment.find({ user_id: userId, status:"reserved" }).sort({time:-1}).then(async (doc)=>{


                var array = new Array();
                for(var i = 0; i < doc.length; i++){

                    var item = doc[i];

                    var id = item._id;
                    var stylishId = item.stylist_id;
                    var appTime = item.appoinment_time;
                    var appDate = item.appoinment_date;
                    var time = item.time;
                    var status = item.status;
                    var hairCare = item.hair_care;
                    var skinCare = item.skin_care;
                    var nailCare = item.nail_care;

                    var service = "";

                    //hair care
                    for (var x = 0; x < hairCare.length; x++){
                        service = service + "," + hairCare[x];
                    }

                    //skin care
                    for (var x = 0; x < skinCare.length; x++) {
                        service = service + "," + skinCare[x];
                    }

                    //nail care
                    for (var x = 0; x < nailCare.length; x++) {
                        service = service + "," + nailCare[x];
                    }

                    //remove first comma
                    service = service.substring(1,service.length);

                    var stylistResult = await User.findOne({ _id: stylishId });
                    //check stylish available
                    if (stylistResult){

                        var stylishName = stylistResult.first_name + " " + stylistResult.last_name;

                        array.push({ appointment_id: id, time: appTime, date: appDate, create_time: time, status: status, service: service, name: stylishName });


                    }
                    
                }

                res.send({ status: "success", data: array });
            
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/admin_get").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const userType = req.current_user.user.type;

        if (userType == "admin") {
            
            Appointment.find({ status:"reserved" }).sort({time:-1}).then(async (doc)=>{


                var array = new Array();
                for(var i = 0; i < doc.length; i++){

                    var item = doc[i];

                    var id = item._id;
                    var stylishId = item.stylist_id;
                    var appTime = item.appoinment_time;
                    var appDate = item.appoinment_date;
                    var time = item.time;
                    var status = item.status;
                    var hairCare = item.hair_care;
                    var skinCare = item.skin_care;
                    var nailCare = item.nail_care;

                    var service = "";

                    //hair care
                    for (var x = 0; x < hairCare.length; x++){
                        service = service + "," + hairCare[x];
                    }

                    //skin care
                    for (var x = 0; x < skinCare.length; x++) {
                        service = service + "," + skinCare[x];
                    }

                    //nail care
                    for (var x = 0; x < nailCare.length; x++) {
                        service = service + "," + nailCare[x];
                    }

                    //remove first comma
                    service = service.substring(1,service.length);

                    var stylistResult = await User.findOne({ _id: stylishId });
                    //check stylish available
                    if (stylistResult){

                        var stylishName = stylistResult.first_name + " " + stylistResult.last_name;

                        array.push({ appointment_id: id, time: appTime, date: appDate, create_time: time, status: status, service: service, name: stylishName });


                    }
                    
                }

                res.send({ status: "success", data: array });
            
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/app_get").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const userType = req.current_user.user.type;
        const appId = req.body.appointment_id;

        if (userType == "client") {

            if (appId == null || appId == "") {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            Appointment.findOne({ _id: appId }).then(async (doc) => {
                
                var item = doc;

                var id = item._id;
                var stylishId = item.stylist_id;
                var appTime = item.appoinment_time;
                var appDate = item.appoinment_date;
                var time = item.time;
                var status = item.status;
                var hairCare = item.hair_care;
                var skinCare = item.skin_care;
                var nailCare = item.nail_care;

                var service = "";

                //hair care
                for (var x = 0; x < hairCare.length; x++) {
                    service = service + "," + hairCare[x];
                }

                //skin care
                for (var x = 0; x < skinCare.length; x++) {
                    service = service + "," + skinCare[x];
                }

                //nail care
                for (var x = 0; x < nailCare.length; x++) {
                    service = service + "," + nailCare[x];
                }

                //remove first comma
                service = service.substring(1, service.length);

                var stylistResult = await User.findOne({ _id: stylishId });

                var stylishName = stylistResult.first_name + " " + stylistResult.last_name;

                var result = { appointment_id: id, time: appTime, date: appDate, create_time: time, status: status, service: service, name: stylishName };

                res.send({ status: "success", data:result });

            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

module.exports = router;