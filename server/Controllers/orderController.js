



import Order from "../Modles/Order.js";
import Product from "../Modles/Product.js";



/// place order COD :/api/order/cod
export const placeOrderCOD = async (req,res) => {
    try {
        const userId=req.userId;
        const { items ,address}= req.body;
        if(!address || items.length === 0){
            return res.json({success:false, message:"Invalid data"})
        }
      
        ////calculate Amount using Items 
        let amount = await items.reduce(async (acc, item) => {
           const product = await Product.findById(item.product);
           return(await acc)+product.offerPrice*item.quantity;  
        },0)
         
        /// Add tax 
        amount +=Math.floor(amount * 0.02)

      await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType:"COD",
      });
       await User.findByIdAndUpdate(userId, { cartItems: {} });
      return res.json({success:true, message:"Order Placed Successsfully"})
    } 
catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
}

// get order detail of the by user Id : / api/order/user
export const getUserOrders  = async (req, res) => {
    try {
        const userId= req.userId;
        const {orders} = await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({ createdAt:-1 });
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