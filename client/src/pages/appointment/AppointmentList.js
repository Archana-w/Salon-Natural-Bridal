import React, { useEffect, useState } from "react";
import { Divider, Table } from 'antd';
import './AppointmentList.css';
import axios from 'axios';
import { useAuthToken } from '../../auth';
import { useNavigate } from 'react-router-dom';
import PageLoading from '../../components/loading/PageLoading';

function AppointmentList() {

  const token = useAuthToken();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token != null) {
      axios.post("http://localhost:5000/appointment/get", { token: token })
        .then((response) => {
          const responseData = response.data;
          const status = responseData.status;
          if (status === "success") {
            setData(responseData.data);
            setLoading(false);
          } else if (status === "token_expired" || status === "auth_failed") {
            navigate("/signout");
          } else {
            const message = responseData.message;
            alert("Error - " + message);
          }
        })
        .catch((error) => {
          alert("Error 2 - " + error);
        });
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleEdit = (record) => {
    //  editing appointments
    navigate("/create-app");
  };

  const handleDelete = (record) => {
    //  deleting appointments
   
  };

  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'service',
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
      title: 'Stylist Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'edit',
      render: (text, record) => (
        <button className='edt_btn' onClick={() => handleEdit(record)}>Edit</button>
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'delete',
      render: (text, record) => (
        <button className='delete_btn' onClick={() => handleDelete(record)}>Delete</button>
      ),
    },
  ];

  if (isLoading) {
    return <PageLoading />;
  } else {
    return (
      <div className='content'>
        <h2>Your Appointments</h2>
        <input className='search' type="search" placeholder="Search here" />
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    );
  }
}

export default AppointmentList;
