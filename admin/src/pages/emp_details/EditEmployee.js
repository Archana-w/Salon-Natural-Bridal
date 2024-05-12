import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './EditEmployee.css';
import { useAuthToken } from '../../auth';

function EditEmployee() {
  
    const [employee, setEmployee] = useState(null);
    const { employee_id } = useParams();
    const token = useAuthToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios.post("http://localhost:5000/emp/get_emp", { token, emp_id: employee_id })
                .then((response) => {
                    const data = response.data;
                    if (data.status === "success") {
                        setEmployee(data.doc);
                    } else if (data.status === "token_expired" || data.status === "auth_failed") {
                        navigate("/signout");
                    } else {
                        alert("Error - " + data.message);
                    }
                })
                .catch((error) => {
                    alert("Error fetching employee details");
                });
        } else {
            navigate("/signout");
        }
    }, [token, employee_id, navigate]);

    const onFinish = (values) => {
        axios.post("http://localhost:5000/emp/edit", {
            token,
            emp_id: employee_id,
            ...values
        })
        .then((response) => {
            const data = response.data;
            if (data.status === "success") {
                setEmployee(data.doc);
            } else if (data.status === "token_expired" || data.status === "auth_failed") {
                navigate("/signout");
            } else {
                alert("Error - " + data.message);
            }
        })
        .catch((error) => {
            alert("Error editing employee details");
        });
    };

    return (
        <div className="bg-image">
            <div className="authentication">
                <div className="authentication-form card p-2">
                    <h1 className="card-title">EDIT EMPLOYEE DETAILS</h1>
                    {employee && (
                        <Form layout="vertical" onFinish={onFinish} initialValues={employee}>
                            <Form.Item
                                label="First Name"
                                name="first_name"
                                rules={[{ required: true, message: 'Please input employee\'s First Name!' }]}
                            >
                                <Input className="signup_input" placeholder="First Name" />
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="last_name"
                                rules={[{ required: true, message: 'Please input employee\'s Last Name!' }]}
                            >
                                <Input className="signup_input" placeholder="Last Name" />
                            </Form.Item>
                            <Form.Item
                                label="Contact Number"
                                name="mobile_number"
                                rules={[{ required: true, message: 'Please input employee\'s Contact Number!' }]}
                            >
                                <Input className="signup_input" placeholder="Contact Number" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input employee\'s Email!' }]}
                            >
                                <Input className="signup_input" placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                label="NIC"
                                name="nic"
                                rules={[{ required: true, message: 'Please input employee\'s NIC!' }]}
                            >
                                <Input className="signup_input" placeholder="NIC" />
                            </Form.Item>
                            <button className="primary-button" type="submit">SAVE CHANGES</button>
                        </Form>
                    )}
                    <p className="para">
                        Go back to <Link to="/employees" className="anchor">Employees List</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EditEmployee;