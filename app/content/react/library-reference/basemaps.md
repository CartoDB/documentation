## Basemaps

**npm package: @carto/react-basemaps**

Basemaps constants and a GoogleMaps component

### Components

#### GoogleMap

React component for working with Google Maps API and [deck.gl](https://deck.gl), by using `GoogleMapsOverlay`, from _@deck.gl/google-maps\_ module;. It tries to offer a basic googlemaps basemap, with an interface very similar to the one presented by `react-map-gl` for Mabpox, thus allowing an easier change between them in your app.

- **Input**:

  | Param            | Type                             | Description                    |
  | ---------------- | -------------------------------- | ------------------------------ |
  | props            |                                  |                                |
  | props.basemap    | <code>Object</code>              | Basemap                        |
  | props.viewState  | <code>Object</code>              | Viewstate (center, zoom level) |
  | props.layers     | <code>Array.&lt;Layer&gt;</code> | Layers array                   |
  | props.getTooltip | <code>function</code>            | Tooltip handler                |
  | props.apiKey     | <code>string</code>              | Google Maps API Key            |

- **Example**:

  ```js
  import { GOOGLE_SATELLITE, GoogleMap } from "@carto/react-basemaps";

  const googleApiKey = "YOUR_API_KEY";
  const viewState = { longitude: 0, latitude: 0, zoom: 1 };

  // options allows passing extra MapOptions (see: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
  const basemap = { options: { mapTypeId: GOOGLE_SATELLITE, streetViewControl: true } };

  const deckLayers = []; // array of deck.gl layers

  // (in a react render response...)
  return (
    <GoogleMap 
      apiKey={googleApiKey}
      viewState={viewState}
      basemap={basemap}
      layers={deckLayers}
    />
  );
  ```

  **Tip:** if you use _cra template_, there is a generic `<Map>` component that abstracts away the use of a `GoogleMap` or a Mapbox basemap, and manages its state within Redux, in a very easy to use way.

### Constants & enums

#### BASEMAPS

- **Options**:

  - POSITRON
  - VOYAGER
  - DARK_MATTER
  - GOOGLE_ROADMAP
  - GOOGLE_SATELLITE
  - GOOGLE_HYBRID

- **Example**:

  ```js
  import { BASEMAPS } from "@carto/react-basemaps";

  console.log(BASEMAPS.VOYAGER); // 'voyager'
  ```
