const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: { type: String, enum: ["active", "blocked"], default: "active" } 

}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
