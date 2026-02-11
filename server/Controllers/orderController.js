
import Product from "../Modles/Product.js";
import User from "../Modles/User.js";
import Order from "../Modles/Order.js";
import mongoose from "mongoose";
import Address from "../Modles/Address.js";
import stripe from "stripe"


/// place order COD :/api/order/cod
export const placeOrderCOD = async (req,res) => {
    try {
        const userId=req.userId;
        const { items ,address}= req.body;
        if(!address || !items || items.length === 0){
            return res.json({success:false, message:"Invalid data"})
        }
      
        ////calculate Amount using Items 
        let amount = 0 ;

          for(const item of items) {
           const product = await Product.findById(item.product);

  
            if (!product) {
            return res.json({
          success: false,
          message: "Product not found",
         });
            }
           

           amount += product.offerPrice*item.quantity;  
        }
         
        /// Add tax 
        amount +=Math.floor(amount * 0.02)

      await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType:"COD",
      });
       await User.findByIdAndUpdate(userId, { cardItems: {} });
      return res.json(
        {success:true, 
        message:"Order Placed Successsfully",
        })
         } 

       catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}


//////// stripe webhooks to verify payments action :/stripe
export const stripeWebhooks = async (req,res) => {
 /// stripe Gateway Initialize
      const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY) ;
      
      const sig = requestAnimationFrame.headers["stripe-signature"]
      let event ;
      try {
        event = stripeInstance.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_KEY

        );
      } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`)
      }
    ///// handle the event 
      switch (event.type) {
        case "payment_intent.succeeded":{
          const paymentIntent = event.data.object;
          const paymentIntentId=paymentIntent.id

             ////Getting session meta data
             const session = await stripeInstance.checkout.sessions.list({
              payment_intent:paymentIntentId,
             });
             const {orderId, userId} = session.data[0].metadata;
                 
             /////Mark payment as paid 
             await  Order.findByIdAndUpdate(orderId,{isPaid: true})

             await User.findByIdAndUpdate(userId,{cardItems:{}})
             break;
        }
         case "payment_intent.succeeded":{ 
            const paymentIntent = event.data.object;
          const paymentIntentId=paymentIntent.id

             ////Getting session meta data
             const session = await stripeInstance.checkout.sessions.list({
              payment_intent:paymentIntentId,
             });
             const {orderId} = session.data[0].metadata;
                 await Order.findByIdAndDelete(orderId);
                 break;
        
        }
      
        default:
           console.error(`unhandled event type ${event.type}`)

          break;
      }

      res.json({ received: true});


}

// get order detail of the by user Id : / api/order/user
export const getUserOrders  = async (req, res) => {
    try {
      
        const userId= req.userId;
        const orders = await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product")    
          .sort({ createdAt:-1 });
        res.json({success:true,orders});
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
} 


 /// get  All orders (for Admin/Selllers) /api/order/seller

export const getAllOrders  = async (req, res) => {
    try {
        const orders = await Order.find({
            $or:[{paymentType:"COD"},{isPaid:true}]

        }).populate("items.product address").sort({ createdAt:-1 });
        res.json({success:true,orders});
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

/// place order STRIPE :/api/order/stripe
export const placeOrderSTRIPE = async (req,res) => {
  try {
     const userId=req.userId;
        const {items ,address}= req.body;
        const {origin} = req.headers;
         
        if(!address || !items || items.length === 0){
            return res.json({success:false, message:"Invalid data"})
        }

        let productData = [];
        let amount =0;
         for (const item of items) {
        const product = await Product.findById(item.product);
          if (!product) {
          return res.json({ success: false, message: "Product not found" });
         }
         productData.push({
         name: product.name,
         price: product.offerPrice,
        quantity: item.quantity,
          });
           amount += product.offerPrice * item.quantity;  
             }

          amount += Math.floor(amount * 0.02)
          
        //////////   //////////
        {/* let productData =[]
        let amount = await items.reduce(async (acc, item) => {
          const product = await Product.findById(item.product);
          productData.push({
            name:product.name,
            price:product.offerPrice,
            quantity:item.quantity,
          });
          return (await acc ) + product.offerPrice * item.quantity;
          
        },0)
        //// add tax charges (2%)
        amount += Math.floor(amount * 0.02);*/}
       

       const order = await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType:"Online",
        });


        // stripe  gateway initialize 
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY) ;
        
        ////create item items for stripe
        const line_items = productData.map((item)=>{
          return{
            price_data:{
              currency: "usd",
              product_data:{
                name:item.name,
              },
              unit_amount: Math.floor(item.price + item.price * 0.02) * 100
            },
            quantity: item.quantity,
          }
        })
           /// create session
           const session = await stripeInstance.checkout.sessions.create({
              line_items,
              mode: "payment",
              success_url:`${origin}/loader?next=my-orders`,
              cancel_url:`${origin}/cart`,
              metadata:{
                orderId: order._id.toString(),
                userId,
              }     
            })

        return res.json({success: true , url: session.url})

  } catch (error) {
      return res.json({success: true , message: error.message })  
  }
}




{/*import Order from "../Modles/Order.js";
import Product from "../Modles/Product.js";
import User from "../Modles/User.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.json({
          success: false,
          message: "Product not found",
        });
      }

      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return res.json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};*/}