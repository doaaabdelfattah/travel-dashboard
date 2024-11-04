import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const MyMap = ({ onMapClick }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 25.69598,
    lng: 32.645649,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBWTZDr037p1_Fl25XJ55ac70gft40nqQ8">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onClick={(event) => {
          const clickedLat = event.latLng.lat();

          const clickedLng = event.latLng.lng();
          setMarkerPosition({ lat: clickedLat, lng: clickedLng });
          // Pass clicked coordinates to the parent component
          onMapClick(clickedLat, clickedLng);
        }}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={
              window.google
                ? {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    scaledSize: new window.google.maps.Size(40, 40),
                  }
                : null
            }
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
