## Reference

The CARTO submodule for deck.gl is open source, so we maintain the [documentation](https://deck.gl/docs/api-reference/carto/overview) within the official project repository. We are replicating the content here for convenience.

### setDefaultCredentials

This function defines the default credentials/configuration to be used when connecting with the CARTO platform. The configuration properties that must be defined depend on the CARTO API version used:

- `apiVersion` (optional): API version. Default: `API_VERSIONS.V3`. Possible values are:
  - API_VERSIONS.V1
  - API_VERSIONS.V2
  - API_VERSIONS.V3 (**CARTO 3**)

If using API v1 or v2, the following properties are used:

- `username` (required): unique username in the platform
- `apiKey` (optional): api key. Default: `default_public`
- `region` (optional): region where the user database is located, possible values are `us` or `eu`. Default: `us`, only need to be specified if you've specifically requested an account in `eu`
- `mapsUrl` (optional): Maps API URL Template. Default:
  - `https://{username}.carto.com/api/v1/map` for v1
  - `https://maps-api-v2.{region}.carto.com/user/{username}` for v2

If using API v3, these are the available properties:

- `apiBaseUrl` (optional): base URL for requests to the API (can be obtained in the CARTO 3 Workspace). Default: `https://gcp-us-east1.api.carto.com`.
- `accessToken` (optional): token to authenticate/authorize requests to the Maps API (private datasets)
- `mapsUrl` (optional): Maps API URL Template. By default it is derived from `apiBaseUrl`:
  - `https://{apiBaseUrl}/v3/maps`

If you have a custom CARTO deployment (an on-premise user or you're running CARTO from [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/product/cartodb-public/carto-enterprise-byol)), you’ll need to set the URLs to point to your instance.

```js
setDefaultCredentials({
  username: 'public',
  apiKey: 'default_public',
  mapsUrl: 'https://<domain>/maps-v2/user/{user}'
});
```

### fetchLayerData

The CARTO submodule includes the CartoLayer that simplifies the interaction with the CARTO platform. If you want to use other deck.gl layers (i.e. ArcLayer, H3HexagonLayer...), there are two possibilities depending on the API version you are using:

- If you are using the API v3, you can directly retrieve the data in the format expected by the layer using the `fetchLayerData` function:

  ```js
  import {fetchLayerData} from '@deck.gl/carto';
  import {H3HexagonLayer} from '@deck.gl/geo-layers/';

  const {data} = await fetchLayerData({
    type: MAP_TYPES.QUERY,
    source: `SELECT bqcarto.h3.ST_ASH3(internal_point_geom, 4) as h3, count(*) as count
                FROM bigquery-public-data.geo_us_census_places.us_national_places 
              GROUP BY h3`,
    connection: 'connection_name',
    format: 'json'
  });

  new H3HexagonLayer({
    data,
    filled: true,
    getHexagon: d => d.h3,
    getFillColor: d => [0, (1 - d.count / 10) * 255, 0],
    getLineColor: [0, 0, 0, 200]
  });
  ```

  The formats available are JSON, GEOJSON, TILEJSON, and NDJSON. [NDJSON](http://ndjson.org/) (Newline Delimited JSON) allows to handle incremental data loading https://deck.gl/docs/developer-guide/performance#handle-incremental-data-loading.

- If not using the CARTO 3 API version, you can use the SQL API to retrieve the data in the required format. Please check the examples [here](https://docs.carto.com/deck-gl/examples/clustering-and-aggregation/h3-hexagon-layer/)


### CartoLayer

`CartoLayer` is the layer to visualize data using the CARTO Maps API. This layer allows to work with the different CARTO Maps API versions (v1, v2, and v3). 

By default the `CartoLayer` expects the data to be stored as pair of longitude-latitude coordinates. In this case, vector tiles will be used, with the format depending on `formatTiles`. An [`MVTLayer`](/docs/api-reference/geo-layers/mvt-layer.md) will be created and all properties will be inherited, including the rendering properties available in the [GeoJsonLayer](https://deck.gl/docs/api-reference/layers/geojson-layer).

```js
import DeckGL from '@deck.gl/react';
import {CartoLayer, setDefaultCredentials, MAP_TYPES, API_VERSIONS} from '@deck.gl/carto';

setDefaultCredentials({
  accessToken: 'XXX'
  apiBaseUrl: 'https://gcp-us-east1.api.carto.com' // Default value (optional)
});

function App({viewState}) {
  const layer = new CartoLayer({
    type: MAP_TYPES.QUERY,
    connection: 'bigquery',
    data: 'SELECT * FROM cartobq.testtables.points_10k',
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 200],
    getFillColor: [238, 77, 90],
    lineWidthMinPixels: 1
  })

  return <DeckGL viewState={viewState} layers={[layer]} />;
}
```

CARTO 3 also supports storing data using a spatial index. The `geoColumn` prop is used to specify a database column that contains geographic data. When `geoColumn` has one of the following values, the data will be interpreted as a spatial index:

- `'h3'` [H3](https://docs.carto.com/analytics-toolbox-bigquery/overview/spatial-indexes/#h3) indexing system will be used
- `'quadbin'` [Quadbin](https://docs.carto.com/analytics-toolbox-bigquery/overview/spatial-indexes/#quadbin) indexing system will be used

Tiled data will be used, with the layer created depending on the spatial index used:

- `'h3'` [`H3HexagonLayer`](/docs/api-reference/geo-layers/h3-hexagon-layer.md) will be created and all properties will be inherited.
- `'quadbin'` [`QuadkeyLayer`](/docs/api-reference/geo-layers/quadkey-layer.md) will be created and all properties will be inherited. _Note the `getQuadkey` accessor is replaced with `getQuadbin`_.

```js
import DeckGL from '@deck.gl/react';
import {CartoLayer, setDefaultCredentials, MAP_TYPES, API_VERSIONS} from '@deck.gl/carto';

setDefaultCredentials({
  accessToken: 'XXX'
  apiBaseUrl: 'https://gcp-us-east1.api.carto.com' // Default value (optional)
});

function App({viewState}) {
  const layer = new CartoLayer({
    type: MAP_TYPES.TABLE,
    connection: 'bigquery',
    data: 'cartobq.testtables.h3',
    geoColumn: 'h3',
    aggregationExp: 'AVG(population) as population',
    getFillColor: [238, 77, 90],
    getElevation: d => d.properties.population
  })

  return <DeckGL viewState={viewState} layers={[layer]} />;
}
```

The rendering properties available depend on the format used to store the spatial data. For details see: [Sublayer details](#sublayers).

##### `data` (String)

Required. Either a SQL query or a name of dataset/tileset.

##### `type` (String)

Required. Data type. Possible values are:

- `MAP_TYPES.QUERY`, if `data` is a SQL query.
- `MAP_TYPES.TILESET`, if `data` is a tileset name.
- `MAP_TYPES.TABLE`, if `data` is a dataset name. Only supported with API v3.

##### `connection` (String)

Required when apiVersion is `API_VERSIONS.V3`.

Name of the connection registered in the CARTO workspace.

##### `formatTiles` (String, optional)

Only supported when `apiVersion` is `API_VERSIONS.V3` and `format` is `FORMATS.TILEJSON`. Use it to override the default tile data format. Possible values are: `TILE_FORMATS.BINARY`, `TILE_FORMATS.GEOJSON` and `TILE_FORMATS.MVT`.

##### `geoColumn` (String, optional)

Only supported when apiVersion is `API_VERSIONS.V3` and `type` is `MAP_TYPES.TABLE`.

Name of the `geo_column` in the CARTO platform. Use this override the default column ('geom'), from which the geometry information should be fetched.

##### `columns` (Array, optional)

Only supported when apiVersion is `API_VERSIONS.V3` and `type` is `MAP_TYPES.TABLE`.

Names of columns to fetch. By default, all columns are fetched.

##### `uniqueIdProperty` (String)

- Default: `cartodb_id`

Optional. A string pointing to a unique attribute at the result of the query. A unique attribute is needed for highlighting with vector tiles when a feature is split across two or more tiles.

##### `credentials` (Object)

Optional. Overrides the configuration to connect with CARTO. Check the parameters [here](#setdefaultcredentials).

##### `aggregationExp` (String, optional)

Optional. Aggregation SQL expression. Only used for spatial index datasets.

##### `aggregationResLevel` (Number, optional)

Optional. Aggregation resolution level. Only used for spatial index datasets, defaults to 6 for quadbins, 4 for h3.

##### `onDataLoad` (Function, optional)

`onDataLoad` is called when the request to the CARTO Maps API was completed successfully.

- Default: `data => {}`

Receives arguments:

- `data` (Object) - Data received from CARTO Maps API

##### `onDataError` (Function, optional)

`onDataError` is called when the request to the CARTO Maps API failed. By default the Error is thrown.

- Default: `null`

Receives arguments:

- `error` (`Error`)

#### SubLayers

The `CartoLayer` is a [`CompositeLayer`](https://deck.gl/docs/api-reference/core/composite-layer), and will generate different sublayers depending on the API version and the format used to store the spatial data, as explained above.

##### API v1 & v2

When using version v1 and v2, the layer always works with vector tiles so it inherits all properties from [`MVTLayer`](https://deck.gl/docs/api-reference/geo-layers/mvt-layer).

##### API v3

When using v3, the behavior depends on the format used to specify the spatial data:

- Pairs of longitude-latitude coordinates: the [`GeoJSONLayer`](https://deck.gl/docs/api-reference/layers/geojson-layer.md) is used for rendering.
  
- Spatial data using spatial indices:
  
   - H3 indices: the [`H3HexagonLayer`](/docs/api-reference/geo-layers/h3-hexagon-layer.md) will be used.
   
   - Quadbins: the [`QuadkeyLayer`](/docs/api-reference/geo-layers/quadkey-layer.md) will be used. _Note the `getQuadkey` accessor is replaced with `getQuadbin`_.

#### Source

[modules/carto/src/layers/carto-layer.js](https://github.com/visgl/deck.gl/tree/master/modules/carto/src/layers/carto-layer.js)


### fetchMap

`fetchMap` is an API that instantiates layers configured in CARTO Builder for use with deck.gl. You just need to add your data sources in Builder, style your layers and share your map. Then you need to copy the map ID and use it to retrieve the map configuration from the platform. It is available starting with CARTO Maps API version v3 and deck.gl 8.7.

<div align="center">
  <div>
    <img src="https://raw.githubusercontent.com/visgl/deck.gl-data/master/images/docs/fetch-map.gif" />
    <p><i>Loading a Builder map with deck.gl</i></p>
  </div>
</div>

#### Static display of a CARTO map

```js
import {Deck} from '@deck.gl/core';
import {fetchMap} from '@deck.gl/carto';

const cartoMapId = 'ff6ac53f-741a-49fb-b615-d040bc5a96b8';
fetchMap({cartoMapId}).then(map => new Deck(map));
```

#### Integration with CARTO basemaps

```js
import mapboxgl from 'mapbox-gl';

fetchMap({cartoMapId}).then(({initialViewState, mapStyle, layers}) => {
  const deck = new Deck({canvas: 'deck-canvas', controller: true, initialViewState, layers});

  // Add Mapbox GL for the basemap. It's not a requirement if you don't need a basemap.
  const MAP_STYLE = `https://basemaps.cartocdn.com/gl/${mapStyle.styleType}-gl-style/style.json`;
  const map = new mapboxgl.Map({container: 'map', style: MAP_STYLE, interactive: false});
  deck.setProps({
    onViewStateChange: ({viewState}) => {
      const {longitude, latitude, ...rest} = viewState;
      map.jumpTo({center: [longitude, latitude], ...rest});
    }
  });
});
```

#### Parameters

```js
const map = await fetchMap({cartoMapId, credentials, autoRefresh, onNewData});
```

##### `cartoMapId` (String) 

Required. Identifier of map created in CARTO Builder. 

##### `credentials` (Object, optional)

[CARTO Credentials](#setdefaultcredentials) to use in API requests.

##### `autoRefresh` (Number, optional)

Interval in seconds at which to autoRefresh the data. If provided, `onNewData` must also be provided.

##### `onNewData` (Function, Optional)

Callback function that will be invoked whenever data in layers is changed. If provided, `autoRefresh` must also be provided.

#### Return value

When invoked with a given `cartoMapId`, `fetchMap` will retrieve the information about the map from CARTO, generate appropriate layers and populate them with data. The properties of the `map` are as follows:

##### `id` (String)

The `cartoMapId`.

##### `title` (String)

The title given to the map in CARTO Builder.

##### `description` (String)

The description given to the map in CARTO Builder.

##### `createdAt` (String)

When the map was created.

##### `updatedAt` (String)

When the map was last updated.

##### `initialViewState` (String)

The [view state](https://deck.gl/docs/developer-guide/views#view-state).

##### `mapStyle` (String)

An identifier describing the [basemap](https://deck.gl/docs/api-reference/carto/basemap#supported-basemaps) configured in CARTO Builder.

##### `layers` (Array)

A collection of deck.gl [layers](https://deck.gl/docs/api-reference/layers).
  
##### `stopAutoRefresh` (Function)

A function to invoke to stop auto-refreshing. Only present if `autoRefresh` option was provided to `fetchMap`.

#### Auto-refreshing

With dynamic data sources, the `autoRefresh` option to `fetchMap` makes it simple to create a live-updating map.

```js
const deck = new Deck({canvas: 'deck-canvas'});
const mapConfiguration = {
  autoRefresh: 5,
  cartoMapId,
  onNewData: ({layers}) => {
    deck.setProps({layers});
  }
};

const {initialViewState, layers, stopAutoRefresh} = await fetchMap(mapConfiguration);
deck.setProps({controller: true, initialViewState, layers});

buttonElement.addEventListener('click', () => {
  stopAutoRefresh();
});
```

### Basemaps

[CARTO basemaps](https://carto.com/basemaps/) are available and they can be used without a token.

Ensure you follow the [Terms and Conditions](https://drive.google.com/file/d/1P7bhSE-N9iegI398QYDjKeVhnbS7-Ilk/view) when using them.


#### Usage on React

**Important Note:** Mapbox-GL-JS v2.0 changed to a license that requires an API key for loading the library, which will prevent you from using `react-map-gl` (a higher level library). They have an in-depth guide about it [here](https://github.com/visgl/react-map-gl/blob/master/docs/get-started/mapbox-tokens.md).

In short, if you want to use the library without a Mapbox token, then you have two options: use a `react-map-gl` version less than 6.0 (`npm i react-map-gl@5`), or [substitute `mapbox-gl` with a fork](https://github.com/visgl/react-map-gl/blob/master/docs/get-started/get-started.md#using-with-a-mapbox-gl-fork).

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
</DeckGL>;
```

#### Usage standalone

To use pre-bundled scripts:

```html
<script src="https://unpkg.com/deck.gl@^8.8.0-beta.4/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/carto@^8.8.0-beta.4/dist.min.js"></script>

<!-- or -->
<script src="https://unpkg.com/@deck.gl/core@^8.8.0-beta.4/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/layers@^8.8.0-beta.4/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/geo-layers@^8.8.0-beta.4/dist.min.js"></script>
<script src="https://unpkg.com/@deck.gl/carto@^8.8.0-beta.4/dist.min.js"></script>
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

- POSITRON
- DARK_MATTER
- VOYAGER
- POSITRON_NOLABELS
- DARK_MATTER_NOLABELS
- VOYAGER_NOLABELS


| NAME                 | PREVIEW                                                                                    | STYLE URL                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| POSITRON             | <img src="https://carto.com/help/images/building-maps/basemaps/positron_labels.png"  style="margin-bottom: 0px; vertical-align: middle;" />    | https://basemaps.cartocdn.com/gl/positron-gl-style/style.json             |
| DARK_MATTER          | <img src="https://carto.com/help/images/building-maps/basemaps/dark_labels.png"  style="margin-bottom: 0px; vertical-align: middle;" />        | https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json          |
| VOYAGER              | <img src="https://carto.com/help/images/building-maps/basemaps/voyager_labels.png"  style="margin-bottom: 0px; vertical-align: middle;" />     | https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json              |
| POSITRON_NOLABELS    | <img src="https://carto.com/help/images/building-maps/basemaps/positron_no_labels.png"  style="margin-bottom: 0px; vertical-align: middle;" /> | https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json    |
| DARK_MATTER_NOLABELS | <img src="https://carto.com/help/images/building-maps/basemaps/dark_no_labels.png"  style="margin-bottom: 0px; vertical-align: middle;" />     | https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json |
| VOYAGER_NOLABELS     | <img src="https://carto.com/help/images/building-maps/basemaps/voyager_no_labels.png"  style="margin-bottom: 0px; vertical-align: middle;" />  | https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json     |

### Style Helpers

Helper functions to create data-driven map visualizations.

These helpers take advantage of [CARTOColors](https://carto.com/carto-colors/), custom color schemes built on top of well-known standards for color use on maps, with next generation enhancements for the web and CARTO basemaps.

#### colorBins

Helper function for quickly creating a color bins style based on [d3 scaleThreshold](https://github.com/d3/d3-scale/blob/main/README.md#scaleThreshold).

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

In this example, using colors from the `Teal` palette with length `domain.length + 1`, the range/color equivalence is:

| BIN          | COLOR    |
| ------------ | -------- |
| [, 1e5)      | Teal[0]  |
| [1e5, 2e5)   | Teal[1]  |
| [2e5, 3e5)   | Teal[2]  |
| [3e5,]       | Teal[3]  |

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

| ENUMERATION  | VALUES   |
| ------------ | -------- |
| API_VERSIONS | V1       |
|              | V2       |
|              | V3       |
| MAP_TYPES    | QUERY    |
|              | TABLE    |
|              | TILESET  |
| FORMATS      | GEOJSON  |
|              | JSON     |
|              | TILEJSON |
|              | NDJSON   |
| TILE_FORMATS | BINARY   |
|              | GEOJSON  |
|              | MVT      |
