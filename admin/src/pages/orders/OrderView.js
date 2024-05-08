import './OrderView.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthToken } from '../../auth';
import { useNavigate, useParams, Link } from "react-router-dom";

function OrderView() {

    const { id } = useParams();
    var token = useAuthToken();
    var navigate = useNavigate();
    const [orderData, setOrderData] = useState({});
    const[update,setUpdate] = useState(1);

    useEffect(() => {

        if (token != null) {

            axios.post("http://localhost:5000/order/admin_get", { token: token, order_id: id }).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    setOrderData(data);
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

    function changeOrderStatus(e){
        
        if (token != null) {

            axios.post("http://localhost:5000/order/update_order_status", { token: token, order_id: id, status:e.target.value }).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
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
        
    }

    return (

        <>

            <div className='order-view-header'>
                <div className='order-view-header-left'>
                    <div className='order-view-header-title'>
                        <label>Order ID: {orderData.order_id}</label>
                        <div className='order-view-status-container'>
                            <span className={
                                (orderData.order_status == "pending") ? "order-view-status order-status-pending" :
                                    (orderData.order_status == "accept") ? "order-view-status order-status-accept" :
                                        (orderData.order_status == "shipped") ? "order-view-status order-status-shipped" :
                                            (orderData.order_status == "complete") ? "order-view-status order-status-complete" : ""
                            }>{orderData.order_status}</span>
                        </div>
                    </div>
                    <label className='order-view-date'>{new Date(orderData.date).toLocaleString()}</label>
                </div>
                <div className='order-view-header-right'>
                    <select onChange={changeOrderStatus} value={orderData.order_status}>
                        <option value="pending">Pending</option>
                        <option value="accept">Accept</option>
                        <option value="shipped">Shipped</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>
            </div>

        </>

    );
}

export default OrderView;