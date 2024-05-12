import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Emp_details.css'
import { useNavigate, Link } from "react-router-dom";
import { useAuthToken } from '../../auth';

function Emp_details() {

  const token = useAuthToken();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [update, setUpdate] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    if (token != null) {
      axios.post("http://localhost:5000/emp/get", { token: token }).then((response) => {
        const data = response.data;
        const status = data.status;
        console.log(data)
        if (status === "success") {
          setEmployeeData(data.data);
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
  }, [token, update, navigate]);
  

  //delete
  const deleteEmp = (id) => {

    if (token != null) {

       axios.post("http://localhost:5000/emp/delete", { token: token,employee_id: id}).then((response) => {

         var data = response.data;
          var status = data.status;

          console.log(response.data);
          if (status == "success") {
             alert("Employee deleted Successfully!!..");
             setUpdate(update+1);
          } else if (status == "token_expired" || status == "auth_failed" || status == "access_denied") {
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

 };


  const sortTable = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (!sortConfig || !sortConfig.key) return employeeData;

    const sorted = [...employeeData].sort((a, b) => {
      const keyA = sortConfig.key === 'name' ? a.name : a.job_role;
      const keyB = sortConfig.key === 'name' ? b.name : b.job_role;
      if (sortConfig.direction === 'asc') {
        return keyA.localeCompare(keyB);
      }
      if (sortConfig.direction === 'desc') {
        return keyB.localeCompare(keyA);
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
        <div className='emp_add'>
          <Link to="/emp_add" className='emplink'>
            <div><button className='emp_btn_add'>Add Employee</button></div>
          </Link>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortTable('name')}>Name</th>
            <th onClick={() => sortTable('job_role')}>Job role</th>
            <th>Contact number</th>
            <th>Email</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData().map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.job_role}</td>
              <td>{employee.contact_number}</td>
              <td>{employee.email}</td>
              <td>{employee.password}</td>
              <td>
                <Link to={`/edit/${employee.employee_id}`}>
                  <button className='edt_btn'>Edit</button>
                </Link>
              </td>
              <td>
                <button className='delete_btn' onClick={()=>deleteEmp(employee.employee_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Emp_details;