import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthToken } from '../../auth';
import { Form, Input, Button, Alert } from 'antd';
import './SupplierDashboard.css';

function SupplierDashboard() {
    const [user, setUser] = useState(null);
    const [supplier, setSupplier] = useState({});
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = useAuthToken();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        axios.post("http://localhost:5000/user/profile", { token: token })
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Error - " + (error.response?.data?.message || error.message));
                setLoading(false);
            });
    }, [navigate, token]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!user) {
        return <div>No user data available.</div>;
    }

    const handleUpdateSupplier = async () => {
        try {
            const response = await axios.patch(`http://localhost:5000/supplier/update/${supplier._id}`, formData);
            setSupplier(response.data.supplier);
            setSuccess('Supplier updated successfully');
        } catch (error) {
            setError('Error updating supplier: ' + error.message);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="supplier-dashboard">
            <div>
                <h1>Hi ! {user.first_name} {user.last_name}</h1>
                {error && (
                    <Alert message={error} type="error" showIcon closable onClose={() => setError(null)} />
                )}
                {success && (
                    <Alert message={success} type="success" showIcon closable onClose={() => setSuccess(null)} />
                )}
                <Form layout="vertical">
                    <Form.Item label="First Name:">
                        <Input name="name" value={user.first_name} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Last Name:">
                        <Input name="address" value={user.last_name} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Mobile Number:">
                        <Input name="contact" value={user.mobile_number} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input name="email" value={user.email} disabled />
                    </Form.Item>
                    <Form.Item label="Category">
                        <Input name="category" value={user.sup_category} onChange={handleInputChange} />
                    </Form.Item>
                    <Button className="update-button" onClick={handleUpdateSupplier}>Update</Button>
                    <Button className="logout-button" onClick={handleLogout}>Logout</Button>
                    <Button className="details-button" onClick={() => navigate('/supplier-order')}>View Order Details</Button>
                </Form>
            </div>
        </div>
    );
}

export default SupplierDashboard;