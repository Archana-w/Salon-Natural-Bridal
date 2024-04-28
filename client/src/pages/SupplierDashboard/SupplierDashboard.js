// SupplierDashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SupplierDashboard({ supplier, onLogout, onUpdate }) {
  const [editableSupplier, setEditableSupplier] = useState({ ...supplier });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditableSupplier(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(editableSupplier);
  };

  return (
    <div className="supplier-dashboard-container">
      <div className="details-container">
        <h2>Welcome, {editableSupplier.name}!</h2>
        <label>Name:</label>
        <input type="text" name="name" value={editableSupplier.name} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={editableSupplier.email} disabled />
        <label>Address:</label>
        <input type="text" name="address" value={editableSupplier.address} onChange={handleChange} />
        <label>Contact:</label>
        <input type="text" name="contact" value={editableSupplier.contact} onChange={handleChange} />
        <label>Category:</label>
        <input type="text" name="category" value={editableSupplier.category} onChange={handleChange} />
        <button onClick={handleUpdate} className="update-btn">Update</button>
        <button onClick={onLogout} className="logout-btn">Logout</button>
        <Link to={`/supplier-orders/${supplier._id}`} className="order-link">View Order Message</Link>
      </div>
    </div>
  );
}

export default SupplierDashboard;
