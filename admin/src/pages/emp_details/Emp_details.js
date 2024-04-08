import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Divider, Table} from 'antd';
import './Emp_details.css'



function Emp_details(){
  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Contact number',
      dataIndex: 'contact_number',
    },
    {
      title: 'Job role',
      dataIndex: 'job_role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Password',
      dataIndex: 'password',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <button className='edt_btn'>Edit</button>,
      
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <button className='delete_btn'>Delete</button>,
    },
 
  ];
  const data = [
    {
      key: '1',
      employee_id:1,
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
      contact_number: '+9471123456',
      job_role:'Stylist',
      email:'c@gmail.com',
      password:'ac123'

    },
    {
      key: '2',
      employee_id:2,
      name: 'Jim Green',
      address: 'London No. 1 Lake Park',
      contact_number: '+9471123456',
      job_role:'Stylist',
      email:'c@gmail.com',
      password:'ac123'
    },
    {
      key: '3',
      employee_id:3,
      name: 'Joe Black',
      address: 'Sydney No. 1 Lake Park',
      contact_number: '+9471123456',
      job_role:'Stylist',
      email:'c@gmail.com',
      password:'ac123'
    },
  ];
  

    return(
      <div className='content'> <h2>Manage Employees</h2>
      <input className='search'
      type="search"
      placeholder="Search here"/>
      <Divider>Employee Details</Divider>
      <Table columns={columns} dataSource={data} pagination={false}/>
      <div><button className='add_emp_btn'>Add Employee</button></div>
      </div>
      
    );
}

export default Emp_details;