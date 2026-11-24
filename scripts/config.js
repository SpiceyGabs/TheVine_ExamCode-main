const bibleBaseUrl = "https://bible.helloao.org/api";
const overpassUrl = "https://overpass.kumi.systems/api/interpreter";
const mapTileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const youtubeBaseUrl = "https://www.googleapis.com/youtube/v3";
const youtubeApiKey = "AIzaSyC22QiY9Wl40aJ0pWf9XIi08BlnxAxDNxw";
const defaultLocation = {
  latitude: -26.2041,
  longitude: 28.0473,
  zoom: 12
}
;

const storageKeys = {
  theme: "theme",
  dyslexia: "dyslexia",
  profile: "vineProfile",
  notes: "vineNotes",
  bookmarks: "vineBookmarks",
  readingHistory: "vineReadingHistory",
  lastChapter: "vineLastChapter"
}
;