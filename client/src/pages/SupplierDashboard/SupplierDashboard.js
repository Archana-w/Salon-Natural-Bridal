import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthToken } from '../../auth';

function SupplierDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = useAuthToken();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        console.log(token);

        axios.post("http://localhost:5000/user/profile", {token:token})
        .then(response => {
            console.log("Res - "+response.data);
            setUser(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            setError("Error - " + (error.response?.data?.message || error.message));
            setLoading(false);
        });
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!user) {
        return <div>No user data available.</div>;
    }
    return (
        <div className="supplier-details">
            <h1>Supplier Details</h1>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile Number:</strong> {user.mobile_number}</p>
        </div>
    );
}

export default SupplierDashboard;