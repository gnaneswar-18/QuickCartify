import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
async function connectToMongoose(){
try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongoDb");

} catch (error) {
    console.log(error);
}
}
export default connectToMongoose