const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

function logMessage(message) {
  console.log(`[${new Date().toISOString()}]: ${message}`);
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => logMessage('MongoDB Connected'))
.catch(err => logMessage(`MongoDB Connection Error: ${err}`));

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
});

const Video = mongoose.model('Video', videoSchema);

app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    logMessage('Fetching all videos');
    res.json(videos);
  } catch (err) {
    logMessage(`Error fetching videos: ${err}`);
    res.status(500).send('Error fetching videos');
  }
});

app.post('/videos', async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    await newVideo.save();
    logMessage('Adding new video');
    res.status(201).send('Video added');
  } catch (err) {
    logMessage(`Error adding new video: ${err}`);
    res.status(500).send('Error adding video');
  }
});

app.use((err, req, res, next) => {
  logMessage(`Express error: ${err.stack}`);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { logMessage(`Server is running on port ${PORT}`); });