import './Cart.css';
import CartItem from './CartItem';
import Coupon from './Coupon';
import CheckOut from './CheckOut';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Cart(){

    var nav = useNavigate();


    const [total,setTotal] = useState(0);

    var totalPrice = "Rs "+total;

    function onCheckoutClick(){
        nav("/cart");
        setTotal(total+1);
    }

    return(
        <div className="cart">
            <div className="page-title">
                <span className="material-icons-outlined">shopping_bag</span>
                <h2>My Cart</h2>
            </div>
            <div className="cart-content">
                <div className="cart-item-container">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <div className="cart-right">

                    <CheckOut
                        shippingCost="Rs 375"
                        totalCost={totalPrice}
                        onCheckoutClick={onCheckoutClick}
                    />

                    <Coupon />

                </div>
            </div>
        </div>
    );
}

export default Cart;