const transectionModel = require("../models/transectionModel");
const Order = require("../models/Order");
const CronJob = require("node-cron");

exports.initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule("* * * * *", () => {
        console.log("I'm executed on a schedule!");
        OrderToTransection();
        
    });

    scheduledJobFunction.start();
}







const OrderToTransection = async()=>{
    console.log("start OrderToTransection")
    const endTime = new Date();
    const startTime = new Date(endTime.getTime()-(1*60000));
    
    const orderDetails = await Order.find({
        date: {
            $gte: startTime,
            $lte: endTime,
          }
    });
    console.log("date",{endTime,startTime,orderDetails,type:typeof orderDetails});
    if(orderDetails!= null && orderDetails!=undefined && Array.isArray(orderDetails), orderDetails.length>0){
        console.log("inside if");
        orderDetails.forEach(val => {
            try {
                let transectionData= new Object();
                transectionData.userid=val.user_id;
                transectionData.amount=val.total;
                transectionData.category="Order";
                transectionData.type="income";
                transectionData.refrence=val._id;
                transectionData.description="Schedule order insert at "+endTime;
                transectionData.date=(new Date(val.date)).toISOString();
                transectionData.isAuto=1;
                (new transectionModel(transectionData)).save();
                console.log("insert done ", val._id);
            } catch (error) {
                console.warn(error);
            }
            

        });
       
    }
    console.log("end OrderToTransection")
    
}