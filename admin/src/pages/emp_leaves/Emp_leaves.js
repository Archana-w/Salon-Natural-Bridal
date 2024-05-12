import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from "react-router-dom";
import './Emp_leaves.css'

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

  return (
    <div className="employee-list-container">
      <h1>Manage Employee Leaves</h1>

      <div className='employee-filter-bar'>

        <input className='employee-filter-search' onChange={(e) => setSearchText(e.target.value)} placeholder="Search leave" type="text" />
        <button className='employee-filter-search-btn' onClick={searchleaveId}>Search</button>

      </div>

      <table>
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
        {leaveData.map((leave) => (
            
          <tr>
            <td>
              <div className='employee-id-td-container'>
              <td>{leave.item._id}</td>
              </div>
            </td>
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