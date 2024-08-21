const mongoose = require('mongoose');
require('dotenv').config();
const mongoDBUri = process.env.MONGO_DB_URI;

mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.error('MongoDB connection error:', err.message));

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);

function addVideo({ title, description, url }) {
  const newVideo = new Video({
    title,
    description,
    url,
  });

  newVideo.save()
    .then(doc => console.log('New video added:', doc))
    .catch(err => console.error('Error adding new video:', err.message));
}

function findVideoByTitle(title) {
  Video.findOne({ title: title })
    .then(video => {
      if (video) {
        console.log('Video found:', video);
      } else {
        console.log('Video not found:', title);
      }
    })
    .catch(err => console.error('Error finding video:', err.message));
}

module.exports = Video;
module.exports.addVideo = addVideo;
module.exports.findVideoByTitle = findVideoByTitle;