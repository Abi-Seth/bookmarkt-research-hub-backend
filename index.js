const express = require('express');
const scheduler = require('./scheduler');
require('dotenv').config()

const app = express();

// Schedule initial and regular jobs
scheduler.scheduleJobs();

// Start the Express server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
