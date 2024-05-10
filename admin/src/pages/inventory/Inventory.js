import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import './Inventory.css'
 import { useAuthToken } from '../../auth';
import { useNavigate,Link } from "react-router-dom";



function Inventory() {

    const addProduct = () => {
        window.location.href = '/inventory/ProductForm';
      };
      

      var token = useAuthToken();
      var navigate = useNavigate();
      const[productData,setProductData] = useState([]);
      const[filterStatus,setFilterStatus] = useState("all");
      const[searchText,setSearchText] = useState("");
      const[update,setUpdate] = useState(0);
   
      useEffect(() => {
    
         if (token != null) {
   
            axios.post("http://localhost:5000/product/get/all", { token: token, status: filterStatus, search: searchText }).then((response) => {
   
               console.log(response.data);
   
               var data = response.data;
               var status = data.status;
               if (status == "success") {
                  console.log(data.data);
                  setProductData(data.data);
               } else if (status == "token_expired" || status == "auth_failed" || status == "access_denied") {
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
   
      }, [filterStatus,update]);
   
      function searchProductId(){
         setUpdate(update + 1);
      }
   
      function copyProductId(id){
         navigator.clipboard.writeText(id);
         alert("Product id copied!!!");
      }
   
      return (
   
         <div className="product-list-container">
            <h1>Manage Products</h1>
   
            <div className='product-filter-bar'>
               
   
               <input className='product-filter-search' onChange={(e) => setSearchText(e.target.value)} placeholder="Search product" type="text"/>
               <button className='product-filter-search-btn' onClick={searchProductId}>Search</button>
               <Link >
                  <div><button className='product-filter-generate-btn' >Generate Report</button></div>
              </Link>
               <Link to="/inventory/ProductForm">
                  <div><button className='product-filter-add-btn' onClick={addProduct}>Add Product</button></div>
              </Link>
   
            </div>
   
   
            <table>
               <thead>
                  <tr>
                     <th>Product ID</th>
                     <th>Product Name</th>
                      <th>Category</th>
                     <th>Brand</th>
                     <th>Quantity_Available</th>
                     <th>Weight</th>
                     <th>Price</th>
                     <th>Discount</th>
                     <th>Action</th>
                     <th>Action</th> {/* Add a new column for action buttons */}
                  </tr>
               </thead>
               <tbody>
                  {productData.map((product, index) => (
                     <tr key={index}>
                        <td>
                           <div className='product-id-td-container'>
                              {product._id.substring(0, 5)}...
                              <span onClick={() => copyProductId(product._id)} className="material-icons-round">copy</span>
                           </div>
                        </td>
                        <td>{product.product_name}</td>
                         <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>{product.quantity_available}</td>
                        <td>{product.weight}</td>
                        <td>{product.price}</td>
                        <td>{product.discount}</td>
                        <td>
                        <Link to={`/inventory/${product.id}`}>
                           <button className='edt_btn'>Edit</button>
                        </Link>
                        
                     </td>
                     <td>
                        <Link>
                           <button className='delete_btn'>Delete</button>
                        </Link>
                     </td>
                         
                         
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
   
  );
    
     

  
}

export default Inventory;