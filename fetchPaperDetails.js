const axios = require('axios');
const redis = require('./redisClient');
const Paper = require('./mongoClient');
const Bottleneck = require('bottleneck');

// Create a Bottleneck limiter
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 86400000 / 1000 // 1000 requests per 86400000ms (1 day)
});

// Wrap the axios.get function with the limiter
const limitedAxiosGet = limiter.wrap(axios.get);

async function fetchPaperDetails(paperId) {
    const cacheKey = `paper:${paperId}`;
    const cachedPaper = await redis.get(cacheKey);

    if (cachedPaper) {
        console.log('Cache hit');
        return JSON.parse(cachedPaper);
    }

    const response = await limitedAxiosGet(`https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=title,abstract,authors,year`);
    const paperData = response.data;

    const paper = new Paper(paperData);
    await paper.save();

    await redis.set(cacheKey, JSON.stringify(paperData), 'EX', 60 * 60 * 24); // Cache for 24 hours

    return paperData;
}

module.exports = fetchPaperDetails;
