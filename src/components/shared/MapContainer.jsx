const MapEvents = () => {
  useMapEvents({
    click(e) {
      // setState your coords here
      // coords exist in "e.latlng.lat" and "e.latlng.lng"
      console.log(e.latlng.lat);
      console.log(e.latlng.lng);
    },
  });
  return false;
};

return (
  <MapContainer center={[33.8735578, 35.86379]} zoom={9} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a 
         href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MapEvents />
  </MapContainer>
);
