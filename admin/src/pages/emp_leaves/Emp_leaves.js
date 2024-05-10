import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from "react-router-dom";
import './Emp_leaves.css'



function Emp_leaves() {


  var token = useAuthToken();
  var navigate = useNavigate();
  const [LeaveyData, setleaveData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [update, setUpdate] = useState(0);

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

          <tr>
            <td>
              <div className='employee-id-td-container'>

              </div>
            </td>
            <td>{ }</td>
            <td>{ }</td>
            <td>{ }</td>
            <td>{ }</td>
          </tr>


        </tbody>
      </table>
    </div>

  );
}

export default Emp_leaves;