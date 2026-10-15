const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    product: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
});

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: { type: [itemSchema], required: true },
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["PENDING", "CONFIRMED", "CANCELLED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
