// redisClient.js
const { Redis } = require('@upstash/redis');
require('dotenv').config();

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

(async () => {
  try {
    console.log("Redis Connected");
  } catch (error) {
    console.error('Error:', error);
  }
})();
