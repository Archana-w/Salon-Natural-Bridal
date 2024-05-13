import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AddEmp.css';
import emailjs from 'emailjs-com';
import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";

function AddEmp() {
    var token = useAuthToken();
    var navigate = useNavigate();

    const [empTypeData, setEmpTypeData] = useState([]);
    const [employeeData, setEmployeeData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        password: '',
        nic: '',
        employee_type: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const jsonData = employeeData;

        if (token != null) {
            axios.post("http://localhost:5000/emp/add", { token: token, ...jsonData }).then((response) => {
                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    alert("Employee added");
                    sendWelcomeEmail(jsonData.email, jsonData.password);
                } else if (status == "token_expired" || status == "auth_failed") {
                    navigate("/signout");
                } else {
                    var message = data.message;
                    alert("Error - " + message);
                }
            }).catch((error) => {
                alert("Error - " + error);
            });
        } else {
            navigate("/signout");
        }
    };

    useEffect(() => {
        if (token != null) {
            axios.post("http://localhost:5000/emp/etget", { token: token }).then((response) => {
                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    setEmpTypeData(data.data);
                } else if (status == "token_expired" || status == "auth_failed") {
                    navigate("/signout");
                } else {
                    var message = data.message;
                    alert("Error - " + message);
                }
            }).catch((error) => {
                alert("Error - " + error);
            });
        } else {
            navigate("/signout");
        }
    }, []);

    const sendWelcomeEmail = (email, password) => {
        emailjs.send("service_cdlk97d", "template_ccwq2z9", {
            to_email: email,
            password: password
        }).then((response) => {
            console.log("Email sent successfully", response);
        }).catch((error) => {
            console.error("Error sending email", error);
        });
    };

    return (

        <div className="employee-form-container">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input type="text" name="first_name" value={employeeData.first_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="last_name" value={employeeData.last_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input type="text" name="mobile_number" value={employeeData.mobile_number} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={employeeData.email} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={employeeData.password} onChange={handleInputChange} />
                </div>
                <div>
                    <label>NIC:</label>
                    <input type="text" name="nic" value={employeeData.nic} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Employee Type:</label>
                    <select name="emp_type" onChange={handleInputChange}>
                        <option value="">Select Type</option>
                        {empTypeData.map((item) =>
                            <option value={item._id}>{item.type}</option>
                        )}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    );
}

export default AddEmp;