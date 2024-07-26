const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

function logServerMessage(message) {
    console.log(`[${new Date().toISOString()}]: ${message}`);
}

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => logServerMessage('MongoDB Connected'))
.catch(err => logServerMessage(`MongoDB Connection Error: ${err}`));

const videoSchema = new mongoose.Schema({
    title: String,
    url: String,
    description: String,
});

const VideoModel = mongoose.model('Video', videoSchema);

app.get('/videos', async (req, res) => {
    try {
        const videos = await VideoModel.find();
        logServerMessage('Fetching all videos');
        res.json(videos);
    } catch (err) {
        logServerMessage(`Error fetching videos: ${err}`);
        res.status(500).send('Error fetching videos');
    }
});

app.post('/videos', async (req, res) => {
    try {
        const newVideo = new VideoModel(req.body);
        await newVideo.save();
        logServerMessage('Adding new video');
        res.status(201).send('Video added');
    } catch (err) {
        logServerMessage(`Error adding new video: ${err}`);
        res.status(500).send('Error adding video');
    }
});

app.use((expressError, req, res, next) => {
    logServerMessage(`Express error: ${expressError.stack}`);
    res.status(500).send('Server encountered an internal error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { logServerMessage(`Server is running on port ${PORT}`); });