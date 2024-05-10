import { useEffect, useState } from 'react';
//import axios from 'axios';
import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import './Leave.css';
import { useCurrentUserType } from '../../auth';

function Leave() {
    
    const { RangePicker } = DatePicker;
    var userType = useCurrentUserType();

    if(userType != "employee"){
        return("You can not access this.");
    }

    return (
        <div className='bg-image-leave'>

            <div className='leave'>

                <div className='leave-form card p-2'>

                    <h1 className='card-title'>Request to Leave</h1>

                    <Form layout='vertical'>


                        <Form.Item
                            label="RangePicker"
                            name="RangePicker"
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


                        <button className='primary-button-leave' htmltype='submit'>Submit</button>


                    </Form>
                </div>

            </div>

        </div>
    );


}

export default Leave;