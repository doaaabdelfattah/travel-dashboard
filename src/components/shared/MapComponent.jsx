import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ onMapClick }) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const mapRef = useRef(null); // Reference to the map object
  const markerRef = useRef(null); // Reference to the current marker

  useEffect(() => {
    // Initialize the map and set its view to a specific location and zoom level
    const map = L.map("map").setView([25.69598, 32.645649], 13);
    mapRef.current = map; // Store the map reference

    // Add a tile layer to the map (OpenStreetMap tiles)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "©️ OpenStreetMap contributors",
    }).addTo(map);

    // Add click event listener to the map
    map.on("click", (event) => {
      const { lat, lng } = event.latlng;
      setCoordinates({ lat, lng });
      onMapClick(lat, lng);

      // Remove the previous marker if it exists
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      // Create and add a new marker at the clicked location
      const newMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          `
          <strong>Location:</strong> ${lat.toFixed(5)}, ${lng.toFixed(5)}<br/>
          <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" rel="noopener noreferrer">
            View on Google Maps
          </a>
        `
        )
        .openPopup();

      // Update the marker reference with the new marker
      markerRef.current = newMarker; // Store the new marker
    });

    // Clean up the map on component unmount
    return () => {
      map.off("click");
      map.remove();
    };
  }, []); // Empty dependency array so effect runs only once

  const generateGoogleMapsLink = () => {
    if (coordinates.lat && coordinates.lng) {
      return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    }
    return "#"; // Return a placeholder if coordinates are not set
  };

  return (
    <div>
      <h1>My OpenStreetMap Example</h1>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>

      {coordinates.lat && coordinates.lng && (
        <button>
          <a
            href={generateGoogleMapsLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share Location on Google Maps
          </a>
        </button>
      )}
    </div>
  );
};

export default MapComponent;
