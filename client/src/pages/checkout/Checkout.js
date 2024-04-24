import './Checkout.css';
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuthToken } from '../../auth';
import PageLoading from '../../components/loading/PageLoading';

function Checkout(){

    var token = useAuthToken();
    var navigate = useNavigate();
    const[update,setUpdate] = useState(0);
    const[isLoading, setLoading] = useState(false);
    const[addressData,setAddressData] = useState([]);
    const [addressName, setAddressName] = useState(null);
    const[addressText,setAddressText] = useState(null);
    const [addressPhoneNumber, setAddressPhoneNumber] = useState(null);
    const [total, setTotal] = useState(0);
    const [cartData, setCartData] = useState([]);

    const[deliveryAddressId,setDeliveryAddressId] = useState(null);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [cardDetails, setCardDetails] = useState({
        cardHolderName:'',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleCardDetailsChange = (event) => {
        const { name, value } = event.target;
        setCardDetails({
            ...cardDetails,
            [name]: value
        });
    };

    useEffect(() => {

        if (token != null) {

            setLoading(true);

            //get cart
            axios.post("http://localhost:5000/cart/get", { token: token }).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    var cart = data.cart;
                    setTotal(cart.total);
                    setCartData(cart.item);
                    
                    //load user address
                    loadUserAddress();

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

    }, [update]);

    function loadUserAddress(){

        axios.post("http://localhost:5000/checkout/address/get", { token: token }).then((response) => {

            var data = response.data;
            var status = data.status;
            if (status == "success") {
                setAddressData(data.data);
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

    }

    function closeAddAddressWindows(){
        var addAddressWindows = document.getElementById('addAddressWindows');
        addAddressWindows.style.display = "none";
    }

    function openAddAddressWindow(){
        var addAddressWindows = document.getElementById('addAddressWindows');
        addAddressWindows.style.display = "flex";
    }

    function saveAddress(){
        
        if(addressName != null && addressText != null && addressPhoneNumber != null){

            setLoading(true);

            axios.post("http://localhost:5000/checkout/address/add", { token: token, name: addressName, address: addressText, phone_number: addressPhoneNumber }).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    setUpdate(update+1);
                } else if (status == "token_expired" || status == "auth_failed") {
                    navigate("/signout");
                } else {
                    var message = data.message;
                    alert("Error - " + message);
                }

            }).catch((error) => {
                alert("Error 2 - " + error);
            });

        }

    }

    function deleteAddress(id){

        setLoading(true);

        axios.post("http://localhost:5000/checkout/address/delete", { token: token, id:id }).then((response) => {

            var data = response.data;
            var status = data.status;
            if (status == "success") {
                setUpdate(update + 1);
            } else if (status == "token_expired" || status == "auth_failed") {
                navigate("/signout");
            } else {
                var message = data.message;
                alert("Error - " + message);
            }

        }).catch((error) => {
            alert("Error 2 - " + error);
        });


    }

    function placeOrder(){
        
        var requestBody;
        if (paymentMethod == "COD"){
            requestBody = { token: token, address_id: deliveryAddressId, payment_method:"cash_on_delivery" };    
        }else{
            requestBody = { token: token, address_id: deliveryAddressId, payment_method: "card", card_holder_name: cardDetails.cardHolderName, card_number: cardDetails.cardNumber, card_expire: cardDetails.expiryDate, card_security_code: cardDetails.cvv};    
        }

        axios.post("http://localhost:5000/checkout/place", requestBody).then((response) => {

            var data = response.data;
            var status = data.status;
            if (status == "success") {
                var orderId = data.order_id;
                navigate("/invoice/" + orderId);
            } else if (status == "token_expired" || status == "auth_failed") {
                navigate("/signout");
            } else {
                var message = data.message;
                alert("Error - " + message);
            }

        }).catch((error) => {
            alert("Error 2 - " + error);
        });
    
    }


    if (isLoading) {

        return (
            <>
                <PageLoading />
            </>
        );

    } else {

        return (

            <>

                <div className="checkout-page">
                    <div className="page-title">
                        <span className="material-icons-outlined">shopping_cart_checkout</span>
                        <h2>Checkout</h2>
                    </div>
                    <div className="checkout-page-content">

                        <div className="checkout-left-container">

                            <div className="address-container">

                                <div className="address-header">
                                    <label>Delivery Address</label>
                                    <button onClick={openAddAddressWindow}>Add New Address</button>
                                </div>

                                {addressData.map((item) =>

                                    <div className="address">
                                        <div className="address-radio">
                                            <input onChange={() => setDeliveryAddressId(item._id)} type="radio" name="address" />
                                        </div>
                                        <div className="address-main">
                                            <label className="address-name">{item.name}</label>
                                            <label className="address-text">{item.address}</label>
                                            <label className="address-mobile">{item.phone_number}</label>
                                        </div>
                                        <div className="address-delete">
                                            <span onClick={() => deleteAddress(item._id)} className="material-icons-outlined">delete</span>
                                        </div>
                                    </div>

                                )}

                            </div>

                            <div className="payment-method-container">

                                <div className="payment-method-header">
                                    <label>Payment Method</label>
                                </div>

                                <form className="checkout-form">
                                    <div className="payment-method">
                                        <input
                                            type="radio"
                                            id="cod"
                                            name="paymentMethod"
                                            value="COD"
                                            checked={paymentMethod === 'COD'}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label htmlFor="cod">Cash On Delivery</label>
                                    </div>
                                    <div className="payment-method">
                                        <input
                                            type="radio"
                                            id="card"
                                            name="paymentMethod"
                                            value="Card"
                                            checked={paymentMethod === 'Card'}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label htmlFor="card">Card</label>
                                    </div>
                                    {paymentMethod === 'Card' && (
                                        <div className="card-details">
                                            <label htmlFor="cardNumber">Card Holder Name</label>
                                            <input
                                                type="text"
                                                id="cardHolderName"
                                                name="cardHolderName"
                                                value={cardDetails.cardHolderName}
                                                onChange={handleCardDetailsChange}
                                            />
                                            <label htmlFor="cardNumber">Card Number</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                value={cardDetails.cardNumber}
                                                onChange={handleCardDetailsChange}
                                            />
                                            <label htmlFor="expiryDate">Expiry Date</label>
                                            <input
                                                placeholder='MM/YY'
                                                type="text"
                                                id="expiryDate"
                                                name="expiryDate"
                                                value={cardDetails.expiryDate}
                                                onChange={handleCardDetailsChange}
                                            />
                                            <label htmlFor="cvv">CVV</label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                name="cvv"
                                                value={cardDetails.cvv}
                                                onChange={handleCardDetailsChange}
                                            />
                                        </div>
                                    )}
                                </form>

                            </div>

                        </div>

                        <div className="checkout-right-container">

                            <div className="order-summary">
                                <h3>Order Summary</h3>
                                {/* Your order summary content goes here */}
                                <p>Total: Rs {total}</p>
                                <button onClick={placeOrder} className="place-order-button">Place Order</button>
                            </div>

                        </div>

                    </div>




                </div>

                <div id='addAddressWindows' className="add-address-window-container">
                    <div className="add-address-window">
                        <div className="add-address-header">
                            <label>Add Delivery Address</label>
                            <span onClick={closeAddAddressWindows} className="material-icons-outlined">close</span>
                        </div>
                        <div className="add-address-container">
                            <input onChange={(e) => setAddressName(e.target.value)} placeholder='Name' type='text' /><br />
                            <input onChange={(e) => setAddressText(e.target.value)} placeholder='Address' type='text' /><br />
                            <input onChange={(e) => setAddressPhoneNumber(e.target.value)} placeholder='Phone number' type='text' /><br />
                            <button onClick={saveAddress}>Save</button>
                        </div>
                    </div>
                </div>

            </>

        ); 

    }

}

export default Checkout;