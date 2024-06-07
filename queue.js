const { Queue, Worker } = require('bullmq');
const redis = require('./redisClient');
const fetchPaperDetails = require('./fetchPaperDetails');

const paperQueue = new Queue('paperQueue', { connection: redis });

const worker = new Worker('paperQueue', async job => {
    await fetchPaperDetails(job.data.paperId);
}, { connection: redis });

module.exports = paperQueue;
