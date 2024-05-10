import React ,{ useEffect, useState } from 'react';
 import {useParams} from  'react-router-dom';
 import axios from 'axios';
import '../../pages/store/ProductDetails.css'


function ProductDetails(){
      // State variables to store form data
      const [productName, setProductName] = useState('');
      const [productQuantity, setProductQuantity] = useState('');
      const [productPrice, setProductPrice] = useState('');
      const [productCategory, setProductCategory] = useState('');
  
      // Function to handle form submission
      const handleSubmit = (event) => {
          event.preventDefault();
  
          // You can perform further actions with the form data here
          console.log("Form submitted!");
          console.log("Product Name:", productName);
          console.log("Product Quantity:", productQuantity);
          console.log("Product Price:", productPrice);
          console.log("Product Category:", productCategory);
  
          // Reset form fields after submission
          setProductName('');
          setProductQuantity('');
          setProductPrice('');
          setProductCategory('');
      };
  
      return (
        <div class="Pimage">
        <div class="Pformout">
        <h1 class="Ptopic"> Place Order Product</h1>

          <form id="PproductForm" onSubmit={handleSubmit}>
              <div className="Pform-group">
                  <label for ="productName">Name:</label>
                  <input type="text" class="Pinarea" id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
              </div>
              <div className="Pform-group">
                  <label for="productQuantity">Quantity:</label>
                  <input type="number" class="Pinarea" id="productQuantity" name="productQuantity" min="0" step="1" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} required />
              </div>
              <div className="Pform-group">
                  <label for="productPrice">Price:</label>
                  <input type="number" class="Pinarea" id="productPrice" name="productPrice" min="0" step="0.1" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
              </div>
              <div className="Pform-group">
                  <label for="productCategory">Category:</label>
                  <select id="productCategory" class="Pinarea" name="productCategory" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required>
                      <option value="">Select Category</option>
                      <option value="hair">Hair care Products</option>
                      <option value="skin">Skin Care Products</option>
                      <option value="lips">Lips Care Products</option>
                      {/* Add more options as needed */}
                  </select>
              </div>
              <br />
              <div className="Pform-group">
                  <button type="submit" class="Pbtn" >Save</button><br /><br />
              </div>
          </form>
          </div>
          </div>
      );
  };


export default ProductDetails;
 