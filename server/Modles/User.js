import mongoose, { Types } from "mongoose";


const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
},
  email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
  cardItems:{
    type:Object,
     default:{}
},


/////////user data with empty object /////////////////
},{minimize:false})

const User = mongoose.models.user  || mongoose.model('user',userSchema)

export default User;