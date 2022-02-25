## Getting started

Mapbox provides different SDKs for developing [web](https://docs.mapbox.com/mapbox-gl-js/api/) and mobile ([iOS](https://docs.mapbox.com/ios) and [Android](https://docs.mapbox.com/ios)) applications. These SDKs include different visualization capabilities and you can learn more about them in the Mapbox [Docs](https://docs.mapbox.com/) website.

In this guide, you will learn the basics of visualizing a CARTO dataset with the [Mapbox GL JS library](https://docs.mapbox.com/mapbox-gl-js/api/). There are no previous requirements to complete this guide, but a basic knowledge of the Mapbox GL JS library would be helpful.

After completing this guide, you will have your first Mapbox GL JS map with a CARTO dataset!

<div class="example-map">
  <iframe
    id="getting-started-final-result"
    src="../examples/getting-started/step-2.html"
    width="100%"
    height="500"
    frameBorder="0">
  </iframe>
</div>

### Basic setup

Beginning with **v2.0.0**, `mapbox-gl-js` is no longer under the 3-Clause BSD license. Also, from that same version, a billable map load occurs whenever a Map object is initialized. That leaves **1.13.0** as the latest mapbox-gl-js version with BSD, that can be freely used. For more info about this, you can read our blogpost [Our Thoughts as MapboxGL JS v2.0 Goes Proprietary](https://carto.com/blog/our-thoughts-as-mapboxgl-js-2-goes-proprietary/).

In this example we are going to use v2 to showcase new available functionality like the 3D elevated terrain capabilities but, if you want to use a library compatible with Mapbox 1.x and CARTO, community supported, we recommend you to check [MapLibre](https://maplibre.org/). 

<ul class="grid-cell--col10 grid u-mt16">
    <li class="grid-cell grid-cell--col6 grid-cell--col12--mobile u-mb20">
        <a href="https://github.com/maplibre/maplibre-gl-js" target="_blank" class="clickable-card clickable-card--small">
        <img class="u-mr4" src="/img/documentation/github.svg" alt="Github" style="filter: invert(1); margin-bottom: 8px">
        <h3 class="title f20 is-txtBaseGrey u-mt8" style="margin-top: 8px;">MapLibre GL JS</h3>
        <p class="text f16 is-txtTypo2 u-mt8">Community led fork derived from Mapbox GL JS</p>
        </a>
    </li>
</ul>

We are going to start by adding a map with 3D terrain. Please check [this example](https://docs.mapbox.com/mapbox-gl-js/example/add-terrain/) in the Mapbox docs. It uses exaggeration to exaggerate the height of the terrain and adds a sky layer that is shown when the map is highly pitched.

<div class="example-map">
  <iframe
    id="getting-started-step-1"
    src="../examples/getting-started/step-1.html"
    width="100%"
    height="500"
    frameBorder="0">
  </iframe>
</div>

### Adding data from CARTO

In order to visualize a CARTO dataset, you need to fetch data from the CARTO platform. With CARTO Maps API v3 you can add two different types of sources: GeoJSON and tilesets (vector). 

- For adding a source with GeoJSON format you first set your credentials and then you can use the [`getData`](https://deck.gl/docs/api-reference/carto/overview#support-for-other-deckgl-layers) function from the [CARTO module](https://deck.gl/docs/api-reference/carto/overview) for [deck.gl](https://deck.gl). Once you have retrieved the data, you can just add a new source to the map with `geojson` type.

- For adding a tileset, you can need to provide the TileJSON URL when adding your vector source. This URL needs the connection name and the access token. Please check the [tileset example](/mapbox-gl-js/examples/tileset).

{{% bannerNote title="About CARTO platform versions" %}}
In this documentation we use the term “CARTO 3” to refer to the latest version of the CARTO platform launched on October 2021, and “CARTO 2” to refer to the previous version. We provide examples for both versions and we add notes when there are differences in the way you need to work with each of them. Note that each platform version has its own set of account credentials.
{{%/ bannerNote %}}

```javascript
deck.carto.setDefaultCredentials({
  apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
  apiVersion: deck.carto.API_VERSIONS.V3,
  accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c'
});

const data =  await deck.carto.fetchLayerData({
  type: deck.carto.MAP_TYPES.QUERY,
  source: `SELECT geom FROM cartobq.public_account.grca_trans_trail_ln`,
  connection: 'bqconn',
  format: deck.carto.FORMATS.GEOJSON
});

map.addSource('trails', {
  'type': 'geojson',
  'data': data
})
```

{{% bannerNote title="tip" %}}
In order to achieve optimal performance, we recommend you to retrieve only the fields you want to use client-side, instead of selecting all the fields (`SELECT *`). If you select all the fields from the dataset, the vector tiles or GeoJSON objects will be bigger than needed and would take more time to encode, download, and decode.
{{%/ bannerNote %}}

{{% bannerNote title="Working with CARTO 2" %}}
If you are working with the CARTO 2 platform (Maps API v2), the source consists always of vector tiles and the approach is very similar to tilesets with CARTO 3. You just need to provide the [TileJSON](https://github.com/mapbox/tilejson-spec) URL using the Maps API within a source of type vector while you are creating your layer using the [`addLayer`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addlayer) method on the map. We also need to indicate the ID for the layer and the styling properties:

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
{{%/ bannerNote %}}


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
