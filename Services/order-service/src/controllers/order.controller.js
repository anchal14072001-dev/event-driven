const orderService = require("../services/order.service");

async function create(req, res) {
    try {
        const order = await orderService.createOrder(req.user.id, req.body.items);
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { create, getById, update };