
import User from "../Modles/User.js"


/// Update  User CartData : /api/cart/update

export  const updateCart =async (req,res)=>{
    try {
        const userId = req.userId;
        const {cardItems} = req.body;        

       const updatedUser=await User.findByIdAndUpdate(userId,{cardItems},{new:true})

       // 2. Add a check to make sure the user exists
        if (!updatedUser) {
            return res.json({ success: false, message: "User not found" });
        }
        
         return res.json(
            { success:true,
             message:"Cart updated",
            cart: updatedUser.cardItems })
        
        } catch (error) {
        console.log("Error in update Cart:", error.message);
         return res.json({success:true, message: error.message})
    }
}