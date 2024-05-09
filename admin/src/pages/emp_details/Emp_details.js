import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Emp_details.css'
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from "react-router-dom";

function Emp_details() {

  var token = useAuthToken();
  var navigate = useNavigate();
  const [EmployeeData, setEmployeeData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [update, setUpdate] = useState(0);

  useEffect(() => {

    if (token != null) {
      axios.post("http://localhost:5000/emp/get", { token: token }).then((response) => {
        var data = response.data;
        var status = data.status;
        if (status === "success") {
          setEmployeeData(data.data);
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

  function searchemployeeId() {
    setUpdate(update + 1);
  }

  function copyEmployeeIId(id) {
    navigator.clipboard.writeText(id);
    alert("Employee id copied!!!");
  }

  return (
    <div className="employee-list-container">
      <h1>Manage Employees</h1>
      <div className='employee-filter-bar'>
        <input className='employee-filter-search' onChange={(e) => setSearchText(e.target.value)} placeholder="Search employee" type="text" />
        <button className='employee-filter-search-btn' onClick={searchemployeeId}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Contact number</th>
            <th>Email</th>
            <th>Job role</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {EmployeeData.map((employee, index) => (
            <tr key={index}>
              <td>
                <div className='employee-id-td-container'>
                  {index + 1}
                  <span onClick={() => copyEmployeeIId(employee.id)} className="material-icons-round">copy</span>
                </div>
              </td>
              <td>{employee.name}</td>
              <td>{employee.contact_number}</td>
              <td>{employee.email}</td>
              <td>{employee.job_role}</td>
              <td>{employee.password}</td>
              <td>
                <Link to={`/edit/${employee.id}`}>
                  <button className='edt_btn'>Edit</button>
                </Link>
              </td>
              <td>
                <Link to={`/delete/${employee.id}`}>
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

export default Emp_details;