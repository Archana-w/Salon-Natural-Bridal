import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
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
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('brand', brand);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('weight', weight);
        formData.append('discount', discount);
        formData.append('thumbnail', image);

        try {
            await axios.post('http://localhost:5000/products/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
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
        } catch (error) {
            setError('Error adding product. Please try again later.');
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
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
