const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("User DB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

module.exports = app;
