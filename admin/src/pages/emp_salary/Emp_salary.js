import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Divider, Table} from 'antd';
import './Emp_salary.css'



function Emp_salary(){
  const columns = [
    {
      title: 'Salary ID',
      dataIndex: 'salary_id',
    },
    {
      title: 'Basic Salary',
      dataIndex: 'basic_salary',
    },
    {
      title: 'Bonus',
      dataIndex: 'bonus',
    },
    {
      title: 'OT Hours',
      dataIndex: 'OT_hours',
    },
    {
      title: 'OT Rate',
      dataIndex: 'OT_rate',
    },
    {
      title: 'OT Total',
      dataIndex: 'OT_total',
    },

    {
      title: 'Total Salary',
      dataIndex: 'total_salary',
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
      salary_id:1,
      basic_salary: 'John Brown',
      bonus: 'New York No. 1 Lake Park',
      OT_hours: '+9471123456',
      OT_rate:'Stylist',
      OT_total:'c@gmail.com',
      total_salary:'ac123'

    },
    {
      key: '2',
      salary_id:2,
      basic_salary: 'Jim Green',
      bonus: 'London No. 1 Lake Park',
      OT_hours: '+9471123456',
      OT_rate:'Stylist',
      OT_total:'c@gmail.com',
      total_salary:'ac123'
    },
    {
      key: '3',
      salary_id:3,
      basic_salary: 'Joe Black',
      bonus: 'Sydney No. 1 Lake Park',
      OT_hours: '+9471123456',
      OT_rate:'Stylist',
      OT_total:'c@gmail.com',
      total_salary:'ac123'
    },
  ];
  

    return(
      <div className='content'> <h2>Manage Employees Salary</h2>
      <input className='search'
      type="search"
      placeholder="Search here"/>
      <Divider>Employees Salary Details</Divider>
      <Table columns={columns} dataSource={data} pagination={false}/>
      <div><button className='add_emp_btn'>Add Employee</button></div>
      <div><button className='report_empSalary_btn'>Generate Report</button></div>
      </div>
      
    );
}

export default Emp_salary;