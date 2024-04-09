import './Coupon.css';
import TextInput from '../../components/others/TextInput';

function Coupon(){

    return(
        <div className="coupon-container">
            <div className="coupon">
                <div className="coupon-content">
                    <h3>Coupon</h3>
                    <div className="coupon-text">
                        <TextInput
                            placeholder="Coupon code"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coupon;