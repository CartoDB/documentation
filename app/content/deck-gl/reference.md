## Reference

The CARTO submodule for deck.gl is open source, so we maintain the [documentation](https://deck.gl/docs/api-reference/carto/overview) updated in the project official repository. We are replicating the content here for convenience.

### setDefaultCredentials

This is a function to define the connection to CARTO, including the credentials (and optionally the parameters to point to specific api endpoints). The configuration properties that must be defined depend on the CARTO API version used:

* [apiVersion](/deck-gl/reference/#api_versions) (optional): API version. Default: `API_VERSIONS.V2`.

#### CARTO 2

If using API v1 or v2, the following properties are used:

* `username` (required): unique username in the platform
* `apiKey` (optional): api key. Default: `default_public`
* `region` (optional): region where the user database is located, possible values are `us` or `eu`. Default: `us`, only need to be specified if you've specifically requested an account in `eu`
* `mapsUrl` (optional): Maps API URL Template. Default: 
  * `https://{username}.carto.com/api/v1/map` for v1
  * `https://maps-api-v2.{region}.carto.com/user/{username}` for v2


If you have a custom CARTO deployment (on-premise user or you're running CARTO from [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/cartodb-public/carto-enterprise-byol)), you need to set the URLs to point to your instance. 

```js
setDefaultCredentials({
  username: 'public',
  apiKey: 'default_public',
  mapsUrl: 'https://<domain>/maps-v2/user/{user}',
});
```

#### CARTO 3

If using API v3, these are the available properties:

* `apiBaseUrl` (required): base URL for requests to the API (can be obtained in the CARTO 3 Workspace)
* `accessToken` (required): token to authenticate/authorize requests to the Maps API (private datasets)
* `mapsUrl` (optional): Maps API URL Template. Default: `https://{apiBaseUrl}/v3/maps` 


### CartoLayer

`CartoLayer` is the layer to visualize data using the CARTO Maps API.

> **CARTO 3** is a fully cloud native platform currently available only in a private beta. If you want to test it, please contact us at [support@carto.com](mailto:support@carto.com?subject=Access%20to%20Cloud%20%Native%20%API%20(v3)).

#### `data` (String)

Required. Either a SQL query or a name of dataset/tileset.

#### `type` (String)

Required. Data type. Possible values are:

- `MAP_TYPES.QUERY`, if `data` is a SQL query. 
- `MAP_TYPES.TILESET`, if `data` is a tileset name.
- `MAP_TYPES.TABLE`, if `data` is a dataset name. Only supported with API v3.

#### `connection` (String)

Required when apiVersion is `API_VERSIONS.V3`. 

Name of the connection registered in the CARTO workspace.

#### `uniqueIdProperty` (String)

* Default: `cartodb_id`

Optional. A string pointing to a unique attribute at the result of the query. A unique attribute is needed for highlighting with vector tiles when a feature is split across two or more tiles.

#### `credentials` (Object)

Optional. Overrides the configuration to connect with CARTO. Check the parameters [here](overview#carto-credentials).

#### `onDataLoad` (Function, optional)

`onDataLoad` is called when the request to the CARTO Maps API was completed successfully.

* Default: `data => {}`

Receives arguments:

* `data` (Object) - Data received from CARTO Maps API

#### `onDataError` (Function, optional)

`onDataError` is called when the request to the CARTO Maps API failed. By default the Error is thrown.

* Default: `null`

Receives arguments:

* `error` (`Error`)

#### Source

[modules/carto/src/layers/carto-layer.js](https://github.com/visgl/deck.gl/tree/master/modules/carto/src/layers/carto-layer.js)


### Basemaps

[CARTO basemaps](https://carto.com/basemaps/) are available and they can be used without a token.

Ensure you follow the [Terms and Conditions](https://drive.google.com/file/d/1P7bhSE-N9iegI398QYDjKeVhnbS7-Ilk/view) when using them.


#### Usage on React

**Important Note:** Mapbox-GL-JS v2.0 changed to a license that requires an API key for loading the library, which will prevent you from using `react-map-gl` ( a higher level library). They have an in-depth guide about it [here](https://github.com/visgl/react-map-gl/blob/v6.0.0/docs/get-started/mapbox-tokens.md).

In short, if you want to use the library without a Mapbox token, then you have two options: use a `react-map-gl` version less than 6.0 (`npm i react-map-gl@5`), or [substitute `mapbox-gl` with a fork](https://github.com/visgl/react-map-gl/blob/v6.0.0/docs/get-started/get-started.md#using-with-a-mapbox-gl-fork).

To install the dependencies from NPM:

```bash
npm install deck.gl
# or
npm install @deck.gl/core @deck.gl/layers @deck.gl/carto
```

```js
import {DeckGL} from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {BASEMAP} from '@deck.gl/carto';
<DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
  <StaticMap mapStyle={BASEMAP.POSITRON} />
</DeckGL>
```

#### Usage standalone

To use pre-bundled scripts:

```html
<script src="https://unpkg.com/deck.gl@^8.5.0/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/carto@^8.5.0/dist.min.js"></script>

<!-- or -->
<script src="https://unpkg.com/@deck.gl/core@^8.5.0/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/layers@^8.5.0/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/geo-layers@^8.5.0/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/carto@^8.5.0/dist.min.js"></script>
```

```javascript
const deckgl = new deck.DeckGL({
    container: 'map',
    mapStyle: deck.carto.BASEMAP.POSITRON,
    initialViewState: {
      latitude: 0,
      longitude: 0,
      zoom: 1
    },
    controller: true
  });
```

#### Supported basemaps

There are several basemaps available today:

* POSITRON
* DARK_MATTER
* VOYAGER
* POSITRON_NOLABELS
* DARK_MATTER_NOLABELS
* VOYAGER_NOLABELS


| NAME | PREVIEW | STYLE URL  |
| -----|---------| ---------- |
| POSITRON | <img src="https://carto.com/help/images/building-maps/basemaps/positron_labels.png"  /> | https://basemaps.cartocdn.com/gl/positron-gl-style/style.json |
| DARK_MATTER | <img src="https://carto.com/help/images/building-maps/basemaps/dark_labels.png"  /> | https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json |
| VOYAGER | <img src="https://carto.com/help/images/building-maps/basemaps/voyager_labels.png"  /> | https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json |
| POSITRON_NOLABELS | <img src="https://carto.com/help/images/building-maps/basemaps/positron_no_labels.png"  /> | https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json |
| DARK_MATTER_NOLABELS | <img src="https://carto.com/help/images/building-maps/basemaps/dark_no_labels.png"  /> | https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json |
| VOYAGER_NOLABELS | <img src="https://carto.com/help/images/building-maps/basemaps/voyager_no_labels.png"  /> | https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json |


### Style Helpers

Helper functions to create data-driven map visualizations.

These helpers take advantage of [CARTOColors](https://carto.com/carto-colors/), custom color schemes built on top of well-known standards for color use on maps, with next generation enhancements for the web and CARTO basemaps.

#### colorBins

Helper function for quickly creating a color bins style.

Data values of each attribute are rounded down to the nearest value in the domain and are then styled with the corresponding color.

```javascript
new CartoLayer({
  type: MAP_TYPES.QUERY,
  data: 'SELECT the_geom_webmercator, gn_pop FROM populated_places',
  getFillColor: colorBins({
    attr: 'gn_pop',
    domain: [1e5, 2e5, 3e5],
    colors: 'Teal'
  })
});
```

##### Arguments

###### `attr` (String) 

Attribute or column to symbolize by.

###### `domain` (Array) 

Assign manual class break values.

###### `colors` (String | Array, optional)

Color assigned to each domain value.

- String: A valid named [CARTOColors](https://carto.com/carto-colors/) palette.
- Array: Array of colors in RGBA `[ [r, g, b, [a]] ]`. 

Default: `PurpOr`

###### `nullColor` (Array, optional)

Color for null values.

Default: `[204, 204, 204]`

#### colorCategories

Helper function for quickly creating a color category style.

Data values of each attribute listed in the domain are mapped one to one with corresponding colors in the range.

```javascript
new CartoLayer({
  type: MAP_TYPES.QUERY,
  data: 'SELECT the_geom_webmercator, type FROM ne_10m_airports',
  getFillColor: colorCategories({
    attr: 'type',
    domain: ['mid', 'major', 'military mid', 'mid and military', 'major and military'],
    colors: 'Bold'
  })
});
```

##### Arguments

###### `attr` (String) 

Attribute or column to symbolize by.

###### `domain` (Array) 

Category list. Must be a valid list of categories.

###### `colors` (String | Array, optional)

Color assigned to each domain value.

- String: A valid named [CARTOColors](https://carto.com/carto-colors/) palette.
- Array: Array of colors in RGBA `[ [r, g, b, [a]] ]`. 

Default: `PurpOr`

###### `nullColor` (Array, optional)

Color for null values.

Default: `[204, 204, 204]`

###### `othersColor` (Array, optional)

Fallback color for a category not correctly assigned.

Default: `[119, 119, 119]`

#### colorContinuous

Helper function for quickly creating a color continuous style.

Data values of each field are interpolated linearly across values in the domain and are then styled with a blend of the corresponding color in the range.

```javascript
new CartoLayer({
  type: MAP_TYPES.QUERY,
  data: 'SELECT the_geom_webmercator, gn_pop FROM populated_places',
  getFillColor: colorContinuous({
    attr: 'gn_pop',
    domain: [0, 1e5],
    colors: 'BluYl'
  })
});
```

##### Arguments

###### `attr` (String) 

Attribute or column to symbolize by.

###### `domain` (Array) 

Attribute domain to define the data range.

###### `colors` (String | Array, optional)

Color assigned to each domain value.

- String: A valid named [CARTOColors](https://carto.com/carto-colors/) palette.
- Array: Array of colors in RGBA `[ [r, g, b, [a]] ]`. 

Default: `PurpOr`

###### `nullColor` (Array, optional)

Color for null values.

Default: `[204, 204, 204]`


### Constants

To make it easier to work with the CARTO module the following constants are provided:

#### API_VERSIONS

Enumeration values: V1, V2, V3.

#### MAP_TYPES

Enumeration values: QUERY, TABLE, TILESET

#### FORMATS

Enumeration values: GEOJSON, JSON, TILEJSON, NDJSON