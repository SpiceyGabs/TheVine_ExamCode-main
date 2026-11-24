
const YOUTUBE_API_KEY = 'AIzaSyC22QiY9Wl40aJ0pWf9XIi08BlnxAxDNxw';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

async function fetchVideos(category) {
    const parameters = new URLSearchParams({
        part: "snippet",
        type: "video",
        maxResults: "6",
        q: category,
        safeSearch: "strict",
        regionCode: "ZA",
        key: youtubeApiKey
    });

    const response = await fetch(
        `${youtubeBaseUrl}/search?${parameters}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Unable to load videos.");
    }

    return data.items.filter(item => item.id?.videoId);
}

function renderVideos(videos) {
    const mediaGrid = document.getElementById("mediaGrid");

    mediaGrid.replaceChildren();

    videos.forEach(video => {
        const card = document.createElement("article");
        card.className = "mediaCard";

        const thumbnail = document.createElement("img");
        thumbnail.className = "mediaThumb";
        thumbnail.src = video.snippet.thumbnails.medium.url;
        thumbnail.alt = "";
        thumbnail.loading = "lazy";

        const title = document.createElement("h3");
        title.textContent = video.snippet.title;

        const channel = document.createElement("p");
        channel.textContent = video.snippet.channelTitle;

        const link = document.createElement("a");
        link.className = "ctaButton";
        link.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Watch on YouTube";

        card.append(thumbnail, title, channel, link);
        mediaGrid.appendChild(card);
    });
}