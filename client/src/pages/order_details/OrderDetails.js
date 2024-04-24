import './OrderDetails.css';
import axios from 'axios';
import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { useAuthToken } from '../../auth';
import { useNavigate,Link } from "react-router-dom";
import PageLoading from '../../components/loading/PageLoading';

function OrderDetails(){

    let { id } = useParams();
    var token = useAuthToken();
    var navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);

    const[order,setOrder] = useState(null);

    var dateString = "";
    if(order != null){
        var date = new Date(order.date);
        dateString = date.toLocaleDateString(); 
    }

    useEffect(()=>{

        if (token != null) {

            axios.post("http://localhost:5000/order/get", { token: token,order_id:id }).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    setOrder(data);
                    setLoading(false);
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
            navigate("/login");
        }

    });

    if(isLoading){
        return(
            <>
                <PageLoading />
            </>
        );
    }else{
        return (

            <>

                <div className="invoice-container">
                    <div className="invoice-header">
                        <h2>Order Invoice</h2>
                        <p>Order ID: {order.order_id}</p>
                        <p>Order Date: {dateString}</p>
                    </div>
                    <div className="invoice-address">
                        <h3>Delivery Address:</h3>
                        <p>{order.address.name}</p>
                        <p>{order.address.address}</p>
                        <p>{order.address.phone_number}</p>
                    </div>
                    <div className="invoice-payment">
                        <h3>Payment Details:</h3>
                        <p>Method: {order.paymentMethod}</p>
                        <p>Status: {order.paymentStatus}</p>
                    </div>
                    <div className="invoice-details">
                        <h3>Order Details:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product_name}</td>
                                        <td>{item.quantity}</td>
                                        <td>Rs {item.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="total">
                            <h3>Total: Rs {order.total}</h3>
                        </div>
                    </div>
                </div>

                <div className="con-shopping">
                    <Link to="/store"><button className="continue-shopping-button">Continue Shopping</button></Link>
                </div>
            
            </>

            

        );
    }
   
}


export default OrderDetails;