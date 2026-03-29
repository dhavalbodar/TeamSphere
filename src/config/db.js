const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        retryWrites: true,
        w: "majority"
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;