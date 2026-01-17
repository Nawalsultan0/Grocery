import jwt from "jsonwebtoken";


const AuthUser = async (req, res, next)=>{
  
       const token= req.cookies?.token;

    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"});
    }
    
    //////decode token to get the id ///////////////
    try {
        ////get varaible token decode //////////
        const tokenDecode= jwt.verify(token,process.env.JWT_SECRET)
        
        
        if(tokenDecode.id){
            req.userId=tokenDecode.id;
        }else{
        return res.json({success:false,message:"Not Authorized"});
    }
   
    next();

    } catch (error) {
     res.json({success:false,message:error.message});
    }


}

export default AuthUser;
