import React,{useEffect,useState} from "react";
import { Divider, Table} from 'antd';
import './AppointmentList.css'
import axios from 'axios';
import { useAuthToken } from '../../auth';
import { useNavigate } from 'react-router-dom';
import PageLoading from '../../components/loading/PageLoading';



function AppointmentList(){

  var token = useAuthToken();
  var navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [data,setData] = useState([]);
  
  useEffect(()=>{

    if (token != null) {

      axios.post("http://localhost:5000/appointment/get", { token: token }).then((response) => {

          var data = response.data;
          var status = data.status;
          if (status == "success") {
            setData(data.data);
            setLoading(false);
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
      navigate("/login");
    }


  });

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


  if (isLoading) {

    return (
      <>
        <PageLoading />
      </>
    );

  } else {

    return (
      <div className='content'> <h2>Your Appoinments</h2>
        <input className='search'
          type="search"
          placeholder="Search here" />
        <Table columns={columns} dataSource={data} pagination={false} />

      </div>

    );

  }
  
}
export default AppointmentList;