import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AddEmp.css';
import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";



function AddEmp() {

    var token = useAuthToken();
    var navigate = useNavigate();

    const[empTypeData,setEmpTypeData] = useState([]);

    // State variables to hold form data
    const [employeeData, setEmployeeData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        password: '',
        nic: '',
        employee_type: '' // Added employee_type
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value
        });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can send the employeeData object to your backend for processing

        const jsonData = employeeData;
        console.log(jsonData);



        if (token != null) {

            axios.post("http://localhost:5000/emp/add", { token: token, first_name: jsonData.first_name, last_name: jsonData.last_name, mobile_number: jsonData.mobile_number, email: jsonData.email, password: jsonData.password, emp_type: jsonData.emp_type, nic: jsonData.nic }).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    alert("Employee added");
                } else if (status == "token_expired" || status == "auth_failed") {
                    navigate("/signout");
                } else {
                    var message = data.message;
                    alert("Error - " + message);
                }

            }).catch((error) => {
                alert("Error 2 - " + error);
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
                alert("Error 2 - " + error);
            });

        } else {
            navigate("/signout");
        }

    }, []);

    

    return (

        <div className="employee-form-container">
            <h2>Employee Form</h2>
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