import amqplib from "amqplib";

import { RABBITMQ_URL } from "../../config";

export const connectRabbitMQ = async () => {
  const connect = await amqplib.connect(RABBITMQ_URL);
  const channel = await connect.createChannel();
  return { connect, channel };
};
