import React, { useState } from "react";
import axios from "axios";
import "./EditServiceForm.css"; // Import your CSS file

function EditServiceForm({ service, onUpdate, onCancel }) {
    const [editedService, setEditedService] = useState(service);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedService({ ...editedService, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/service/update/${editedService._id}`, editedService)
            .then(() => {
                onUpdate(editedService); // Update service in parent component
                alert("Service updated successfully");
            })
            .catch(error => {
                console.error("Error updating service:", error);
                alert("Error updating service");
            });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel(); // Call onCancel function provided by parent component to close the edit form
    };

    return (
        <form onSubmit={handleSubmit} className="edit-service-form">
            <div className="service-form-group">
                <label htmlFor="sType" className="form-label">Service Type</label>
                <input type="text" id="sType" name="sType" className="form-control" value={editedService.sType} onChange={handleChange} />
            </div>
            <div className="service-form-group">
                <label htmlFor="sName" className="form-label">Service Name</label>
                <input type="text" id="sName" name="sName" className="form-control" value={editedService.sName} onChange={handleChange} />
            </div>
            <div className="service-form-group">
                <label htmlFor="sPrice" className="form-label">Price</label>
                <input type="text" id="sPrice" name="sPrice" className="form-control" value={editedService.sPrice} onChange={handleChange} />
            </div>
            <div className="service-form-group">
                <label htmlFor="sDescription" className="form-label">Description</label>
                <textarea id="sDescription" name="sDescription" className="form-control" value={editedService.sDescription} onChange={handleChange} />
            </div>
            <button type="submit" className="service-btn-primary">Update</button>
            <button onClick={handleCancel} className="service-btn-primary">Cancel</button>
        </form>
    );
}

export default EditServiceForm;
