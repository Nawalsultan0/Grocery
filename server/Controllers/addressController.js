


///Add Address :/api/address/add

import { get } from "mongoose"
import Address from "../Modles/Address.js"

export const addAdress = async (req,res) => {
    try {
        const userId = req.userId
        const {address}= req.body
        await Address.create({...address},userId)
        res.json({success:true, message:"Addrss Added successfully"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


// get Address :/api/address/get

export const getAddress = async (req,res)=>{
    try {
        const userId = req.userId
        const addresses = await Address.findById(userId)
        res.json({success:true, addresses})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}