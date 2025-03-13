import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const fetchVideos = async () => {
    try {
        const response = await axios.get(`${BASE_API_URL}/videos`);
        displayVideos(response.data);
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
};

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = '';
    videos.forEach(video => {
        const videoElement = document.createElement('video');
        videoElement.src = video.url;
        videoElement.controls = true;
        videosContainer.appendChild(videoElement);
    });
};

const uploadVideo = async (videoFile) => {
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
        await axios.post(`${BASE_API_URL}/videos/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        fetchVideos();
    } catch (error) {
        console.error('Error uploading video:', error);
    }
};

const updateVideo = async (videoId, updatedData) => {
    try {
        await axios.put(`${BASE_API_URL}/videos/${videoId}`, updatedData);
        fetchVideos();
    } catch (error) {
        console.error('Error updating video:', error);
    }
};

const deleteVideo = async (videoId) => {
    try {
        await axios.delete(`${BASE_API_URL}/videos/${videoId}`);
        fetchVideos();
    } catch (error) {
        console.error('Error deleting video:', error);
    }
};

const setupEventListeners = () => {
    const uploadInput = document.getElementById('upload-input');
    uploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            uploadVideo(file);
        }
    });
};

const init = () => {
    fetchVideos();
    setupEventListeners();
};

document.addEventListener('DOMContentLoaded', init);