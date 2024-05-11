import { useEffect, useState } from 'react';
import axios from 'axios';
import './Appointment.css'
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from "react-router-dom";
import './Appointment.css';

function Appointment() {
   var token = useAuthToken();
   var navigate = useNavigate();
   const [AppointmentData, setAppointmentData] = useState([]);
   const [searchText, setSearchText] = useState("");
   const [update, setUpdate] = useState(0);

   useEffect(() => {
      if (token != null) {
         axios.post("http://localhost:5000/appointment/admin_get", { token: token }).then((response) => {
            var data = response.data;
            var status = data.status;
            console.log(data);

            if (status === "success") {
               setAppointmentData(data.data);
            } else if (status === "token_expired" || status === "auth_failed") {
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
   }, []);

   function searchAppointmentId() {
      setUpdate(update + 1);
   }

   function copyAppointmentId(id) {
      navigator.clipboard.writeText(id);
      alert("Appointment id copied!!!");
   }

   // Function to sort appointment data by a given key
   const sortData = (key) => {
      const sortedData = [...AppointmentData].sort((a, b) => {
         if (a[key] < b[key]) return -1;
         if (a[key] > b[key]) return 1;
         return 0;
      });
      setAppointmentData(sortedData);
   };

   // Function to filter appointment data based on search text
   const filteredData = AppointmentData.filter(appointment =>
      appointment.appointment_id.toLowerCase().includes(searchText.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchText.toLowerCase()) ||
      appointment.date.toLowerCase().includes(searchText.toLowerCase()) ||
      appointment.time.toLowerCase().includes(searchText.toLowerCase()) ||
      appointment.name.toLowerCase().includes(searchText.toLowerCase())
   );

   return (
      <div className="appointment-list-container">
         <h1>Manage Appointment</h1>
         <div className='appointment-filter-bar'>
            <input className='appointment-filter-search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search appointment" type="text" />
            <button className='appointment-filter-search-btn' onClick={searchAppointmentId}>Search</button>
            <button className='add_app_btn'>Add Appointment</button>
            <button className='generate_report_btn'>Generate Report</button> 
         </div>
         <table>
            <thead>
               <tr>
                  <th onClick={() => sortData('appointment_id')}>Appointment ID</th>
                  <th onClick={() => sortData('service')}>Service Name</th>
                  <th onClick={() => sortData('date')}>Date</th>
                  <th onClick={() => sortData('time')}>Time</th>
                  <th onClick={() => sortData('name')}>Stylist Name</th>
                  <th>Edit</th> {/* Add a new column for action buttons */}
                  <th>Delete</th> {/* Add a new column for action buttons */}
               </tr>
            </thead>
            <tbody>
               {filteredData.map((appointment, index) => (
                  <tr key={index}>
                     <td>
                        <div className='appointment-id-td-container'>
                           {appointment.appointment_id.substring(0, 5)}...
                           <span onClick={() => copyAppointmentId(appointment.appointment_id)} className="material-icons-round">copy</span>
                        </div>
                     </td>
                     <td>{appointment.service}</td>
                     <td>{appointment.date}</td>
                     <td>{appointment.time}</td>
                     <td>{appointment.name}</td>
                     <td>
                        <Link>
                           <button className='edt_btn'>Edit</button>
                        </Link>
                     </td>
                     <td>
                        <Link>
                           <button className='delete_btn'>Delete</button>
                        </Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default Appointment;
