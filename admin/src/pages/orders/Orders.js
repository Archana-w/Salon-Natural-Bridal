import './Orders.css';
import { useEffect, useState } from 'react';
import { useAuthToken } from '../../auth';
import { useNavigate,Link } from "react-router-dom";


function Orders() {

   var token = useAuthToken();
   var navigate = useNavigate();

   useEffect(() => {

      /*
      if (token != null) {

         axios.post("http://localhost:5000/emp/get", { token: token }).then((response) => {

            var data = response.data;
            var status = data.status;
            if (status == "success") {
               setEmployeeData(data.data);
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
      */

   });

   const orders = [
      {
         orderId: 12345,
         date: '2024-04-26',
         total: '$100.00',
         paymentMethod: 'Credit Card',
         paymentStatus: 'Paid',
         orderStatus: 'Shipped'
      }
   ];

   return (

      <div className="order-list-container">
         <h1>Order List</h1>
         <table>
            <thead>
               <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Action</th> {/* Add a new column for action buttons */}
               </tr>
            </thead>
            <tbody>
               {orders.map((order, index) => (
                  <tr key={index}>
                     <td>{order.orderId}</td>
                     <td>{order.date}</td>
                     <td>{order.total}</td>
                     <td>{order.paymentMethod}</td>
                     <td>{order.paymentStatus}</td>
                     <td>{order.orderStatus}</td>
                     <td>
                        <Link to={`/order/${order.orderId}`}>
                           <button>View Order</button>
                        </Link>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

   );
}


export default Orders;