import { useEffect, useState, useRef } from 'react'
import './Sidebar.css';
import { Link } from 'react-router-dom'



function Sidebar() {

  const [showEmployeeSubMenu, setShowEmployeeSubMenu] = useState(false);
  const employeeSubMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (employeeSubMenuRef.current && !employeeSubMenuRef.current.contains(event.target)) {
        setShowEmployeeSubMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleEmployeeSubMenu = () => {
    setShowEmployeeSubMenu(!showEmployeeSubMenu);
  };

  const hideEmployeeSubMenu = (event) => {
    event.stopPropagation();
    setShowEmployeeSubMenu(false);
  };

  return (


    <div className='sidenav active'>



      <ul>

        <li>
          <Link to='/adminhome'>Admin Dashboard</Link>

        </li>
        <li>
          <div className='employee_div' onClick={toggleEmployeeSubMenu}>
            Employees
            <span className="dropdown-arrow" onClick={hideEmployeeSubMenu}>
              {showEmployeeSubMenu ? "▲" : "▼"}
            </span>
          </div>
          {showEmployeeSubMenu && (
            <ul ref={employeeSubMenuRef} className="dropdown-menu">
              <li>
                <Link to='emp_details'>Employee Details</Link>
              </li>
              <li>
                <Link to='/emp_attendance'>Employee Attendance</Link>
              </li>
              <li>
                <Link to='/emp_salary'>Employee Salary</Link>
              </li>
              <li>
                <Link to='/emp_leaves'>Employee Leaves</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to='/customer'>Customers</Link>

        </li>

        <li>
          <Link to='/appoinment'>Appoinments</Link>

        </li>

        <li>
          <Link to='/payments'>Payments</Link>

        </li>

        <li>
          <Link to='/inventory'>Inventory</Link>

        </li>

        <li>
          <Link to='/service'>Service</Link>

        </li>

        <li>
          <Link to='/customer_affairs'>Customer Affairs</Link>

        </li>

        <li>
          <Link to='/supplier'>Supplier</Link>

        </li>

        <li>
          <Link to='/income_expenses'>Income and expenses</Link>

        </li>

      </ul>


    </div>




  );
}


export default Sidebar;