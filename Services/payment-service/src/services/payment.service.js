const { publishEvent } = require("../../../../Services/event-bus/publisher");
const { subscribeEvent } = require("../../../../Services/event-bus/subscriber");


subscribeEvent("ORDER_CREATED", async (data) => {
    console.log("Processing payment for order:", data.orderId);
    const success = Math.random() > 0.5;

    if (success) {
        await publishEvent("PAYMENT_SUCCESS", { orderId: data.orderId });
    } else {
        await publishEvent("PAYMENT_FAILED", { orderId: data.orderId });
    }
});
