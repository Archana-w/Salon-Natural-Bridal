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
        if (orderId == null || orderId == "") {
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }

        Order.findOne({ _id: orderId, user_id: userId }).then(async (result) => {

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
            for (var i = 0; i < orderItems.length; i++) {
                var item = orderItems[i];

                var product = await Product.findOne({ _id: item.product_id });
                var productRes = { product_name: product.product_name, thumbnail: product.thumbnail, quantity: item.quantity, total: item.total };
                itemArray.push(productRes);

            }

            //get address
            var address = await Address.findOne({ _id: addressId });

            res.send({ status: "success", order_id: orderId, total: total, discount: discount, order_status: status, paymentStatus: paymentStatus, paymentMethod: paymentMethod, date: date, address: address, products: itemArray });

        }).catch((error) => {
            res.send({ status: "invalid_order_id", message: "Please enter valid order id." });
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/admin_get").post(async (req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const orderId = req.body.order_id;

            //validate data
            if (orderId == null || orderId == "") {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            Order.findOne({ _id: orderId }).then(async (result) => {

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
                for (var i = 0; i < orderItems.length; i++) {
                    var item = orderItems[i];

                    var product = await Product.findOne({ _id: item.product_id });
                    var productRes = { product_name: product.product_name, thumbnail: product.thumbnail, quantity: item.quantity, total: item.total };
                    itemArray.push(productRes);

                }

                //get address
                var address = await Address.findOne({ _id: addressId });

                res.send({ status: "success", order_id: orderId, total: total, discount: discount, order_status: status, paymentStatus: paymentStatus, paymentMethod: paymentMethod, date: date, address: address, products: itemArray });

            }).catch((error) => {
                res.send({ status: "invalid_order_id", message: "Please enter valid order id." });
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/update_order_status").post(async (req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            const orderId = req.body.order_id;
            const status = req.body.status;

            //validate data
            if (orderId == null || orderId == "" ||
                status == null || status == "") {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            Order.findOneAndUpdate({ _id: orderId }, { status: status }).then(() => {
                res.send({ status: "success", message: "Order status updated." });
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/get/all").post(async (req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            var requestStatus = req.body.status;
            var searchText = req.body.search;

            //validation
            if (requestStatus == null || requestStatus == "" ||
                searchText == null) {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            ///filter
            var filterDetails = {};
            if (requestStatus != "all" && searchText == "") {
                filterDetails = { status: requestStatus }
            } else if (requestStatus == "all" && searchText != "") {
                filterDetails = { _id: searchText };
            }

            var ordersResult = await Order.find(filterDetails).sort({ date: -1 });

            var array = new Array();
            for (var i = 0; i < ordersResult.length; i++) {
                var order = ordersResult[i];

                var orderId = order._id;
                var date = order.date;
                var total = order.total;
                var discount = order.discount;
                var paymentMethod = order.payment_method;
                var paymentStatus = order.payment_status;
                var status = order.status;

                //payment method
                var paymentMethodValue;
                if (paymentMethod == "cash_on_delivery") {
                    paymentMethodValue = "Cash On Delivery";
                } else {
                    paymentMethodValue = "Card";
                }

                //payment status
                var paymentStatusValue;
                if (paymentStatus == "payed") {
                    paymentStatusValue = "Payed";
                } else {
                    paymentStatusValue = "Pending";
                }

                //order status
                var orderStatusValue;
                if (status == "pending") {
                    orderStatusValue = "Pending";
                } else if (status == "accept") {
                    orderStatusValue = "Accept";
                } else if (status == "shipped") {
                    orderStatusValue = "Shipped";
                } else if (status == "complete") {
                    orderStatusValue = "Complete";
                } else {
                    orderStatusValue = "Invalid";
                }

                //date
                var dateValue = new Date(Number(date));
                var dateText = dateValue.getFullYear() + "/" + Number(dateValue.getMonth() + 1) + "/" + dateValue.getDate() + "  " + dateValue.getHours() + ":" + dateValue.getMinutes();

                var orderResponse = { order_id: orderId, total: total, payment_method: paymentMethodValue, payment_status: paymentStatusValue, date: dateText, status: orderStatusValue };
                array.push(orderResponse);

            }

            res.send({ status: "success", data: array });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

module.exports = router;