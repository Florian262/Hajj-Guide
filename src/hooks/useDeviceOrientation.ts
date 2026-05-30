import { useEffect, useRef } from 'react';

/**
 * Custom React Hook to encapsulate device compass orientation sensor events
 * and directly rotate needles via DOM refs. This maintains a fluid 60 FPS
 * transition cycle while completely avoiding React component state re-renders.
 */
export const useDeviceOrientation = (
  bearingToKaaba: number,
  bearingToTent: number,
  gpsSimulated: boolean
) => {
  const dialRef = useRef<HTMLDivElement>(null);
  const kaabaNeedleRef = useRef<HTMLDivElement>(null);
  const tentNeedleRef = useRef<HTMLDivElement>(null);
  const deviceHeadingRef = useRef<number>(0);
  const bearingToKaabaRef = useRef<number>(0);
  const bearingToTentRef = useRef<number>(0);

  // Sync incoming telemetry bearings into refs to prevent stale closure captures
  bearingToKaabaRef.current = bearingToKaaba;
  bearingToTentRef.current = bearingToTent;

  useEffect(() => {
    // If GPS is simulated on desktop, freeze physical compass listener triggers
    if (gpsSimulated) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading is iOS specific, falling back to general e.alpha heading
      const iosEvent = e as DeviceOrientationEvent & { webkitCompassHeading?: number };
      const heading = iosEvent.webkitCompassHeading !== undefined 
        ? iosEvent.webkitCompassHeading 
        : e.alpha !== null 
        ? 360 - e.alpha 
        : 0;

      deviceHeadingRef.current = heading;

      // Manipulate DOM style properties directly to bypass Virtual DOM recalculation passes
      if (dialRef.current) {
        dialRef.current.style.transform = `rotate(${-heading}deg)`;
      }
      if (kaabaNeedleRef.current) {
        kaabaNeedleRef.current.style.transform = `rotate(${bearingToKaabaRef.current - heading}deg)`;
      }
      if (tentNeedleRef.current) {
        tentNeedleRef.current.style.transform = `rotate(${bearingToTentRef.current - heading}deg)`;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [gpsSimulated]);

  return {
    dialRef,
    kaabaNeedleRef,
    tentNeedleRef,
    deviceHeadingRef
  };
};
