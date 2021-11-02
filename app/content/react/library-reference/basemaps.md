## Basemaps

{{% tableWrapper %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/react-basemaps  | <a href="https://npmjs.org/package/@carto/react-basemaps">  <img src="https://img.shields.io/npm/v/@carto/react-basemaps.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-basemaps">  <img src="https://img.shields.io/npm/dt/@carto/react-basemaps.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a>
{{%/ tableWrapper %}}

This package includes constants for working with CARTO and Google Maps basemaps and a component for integration with the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/overview).

### Components

#### GoogleMap

React component for working with Google Maps API and [deck.gl](https://deck.gl), by using `GoogleMapsOverlay`, from `@deck.gl/google-maps` module;. It offers a basic Google Maps basemap with an interface similar to the one presented by `react-map-gl` for Mapbox, thus allowing an easier change between them in your app. It supports both raster and vector basemaps.

- **Input**:

{{% tableWrapper tab="true" %}}
| Param                   | Type                             | Description                                  |
| ----------------------- | -------------------------------- | -------------------------------------------- |
| props                   |                                  |                                              |
| props.basemap           | <code>Object</code>              | Basemap                                      |
| props.viewState         | <code>Object</code>              | Viewstate (center, zoom level)               |
| props.layers            | <code>Array.&lt;Layer&gt;</code> | Layers array                                 |
| props.apiKey            | <code>string</code>              | Google Maps API Key                          |
| props.mapId             | <code>string</code>              | Optional. Google Maps Map ID                 |
| props.getTooltip        | <code>function</code>            | Optional. Tooltip handler                    |
| props.onResize          | <code>function</code>            | Optional. Handler for resize event           |
| props.onViewStateChange | <code>function</code>            | Optional. Handler for viewstate change event |
{{%/ tableWrapper %}}

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

  **Tip:** if you use CARTO for React template, there is a generic `<Map>` component that abstracts away the use of a `GoogleMap` or a Mapbox basemap, and manages its state within Redux, in a very easy to use way.

### Constants & enums

#### BASEMAPS

- **Options**:

  - POSITRON
  - VOYAGER
  - DARK_MATTER
  - GOOGLE_ROADMAP
  - GOOGLE_SATELLITE
  - GOOGLE_HYBRID
  - GOOGLE_CUSTOM
  
- **Example**:

  ```js
  import { BASEMAPS } from "@carto/react-basemaps";

  console.log(BASEMAPS.VOYAGER); // 'voyager'
  ```
