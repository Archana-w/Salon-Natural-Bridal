import { useEffect, useState } from 'react';
/*import axios from 'axios';*/
import React from 'react';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function Login() {

  const[cookies,setCookies] = useCookies(["auth_token","user_type"]);
  var navigate = useNavigate();

  const onFinish = (values) => {

    axios.post("http://localhost:5000/user/login",values).then((response)=>{
      
      var data = response.data;
      var status = data.status;
      if(status == "success"){
      
        var token = data.access_token;
        var type = data.type;

        //redirect user
        if(type == "client"){
          
          //save access token in cookie
          setCookies("auth_token", token);
          setCookies("user_type", type);
          //redirect client home
          navigate("/");

        }else if(type == "employee"){
          //redirect employye home
        
        }else if(type == "admin"){
          //redirect admin
          navigate("/admin/" + token);
        }

      } else if (status == "invalid_user"){
        var message = data.message;
        alert(message);
      }else{
        alert(JSON.stringify(data));
      }

    }).catch((error)=>{
      alert("Error - "+error);
    });

  };

  return (
    <div className='bg-image-login'>

      <div className='authentication-login'>

        <div className='authentication-form-login card p-2'>

          <h1 className='card-title'>LOGIN</h1>

          <Form layout='vertical' onFinish={onFinish}>

            <Form.Item label='Email' name='email'

              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}>

              <Input className='login_input' placeholder='Email' />

            </Form.Item>

            <Form.Item label='Password' name='password'

              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}>

              <Input.Password className='login_input' placeholder='Password' type='password' />

            </Form.Item>

            <button className='primary-button-login' htmltype='submit'>LOGIN</button>

            <p className='para'>Not have an account?<Link to='/signup' className='anchor'> SIGN UP</Link> </p>
          </Form>
        </div>

      </div>

    </div>
  );
}

export default Login;