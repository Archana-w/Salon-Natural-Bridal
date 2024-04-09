import './CheckOut.css';

function CheckOut({shippingCost = 0, totalCost = 0, onCheckoutClick}){

    return(
        <div className="checkout-summery-container">
            <div className="checkout-summery">
                <div className="checkoutsummery-content">
                    <h3>Summery</h3>
                    {(shippingCost != 0) ?
                    (<div className="checkout-summery-item sub-item">
                        <p>Shipping cost</p>
                        <p>{shippingCost}</p>
                    </div>) : ("")}
                    <div className="checkout-summery-item est-total">
                        <p>Estimated total</p>
                        <p>{totalCost}</p>
                    </div>

                    <div className="checkout-btn">
                        <div onClick={onCheckoutClick} className="button">
                            <span className="material-icons-outlined">lock</span>
                            <p>Checkout</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CheckOut;