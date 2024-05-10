import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthToken } from '../../auth';
import { useNavigate } from "react-router-dom";
import './EditProduct.css';

function EditProduct() {
    const token = useAuthToken();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [weight, setWeight] = useState('');
    const [discount, setDiscount] = useState('');
    const [image, setImage] = useState(null);
    const[product,setProduct] = useState('');
     
    
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch product details from the backend when the component mounts
        axios.get("http://localhost:5000/product/{productId}",  )
            .then(response => {
                const data = response.data;
                
            })
            .catch(error => {
                // Handle error
                console.error("Error fetching product details:", error);
                setError("Error fetching product details. Please try again later.");
            });
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for update request
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('category', product.category);
        formData.append('brand', product.brand);
        formData.append('price', product.price);
        formData.append('quantity', product.quantity);
        formData.append('weight', product.weight);
        formData.append('discount', product.discount);
        formData.append('thumbnail', product.image);

        // Send PUT request to update product details
        axios.put("http://localhost:5000/product/{productId}", formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const data = response.data;
                if (data.status === "success") {
                    setSuccessMessage('Product updated successfully!');
                } else {
                    setError(data.message);
                }
            })
            .catch(error => {
                console.error("Error updating product:", error);
                setError("Error updating product. Please try again later.");
            });
    };

    return (
        <div className="PEformout">
            <h2 className="PEtopic">Edit Product</h2>
            <form className="PEproductForm" onSubmit={handleSubmit}>
            <div className="PEform-group">
                    <label>Name:</label>
                    <input type="text" class="PEinarea" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="PEform-group">
                    <label>Description:</label>
                    <input type="text" class="PEinarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="PAform-group">
                    <label>Category:</label>
                     <select id="productCategory" class="PEinarea" value={category} onChange={(e) => setCategory(e.target.value)} required>

                     <option>Select Category</option>
                        <option>Hair Care Product</option>
                        <option>Skin Care Product</option>
                        <option>Nail Care Product</option>
                        <option>Lips Care Product</option>

                    </select>
                </div>
                <div className="PAform-group">
                    <label>Brand:</label>
                    <input type="text" class="PEinarea" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
                <div className="PAform-group">
                    <label>Price:</label>
                    <input type="text" class="PEinarea" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="PAform-group">
                    <label>Quantity:</label>
                    <input type="number" class="PEinarea" value={quantity} min="0" step="1" onChange={(e) => setQuantity(e.target.value) } required/>
                </div>
                <div className="PAform-group">
                    <label>Weight:</label>
                    <input type="text" class="PEinarea" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="PAform-group">
                    <label>Discount:</label>
                    <input type="text" class="PEinarea" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div className="PAform-group">
                    <label>Thumbnail:</label>
                    <input type="file" class="PEinarea" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
                </div>
                <button type="submit" className="PEbtn">Update Product</button>
            </form>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default EditProduct;
