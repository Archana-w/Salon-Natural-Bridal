var express = require("express");
var router = express.Router();
var Appointment = require("../models/Appointment");

router.route("/create").post((req, res) => {

    const date = new Date();
    const time = date.getTime();

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const userType = req.current_user.user.type;

        if (userType == "client") {

            const serviceId = req.body.service_id;
            const range = req.body.range;
            const date = req.body.date;

            if(range == null || range == "" ||
                serviceId == null || serviceId == "" ||
                date == null || date == ""){
                res.send({ status: "required_failed", "message": "Required values are not received." });
               return; 
            }

            Appointment.findOne({ time_range: range }).then((doc)=>{
                if(doc == null){

                    var a = new Appointment();
                    a.time_range = range;
                    a.time = time;
                    a.date = date;
                    a.user_id = userId;
                    a.service_id = serviceId;
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
            const serviceId = req.body.service_id;
            const range = req.body.range;

            if (appId == null || appId == "" ||
                range == null || range == "" ||
                serviceId == null || serviceId == "") {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            Appointment.findOneAndUpdate({ _id: appId }, { time_range: range, service_id: serviceId }).then(()=>{
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

router.route("/get").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const userType = req.current_user.user.type;

        if (userType == "client") {
            
            Appointment.find({ user_id: userId }).then((doc)=>{
                res.send({ status: "success", data: doc });
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

module.exports = router;