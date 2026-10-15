// event-bus/publisher.js
const { connectRabbitMQ } = require("./rabbitmq");

async function publishEvent(queue, message) {
    const channel = await connectRabbitMQ();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true,
    });
    console.log(` Event published to ${queue}:`, message);
}

module.exports = { publishEvent };
