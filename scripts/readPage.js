document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("scriptureSection");
  const book = document.getElementById("bookSelect");
  const chapter = document.getElementById("chapterSelect");
  const left = document.getElementById("bookPageLeft");
  const right = document.getElementById("bookPageRight");
  const previous = document.getElementById("prevChapterBtn");
  const next = document.getElementById("nextChapterBtn");
  const status = document.getElementById("readerStatus");

  function populateChapters() {
    const total = book.value === "PSA" ? 150 : 31;

    chapter.replaceChildren();

    for (let i = 1; i <= total; i++) {
      chapter.add(new Option(i, i));
    }

     chapter.value = "1";
  }

  async function loadChapter() {
      if (book.disabled) return;
    setSectionState(section, "loading");

    book.disabled = true;
    chapter.disabled = true;
    status.textContent = "Loading Scripture...";

    try {
      const verses = await fetchChapter(book.value, chapter.value);

      if (!verses.length) {
        setSectionState(section, "empty");
        status.textContent = "No verses found.";
        return;
      }

      left.replaceChildren();
      right.replaceChildren();

      verses.forEach((verse, index) => {
        const paragraph = document.createElement("p");
        paragraph.className = "verseLine";

        const number = document.createElement("sup");
        number.className = "verseNumber";
        number.textContent = verse.number;

        paragraph.append(
          number,
          " " + extractVerseText(verse.content)
        );

        const page = index < Math.ceil(verses.length / 2)
          ? left : right;

        page.appendChild(paragraph);
      });

      document.getElementById("chapterTitle").textContent =
        `${book.options[book.selectedIndex].text} ${chapter.value}`;

      document.getElementById("translationName").textContent =
        "Berean Standard Bible";

      document.getElementById("chapterIndicator").textContent =
        `${chapter.value} of ${chapter.options.length}`;

      previous.disabled = Number(chapter.value) === 1;
      next.disabled = Number(chapter.value) === chapter.options.length;

      left.scrollTop = 0;
      right.scrollTop = 0;
      
      setSectionState(section, "success");

      // GSAP IF STATEMENT
      if (window.gsap &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    gsap.from("#bookSpread", {
        scale: 0.92,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "transform,opacity"
    });

    gsap.fromTo("#bookPageRight", {
    rotationY: -80,
    opacity: 0.4
}, {
    rotationY: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    clearProps: "transform,opacity"
});
}
      status.textContent = "Scripture loaded.";

    } catch (error) {
      console.error(error);
      setSectionState(section, "error");
      status.textContent = "Unable to load Scripture.";

    } finally {
      book.disabled = false;
      chapter.disabled = false;
    }
  }

  book.addEventListener("change", function () {
    populateChapters();
    loadChapter();

  });

  chapter.addEventListener("change", loadChapter);

  previous.addEventListener("click", function () {
    if (chapter.selectedIndex > 0) {
        chapter.selectedIndex--;
        loadChapter();
    }
});

  next.addEventListener("click", function () {
    if (chapter.selectedIndex < chapter.options.length - 1) {
        chapter.selectedIndex++;
        loadChapter();
    }
  });

  document.getElementById("retryScriptureBtn")
    .addEventListener("click", loadChapter);

  document.getElementById("refreshScriptureBtn")
    .addEventListener("click", loadChapter);

  populateChapters();
  loadChapter();
});