const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");
const Address = require("../models/Address");

router.route("/get").post(async (req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const orderId = req.body.order_id;

        //validate data
        if (orderId == null || orderId == ""){
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }

        Order.findOne({ _id: orderId, user_id: userId }).then(async (result)=>{
            
            var addressId = result.address_id;
            var date = result.date;
            var total = result.total;
            var discount = result.discount;
            var paymentMethod = result.payment_method;
            var paymentStatus = result.payment_status;
            var status = result.status;

            //get order items
            var orderItems = await OrderItem.find({ order_id: orderId });
            
            var itemArray = new Array();
            for (var i = 0; i < orderItems.length; i++){
                var item = orderItems[i];

                var product = await Product.findOne({ _id: item.product_id });
                var productRes = { product_name: product.product_name, thumbnail: product.thumbnail, quantity: item.quantity, total: item.total};
                itemArray.push(productRes);

            }

            //get address
            var address = await Address.findOne({ _id: addressId });
            
            res.send({ status: "success", total: total, discount: discount, status: status, paymentStatus: paymentStatus, paymentMethod: paymentMethod, date: date,address: address, products: itemArray });

        }).catch((error)=>{
            res.send({ status: "invalid_order_id", message: "Please enter valid order id." });
        });
      
    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

module.exports = router;