 const fetch = require("node-fetch"); // ✅ works in CommonJS

async function getLatLngFromAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "MyOffersApp/1.0 (shantimol.nminustwo@gmail.com)" },
  });
  const data = await response.json();

  if (!data || data.length === 0) throw new Error("Address not found");

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}

module.exports = getLatLngFromAddress;
