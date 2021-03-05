import { useCallback, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import GoogleMap from 'components/GoogleMap';
import { TripsLayer } from '@deck.gl/geo-layers';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: '100%',
  },
}));

const LOOP_LENGTH = 1800;
const ANIMATION_SPEED = 0.4;

const query = 'SELECT the_geom, vendor, timestamps FROM new_york_trips';
const url = `https://public.carto.com/api/v2/sql?q=${query}&format=geojson`;

function Map() {
  const classes = useStyles();
  const [data, setData] = useState();
  const overlay = useRef();
  const tripsTime = useRef(0);
  const animation = useRef();

  const animate = useCallback(() => {
    tripsTime.current = (tripsTime.current + ANIMATION_SPEED) % LOOP_LENGTH;
    animation.current = window.requestAnimationFrame(animate);
  }, [tripsTime]);

  useEffect(() => {
    animation.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.current);
  }, [animate]);

  useEffect(() => {
    (async () => {
      const geojsonData = await fetch(url).then((response) => response.json());
      // TripsLayer needs data in the following format
      const layerData = geojsonData.features.map((f) => ({
        vendor: f.properties.vendor,
        timestamps: f.properties.timestamps,
        path: f.geometry.coordinates[0],
      }));

      setData(layerData);
    })();
  }, []);

  useEffect(() => {
    if (overlay.current && data) {
      setInterval(() => {
        overlay.current.setProps({
          layers: new TripsLayer({
            id: 'trips-layer',
            data: data,
            getPath: (d) => d.path,
            getTimestamps: (d) => d.timestamps,
            getColor: (d) => (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]),
            widthMinPixels: 3,
            rounded: true,
            trailLength: 180,
            currentTime: tripsTime.current,
            shadowEnabled: false,
          }),
        });
      }, 50);
    }
  }, [overlay, data, tripsTime]);

  function handleOverlay(o) {
    overlay.current = o;
  }

  return (
    <div className={classes.root}>
      <GoogleMap onOverlayLoaded={handleOverlay} />
    </div>
  );
}

export default Map;
