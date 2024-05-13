const express = require("express");
const route = express.Router();
var User = require("../models/User");
var Attend = require("../models/Attend");
var EmployeeType = require("../models/EmployeeType");

route.route("/add").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if(userType == "admin"){
            
            const userId = req.current_user.user_id;
            var firstName = req.body.first_name;
            var lastName = req.body.last_name;
            var mobileNumber = req.body.mobile_number;
            var email = req.body.email;
            var password = req.body.password;
            var empType = req.body.emp_type;
            var nic = req.body.nic;

            //validate details
            if (firstName == null || firstName == "" ||
                lastName == null || lastName == "" ||
                mobileNumber == null || mobileNumber == "" ||
                email == null || email == "" ||
                password == null || password == "" ||
                empType == null || empType == "" ||
                nic == null || nic == "") {

                res.send({ "status": "required_failed", "message": "Please send required details." });

                return;
            }

            //check email is already
            User.findOne({ email: email }).then((doc) => {

                if (doc == null) {

                    //save user details
                    var emp = new User();
                    emp.first_name = firstName;
                    emp.last_name = lastName;
                    emp.mobile_number = mobileNumber;
                    emp.email = email;
                    emp.password = password;
                    emp.type = "employee";
                    emp.emp_type = empType;
                    emp.nic = nic;
                
                    emp.save().then(() => {
                        res.send({ "status": "success", "message": "Employee is registered." });
                    }).catch((e) => {
                        res.send({ "status": "failed", "message": "Somthing error. Please try again." });
                    });

                } else {
                    res.send({ "status": "already_email", "message": "This email is already." });
                }

            }).catch((e) => {
                res.send({ "status": "failed", "message": "Somthing error. Please try again." });
            });

        }else{
            res.send({ status: "access_denied", message: "Can not access." });
        }

        
    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

route.route("/edit").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if(userType == "admin"){
            
            const userId = req.current_user.user_id;
            var empId = req.body.emp_id;
            var firstName = req.body.first_name;
            var lastName = req.body.last_name;
            var mobileNumber = req.body.mobile_number;
            var email = req.body.email;
            var nic = req.body.nic;

            //validate details
            if (empId == null || empId == "" ||
                firstName == null || firstName == "" ||
                lastName == null || lastName == "" ||
                mobileNumber == null || mobileNumber == "" ||
                email == null || email == "" ||
                nic == null || nic == "") {

                res.send({ "status": "required_failed", "message": "Please send required details." });

                return;
            }

            User.findOneAndUpdate({_id:empId},{first_name:firstName,last_name:lastName,mobile_number:mobileNumber,email:email,nic:nic}).then(()=>{
                res.send({ "status": "success", "message": "Emp details changed." });
            }).catch((e) => {
                res.send({ "status": "failed", "message": "Somthing error. Please try again." });
            });

        }else{
            res.send({ status: "access_denied", message: "Can not access." });
        }

        
    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

route.route("/delete").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const userId = req.current_user.user_id;
            const employeeId = req.body.employee_id;

            //validate details
            if (employeeId == null || employeeId == "") {

                res.send({ "status": "required_failed", "message": "Please send required details." });

                return;
            }

            User.findOneAndDelete({ _id: employeeId }).then(()=>{
                res.send({ "status": "success", "message": "Employee Deleted." });
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

route.route("/get_emp").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const userId = req.current_user.user_id;
            var empId = req.body.emp_id;

            //validate details
            if (empId == null || empId == "") {
              res.send({ "status": "required_failed", "message": "Please send required details." });
              return;
            }

            User.findOne({_id:empId,type:"employee"}).then(async (doc)=>{

                res.send({ status: "success", doc });

            }).catch((e)=>{
                res.send("Error - "+e);
            });


        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
    
});

route.route("/get").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const userId = req.current_user.user_id;

            User.find({type:"employee"}).then(async (doc)=>{

                var dataArray = new Array();
                for (var i = 0; i < doc.length; i++){

                    var empDoc = doc[i];

                    var employeeType = empDoc.emp_type;
                    var fullName = empDoc.first_name + " " + empDoc.last_name;

                    //get employee type
                    var empTypeResult = await EmployeeType.findOne({ _id: employeeType });


                    var emp = { employee_id: empDoc._id,
                        name:fullName,
                        contact_number:empDoc.mobile_number,
                        job_role: empTypeResult.type,
                        email: empDoc.email,
                        password: empDoc.password
                        };
                    dataArray.push(emp);

                }

                res.send({ status: "success", data: dataArray });

            }).catch((e)=>{
                res.send(e);
            });


        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
    
});

route.route("/get_employee").post((req,res)=>{
    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const empType = req.body.employee_type;

        //validate details
        if (empType == null || empType == "") {
            res.send({ "status": "required_failed", "message": "Please send required details." });
            return;
        }

        User.find({ type: "employee", emp_type: empType  }).then(async (doc) => {

            var dataArray = new Array();
            for (var i = 0; i < doc.length; i++) {

                var empDoc = doc[i];

                var employeeType = empDoc.emp_type;
                var fullName = empDoc.first_name + " " + empDoc.last_name;

                //get employee type
                var empTypeResult = await EmployeeType.findOne({ _id: employeeType });


                var emp = {
                    employee_id: empDoc._id,
                    name: fullName,
                    contact_number: empDoc.mobile_number,
                    job_role: empTypeResult.type,
                    email: empDoc.email,
                    password: empDoc.password
                };
                dataArray.push(emp);

            }

            res.send({ status: "success", data: dataArray });

        }).catch((e) => {
            res.send(e);
        });


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

route.route("/atts").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const userId = req.body.user_id;

            //validate
            if(userId == null || userId == ""){
                res.send({ "status": "required_failed", "message": "Please send required details." });
                return;
            }

            User.findOne({ _id: userId}).then((doc)=>{

                if(doc != null){

                    const userType = doc.type;
                    if(userType == "employee"){

                        const currentDate = new Date();
                        const currentTimeInMillis = currentDate.getTime();
                        const dateString = currentDate.getFullYear() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getDate();
                        
                        const todayMillis = new Date(dateString).getTime();
                        const toadyLastMillis = todayMillis + 86400000;

                        Attend.find().where("start_time").gt(todayMillis).lt(toadyLastMillis).exec().then((doc) => {

                            if (doc.length == 0) {

                                const attend = new Attend();
                                attend.user_id = userId;
                                attend.start_time = currentTimeInMillis;
                                attend.end_time = 0;
                                attend.salary = 0;
                                attend.ot = 0;
                                attend.total = 0;

                                attend.save().then(() => {
                                    res.send({ status: "success", message: "Employee att start added." });
                                });


                            } else {
                                res.send({ "status": "already_marked", "message": "Emp attend already marked." });
                            }
                        }).catch((e)=>{
                            res.send("Error - "+e);
                        });

                    }else{
                        res.send({ "status": "invalid_request", "message": "This request can not proccess." })
                    }

                }else{
                    res.send({ "status": "invalid_request", "message": "This request can not proccess." });
                }
                
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

route.route("/atte").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const userId = req.body.user_id;

            //validate 
            if (userId == null || userId == "") {
                res.send({ "status": "required_failed", "message": "Please send required details." });
                return;
            }

            const currentDate = new Date();
            const currentTimeInMillis = currentDate.getTime();
            const dateString = currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate();

            const todayMillis = new Date(dateString).getTime();
            const toadyLastMillis = todayMillis + 86400000;

            Attend.find().where("start_time").gt(todayMillis).lt(toadyLastMillis).exec().then((doc) => {
                if (doc.length == 1) {

                    doc = doc[0];
                    if(doc.end_time == 0){

                        const attendId = doc.id;
                        const userId = doc.user_id;
                        const startTime = doc.start_time;

                        User.findById(userId).then((doc)=>{
                            
                            const empType = doc.emp_type;
                            
                            EmployeeType.findOne({ _id: empType }).then((doc)=>{
                                if(doc != null){

                                    const salary = doc.salary;
                                    const ot = doc.ot;
                                    const workingTime = currentTimeInMillis - startTime;

                                    //get hours milliseconds
                                    var hours = workingTime / (1000 * 60 * 60);
                                    var absoluteHours = Math.floor(hours);
                                    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

                                    //get minutes
                                    var minutes = (hours - absoluteHours) * 60;
                                    var absoluteMinutes = Math.floor(minutes);
                                    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

                                    //calculate
                                    const totalWorkingMin = (h * 60) + parseInt(m);

                                    var daySalary = 0;
                                    var otSalary = 0;

                                    //user working 8 h
                                    var dayH = 0;
                                    if (totalWorkingMin > 480) {
                                        dayH = 480;
                                    } else {
                                        dayH = totalWorkingMin;
                                    }
                                    const minSalary = (salary / 60);
                                    daySalary = dayH * minSalary;
                                    daySalary = daySalary.toFixed(2);

                                    if (totalWorkingMin > 480){
                                        //ot
                                        const otWorkingMin = totalWorkingMin - 480;
                                        const otMinSalary = (ot / 60);

                                        otSalary = otWorkingMin * otMinSalary;
                                        otSalary = otSalary.toFixed(2);
                                    }

                                    const totalSalary = parseFloat(daySalary) + parseFloat(otSalary);

                                    Attend.findOneAndUpdate({ _id: attendId }, { end_time: currentTimeInMillis, salary: daySalary, ot: otSalary, total: totalSalary }).then(() => {
                                        res.send({ status: "success", message: "Employee leaving marked." });
                                    });

                                }else{
                                    res.send({ "status": "invalid_request", "message": "This request can not proccess." });
                                }
                            });

                        });

                    }else{
                        res.send({ "status": "already_marked", "message": "Emp leaving already marked." });
                    }

                } else {
                    res.send({ "status": "invalid_request", "message": "This request can not be process." });
                }
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

route.route("/etadd").post((req,res)=>{
    
    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const empTypeValue = req.body.emp_type;
            const salary = req.body.salary;
            const ot = req.body.ot;

            //validate
            if (empTypeValue == null || empTypeValue == "" ||
                salary == null || salary == "" ||
                ot == null || ot == "") {
                res.send({ "status": "required_failed", "message": "Please send required details." });
                return;
            }

            EmployeeType.findOne({ type: empTypeValue }).then((doc)=>{

                if(doc == null){

                    const empType = new EmployeeType();
                    empType.type = empTypeValue;
                    empType.salary = salary;
                    empType.ot = ot;

                    empType.save().then(() => {
                        res.send({ "status": "success", "message": "Employee type details updated." });
                    });

                }else{

                    const empTypeId = doc.id;
                    EmployeeType.findOneAndUpdate({ _id: empTypeId }, { salary: salary, ot: ot }, { new: true, upsert: true }).then(() => {
                        res.send({ status: "success", message: "Employee type details updated." });
                    }).catch((e) => {
                        res.send(e);
                    });

                }

            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }


});

route.route("/etget").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            EmployeeType.find().then((doc)=>{
                res.send({ "status": "success", data: doc });
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }


});

route.route("/salary").post((req,res)=>{
    
    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const userId = req.body.user_id;
            const dayCount = req.body.day;

            //validate
            if (userId == null || userId == "" ||
                dayCount == null || dayCount == "") {
                res.send({ "status": "required_failed", "message": "Please send required details." });
                return;
            }

            User.findOne({_id:userId}).then((doc)=>{
                
                if(doc != null){

                    const userType = doc.type;
                    if(userType == "employee"){
                        //get salary details

                        const currentDate = new Date();
                        const currentTimeInMillis = currentDate.getTime();
                        const dateString = currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate();
                        const todayMillis = new Date(dateString).getTime();
                        const requestMillis = todayMillis - (86400000 * dayCount);

                        Attend.find().where("start_time").gte(requestMillis).lt(todayMillis).where("end_time").ne(0).exec().then((result)=>{
                            if(result.length != 0){

                                var dailyReport = new Array(); 
                                var totalSalary = 0;
                                for(var i = 0; i < result.length; i++){

                                    const data = result[i];
                                    const startTime = data.start_time;
                                    const endTime = data.end_time;
                                    const daySalary = data.salary;
                                    const otSalary = data.ot;
                                    const total = data.total;

                                    //date
                                    const date = new Date(startTime);
                                    const dateString = date.getFullYear() + "/" + parseInt(date.getMonth() + 1) +"/"+ date.getDay();

                                    //working time
                                    var hours = (endTime - startTime) / (1000 * 60 * 60);
                                    var h = Math.floor(hours);
                                    var minutes = (hours - h) * 60;
                                    var m = Math.floor(minutes);
                                   
                                    var workingTime = h + "h " + m + "min";

                                    totalSalary = totalSalary + total;
                                    var report = { total_salary: total, day_salary: daySalary, ot_salary: otSalary,  date: dateString, working_time: workingTime };
                                    dailyReport.push(report);

                                }

                                var response = { days: dayCount,total: totalSalary, report: dailyReport };
                                res.send(response);


                            }else{
                                res.send({ "status": "invalid_request", "message": "This request can not proccess." });
                            }
                        });

                    }

                }

            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

module.exports = route;