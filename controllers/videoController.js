const mongoose = require('mongoose');
const Video = require('./videoModel');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const uploadVideo = async (req, res) => {
  const { title, description, url } = req.body;
  try {
    const video = new Video({
      title,
      description,
      url,
      views: 0, // Ensure this is part of your Video model.
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
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) {
      return res.status(404).json({ message: 'Video not found!' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
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
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found!' });
    }
    video.views = video.views + 1;
    await video.save();
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
  incrementVideoViews, // Exporting the new function.
};
```
```javascript
const express = require('express');
const router = express.Router();
const { uploadVideo, getAllVideos, getVideoById, updateVideo, deleteVideo, incrementVideoViews } = require('./yourControllerFile');

// existing endpoints
router.post('/videos', uploadVideo);
router.get('/videos', getAllVideos);
router.get('/videos/:id', getVideoById);
router.put('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);

// new endpoint for incrementing video views
router.post('/videos/:id/views', incrementVideoViews);

module.exports = router;