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
                   
                    alert("Product added successfully!!.")
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
        <div class="PAformout">
            <h2 class="PAtopic">Add Product</h2>
            <form class="PAproductForm" onSubmit={handleSubmit}>
                <div className="PAform-group">
                    <label>Name:</label>
                    <input type="text" class="PAinarea" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="PAform-group">
                    <label>Description:</label>
                    <input type="text" class="PAinarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="PAform-group">
                    <label>Category:</label>
                     <select id="productCategory" class="PAinarea" value={category} onChange={(e) => setCategory(e.target.value)} required>

                     <option>Select Category</option>
                        <option>Hair Care Product</option>
                        <option>Skin Care Product</option>
                        <option>Nail Care Product</option>
                        <option>Lips Care Product</option>

                    </select>
                </div>
                <div className="PAform-group">
                    <label>Brand:</label>
                    <input type="text" class="PAinarea" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
                <div className="PAform-group">
                    <label>Price:</label>
                    <input type="text" class="PAinarea" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="PAform-group">
                    <label>Quantity:</label>
                    <input type="number" class="PAinarea" value={quantity} min="0" step="1" onChange={(e) => setQuantity(e.target.value) } required/>
                </div>
                <div className="PAform-group">
                    <label>Weight:</label>
                    <input type="text" class="PAinarea" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="PAform-group">
                    <label>Discount:</label>
                    <input type="text" class="PAinarea" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div className="PAform-group">
                    <label>Thumbnail:</label>
                    <input type="file" class="PAinarea" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
                </div>
                <button type="submit" class="PAbtn">Add Product</button>
            </form>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default AddProduct;
