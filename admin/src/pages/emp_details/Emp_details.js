import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Emp_details.css'
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from "react-router-dom";

function Emp_details() {

  var token = useAuthToken();
  var navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [update, setUpdate] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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
  }, [update]);

  const sortTable = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...employeeData].sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      if (sortConfig.direction === 'desc') {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
      return null;
    });
    return sorted;
  };

  const filteredData = () => {
    if (searchText === "") {
      return sortedData();
    } else {
      return sortedData().filter(employee =>
        employee.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  };

  return (
    <div className="employee-list-container">
      <h1>Manage Employees</h1>
      <div className='employee-filter-bar'>
        <input className='employee-filter-search' onChange={(e) => setSearchText(e.target.value)} placeholder="Search employee" type="text" />
        <button className='employee-filter-search-btn' onClick={() => setUpdate(update + 1)}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortTable('id')}>Employee ID</th>
            <th onClick={() => sortTable('name')}>Name</th>
            <th onClick={() => sortTable('contact_number')}>Contact number</th>
            <th onClick={() => sortTable('email')}>Email</th>
            <th onClick={() => sortTable('job_role')}>Job role</th>
            <th onClick={() => sortTable('password')}>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData().map((employee, index) => (
            <tr key={index}>
              <td>
                <div className='employee-id-td-container'>
                  {index + 1}
                  <span onClick={() => navigator.clipboard.writeText(employee.employee_id)} className="material-icons-round">copy</span>
                </div>
              </td>
              <td>{employee.name}</td>
              <td>{employee.contact_number}</td>
              <td>{employee.email}</td>
              <td>{employee.job_role}</td>
              <td>{employee.password}</td>
              <td>
                <Link to={`/edit/${employee.employee_id}`}>
                  <button className='edt_btn'>Edit</button>
                </Link>
              </td>
              <td>
                <Link to={`/delete/${employee.employee_id}`}>
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
