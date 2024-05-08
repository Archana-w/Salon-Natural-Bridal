const transectionModel = require("../models/transectionModel");
const Order = require("../models/Order");
const Attendence = require("../models/Attend");
const CronJob = require("node-cron");

exports.initScheduledJobsMinite = () => {
    const scheduledJobFunction = CronJob.schedule("* * * * *", () => {
        console.log("I'm executed on a schedule!");
        OrderToTransection();
        AttendenceToTransection();
        
    });

    scheduledJobFunction.start();
}


// exports.initScheduledJobsDay = () => {
//     const scheduledJobFunction = CronJob.schedule("0 0 * * *", () => {
//     console.log("I'm executed at 12 AM every day!");
//     // Add your code here
//        AttendenceToTransection();
        
//     });

//     scheduledJobFunction.start();
// }

const AttendenceToTransection = async()=>{
    console.log("start AttendenceToTransection")
    const endTime = new Date();
    
    const attendenceDetails = await Attendence.find({
        end_time: {
            $lte: endTime.getTime(),
          },
            isAvilabaleReport: false
    });
    console.log("attendenceDetails date",{endTime,attendenceDetails,type:typeof attendenceDetails});
    if(attendenceDetails!= null && attendenceDetails!=undefined && Array.isArray(attendenceDetails), attendenceDetails.length>0){
        console.log("inside attendenceDetails if");
        attendenceDetails.forEach(async (val) => {
            try {
            let transectionData= new Object();
            transectionData.userid=val.user_id;
            transectionData.amount=val.total;
            transectionData.category="Salary";
            transectionData.type="expense";
            transectionData.refrence=val._id;
            transectionData.description="Schedule Attendence insert at "+endTime.toISOString();
            transectionData.date=(new Date(val.end_time)).toISOString();
            transectionData.isAuto=1;
            await (new transectionModel(transectionData)).save();
            val.isAvilabaleReport=true;
            await Attendence.findOneAndUpdate({_id:val._id},val);
            
            console.log("insert attendenceDetails done ", val._id);
            } catch (error) {
            console.warn(error);
            }
        });
       
    }
    console.log("end AttendenceToTransection")
    

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
                transectionData.description="Schedule order insert at "+endTime.toISOString();
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