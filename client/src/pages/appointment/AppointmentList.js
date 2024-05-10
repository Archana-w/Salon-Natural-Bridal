import React, { useEffect, useState } from "react";
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
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    if (token != null) {
      axios.post("http://localhost:5000/appointment/get", { token: token })
        .then((response) => {
          const responseData = response.data;
          const status = responseData.status;
          if (status === "success") {
            setData(responseData.data);
            setLoading(false);
            filterAppointments(searchQuery); // Filter appointments initially
          } else if (status === "token_expired" || status === "auth_failed") {
            navigate("/signout");
          } else {
            const message = responseData.message;
            alert("Error - " + message);
          }
        })
        .catch((error) => {
          alert("Error - " + error);
        });
    } else {
      navigate("/login");
    }
  }, [update]);

  const handleEdit = (record) => {
    //  editing appointments
    navigate("/create-app/" + record.appointment_id);
  };

  const handleDelete = (record) => {
    if (token != null) {
      setLoading(true);
      axios.post("http://localhost:5000/appointment/delete", { token: token, appointment_id: record.appointment_id })
        .then((response) => {
          const responseData = response.data;
          const status = responseData.status;
          if (status === "success") {
            setLoading(false);
            setUpdate(update + 1);
          } else if (status === "token_expired" || status === "auth_failed") {
            navigate("/signout");
          } else {
            const message = responseData.message;
            alert("Error - " + message);
          }
        })
        .catch((error) => {
          alert("Error - " + error);
        });
    }
  };

  const filterAppointments = (query) => {
    const filtered = data.filter(appointment => {
      const serviceMatch = appointment.service.toLowerCase().includes(query.toLowerCase());
      const dateMatch = appointment.date.includes(query);
      const timeMatch = appointment.time.includes(query);
      const stylistMatch = appointment.name.toLowerCase().includes(query.toLowerCase());
      return serviceMatch || dateMatch || timeMatch || stylistMatch;
    });
    setFilteredData(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterAppointments(value);
  };

  if (isLoading) {
    return <PageLoading />;
  } else {
    return (
      <div className="app_bg">
        <div className='content'>
          <h1>Your Appointments</h1>
          <input className='search' type="search" placeholder="Search here" value={searchQuery} onChange={handleSearch} />
          <div className="app_table">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Stylist Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {searchQuery ? filteredData.map(appointment => (
                  <tr key={appointment.appointment_id}>
                    <td>{appointment.service}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.name}</td>
                    <td><button className='edt_btn' onClick={() => handleEdit(appointment)}>Edit</button></td>
                    <td><button className='delete_btn' onClick={() => handleDelete(appointment)}>Delete</button></td>
                  </tr>
                )) : data.map(appointment => (
                  <tr key={appointment.appointment_id}>
                    <td>{appointment.service}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.name}</td>
                    <td><button className='edt_btn' onClick={() => handleEdit(appointment)}>Edit</button></td>
                    <td><button className='delete_btn' onClick={() => handleDelete(appointment)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentList;