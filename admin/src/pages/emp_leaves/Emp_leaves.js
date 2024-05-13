import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useAuthToken } from '../../auth';
import { useNavigate} from "react-router-dom";
import './Emp_leaves.css'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function Emp_leaves() {

  var token = useAuthToken();
  var navigate = useNavigate();
  const[leaveData,setLeaveData] = useState([])
  const [searchText, setSearchText] = useState("");
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    if (token != null) {
      axios.post("http://localhost:5000/leave/get", { token: token }).then((response) => {
        const data = response.data;
        const status = data.status;
        console.log(data)
        if (status === "success") {
          setLeaveData(data.data);
        } else if (status === "token_expired" || status === "auth_failed") {
          navigate("/signout");
        } else {
          const message = data.message;
          alert("Error - " + message);
        }
      }).catch((error) => {
        alert("Error 2 - " + error);
      });
    } else {
      navigate("/signout");
    }
  }, [token, navigate]);

  function searchleaveId() {
    setUpdate(update + 1);
  }

  const generateReport = () => {
    const doc = new jsPDF();
  
    doc.setFillColor(0, 0, 0); // Set background color to yellow
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F'); // Draw rectangle with background color
    doc.setFontSize(20);
    doc.setTextColor(255, 204, 0); // Set font color to red
    doc.text("Salon Natural Bridal", doc.internal.pageSize.getWidth() / 2, 15, 'center');
    // Add title
    doc.setTextColor(0, 0, 0); // Reset font color to black
    doc.setFontSize(16);
    doc.text("Monthly Leave Report", doc.internal.pageSize.getWidth() / 2, 30, 'center');
    doc.text("", 10, 35); // Add line break for space
    
    // Count leaves for each stylist
    const stylistLeaveCount = {};
    leaveData.forEach(leave => {
      const stylistName = `${leave.user.first_name} ${leave.user.last_name}`;
      stylistLeaveCount[stylistName] = (stylistLeaveCount[stylistName] || 0) + 1;
    });
    
    // Create leave report table
    const leaveTable = Object.entries(stylistLeaveCount).map(([stylist, leaves]) => ({ stylist, leaves }));
    
    // Set table styles
    const tableStyles = {
      startY: 45, // Adjust startY to create space
      headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Set header cell background color to black and text color to white
      bodyStyles: { textColor: [0, 0, 0] }, // Set body text color to black
      alternateRowStyles: { fillColor: [242, 242, 242], textColor: [0, 0, 0] } // Set alternate row background color to light gray
    };
    
    // Add leave report table
    doc.autoTable({
      head: [['Stylist Name', 'Number of Leaves']], // Header row
      body: leaveTable.map(({ stylist, leaves }) => [stylist, leaves]), // Body rows
      theme: 'striped', // Set theme to 'striped' for alternate row coloring
      ...tableStyles
    });
    
    // Highlight excessive leave stylists
    const excessiveLeaveStylists = leaveTable.filter(({ leaves }) => leaves > 5);
    excessiveLeaveStylists.forEach(({ stylist }, index) => {
      const rowIndex = index + 1; // Index starts from 0, so add 1 for row number
      doc.setFillColor(255, 0, 0); // Set background color to red for excessive leave stylists
      doc.rect(10, rowIndex * 10 + 45, 190, 10, 'F');
      doc.setTextColor(255, 255, 255); // Set text color to white
      doc.text("Excessive Leave", 105, rowIndex * 10 + 52, { align: "center" });
    });
    
    // Save the PDF
    doc.save('leave_report.pdf');
  };
  
  
  
  
  return (
    <div className="employee-list-container">
      <h1>Manage Employee Leaves</h1>

      <div className='employee-filter-bar'>

        <input className='employee-filter-search' onChange={(e) => setSearchText(e.target.value)} placeholder="Search leave" type="text" />
        <button className='employee-filter-search-btn' onClick={searchleaveId}>Search</button>
        <button className='generate_report_btn' onClick={generateReport}>Generate Report</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
        {leaveData.map((leave) => (
            
          <tr>
            <td>{leave.user.first_name} {leave.user.last_name}</td>
            <td>{leave.item.from_date}</td>
            <td>{leave.item.to_date}</td>
            <td>{leave.item.text}</td>
          </tr>

        ))}

        </tbody>
      
      </table>
    </div>

  );
}

export default Emp_leaves;