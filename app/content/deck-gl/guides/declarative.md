## Declarative

deck.gl supports a declarative system for describing layers and their props. This feature can be used to generate powerful visualizations directly from a JSON document. You can describe a visualization in abstract terms and you can view the results without needing to write JavaScript code.

This declarative system is used in deck.gl [playground](https://deck.gl/playground) and supports the layers from CARTO module. It is also the system used in CARTO [viewer](https://carto.com/viewer) to create and share tilesets visualizations.

The declarative language allows you to define the style and cartography of your visualization and set other general map options. Technically this language is based on JSON that gets transformed into Javascript objects and functions. Check out the [official documentation](https://deck.gl/docs/api-reference/json/json-converter) on the JSON format for further technical details.

In this guide we are going to focus more on providing a guide to the different options the language provides and document most common visualizations.

### General parameters

#### initialViewState
Type: object

Description: Defines the initial view state for the visualization

| Property Name    | Type         | Description                                       |
|------------------|--------------|---------------------------------------------------|
|     latitude     | number       | Latitude where the map will be centered at start  |
|     longitude    | number       | Longitude where the map will be centered at start |
|     zoom         | number       | Initial zoom level                                |
|     pitch        | number       | Initial camera pitch                              |
|     bearing      | number       | Initial camera bearing                            |

#### Views
Type: array

Description: Defines the views

Each view object has the following properties:

| Property Name    | Type         | Description                                       |
|------------------|--------------|---------------------------------------------------|
|     @@type       | string       | Leave as "MapView"  |
|     controller   | boolean      | Indicates if the map is interactive or not |
|     mapStyle     | number       | Basemap to use in the map. It can be a full URL to a vector style like this one, or it can be a string from this dictionary |  

#### Layers
Type: array

Description: Layers to overlay on the map. It is an array so you can compose multiple layers and define their blending functions.

| Property Name    | Type         | Description                                       |
|------------------|--------------|---------------------------------------------------|
|     @@type       | string       | "CartoBQTilerLayer" or "CartoSQLLayer"  |
|     data         | string       | In the case of a BigQuery TileSet you indicate the project.dataset.table_name. In the case of CartoSQLLayer you indicate the SQL from CARTO to use. |
|     credentials  | object       | CARTO authentication credentials  |  
|     credentials.username  | object       | CARTO username  |  
|     credentials.apiKey  | object       | CARTO API Key. In the case of a private map you add here the api key, for a public map you can use default_public.  |  


#### getFillColor
Type: array or @@function

Description: Indicates the color, in RGBA array format, to use for filling. It accepts formulas, check out later for examples

#### getLineColor

Description: Indicates the color of the i


#### getRadius


#### getLineWidth


#### lineWidthMinPixels
Type: number
Default: 0
The minimum line width in pixels.


#### lineWidthScale
Type: number

Description: Default: 1
The line width multiplier that multiplied to all outlines of Polygon and MultiPolygon features if the stroked attribute is true.


#### pointRadiusMinPixels


#### stroked
Type: boolean

Default: false

Description: Whether to draw an outline around the polygon (solid fill). Note that both the outer polygon as well the outlines of any holes will be drawn.

#### pickable
Type: boolean

Default: false

Description: Whether the layer responds to mouse pointer picking events.

#### getElevation
Type: number of @@function

Default: 1000

Description: The elevation to extrude each polygon with. If a cartographic projection mode is used, height will be interpreted as meters, otherwise will be in unit coordinates. Only applies if extruded: true.

If a number is provided, it is used as the elevation for all polygons.
If a function is provided, it is called on each polygon to retrieve its elevation.
Note: If 3D positions are returned by getPolygon, the extrusion returned by getElevation is added to the base altitude of each vertex.

#### filled
Type: boolean

Default: true

Description: Whether to draw a filled polygon (solid fill). Note that only the area between the outer polygon and any holes will be filled.

#### extruded
Type: boolean

Default: false

Description: Whether to extrude the polygons (based on the elevations provided by the getElevation accessor. If set to false, all polygons will be flat, this generates less geometry and is faster than simply returning 0 from getElevation.

#### opacity
Type: number

Default: 1

Description: The opacity of the layer.

#### elevationScale
Type: number

Default: 1

Description: Elevation multiplier. The final elevation is calculated by elevationScale * getElevation(d). elevationScale is a handy property to scale all elevation without updating the data.

#### highlightColor
Type: array

Default: [0, 0, 128, 128]

Description: RGBA color to blend with the highlighted object (either the hovered over object if autoHighlight: true, or the object at the index specified by highlightedObjectIndex). When the value is a 3 component (RGB) array, a default alpha of 255 is applied.

#### lineJointRounded

#### visible
Type: boolean

Description: Default: true

Description: Whether the layer is visible. Under most circumstances, using visible prop to control the visibility of layers are recommended over doing conditional rendering. Compare:

#### autoHighlight
Type: boolean

Default: false

Description: When true, current object pointed by mouse pointer (when hovered over) is highlighted with highlightColor.
Requires `pickable` to be true.

#### uniqueIdProperty
Type: string

Description: Optional. Needed for highlighting a feature split across two or more tiles if no feature id is provided.
An string pointing to a tile attribute containing a unique identifier for features across tiles.

### Creating color ramp maps

A common type of map is creating a color ramp based on a property





### Highlighting features

It is possible to highlight features on hover using the following attributes:

```json
"autoHighlight": true
"pickable": true,
"highlightColor": [232,133, 113],
"uniqueIdProperty": "id",
```

The `uniqueIdProperty` is needed to specify the attribute that identifies the feature uniquely across the dataset. It is case sensitive.


