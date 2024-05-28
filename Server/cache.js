/*const redis = require('redis');
require('dotenv').config();

const connectCache = () => {
  const client = redis.createClient({
    url: process.env.REDIS_URL, // Ensure REDIS_URL is defined in your .env file
  });

  client.on('error', (err) => {
    console.error('Redis error:', err);
  });

  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  return client;
};

module.exports = connectCache;*/
