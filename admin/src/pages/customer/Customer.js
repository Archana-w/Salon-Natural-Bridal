import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Divider, Table } from 'antd';
import './Customer.css'
import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";


function Customer() {

  var token = useAuthToken();
  var navigate = useNavigate();

  const[customerData,setCustomerData] = useState([]);
  

  useEffect(()=>{
    
    if (token != null) {

      axios.post("http://localhost:5000/user/get", { token: token }).then((response) => {

        var data = response.data;
        var status = data.status;
        if (status == "success") {
          setCustomerData(data.data);
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
      title: 'Customer ID',
      dataIndex: 'customer_id',
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
 


  return (
    <div className='content'> <h2>Manage Customer</h2>
      <input className='search'
        type="search"
        placeholder="Search here" />
      <Divider>Customer Details</Divider>
      <Table columns={columns} dataSource={customerData} pagination={false} />
      <div><button className='add_cus_btn'>Add Customer</button></div>
    </div>

  );
}

export default Customer;