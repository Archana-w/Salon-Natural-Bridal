import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customer.css'
import { useAuthToken } from '../../auth';
import { useNavigate, Link } from "react-router-dom";


function Customer() {


   var token = useAuthToken();
   var navigate = useNavigate();
   const [CustomerData, setCustomerData] = useState([]);
   const [searchText, setSearchText] = useState("");
   const [update, setUpdate] = useState(0);



   useEffect(() => {

      if (token != null) {

         axios.post("http://localhost:5000/user/get", { token: token }).then((response) => {

            var data = response.data;

            console.log(data);

            var status = data.status;
            if (status == "success") {
               setCustomerData(data.data);
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

   }, []);

   function searchCustomerId() {
      setUpdate(update + 1);
   }

   function copyCustomerId(id) {
      navigator.clipboard.writeText(id);
      alert("Customer id copied!!!");
   }

   return (

      <div className="customer-list-container">
         <h1>Manage Customers</h1>

         <div className='customer-filter-bar'>

            <input className='customer-filter-search' onChange={(e) => setSearchText(e.target.value)} placeholder="Search customer" type="text" />
            <button className='customer-filter-search-btn' onClick={searchCustomerId}>Search</button>

         </div>

         <table>
            <thead>
               <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Contact number</th>
                  <th>Email</th>
                  <th>password</th>
                  <th>Edit</th> {/* Add a new column for action buttons */}
                  <th>Delete</th> {/* Add a new column for action buttons */}
               </tr>
            </thead>
            <tbody>
               {CustomerData.map((customer, index) => (
                  <tr>
                     <td>
                        <div className='customer-id-td-container'>
                           {customer._id.substring(0, 5)}...
                           <span onClick={() => copyCustomerId(customer._id)} className="material-icons-round">copy</span>
                        </div>
                     </td>
                     <td>{customer.first_name + " " + customer.last_name}</td>
                     <td>{customer.mobile_number}</td>
                     <td>{customer.email}</td>
                     <td>{customer.password}</td>

                     <td>
                        <Link>
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

export default Customer;