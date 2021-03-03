import { useCallback, useEffect, useRef } from 'react';
import GoogleMapsOverlay from 'GoogleMapsOverlay/google-maps-overlay';
import { debounce } from 'utils/debounce';

const GOOGLE_MAPS_ID = process.env.REACT_APP_GOOGLE_MAP_ID;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_KEY;
const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=&v=beta&map_ids=${GOOGLE_MAPS_ID}`;

export default function GoogleMap({ viewState, onViewStateChange, onOverlayLoaded }) {
  const mapRef = useRef();
  const containerRef = useRef();

  let containerStyle = {
    position: 'absolute',
    zIndex: 0,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  };

  const handleViewportChange = useCallback(() => {
    const map = mapRef.current;

    if (map) {
      const center = map.getCenter();

      const viewState = {
        longitude: center.lng(),
        latitude: center.lat(),
        zoom: Math.max(map.getZoom() - 1, 1),
        pitch: map.getTilt(),
        bearing: map.getHeading(),
      };

      onViewStateChange(viewState);
    }
  }, [mapRef, onViewStateChange]);

  function onScripLoaded() {
    const { latitude, longitude, zoom, bearing, pitch } = viewState;

    const map = new window.google.maps.Map(containerRef.current, {
      center: {
        lat: latitude,
        lng: longitude,
      },
      zoom,
      tilt: pitch,
      heading: bearing,
      mapId: GOOGLE_MAPS_ID,
      useStaticMap: true,
    });

    const overlay = new GoogleMapsOverlay();
    overlay.setMap(map);
    onOverlayLoaded(overlay);

    mapRef.current = map;

    let bearingCopy = bearing;

    setInterval(() => {
      bearingCopy = bearingCopy + 0.25;
      map.setHeading(bearingCopy);
    }, 50);

    const handleViewportChangeDebounced = debounce(handleViewportChange, 200);
    map.addListener('bounds_changed', handleViewportChangeDebounced);
  }

  useEffect(() => {
    if (!document.querySelector('#gmaps')) {
      const script = document.createElement(`script`);
      script.id = 'gmaps';
      script.async = true;
      script.type = `text/javascript`;
      script.src = GOOGLE_MAPS_API_URL;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onScripLoaded);
    } else if (document.querySelector('#gmaps') && window.google) {
      onScripLoaded();
    }
  }, [onScripLoaded]);

  return <div ref={containerRef} style={containerStyle}></div>;
}
