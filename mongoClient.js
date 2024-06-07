const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(
        () => console.debug(`[${new Date().toJSON()}] :: Database Instance Connected`))
    .catch(
        error => `Couldn't Connect Database: ${error.message || 'Something went wrong!'}`)

const PaperSchema = new mongoose.Schema({
    paperId: String,
    title: String,
    abstract: String,
    authors: Array,
    year: Number,
    // Add other relevant fields
});

const Paper = mongoose.model('Paper', PaperSchema);

module.exports = Paper;
