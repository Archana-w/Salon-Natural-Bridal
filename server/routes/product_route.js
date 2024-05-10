var express = require("express");
var router = express.Router();
const Product = require("../models/Product");

router.route("/get").post((req,res)=>{

    var category = req.body.category;
    if(category != null){
        Product.find().where("category").equals(category).exec().then((result) => {
            res.send(result);
        });
    }else{
        Product.find().sort({ date_updated:1}).exec().then((result) => {
            res.send(result);
        });
    }

});


router.route("/get_product").post(async (req, res) => {

    //check authentication
    if (req.current_user != null) {

        const userId = req.current_user.user_id;
        const productId = req.body.product_id;

        //validate data
        if (productId == null || productId == ""){
            res.send({ status: "required_failed", "message": "Required values are not received." });
            return;
        }
        Product.findOne({_id:productId}).then((result)=>{
            res.send({status:"success",product:result});
        }).catch((error)=>{
            res.send({ status: "invalid_order_id", message: "Please enter valid order id." });
        });

    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});


router.route("/admin_get").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            Product.find().then((result) => {
                res.send({status:"success",data:result});
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

router.route("/add").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if(userType == "admin"){
            
            const date = new Date();
            const time = date.getTime();

            //validate image thumbnail
            if (req.files[0] == null || req.files[0].fieldname != "thumbnail"){
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            //get product image name
            const productImageName = req.files[0].filename;
            const name = req.body.name;
            const desc = req.body.description;
            const category = req.body.category;
            const brand = req.body.brand;
            const price = req.body.price;
            const quantityAvailable = req.body.quantity;
            const weight = req.body.weight;
            const discount = req.body.discount;

            //validation data
            if (name == null || name == "" ||
                category == null || category == "" ||
                price == null || price == "" ||
                quantityAvailable == null) {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            const product = new Product();
            product.product_name = name;
            product.description = desc;
            product.category = category;
            product.brand = brand;
            product.price = price;
            product.quantity_available = quantityAvailable;
            product.weight = weight;
            product.thumbnail = productImageName;
            product.rating = 0;
            product.reviews = 0;
            product.discount = discount;
            product.date_added = time;
            product.date_updated = time;

            product.save().then(() => {
                res.send({ status: "success", "message": "Product added." });
            }).catch((e) => {
                res.send("error - " + e);
            });

        }else{
            res.send({ status: "access_denied", message: "Can not access." });
        }

        
    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }


});


router.route("/delete").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            var productId = req.body.product_id;

            //validation data
            if (productId == null || productId == "") {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            Product.findOneAndDelete({_id:productId}).then(()=>{
                res.send({ status: "success", message: "Product deleted." });
            }).catch((error)=>{
                res.send({ status: "failed", message: error });
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
    
});


router.route("/update").post((req,res)=>{

    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            var date = new Date();
            var currentTimeMillis = date.getTime();

            //get product image name
            const productId = req.body.product_id;
            const name = req.body.name;
            const desc = req.body.description;
            const category = req.body.category;
            const brand = req.body.brand;
            const price = req.body.price;
            const quantityAvailable = req.body.quantity;
            const weight = req.body.weight;
            const discount = req.body.discount;

            //validation data
            if (productId == null || productId == "" ||
                name == null || name == "" ||
                category == null || category == "" ||
                price == null || price == "" ||
                quantityAvailable == null) {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            Product.findOneAndUpdate({ _id: productId }, 
                { 
                    product_name: name,
                    description: desc,
                    category: category,
                    brand: brand,
                    price: price,
                    quantity_available: quantityAvailable,
                    weight: weight,
                    discount: discount,
                    date_updated: currentTimeMillis
                }
            ).then(()=>{
                res.send({ status: "success", "message": "Product updated." });
            }).catch((e)=>{
                res.send(e);
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }
    
});

router.route("/update/thumbnail").post((req,res)=>{
    
    //check authentication
    if (req.current_user != null) {

        const userType = req.current_user.user.type;

        if (userType == "admin") {

            var date = new Date();
            var currentTimeMillis = date.getTime();

            const productId = req.body.product_id;

            //validate image thumbnail
            if (req.files[0] == null || req.files[0].fieldname != "thumbnail") {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }
    
            //validation data
            if (productId == null || productId == "") {
                res.send({ status: "required_failed", "message": "Required values are not received." });
                return;
            }

            const productImageName = req.files[0].filename;

            Product.findOneAndUpdate({ _id: productId },
                {
                    thumbnail: productImageName,
                    date_updated: currentTimeMillis
                }
            ).then(() => {
                res.send({ status: "success", "message": "Product thumbnail updated." });
            }).catch((e) => {
                res.send(e);
            });

        } else {
            res.send({ status: "access_denied", message: "Can not access." });
        }


    } else {
        res.send({ status: "auth_failed", message: "User authentication required." });
    }

});

module.exports = router;