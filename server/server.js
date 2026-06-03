   import cookieParser from 'cookie-parser';
   import express from 'express';
   import cors from 'cors'
   import 'dotenv/config' 
   import orderRouter from './Routes/orderRoute.js';
   import ConnectDB from './Configs/DB.js';
   import userRouter from './Routes/userRouter.js';
   import sellerRoutes from './Routes/sellerRoutes.js';
   import ConnectCloudinary from './Configs/Cloudinary.js';
   import ProductRoute from './Routes/ProductRoute.js';
   import cartRoute from './Routes/cartRoute.js';
   import addressRoute from './Routes/addressRoute.js';
import { stripeWebhooks } from './Controllers/orderController.js';


   const app = express();
   const port = process.env.PORT || 4000;
   await ConnectDB()
   await ConnectCloudinary();
     
   /////// Allow multiple origin ///////
   const allowedOrigins = [
     process.env.CLIENT_ORIGIN || 'http://localhost:5173',
     'https://greencart-one-brown.vercel.app'
   ];
    
   app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)


   ////Middleware configuration ////////////
   app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('CORS policy: Origin not allowed'));
        }
      },
      credentials:true
    }));


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

   if (process.env.VERCEL !== '1') {
     app.listen(port,()=>{
       console.log(`server is running on http://localhost:${port}`)
     })
   }

export default app;