import { useEffect, useState } from 'react';
import axios from 'axios';
import './Appointment.css'
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from "react-router-dom";



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

   }, []);
   function searchAppointmentId() {
      setUpdate(update + 1);
   }

   function copyAppointmentId(id) {
      navigator.clipboard.writeText(id);
      alert("Appointment id copied!!!");
   }


   return (
      <div className="appointment-list-container">
         <h1>Manage Appointment</h1>

         <div className='appointment-filter-bar'>

            <input className='appointment-filter-search' onChange={(e) => setSearchText(e.target.value)} placeholder="Search appointment" type="text" />
            <button className='appointment-filter-search-btn' onClick={searchAppointmentId}>Search</button>
            <button className='add_app_btn'>Add Appointment</button>
            <button className='generate_report_btn'>Generate Report</button> 

         </div>

         <table>
            <thead>
               <tr>
                  <th>Appointment ID</th>
                  <th>service Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Stylist Name</th>
                  <th>Edit</th> {/* Add a new column for action buttons */}
                  <th>Delete</th> {/* Add a new column for action buttons */}
               </tr>
            </thead>
            <tbody>
               {AppointmentData.map((appointment, index) => (
                  <tr>
                     <td>
                        <div className='appointment-id-td-container'>
                           {appointment.appointment_id.substring(0, 5)}...
                           <span onClick={() => copyAppointmentId(appointment.appointment_id)} className="material-icons-round">copy</span>
                        </div>
                     </td>

                     <td>{appointment.appointment_id}</td>
                     <td>{appointment.service}</td>
                     <td>{appointment.appoinment_date}</td>
                     <td>{appointment.appoinment_time}</td>
                     <td>{appointment.stylist_id}</td>

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