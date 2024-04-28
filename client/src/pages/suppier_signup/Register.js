import React from 'react';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/supplier/register', values);
      const data = response.data;
      if (data.status === 'success') {
        navigate('/login');
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
  };

  const validatePhoneNumber = (rule, value, callback) => {
    const phoneNumberPattern = /^\d{10}$/; // Regular expression for 10-digit phone number
    if (!phoneNumberPattern.test(value)) {
      callback('Please enter a valid 10-digit phone number');
    } else {
      callback();
    }
  };

  const validateEmail = (rule, value, callback) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email address
    if (!emailPattern.test(value)) {
      callback('Please enter a valid email address');
    } else {
      callback();
    }
  };

  const validatePassword = (rule, value, callback) => {
    if (value && value.length < 4) {
      callback('Password must be at least 4 characters');
    } else {
      callback();
    }
  };

  const validateName = (rule, value, callback) => {
    const namePattern = /^[a-zA-Z]+$/; // Regular expression for letters only
    if (!namePattern.test(value)) {
      callback('Please enter only letters');
    } else {
      callback();
    }
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The passwords do not match!'));
    },
  });

  return (
    <div className="register-container">
      <h2>Register Supplier</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name/Company Name"
          name="name"
          rules={[
            { required: true, message: 'Please input your Name/Company Name!' },
            { validator: validateName },
          ]}
        >
          <Input className="register-input" placeholder="Name/Company Name" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your Address!' }]}
        >
          <Input className="register-input" placeholder="Address" />
        </Form.Item>
        <Form.Item
          label="Contact"
          name="contact"
          rules={[
            { required: true, message: 'Please input your Contact Number!' },
            { validator: validatePhoneNumber },
          ]}
        >
          <Input className="register-input" placeholder="Contact" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your Email!' },
            { validator: validateEmail },
          ]}
        >
          <Input className="register-input" placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your Password!' },
            { validator: validatePassword },
          ]}
        >
          <Input.Password className="register-input" placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            validateConfirmPassword,
          ]}
        >
          <Input.Password className="register-input" placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input your Category!' }]}
        >
          <Input className="register-input" placeholder="Category" />
        </Form.Item>
        <button className="register-button" type="submit">Register</button>
      </Form>
    </div>
  );
}

export default Register;
