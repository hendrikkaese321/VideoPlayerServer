function loadAndServeVideo(request, response) {
  let videoData = loadVideoData(request.videoId);
  let processedVideo = processVideo(videoData, request.userPreferences);
  serveVideo(processedVideo, response);
}

function loadVideoData(videoId) {
  return videoData;
}

function processVideo(videoData, userPreferences) {
  return processedVideo;
}

function serveVideo(video, response) {
}