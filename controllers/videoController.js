const mongoose = require('mongoose');
const Video = require('./videoModel');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.error("MongoDB connection error: ", error));

const uploadVideo = async (req, res) => {
  const { title, description, url } = req.body;

  if (!title || !description || !url) {
    return res.status(400).json({ message: "Please provide title, description, and URL for the video." });
  }

  try {
    const video = new Video({
      title,
      description,
      url,
      views: 0,
    });
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVideoById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid video ID." });
  }

  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found!' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVideo = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid video ID." });
  }

  const updates = req.body;

  try {
    const video = await Video.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!video) {
      return res.status(404).json({ message: 'Video not found!' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid video ID." });
  }

  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found!' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const incrementVideoViews = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid video ID." });
  }

  try {
    const video = await Video.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } }, { new: true });
    if (!video) {
      return res.status(404).json({ message: 'Video not found!' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  incrementVideoViews,
};

const express = require('express');
const router = express.Router();
const {
  uploadVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  incrementVideoViews,
} = require('./yourControllerFile');

router.post('/videos', uploadVideo);
router.get('/videos', getAllVideos);
router.get('/videos/:id', getVideoById);
router.put('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);
router.post('/videos/:id/views', incrementVideoViews);

module.exports = router;