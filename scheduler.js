const cron = require('node-cron');
const paperQueue = require('./queue');
const axios = require('axios');

const API_CALLS_PER_HOUR = Math.floor(1000 / 24);

async function scheduleJobs() {
  try {
    const response = await axios.get(`https://api.semanticscholar.org/graph/v1/paper/search?query=latest&limit=${API_CALLS_PER_HOUR}`);
    const papers = response.data.data;

    for (const paper of papers) {
      await paperQueue.add('fetchPaper', { paperId: paper.paperId });
    }
  } catch (error) {
    console.error('Error fetching paper details:', error);
  }
}

// Schedule jobs to run every hour
cron.schedule('0 * * * *', () => {
  scheduleJobs();
});

module.exports = { scheduleJobs };
