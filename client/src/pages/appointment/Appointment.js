import React, { useState } from 'react';
import { Form, Checkbox, DatePicker, TimePicker, Select, Flex, Button, Input } from 'antd';
import axios from 'axios'; // Import Axios for making HTTP requests
import './Appointment.css';
import HairImage from '../../images/customer_appointment/haircare.jpg';
import SkinImage from '../../images/customer_appointment/skincare.jpg';
import NailImage from '../../images/customer_appointment/nailcare.jpg';
import { useAuthToken } from '../../auth';
import { useNavigate } from 'react-router-dom';
import PageLoading from '../../components/loading/PageLoading';



function Appointment() {

    var token = useAuthToken();
    var navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

  
    const [selectedServices, setSelectedServices] = useState({
        hairCare: [],
        skinCare: [],
        nailCare: []
    });

    const onFinish = async (values) => {

        try {
            const formData = {
                ...values,
                ...selectedServices
            };

            if (token != null) {

                setLoading(true);

                axios.post("http://localhost:5000/appointment/create", { token: token, time: formData.time_picker, date: formData.DatePicker, mobile_number: formData.contactNumber, hair_care: formData.hairCare, nail_care: formData.nailCare, skin_care: formData.skinCare, }).then((response) => {

                    var data = response.data;
                    var status = data.status;
                    if (status == "success") {
                        alert("Appointment created...");
                        setLoading(false);
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
                navigate("/login");
            }
 
            // Optionally, you can show a success message or redirect the user
        } catch (error) {
            console.error('Error creating appointment:', error);
            // Handle error, show error message to the user, etc.
        }
    };

    const handleServiceSelection = (category, selectedValues) => {
        setSelectedServices(prevState => ({
            ...prevState,
            [category]: selectedValues
        }));
    };

    const { Option } = Select;
   
    if (isLoading) {

        return (
            <>
                <PageLoading />
            </>
        );

    } else {

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
                            <Form layout='horizontal' onFinish={onFinish}>
                                <div className='type-services'>
                                    <div className='typediv'>
                                        <div className='typeimg'> <img src={HairImage} alt="hair" /></div>
                                        <div className="type">
                                            <div className="desc">Hair Care</div>
                                            <div className="categories">
                                                <Checkbox.Group onChange={(values) => handleServiceSelection('hairCare', values)}>
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
                                                <Checkbox.Group onChange={(values) => handleServiceSelection('skinCare', values)}>
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
                                                <Checkbox.Group onChange={(values) => handleServiceSelection('nailCare', values)}>
                                                    <Checkbox value="Nail polish">Nail polish</Checkbox>
                                                    <Checkbox value="Pedicure">Pedicure</Checkbox>
                                                    <Checkbox value="Manicure">Manicure</Checkbox>
                                                </Checkbox.Group>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='forminfo'>
                                    
                                    <Form.Item label='First Name' name='first_name' rules={[{ required: true, message: 'Please input your Name!' }]}>
                                        <Input className='appn_input' placeholder='First Name' />
                                    </Form.Item>

                                    <Form.Item label='Last Name' name='last_name' rules={[{ required: true, message: 'Please input your Name!' }]}>
                                        <Input className='appn_input' placeholder='Last Name' />
                                    </Form.Item>
                                     
                                    <Form.Item label='Contact Number' name='contactNumber' rules={[{ required: true, message: 'Please input your Contact Number!' }]}>
                                        <Input className='appc_input' placeholder='Contact Number' />
                                    </Form.Item>
                                    <Form.Item name="DatePicker" label="Select Date" rules={[{ required: true, message: 'Please select a date!' }]}>
                                        <DatePicker className='datepic' />
                                    </Form.Item>
                                    <Form.Item name="time_picker" label="Select Time" rules={[{ required: true, message: 'Please select a time!' }]}>
                                        <TimePicker className='timepic' format='HH:mm'/>
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

}

export default Appointment;
