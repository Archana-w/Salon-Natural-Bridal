import ImageButton from '../../components/others/ImageButton';
import './CartItem.css';

function CartItem(){

    return(
        <div className="cart-item-cont">
            <div className="cart-item">
                <div className="cart-item-main">
                    <div className="product-image" style={{ backgroundImage: "url('https://ecommercephotographyindia.com/assets/img/gallery/cosmetics-turquoise-bg.jpg')"}}>

                    </div>
                    <div className="product-details">
                        <h4 className="product-details-title">Product Name</h4>
                        <p className="product-details-price">RS 2000</p>
                    </div>
                    <div className="product-quantity">
                        
                        <ImageButton>
                            <span className="material-icons-outlined">remove</span>
                        </ImageButton>

                        <h4>2</h4>

                        <ImageButton background="#aae7ff" backgroundActive="#85d9fa">
                            <span className="material-icons-outlined">add</span>
                        </ImageButton>

                    </div>
                    <div className="product-action">

                        <ImageButton background="#ffaaaa" backgroundActive="#fa8d8d">
                            <span className="material-icons-outlined">delete</span>
                        </ImageButton>

                    </div>
                    <div className="product-total-price">
                        <p className="product-total-price-label">Total price</p>
                        <p className="product-total-price-total">RS 3000</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CartItem;