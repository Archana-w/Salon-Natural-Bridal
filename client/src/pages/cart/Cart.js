import './Cart.css';
import CartItem from './CartItem';
import EmptyCartIllustration from '../../images/illustration/empty_cart.webp';
import CheckOut from './CheckOut';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PageLoading from '../../components/loading/PageLoading';
import axios from 'axios';
import { useAuthToken } from '../../auth';

function Cart(){

    var shippingCost = 375;
    var token = useAuthToken();
    var navigate = useNavigate();
    const [total,setTotal] = useState(0);
    const [isLoading,setLoading] = useState(true);
    const [cartData,setCartData] = useState([]);
    const [update,setUpdate] = useState(1);

    var esTotal = 0;
    if(total > 0){
        esTotal = shippingCost + total;
    }

    useEffect(()=>{

        if (token != null){

            axios.post("http://localhost:5000/cart/get", { token: token }).then((response) => {

                var data = response.data;
                var status = data.status;
                if (status == "success") {
                    var cart = data.cart;
                    setTotal(cart.total);
                    setCartData(cart.item);
                    setLoading(false);
                } else if (status == "token_expired" || status == "auth_failed") {
                    navigate("/signout");
                }else{
                    var message = data.message;
                    alert("Error - " + message);
                }

            }).catch((error)=>{
                alert("Error 2 - "+error);
            });

        }else{
            navigate("/login");
        }

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

    function deleteCartItem(cartId){
        
        setLoading(true);
        axios.post("http://localhost:5000/cart/delete", { token: token, id: cartId}).then((response) => {
            var data = response.data;
            var status = data.status;
            if (status == "success") {
                setUpdate(update + 1);
            }
        });

    }

    function onCheckoutClick(){
        if (total > 0){
            navigate("/checkout");
        }else{
            alert("Please add your item in to the cart.");
        }
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

                        {(cartData.length == 0)?(

                            <div className="cart_empty_container">
                                <img src={EmptyCartIllustration} />
                                <label>Cart Empty</label>
                            </div>

                        ):(

                            cartData.map((item) =>

                                <CartItem
                                    onDelete={() => deleteCartItem(item.cart_id)}
                                    onAddQut={() => updateProductQut(item.cart_id, Number(item.quantity) + 1)}
                                    onRemoveQut={() => updateProductQut(item.cart_id, Number(item.quantity) - 1)}
                                    key={item.cart_id}
                                    thumbnail={item.product.thumbnail}
                                    name={item.product.product_name}
                                    price={item.product.price}
                                    total={item.total}
                                    quantity={item.quantity}
                                />
                            )

                        )}

                    </div>
                    <div className="cart-right">

                        <CheckOut
                            esTotal={esTotal}
                            shippingCost={375}
                            totalCost={total}
                            onCheckoutClick={onCheckoutClick}
                        />

                    </div>
                </div>
            </div>
        );

    }

}

export default Cart;