import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Divider, Table} from 'antd';
import './Emp_details.css'
import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";



function Emp_details(){

  var token = useAuthToken();
  var navigate = useNavigate();

  const[employeeData,setEmployeeData] = useState([]);
  

  useEffect(()=>{
    
    if (token != null) {

      axios.post("http://localhost:5000/emp/get", { token: token }).then((response) => {

        var data = response.data;
        var status = data.status;
        if (status == "success") {
          setEmployeeData(data.data);
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
      navigate("/signout");
    }

  },[]);


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
  

    return(
      <div className='content'> <h2>Manage Employees</h2>
      <input className='search'
      type="search"
      placeholder="Search here"/>
      <Divider>Employee Details</Divider>
        <Table columns={columns} dataSource={employeeData} pagination={false}/>
      <div><button className='add_emp_btn'>Add Employee</button></div>
      </div>
      
    );
}

export default Emp_details;