import { useEffect } from 'react';
import { useAppContext } from 'context/AppContext';
import { makeStyles } from '@material-ui/core';
import GoogleMap from 'components/GoogleMap';
import { TripsLayer } from '@deck.gl/geo-layers';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
  },
}));

const LOOP_LENGTH = 1800;
const ANIMATION_SPEED = 0.4;

let time = 0;

function animate() {
  time = (time + ANIMATION_SPEED) % LOOP_LENGTH;
  window.requestAnimationFrame(animate);
}

const query = 'SELECT the_geom, vendor, timestamps FROM new_york_trips';
const url = `https://public.carto.com/api/v2/sql?q=${query}&format=geojson`;

function Map() {
  const classes = useStyles();
  const { viewState, setView } = useAppContext();

  const handleViewStateChange = (viewState) => {
    // setView(viewState);
  };

  useEffect(() => {
    window.requestAnimationFrame(animate);
  }, []);

  async function handleOverlay(webGLOverlay) {
    const geojsonData = await fetch(url).then((response) => response.json());
    // TripsLayer needs data in the following format
    const layerData = geojsonData.features.map((f) => ({
      vendor: f.properties.vendor,
      timestamps: f.properties.timestamps,
      path: f.geometry.coordinates[0],
    }));

    setInterval(() => {
      webGLOverlay.setProps({
        layers: new TripsLayer({
          id: 'trips-layer',
          data: layerData,
          getPath: (d) => d.path,
          getTimestamps: (d) => d.timestamps,
          getColor: (d) => (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]),
          widthMinPixels: 4,
          rounded: true,
          trailLength: 180,
          currentTime: time,
          shadowEnabled: false,
        }),
      });
    }, 50);
  }

  return (
    <div className={classes.root}>
      <GoogleMap viewState={viewState} onViewStateChange={handleViewStateChange} onOverlayLoaded={handleOverlay} />
    </div>
  );
}

export default Map;
