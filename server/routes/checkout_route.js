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

        if (addressId == null || addressId == ""){
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }

        var result = await Cart.find({ user_id: userId });

        //check cart is already item
        if(result.length == 0){
            res.send({ status: "cart_empty", message: "Your cart is empty." });
            return;
        }

        //make order
        var order = new Order();
        order.user_id = userId;
        order.address_id = addressId;
        order.date = time;
        order.total = 0;
        order.discount = 0;
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

            var orderItemResult = await orderItem.save();

        }

        //update order
        var orderUpdateResult = await Order.findOneAndUpdate({ _id: orderResult._id }, { total: total,status:"pending"});

        res.send("Success");

        //clear cart
        /*
        Cart.deleteMany({ user_id: userId }).then((result)=>{
            res.send(result);
        });
        */

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

module.exports = router;