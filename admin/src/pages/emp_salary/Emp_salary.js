import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from "react-router-dom";
import './Emp_salary.css'



function Emp_salary() {

  var token = useAuthToken();
  var navigate = useNavigate();
  const [SalaryData, setsalaryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [update, setUpdate] = useState(0);




  function searchsalaryId() {
    setUpdate(update + 1);
  }



  return (
    <div className="employee-list-container">
      <h1>Manage Employee Salary</h1>

      <div className='employee-filter-bar'>

        <input className='employee-filter-search' onChange={(e) => setSearchText(e.target.value)} placeholder="Search salary" type="text" />
        <button className='employee-filter-search-btn' onClick={searchsalaryId}>Search</button>
        <button className='salary_btn'>Generate Report</button>

      </div>

      <table>
        <thead>
          <tr>
            <th>Salary ID</th>
            <th>Basic Salary</th>
            <th>OT Hours</th>
            <th>Total Salary</th>
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




export default Emp_salary;