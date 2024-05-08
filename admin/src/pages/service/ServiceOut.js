import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import EditServiceForm from "./EditServiceForm";
import "./serviceOut.css"; // Import the CSS file

function ServiceList() {
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  useEffect(() => {
    axios.get("http://localhost:5000/service")
      .then(response => {
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error("Invalid response data:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const handleEdit = (serviceId) => {
    setEditingServiceId(serviceId);
  };

  const handleUpdate = (updatedService) => {
    axios.put(`http://localhost:5000/service/update/${updatedService._id}`, updatedService)
      .then(response => {
        const updatedServices = services.map(service => {
          if (service._id === updatedService._id) {
            return response.data.service;
          }
          return service;
        });
        setServices(updatedServices);
        setEditingServiceId(null);
      })
      .catch(error => {
        console.error("Error updating service:", error);
        alert("Error updating service");
      });
  };

  const handleCancelEdit = () => {
    setEditingServiceId(null); // Cancel editing by setting editingServiceId to null
  };

  const handleDelete = (serviceId) => {
    setDeletingServiceId(serviceId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:5000/service/delete/${deletingServiceId}`)
      .then(() => {
        const updatedServices = services.filter(service => service._id !== deletingServiceId);
        setServices(updatedServices);
        setDeletingServiceId(null);
        setShowDeleteModal(false);
        alert("Service deleted successfully");
      })
      .catch(error => {
        console.error("Error deleting service:", error);
        alert("Error deleting service");
      });
  };

  const filteredServices = services.filter(service => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      service.sName.toLowerCase().includes(lowerCaseSearchTerm) ||
      service.sType.toLowerCase().includes(lowerCaseSearchTerm) ||
      service.sPrice.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const generatePDFReport = () => {
    const doc = new jsPDF();

    doc.text(20, 10, `Report for Search Term: ${searchTerm}`);

    let yPos = 20;

    doc.text(20, yPos, "Service Type");
    doc.text(60, yPos, "Service Name");
    doc.text(120, yPos, "Price");
    doc.text(160, yPos, "Date");

    yPos += 10;

    filteredServices.forEach((service, index) => {
      const { sType, sName, sPrice, createdAt } = service; // Use createdAt instead of addedDate
      yPos += 10;
      doc.text(20, yPos + index * 10, sType);
      doc.text(60, yPos + index * 10, sName);
      doc.text(120, yPos + index * 10, `LKR: ${sPrice}`);
      doc.text(160, yPos + index * 10, new Date(createdAt).toLocaleDateString()); // Use createdAt here
    });

    doc.save("report.pdf");
  };

  return (
    <div className="container">
      <h2>Service List</h2>

      <div className="input-group">
        <label htmlFor="searchInput">Search:</label>
        <input
          type="text"
          id="searchInput"
          className="search-input"
          placeholder="Search by Service Name, Type, or Price"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button onClick={generatePDFReport} className="btn generate-report-btn">Generate Report</button>

      <table className="table">
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Service Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service._id}>
              <td>{service.sType}</td>
              <td>{service.sName}</td>
              <td>LKR :{service.sPrice}</td>
              <td>{new Date(service.createdAt).toLocaleDateString()}</td> {/* Use createdAt here */}
              <td>{service.sDescription}</td>
              <td>
                <button onClick={() => handleEdit(service._id)} className="btn edit-btn">Edit</button>
                <button onClick={() => handleDelete(service._id)} className="btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <p>Are you sure you want to delete this service?</p>
            <div>
              <button onClick={confirmDelete} className="btn confirm-delete-btn">Confirm Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="btn cancel-delete-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {editingServiceId && (
        <div className="edit-form-modal">
          <div className="edit-form-content">
            <button onClick={handleCancelEdit} className="close-btn">&times;</button>
            <EditServiceForm
              service={services.find(service => service._id === editingServiceId)}
              onUpdate={handleUpdate}
              onCancel={handleCancelEdit} // Pass cancel action function
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceList;
