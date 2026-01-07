 const axios = require("axios");

async function getLatLngFromAddress(address) {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          format: "json",
          q: address,
        },
        headers: {
          "User-Agent": "MyOffersApp/1.0 (shantimol.nminustwo@gmail.com)",
          "Accept": "application/json",
        },
        timeout: 10000,
      }
    );

    const data = response.data;

    if (!data || data.length === 0) {
      throw new Error("Address not found");
    }

    return {
      lat: Number(data[0].lat),
      lng: Number(data[0].lon),
    };
  } catch (err) {
    // Log full error details for debugging
    console.error("Geocoding error:", err);
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Status:", err.response.status);
      console.error("Headers:", err.response.headers);
    } else if (err.request) {
      console.error("No response received:", err.request);
    } else {
      console.error("Error message:", err.message);
    }
    throw new Error(
      "Geocoding failed: " + (err.message || "Unknown error")
    );
  }
}

module.exports = getLatLngFromAddress;