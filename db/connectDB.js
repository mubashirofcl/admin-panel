const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/userAuth");
        console.log("---------------MongoDB connected---------------");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB
