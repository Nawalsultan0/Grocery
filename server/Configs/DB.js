import mongoose from "mongoose";

const  ConnectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>
        console.log("database is connected")
        );
       
        await mongoose.connect(`${process.env.MONGODB_URI}/greencart`)

    } catch (error) {
        console.error(error.message);
    }
} 
export default ConnectDB;