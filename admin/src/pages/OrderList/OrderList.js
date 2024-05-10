import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderList.css';

function OrderList() {
    const [products, setProducts] = useState([]);

    // Replace 'YOUR_SUPPLIER_ID' with the actual supplier ID
    const supplierId = 'YOUR_SUPPLIER_ID';

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/supplier/products/${supplierId}`);
            const productsWithQuantity = response.data.map(product => ({
                ...product,
                orderQuantity: 0
            }));
            setProducts(productsWithQuantity);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    const handleQuantityChange = (index, value) => {
        const newProducts = [...products];
        newProducts[index].orderQuantity = Number(value);
        setProducts(newProducts);
    };

    const handleOrderSubmit = async (product) => {
        try {
            const response = await axios.post('http://localhost:5000/submit-order', {
                supplierId,
                productName: product.productName,
                brandName: product.brandName,
                quantity: product.orderQuantity,
                price: product.price * product.orderQuantity // Calculate total price
            });
            console.log(response.data.message); // Handle successful order submission
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    return (
        <div className="OrderList">
            <h2>Products</h2>
            {products.length > 0 ? (
                <ul className="ProductGrid">
                    {products.map((product, index) => (
                        <li key={index} className="ProductItem">
                            <div className="ProductName">Product Name: {product.productName}</div>
                            <div className="ProductBrand">Brand Name: {product.brandName}</div>
                            <div className="ProductQuantity">Available Quantity: {product.quantity}</div>
                            <div className="ProductPrice">Price: RS/= {product.price}</div>
                            <div className="OrderBox">
                                <input
                                    type="number"
                                    min="1"
                                    max={product.quantity}
                                    value={product.orderQuantity}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                    placeholder="Select quantity"
                                />
                                <div className="TotalPrice">Total: RS/= {(product.price * product.orderQuantity).toFixed(2)}</div>
                                <button onClick={() => handleOrderSubmit(product)}>Place Order</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
}

export default OrderList;