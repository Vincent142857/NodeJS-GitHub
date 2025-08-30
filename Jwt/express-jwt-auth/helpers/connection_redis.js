const { createClient } = require('redis');

const client = createClient({
  url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

client.on("connect", ()=> console.log(`Redis is connecting`));
client.on("ready", () => console.log(`Redis is ready`));

module.exports = client;