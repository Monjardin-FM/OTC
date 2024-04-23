import React from 'react';
import { MapContainer } from 'react-leaflet';

export const AppGeofence = () => {
  return (
    <>
      text
      <MapContainer
        center={[29.42412, -98.49363]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '70vh', width: '100wh' }}
      ></MapContainer>
    </>
  );
};
