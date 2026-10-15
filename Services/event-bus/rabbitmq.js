const amqp = require("amqplib");

let connection, channel;

async function connectRabbitMQ(retries = 10, delay = 3000) {
    if (channel) return channel;

    // const amqpUrl = process.env.RABBITMQ_URL || "amqp://guest:guest@rabbitmq:5672";

    const amqpUrl = "amqp://guest:guest@localhost:5672";
    for (let i = 0; i < retries; i++) {
        try {
            connection = await amqp.connect(amqpUrl);
            channel = await connection.createChannel();
            console.log("Connected to RabbitMQ");
            return channel;
        } catch (err) {
            console.error(`RabbitMQ connection failed. Retry ${i + 1}/${retries} in ${delay / 1000}s`, err.message);
            await new Promise(r => setTimeout(r, delay));
        }
    }

    throw new Error("Failed to connect to RabbitMQ after multiple attempts");
}

async function closeRabbitMQ() {
    if (connection) {
        await connection.close();
        console.log("RabbitMQ connection closed");
    }
}

module.exports = { connectRabbitMQ, closeRabbitMQ };
