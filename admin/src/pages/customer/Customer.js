import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customer.css';
import { useAuthToken } from '../../auth';
import { useNavigate} from "react-router-dom";

function Customer() {
    const token = useAuthToken();
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState({ field: "", order: "asc" });
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        if (token) {
            axios.post("http://localhost:5000/user/get", { token })
                .then((response) => {
                    const data = response.data;
                    if (data.status === "success") {
                        setCustomerData(data.data);
                    } else if (data.status === "token_expired" || data.status === "auth_failed") {
                        navigate("/signout");
                    } else {
                        alert("Error - " + data.message);
                    }
                })
                .catch((error) => {
                    alert("Error - " + error);
                });
        } else {
            navigate("/signout");
        }
    }, [token, navigate]);




    function searchCustomerId() {
        setUpdate(update + 1);
    }

    function copyCustomerId(id) {
        navigator.clipboard.writeText(id);
        alert("Customer id copied!!!");
    }

    function handleSort(field) {
        const sortOrder = sortBy.field === field && sortBy.order === "asc" ? "desc" : "asc";
        setSortBy({ field, order: sortOrder });
    }

    // Sorting function
    const sortedData = [...customerData].sort((a, b) => {
        const aValue = a[sortBy.field] || ""; // Default to an empty string if property is undefined
        const bValue = b[sortBy.field] || ""; // Default to an empty string if property is undefined

        if (sortBy.order === "asc") {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });

    // Filter customer data based on searchText
    const filteredCustomers = sortedData.filter(customer =>
        customer.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.mobile_number.includes(searchText) ||
        customer.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="customer-list-container">
            <h1>Manage Customers</h1>
            <div className='customer-filter-bar'>
                <input
                    className='customer-filter-search'
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search customer"
                    type="text"
                />
                <button className='customer-filter-search-btn' onClick={searchCustomerId}>Search</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('_id')}>Customer ID</th>
                        <th onClick={() => handleSort('first_name')}>Name</th>
                        <th onClick={() => handleSort('mobile_number')}>Contact number</th>
                        <th onClick={() => handleSort('email')}>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer, index) => (
                        <tr key={index}>
                            <td>
                                <div className='customer-id-td-container'>
                                    {customer._id.substring(0, 5)}...
                                    <span onClick={() => copyCustomerId(customer._id)} className="material-icons-round">copy</span>
                                </div>
                            </td>
                            <td>{customer.first_name + " " + customer.last_name}</td>
                            <td>{customer.mobile_number}</td>
                            <td>{customer.email}</td>
                            <td>{'*'.repeat(customer.password.length)}</td>
                             
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Customer;
