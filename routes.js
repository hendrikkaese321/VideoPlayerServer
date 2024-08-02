const express = require('express');
const router = express.Router();
const videoController = require('./videoController');

// Wrapping async control to reduce boilerplate in route declarations
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.post('/upload', asyncHandler(videoController.uploadVideo));
router.put('/update/:id', asyncHandler(videoController.updateVideo));
router.delete('/delete/:id', asyncHandler(videoController.deleteVideo));
router.get('/videos', asyncHandler(videoController.getAllVideos));
router.get('/video/:id', asyncHandler(videoController.getVideoById));

// Unified error handling
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

module.exports = router;