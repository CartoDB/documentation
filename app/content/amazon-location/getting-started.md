## Getting Started

In this guide, you will learn the basics of visualizing a CARTO layer with the [Amazon Location](https://aws.amazon.com/location/) service. There are no previous requirements to complete this guide, but a basic knowledge of web development would be helpful.

After completing this guide, you will have your first Amazon Location map with a CARTO dataset!

<iframe
    id="getting-started-final-result"
    src="../examples/getting-started/step-2.html"
    width="100%"
    height="500"
    frameBorder="0">
</iframe>

### Basic setup

There are two main steps for visualizing a CARTO layer: first you need to create a map resource in your AWS account followed by the creation of a web application that uses a rendering library to visualize the map with the corresponding CARTO layer.

For this guide, we have already created a map resource called "Rivers" in our AWS account. If you want to create your own map resource, you can follow the instructions from the [Amazon Developer Guide](https://docs.aws.amazon.com/location/latest/developerguide/create-map-resource.html).

Follow the [Using MapLibre GL JS with Amazon Location Service](https://docs.aws.amazon.com/location/latest/developerguide/tutorial-maplibre-gl-js.html) tutorial to create a basic map with the [MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/api/) rendering library. 

At this point you will have a basic map with the Rivers Amazon Location map resource:

<iframe
    id="amazon-location-step-1"
    src="../examples/getting-started/step-1.html"
    width="100%"
    height="500"
    style="margin: 20px auto !important"
    frameBorder="0">
</iframe>

> View this step [here](../examples/getting-started/step-1.html)

### Adding data from CARTO

In order to visualize the CARTO tileset, we are going to take advantage of the TileJSON endpoints in the Maps API v3. We just need to provide the endpoint URL through the [`source.url`](https://maplibre.org/maplibre-gl-js-docs/style-spec/sources/) property while calling the [`addLayer`](https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer) method on the map. In the URL we need to provide a token with access to the tileset.

{{% bannerNote title="About CARTO platform versions" %}}
In this documentation we use the term “CARTO 3” or "Maps API v3" to refer to the latest version of the CARTO platform launched on October 2021, and “CARTO 2” to refer to the previous version. We provide examples for both versions and we add notes when there are differences in the way you need to work with each of them. Note that each platform version has its own set of account credentials.
{{%/ bannerNote %}}

We are using a public tileset generated using our BigQuery Tiler and we are assigning a different color to each line representing a river, depending on the value of the `bearing` attribute.

```js
map.addLayer(
  {
    id: 'rivers_carto',
    type: 'line',
    source: {
      type: 'vector',
      url: 'https://gcp-us-east1.api.carto.com/v3/maps/bqconn/tileset?name=cartobq.public_account.eurivers&access_token=eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c&format=tilejson&client=amazon-location'
    },
    'source-layer': 'default',
    "paint": {
      "line-color": {
        "property": "bearing",
        "type": "interval",
        "stops": [
          [{"zoom": 0, "value": 0}, "rgba(255, 0, 128, 1)"],
          [{"zoom": 0, "value": 18}, "rgba(212, 7, 146, 1)"],
          [{"zoom": 0, "value": 37}, "rgba(212, 7, 146, 1)"],
          [{"zoom": 0, "value": 56}, "rgba(170, 13, 164, 1)"],
          [{"zoom": 0, "value": 75}, "rgba(128, 20, 181, 1)"],
          [{"zoom": 0, "value": 94}, "rgba(85, 26, 199, 1)"],
          [{"zoom": 0, "value": 113}, "rgba(43, 33, 217, 1)"],
          [{"zoom": 0, "value": 132}, "rgba(0, 39, 235, 1)"],
          [{"zoom": 0, "value": 151}, "rgba(3, 72, 217, 1)"],
          [{"zoom": 0, "value": 170}, "rgba(43, 33, 217, 1)"],
          [{"zoom": 0, "value": 189}, "rgba(9, 138, 181, 1)"],
          [{"zoom": 0, "value": 208}, "rgba(12, 170, 164, 1)"],
          [{"zoom": 0, "value": 227}, "rgba(15, 203, 146, 1)"],
          [{"zoom": 0, "value": 246}, "rgba(18, 236, 128, 1)"],
          [{"zoom": 0, "value": 265}, "rgba(58, 197, 128, 1)"],
          [{"zoom": 0, "value": 284}, "rgba(97, 157, 128, 1)"],
          [{"zoom": 0, "value": 303}, "rgba(136, 118, 128, 1)"],
          [{"zoom": 0, "value": 322}, "rgba(176, 79, 128, 1)"],
          [{"zoom": 0, "value": 341}, "rgba(215, 39, 128, 1)"],
          [{"zoom": 0, "value": 360}, "rgba(255, 0, 128, 1)"]
        ]
      }
    }
  }
);
```

Finally we need to add the layer to the map after it is loaded:

```js
async function initializeMap() {
  ...
  map.on('load', () => {
    addCartoLayer();
  })
}
```

{{% bannerNote title="tip" %}}
If using CARTO 2, you can follow a similar approach but using the TileJSON endpoints provided by Maps API v2. For example, this a valid URL for retrieving a TileJSON using CARTO 2: `https://maps-api-v2.us.carto.com/user/public/bigquery/tileset?source=cartobq.maps.eurivers&format=tilejson&api_key=default_public&client=amazon-location`
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
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.775.0.min.js"></script>
    <script src="https://unpkg.com/@aws-amplify/core@3.7.0/dist/aws-amplify-core.min.js"></script>
    <script src="https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.js"></script>
    <link href="https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.css" rel="stylesheet" />
  </head>

  <body style="margin: 0; padding: 0;">
    <div id="map" style="position: absolute; top: 0; bottom: 0; width: 100%;"></div>
  </body>
  
  <script>

    let map;

    // instantiate a Cognito-backed credential provider
    const identityPoolId = "us-east-2:303d12f6-e24e-4571-8a79-66cc7c6a6bdc"; // Cognito Identity Pool ID
    const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
    });

    /**
     * Sign requests made by MapLibre GL JS using AWS SigV4.
     */
    AWS.config.region = identityPoolId.split(":")[0];
    const { Signer } = window.aws_amplify_core;
    function transformRequest(url, resourceType) {
      if (resourceType === "Style" && !url.includes("://")) {
        // resolve to an AWS URL
        url = `https://maps.geo.${AWS.config.region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
      }

      if (url.includes("amazonaws.com")) {
        // only sign AWS requests (with the signature as part of the query string)
        return {
          url: Signer.signUrl(url, {
            access_key: credentials.accessKeyId,
            secret_key: credentials.secretAccessKey,
            session_token: credentials.sessionToken,
          }),
        };
      }

      // don't sign
      return { url };
    }

    /**
     * Initialize a map.
     */
    async function initializeMap() {

      // load credentials and set them up to refresh
      await credentials.getPromise();

      const mapName = "Rivers"; // Amazon Location Service Map Name

      map = new maplibregl.Map({
        container: "map",
        center: [20, 49], 
        zoom: 4, 
        style: mapName,
        transformRequest,
      });

      map.addControl(new maplibregl.NavigationControl(), "top-left");

      map.on('load', () => {
        addCartoLayer();
      })
    }

    async function addCartoLayer() {
      map.addLayer(
        {
          id: 'rivers_carto',
          type: 'line',
          source: {
            type: 'vector',
            url: 'https://gcp-us-east1.api.carto.com/v3/maps/bqconn/tileset?name=cartobq.public_account.eurivers&access_token=eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbHFlM3p3Z3UiLCJqdGkiOiI1YjI0OWE2ZCJ9.Y7zB30NJFzq5fPv8W5nkoH5lPXFWQP0uywDtqUg8y8c&format=tilejson&client=amazon-location'
          },
          'source-layer': 'default',
          "paint": {
            "line-color": {
              "property": "bearing",
              "type": "interval",
              "stops": [
                [{"zoom": 0, "value": 0}, "rgba(255, 0, 128, 1)"],
                [{"zoom": 0, "value": 18}, "rgba(212, 7, 146, 1)"],
                [{"zoom": 0, "value": 37}, "rgba(212, 7, 146, 1)"],
                [{"zoom": 0, "value": 56}, "rgba(170, 13, 164, 1)"],
                [{"zoom": 0, "value": 75}, "rgba(128, 20, 181, 1)"],
                [{"zoom": 0, "value": 94}, "rgba(85, 26, 199, 1)"],
                [{"zoom": 0, "value": 113}, "rgba(43, 33, 217, 1)"],
                [{"zoom": 0, "value": 132}, "rgba(0, 39, 235, 1)"],
                [{"zoom": 0, "value": 151}, "rgba(3, 72, 217, 1)"],
                [{"zoom": 0, "value": 170}, "rgba(43, 33, 217, 1)"],
                [{"zoom": 0, "value": 189}, "rgba(9, 138, 181, 1)"],
                [{"zoom": 0, "value": 208}, "rgba(12, 170, 164, 1)"],
                [{"zoom": 0, "value": 227}, "rgba(15, 203, 146, 1)"],
                [{"zoom": 0, "value": 246}, "rgba(18, 236, 128, 1)"],
                [{"zoom": 0, "value": 265}, "rgba(58, 197, 128, 1)"],
                [{"zoom": 0, "value": 284}, "rgba(97, 157, 128, 1)"],
                [{"zoom": 0, "value": 303}, "rgba(136, 118, 128, 1)"],
                [{"zoom": 0, "value": 322}, "rgba(176, 79, 128, 1)"],
                [{"zoom": 0, "value": 341}, "rgba(215, 39, 128, 1)"],
                [{"zoom": 0, "value": 360}, "rgba(255, 0, 128, 1)"]
              ]
            }
          }
        }
      );
    }

    initializeMap();

  </script>

</html>
```
