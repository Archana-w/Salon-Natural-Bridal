import { useEffect, useState } from 'react';
//import axios from 'axios';
import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import './Leave.css';
import { useCurrentUserType } from '../../auth';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { useAuthToken } from '../../auth';

function Leave() {
    
    const { RangePicker } = DatePicker;
    var userType = useCurrentUserType();
    var navigate = useNavigate();
    const token = useAuthToken();
    

    if(userType != "employee"){
        return("You can not access this.");
    }

    const onFinish = async (values) => {
        const { dates, TextArea } = values;
        const [fromDate, toDate] = dates;

        axios.post("http://localhost:5000/leave/add", { token:token, from_date: fromDate, to_date: toDate, text: TextArea })
            .then((response) => {
                var data = response.data;
                var status = data.status;
                console.log(data)
                if (status == "success") {
                    alert("Leave created...");
                } else if (status == "token_expired" || status == "auth_failed") {
                    navigate("/signout");
                } else {
                    var message = data.message;
                    alert("Error - " + message);
                }
            })
            .catch((error) => {
                alert("Error 2 - " + error);
            });

        
    }

    return (
        <div className='bg-image-leave'>

            <div className='leave'>

                <div className='leave-form card p-2'>

                    <h1 className='card-title'>Request to Leave</h1>

                    <Form layout='vertical' onFinish={onFinish}>


                        <Form.Item
                            label="RangePicker"
                            name="dates"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <RangePicker className='date' />
                        </Form.Item>
                        <Form.Item
                            label="TextArea"
                            name="TextArea"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]} >
                            <Input.TextArea className='text' />
                        </Form.Item>


                        <button className='primary-button-leave' htmlType='submit'>Submit</button>


                    </Form>
                </div>

            </div>

        </div>
    );

}

export default Leave;
