import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import './EditEmployee.css';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

function EditEmployee() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();
  const{ employee_id } = useParams();



  useEffect(() => {

  

    axios.get(`http://localhost:5000/employee/${employee_id}`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
      });
  }, []);

  const onFinish = (values) => {
    axios.put(`http://localhost:5000/employee/${employee_id}`, values)
      .then(function (response) {
        var data = response.data;
        var status = data.status;
        if (status === 'success') {
          navigate('/employees');
        } else {
          alert(JSON.stringify(data));
        }
      })
      .catch(function (error) {
        alert(error);
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
                rules={[
                  {
                    required: true,
                    message: 'Please input employee\'s First Name!',
                  },
                ]}
              >
                <Input className="signup_input" placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input employee\'s Last Name!',
                  },
                ]}
              >
                <Input className="signup_input" placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                label="Job Role"
                name="job_role"
                rules={[
                  {
                    required: true,
                    message: 'Please select employee\'s Job Role!',
                  },
                ]}
              >
                <Select className="signup_input" placeholder="Select Job Role">
                  <Option value="admin">Admin</Option>
                  <Option value="stylist">Stylist</Option>
                  <Option value="receptionist">Receptionist</Option>
                  <Option value="cashier">Cashier</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Contact Number"
                name="mobile_number"
                rules={[
                  {
                    required: true,
                    message: 'Please input employee\'s Contact Number!',
                  },
                ]}
              >
                <Input className="signup_input" placeholder="Contact Number" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input employee\'s Email!',
                  },
                ]}
              >
                <Input className="signup_input" placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input employee\'s Password!',
                  },
                ]}
              >
                <Input.Password className="signup_input" placeholder="Password" type="password" />
              </Form.Item>
              <button className="primary-button" htmltype="submit">SAVE CHANGES</button>
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