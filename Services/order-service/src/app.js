const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const orderRoutes = require("./routes/order.routes");

const app = express();
app.use(express.json());
app.use("/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(" Order DB connected"))
    .catch(err => console.error(" MongoDB connection error:", err));

module.exports = app;
