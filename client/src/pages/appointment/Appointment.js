import React, { useEffect, useState } from 'react';
import { Form, Checkbox, DatePicker, TimePicker, Select, Flex, Button, Input } from 'antd';
import axios from 'axios'; // Import Axios for making HTTP requests
import moment from 'moment'; // Import moment for date and time handling
import './Appointment.css';
import HairImage from '../../images/customer_appointment/haircare.jpg';
import SkinImage from '../../images/customer_appointment/skincare.jpg';
import NailImage from '../../images/customer_appointment/nailcare.jpg';
import { useAuthToken } from '../../auth';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoading from '../../components/loading/PageLoading';

function Appointment() {

    var { id } = useParams();
    var token = useAuthToken();
    var navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [stylish, setStylish] = useState({});
    const [selectedDate, setSelectedDate] = useState(null); // State to hold the selected date

    const [selectedServices, setSelectedServices] = useState({
        hairCare: [],
        skinCare: [],
        nailCare: []
    });

    useEffect(() => {

        if (token != null) {

            //load stylish details
            axios.post("http://localhost:5000/emp/get_employee", { token: token, employee_type: "66288da18da7ebc59fc96a2b" }).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    setStylish(data.data);
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

    }, []);

    const onFinish = async (values) => {

        try {
            const formData = {
                ...values,
                ...selectedServices
            };

            if (token != null) {

                setLoading(true);

                axios.post("http://localhost:5000/appointment/create", { token: token, stylist_id: formData.select, time: formData.time_range, date: selectedDate.format('YYYY-MM-DD'), hair_care: formData.hairCare, nail_care: formData.nailCare, skin_care: formData.skinCare, }).then((response) => {

                    var data = response.data;
                    var status = data.status;
                    if (status == "success") {
                        alert("Appointment created...");
                        navigate("/my-app");
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

            //show a success message or redirect the user
        } catch (error) {
            console.error('Error creating appointment:', error);
            //show error message to the user
        }
    };

    const handleServiceSelection = (category, selectedValues) => {
        setSelectedServices(prevState => ({
            ...prevState,
            [category]: selectedValues
        }));
    };

    const { Option } = Select;

    const disabledDate = (currentDate) => {
        return currentDate && currentDate < moment().startOf('day');
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

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
                                            <div className="app_desc">Hair Care</div>
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
                                            <div className="app_desc">Skin Care</div>
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
                                            <div className="app_desc">Nail Care</div>
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


                                    <Form.Item name="DatePicker" label="Select Date" rules={[{ required: true, message: 'Please select a date!' }]}>
                                        <DatePicker className='datepic' disabledDate={disabledDate} onChange={handleDateChange} />
                                    </Form.Item>
                                    <Form.Item name="time_range" label="Select time" hasFeedback rules={[{ required: true, message: 'Please select your time!' }]}>
                                        <Select className='selectt' placeholder="Please select a time">
                                            <Option value="8 a.m. - 9 a.m.">8 a.m. - 9 a.m.</Option>
                                            <Option value="9 a.m. - 10 a.m.">9 a.m. - 10 a.m.</Option>
                                            <Option value="10 a.m. - 11 a.m.">10 a.m. - 11 a.m.</Option>
                                            <Option value="11 a.m. - 12 p.m.">11 a.m. - 12 p.m.</Option>
                                            <Option value="12 p.m. - 13 p.m.">12 p.m. - 13 p.m.</Option>
                                            <Option value="13 p.m. - 14 p.m.">13 p.m. - 14 p.m.</Option>
                                            <Option value="14 p.m. - 15 p.m.">14 p.m. - 15 p.m.</Option>
                                            <Option value="15 p.m. - 16 p.m.">15 p.m. - 16 p.m.</Option>
                                            <Option value="16 p.m. - 17 p.m.">16 p.m. - 17 p.m.</Option>
                                            <Option value="17 p.m. - 18 p.m.">17 p.m. - 18 p.m.</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="select" label="Select Stylist" hasFeedback rules={[{ required: true, message: 'Please select your Stylist!' }]}>
                                        <Select className='selects' placeholder="Please select a Stylist">
                                            {stylish.map((item) =>
                                                <Option value={item.employee_id}>{item.name}</Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                    <Flex gap="small" wrap="wrap">
                                        <Button className='submit' type="primary" htmlType='submit'>Submit</Button>


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
