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
    const[isLoading, setLoading] = useState(true);
    const[addressData,setAddressData] = useState([]);
    const [addressName, setAddressName] = useState(null);
    const[addressText,setAddressText] = useState(null);
    const [addressPhoneNumber, setAddressPhoneNumber] = useState(null);

    const[deliveryAddressId,setDeliveryAddressId] = useState(null);

    useEffect(() => {

        if (token != null) {

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

        } else {
            navigate("/login");
        }

    }, [update]);

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
                                    <label>Delivery address</label>
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

                        </div>

                        <div className="checkout-right-container">


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