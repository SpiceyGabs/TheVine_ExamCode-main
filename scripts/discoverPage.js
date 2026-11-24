document.addEventListener("DOMContentLoaded", function () {
//   const mapSection = document.getElementById("mapSection");
//   const mapStatus = document.getElementById("mapStatus");

//   const locationBtn = document.getElementById("locationBtn");
//   const refreshMapBtn = document.getElementById("refreshMapBtn");
//   const retryMapBtn = document.getElementById("retryMapBtn");

//   if (!mapSection) return;

//   let latitude = defaultLocation.latitude;
//   let longitude = defaultLocation.longitude;
//   let isLoading = false;

//   async function loadChurches() {
//     if (isLoading) return;

//     isLoading = true;

//     setSectionState(mapSection, "loading");

//     mapStatus.textContent = "Searching for churches...";

//     refreshMapBtn.disabled = true;
//     locationBtn.disabled = true;

//     try {
//       const churches = await fetchChurches(latitude, longitude);

//       if (churches.length === 0) {
//         setSectionState(mapSection, "empty");

//         mapStatus.textContent = "No churches found in this area.";

//         return;
//       }

//       setSectionState(mapSection, "success");
//       initialiseMap(latitude, longitude);
//       renderChurches(churches);

//       requestAnimationFrame(function () {
//         churchMap.invalidateSize();
//       });

//       mapStatus.textContent = `${churches.length} churches found.`;

//     } catch (error) {
//       console.error(error);

//       setSectionState(mapSection, "error");

//       mapStatus.textContent = "Unable to load churches. Please try again.";

//     } finally {
//       isLoading = false;

//       refreshMapBtn.disabled = false;
//       locationBtn.disabled = false;
//     }
//   }

//   refreshMapBtn.addEventListener("click", loadChurches);
//   retryMapBtn.addEventListener("click", loadChurches);
//   locationBtn.addEventListener("click", function () {
//     if (!navigator.geolocation) {
//       mapStatus.textContent = "Location services are unavailable.";
//       return;
//     }

//     locationBtn.disabled = true;
//     mapStatus.textContent = "Finding your location...";

//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         latitude = position.coords.latitude;
//         longitude = position.coords.longitude;

//         locationBtn.disabled = false;
//         loadChurches();
//       },

//       function () {
//         locationBtn.disabled = false;

//         mapStatus.textContent =
//           "Location unavailable. You can continue using the default area.";
//       },

//       {
//         enableHighAccuracy: false,
//         timeout: 10000
//       }
//     );
//   });

//   loadChurches();
// });

// TEST
//document.addEventListener("DOMContentLoaded", function () {
  const mapSection = document.getElementById("mapSection");

  setSectionState(mapSection, "success");

  initialiseMap(
    defaultLocation.latitude,
    defaultLocation.longitude
  );
});