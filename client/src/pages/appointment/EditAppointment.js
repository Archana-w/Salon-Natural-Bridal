import React, { useEffect, useState } from 'react';
import { Form, Checkbox, DatePicker, TimePicker, Select, Flex, Button, Input } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './EditAppointment.css'; // You can create a separate CSS file for styling
import HairImage from '../../images/customer_appointment/haircare.jpg';
import SkinImage from '../../images/customer_appointment/skincare.jpg';
import NailImage from '../../images/customer_appointment/nailcare.jpg';
import { useAuthToken } from '../../auth';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoading from '../../components/loading/PageLoading';

function EditAppointment() {
    const { id } = useParams();
    const token = useAuthToken();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [appointmentData, setAppointmentData] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedServices, setSelectedServices] = useState({
        hairCare: [],
        skinCare: [],
        nailCare: []
    });

    useEffect(() => {
        if (token != null) {
            axios.post("http://localhost:5000/appointment/app_get", { token: token, appointment_id: id })
                .then((response) => {
                    const responseData = response.data;
                    const status = responseData.status;
                    if (status === "success") {
                        const appointment = responseData.data;
                        setAppointmentData(appointment);
                        setSelectedDate(moment(appointment.date));
                        setSelectedServices({
                            hairCare: appointment.service.includes("Hair") ? ["Hair"] : [],
                            skinCare: appointment.service.includes("Skin") ? ["Skin"] : [],
                            nailCare: appointment.service.includes("Nail") ? ["Nail"] : []
                        });
                        setLoading(false);
                    } else if (status === "token_expired" || status === "auth_failed") {
                        navigate("/signout");
                    } else {
                        const message = responseData.message;
                        alert("Error - " + message);
                    }
                })
                .catch((error) => {
                    alert("Error - " + error);
                });
        } else {
            navigate("/login");
        }
    }, [id, token, navigate]);

    const onFinish = async (values) => {
        try {
            const formData = {
                ...values,
                ...selectedServices
            };

            if (token != null) {
                setLoading(true);
                axios.post("http://localhost:5000/appointment/update", {
                    token: token,
                    appointment_id: id,
                    service_id: formData.select,
                    range: formData.time_range
                })
                    .then((response) => {
                        const responseData = response.data;
                        const status = responseData.status;
                        if (status === "success") {
                            alert("Appointment updated...");
                            navigate("/my-app");
                        } else if (status === "token_expired" || status === "auth_failed") {
                            navigate("/signout");
                        } else {
                            const message = responseData.message;
                            alert("Error - " + message);
                        }
                    })
                    .catch((error) => {
                        alert("Error - " + error);
                    });
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
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
        return <PageLoading />;
    } else {
        return (
            <div className='bg-image-appointment'>
                <div className="hero-text">
                    <h1>Edit Appointment</h1>
                    <br />
                    <br />
                    <p>Update your appointment details below:</p>
                </div>

                <div className='appointment'>
                    <div className='appointment-form card p-2'>
                        <h1 className='card_title'>Appointment Form</h1>
                        <h3 className='sub_title'>Select Your Services</h3>
                        <div className='bottomsection'>
                            <Form layout='horizontal' onFinish={onFinish} initialValues={{ DatePicker: selectedDate, time_range: appointmentData.time }}>
                                <div className='type-services'>
                                    {/* Service selection checkboxes */}
                                </div>
                                <div className='forminfo'>
                                    <Form.Item name="DatePicker" label="Select Date" rules={[{ required: true, message: 'Please select a date!' }]}>
                                        <DatePicker className='datepic' disabledDate={disabledDate} onChange={handleDateChange} />
                                    </Form.Item>
                                    <Form.Item name="time_range" label="Select time" hasFeedback rules={[{ required: true, message: 'Please select your time!' }]}>
                                        {/* Time range selection */}
                                    </Form.Item>
                                    <Form.Item name="select" label="Select Stylist" hasFeedback rules={[{ required: true, message: 'Please select your Stylist!' }]}>
                                        {/* Stylist selection */}
                                    </Form.Item>
                                    <Flex gap="small" wrap="wrap">
                                        <Button className='submit' type="primary" htmlType='submit'>Submit</Button>
                                    </Flex>
                                </div>
                            </Form>
                            <div className='bottom_des'>
                                {/* Contact details */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditAppointment;
