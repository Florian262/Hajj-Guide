import { useState, useEffect } from 'react';

export interface Coords {
  lat: number;
  lng: number;
}

export interface GeolocationState {
  userCoords: Coords | null;
  gpsSimulated: boolean;
  handleSimulateGPS: () => void;
}

/**
 * Custom infrastructure hook to encapsulate browser Geolocation sensor streams
 * and offload coordinates tracking and simulation logic from view components.
 */
export const useGeolocation = (): GeolocationState => {
  const [userCoords, setUserCoords] = useState<Coords | null>(null);
  const [gpsSimulated, setGpsSimulated] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation || gpsSimulated) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => console.warn("GPS tracking error", err),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [gpsSimulated]);

  const handleSimulateGPS = () => {
    setGpsSimulated(true);
    // Stamp user coordinates inside the Mina Camp plains for simulation testing
    setUserCoords({
      lat: 21.4172,
      lng: 39.8890
    });
  };

  return {
    userCoords,
    gpsSimulated,
    handleSimulateGPS
  };
};
