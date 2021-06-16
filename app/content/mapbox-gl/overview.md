## Getting started

In this guide, you will learn the basics of visualizing a CARTO dataset with the [Mapbox GL JS library](https://docs.mapbox.com/mapbox-gl-js/api/). There are no previous requirements to complete this guide, but a basic knowledge of the Mapbox GL JS library would be helpful.

After completing this guide, you will have your first Mapbox GL map with a CARTO dataset!

The following example is built on top of Mapbox GL JS v2. It enables 3D mapping with elevated terrain, customizable skies and camera functionalities.

This example adds 3D terrain to a map using setTerrain with a raster-dem source.

It uses exaggeration to exaggerate the height of the terrain. It also adds a sky layer that is shown when the map is highly pitched.

<div class="example-map">
  <iframe
    id="getting-started-final-result"
    src="../examples/getting-started/step-2.html"
    width="100%"
    height="500"
    frameBorder="0">
  </iframe>
</div>


### About MapboxGL license

Beginning with **v2.0.0**, `mapbox-gl-js` is no longer under the 3-Clause BSD license. Also, from that same version, a billable map load occurs whenever a Map object is initialized. That leaves **1.13.0** as the latest mapbox-gl-js version with BSD, that can be freely used.

If you want to continue using the mapbox-gl free version (remember that 3D elevated terrain capabilities start from v2), use the following CARTO CDN:

```html
  <script src="https://libs.cartocdn.com/mapbox-gl/v1.13.0/mapbox-gl.js"></script>
  <link href="https://libs.cartocdn.com/mapbox-gl/v1.13.0/mapbox-gl.css" rel="stylesheet" />
```

For more info about this, you can read our blogpost [Our Thoughts as MapboxGL JS v2.0 Goes Proprietary](https://carto.com/blog/our-thoughts-as-mapboxgl-js-2-goes-proprietary/).

### Basic setup

The first thing you need to do is to add all the required Mapbox GL dependencies (library and CSS files):

```html
  <link href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css" rel="stylesheet">
  <script src="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js"></script>
```

#### Add map container

Next, you need to create a `div` inside the `body` where the map will be drawn and you need to style them to ensure the map displays at full width:

```html
<body style="margin: 0; padding: 0;">
  <div id="map" style="position: absolute; top: 0; bottom: 0; width: 100%;"></div>
</body>
```

#### Create map and set properties

Once you have a `div` for your map, you can use the [`mapboxgl.Map`](https://docs.mapbox.com/mapbox-gl-js/api/map/) constructor to create your map with the desired initial view. Here we are also specifying the style property to use a raster-dem source. You will need to provide your Mapbox access token:

```js
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
  center: [-112.125, 36.12],
  zoom: 12,
  pitch: 70,
  bearing: 180
});
```

At this point you will have a basic 3D map with terrain:

<div class="example-map">
  <iframe
    id="getting-started-step-1"
    src="../examples/getting-started/step-1.html"
    width="100%"
    height="500"
    frameBorder="0">
  </iframe>
</div>

### Add layer

In order to visualize a CARTO dataset, you just need to provide a [TileJSON](https://github.com/mapbox/tilejson-spec) URL using the Maps API within a source of type vector while you are creating your layer using the [`addLayer`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addlayer) method on the map. We also need to indicate the ID for the layer and the styling properties:

```js
const query = 'SELECT the_geom_webmercator FROM grca_trans_trail_ln';
const tilejsonUrl = `https://maps-api-v2.us.carto.com/user/public/carto/sql?source=${query}&format=tilejson&api_key=default_public&rand=3435334`;
map.addLayer({
  'id': 'grca-trail-layer',
  'type': 'line',
  'source': {
    'type': 'vector',
    url: tilejsonUrl
  },
  'source-layer': 'default',
  'paint': {
    'line-color': 'orange',
    'line-width': 3
  }
});
```

In order to have the best performance, we recommend you to retrieve only the fields you want to use client-side, instead of selecting all the fields (SELECT *). If you select all the fields from the dataset, the vector tiles will be bigger than needed and would take more time to encode, download and decode.

### Camera and animation

The example uses the new Free Camera API in Mapbox GL JS v2 and features an initial animation that updates the camera position using linear interpolation between two locations.

### All together

<div class="example-map">
  <iframe
    id="getting-started-step-2"
    src="../examples/getting-started/step-2.html"
    width="100%"
    height="500"
    style="margin: 20px auto !important"
    frameBorder="0">
  </iframe>
</div>

> You can explore the final step [here](../examples/getting-started/step-2.html)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js"></script>
  </head>
  <body style="margin: 0; padding: 0;">
    <div id="map" style="position: absolute; top: 0; bottom: 0; width: 100%;"></div>
  </body>
  <script>
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydG9kYmluYyIsImEiOiJja202bHN2OXMwcGYzMnFrbmNkMzVwMG5rIn0.Zb3J4JTdJS-oYNXlR3nvnQ';

    async function initialize() {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
        center: [-112.125, 36.12],
        zoom: 12,
        pitch: 70,
        bearing: 180
      });

      map.on('load', async () => {
        map.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });

        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        
        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
          'id': 'sky',
          'type': 'sky',
          'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
          }
        });

        // Add CARTO layer
        const query = 'SELECT the_geom_webmercator FROM grca_trans_trail_ln';
        const tilejsonUrl = `https://maps-api-v2.us.carto.com/user/public/carto/sql?source=${query}&format=tilejson&api_key=default_public&rand=3435334`;
        map.addLayer({
          'id': 'grca-trail-layer',
          'type': 'line',
          'source': {
            'type': 'vector',
            url: tilejsonUrl
          },
          'source-layer': 'default',
          'paint': {
            'line-color': 'orange',
            'line-width': 3
          }
        });
      });
    }

    initialize();

    function updateCameraPosition(position, altitude, target) {
      const camera = map.getFreeCameraOptions();
      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
        position,
        altitude
      );
      camera.lookAtPoint(target);
      
      map.setFreeCameraOptions(camera);
    }

    // linearly interpolate between two positions based on time
    function lerp(a, b, t) {
      if (Array.isArray(a) && Array.isArray(b)) {
        const result = [];
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
          result[i] = a[i] * (1 - t) + b[i] * t;
        }
        return result;
      } else {
        return a * (1 - t) + b * t;
      }
    }

    let animationTime = 0.0;

    function animate() {
      const animationConfig = {
        duration: 1000,
        animate: (phase) => {
          const start = [-112.125, 36.3];
          const end = [-112.125, 36.05];
            
          // interpolate camera position while keeping focus on a target lat/lng
          const position = lerp(start, end, phase);
          const altitude = 5000;
          const target = [-112.065, 36.147];
            
          updateCameraPosition(position, altitude, target);
        }
      };
      
      let lastTime = 0.0;
      let frameReq;
      function frame(time) {
        if (animationTime < animationConfig.duration) {
          animationConfig.animate(animationTime / animationConfig.duration);
        }
        
        // allow requestAnimationFrame to control the speed of the animation
        animationTime += 100 / (time - lastTime);
        lastTime = time;
        
        if (animationTime > animationConfig.duration) {
          window.cancelAnimationFrame(frameReq);
          return;
        }
        
        frameReq = window.requestAnimationFrame(frame);
      }
      
      frameReq = window.requestAnimationFrame(frame);
    };
  </script>
</html>
```
