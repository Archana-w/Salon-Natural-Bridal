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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [timePeriod, setTimePeriod] = useState("");

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

  const generatePDFReport = () => {
    // Calculate start and end dates based on time period
    let reportStartDate = "";
    let reportEndDate = "";
    const today = new Date();
    if (timePeriod === "oneDay") {
      reportStartDate = today.toISOString().split("T")[0];
      reportEndDate = reportStartDate;
    } else if (timePeriod === "oneWeek") {
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      reportStartDate = oneWeekAgo.toISOString().split("T")[0];
      reportEndDate = today.toISOString().split("T")[0];
    } else if (timePeriod === "oneMonth") {
      const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      reportStartDate = oneMonthAgo.toISOString().split("T")[0];
      reportEndDate = today.toISOString().split("T")[0];
    } else if (timePeriod === "threeMonths") {
      const threeMonthsAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
      reportStartDate = threeMonthsAgo.toISOString().split("T")[0];
      reportEndDate = today.toISOString().split("T")[0];
    }

    if (!reportStartDate || !reportEndDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const doc = new jsPDF();

    doc.text(20, 10, `Report from ${reportStartDate} to ${reportEndDate}`);

    let yPos = 20;

    // Add table headers
    doc.text(20, yPos, "Service Type");
    doc.text(60, yPos, "Service Name");
    doc.text(120, yPos, "Price");

    yPos += 10;

    // Add table rows
    services.forEach((service, index) => {
      const { sType, sName, sPrice } = service;
      yPos += 10;
      doc.text(20, yPos + index * 10, sType);
      doc.text(60, yPos + index * 10, sName);
      doc.text(120, yPos + index * 10, `$${sPrice}`);
    });

    doc.save("report.pdf");

    // Reset the timePeriod state after generating the report
    setTimePeriod("");
  };

  const filteredServices = services.filter(service => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      service.sName.toLowerCase().includes(lowerCaseSearchTerm) ||
      service.sType.toLowerCase().includes(lowerCaseSearchTerm) ||
      service.sPrice.toString().toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

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

      <div className="report">
        <h3>Report Generator</h3>
        <div className="date-inputs">
          <div className="input-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="time-period-buttons">
          <button className={`time-period-btn ${timePeriod === "oneDay" ? "active" : ""}`} onClick={() => setTimePeriod("oneDay")}>One Day</button>
          <button className={`time-period-btn ${timePeriod === "oneWeek" ? "active" : ""}`} onClick={() => setTimePeriod("oneWeek")}>One Week</button>
          <button className={`time-period-btn ${timePeriod === "oneMonth" ? "active" : ""}`} onClick={() => setTimePeriod("oneMonth")}>One Month</button>
          <button className={`time-period-btn ${timePeriod === "threeMonths" ? "active" : ""}`} onClick={() => setTimePeriod("threeMonths")}>Three Months</button>
        </div>
        <button onClick={generatePDFReport} className="btn generate-report-btn">Generate Report</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Service Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service._id}>
              <td>{service.sType}</td>
              <td>{service.sName}</td>
              <td>{service.sPrice}</td>
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
            <button onClick={() => setEditingServiceId(null)} className="close-btn">&times;</button>
            <EditServiceForm
              service={services.find(service => service._id === editingServiceId)}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceList;
