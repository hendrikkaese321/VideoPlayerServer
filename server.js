const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
});

const Video = mongoose.model('Video', videoSchema);

app.get('/videos', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

app.post('/videos', async (req, res) => {
  const newVideo = new Video(req.body);
  await newVideo.save();
  res.status(201).send('Video added');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});