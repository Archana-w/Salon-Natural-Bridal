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
                  $gte: moment().subtract(Number(frequency), "d").toDate(),
                },
              }
            : {
                date: {
                  $gte: selectedDate[0],
                  $lte: selectedDate[1],
                },
              }),
          ...(type !== "all" && { type }),
        }).sort({ date: -1 });
        res.status(200).json(transections);
      
    } catch (error){
      console.log(error);
      res.status(500).json(error);
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
      if(req.body.isAuto ==1){
        res.status(400).send("Can't delete Auto inserted Data"); 
      }else{
        await transectionModel.findOneAndDelete({_id:req.body.transacationId});
        res.status(200).send('Transaction Deleted'); 
      }
         
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
      if(req.body.isAuto ==1){
        res.status(400).send("Can't update Auto inserted Data"); 
      }else{
        // writing query in mongo db 
        await transectionModel.findOneAndUpdate({_id:req.body.transacationId},req.body.payload);
        res.status(200).send('Edit Successfully');
      }
      
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
      data.isAuto = 0;
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