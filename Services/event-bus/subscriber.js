// event-bus/subscriber.js
const { connectRabbitMQ } = require("./rabbitmq");

async function subscribeEvent(queue, callback) {
    const channel = await connectRabbitMQ();
    await channel.assertQueue(queue, { durable: true });

    console.log(` Listening on queue: ${queue}`);

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            try {
                const content = JSON.parse(msg.content.toString());
                await callback(content);

                channel.ack(msg);
            } catch (err) {
                console.error(`Error processing event from ${queue}:`, err);
                channel.nack(msg, false, false);
            }
        }
    });
}

module.exports = { subscribeEvent };
