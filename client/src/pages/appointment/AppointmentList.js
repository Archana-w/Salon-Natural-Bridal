import React,{useEffect,useState} from "react";
import { Divider, Table} from 'antd';
import './AppointmentList.css'
import axios from 'axios';
import { useAuthToken } from '../../auth';
import { useNavigate } from 'react-router-dom';


function AppointmentList(){

  var token = useAuthToken();
  var navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  
  useEffect(()=>{

    if (token != null) {

      axios.post("http://localhost:5000/appointment/get", { token: token }).then((response) => {

          var data = response.data;
          var status = data.status;
          if (status == "success") {
              alert(JSON.stringify(data));
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
          title: 'Stylist Name',
          dataIndex: 'stylist_name',
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
          
          service_name: 'hair Straight',
          date: '2024/03/22',
          time:'09.00',
          stylist_name:'stylist 1',
    
    
        },
        {
          key: '2',
          service_name: 'facial',
          date: '2024/03/22',
          time:'09.00',
          stylist_name:'stylist 2',
         
        },
        {
          key: '3',
          service_name: 'nail ploish',
          date: '2024/03/22',
          time:'09.00',
          stylist_name:'stylist 3',
         
        },
      ];
      
    
        return(
          <div className='content'> <h2>Your Appoinments</h2>
          <input className='search'
          type="search"
          placeholder="Search here"/>
          <Table columns={columns} dataSource={data} pagination={false}/>
          
          </div>
          
        );
    
    

}
export default AppointmentList;