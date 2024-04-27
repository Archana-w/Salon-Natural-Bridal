// const { Router } = require('express')
const express = require('express')
const {addTransection,getAllTransection,editTransection,deleteTransection} = require("../controllers/transectionCtrl")

// const transectionCtrl = require(./transactionCtrl.js)

//router Object 
const router = express.Router()

//routes

//add transection POST Method
router.post('/add-transection',addTransection)

//edit transection POST Method
router.post('/edit-transection',editTransection)


//delete transection POST Method
router.post('/delete-transection', deleteTransection)


//get transections
router.post('/get-transection',getAllTransection)


//export

module.exports = router;

