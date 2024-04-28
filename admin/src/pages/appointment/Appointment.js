import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Divider, Table} from 'antd';
import './Appointment.css'
import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";



function Appointment(){

  var token = useAuthToken();
  var navigate = useNavigate();

  const[AppointmentData,setAppointmentData] = useState([]);
  

  useEffect(()=>{
    
    if (token != null) {

      axios.post("http://localhost:5000/appointment/get", { token: token }).then((response) => {

        var data = response.data;
        var status = data.status;
        if (status == "success") {
          setAppointmentData(data.data);
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
      title: 'Appoinment ID',
      dataIndex: 'appoinment_id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_no',
    },
    {
      title: 'Service Name',
      dataIndex: 'service_name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
    },
  
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
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
      appoinment_id:1,
      customer_name: 'John Brown',
      contact_no:'0712345678',
      service_name: 'hair Straight',
      date: '2024/03/22',
      time:'09.00',
      employee_name:'stylist 1',


    },
    {
      key: '2',
      appoinment_id:2,
      customer_name: 'Jim Green',
      contact_no:'0712345678',
      service_name: 'facial',
      date: '2024/03/22',
      time:'09.00',
      employee_name:'stylist 2',
     
    },
    {
      key: '3',
      appoinment_id:3,
      customer_name: 'Joe Black',
      contact_no:'0712345678',
      service_name: 'nail ploish',
      date: '2024/03/22',
      time:'09.00',
      employee_name:'stylist 3',
     
    },
  ];
  

    return(
      <div className='content'> <h2>Manage Appoinment</h2>
      <input className='search'
      type="search"
      placeholder="Search here"/>
      <Divider>Appoinment Details</Divider>
      <Table columns={columns} dataSource={AppointmentData} pagination={false}/>
      <div><button className='add_app_btn'>Add Appoinment</button></div>
      <div><button className='report_btn'>Generate Report</button></div>
      </div>
      
    );
}

export default Appointment;