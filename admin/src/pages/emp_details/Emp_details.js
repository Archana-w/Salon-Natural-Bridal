import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from 'react-router-dom';
import './Emp_details.css';

function Emp_details() {
  const token = useAuthToken();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .post('http://localhost:5000/emp/get', { token: token })
        .then((response) => {
          const data = response.data;
          const status = data.status;
          if (status === 'success') {
            setEmployeeData(data.data);
          } else if (status === 'token_expired' || status === 'auth_failed') {
            navigate('/signout');
          } else {
            const message = data.message;
            alert('Error - ' + message);
          }
        })
        .catch((error) => {
          alert('Error 2 - ' + error);
        });
    } else {
      navigate('/signout');
    }
  }, []);

  const handleDelete = (employeeId) => {
    axios
      .post('http://localhost:5000/emp/delete', { token: token, employee_id: employeeId })
      .then((response) => {
        const data = response.data;
        const status = data.status;
        if (status === 'success') {
          // Update the employee list after successful deletion
          setEmployeeData(employeeData.filter((employee) => employee.employee_id !== employeeId));
          alert('Employee deleted successfully.');
        } else {
          const message = data.message;
          alert('Error - ' + message);
        }
      })
      .catch((error) => {
        alert('Error - ' + error);
      });
  };

  return (
    <div className='content'>
      <h2>Manage Employees</h2>
      <input className='search' type='search' placeholder='Search here' />
      <div className='table-container'>
        <table className='employee-table'>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact number</th>
              <th>Job role</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td>{employee.name}</td>
                <td>{employee.address}</td>
                <td>{employee.contact_number}</td>
                <td>{employee.job_role}</td>
                <td>{employee.email}</td>
                <td>{employee.password}</td>
                <td>
                  <Link to={"/emp_add/" + employee.employee_id}><button className='edt_btn'>Edit</button></Link>
                  <button className='delete_btn' onClick={() => handleDelete(employee.employee_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Link to='/emp_add'>
          <button className='add_emp_btn'>Add Employee</button>
        </Link>
      </div>
    </div>
  );
}

export default Emp_details;
