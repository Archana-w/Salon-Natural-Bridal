const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");

router.route("/get").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;

        Cart.find({ user_id: userId }).then(async (doc)=>{

            var array = new Array();

            var t = 0;
            for(i = 0; i < doc.length; i++){

                var item = doc[i];
                var obj = new Object();
                obj.cart_id = item.id;
                obj.quantity = item.quantity;
                obj.total = item.total;

                t = t + Number(item.total);

                const productId = item.product_id;
                const product = await Product.findOne({_id:productId});
                obj.product = product;
                array.push(obj);

            }

            res.send({ status: "success", cart: { total: t, item: array } });

        }).catch((e)=>{
            res.send("error - "+e);
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/add").post((req,res)=>{

    const date = new Date();
    const time = date.getTime();

    //check authentication
    if(req.current_user != null){

        const userId = req.current_user.user_id;
        const productId = req.body.product_id;
        const quantity = req.body.quantity;

        //validate data
        if (productId == null ||
            productId == "" ||
            quantity == null){
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }
        
        //check product is available
        Product.findOne({ _id: productId }).then((doc)=>{

            if(doc != null){

                const price = doc.price;
                const discount = doc.discount;
                const productStock = doc.quantity_available;
                
                //check quantity is numeric
                if (Number(quantity) && quantity > 0){

                    Cart.findOne({user_id:userId, product_id:productId}).then((result)=>{

                        if(result == null){

                            //check qut > productStock
                            if (productStock < quantity){
                                res.send({ status: "no_stock", message: "Invalid value." });
                            }else{
        
                                //calculate total
                                const oneProductPrice = price - ((price / 100) * discount);
                                const totalPrice = oneProductPrice * quantity;
                                
                                const cart = new Cart();
                                cart.user_id = userId;
                                cart.product_id = productId;
                                cart.quantity = quantity;
                                cart.added_date = time;
                                cart.total = totalPrice;
        
                                cart.save().then(()=>{
                                    res.send({ status: "success", message: "Item added." });
                                });
        
                            }
    
                        }else{
                            
                            var cartId = result._id;
                            var quantity1 = result.quantity;
                            var updatedQ = Number(quantity1 + 1);

                            //calculate total
                            const oneProductPrice = price - ((price / 100) * discount);
                            const totalPrice = oneProductPrice * quantity;

                            Cart.findOneAndUpdate({user_id:userId,_id:cartId},{quantity:updatedQ,total:totalPrice}).then(()=>{
                                res.send({ status: "success", message: "Item added." });
                            });
    
                        }
                    });

                }else{
                    res.send({ status: "invalid_quantity", message: "Invalid value." });
                }


            }else{
                res.send({ status: "invalid_product_id", message: "Invalid product id." });
            }

        }).catch((e)=>{
            res.send({ status: "error", message: e });
        });

    }else{
        res.send({status:"auth_failed",message:"User authentication required."});
    }

});

router.route("/update").post((req,res)=>{
    
    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const id = req.body.id;
        const quantity = req.body.quantity;

        //validate data

        if(id == null ||
            id == "" ||
            quantity == null ||
            quantity == ""){
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;    
        }

        Cart.findOne({_id:id}).then((doc)=>{

            if(doc != null){

                const productId = doc.product_id;

                Product.findOne({ _id: productId }).then((doc) => {

                    if (doc != null) {

                        const price = doc.price;
                        const discount = doc.discount;
                        const productStock = doc.quantity_available;

                        //check quantity is numeric
                        if (Number(quantity) && quantity > 0) {

                            //check qut > productStock
                            if (productStock < quantity) {
                                res.send({ status: "no_stock", message: "Invalid value." });
                            } else {

                                //calculate total
                                const oneProductPrice = price - ((price / 100) * discount);
                                const totalPrice = oneProductPrice * quantity;

                                Cart.findOneAndUpdate({ _id: id }, { quantity: quantity, total: totalPrice }).then(() => {
                                    res.send({ status: "success", message: "Item updated." });
                                }).catch((e)=>{
                                    res.send(e);
                                });

                            }

                        } else {
                            res.send({ status: "invalid_quantity", message: "Invalid value." });
                        }


                    } else {
                        res.send({ status: "invalid_product_id", message: "Invalid product id." });
                    }

                }).catch((e) => {
                    res.send({ status: "error", message: e });
                });

            }else{
                res.send({ status: "failed", message: "Invalid request." });
            }

        }).catch((e)=>{
            res.send({status:"error",message:e});
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }


});

router.route("/delete").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const id = req.body.id;
        
        //validate data

        if (id == null ||
            id == "") {
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }

        Cart.findOne({ _id: id }).then((doc) => {

            if (doc != null) {

                Cart.findOneAndDelete({_id:id}).then(()=>{
                    res.send({ status: "success", message: "Item deleted." });
                }).catch((e)=>{
                    res.send(e);
                });

            } else {
                res.send({ status: "failed", message: "Invalid request." });
            }

        }).catch((e) => {
            res.send({ status: "error", message: e });
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

module.exports = router;