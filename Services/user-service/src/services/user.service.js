const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function register(userName, userEmail, userPassword, userMobileNo, userAddress) {
    const hashed = await bcrypt.hash(userPassword, 10);
    return User.create({ userName, userEmail, userPassword: hashed, userMobileNo, userAddress });
}

async function login(userEmail, userPassword) {
    const user = await User.findOne({ userEmail });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(userPassword, user.userPassword);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id, userEmail }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return {
        message: "Login successful",
        user: {
            _id: user._id,
            userName: user.userName,
            userEmail: user.userEmail,
        },
        token
    };
}

module.exports = { register, login };
