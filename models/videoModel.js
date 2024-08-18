const mongoose = require('mongoose');
require('dotenv').config();
const mongoDBUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});
const Video = mongoose.model('Video', videoSchema);
module.exports = Video;