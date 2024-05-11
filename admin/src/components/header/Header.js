import { useEffect, useState } from 'react'
import './Header.css';
import { useNavigate } from 'react-router-dom';
import logosalon from '../../images/logo.png'


function Header() {

  var menu = [
    {
      name: "Admin Dashboard",
      icon: "home",
      navigate: "adminhome",
    },
    {
      name: "Employees",
      icon: "person",
      sub_menu: [
        { name: "Employee Details", navigate: "emp_details" },
        { name: "Employee Attendance", navigate: "emp_attendance" },
        { name: "Employee Salary", navigate: "emp_salary" },
        { name: "Salary Details", navigate: "salary" },
        { name: "Employee Leaves", navigate: "emp_leaves" }
      ]
    },
    {
      name: "Customers",
      icon: "home",
      navigate: "customer",
    },
    {
      name: "Appoinments",
      icon: "home",
      navigate: "appointment",
    },
    {
      name: "Orders",
      icon: "shopping_cart",
      navigate: "orders",
    },
    {
      name: "Inventory",
      icon: "home",
      navigate: "inventory",
    },
    {
      name: "Service",
      icon: "home",
      navigate: "service",
      sub_menu: [
        { name: "Service View", navigate: "service_view" },
        { name: "Add Service", navigate: "add_service" },
      ]
    },
    {
      name: "Customer Affairs",
      icon: "home",
      navigate: "customer_affairs",
      sub_menu: [
        { name: "Feedback View", navigate: "feedback_home" },
      ]
    },
    {
      name: "Supplier",
      icon: "home",
      navigate: "supplier",
    },
    {
      name: "Income Expenses",
      icon: "home",
      navigate: "income_expenses",
    }
  ];

  const[openNavMenu,setOpenNavMenu] = useState(false);
  var navigate = useNavigate();

  function onMenuClick(id) {
    if (id != undefined) {
      navigate(id);
    }
  }

  function onSubMenuClick(id) {
    if (id != undefined) {
      navigate(id);
    }
  }

  useEffect(() => {
    var sidenavOut = document.getElementById('sidenavOut');
    var sidenav = document.getElementById('sidenav');
    if (openNavMenu) {
      sidenavOut.style.display = "block";
      sidenav.style.marginLeft = "0";
    } else {
      sidenavOut.style.display = "none";
      sidenav.style.marginLeft = "-250px";
    }
  });

  return (

    <>

      <div className='header'>
        <div className='header-container'>

          <div onClick={() => setOpenNavMenu(true)} className='nav-menu-btn'>
            <span className="material-icons-round">menu</span>
          </div>

          <div className='headerLogo'>
            <img src={logosalon} alt='logo' className='logosalon' />
          </div>


        </div>
      </div>

      <div onClick={() => { setOpenNavMenu(false) }} id='sidenavOut' className='sidenav-out'></div>
      <div id='sidenav' className="sidenav">
        <div className='sidenav-container'>

          {menu.map((item) =>

            <div key={item.name} className='sidenav-item'>
              <div onClick={() => onMenuClick(item.navigate)} className='sidenav-item-main'>
                <div className='sidenav-item-container'>
                  <span className="material-icons-round">{item.icon}</span>
                  <p>{item.name}</p>
                </div>
              </div>

              {(item.sub_menu != undefined) ? (

                <div className='sidenav-sub-item-container'>

                  {item.sub_menu.map((submenu) =>

                    <div onClick={() => onSubMenuClick(submenu.navigate)} key={submenu.name} className='sidenav-item-sub-main'>
                      <p>{submenu.name}</p>
                    </div>

                  )}

                </div>

              ) : ("")}


            </div>

          )}



        </div>
      </div>

    </>


  );
}

export default Header;