let churchMap;
let churchMarkers;

async function fetchChurches(latitude, longitude) {
  const query = `
    [out:json][timeout:25];
    nwr
      ["amenity"="place_of_worship"]
      ["religion"="christian"]
      (around:5000,${latitude},${longitude});
    out center;
  `;

  const response = await fetch(overpassUrl, {
    method: "POST",
    body: new URLSearchParams({ data: query })
  });

  if (!response.ok) {
    throw new Error("Church directory request failed.");
  }

  const data = await response.json();

  return data.elements
    .map(function (church) {
      return {
        id: `${church.type}-${church.id}`,
        name: church.tags?.name || "Unnamed church",
        denomination: church.tags?.denomination || "Christian",
        latitude: church.lat ?? church.center?.lat,
        longitude: church.lon ?? church.center?.lon
      };
    })
    .filter(function (church) {
      return Number.isFinite(church.latitude) &&
             Number.isFinite(church.longitude);
    });
}

function initialiseMap(latitude, longitude) {
  if (!churchMap) {
    churchMap = L.map("mapCanvas");

    L.tileLayer(mapTileUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(churchMap);

    churchMarkers = L.layerGroup().addTo(churchMap);
  }

  churchMap.setView([latitude, longitude], defaultLocation.zoom);
  churchMap.invalidateSize();
}

function renderChurches(churches) {
  const churchList = document.getElementById("churchList");

  churchList.replaceChildren();
  churchMarkers.clearLayers();

  churches.forEach(function (church) {
    const marker = L.marker([
      church.latitude,
      church.longitude
    ]).addTo(churchMarkers);

    const popup = document.createElement("div");

    const popupTitle = document.createElement("strong");
    popupTitle.textContent = church.name;

    const popupDescription = document.createElement("p");
    popupDescription.textContent = church.denomination;

    popup.append(popupTitle, popupDescription);

    marker.bindPopup(popup);

    const card = document.createElement("article");
    card.className = "churchCard";

    const title = document.createElement("h3");
    title.textContent = church.name;

    const description = document.createElement("p");
    description.textContent = church.denomination;

    const button = document.createElement("button");
    button.className = "ctaButton";
    button.type = "button";
    button.textContent = "View on Map";

    button.addEventListener("click", function () {
      churchMap.flyTo([
        church.latitude,
        church.longitude
      ], 16);

      marker.openPopup();
    });

    card.append(title, description, button);
    churchList.appendChild(card);
  });
}