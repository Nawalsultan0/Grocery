

import express from 'express'
import AuthUser from '../Middleware/AuthUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../Controllers/orderController.js';
import authSeller from '../Middleware/authSeller.js';

const orderRouter = express.Router();
orderRouter.post('/cod',AuthUser,placeOrderCOD)
orderRouter.get('/user',AuthUser,getUserOrders)
orderRouter.get('/seller',authSeller,getAllOrders)

export default orderRouter