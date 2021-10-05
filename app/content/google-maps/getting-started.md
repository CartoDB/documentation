## Getting started

In this guide, you will learn the basics of visualizing a CARTO dataset with the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overview). There are no previous requirements to complete this guide, but a basic knowledge of Google Maps Javascript API would be helpful.

After completing this guide, you will have your first Google Maps API map with a CARTO dataset!

<iframe
    id="getting-started-final-result"
    src="../examples/getting-started/step-2.html"
    width="100%"
    height="500"
    frameBorder="0">
</iframe>

### Basic setup

We are going to start with the Hello World example from the Google Maps Javascript API [documentation](https://developers.google.com/maps/documentation/javascript), but centering the initial view on the United States and zoom level 4. To simplify the example, we are going to embed the JavaScript code and the CSS declarations in the HTML file.

We are going to use the new [WebGL features](https://developers.google.com/maps/documentation/javascript/webgl) for the Maps Javascript API. These features add support for vector maps, 3D graphic content, continuous zoom and tilt/heading parameters. Please follow the instructions to [create a Map ID](https://developers.google.com/maps/documentation/javascript/styling#creating-map-ids) in the Google Cloud Console.  

At this point you will have a simple map:

<div class="example-map">
    <iframe
        id="getting-started-step-1"
        src="../examples/getting-started/step-1.html"
        width="100%"
        height="500"
        style="margin: 20px auto !important"
        frameBorder="0">
    </iframe>
</div>

> View this step [here](../examples/getting-started/step-1.html)

### Adding data from CARTO

The first step you need to perform is to add the [deck.gl](https://deck.gl) dependencies, including the CARTO [submodule](https://deck.gl/docs/api-reference/carto/overview):

```html
<script src="https://unpkg.com/deck.gl@^8.6.0/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/carto@^8.6.0/dist.min.js"></script>
```

Then you need to provide the credentials for connecting to the CARTO 3 platform, as explained [here](/deck-gl/using-the-cartolayer/#connecting-to-carto-3). Here we are using a token with access to some public datasets in BigQuery. You will need to create a token with access to the datasets you want to visualize.

```js
setDefaultCredentials({
  apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
  apiVersion: API_VERSIONS.V3,
  accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c'
});
```

{{% bannerNote title="note" %}}
Starting with Google Maps v3.45 there are two modes of rendering: Vector and Raster. In this case we are using a vector map, so vector rendering will be used. 

From v8.6, the deck.gl [GoogleMapsOverlay](https://deck.gl/docs/api-reference/google-maps/google-maps-overlay) class automatically detects at runtime which rendering type is used. The Vector rendering mode is in general more performant, and the GoogleMapsOverlay class offers several features not available when using Raster rendering such as:

- Shared 3D space: objects drawn by the GoogleMapsOverlay class appear inside the Google Maps scene, correctly intersecting with 3D buildings and behind the contextual labels drawn by Google Maps
- Tilting and rotating the view is supported
- Rendering uses the same WebGL context as Google Maps, improving performance
{{%/ bannerNote %}}


Now you can add a map layer from the public account. In order to add the layer, we will use the [`GoogleMapsOverlay`](https://deck.gl/docs/api-reference/google-maps/google-maps-overlay) class from deck.gl. We need to specify the layers as an array. In this case, we only have one [`CartoLayer`](https://deck.gl/docs/api-reference/carto/carto-layer) from the deck.gl CARTO submodule. We pass the following parameters to the constructor:

- `connection` is the name of the connection to BigQuery in the CARTO 3 Workspace.

- `type` defines the type of dataset. In this case, we are going to visualize a table so we use one of the constants defined in the `MAP_TYPES` enumeration.
  
- `data` contains the dataset that we want to visualize. It can be the name of a table, the name of a tileset, or a SQL query. In this case we are going to provide a table name. The `CartoLayer` will make the appropriate requests to the Maps API to retrieve the GeoJSON features from the BigQuery table.

- Style parameters. In order to display the information, the [`CartoLayer`](https://deck.gl/docs/api-reference/carto/carto-layer) uses the [`GeoJsonLayer`](https://deck.gl/docs/api-reference/layers/geojson-layer) to style the features, so all the properties of this class are supported. The style parameters depend on the dataset type of geometry. In this case, we are adding a point layer, so we specify the point color using the `getFillColor` property, the circle outline color with the `getLineColor` property, and the point and outline sizes through the `pointRadiusMinPixels` and `lineWidthMinPixels` properties.
   
```js
const deckOverlay = new deck.GoogleMapsOverlay({
    layers: [
        new deck.carto.CartoLayer({
            connection: 'bqconn',
            type: deck.carto.MAP_TYPES.TABLE,
            data: `cartobq.public_account.retail_stores`,
            getLineColor: [255, 255, 255],
            getFillColor: [238, 77, 90],
            pointRadiusMinPixels: 6,
            lineWidthMinPixels: 1,
        }),
    ]
});
```

Finally you need to use the [`setMap`](https://deck.gl/docs/api-reference/google-maps/google-maps-overlay#setmap) function on the [`GoogleMapsOverlay`](https://deck.gl/docs/api-reference/google-maps/google-maps-overlay) object to add the layer to the map.

```js
deckOverlay.setMap(map);
```

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
    <title>Simple Map</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script src="https://unpkg.com/deck.gl@^8.6.0/dist.min.js"></script>
    <script src="https://unpkg.com/@deck.gl/carto@^8.6.0/dist.min.js"></script>  
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }

      /* Optional: Makes the sample page fill the window. */
      html,
      body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>

  <body>
    
    <div id="map"></div>

    <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA1QNyLGz2mEAjyCR4-lz5k1OlJKETvqc&callback=initMap&libraries=&v=beta"
      async
    ></script>
    
  </body>

  <script type="text/javascript">
    let map;

    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 38, lng: -98 },
        zoom: 4,
        mapId: '856f688f677c0bc3',
      });

      deck.carto.setDefaultCredentials({
        apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
        apiVersion: deck.carto.API_VERSIONS.V3,
        accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c'
      });

      const deckOverlay = new deck.GoogleMapsOverlay({
        layers: [
          new deck.carto.CartoLayer({
            connection: 'bqconn',
            type: deck.carto.MAP_TYPES.TABLE,
            data: `cartobq.public_account.retail_stores`,
            getLineColor: [255, 255, 255],
            getFillColor: [238, 77, 90],
            pointRadiusMinPixels: 6,
            lineWidthMinPixels: 1,
          }),
        ],
      });

      deckOverlay.setMap(map);
    }

  </script>
</html>
```
