
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import './Inventory.css'
 import { useAuthToken } from '../../auth';
import { useNavigate,Link } from "react-router-dom";
import { jsPDF } from "jspdf";

function Inventory() {

   const addProduct = () => {
        window.location.href = '/inventory/ProductForm';
   };


      var token = useAuthToken();
      var navigate = useNavigate();
      const[productData,setProductData] = useState([]);
      const[searchText,setSearchText] = useState("");
      const[update,setUpdate] = useState(0);

   const deleteProduct = (id) => {

         if (token != null) {
   
            axios.post("http://localhost:5000/product/delete", { token: token, product_id:id }).then((response) => {
   
               console.log(response.data);
   
               var data = response.data;
               var status = data.status;
               if (status == "success") {
                  alert("Product deleted Successfully!!..");
                  setUpdate(update+1);
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

   };

   const generateReport = () => {
         const doc = new jsPDF();
         doc.text("Product Report", 10, 10);
         doc.text("All Available Products in the store : ", 10, 18);

        
         // Add header
      const header = [['Product Name', 'Category', 'Brand', 'Quantity Available', 'Price']];
    
         // Add some sample data (replace with your actual product data)
      const data = [];

        // Populate data array with product data
        productData.forEach(product => {
            data.push([
                product.product_name,
                product.category,
                product.brand,
                product.quantity_available,
                product.price,
                 
            ]);
         });

         // Set table style
         const styles = {
               fontSize: 10,
               cellPadding: 2
            
         };

         // Set table column widths
         const columnWidths = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto' ];

         // Auto-generate table
         doc.autoTable({
            head: header,
            body: data,
            startY: 20, // Start y-position of the table
            styles: styles,
            columnStyles: {
             0: { fontStyle: 'bold' } // Make the first column bold
            },
            columnWidth: columnWidths,
            margin: { top: 30 } // Add margin between header and table
         });  
         
         const categoryCounts = {
            'Hair Care Product': 0,
            'Skin Care Product': 0,
            'Nail Care Product': 0,
            'Lips Care Product': 0
        };
         
         // Count products for each category
         productData.forEach(product => {
         categoryCounts[product.category] += 1;
         });
 
         const lowQuantityProducts = productData.filter(product => product.quantity_available < 10);
         doc.text("Lowest Products in Inventory:", 10, doc.autoTable.previous.finalY + 15);
         doc.autoTable({
             startY: doc.autoTable.previous.finalY + 20,
             head: [['Product Name', 'Product Brand','Available Quantity']],
             body: lowQuantityProducts.map(product => [product.product_name,product.brand, product.quantity_available])
         });
         
      
         
         doc.text("Categorized the  Products:", 10, doc.autoTable.previous.finalY + 15);
         doc.autoTable({
         startY: doc.autoTable.previous.finalY + 20,
         head: [['Category', 'Number of Products']],
         body: Object.entries(categoryCounts),
      });
    
            
            doc.save("Product Report.pdf"); // Save the PDF
             
   };

      useEffect(() => {
    
         if (token != null) {
   
            axios.post("http://localhost:5000/product/admin_get", { token: token }).then((response) => {
   
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
   
      }, [update]);
   
      function searchProductId(){
         // Filter productData based on searchText
    const filteredProducts = productData.filter(product => {
      // Convert both product name and search text to lowercase for case-insensitive search
      return product.product_name.toLowerCase().includes(searchText.toLowerCase());
   });

  // Update productData state with filtered products
  setProductData(filteredProducts);
      }
   
      function copyProductId(id){
         navigator.clipboard.writeText(id);
         alert("Product id copied!!!");
      }
   
      return (
   
         <div className="product-list-container">
            <h1>Manage Products</h1>
   
            <div className='product-filter-bar'>
               
   
               <input className='product-filter-search' value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search product" type="text"/>
               <button className='product-filter-search-btn' onClick={searchProductId}>Search</button>
               <div class = "Isquare">
               <Link to="/inventory/ProductForm">
                  <div><button className='product-filter-add-btn' onClick={addProduct}>Add Product</button></div>
              </Link>

              <Link >
                  <div><button className='product-filter-generate-btn' onClick={generateReport}>Generate Report</button></div>
              </Link>
              </div>
   
            </div>
   
   
            <table>
               <thead>
                  <tr>
                     <th>Product ID</th>
                     <th>Product Name</th>
                      <th>Category</th>
                     <th>Brand</th>
                     <th>Quantity</th>
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
                        <td>{product.weight} g</td>
                        <td>Rs.{product.price}.00</td>
                        <td>Rs.{product.discount}.00</td>
                        <td>
                        <Link to={`/editProduct/${product._id}`}>
                           <button className='edt_btn'>Edit</button>
                        </Link>
                        
                     </td>
                     <td>
                        <Link>
                           <button className='delete_btn' onClick={()=>deleteProduct(product._id)}>Delete</button>
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
