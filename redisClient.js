const Redis = require('ioredis');

const redis = new Redis({
    maxRetriesPerRequest: null,
    enableReadyCheck: false
});

module.exports = redis;
