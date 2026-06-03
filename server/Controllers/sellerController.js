

/// LOgin of  seller  /api/seller/login

import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1' || process.env.VERCEL_ENV === 'production';
const sellerCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const sellerLogin = async (req,res)=>{

    try {
        const {email,password}=req.body;
        if(password === process.env.SELLER_PASSWORD && email === process.env.SECRET_EMAIL){
            const token = jwt.sign({email},process.env.JWT_SECRET, {expiresIn:'7d'});
            
          res.cookie('sellerToken',token,sellerCookieOptions)
        return res.json({success:true,message:'Logged In'});
        }
        else{
            return res.json({success:false,message:'Invalid Credentials'});
        }


    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message});
    }
}

///// seller authentication /api/seller/is-auth

export const issellerAuth = async(req,res)=>{
try{
   
    return res.json({success:true});

} catch (error) {
    console.log(error.message);
    res.json({success:true,message:error.message});
}
}

/////logOut seller: /api/seller/logout

export const sellerlogOut = async(req,res)=>{
    try {
        res.clearCookie('sellerToken', sellerCookieOptions);
        return res.json({success:true,message:"Logged Out"})
    } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message});
    }
}

