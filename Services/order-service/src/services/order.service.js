const Order = require("../models/order.model");
const { publishEvent } = require("../../../../Services/event-bus/publisher");
const { subscribeEvent } = require("../../../../Services/event-bus/subscriber");

async function createOrder(userId, items) {
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = new Order({
        userId,
        items,
        totalAmount,
        status: "PENDING",
    });

    await order.save();

    await publishEvent("ORDER_CREATED", {
        orderId: order._id,
        userId,
        items,
        totalAmount,
    });

    return order;
}

async function getOrderById(id) {
    return Order.findById(id);
}

async function updateOrder(id, data) {
    return Order.findByIdAndUpdate(id, data, { new: true });
}

subscribeEvent("PAYMENT_SUCCESS", async (data) => {
    await Order.findByIdAndUpdate(data.orderId, { status: "CONFIRMED" });
    console.log("Order confirmed:", data.orderId);
});

subscribeEvent("PAYMENT_FAILED", async (data) => {
    await Order.findByIdAndUpdate(data.orderId, { status: "CANCELLED" });
    console.log(" Order cancelled:", data.orderId);
});

module.exports = {
    createOrder,
    getOrderById,
    updateOrder,
};
