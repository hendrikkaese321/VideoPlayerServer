const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const mongoDBUri = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/videoPlayerServerDB'; 
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Video schema definition
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

// Model for Video based on the schema
const Video = mongoose.model('Video', videoSchema);

// Function to add a new video
async function addVideo({ title, description, url }) {
  try {
    const newVideo = new Video({ title, description, url });
    const savedVideo = await newVideo.save();
    console.log('New video added:', savedVideo);
  } catch (error) {
    console.error('Error adding new video:', error.message);
  }
}

// Function to find a video by title
async function findVideoByTitle(title) {
  try {
    const video = await Video.findOne({ title: title });
    if (video) {
      console.log('Video found:', video);
    } else {
      console.log('Video not found:', title);
    }
  } catch (error) {
    console.error('Error finding video:', error.message);
  }
}

// Exposing the Video model and utility functions
module.exports = {
  Video,
  addVideo,
  findVideoByTitle
};