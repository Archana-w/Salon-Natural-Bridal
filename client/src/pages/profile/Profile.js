import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Form, Input, Flex, Button, Upload } from 'antd';
import './Profile.css';
import ProfileImage from '../../images/customer_appointment/profile_img.jpg';
import { PlusOutlined } from '@ant-design/icons';


function Profile() {
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (


        <div className='upper-img'>

            <div className='image-container'>
                <img className='profile_img' src={ProfileImage} alt="profile" height="100px" width="100px" />
            </div>

            <div className="lower-container">

                <div className='profile-form'>

                    <h1 className='pcard-title'>Sandra Susan</h1>
                    <h3 className='sub-title'>User Information</h3>

                    <Form className='form' layout='horizontal'>

                        <Form.Item label='Name' name='name'>

                            <Input className='profile_input' id='pname' placeholder='Name' />

                        </Form.Item>

                        <Form.Item label='Address' name='address'>

                            <Input className='profile_input' id='paddress' placeholder='Address' />

                        </Form.Item>

                        <Form.Item label='Contact Number' name='contact number'>

                            <Input className='profile_input' id='pnumber' placeholder='Contact Number' />

                        </Form.Item>

                        <Form.Item label='Email' name='email'>

                            <Input className='profile_input' id='pemail' placeholder='Email' />

                        </Form.Item>



                        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload className='upload' action="/upload.do" listType="picture-card">
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                    }}
                                    type="button"
                                >
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Upload
                                    </div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <Flex className='profile_btn' gap="small" wrap="wrap">


                            <Button className='edit-profile' type="primary">Edit Profile</Button>
                            <Button className='delete' type="primary">Delete Account</Button>

                        </Flex>


                    </Form>
                </div>

            </div>
        </div>

    );
}

export default Profile;