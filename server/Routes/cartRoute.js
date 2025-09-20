import mongoose from "mongoose"
import AuthUser from "../Middleware/AuthUser.js";
import { updateCart } from "../Controllers/cartController.js";
import express from 'express'

const cartRoute = express.Router();

cartRoute.post('/update',AuthUser , updateCart)

export default cartRoute