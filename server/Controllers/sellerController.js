

/// LOgin of  seller  /api/seller/login

import jwt from "jsonwebtoken";


export const sellerLogin = async (req,res)=>{

    try {
        const {email,password}=req.body;
        if(password === process.env.SELLER_PASSWORD && email === process.env.SECRET_EMAIL){
            const token = jwt.sign({email},process.env.JWT_SECRET, {expiresIn:'7d'});
            
          res.cookie('sellerToken',token,{
          httpOnly:true, ///prevent JavaScript to access cookies  
         secure:process.env.NODE_ENV === 'production', ///use secure cookies in production 
         sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
        ///help us secure from CSRF prodduction////
        maxAge:7 * 24 * 60 * 1000, ///cookie expiration date
        });
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
        res.clearCookie('sellerToken',{
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

