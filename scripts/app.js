
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

async function fetchChristianMedia() {
    const params = new URLSearchParams({
        part: 'snippet',
        q: 'Christian gospel music sermon',
        type: 'video',
        maxResults: 6,
        key: YOUTUBE_API_KEY

        });

    try {
        const response = await fetch(`${YOUTUBE_API_URL}?${params}`);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        renderYouTubeVideos(data.items);

    } catch (error) {
        console.error('YouTube API Error:', error);
        document.getElementById('youtubeErrorState').style.display = 'block';
    }
}

function renderYouTubeVideos(videos) {
    const container = document.getElementById('youtubeMediaGrid');
    container.innerHTML = '';         // Clear loading state

    if (!videos || videos.length === 0) {
        container.innerHTML = '<p>No media found at this time.</p>';
        return;
    }

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const snippet = video.snippet;

        const videoCard = document.createElement('div');
        videoCard.className = 'mediaCard';

        videoCard.innerHTML = `
            <img src="${snippet.thumbnails.medium.url}" alt="${snippet.title}">
            <h3>${snippet.title}</h3>
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer">Watch Video</a>
        `;

        container.appendChild(videoCard);
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchChristianMedia);