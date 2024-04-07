import { useEffect, useState } from 'react';
/*import axios from 'axios';*/
import React from 'react';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './SignUp.css';


function SignUp() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  }

  return (
    <div className='bg-image'>

      <div className='authentication'>

        <div className='authentication-form card p-2'>

          <h1 className='card-title'>CREATE AN ACCOUNT</h1>

          <Form layout='vertical' onFinish={onFinish}>

            <Form.Item label='Name' name='name'
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}>

              <Input className='signup_input' placeholder='Name' />

            </Form.Item>

            <Form.Item label='Address' name='address'
              rules={[
                {
                  required: true,
                  message: 'Please input your Address!',
                },
              ]}>

              <Input className='signup_input' placeholder='Address' />

            </Form.Item>

            <Form.Item label='Contact Number' name='contact number'

              rules={[
                {
                  required: true,
                  message: 'Please input your Contact Number!',
                },
              ]}>

              <Input className='signup_input' placeholder='Contact Number' />

            </Form.Item>

            <Form.Item label='Email' name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your Contact Email!',
                },
              ]}>

              <Input className='signup_input' placeholder='Email' />

            </Form.Item>

            <Form.Item label='Password' name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}>

              <Input.Password className='signup_input' placeholder='Password' type='password' />

            </Form.Item>

            <button className='primary-button' htmltype='submit'>SIGN UP</button>

            <p className='para'>Already have an account?<Link to='/login' className='anchor'> LOGIN</Link> </p>
          </Form>
        </div>

      </div>

    </div>
  );
}

export default SignUp;