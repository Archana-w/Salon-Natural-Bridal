import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from "react-router-dom";
import './Appointment.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
   const sortData = (key) => {
      const sortedData = [...AppointmentData].sort((a, b) => {
         if (a[key] < b[key]) return -1;
         if (a[key] > b[key]) return 1;
         return 0;
      });
      setAppointmentData(sortedData);
   };
   // Function to generate PDF report
   const generateReport = () => {
      const doc = new jsPDF();
      doc.text("Appointment Report", 10, 10);

      // Get appointments within the week
      const appointmentsWithinWeek = AppointmentData.filter(appointment => {
         const appointmentDate = new Date(appointment.date);
         const today = new Date();
         const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
         return appointmentDate >= oneWeekAgo && appointmentDate <= today;
      });

      // Count appointments for each service
      const serviceCounts = {};
      appointmentsWithinWeek.forEach(appointment => {
         serviceCounts[appointment.service] = (serviceCounts[appointment.service] || 0) + 1;
      });

      // Count appointments for each stylist
      const stylistCounts = {};
      appointmentsWithinWeek.forEach(appointment => {
         stylistCounts[appointment.name] = (stylistCounts[appointment.name] || 0) + 1;
      });

      // Generate report content
      doc.text(`Total Appointments within the week: ${appointmentsWithinWeek.length}`, 10, 20);

      // Generate table for most selected services
      doc.text("Most Selected Services:", 10, 30);
      doc.autoTable({
         startY: 40,
         head: [['Service Name', 'Number of Appointments']],
         body: Object.entries(serviceCounts),
      });

      // Generate table for most popular stylists
      doc.text("Most Popular Stylists:", 10, doc.autoTable.previous.finalY + 10);
      doc.autoTable({
         startY: doc.autoTable.previous.finalY + 20,
         head: [['Stylist Name', 'Number of Appointments']],
         body: Object.entries(stylistCounts),
      });

      doc.save('appointment_report.pdf');
   };

   return (
      <div className="appointment-list-container">
         <h1>Manage Appointment</h1>
         <div className='appointment-filter-bar'>
            <input className='appointment-filter-search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search appointment" type="text" />
            <button className='appointment-filter-search-btn' onClick={searchAppointmentId}>Search</button>
            <button className='add_app_btn'>Add Appointment</button>
            <button className='generate_report_btn' onClick={generateReport}>Generate Report</button>
         </div>
        
         <table className="appointment-table">
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
               {AppointmentData.map((appointment, index) => (
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
