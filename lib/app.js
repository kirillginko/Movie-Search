import mapboxgl from 'mapbox-gl';

const apiKey = 'pk.eyJ1Ijoia2lyaWxsODciLCJhIjoiY2s0NXdydTE0MGU3czNkbjRhMGJqanE5NiJ9.wvMBZxyjhRNuX0ECGP2feQ';
const results = document.querySelector("#results");
const searchLocation = (keyword) => {
  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=${apiKey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then((data) => {
      console.log(data.features[1].center);
      const geoCode = data.features[1].center;
      results.innerHTML = geoCode;
      mapboxgl.accessToken = `${apiKey}`;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: geoCode,
        zoom: 12
      });
      new mapboxgl.Marker()
        .setLngLat(geoCode)
        .addTo(map);
    });
};
const searchForm = document.querySelector("#search-location");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  results.innerHTML = "";
  const keyword = document.querySelector("#keyword").value;
  searchLocation(keyword);
});
