import { Form, Input, Select } from 'antd';
import React from 'react';
import './Salary.css';

function Salary() {
    const { Option } = Select;

    const onFinish = (values) => {
        console.log('Form values:', values);
        
    };

    // validation for salary, OT hours, and bonus
    const validatePositiveNumber = (_, value) => {
        if (!value || isNaN(value)) {
            return Promise.reject(new Error('Please input a valid number!'));
        }
        if (parseInt(value) < 0) {
            return Promise.reject(new Error('Value cannot be negative!'));
        }
        return Promise.resolve();
    };

    //  validation for OT hours
    const validateOTHours = (_, value) => {
        if (parseInt(value) > 40) {
            return Promise.reject(new Error('OT Hours cannot exceed 40!'));
        }
        return validatePositiveNumber(_, value);
    };

    return (
        <div className='bg-image-salary'>
            <div className='salary'>
                <div className='salary-form card p-2'>
                    <h1 className='card-title'>Employee Salary</h1>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item
                            label='Employee Type'
                            name='employeeType'
                            hasFeedback
                            rules={[{ required: true, message: 'Please select your Employee Type!' }]}
                        >
                            <Select className='salary_select' placeholder="Please select a Employee Type">
                                <Option value="Stylist">Stylist</Option>
                                <Option value="Receptionist">Receptionist</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Basic Salary'
                            name='basicSalary'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Basic Salary!',
                                },
                                {
                                    validator: validatePositiveNumber,
                                },
                            ]}
                        >
                            <Input className='salary_input' placeholder='Basic Salary' />
                        </Form.Item>
                        <Form.Item
                            label='OT Hours'
                            name='otHours'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your OT Hours!',
                                },
                                {
                                    validator: validateOTHours,
                                },
                            ]}
                        >
                            <Input className='salary_input' placeholder='OT Hours' />
                        </Form.Item>
                        <Form.Item
                            label='Bonus'
                            name='bonus'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Bonus!',
                                },
                                {
                                    validator: validatePositiveNumber,
                                },
                            ]}
                        >
                            <Input className='salary_input' placeholder='Bonus' />
                        </Form.Item>
                        <button className='primary-button-salary' htmlType='submit'>Submit</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Salary;