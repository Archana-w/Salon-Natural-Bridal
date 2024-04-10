import ImageButton from '../../components/others/ImageButton';
import './CartItem.css';

function CartItem({ thumbnail, name, price, total, quantity, onDelete = null, onAddQut = null, onRemoveQut = null }){

    var productName = "";
    if(name.length > 50){
        productName = name.substring(0,50) + "...";
    }else{
        productName = name;
    }

    function onClickAddQutBtn(){
        if (onAddQut != null){
            onAddQut();
        }
    }

    function onClickRemoveQutBtn() {
        if (onRemoveQut != null) {
            onRemoveQut();
        }
    }

    function onClickDeleteBtn(){
        if (onDelete != null){
            onDelete();
        }
    }

    return(
        <div className="cart-item-cont">
            <div className="cart-item">
                <div className="cart-item-main">
                    <div className="product-image" style={{ backgroundImage: "url('http://localhost:5000/image/" + thumbnail +"')"}}>

                    </div>
                    <div className="product-details">
                        <h4 className="product-details-title">{productName}</h4>
                        <p className="product-details-price">Rs {price}</p>
                    </div>
                    <div className="product-quantity">
                        
                        <ImageButton onClick={onClickRemoveQutBtn}>
                            <span className="material-icons-outlined">remove</span>
                        </ImageButton>

                        <h4>{quantity}</h4>

                        <ImageButton onClick={onClickAddQutBtn} background="#aae7ff" backgroundActive="#85d9fa">
                            <span className="material-icons-outlined">add</span>
                        </ImageButton>

                    </div>
                    <div className="product-action">

                        <ImageButton onClick={onClickDeleteBtn} background="#ffaaaa" backgroundActive="#fa8d8d">
                            <span className="material-icons-outlined">delete</span>
                        </ImageButton>

                    </div>
                    <div className="product-total-price">
                        <p className="product-total-price-label">Total price</p>
                        <p className="product-total-price-total">RS {total}</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CartItem;