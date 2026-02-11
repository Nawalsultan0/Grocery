import express from 'express'
import User from "../Modles/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


////Register user: /api/user/register
export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name|| !email || !password){
            return res.json({success:false, message:'Missing details'})
        }
        const existinguser= await User.findOne({email})
         
        if(existinguser)
            return res.json({success:false,message:'User Already exist'})
        
 
        const  hashedpassword = await bcrypt.hash(password,10);
         
         const user = await User.create({name:name.trim(),email:email.trim(),
            password:hashedpassword});
         user.save();
         
              
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'}) 

        res.cookie('token',token,{
        httpOnly:true, ///prevent JavaScript to access cookies  
        secure:process.env.NODE_ENV === 'production', ///use secure cookies in production 
        sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
        ///help us secure from CSRF prodduction////
        maxAge:7*24*60*1000 ///cookie expiration date
        })
         
       return res.json({success:true, user:{name: user.name,email: user.email}});
       } catch (error) {

        console.log(error.message);
         res.json({success:false,message:error.message})
     }
} 


/////Login User: /api/user/login

export const login = async(req,res)=>{
    try {
        const {email,password} =req.body;
        if(!email||!password)
            return res.json({success:false,message:"Email and password are required"});
           const user = await User.findOne({email});
           if(!user){
            return res.json({success:false,message:"Invalid Email and password"});
           }
           const isMatch = await bcrypt.compare(password,user.password)

           if(!isMatch){
            return res.json({success:false,message:"Invalid Email and password"})
           }
            const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'}) 

          res.cookie('token',token,{
          httpOnly:true, ///prevent JavaScript to access cookies  
         secure:process.env.NODE_ENV === 'production', ///use secure cookies in production 
         sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
        ///help us secure from CSRF prodduction////
        maxAge:7 * 24 * 60 * 1000, ///cookie expiration date
        })
         
       return res.json({success:true, user:{name: user.name,email: user.email},});


    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}


////check Auth :/api/user/is-auth
export const Auth = async(req,res)=>{
try{
    const userId= req.userId;
    ////select userid to remove password  data 
    const user = await User.findById(userId).select("-password")
    return res.json({success:true,user});

} catch (error) {
    console.log(error.message);
    res.json({success:true,message:error.message});
}
}


/////logOut user: /api/user/logout

export const logOut = async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
        });
        return res.json({success:true,message:"Logged Out"})
    } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message});
    }
}


/////