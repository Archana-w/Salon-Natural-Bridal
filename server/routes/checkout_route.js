const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.route("/place").post(async (req,res)=>{
    
    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;

        //get cart
        var result =  await Cart.find({ user_id: userId });
        for(var i = 0; i < result.length; i++){
            var data = result[i];

            var cartId = data._id;
            var productId = data.product_id;


            return;
        }

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

module.exports = router;