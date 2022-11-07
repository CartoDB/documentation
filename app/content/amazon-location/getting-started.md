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

In order to visualize the CARTO dataset, we are going to use the [`fetchMap`](../../deck-gl/reference/#fetchmap) function to add a map that was previously created in CARTO Builder.

{{% bannerNote title="About CARTO platform versions" %}}
In this documentation we use the term “CARTO 3” or "Maps API v3" to refer to the latest version of the CARTO platform launched on October 2021, and “CARTO 2” to refer to the previous version. We provide examples for both versions and we add notes when there are differences in the way you need to work with each of them. Note that each platform version has its own set of account credentials.
{{%/ bannerNote %}}

By providing your own CARTO map id you can load in any maps you have created in CARTO Builder, with all of the styling preconfigured.

```js
async function initializeMap() {
  ...
  const cartoMapId = 'ff6ac53f-741a-49fb-b615-d040bc5a96b8';
  const {layers} = await deck.carto.fetchMap({cartoMapId});
  const deckOverlay = new deck.MapboxOverlay({layers});
}
```

Finally we need to add the layer to the map:

```js
async function initializeMap() {
  ...
  map.addControl(deckOverlay);
}
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
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.775.0.min.js"></script>
    <script src="https://unpkg.com/@aws-amplify/core@3.7.0/dist/aws-amplify-core.min.js"></script>
    <script src="https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.js"></script>
    <link href="https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.css" rel="stylesheet" />

    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script src="https://unpkg.com/deck.gl@^8.8.0/dist.min.js"></script>
    <script src="https://unpkg.com/@deck.gl/carto@^8.8.0/dist.min.js"></script>
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
        center: [-73.96, 40.7167], 
        zoom: 14, 
        style: mapName,
        transformRequest,
      });

      map.addControl(new maplibregl.NavigationControl(), "top-left");

      const cartoMapId = 'ff6ac53f-741a-49fb-b615-d040bc5a96b8';
      const {layers} = await deck.carto.fetchMap({cartoMapId});
      const deckOverlay = new deck.MapboxOverlay({layers});
      map.addControl(deckOverlay);
    }

    initializeMap();

  </script>

</html>
```
