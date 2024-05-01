import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { Divider, Table } from 'antd';
import './Inventory.css'
import Link from 'antd/es/typography/Link';



function Inventory() {

    const addProduct = () => {
        window.location.href = '/inventory/ProductForm';
      };
      
   


  return (
<div className='content'>
      <h2>Manage Products</h2>
      <input className='search' type="search" placeholder="Search here" />
      <h3>Products details</h3>
      <table className='product-table'>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Weight</th>
            <th>Discount</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
         
      </table>
      <Link to="/inventory/ProductForm">
      <div><button className='add_emp_btn' onClick={addProduct}>Add Product</button></div>
      </Link>
    </div>
 

  );
    
     

  
}

export default Inventory;