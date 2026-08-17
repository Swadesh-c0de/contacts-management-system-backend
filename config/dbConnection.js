import mongoose from 'mongoose';

let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    try {
        if (!process.env.CONNECTION_STRING) {
            throw new Error("CONNECTION_STRING environment variable is not defined");
        }
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        cachedConnection = connect;
        console.log("Database connected:", connect.connection.host, connect.connection.name);
        return connect;
    } catch (err) {
        console.error("Database connection failed:", err.message);
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
        throw err;
    }
};

export default connectDB;