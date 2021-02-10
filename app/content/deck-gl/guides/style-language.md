## Style Language

deck.gl supports a declarative system for describing layers and their props. This feature can be used to generate powerful visualizations directly from a JSON document. You can describe a visualization in abstract terms and you can view the results without needing to write JavaScript code.

This declarative system is used in deck.gl [playground](https://deck.gl/playground) and supports the layers from CARTO module. It is also the system used in CARTO [viewer](https://carto.com/viewer) to create and share tilesets visualizations.

The declarative language allows you to define the style and cartography of your visualization and set other general map options. Technically this language is based on JSON that gets transformed into Javascript objects and functions. Check out the [official documentation](https://deck.gl/docs/api-reference/json/json-converter) on the JSON format for further technical details.

In this guide we are going to focus more on providing a guide to the different options the language provides and document most common visualizations.

### API reference

The declarative system creates deck.gl objects from a JSON representation. For instance, the `initialViewState` element in the JSON representation (declarative way) corresponds to a [view state](https://deck.gl/docs/api-reference/core/map-view#view-state) object when you are working with deck.gl in a programmatic way. 

Usually the name-value pairs in the JSON representation correspond to object properties in deck.gl objects and the arrays correspond to JavaScript arrays. There are a couple of specific name-value pairs that are very useful:

- `@@type`. It is used to indicate the class of the object we want to create; for instance, for specifying the type of layer we want to use.

- `@@function`. It is used to specify a function to be executed to evaluate a data accessor; for instance, for using helpers to specify the color that we want to assign to features.

In the sections below we have included links to the deck.gl documentation.


### General parameters

#### initialViewState
Type: object

Description: Defines the initial [view state](https://deck.gl/docs/api-reference/core/map-view#view-state) for the visualization.

| Property Name    | Type         | Description                                        |
|------------------|--------------|----------------------------------------------------|
|     latitude     | number       | Latitude at the map center.              |
|     longitude    | number       | Longitude at the map center.             |
|     zoom         | number       | Initial zoom level.                      |
|     pitch        | number       | Default: 0. Pitch angle (in degrees). |
|     bearing      | number       | Default: 0. Bearing angle (in degrees).    |
|     minZoom      | number       | Default: 0. Min zoom level.    |
|     maxZoom      | number       | Default: 20. Max zoom level.    |
|     minPitch     | number       | Default: 0. Min pitch angle.    |
|     maxPitch     | number       | Default: 60. Max pitch angle.    |

Example: Visualization centered at (0, 0) coordinates, zoom level 2.

```json
{
  ...
  "initialViewState": {
    "latitude": 0,
    "longitude": 0,
    "zoom": 2,
  },
  ...
}
```

#### views
Type: array

Description: Defines the views

Each view object has the following properties:

| Property Name    | Type         | Description                                       |
|------------------|--------------|---------------------------------------------------|
|     @@type       | string       | Use [`MapView`](https://deck.gl/docs/api-reference/core/map-view) in the CARTO viewer for a Web Mercator Projection. Other types of views are also supported by the declarative syntax (but not in CARTO viewer) like [`FirstPersonView`](https://deck.gl/docs/api-reference/core/first-person-view), [`Globeview`](https://deck.gl/docs/api-reference/core/globe-view), [`OrtographicView`](https://deck.gl/docs/api-reference/core/orthographic-view) or [`OrbitView`](https://deck.gl/docs/api-reference/core/orbit-view).     |
|     controller   | boolean      | Indicates if the map is interactive (supports pan, zoom...) or not.       |
|     mapStyle     | number       | Basemap to use in the map. It can be a full URL to a vector style like [this one](https://basemaps.cartocdn.com/gl/positron-gl-style/style.json), or it can be a string from [this dictionary](https://deck.gl/docs/api-reference/carto/basemap) |  

Example: Configuring an interactive [`MapView`](https://deck.gl/docs/api-reference/core/map-view) with the CARTO Positron basemap.

```json
{
  ...  
  "views": [
    {
      "@@type": "MapView",
      "controller": true,
      "mapStyle": "@@#CARTO_BASEMAP.POSITRON"
    }
  ],
  ...
}
```

#### Layers (Basic Properties)
Type: array

Description: Layers to overlay on the map. It is an array so you can compose multiple layers and define their blending functions.

| Property Name    | Type         | Description                                       |
|------------------|--------------|---------------------------------------------------|
|     @@type       | string       | "CartoBQTilerLayer" or "CartoSQLLayer"  |
|     data         | string       | In the case of a [BigQuery TileSet](https://deck.gl/docs/api-reference/carto/carto-bqtiler-layer#data) you indicate the project.dataset.table_name. In the case of [CartoSQLLayer](https://deck.gl/docs/api-reference/carto/carto-sql-layer#data) you indicate the SQL from CARTO to use. |
| [credentials](https://deck.gl/docs/api-reference/carto/overview#carto-credentials)  | object       | CARTO authentication credentials  |  
|     credentials.username  | object       | CARTO username  |  
|     credentials.apiKey  | object       | CARTO API Key. In the case of a private map you add here the api key, for a public map you can use default_public.  |  
|     credentials.region  | object       | Default: `us`. Region wher the user database is located; possible values are `us` or `eu`. Only need to be specified if you've specifically requested an account in the `eu` region.  |  
|     credentials.mapsUrl  | object       | Default: `https://{user}.carto.com/api/v1/map`. If you're an on-premise user or you're running CARTO from Google's marketplace, you need to set the URL to point to your instance.  |  
|     credentials.sqlUrl  | object       | Default: `https://{user}.carto.com/api/v2/sql`. If you're an on-premise user or you're running CARTO from Google's marketplace, you need to set the URL to point to your instance.  |  
| [pickable](https://deck.gl/docs/api-reference/core/layer#visible)         | boolean      | Default: false. Indicates whether the layer responds to mouse pointer picking events. |
| [uniqueIdProperty](https://deck.gl/docs/api-reference/carto/carto-sql-layer#uniqueidproperty) | string | Default: `cartodb_id`. Needed for highlighting a feature split across two or more tiles if no feature id is provided. An string pointing to a tile attribute containing a unique identifier for features across tiles. |
| [visible](https://deck.gl/docs/api-reference/core/layer#visible)          | boolean      | Default: true. Indicates whether the layer is visible. Under most circumstances, using visible prop to control the visibility of layers is recommended over doing conditional rendering. |

Example: Visualizing a BigQuery Tileset Layer from a public tileset (using public credentials) named `cartobq.maps.osm_buildings` that responds to mouse pointer picking events.

```json
{
  ...  
  "layers": [
    {
      "@@type": "CartoBQTilerLayer",
      "data": "cartobq.maps.osm_buildings",
      "credentials": {
        "username": "public",
        "apiKey": "default_public"
      },
      "pickable": true,
      ...
    },
    ...
  ]
  ...
}
```

#### Layers (Styling Properties)

In this section we describe the styling properties for layers that can be used when working with @deck.gl/carto layers, based on the [`GeoJsonLayer`](https://deck.gl/docs/api-reference/layers/geojson-layer).

| Property Name        | Type                 | Description                                       |
|----------------------|----------------------|---------------------------------------------------|
| [autoHighlight](https://deck.gl/docs/api-reference/core/layer#autohighlight) | boolean | Default: false. When true, current object pointed by mouse pointer (when hovered over) is highlighted with highlightColor. Requires `pickable` to be true. |
| [elevationScale](https://deck.gl/docs/api-reference/layers/geojson-layer#elevationscale)       | number               | Default: 1. Elevation multiplier. The final elevation is calculated by elevationScale * getElevation(d). elevationScale is a handy property to scale all polygon elevation without updating the data. |
| [extruded](https://deck.gl/docs/api-reference/layers/geojson-layer#extruded)             | boolean              | Default: false. Whether to extrude the polygons (based on the elevations provided by the getElevation accessor. If set to false, all polygons will be flat, this generates less geometry and is faster than simply returning 0 from getElevation. | 
| [filled](https://deck.gl/docs/api-reference/layers/geojson-layer#filled)               | boolean              | Default: true. Whether to draw filled polygons (solid fill). Note that for each polygon, only the area between the outer polygon and any holes will be filled. This prop is effective only when the polygon is NOT extruded. |
| [getElevation](https://deck.gl/docs/api-reference/layers/geojson-layer#getelevation)         | number or @@function | The elevation to extrude each polygon with. If a cartographic projection mode is used, height will be interpreted as meters, otherwise will be in unit coordinates. Only applies if extruded: true. If a number is provided, it is used as the elevation for all polygons. If a function is provided, it is called on each polygon to retrieve its elevation. Note: If 3D positions are returned by getPolygon, the extrusion returned by getElevation is added to the base altitude of each vertex. |
| [getFillColor](https://deck.gl/docs/api-reference/layers/geojson-layer#getfillcolor)         | array or @@function  | The color, in RGBA array format, to use as the fill color. If a function is provided, it is called on each object to retrieve its color. Check the color ramps section for examples. |
| [getLineColor](https://deck.gl/docs/api-reference/layers/geojson-layer#getlinecolor)         | array or @@function  | The color, in RGBA array format, to use as the outline color. If a function is provided, it is called on each object to retrieve its color. Check the color ramps section for examples. |
| [getRadius](https://deck.gl/docs/api-reference/layers/geojson-layer#getradius)            | number or @@function | The radius of each object, in units specified by `radiusUnits` (default meters). If a function is provided, it is called on each object to retrieve its radius. |
| [getLineWidth](https://deck.gl/docs/api-reference/layers/geojson-layer#getlinewidth)         | number or @@function | The width of the outline of each object, in units specified by `lineWidthUnits` (default meters). If a function is provided, it is called on each object to retrieve its outline width. |
| [highlightColor](https://deck.gl/docs/api-reference/core/layer#highlightcolor) | array or @@function | Default: [0, 0, 128, 128]. RGBA color to blend with the highlighted object (either the hovered over object if `autoHighlight`: true, or the object at the index specified by `highlightedObjectIndex`). When the value is a 3 component (RGB) array, a default alpha of 255 is applied. If an array is supplied, it is used for the object that is currently highlighted. If a function is supplied, it is called with a [`pickingInfo`](https://deck.gl/docs/developer-guide/interactivity#the-picking-info-object) object when the hovered object changes. The return value is used as the highlight color for the picked object. Only works with `autoHighlight`: true. | 
| [lineJointRounded](https://deck.gl/docs/api-reference/layers/geojson-layer#linejointrounded) | boolean | Default: false. Type of joint. If true, draw round joints. Otherwise draw miter joints. |
| [lineWidthMinPixels](https://deck.gl/docs/api-reference/layers/geojson-layer#linewidthminpixels)   | number               | Default: 0. The minimum line width in pixels. |
| [lineWidthScale](https://deck.gl/docs/api-reference/layers/geojson-layer#linewidthscale)       | number               | Default: 1. The line width multiplier applied to all outlines of Polygon and MultiPolygon features if the stroked attribute is true. |
| [opacity](https://deck.gl/docs/api-reference/core/layer#opacity)              | number               | Default: 1. The opacity of the layer. |
| [pointRadiusMinPixels](https://deck.gl/docs/api-reference/layers/geojson-layer#pointradiusminpixels) | number               | The minimum radius in pixels. |
| [stroked](https://deck.gl/docs/api-reference/layers/geojson-layer#stroked)              | boolean              | Default: true. Indicates whether to draw an outline around the polygon (solid fill). Note that both the outer polygon as well the outlines of any holes will be drawn. |

### Creating visualizations

If you click in any of the following examples, you will be redirected to CARTO Viewer where you can inspect what is the JSON needed for configuring each visualization. Below the examples you will find additional information regarding how you can use the style helper functions to create advanced visualizations.

{{<grid>}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjo0My42MzcyMDg3MzUyNzc4OTUsImxvbmdpdHVkZSI6NC4zMTY2NzQ5NDIwNzM1NjgsInpvb20iOjQuNDgyMzczNDI2NjA5NTg4LCJwaXRjaCI6MCwiYmVhcmluZyI6MCwiZHJhZ1JvdGF0ZSI6ZmFsc2UsIndpZHRoIjoxMzQ0LCJoZWlnaHQiOjk1MywiYWx0aXR1ZGUiOjEuNSwibWF4Wm9vbSI6MjAsIm1pblpvb20iOjAsIm1heFBpdGNoIjo2MCwibWluUGl0Y2giOjAsInRyYW5zaXRpb25EdXJhdGlvbiI6MCwidHJhbnNpdGlvbkludGVycnVwdGlvbiI6MX0sInZpZXdzIjpbeyJAQHR5cGUiOiJNYXBWaWV3IiwiY29udHJvbGxlciI6dHJ1ZSwibWFwU3R5bGUiOiJAQCNDQVJUT19CQVNFTUFQLlZPWUFHRVIifV0sImxheWVycyI6W3siQEB0eXBlIjoiQ2FydG9TUUxMYXllciIsImRhdGEiOiJzZWxlY3QgdGhlX2dlb21fd2VibWVyY2F0b3IsIGduX3BvcCwgZ25fYXNjaWkgZnJvbSBwb3B1bGF0ZWRfcGxhY2VzIiwiY3JlZGVudGlhbHMiOnsidXNlcm5hbWUiOiJwdWJsaWMiLCJhcGlLZXkiOiJkZWZhdWx0X3B1YmxpYyJ9LCJnZXRGaWxsQ29sb3IiOlsyNTUsMTQwLDBdLCJwb2ludFJhZGl1c01pblBpeGVscyI6Niwic3Ryb2tlZCI6dHJ1ZSwibGluZVdpZHRoTWluUGl4ZWxzIjoxLCJnZXRMaW5lQ29sb3IiOlswLDAsMF0sInBpY2thYmxlIjp0cnVlfV19"
  target="_blank"
  image="/img/deck-gl/example-simple-point.png" 
  title="Simple Point" 
  description="Simple example with a point layer.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozLjUwNDI3NzgzMTA3MDg0OSwibG9uZ2l0dWRlIjoyMC4yNzU4NjA1NTQ2NjIzNzYsInpvb20iOjIuOTI0NDE2MjU3NjI0MTUyNiwicGl0Y2giOjAsImJlYXJpbmciOjAsImRyYWdSb3RhdGUiOmZhbHNlLCJ3aWR0aCI6MTM0NCwiaGVpZ2h0Ijo5NTMsImFsdGl0dWRlIjoxLjUsIm1heFpvb20iOjIwLCJtaW5ab29tIjowLCJtYXhQaXRjaCI6NjAsIm1pblBpdGNoIjowLCJ0cmFuc2l0aW9uRHVyYXRpb24iOjAsInRyYW5zaXRpb25JbnRlcnJ1cHRpb24iOjF9LCJ2aWV3cyI6W3siQEB0eXBlIjoiTWFwVmlldyIsImNvbnRyb2xsZXIiOnRydWUsIm1hcFN0eWxlIjoiQEAjQ0FSVE9fQkFTRU1BUC5QT1NJVFJPTiJ9XSwibGF5ZXJzIjpbeyJAQHR5cGUiOiJDYXJ0b1NRTExheWVyIiwiZGF0YSI6Im5lXzUwbV9hZG1pbl8wX2JvdW5kYXJ5X2xpbmVzX2xhbmQiLCJjcmVkZW50aWFscyI6eyJ1c2VybmFtZSI6InB1YmxpYyIsImFwaUtleSI6ImRlZmF1bHRfcHVibGljIn0sInN0cm9rZWQiOnRydWUsImxpbmVXaWR0aE1pblBpeGVscyI6MiwiZ2V0TGluZUNvbG9yIjpbMjU1LDAsMjU1XSwicGlja2FibGUiOnRydWV9XX0%3D"
  target="_blank"
  image="/img/deck-gl/example-simple-lines.png" 
  title="Simple Line" 
  description="Simple example with a line layer.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjo1My4wNTM2NzI2MTMxNDYzNCwibG9uZ2l0dWRlIjoyMC44NTMxODg2MzU4NzU0MzMsInpvb20iOjMuNDc4Nzk2MTg5MTQ5ODE3NiwicGl0Y2giOjAsImJlYXJpbmciOjAsImRyYWdSb3RhdGUiOmZhbHNlLCJ3aWR0aCI6MTM0NCwiaGVpZ2h0Ijo5NTMsImFsdGl0dWRlIjoxLjUsIm1heFpvb20iOjIwLCJtaW5ab29tIjowLCJtYXhQaXRjaCI6NjAsIm1pblBpdGNoIjowLCJ0cmFuc2l0aW9uRHVyYXRpb24iOjAsInRyYW5zaXRpb25JbnRlcnJ1cHRpb24iOjF9LCJ2aWV3cyI6W3siQEB0eXBlIjoiTWFwVmlldyIsImNvbnRyb2xsZXIiOnRydWUsIm1hcFN0eWxlIjoiQEAjQ0FSVE9fQkFTRU1BUC5QT1NJVFJPTiJ9XSwibGF5ZXJzIjpbeyJAQHR5cGUiOiJDYXJ0b1NRTExheWVyIiwiZGF0YSI6Im5lXzUwbV9hZG1pbl8wX2NvdW50cmllcyIsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoicHVibGljIiwiYXBpS2V5IjoiZGVmYXVsdF9wdWJsaWMifSwiZ2V0RmlsbENvbG9yIjpbMTUwLDAsMTUwXSwic3Ryb2tlZCI6dHJ1ZSwibGluZVdpZHRoTWluUGl4ZWxzIjoxLCJnZXRMaW5lQ29sb3IiOls1MCw1MCw1MF0sInBpY2thYmxlIjp0cnVlfV19"
  target="_blank"
  image="/img/deck-gl/example-simple-polygon.png" 
  title="Simple Polygon" 
  description="Simple example with a polygon layer.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?data=cartobq.maps.osm_buildings&color_by_value=aggregated_total"
  target="_blank"
  image="/img/deck-gl/example-color-bins.png" 
  title="Color Bins" 
  description="Assigning colors to bins.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/bmunoz/bigquery?config=eyJkZXNjcmlwdGlvbiI6IkNhcnRvQlFUaWxlckxheWVyIGRlY2xhcmF0aXZlIGV4YW1wbGUiLCJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjo0MCwibG9uZ2l0dWRlIjotOTYsInpvb20iOjQsInBpdGNoIjowLCJiZWFyaW5nIjowLCJkcmFnUm90YXRlIjpmYWxzZSwid2lkdGgiOjEzNDQsImhlaWdodCI6OTUzLCJhbHRpdHVkZSI6MS41LCJtYXhab29tIjoyMCwibWluWm9vbSI6MCwibWF4UGl0Y2giOjYwLCJtaW5QaXRjaCI6MCwidHJhbnNpdGlvbkR1cmF0aW9uIjowLCJ0cmFuc2l0aW9uSW50ZXJwb2xhdG9yIjp7Il9wcm9wc1RvQ29tcGFyZSI6WyJsb25naXR1ZGUiLCJsYXRpdHVkZSIsInpvb20iLCJiZWFyaW5nIiwicGl0Y2giXSwiX3Byb3BzVG9FeHRyYWN0IjpbImxvbmdpdHVkZSIsImxhdGl0dWRlIiwiem9vbSIsImJlYXJpbmciLCJwaXRjaCJdLCJfcmVxdWlyZWRQcm9wcyI6WyJsb25naXR1ZGUiLCJsYXRpdHVkZSIsInpvb20iXSwib3B0cyI6eyJhcm91bmQiOls1MjYsNTgxXX19LCJ0cmFuc2l0aW9uSW50ZXJydXB0aW9uIjoxfSwidmlld3MiOlt7IkBAdHlwZSI6Ik1hcFZpZXciLCJjb250cm9sbGVyIjp0cnVlLCJtYXBTdHlsZSI6IkBAI0NBUlRPX0JBU0VNQVAuUE9TSVRST04ifV0sImxheWVycyI6W3siQEB0eXBlIjoiQ2FydG9CUVRpbGVyTGF5ZXIiLCJkYXRhIjoiY2FydG9kYi1nY3AtYmFja2VuZC1kYXRhLXRlYW0uYWxhc2Fyci51c2FfY291bnR5XzIwMTVfdGlsZXNldCIsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoicHVibGljIiwiYXBpS2V5IjoiZGVmYXVsdF9wdWJsaWMifSwiZ2V0RmlsbENvbG9yIjp7IkBAZnVuY3Rpb24iOiJjb2xvckNhdGVnb3JpZXMiLCJhdHRyIjoicG9wX2NhdCIsImRvbWFpbiI6WyJsb3ciLCJtZWRpdW0iLCJoaWdoIl0sImNvbG9ycyI6IlJlZE9yIn0sInBvaW50UmFkaXVzTWluUGl4ZWxzIjoyLCJzdHJva2VkIjpmYWxzZSwicGlja2FibGUiOnRydWV9XX0%3D"
  target="_blank"
  image="/img/deck-gl/example-color-categories.png" 
  title="Color Categories" 
  description="Assigning colors to categories.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?config=eyJkZXNjcmlwdGlvbiI6IkNhcnRvQlFUaWxlckxheWVyIGRlY2xhcmF0aXZlIGV4YW1wbGUiLCJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozMCwibG9uZ2l0dWRlIjotMTAwLCJ6b29tIjozLCJwaXRjaCI6MCwiYmVhcmluZyI6MCwiZHJhZ1JvdGF0ZSI6ZmFsc2UsIndpZHRoIjo4NjQsImhlaWdodCI6NzczLCJhbHRpdHVkZSI6MS41LCJtYXhab29tIjoyMCwibWluWm9vbSI6MCwibWF4UGl0Y2giOjYwLCJtaW5QaXRjaCI6MCwidHJhbnNpdGlvbkR1cmF0aW9uIjowfSwidmlld3MiOlt7IkBAdHlwZSI6Ik1hcFZpZXciLCJjb250cm9sbGVyIjp0cnVlLCJtYXBTdHlsZSI6IkBAI0NBUlRPX0JBU0VNQVAuUE9TSVRST04ifV0sImxheWVycyI6W3siQEB0eXBlIjoiQ2FydG9CUVRpbGVyTGF5ZXIiLCJkYXRhIjoiY2FydG9icS5tYXBzLmFpc190aWxlc2V0IiwiY3JlZGVudGlhbHMiOnsidXNlcm5hbWUiOiJwdWJsaWMiLCJhcGlLZXkiOiJkZWZhdWx0X3B1YmxpYyJ9LCJnZXRGaWxsQ29sb3IiOnsiQEBmdW5jdGlvbiI6ImNvbG9yQ29udGludW91cyIsImF0dHIiOiJhZ2dyZWdhdGVkX3RvdGFsIiwiZG9tYWluIjpbMSwxMDAsMTAwMCwxMDAwMCw1MDAwMDBdLCJjb2xvcnMiOiJQZWFjaCJ9LCJwb2ludFJhZGl1c01pblBpeGVscyI6Miwic3Ryb2tlZCI6ZmFsc2UsInBpY2thYmxlIjp0cnVlfV19"
  target="_blank"
  image="/img/deck-gl/example-color-continuous.png" 
  title="Color Continuous" 
  description="Assigning a continuous color ramp.">}}

{{</grid>}}

#### Style helpers

A common type of map visualization is assigning a color to each feature based on a property. When working with the CARTO viewer to visualize a BQTilerLayer or a CartoSQLLayer, you can use the available helper layers:

- [`colorBins`](https://deck.gl/docs/api-reference/carto/styles#colorbins). Data values of each attribute are rounded down to the nearest value in the domain and are then styled with the corresponding color.

- [`colorCategories`](https://deck.gl/docs/api-reference/carto/styles#colorcategories). Data values of each attribute listed in the domain are mapped one to one with corresponding colors in the range.

- [`colorContinuous`](https://deck.gl/docs/api-reference/carto/styles#color-continuous). Data values of each field are interpolated linearly across values in the domain and are then styled with a blend of the corresponding color in the range.

These helper functions support the following properties:

| Property Name        | Type                 | Description                                       |
|----------------------|----------------------|---------------------------------------------------|
| [attr](https://deck.gl/docs/api-reference/carto/styles#attr) | string | Attribute or column to symbolize by. |
| domain               | array | For [`colorBins`](https://deck.gl/docs/api-reference/carto/styles#domain) defines the manual class break values. For [`colorCategories`](https://deck.gl/docs/api-reference/carto/styles#domain-1) defines the category list (must be valid). For [`colorContinuous`](https://deck.gl/docs/api-reference/carto/styles#domain-2) defines the attribute domain to define the data range. |
| [colors](https://deck.gl/docs/api-reference/carto/styles#colors) | string or array | Default: PurpOr. Color assigned to each domain value. If a string is provided, it must be a valid named [CARTOColors](https://carto.com/carto-colors/) palette. If an array is provided, it must be an array of colors in RGBA [ [r, g, b, [a]] ]. |
| [nullColor](https://deck.gl/docs/api-reference/carto/styles#nullcolor) | array | Default: [204, 204, 204]. Color for null values. |
| [othersColor](https://deck.gl/docs/api-reference/carto/styles#otherscolor) | array | Default: [119, 119, 119]. Only available for the `ColorCategories` helper. Fallback color for a category not assigned. |

#### ColorBins example

This example shows how you can create bins on a numeric feature property and assign a different color to each bin. We need to use the [`getFillColor`](https://deck.gl/docs/api-reference/layers/geojson-layer#getfillcolor) data accessor and assign the following properties:

- `@@function`: `colorBins`.
- `@@attr`: The feature property name with numeric data type.
- `@@domain`: An array with the manual breaks/bins.
- `colors`: The CARTOColors palette to use.

```json
{
  ...
  "layers": [
    {
      ...
      "getFillColor": {
        "@@function": "colorBins",
        "attr": "aggregated_total",
        "domain": [
          10,
          100,
          1000,
          10000,
          100000,
          1000000
        ],
        "colors": "Temps"
      },
      ...    
    }
  ]  
}
```

View this example with a tileset in the CARTO viewer [here](https://viewer.carto.com/user/public/bigquery?data=cartobq.maps.osm_buildings&color_by_value=aggregated_total)

#### ColorCategories example

This example shows how you can assign a different color to each feature depending on a string feature property value. We need to use the [`getFillColor`](https://deck.gl/docs/api-reference/layers/geojson-layer#getfillcolor) data accessor and assign the following properties:

- `@@function`: `colorCategories`.
- `@@attr`: The feature property name with string data type.
- `@@domain`: The different values of the string property.
- `colors`: The CARTOColors palette to use.
  
```json
{
  ...
  "layers": [
    {
      ...
      "getFillColor": {
        "@@function": "colorCategories",
        "attr": "pop_cat",
        "domain": [
          "low",
          "medium",
          "high"
        ],
        "colors": "RedOr"
      },
      ...    
    }
  ]  
}
```

View this example in the CARTO viewer [here](https://viewer.carto.com/user/bmunoz/bigquery?config=eyJkZXNjcmlwdGlvbiI6IkNhcnRvQlFUaWxlckxheWVyIGRlY2xhcmF0aXZlIGV4YW1wbGUiLCJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjo0MCwibG9uZ2l0dWRlIjotOTYsInpvb20iOjQsInBpdGNoIjowLCJiZWFyaW5nIjowLCJkcmFnUm90YXRlIjpmYWxzZSwid2lkdGgiOjEzNDQsImhlaWdodCI6OTUzLCJhbHRpdHVkZSI6MS41LCJtYXhab29tIjoyMCwibWluWm9vbSI6MCwibWF4UGl0Y2giOjYwLCJtaW5QaXRjaCI6MCwidHJhbnNpdGlvbkR1cmF0aW9uIjowLCJ0cmFuc2l0aW9uSW50ZXJwb2xhdG9yIjp7Il9wcm9wc1RvQ29tcGFyZSI6WyJsb25naXR1ZGUiLCJsYXRpdHVkZSIsInpvb20iLCJiZWFyaW5nIiwicGl0Y2giXSwiX3Byb3BzVG9FeHRyYWN0IjpbImxvbmdpdHVkZSIsImxhdGl0dWRlIiwiem9vbSIsImJlYXJpbmciLCJwaXRjaCJdLCJfcmVxdWlyZWRQcm9wcyI6WyJsb25naXR1ZGUiLCJsYXRpdHVkZSIsInpvb20iXSwib3B0cyI6eyJhcm91bmQiOls1MjYsNTgxXX19LCJ0cmFuc2l0aW9uSW50ZXJydXB0aW9uIjoxfSwidmlld3MiOlt7IkBAdHlwZSI6Ik1hcFZpZXciLCJjb250cm9sbGVyIjp0cnVlLCJtYXBTdHlsZSI6IkBAI0NBUlRPX0JBU0VNQVAuUE9TSVRST04ifV0sImxheWVycyI6W3siQEB0eXBlIjoiQ2FydG9CUVRpbGVyTGF5ZXIiLCJkYXRhIjoiY2FydG9kYi1nY3AtYmFja2VuZC1kYXRhLXRlYW0uYWxhc2Fyci51c2FfY291bnR5XzIwMTVfdGlsZXNldCIsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoicHVibGljIiwiYXBpS2V5IjoiZGVmYXVsdF9wdWJsaWMifSwiZ2V0RmlsbENvbG9yIjp7IkBAZnVuY3Rpb24iOiJjb2xvckNhdGVnb3JpZXMiLCJhdHRyIjoicG9wX2NhdCIsImRvbWFpbiI6WyJsb3ciLCJtZWRpdW0iLCJoaWdoIl0sImNvbG9ycyI6IlJlZE9yIn0sInBvaW50UmFkaXVzTWluUGl4ZWxzIjoyLCJzdHJva2VkIjpmYWxzZSwicGlja2FibGUiOnRydWV9XX0%3D)

#### ColorContinuous example

This example shows how you can assign a different color to each feature by interpolating a numeric feature property value. We need to use the [`getFillColor`](https://deck.gl/docs/api-reference/layers/geojson-layer#getfillcolor) data accessor and assign the following properties:

- `@@function`: `colorContinuous`.
- `@@attr`: The feature property name with numeric data type.
- `@@domain`: The values we want to use for interpolating. The first color in the palette is assigned to the first domain value, the second color in the palette is assigned to the second domain value, and so on...
- `colors`: The CARTOColors palette to use.

```json
{
  ...
  "layers": [
    {
      ...
      "getFillColor": {
        "@@function": "colorContinuous",
        "attr": "aggregated_total",
        "domain": [
          1,
          100,
          1000,
          10000,
          500000
        ],
        "colors": "Peach"
      },
      ...    
    }
  ]  
}
```

View this example in the CARTO viewer [here](https://viewer.carto.com/user/public/bigquery?config=eyJkZXNjcmlwdGlvbiI6IkNhcnRvQlFUaWxlckxheWVyIGRlY2xhcmF0aXZlIGV4YW1wbGUiLCJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozMCwibG9uZ2l0dWRlIjotMTAwLCJ6b29tIjozLCJwaXRjaCI6MCwiYmVhcmluZyI6MCwiZHJhZ1JvdGF0ZSI6ZmFsc2UsIndpZHRoIjo4NjQsImhlaWdodCI6NzczLCJhbHRpdHVkZSI6MS41LCJtYXhab29tIjoyMCwibWluWm9vbSI6MCwibWF4UGl0Y2giOjYwLCJtaW5QaXRjaCI6MCwidHJhbnNpdGlvbkR1cmF0aW9uIjowfSwidmlld3MiOlt7IkBAdHlwZSI6Ik1hcFZpZXciLCJjb250cm9sbGVyIjp0cnVlLCJtYXBTdHlsZSI6IkBAI0NBUlRPX0JBU0VNQVAuUE9TSVRST04ifV0sImxheWVycyI6W3siQEB0eXBlIjoiQ2FydG9CUVRpbGVyTGF5ZXIiLCJkYXRhIjoiY2FydG9icS5tYXBzLmFpc190aWxlc2V0IiwiY3JlZGVudGlhbHMiOnsidXNlcm5hbWUiOiJwdWJsaWMiLCJhcGlLZXkiOiJkZWZhdWx0X3B1YmxpYyJ9LCJnZXRGaWxsQ29sb3IiOnsiQEBmdW5jdGlvbiI6ImNvbG9yQ29udGludW91cyIsImF0dHIiOiJhZ2dyZWdhdGVkX3RvdGFsIiwiZG9tYWluIjpbMSwxMDAsMTAwMCwxMDAwMCw1MDAwMDBdLCJjb2xvcnMiOiJQZWFjaCJ9LCJwb2ludFJhZGl1c01pblBpeGVscyI6Miwic3Ryb2tlZCI6ZmFsc2UsInBpY2thYmxlIjp0cnVlfV19)


### Highlighting features

It is possible to highlight features on hover using the following attributes in the layer object:

```json
"autoHighlight": true
"pickable": true,
"highlightColor": [232,133, 113],
"uniqueIdProperty": "id",
```

The `uniqueIdProperty` is needed to specify the attribute that identifies the feature uniquely across the dataset. It is case sensitive.


