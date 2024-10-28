function loadAndServeVideo(request, response) {
  const videoData = loadVideoData(request.videoId);
  const processedVideo = processVideo(videoData, request.userPreferences);
  serveVideo(processedVideo, response);
}

function loadVideoData(videoId) {
  const videoData = {};
  return videoData;
}

function processVideo(videoData, userPreferences) {
  const processedVideo = {};
  return processedVideo;
}

function serveVideo(video, response) {
}