import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Divider, Table} from 'antd';
import './Emp_attendance.css'

function Emp_attendance(){
    const columns = [
        {
          title: 'Employee ID',
          dataIndex: 'employee_id',
        },
        {
          title: 'Emloyee Name',
          dataIndex: 'employee_name',
        },
       
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: () => <button className='start_btn'>Start</button>,
          
        },
     
      ];
      const data = [
        {
          key: '1',
          employee_id:1,
          employee_name: 'John Brown',
          
    
        },
        {
          key: '2',
          employee_id:2,
          employee_name: 'Jim Green',
          
        },
        {
          key: '3',
          employee_id:3,
          employee_name: 'Joe Black',
         
        },
      ];
      
    return(
        <div className='content'> <h2>Manage Employees Attendance</h2>
        <input className='search'
        type="search"
        placeholder="Search here"/>
        <Divider>Employee Attendance</Divider>
        <Table columns={columns} dataSource={data} pagination={false}/>
        
        </div>
    );
}

export default Emp_attendance;