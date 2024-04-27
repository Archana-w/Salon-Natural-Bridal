const transectionModel = require("../models/transectionModel");
const moment = require("moment");

// get controller
const getAllTransection = async (req, res) => {

  //check authentication
  if (req.current_user != null) {
    try {
        const { frequency, selectedDate, type } = req.body;
        const transections = await transectionModel.find({
          ...(frequency !== "custom"
            ? {
                date: {
                  $gt: moment().subtract(Number(frequency), "d").toDate(),
                },
              }
            : {
                date: {
                  $gte: selectedDate[0],
                  $lte: selectedDate[1],
                },
              }),
          userid: req.current_user.user_id,
          ...(type !== "all" && { type }),
        });
        res.status(200).json(transections);
      
    } catch (error) {
      console.log(error);
      res.status(500).json(erorr);
    }

  }else {
      res.status(401).send({ status: "auth_failed", message: "User authentication required." });
  }
};


//delete controller
const deleteTransection = async(req,res) => {
  //check authentication
  if (req.current_user != null) {
    try {
      await transectionModel.findOneAndDelete({_id:req.body.transacationId});
      res.status(200).send('Transaction Deleted');    
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

  }else {
    res.status(401).send({ status: "auth_failed", message: "User authentication required." });
  }
};


// edit controller
const editTransection = async(req,res) => {
  //check authentication
  if (req.current_user != null) {
    try {
      // writing query in mongo db 
      await transectionModel.findOneAndUpdate({_id:req.body.transacationId},req.body.payload);
      res.status(200).send('Edit Successfully');
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

  }else {
   res.status(401).send({ status: "auth_failed", message: "User authentication required." });
  }
};


// add transaction controller 
const addTransection = async (req, res) => {
  //check authentication
  if (req.current_user != null) {
    try {
      let data = req.body;
      data.userid = req.current_user.user_id;
      const newTransection = new transectionModel(data);
      await newTransection.save();
      res.status(201).send("Transection Created");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

  }else {
   res.status(401).send({ status: "auth_failed", message: "User authentication required." });
  }
};



module.exports = { getAllTransection, addTransection , editTransection,deleteTransection };