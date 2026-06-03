import mongoose from "mongoose";

const  ConnectDB = async ()=>{
    try {
        mongoose.connection.on('connected',() =>
            console.log("database is connected")
        );
        mongoose.connection.on('error', (err) =>
            console.error("MongoDB connection error:", err.message)
        );
        mongoose.connection.on('disconnected', () =>
            console.warn("MongoDB disconnected")
        );
       
        await mongoose.connect(`${process.env.MONGODB_URI}/greencart`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            bufferTimeoutMS: 30000,
        });

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
} 
export default ConnectDB;