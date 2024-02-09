import mongoose from 'mongoose';

let isConnected:boolean =false;

export const connectToDatabase = async()=>{
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URL) return console.log("no mongo url")

    if(isConnected){
        return console.log("Mongo is already connected")
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected=true;
        console.log("database connected")
    }catch(error){
        console.log("mogodb connection failed", error)
    }
}
