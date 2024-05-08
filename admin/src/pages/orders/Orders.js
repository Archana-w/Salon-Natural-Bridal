import './Orders.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthToken } from '../../auth';
import { useNavigate,Link } from "react-router-dom";


function Orders() {

   var token = useAuthToken();
   var navigate = useNavigate();
   const[ordersData,setOrdersData] = useState([]);
   const[filterStatus,setFilterStatus] = useState("all");
   const[searchText,setSearchText] = useState("");
   const[update,setUpdate] = useState(0);

   useEffect(() => {

      if (token != null) {

         axios.post("http://localhost:5000/order/get/all", { token: token, status: filterStatus, search: searchText }).then((response) => {

            console.log(response.data);

            var data = response.data;
            var status = data.status;
            if (status == "success") {
               console.log(data.data);
               setOrdersData(data.data);
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

   function searchOrderId(){
      setUpdate(update + 1);
   }

   function copyOrderId(id){
      navigator.clipboard.writeText(id);
      alert("Order id copied!!!");
   }

   return (

      <div className="order-list-container">
         <h1>Order List</h1>

         <div className='order-filter-bar'>
            <label>Filter Orders</label>

            <select className='order-filter-status' onChange={(e) => setFilterStatus(e.target.value)}>
               <option value="all">All</option>
               <option value="pending">Pending</option>
               <option value="complete">Complete</option>
               <option value="accept">Accept</option>
               <option value="shipped">Shipped</option>
            </select>

            <input className='order-filter-search' onChange={(e) => setSearchText(e.target.value)} placeholder="Search order ID" type="text"/>
            <button className='order-filter-search-btn' onClick={searchOrderId}>Search</button>

         </div>

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
               {ordersData.map((order, index) => (
                  <tr key={index}>
                     <td>
                        <div className='order-id-td-container'>
                           {order.order_id.substring(0, 5)}...
                           <span onClick={() => copyOrderId(order.order_id)} className="material-icons-round">copy</span>
                        </div>
                     </td>
                     <td>{order.date}</td>
                     <td>Rs {order.total}</td>
                     <td>{order.payment_method}</td>
                     <td>{order.payment_status}</td>
                     <td>
                        <div className='order-status-container'>
                           <div className={
                              (order.status == "Pending") ? "order-status-pending" :
                                 (order.status == "Accept") ? "order-status-accept" :
                                    (order.status == "Shipped") ? "order-status-shipped" :
                                       (order.status == "Complete") ? "order-status-complete" : ""
                           }>
                              {order.status}
                           </div>
                        </div>
                     </td>
                     <td>
                        <Link to={`/order/${order.order_id}`}>
                           <button className='view-order-btn'>View Order</button>
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