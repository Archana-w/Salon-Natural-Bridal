const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Address = require("../models/Address");

router.route("/place").post(async (req,res)=>{

    const date = new Date();
    const time = date.getTime();

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const addressId = req.body.address_id;
        const paymentMethod = req.body.payment_method;

        if (addressId == null || addressId == "" ||
            paymentMethod == null || paymentMethod == ""){
            res.send({ status: "required_failed", "message": "Required values are not received 1." });
            return;
        }

        //validate payment method
        if (paymentMethod != "cash_on_delivery" && 
            paymentMethod != "card"){
            res.send({ status: "required_failed", "message": "Required values are not received 2." });
            return;
        }

        var result = await Cart.find({ user_id: userId });

        //check cart is already item
        if(result.length == 0){
            res.send({ status: "cart_empty", message: "Your cart is empty." });
            return;
        }

        var paymentStatus = "pending";

        //make payment
        if (paymentMethod == "card"){

            //get card details
            const cardHolderName = req.body.card_holder_name;
            const cardNumber = req.body.card_number;
            const cardExpire = req.body.card_expire;
            const cardSecurityCode = req.body.card_security_code;

            //check empty or null
            if (cardHolderName == null || cardHolderName == "" ||
                cardNumber == null || cardNumber == "" ||
                cardExpire == null || cardExpire == "" ||
                cardSecurityCode == null || cardSecurityCode == ""){
                res.send({ status: "required_failed", "message": "Required values are not received. 3" });
                return;
            }

            //validate card details(testing card)
            if (cardNumber == "1234567812345678" && cardExpire == "01/25" && cardSecurityCode == "123"){
                //valid card
                paymentStatus = "payed";
            } else if (cardNumber == "111111111111" && cardExpire == "01/25" && cardSecurityCode == "123"){
                //insufficient balance card
                res.send({ status: "insufficient_balance", "message": "Insufficient card balance." });
                return;
            }else{
                //invalid card
                res.send({ status: "invalid_card", "message": "Invalid card details." });
                return;
            }

        }

        //make order
        var order = new Order();
        order.user_id = userId;
        order.address_id = addressId;
        order.date = time;
        order.total = 0;
        order.discount = 0;
        order.payment_method = paymentMethod;
        order.payment_status = paymentStatus;
        order.status = "draft";

        var orderResult = await order.save();

        //cart insert to order item
        var total = 0;
        for(var i = 0; i < result.length; i++){
            var data = result[i];

            var cartId = data._id;
            var productId = data.product_id;
            var itemTotal = data.total;
            var quantity = data.quantity;

            total = total + itemTotal;

            var orderItem = new OrderItem();
            orderItem.user_id = userId;
            orderItem.order_id = orderResult._id;
            orderItem.product_id = productId;
            orderItem.quantity = quantity;
            orderItem.total = itemTotal;

            await orderItem.save();

        }

        //update order
        await Order.findOneAndUpdate({ _id: orderResult._id }, { total: total,status:"pending"});

        //clear cart
        Cart.deleteMany({ user_id: userId }).then((result)=>{
            res.send({ status: "success", order_id: orderResult._id, message: "Order placed." });
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/address/add").post((req,res)=>{
    
    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const name = req.body.name;
        const addressInput = req.body.address;
        const phoneNumber = req.body.phone_number;

        //validate data
        if (name == null || name == "" ||
            addressInput == null || addressInput == "" ||
            phoneNumber == null || phoneNumber == "") {
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }

        var address = new Address();
        address.user_id = userId;
        address.name = name;
        address.address = addressInput;
        address.phone_number = phoneNumber;

        address.save().then(()=>{
            res.send({ status: "success", message: "Address saved." });
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/address/get").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
      
        Address.find({ user_id: userId }).then((result)=>{
            res.send({ status: "success", data: result });
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/address/delete").post((req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const id = req.body.id;
        
        //validate data
        if (id == null || id == "") {
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }

        Address.deleteOne({_id:id}).then(()=>{
            res.send({ status: "success", message: "Address deleted." });
        });
        
    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});


module.exports = router;