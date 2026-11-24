// Animation 1
document.addEventListener("DOMContentLoaded", function () {
    if (!window.gsap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heroTimeline = gsap.timeline();

    heroTimeline
        .from(".heroVisual", {
            opacity: 0,
            x: 50,
            duration: 1
        })
        .from(".heroContent > *", {
            opacity: 0,
            y: 30,
            duration: 0.7,
            stagger: 0.2
        }, "-=0.5");
});

// Animation 2
document.addEventListener("DOMContentLoaded", function () {
    if (!window.gsap || !window.ScrollTrigger) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".splitSection").forEach(function (section) {
        gsap.from(section.querySelector(".splitVisual img"), {
            scale: 1.12,
            duration: 1.4,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            }
        });

        gsap.from(section.querySelector(".splitContent"), {
            opacity: 0,
            y: 45,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            }
        });
    });
});