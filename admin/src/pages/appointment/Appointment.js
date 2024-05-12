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

   // Add salon name at the top with background color
   doc.setFillColor(0, 0, 0); // Set background color to yellow
   doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F'); // Draw rectangle with background color
   doc.setFontSize(20);
   doc.setTextColor(255, 204, 0); // Set font color to red
   doc.text("Salon Natural Bridal", doc.internal.pageSize.getWidth() / 2, 15, 'center');

   // Add report title
   doc.setTextColor(0, 0, 0); // Reset font color to black
   doc.setFontSize(16);
   doc.text("Appointment Report", doc.internal.pageSize.getWidth() / 2, 30, 'center');

   // Get appointments within the week
   const today = new Date();
   const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
   const appointmentsWithinWeek = AppointmentData.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= oneWeekAgo && appointmentDate <= today;
   });

   // Count appointments for each service for the week
   const serviceCountsWeek = {};
   const stylistCountsWeek = {}; // Initialize object to count stylist appointments
   appointmentsWithinWeek.forEach(appointment => {
      serviceCountsWeek[appointment.service] = (serviceCountsWeek[appointment.service] || 0) + 1;
      stylistCountsWeek[appointment.name] = (stylistCountsWeek[appointment.name] || 0) + 1; // Count stylist appointments
   });

   // Get appointments within the month
   const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
   const appointmentsWithinMonth = AppointmentData.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= oneMonthAgo && appointmentDate <= today;
   });

   // Count appointments for each service for the month
   const serviceCountsMonth = {};
   const stylistCountsMonth = {}; // Initialize object to count stylist appointments
   appointmentsWithinMonth.forEach(appointment => {
      serviceCountsMonth[appointment.service] = (serviceCountsMonth[appointment.service] || 0) + 1;
      stylistCountsMonth[appointment.name] = (stylistCountsMonth[appointment.name] || 0) + 1; // Count stylist appointments
   });

   // Generate report content for the week
doc.setFontSize(14);
doc.setTextColor(0, 0, 0); // Reset font color to black
doc.text(`Total Appointments within the week: ${appointmentsWithinWeek.length}`, doc.internal.pageSize.getWidth() / 2, 45, 'center');
doc.text("Most Selected Services for the Week:", doc.internal.pageSize.getWidth() / 2, 55, 'center');
doc.autoTable({
    startY: 65,
    head: [['Service Name', 'Number of Appointments']],
    body: Object.entries(serviceCountsWeek),
    theme: 'plain', // Set theme to 'plain' to disable styling
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Set text color of table header cells to black
    alternateRowStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0] } // Set styles for alternate rows
});
doc.text("Most Selected Stylists for the Week:", doc.internal.pageSize.getWidth() / 2, doc.autoTable.previous.finalY + 15, 'center');
doc.autoTable({
    startY: doc.autoTable.previous.finalY + 25,
    head: [['Stylist Name', 'Number of Appointments']],
    body: Object.entries(stylistCountsWeek),
    theme: 'plain', // Set theme to 'plain' to disable styling
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Set text color of table header cells to black
    alternateRowStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0] } // Set styles for alternate rows
});


   // Add a new page for monthly appointments
   doc.addPage();

   // Generate report content for the month
   doc.setFontSize(14);
   doc.setTextColor(0, 0, 0); // Reset font color to black
   doc.text(`Total Appointments within the month: ${appointmentsWithinMonth.length}`, doc.internal.pageSize.getWidth() / 2, 45, 'center');
   doc.text("Most Selected Services for the Month:", doc.internal.pageSize.getWidth() / 2, 55, 'center');
   doc.autoTable({
      startY: 65,
      head: [['Service Name', 'Number of Appointments']],
      body: Object.entries(serviceCountsMonth),
      theme: 'plain', // Set theme to 'plain' to disable styling
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Set text color of table header cells to black
    alternateRowStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0] } // Set styles for alternate rows
   });
   doc.text("Most Selected Stylists for the Month:", doc.internal.pageSize.getWidth() / 2, doc.autoTable.previous.finalY + 15, 'center');
   doc.autoTable({
      startY: doc.autoTable.previous.finalY + 25,
      head: [['Stylist Name', 'Number of Appointments']],
      body: Object.entries(stylistCountsMonth),
      theme: 'plain', // Set theme to 'plain' to disable styling
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Set text color of table header cells to black
    alternateRowStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0] } // Set styles for alternate rows
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
