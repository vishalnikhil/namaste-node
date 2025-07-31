const express=require('express');
const { UserAuth } = require('../Middlewares/auth');

const User=require('../models/user')

const paymentRouter=express.Router();

  const Payment=require('../models/payment');


   const razorpayInstance=require('../utils/razorpay');

   const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");



const { memebershipAmount } = require('../utils/constant');


paymentRouter.post("/payment/create",UserAuth,async(req,res)=>{

     const {membershipType}=req.body;

     const {firstName, lastName, emailId}=req.user;




const order=await razorpayInstance.orders.create( {


     amount: memebershipAmount[membershipType]*100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",

   receipt:"receipt#1",

   notes:{
     
      firstName,
      lastName,
      emailId,
      membershipType:membershipType,

   }
  
});



 //save data in my database\

 console.log(order);

 const payment=new Payment({

      userId:req.user._id,
      orderId:order.id,
      status:order.status,
      amount:order.amount,
      currency:order.currency,
      receipt:order.receipt,
      notes:order.notes,
     
 })

 const savedPayment=await payment.save();

res.json({
  ...savedPayment.toJSON(),
  orderId: order.id // ✅ actually include it in the response
});
       
     
});

 //setting up the web hook to validate the signature
 paymentRouter.post("/payment/webhook", async (req, res) =>{

      try {


     const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(

      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );


      if (!isWebhookValid) {
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }

    const paymentDetails = req.body.payload.payment.entity;


    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });

    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;

    await user.save();


    return res.status(200).json({ msg: "Webhook received successfully" });
       
      } catch (err) {

        console.log(err);
        
      }
      
 });

module.exports=paymentRouter;