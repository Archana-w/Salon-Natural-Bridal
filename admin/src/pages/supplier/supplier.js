// supplier.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './supplier.css';

function Supplier() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderMessages, setOrderMessages] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    contact: '',
    email: '',
    category: '',
    password: '',
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
        user.name.toLowerCase().includes(searchText) ||
        user.address.toLowerCase().includes(searchText) ||
        user.category.toLowerCase().includes(searchText)
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
      } catch (error) {
        console.error('Error deleting supplier:', error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetUserData();
  };

  const handleAddRecord = () => {
    resetUserData();
    setIsModalOpen(true);
  };

  const handleUpdateRecord = (user) => {
    setUserData(user);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData._id) {
      updateUser();
    } else {
      createUser();
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/supplier/update/${userData._id}`,
        userData
      );
      const updatedUsers = users.map((user) =>
        user._id === userData._id ? response.data.supplier : user
      );
      setUsers(updatedUsers);
      setFilterUsers(updatedUsers);
      setIsModalOpen(false);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating supplier:', error);
      setMessage('Error updating supplier. Please try again.');
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/supplier/register', userData);
      const updatedUsers = [...users, response.data.supplier];
      setUsers(updatedUsers);
      setFilterUsers(updatedUsers);
      setIsModalOpen(false);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error adding supplier:', error.message);
      setMessage('Error adding supplier. Please try again.');
    }
  };

  const resetUserData = () => {
    setUserData({
      name: '',
      address: '',
      contact: '',
      email: '',
      category: '',
      password: '',
    });
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const openMessageModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
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
        <button className="btn green" onClick={handleAddRecord}>
          Add Supplier
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Email</th>
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
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.contact}</td>
                <td>{user.email}</td>
                <td>{user.category}</td>
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
                  <button onClick={() => openMessageModal(user._id)} className="btn blue">
                    Order
                  </button>
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
                    setOrderMessages({ ...orderMessages, [selectedUserId]: e.target.value })
                  }
                />
                <button className="btn green" onClick={sendMessage}>
                  Send
                </button>
              </div>
            ) : (
              <>
                <div className="input-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" value={userData.name} onChange={handleData} />
                </div>
                <div className="input-group">
                  <label htmlFor="address">Address:</label>
                  <input type="text" id="address" name="address" value={userData.address} onChange={handleData} />
                </div>
                <div className="input-group">
                  <label htmlFor="contact">Contact:</label>
                  <input type="text" id="contact" name="contact" value={userData.contact} onChange={handleData} />
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
                  <label htmlFor="category">Category:</label>
                  <input type="text" id="category" name="category" value={userData.category} onChange={handleData} />
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
