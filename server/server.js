   import cookieParser from 'cookie-parser';
   import express from 'express';
   import cors from 'cors'
   import 'dotenv/config' 
   import ConnectDB from './Configs/DB.js';
   import userRouter from './Routes/userRouter.js';
import sellerRoutes from './Routes/sellerRoutes.js';
import ConnectCloudinary from './Configs/Cloudinary.js';
import ProductRoute from './Routes/ProductRoute.js';
import cartRoute from './Routes/cartRoute.js';
import addressRoute from './Routes/addressRoute.js';
import orderRouter from './Routes/orderRoute.js';

   const app = express();
   const port = process.env.PORT || 4000;
   await ConnectDB()
   await ConnectCloudinary();
  
   /////// Allow multiple origin ///////
   const allowedOrigins ='http://localhost:5173'
   ////Middleware configuration ////////////
   app.use(cors({
      origin:allowedOrigins,
      credential:true,
       
    },

   ));



   /// ✅ Manual fix for preflight requests (CORS OPTIONS)

   app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});




   app.use(express.json());
   app.use(cookieParser());

   app.get('/', (req,res)=> res.send("API is Working"));

   //////routes   ///////
   app.use('/api/user', userRouter)
   app.use('/api/seller',sellerRoutes)
   app.use('/api/product',ProductRoute)
   app.use('/api/cart', cartRoute )
   app.use('/api/address', addressRoute )
   app.use('/api/order',orderRouter)

   
   app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
   })