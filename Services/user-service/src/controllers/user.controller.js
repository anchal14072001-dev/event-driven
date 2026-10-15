const userService = require("../services/user.service");
const User = require("../models/user.model");

async function register(req, res) {
    try {
        const { userName, userEmail, userPassword, userMobileNo, userAddress } = req.body;



        const existingUser = await User.findOne({ userEmail: userEmail });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await userService.register(
            userName,
            userEmail,
            userPassword,
            userMobileNo,
            userAddress
        );
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const { userEmail, userPassword } = req.body;
        const data = await userService.login(userEmail, userPassword);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { register, login, getUsers, getUserById };
