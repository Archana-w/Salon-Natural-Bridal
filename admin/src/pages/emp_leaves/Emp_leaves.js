import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Divider, Table} from 'antd';
import './Emp_leaves.css'



function Emp_leaves(){
  const columns = [
    {
      title: 'Leave ID',
      dataIndex: 'leave_id',
    },
    {
      title: 'Leave Type',
      dataIndex: 'leave_type',
    },
    {
      title: 'Job Role',
      dataIndex: 'job_role',
    },
    {
      title: 'OT Total',
      dataIndex: 'OT_total',
    },
    {
      title: 'Date From',
      dataIndex: 'date_from',
    },
    {
      title: 'Date To',
      dataIndex: 'date_to',
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
      leave_id:1,
      job_role: 'John Brown',
      OT_total: 'New York No. 1 Lake Park',
      date_from: '+9471123456',
      date_to:'Stylist',
      

    },
    {
      key: '2',
      leave_id:2,
      job_role: 'Jim Green',
      OT_total: 'London No. 1 Lake Park',
      date_from: '+9471123456',
      date_to:'Stylist',
      
    },
    {
      key: '3',
      leave_id:3,
      job_role: 'Joe Black',
      OT_total: 'Sydney No. 1 Lake Park',
      date_from: '+9471123456',
      date_to:'Stylist',
      
    },
  ];
  

    return(
      <div className='content'> <h2>Manage Employees Leaves</h2>
      <input className='search'
      type="search"
      placeholder="Search here"/>
      <Divider>Employees Leaves Details</Divider>
      <Table columns={columns} dataSource={data} pagination={false}/>
      <div><button className='add_emp_btn'>Add Employee</button></div>
      <div><button className='report_empLeaves_btn'>Generate Report</button></div>
      </div>
      
    );
}

export default Emp_leaves;