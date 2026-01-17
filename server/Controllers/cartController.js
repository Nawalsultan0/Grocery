
import User from "../Modles/User.js"


/// Update  User CartData : /api/cart/update

export  const updateCart =async (req,res)=>{
    try {
        const userId = req.params.userId;
        const {cartItems} = req.body;
        await User.findByIdAndUpdate(userId,{cartItems})
        res.json({ success:true,message:"Cart updated" })
    } catch (error) {
        console.log(error.message)
         res.json({success:true, message: error.message})
    }
}