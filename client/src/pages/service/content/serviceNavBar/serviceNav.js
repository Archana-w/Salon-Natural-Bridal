import React, { useState, useEffect } from 'react';
import './serviceNav.css';
import { Link, useLocation } from 'react-router-dom';

const ServiceNavBar = (props) => {
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();
  //const banner = props.banner;

  useEffect(() => {
    const pathName = location.pathname;
    
    switch (pathName) {
      case '/Hair_care':
        setCurrentPage('Hair Care');
        break;
      case '/Nail_care':
        setCurrentPage('Nail Care');
        break;
      case '/Skin_care':
        setCurrentPage('Skin Care');
        break;
      default:
        setCurrentPage('');
    }
  }, [location]);

  return (
    <div>
      <div className="nav-image" >
        <div className="current-page">{currentPage}</div>
        <div className="App">
          <div className="navbar">
            <Link 
              to="/Hair_care" 
              className={currentPage === 'Hair Care' ? 'active' : ''} 
              onClick={() => setCurrentPage('Hair Care')}>
              Hair_Care <hr />
            </Link>
            <Link 
              to="/Nail_care" 
              className={currentPage === 'Nail Care' ? 'active' : ''} 
              onClick={() => setCurrentPage('Nail Care')}>
              Nail_Care <hr />
            </Link>
            <Link 
              to="/Skin_care" 
              className={currentPage === 'Skin Care' ? 'active' : ''} 
              onClick={() => setCurrentPage('Skin Care')}>
              Skin_Care
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceNavBar;
