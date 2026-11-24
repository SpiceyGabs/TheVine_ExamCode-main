document.addEventListener("DOMContentLoaded", async function () {
    const mapSection = document.getElementById("mapSection");
    const mapStatus = document.getElementById("mapStatus");

    setSectionState(mapSection, "success");

    initialiseMap(
        defaultLocation.latitude,
        defaultLocation.longitude
    );

    try {
        mapStatus.textContent = "Finding churches...";

        const churches = await fetchChurches(
            defaultLocation.latitude,
            defaultLocation.longitude
        );

        renderChurches(churches);

        mapStatus.textContent = churches.length
            ? `${churches.length} churches found.`
            : "No churches found.";

    } catch (error) {
        console.error(error);
        mapStatus.textContent = "Church locations are currently unavailable.";
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const section = document.getElementById("mediaSection");
    const filter = document.getElementById("mediaFilter");
    const status = document.getElementById("mediaStatus");
    const refresh = document.getElementById("refreshMediaBtn");
    const retry = document.getElementById("retryMediaBtn");

    async function loadMedia() {
        if (filter.disabled) return;

        setSectionState(section, "loading");

        filter.disabled = true;
        refresh.disabled = true;
        status.textContent = "Finding videos...";

        try {
            const videos = await fetchVideos(filter.value);

            if (!videos.length) {
                setSectionState(section, "empty");
                status.textContent = "No videos found.";
                return;
            }

            renderVideos(videos);

    setSectionState(section, "success");
       status.textContent = `${videos.length} videos found.`;
          if (window.gsap &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    gsap.from(".mediaCard", {
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "transform,opacity"
    });
}

        } catch (error) {
            console.error(error);

            setSectionState(section, "error");
            status.textContent = "Unable to load videos.";

        } finally {
            filter.disabled = false;
            refresh.disabled = false;
        }
    }

    filter.addEventListener("change", loadMedia);
    refresh.addEventListener("click", loadMedia);
    retry.addEventListener("click", loadMedia);

    loadMedia();
});
// Upcoming Gatherings

document.addEventListener("DOMContentLoaded", function () {
    const eventFilter = document.getElementById("eventFilter");
    const eventStatus = document.getElementById("eventStatus");

    const eventMessages = {
        all: "No upcoming events listed in your area.",
        worship: "No upcoming worship services listed in your area.",
        bibleStudy: "No upcoming Bible study gatherings listed in your area.",
        youth: "No upcoming youth gatherings listed in your area.",
        outreach: "No upcoming outreach events listed in your area."
    };

    eventFilter.addEventListener("change", function () {
        eventStatus.textContent = eventMessages[eventFilter.value];
    });
});