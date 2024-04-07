import { useEffect, useState } from 'react';
//import axios from 'axios';
import React from 'react';
import { Form, Input,Select } from 'antd';
import './Salary.css';

function Salary(){

    const { Option } = Select;
      return (
        <div className='bg-image-salary'>
    
          <div className='salary'>
    
            <div className='salary-form card p-2'>
    
              <h1 className='card-title'>Employee Salary</h1>
    
              <Form layout='vertical'>

                <Form.Item label='Employee Type' name='Employee Type'
    
                    hasFeedback
                    rules={[{ required: true, message: 'Please select your Employee Type!' }]}>
                        
                    <Select className='salary_select' placeholder="Please select a Employee Type">
                        <Option value="Stylist">Stylist</Option>
                        <Option value="Receptionist">Receptionist</Option>
                    </Select>
                    
                </Form.Item>
    
                <Form.Item label='Basic Salary' name='Basic Salary'
    
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Basic Salary!',
                    },
                  ]}>
    
                  <Input className='salary_input' placeholder='Basic Salary'/>
    
                </Form.Item>

                <Form.Item label='OT Hours ' name='OT Hours'
    
                  rules={[
                    {
                      required: true,
                      message: 'Please input your OT Hours!',
                    },
                  ]}>
    
                  <Input className='salary_input' placeholder='OT Hours' />
    
                </Form.Item>
    
                <Form.Item label='Bonus' name='Bonus'
    
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Bonus!',
                    },
                  ]}>
    
                  <Input className='salary_input' placeholder='Bonus'/>
    
                </Form.Item>
    
                <button className='primary-button-salary' htmltype='submit'>Submit</button>
    
                
              </Form>
            </div>
    
          </div>
    
        </div>
      );
}

export default Salary;