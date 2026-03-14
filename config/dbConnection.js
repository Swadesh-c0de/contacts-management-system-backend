import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // console.log(process.env.CONNECTION_STRING);
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    } catch(err) {
        console.log("Database connection failed:", err);
    }
}

export default connectDB;