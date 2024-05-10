import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './supplier.css';
import { useNavigate } from 'react-router-dom'; 

function Supplier() {
    const navigate = useNavigate(); 
    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderMessages, setOrderMessages] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        password: '',
        type: '',
        sup_category: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/supplier/getAll');
            setUsers(response.data);
            setFilterUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearchChange = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredUsers = users.filter(
            (user) =>
                user.first_name.toLowerCase().includes(searchText) ||
                user.last_name.toLowerCase().includes(searchText) ||
                user.sup_category.toLowerCase().includes(searchText)
        );
        setFilterUsers(filteredUsers);
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this supplier?');
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/supplier/delete/${id}`);
                const updatedUsers = users.filter((user) => user._id !== id);
                setUsers(updatedUsers);
                setFilterUsers(updatedUsers);
                setMessage('Supplier deleted successfully.');
            } catch (error) {
                console.error('Error deleting supplier:', error);
                setMessage('Error deleting supplier. Please try again.');
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetUserData();
    };

    const handleAddRecord = () => {
        resetUserData();
        setSelectedUserId(null);
        setIsModalOpen(true);
        // Set type to 'supplier' automatically when adding a new supplier
        setUserData(prevState => ({
            ...prevState,
            type: 'supplier'
        }));
    };
    

    const handleUpdateRecord = (user) => {
        setUserData(user);
        setIsModalOpen(true);
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    const completeUserData = { ...userData, type: 'supplier' };
    if (userData._id) {
        updateUser(completeUserData);
    } else {
        createUser(completeUserData);
    }
};

    const updateUser = async (userData) => {
        try {
            const response = await axios.patch(`http://localhost:5000/supplier/update/${userData._id}`, userData);
            const updatedUsers = users.map((user) => user._id === userData._id ? response.data.supplier : user);
            setUsers(updatedUsers);
            setFilterUsers(updatedUsers);
            setIsModalOpen(false);
            setMessage('Supplier updated successfully.');
        } catch (error) {
            console.error('Error updating supplier:', error);
            setMessage('Error updating supplier. Please try again.');
        }
    };

    const createUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/supplier/register', userData);
            if (response.status === 201) {
                const updatedUsers = [...users, response.data.user];
                setUsers(updatedUsers);
                setFilterUsers(updatedUsers);
                setIsModalOpen(false);
                setMessage('Supplier added successfully.');
            } else {
                setMessage('Failed to add supplier.');
            }
        } catch (error) {
            console.error('Error adding supplier:', error);
            setMessage('Error adding supplier. Please try again.');
        }
    };

    const resetUserData = () => {
        setUserData({
            first_name: '',
            last_name: '',
            mobile_number: '',
            email: '',
            password: '',
            type: '',
            sup_category: '',
        });
    };

    const handleData = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOrderClick = (supplierId) => {
        navigate(`/orders/${supplierId}`);
    };

    const sendMessage = async () => {
        try {
            await axios.post('http://localhost:5000/send-message', {
                userId: selectedUserId,
                message: orderMessages[selectedUserId],
            });
            setMessage('Message sent successfully.');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error sending message:', error.message);
            setMessage('Error sending message. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="input-search">
                <input type="search" placeholder="Search Text Here" onChange={handleSearchChange} />
                <button className="btn green" onClick={handleAddRecord}>Add Supplier</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Order</th>
                    </tr>
                </thead>
                <tbody>
                    {filterUsers.length > 0 ? (
                        filterUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.mobile_number}</td>
                                <td>{user.email}</td>
                                <td>{user.type}</td>
                                <td>{user.sup_category}</td>
                                <td>
                                    <button className="btn green" onClick={() => handleUpdateRecord(user)}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user._id)} className="btn red">
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleOrderClick(user._id)} className="btn blue">Order</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No suppliers found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>{selectedUserId ? 'Send Order Message' : 'Supplier Record'}</h2>
                        {selectedUserId ? (
                            <div className="input-group">
                                <label htmlFor="message">Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={orderMessages[selectedUserId] || ''}
                                    onChange={(e) =>
                                        setOrderMessages({
                                            ...orderMessages,
                                            [selectedUserId]: e.target.value,
                                        })
                                    }
                                />
                                <button className="btn green" onClick={sendMessage}>
                                    Send
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="input-group">
                                    <label htmlFor="first_name">First Name:</label>
                                    <input type="text" id="first_name" name="first_name" value={userData.first_name} onChange={handleData} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="last_name">Last Name:</label>
                                    <input type="text" id="last_name" name="last_name" value={userData.last_name} onChange={handleData} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="mobile_number">Mobile Number:</label>
                                    <input type="text" id="mobile_number" name="mobile_number" value={userData.mobile_number} onChange={handleData} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="text" id="email" name="email" value={userData.email} onChange={handleData} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" name="password" value={userData.password} onChange={handleData} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="type">Type:</label>
                                    <input type="text" id="type" name="type" value={userData.type} onChange={handleData} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="sup_category">Category:</label>
                                    <select id="sup_category" name="sup_category" value={userData.sup_category} onChange={handleData}>
                                        <option value="">Select Category</option>
                                        <option value="Hair Care">Hair Care</option>
                                        <option value="Skin Care">Skin Care</option>
                                        <option value="Nail Care">Nail Care</option>
                                    </select>
                                </div>
                                <button className="btn green" onClick={handleSubmit}>
                                    Save
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
            <div className="message">{message}</div>
        </div>
    );
}

export default Supplier;
