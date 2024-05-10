import React, { useState, useEffect } from 'react';
import './serviceNav.css';
import { Link, useLocation } from 'react-router-dom';

const ServiceNavBar = ({ setServiceType }) => {
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;

    switch (pathName) {
      case '/Hair_care':
        setCurrentPage('Hair Care');
        setServiceType('Hair Care');
        break;
      case '/Nail_care':
        setCurrentPage('Nail Care');
        setServiceType('Nail Care');
        break;
      case '/Skin_care':
        setCurrentPage('Skin Care');
        setServiceType('Skin Care');
        break;
      default:
        setCurrentPage('');
        setServiceType(''); // Assuming you want to reset the service type when no specific service is selected
    }
  }, [location, setServiceType]);

  return (
    <div>
      <div className='bar'></div>
      <div className="nav-image">
        <div className="current-page">{currentPage}</div>
        <div className="App">
          <div className="navbar">
            <Link to="/Hair_care" className={currentPage === 'Hair Care' ? 'active' : ''}>
              Hair_Care <hr />
            </Link>
            <Link to="/Nail_care" className={currentPage === 'Nail Care' ? 'active' : ''}>
              Nail_Care <hr />
            </Link>
            <Link to="/Skin_care" className={currentPage === 'Skin Care' ? 'active' : ''}>
              Skin_Care
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceNavBar;
