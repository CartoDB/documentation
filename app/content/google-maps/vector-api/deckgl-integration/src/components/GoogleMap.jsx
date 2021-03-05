import { useCallback, useEffect, useRef } from 'react';
import { useAppContext } from 'context/AppContext';

const GOOGLE_MAPS_ID = process.env.REACT_APP_GOOGLE_MAP_ID;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_KEY;
const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=&v=3.42.10a&map_ids=${GOOGLE_MAPS_ID}`;

const CONTAINER_STYLE = {
  position: 'absolute',
  zIndex: 0,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

export default function GoogleMap({ onOverlayLoaded = () => {} }) {
  const { viewState } = useAppContext();
  const mapRef = useRef();
  const containerRef = useRef();

  const onScripLoaded = useCallback(async () => {
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
    });

    const { default: DeckGLOverlay } = await import('WebglOverlayView/google-maps-overlay');

    const webGLOverlay = new DeckGLOverlay(containerRef.current, [], {});
    webGLOverlay.setMap(map);

    onOverlayLoaded(webGLOverlay);

    mapRef.current = map;

    /* let bearingCopy = bearing;

    setInterval(() => {
      bearingCopy = bearingCopy + 0.25;
      map.moveCamera({ center: { lat: latitude, lng: longitude }, heading: bearingCopy });
    }, 50); */
  }, [onOverlayLoaded, viewState]);

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

  return <div ref={containerRef} style={CONTAINER_STYLE}></div>;
}
