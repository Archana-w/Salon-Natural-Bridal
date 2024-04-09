import './Cart.css';
import CartItem from './CartItem';
import Coupon from './Coupon';
import CheckOut from './CheckOut';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PageLoading from '../../components/loading/PageLoading';
import axios from 'axios';
import { useAuthToken } from '../../auth';

function Cart(){

    var token = useAuthToken();
    var nav = useNavigate();
    const [total,setTotal] = useState(0);
    const [isLoading,setLoading] = useState(true);
    const [cartData,setCartData] = useState([]);
    const [update,setUpdate] = useState(1);

    var totalPrice = "Rs "+total;

    useEffect(()=>{

        axios.post("http://localhost:5000/cart/get", { token: token }).then((response)=>{
            var data = response.data;
            setCartData(data);
            setLoading(false);
        });

    }, [update]);

    function updateProductQut(cartId,value){

        if(value <= 0){
            return;
        }

        setLoading(true);
        axios.post("http://localhost:5000/cart/update", { token: token, id: cartId, quantity: value }).then((response) => {
            var data = response.data;
            var status = data.status;
            if(status == "success"){
                setUpdate(update+1);
            }
        });

    }

    function onCheckoutClick(){
        nav("/cart");
        setTotal(total+1);
    }

    if(isLoading){

        return(
            <>
               <PageLoading/>
            </>
        );

    }else{

        return (
            <div className="cart">
                <div className="page-title">
                    <span className="material-icons-outlined">shopping_bag</span>
                    <h2>My Cart</h2>
                </div>
                <div className="cart-content">
                    <div className="cart-item-container">

                        {cartData.map((item)=>

                            <CartItem
                                onAddQut={() => updateProductQut(item.cart_id, Number(item.quantity)+1)}
                                onRemoveQut={() => updateProductQut(item.cart_id, Number(item.quantity) - 1)}
                                key={item.cart_id}
                                thumbnail={item.product.thumbnail}
                                name={item.product.product_name}
                                price={item.product.price}
                                total={item.total}
                                quantity={item.quantity}
                                />
                        )}

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

}

export default Cart;