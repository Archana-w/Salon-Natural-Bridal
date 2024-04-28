import React, { useState } from 'react';
import axios from 'axios';
import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";
import './ProductForm.css'

function AddProduct() {

    var token = useAuthToken();
    var navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [weight, setWeight] = useState('');
    const [discount, setDiscount] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("token", token);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('brand', brand);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('weight', weight);
        formData.append('discount', discount);
        formData.append('thumbnail', image);

        if (token != null) {

            axios.post("http://localhost:5000/product/add", formData).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {

                    setSuccessMessage('Product added successfully!');
                    // Clear form fields after successful submission
                    setName('');
                    setDescription('');
                    setCategory('');
                    setBrand('');
                    setPrice('');
                    setQuantity('');
                    setWeight('');
                    setDiscount('');
                    setImage(null);

                } else if (status == "token_expired" || status == "auth_failed") {
                    navigate("/signout");
                } else {
                    var message = data.message;
                    alert("Error - " + message);
                }

            }).catch((error) => {
                alert("Error 2 - " + error);
            });

        } else {
            navigate("/signout");
        }

    };

    return (
        <div class="product-form-container">
            <h2 class="form-heading">Add Product</h2>
            <form class="product-form" onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div>
                    <label>Brand:</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div>
                    <label>Weight:</label>
                    <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div>
                    <label>Discount:</label>
                    <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div>
                    <label>Thumbnail:</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
                </div>
                <button type="submit">Add Product</button>
            </form>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default AddProduct;
