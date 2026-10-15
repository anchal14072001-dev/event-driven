const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { type: String, },
    userEmail: { type: String, unique: true },
    userPassword: { type: String },
    userMobileNo: { type: String },
    userAddress: { type: String },
});

module.exports = mongoose.model("User", userSchema);
