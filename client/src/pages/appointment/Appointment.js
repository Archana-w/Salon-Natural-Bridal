import React, { useState } from 'react';
import { Form, Checkbox, DatePicker, TimePicker, Select, Flex, Button, Input } from 'antd';
import axios from 'axios'; // Import Axios for making HTTP requests
import './Appointment.css';
import HairImage from '../../images/customer_appointment/haircare.jpg';
import SkinImage from '../../images/customer_appointment/skincare.jpg';
import NailImage from '../../images/customer_appointment/nailcare.jpg';

function Appointment() {
  
    const { Option } = Select;

    return (
        <div className='bg-image-appointment'>
            <div className="hero-text">
                <h1>Book Appointment</h1>
                <br />
                <br />
                <p>Use our booking calendar to reserve service required: choose date and appointment you are interested in.</p>
            </div>

            <div className='appointment'>
                <div className='appointment-form card p-2'>
                    <h1 className='card_title'>Appointment Form</h1>
                    <h3 className='sub_title'>Select Your Services</h3>
                    <div className='bottomsection'>
                        <Form layout='horizontal'>
                            <div className='type-services'>
                                <div className='typediv'>
                                    <div className='typeimg'> <img src={HairImage} alt="hair" /></div>
                                    <div className="type">
                                        <div className="desc">Hair Care</div>
                                        <div className="categories">
                                            <Checkbox.Group>
                                                <Checkbox value="Hair straight">Hair straight</Checkbox>
                                                <Checkbox value="Hair perm">Hair perm</Checkbox>
                                                <Checkbox value="Hair rebonding">Hair rebonding</Checkbox>
                                                <Checkbox value="Hair color">Hair color</Checkbox>
                                                <Checkbox value="Hair cut">Hair cut</Checkbox>
                                                <Checkbox value="Hair style dressing">Hair style dressing</Checkbox>
                                                <Checkbox value="Oil treatment">Oil treatment</Checkbox>
                                            </Checkbox.Group>
                                        </div>
                                    </div>
                                </div>
                                <div className='typediv'>
                                    <div className='typeimg'> <img src={SkinImage} alt="skin" /></div>
                                    <div className="type">
                                        <div className="desc">Skin Care</div>
                                        <div className="categories">
                                            <Checkbox.Group>
                                                <Checkbox value="Facial">Facial</Checkbox>
                                                <Checkbox value="Cleanup">Cleanup</Checkbox>
                                                <Checkbox value="Bridal makeup">Bridal makeup</Checkbox>
                                                <Checkbox value="Normal makeup">Normal makeup</Checkbox>
                                                <Checkbox value="Full face threading">Full face threading</Checkbox>
                                                <Checkbox value="Eye brow shaping">Eye brow shaping</Checkbox>
                                                <Checkbox value="Hand waxing">Hand waxing</Checkbox>
                                                <Checkbox value="Legs waxing">Legs waxing</Checkbox>
                                            </Checkbox.Group>
                                        </div>
                                    </div>
                                </div>
                                <div className='typediv'>
                                    <div className='typeimg'> <img src={NailImage} alt="nail" /></div>
                                    <div className="type">
                                        <div className="desc">Nail Care</div>
                                        <div className="categories">
                                            <Checkbox.Group>
                                                <Checkbox value="Nail polish">Nail polish</Checkbox>
                                                <Checkbox value="Pedicure">Pedicure</Checkbox>
                                                <Checkbox value="Manicure">Manicure</Checkbox>
                                            </Checkbox.Group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='forminfo'>
                                <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your Name!' }]}>
                                    <Input className='appn_input' placeholder='Name' />
                                </Form.Item>
                                <Form.Item label='Contact Number' name='contactNumber' rules={[{ required: true, message: 'Please input your Contact Number!' }]}>
                                    <Input className='appc_input' placeholder='Contact Number' />
                                </Form.Item>
                                <Form.Item name="DatePicker" label="Select Date" rules={[{ required: true, message: 'Please select a date!' }]}>
                                    <DatePicker className='datepic' />
                                </Form.Item>
                                <Form.Item name="time-picker" label="Select Time" rules={[{ required: true, message: 'Please select a time!' }]}>
                                    <TimePicker className='timepic' format='HH:mm' />
                                </Form.Item>
                                <Form.Item name="select" label="Select Stylist" hasFeedback rules={[{ required: true, message: 'Please select your Stylist!' }]}>
                                    <Select className='selecta' placeholder="Please select a Stylist">
                                        <Option value="stylist1">Stylist 1</Option>
                                        <Option value="stylist2">Stylist 2</Option>
                                        <Option value="stylist3">Stylist 3</Option>
                                        <Option value="stylist4">Stylist 4</Option>
                                    </Select>
                                </Form.Item>
                                <Flex gap="small" wrap="wrap">
                                    <Button className='submit' type="primary" htmlType='submit'>Submit</Button>
                                    <Button className='edit' type="primary">Edit Details</Button>
                                    <Button className='cancel' type="primary">Cancel</Button>

                                </Flex>
                            </div>
                        </Form>
                        <div className='bottom_des'>
                            <h3>Book an appointment</h3>
                            <br />
                            <p>Call us</p>
                            <br />
                            <p>Phone : +94 77 635 6847</p>
                            <br />
                            <p>Phone : +94 77 394 1344</p>
                            <br />
                            <p>Phone : +94 77 434 9676</p>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
