import React from 'react';
import { useCookies } from 'react-cookie';

function SupplierDashboard() {
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token', 'supplier_info']);

  const handleLogout = () => {
    // Remove cookies and redirect to login page
    removeCookie('auth_token');
    removeCookie('supplier_info');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="supplier-dashboard-container">
      <h1>Hi, {cookies.supplier_info ? cookies.supplier_info.name : 'Supplier'}!</h1>
      <div className="supplier-details">
        {cookies.supplier_info && (
          <div>
            <h2>Supplier Information</h2>
            <p>Name: {cookies.supplier_info.name}</p>
            <p>Email: {cookies.supplier_info.email}</p>
            <p>Category: {cookies.supplier_info.category}</p>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default SupplierDashboard;