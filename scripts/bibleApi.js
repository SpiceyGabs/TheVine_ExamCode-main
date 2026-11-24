async function fetchChapter(book, chapter) {
    const response = await fetch(
        `${bibleBaseUrl}/BSB/${book}/${chapter}.json`
    );

    if (!response.ok) {
        throw new Error("Unable to load Scripture.");
    }

    const data = await response.json();

    return data.chapter.content.filter(
        item => item.type === "verse"
    );
}

function extractVerseText(content) {
    return content.map(item =>
        typeof item === "string" ? item : item.text || ""
    ).join("");
}