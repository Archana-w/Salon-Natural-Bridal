import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import EditServiceForm from "./EditServiceForm";

function ServiceList() {
    const [services, setServices] = useState([]);
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [deletingServiceId, setDeletingServiceId] = useState(null);
    const [reportData, setReportData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/service")
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error("Error fetching services:", error);
            });

        axios.get("http://localhost:5000/report")
            .then(response => {
                setReportData(response.data);
            })
            .catch(error => {
                console.error("Error fetching report data:", error);
            });
    }, []);

    const handleEdit = (serviceId) => {
        setEditingServiceId(serviceId);
        setShowEditForm(true);
        setShowDeleteModal(false);
    };

    const handleUpdate = (updatedService) => {
        const updatedServices = services.map(service => {
            if (service._id === updatedService._id) {
                return updatedService;
            }
            return service;
        });
        setServices(updatedServices);
        setEditingServiceId(null);
        setShowEditForm(false);
    };

    const handleDelete = (serviceId) => {
        setDeletingServiceId(serviceId);
        setShowDeleteModal(true);
        setShowEditForm(false);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:5000/service/${deletingServiceId}`)
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
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const doc = new jsPDF();

        doc.text(20, 10, `Report from ${startDate} to ${endDate}`);

        let yPos = 20;

        reportData.forEach((item, index) => {
            doc.text(20, yPos + index * 10, `${item.name}: ${item.value}`);
        });

        doc.save("report.pdf");
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

            <div className="search">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by Service Name, Type, or Price" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="report">
                <h3>Report Generat</h3>
                <div className="mb-3">
                <label htmlFor="startDate">Start Date:</label>
                <input 
                    type="date" 
                    id="startDate" 
                    className="form-control" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="endDate">End Date:</label>
                <input 
                    type="date" 
                    id="endDate" 
                    className="form-control" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
                <button onClick={generatePDFReport} className="btn btn-primary">Generate monthly Report</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Service Type</th>
                        <th>Service Name</th>
                        <th>Price</th>
                        <th>Employee Name</th>
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
                            <td>{service.sEmpName}</td>
                            <td>{service.sDescription}</td>
                            <td>
                                <button onClick={() => handleEdit(service._id)} className="btn btn-primary">Edit</button>
                                <button onClick={() => handleDelete(service._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditForm && (
                <div className="edit-form-modal">
                    <div className="edit-form-content">
                        <button onClick={() => setShowEditForm(false)} className="close-btn">&times;</button>
                        <EditServiceForm 
                            service={services.find(service => service._id === editingServiceId)} 
                            onUpdate={handleUpdate} 
                        />
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="delete-modal">
                    <div className="delete-modal-content">
                        <p>Are you sure you want to delete this service?</p>
                        <div>
                            <button onClick={confirmDelete} className="btn btn-danger">Confirm Delete</button>
                            <button onClick={() => setShowDeleteModal(false)} className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ServiceList;
