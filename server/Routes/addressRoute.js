import express from "express"
import AuthUser from "../Middleware/AuthUser.js";
import { addAdress, getAddress } from "../Controllers/addressController.js";

const addressRoute=express.Router();
addressRoute.post('/add',AuthUser, addAdress)
addressRoute.get('/get',AuthUser, getAddress)

export default addressRoute