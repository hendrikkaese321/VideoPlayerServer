const express = require('express');
const router = express.Router();
const videoController = require('./videoController');

router.post('/upload', videoController.uploadVideo);

router.put('/update/:id', videoController.updateVideo);

router.delete('/delete/:id', videoController.deleteVideo);

router.get('/videos', videoController.getAllVideos);

router.get('/video/:id', videoController.getVideoById);

module.exports = router;