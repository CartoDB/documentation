## Reference


### Tiler

We currently provide two procedures to tilify a dataset: _CREATE_SIMPLE_TILESET_ and _CREATE_POINT_AGGREGATION_TILESET_, the former to visualize features individually and the latter to generate aggregated point visualizations.

#### tiler.CREATE_SIMPLE_TILESET

{{% bannerNote type="code" %}}
tiler.CREATE_SIMPLE_TILESET (source_table, target_table, options)
{{%/ bannerNote %}}

* `source_table`: `STRING` that can either be a quoted qualified table name (e.g. <code>\`projectID.dataset.tablename\`</code>) or a full query contained by parentheses (e.g.<code>(SELECT * FROM \`projectID.dataset.tablename\`)</code>).
* `target_table`: Where the resulting table will be stored. It must be a `STRING` of the form <code>\`projectID.dataset.tablename\`</code>. The projectID can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRING` containing a valid JSON with the different options. Valid options are described the table below.

{{% bannerNote type="note" title="tip"%}}
To avoid issues in the process when building the queries that will be executed internally against BigQuery, it is highly recommended to use [raw strings](https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#string_and_bytes_literals) when passing long queries in the `source_table` that might contain special characters.
{{%/ bannerNote %}}

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `STRING` that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level over this level won't be generated.|
|`zoom_step`| Default: `1`. A `NUMBER` that defines the zoom level step. Only the zoom levels that match `zoom_min + zoom_step * N`, with `N` being a positive integer will be generated. For example, with `{ zoom_min: 10, zoom_max: 15, zoom_step : 2 }` only the tiles in zoom levels [10, 12, 14] will be generated.|
|`target_partitions`| Default: `4000`. Max: `4000`. A `NUMBER` that defines the **maximum** amount of partitions to be used in the target table. The partition system, which uses a column named `carto_partition`, divides the available partitions first by zoom level and spatial locality to minimize the cost of tile read requests in web maps. Beware that this does not necessarily mean that all the partitions will be used, as a sparse dataset will leave some of these partitions unused. If you are using [BigQuery BI Engine](https://cloud.google.com/bi-engine/docs/overview) consider that it supports a maximum of 500 partitions per table.|
|`target_tilestats`| Default: `true`. A `BOOLEAN` to determine whether to include statistics of the properties in the metadata. These statistics are based on [mapbox-tilestats](https://github.com/mapbox/mapbox-geostats) and depend on the property type:<br/><ul><li>Number: MIN, MAX, AVG, SUM and quantiles (from 3 to 20 breaks).</li><li>String / Boolean: List of the top 10 most common values and their count.</li></ul>In Simple Tilesets, these statistics are based on the source data.|
|`tile_extent`| Default: `4096`. A `NUMBER` defining the extent of the tile in integer coordinates as defined by the MVT spec.
|`tile_buffer`| Default: `16`. A `NUMBER` defining the additional buffer added around the tiles in extent units, which is useful to facilitate geometry stitching across tiles in the renderers.|
|`max_tile_size_kb`| Default: `1024`. A `NUMBER` defining setting the approximate maximum size for a tile.
|`max_tile_size_strategy`| Default: `"throw_error"`. A `STRING` that determines what to do when the maximum size of a tile is reached while it is still processing data. There are three options available:<br/><ul><li>`"return_null"`: The process will return a NULL buffer. This might appear as empty in the map.</li><li>`"throw_error"`: The process will throw an error cancelling the aggregation, so no tiles or table will be generated.</li><li>`"drop_features"`: The process will stop processing more data and return what it has already processed, ignoring the rest. This could lead to holes in the map.</li></ul>|
|`max_tile_features`| Default: `0` (disabled). A `NUMBER` that sets the maximum number of features a tile might contain. This limit is applied before `max_tile_size_kb`, i.e., the tiler will first drop as many features as needed to keep this amount, and then continue with the size limits (if required). To configure in which order are features kept, use in conjunction with `tile_feature_order`.|
|`tile_feature_order`| Default: `""` (disabled). A `STRING` defining the order in which properties are added to a tile. This expects the SQL `ORDER BY` **keyword definition**, such as `"aggregated_total DESC"`, the `"ORDER BY"` part isn't necessary. Note that in aggregation tilesets you can only use columns defined as properties, but in simple feature tilesets you can use any source column no matter if it's included in the tile as property or not. **This is an expensive operation, so it's recommended to only use it when necessary.**|
|`drop_duplicates`| Default: `false`. A `BOOLEAN` to drop duplicate features in a tile. This will drop only exact matches (both the geometry and the properties are exactly equal). As this requires sorting the properties, which is expensive, it should only be used when necessary.|
|`properties`| Default: {}. A JSON object that defines the extra properties that will be included associated to each cell feature. Each property is defined by its name and type (Number, Boolean or String). Check out the examples included below.|


In Simple Tilesets, the `properties` are defined by the source data itself. You only have to write the name of the column (as defined in the source query or table) and its type. It doesn't support any extra transformations or formulae since those can be applied to the source query directly.

```json
"properties": {
    "source_column_name": "Number",
    "source_column_name_2": "String"
    ...
}
```

Here is an example of a valid JSON for the `options` parameter:

```json
R'''
{
    "geom_column": "geom",

    "zoom_min": 0,
    "zoom_max": 0,
    "zoom_step": 1,

    "tile_extent": 4096,
    "tile_buffer": 0,

    "max_tile_size_kb": 1024,
    "max_tile_size_strategy": "return_null",
    "max_tile_features": 10000,
    "tile_feature_order": "total_pop DESC",

    "target_partitions": 4000,
    "target_tilestats" : true,

    "drop_duplicates": true,
    "properties": {
        "geoid": "String",
        "total_pop": "Number"
    }
}
'''
```


#### tiler.CREATE_POINT_AGGREGATION_TILESET

{{% bannerNote type="code" %}}
tiler.CREATE_POINT_AGGREGATION_TILESET (source_table, target_table, options)
{{%/ bannerNote %}}

* `source_table`: `STRING` that can either be a quoted qualified table name (e.g. ``projectID.dataset.tablename``) or a full query contained by parentheses (e.g.<code>(Select * FROM \`projectID.dataset.tablename`)</code>).
* `target_table`: Where the resulting table will be stored. It must be a `STRING` of the form ``projectID.dataset.tablename``. The projectID can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRING` containing a valid JSON with the different options. Valid options are described the table below.


| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `STRING` that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level over this level won't be generated.|
|`zoom_step`| Default: `1`. A `NUMBER` that defines the zoom level step. Only the zoom levels that match `zoom_min + zoom_step * N`, with `N` being a positive integer will be generated. For example, with `{ zoom_min: 10, zoom_max: 15, zoom_step : 2 }` only the tiles in zoom levels [10, 12, 14] will be generated.|
|`target_partitions`| Default: `4000`. Max: `4000`. A `NUMBER` that defines the **maximum** amount of partitions to be used in the target table. The partition system, which uses a column named `carto_partition`, divides the available partitions first by zoom level and spatial locality to minimize the cost of tile read requests in web maps. Beware that this does not necessarily mean that all the partitions will be used, as a sparse dataset will leave some of these partitions unused. If you are using [BigQuery BI Engine](https://cloud.google.com/bi-engine/docs/overview) consider that it supports a maximum of 500 partitions per table.|
|`target_tilestats`| Default: `true`. A `BOOLEAN` to determine whether to include statistics of the properties in the metadata. These statistics are based on [mapbox-tilestats](https://github.com/mapbox/mapbox-geostats) and depend on the property type:<br/><ul><li>Number: MIN, MAX, AVG, SUM and quantiles (from 3 to 20 breaks).</li><li>String / Boolean: List of the top 10 most common values and their count.</li></ul>For aggregation tilesets, these statistics refer to the cells at the maximum zoom generated.|
|`tile_extent`| Default: `4096`. A `NUMBER` defining the extent of the tile in integer coordinates as defined by the MVT spec.
|`tile_buffer`| Default: `0`. A `NUMBER` defining the additional buffer added around the tiles in extent units, which is useful to facilitate geometry stitching across tiles in the renderers. In aggregation tilesets, this property is currently not available and always `0` as no geometries go across tile boundaries.|
|`max_tile_size_kb`| Default: `1024`. A `NUMBER` defining setting the approximate maximum size for a tile.
|`max_tile_size_strategy`| Default: `"throw_error"`. A `STRING` that determines what to do when the maximum size of a tile is reached while it is still processing data. There are three options available:<br/><ul><li>`"return_null"`: The process will return a NULL buffer. This might appear as empty in the map.</li><li>`"throw_error"`: The process will throw an error cancelling the aggregation, so no tiles or table will be generated.</li><li>`"drop_features"`: The process will stop processing more data and return what it has already processed, ignoring the rest. This could lead to holes in the map.</li></ul>|
|`max_tile_features`| Default: `0` (disabled). A `NUMBER` that sets the maximum number of features a tile might contain. This limit is applied before `max_tile_size_kb`, i.e., the tiler will first drop as many features as needed to keep this amount, and then continue with the size limits (if required). To configure in which order are features kept, use in conjunction with `tile_feature_order`.|
|`tile_feature_order`| Default: `""` (disabled). A `STRING` defining the order in which properties are added to a tile. This expects the SQL ORDER BY keyword definition, such as "aggregated_total DESC", the "ORDER BY" part isn't necessary. Note that in aggregation tilesets you can only use columns defined as properties, but in simple feature tilesets you can use any source column no matter if it's included in the tile as property or not. **This is an expensive operation, so it's recommended to only use it when necessary.**|
|`aggregation_type`| Default: `"quadkey"`. A `STRING` defining what kind of spatial aggregation is to be used. Currently only [quadkey](https://docs.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system#tile-coordinates-and-quadkeys) is supported.|
|`aggregation_resolution`| Default: `6`. A `NUMBER` that specifies the resolution of the spatial aggregation.<br/><br/>For quadkey the aggregation for zoom `z` is done at `z + resolution level`. For example, with resolution `6`, the `z0` tile will be divided into cells that match the `z6` tiles, or the cells contained in the `z10` tile will be the boundaries of the `z16` tiles within them. In other words, each tile is subdivided into `4^resolution` cells.<br/><br/>Note that adding more granularity necessarily means heavier tiles which take longer to be transmitted and processed in the final client, and you are more likely to hit the internal memory limits.|
|`aggregation_placement`| Default: `"cell-centroid"`. A `STRING` that defines what type of geometry will be used for the cells generated in the aggregation. For a quadkey aggregation, there are currently four options:<br/><ul><li>`"cell-centroid"`: Each feature will be defined as the centroid of the cell, that is, all points that are aggregated together into the cell will be represented in the tile by a single point.</li><li>`"cell"`: Each feature will be defined as the whole cell, thus the final representation in the tile will be a polygon. This gives more precise coordinates but takes more space in the tile and requires more CPU to process it in the renderer.</li><li>`"features-any"`: The point representing a feature will be any random point from the source data, that is, if 10 points fall inside a cell it will use the location of one of them to represent the cell itself</li><li>`"features-centroid"`: The feature will be defined as the centroid (point) of the points that fall into the cell. Note that this only takes into account the points aggregated under a cell, and not the cell shape (as "cell-centroid" does).</li></ul>|
|`properties`| Default: {}. A JSON object that defines the extra properties that will be included associated to each cell feature. In Point Aggregation Tilesets we have two kinds of `properties`: the main ones, `"properties"`, which are the result of an aggregate function, and `"single_point_properties"`, which are properties that are only applied when there is a single point in the cell, therefore, they are columns from the source data points themselves, not an aggregation.<br/><br/>Each main `property` is defined by its name, type (Number, Boolean or String) and formula (any formula that uses an [aggregate function]((https://cloud.google.com/bigquery/docs/reference/standard-sql/functions-and-operators#aggregate_functions)) supported by BigQuery and returns the expected type) to generate the properties from all the values of the points that fall under the cell. Only name and type are necessary for `"single_point_properties"`. Check out the examples included below. |

Here is an example of valid `properties` for a Point Aggregation Tileset: 

```json
"properties": {
    "new_column_name": {
        "formula":"count(*)",
        "type":"Number"
    },
    "most_common_ethnicity": {
        "formula":"APPROX_TOP_COUNT(ethnicity, 1)[OFFSET(0)].value",
        "type":"String"
    },
    "has_other_ethnicities":
        "formula":"countif(ethnicity = 'other_race') > 0",
        "type":"Boolean"
    } 
},
"single_point_properties": {
    "name":"String",
    "address":"String"
}
```

In the example above, for all features we would get a property `"new_column_name"` with the number of points that fall in it, the `"most_common_ethnicity"` of those rows and whether there are points whose ethnicity value matches one specific value (`"has_other_ethnicities"`). In addition to this, when there is only one point that belongs to this property (and only in that case) we will also get the column values from the source data: `"name"` and `"address"`.



### Quadkey

You can learn more about quadkeys in the [documentation](/spatial-extension-bq/spatial-indexes/overview/#quadkeys). 

#### quadkey.QUADINT_FROMZXY

{{% bannerNote type="code" %}}
quadkey.QUADINT_FROMZXY(z, x, y)
{{%/ bannerNote %}}

* `z`: `INT64` zoom level.
* `x`: `INT64` horizontal position of a tile.
* `y`: `INT64` vertical position of a tile.

Returns the `INT64` quadint representation for tile `x`, `y` and a zoom `z`.

#### quadkey.ZXY_FROMQUADINT

{{% bannerNote type="code" %}}
quadkey.ZXY_FROMQUADINT(quadint INT64)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint we want to extract tile information from.

Returns a `STRUCT` with the level of zoom `z` and coordinates `x`, `y` for a given quadint, all as `INT64`.

#### quadkey.LONGLAT_ASQUADINT

{{% bannerNote type="code" %}}
quadkey.LONGLAT_ASQUADINT(longitude, latitude, resolution)
{{%/ bannerNote %}}

* `longitude`: `FLOAT64` horizontal coordinate of the map.
* `latitude`: `FLOAT64` vertical coordinate of the map.
* `resolution`: `INT64` level of detail or zoom.

Returns the `INT64` quadint representation for a given level of detail and geographic coordinates.

#### quadkey.QUADINT_FROMQUADKEY

{{% bannerNote type="code" %}}
quadkey.QUADINT_FROMQUADKEY(quadkey)
{{%/ bannerNote %}}

* `quadkey`: `STRING` quadkey to be converted to quadint.

Returns the `INT64` quadint equivalent to the input quadkey.

#### quadkey.QUADKEY_FROMQUADINT

{{% bannerNote type="code" %}}
quadkey.QUADKEY_FROMQUADINT(quadint)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to be converted to quadkey.

Returns the `STRING` quadkey equivalent to the input quadint.

#### quadkey.TOPARENT

{{% bannerNote type="code" %}}
quadkey.TOPARENT(quadint, resolution)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the parent from.
* `resolution`: `INT64` resolution of the desired parent.

Returns the parent `IN64` quadint of a given quadint for a specific resolution. A parent quadint is the smaller resolution containing quadint.

#### quadkey.TOCHILDREN

{{% bannerNote type="code" %}}
quadkey.TOCHILDREN(quadint, resolution)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the children from.
* `resolution`: `INT64` resolution of the desired children.

Returns an `ARRAY` with the children `INT64` quadints of a given quadint for a specific resolution. A children quadint is a quadint of higher level of detail that is contained by the current quadint. Each quadint has four children by definition.

#### quadkey.SIBLING

{{% bannerNote type="code" %}}
quadkey.SIBLING(quadint, direction)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the sibling from.
* `direction`: `STRING` <code>'right'|'left'|'up'|'down'</code> direction to move in to extract the next sibling. 

Returns the `INT64` quadint directly next to the given quadint at the same zoom level. The direction must be sent as argument and currently only horizontal/vertical movements are allowed.

#### quadkey.KRING

{{% bannerNote type="code" %}}
quadkey.KRING(quadint, distance)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the KRING from.
* `distance`: `INT64` distance (in cells) to the source.

Returns an `ARRAY` containing all the `INT64` quadints directly next to the given quadint at the same level of zoom. Diagonal, horizontal and vertical nearby quadints plus the current quadint are considered, so KRING always returns `(distance*2 + 1)^2` quadints.

#### quadkey.BBOX

{{% bannerNote type="code" %}}
quadkey.BBOX(quadint INT64)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the bbox from.

Returns an `ARRAY` with the boundary box of a given quadint. This boundary box contains the minimum and maximum longitude and latitude as `FLOAT64`. The output format is [West-South, East-North] or [min long, min lat, max long, max lat].

#### quadkey.ST_ASQUADINT

{{% bannerNote type="code" %}}
quadkey.ST_ASQUADINT(point, resolution)
{{%/ bannerNote %}}

* `point`: `GEOGRAPHY` POINT to get the quadint from.
* `resolution`: `INT64` level of detail or zoom.

Returns the `INT64` quadint of a given point at a given level of detail.

#### quadkey.ST_ASQUADINT_POLYFILL

{{% bannerNote type="code" %}}
quadkey.ST_ASQUADINT_POLYFILL(geo, resolution)
{{%/ bannerNote %}}

* `geo`: `GEOGRAPHY` geography to extract the quadints from.
* `resolution`: `INT64` level of detail or zoom.

Returns an `ARRAY` of `INT64` quadints that intersect with the given geography at a given level of detail.

#### quadkey.ST_BOUNDARY

{{% bannerNote type="code" %}}
quadkey.ST_GEOGFROMQUADINT_BOUNDARY(quadint)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the boundary geography from.

Returns the `GEOGRAPHY` boundary for a given quadint. We extract the boundary in the same way as when we calculate its [bbox](/spatial-extension-bq/reference/#quadkeybbox), then enclose it in a GeoJSON and finally transform it into a geography.

#### quadkey.LONGLAT_ASQUADINTLIST_RESOLUTION

{{% bannerNote type="code" %}}
quadkey.LONGLAT_ASQUADINTLIST_RESOLUTION(longitude FLOAT64, latitude FLOAT64, __zoom_min INT64, __zoom_max INT64, __zoom_step INT64, __resolution INT64) -> ARRAY< STRUCT < id INT64, z INT64, x INT64, y INT64 > >
{{%/ bannerNote %}}

* `longitude`: `FLOAT64` horizontal coordinate of the map.
* `latitude`: `FLOAT64` vertical coordinate of the map.
* `zoom_min`: `INT64` minimum zoom to get the quadints from.
* `zoom_max`: `INT64` maximum zoom to get the quadints from.
* `zoom_step`: `INT64` used for skipping levels of zoom.
* `resolution`: `INT64` resolution added to the current zoom to extract the quadints.

Returns the quadint index for the given point for each zoom level requested, at the specified resolution (computed as the current zoom level + the value of `resolution`). The output is an `ARRAY` of `STRUCT` with the following elements: quadint `id`, zoom level (`z`), and horizontal (`x`) and vertical (`y`) position of the tile. These quadint indexes can be used for grouping and generating aggregations of points throughout the zoom range requested. Notice the use of an additional variable `resolution` for adjusting the desired level of granularity.

#### quadkey.VERSION

{{% bannerNote type="code" %}}
quadkey.VERSION()
{{%/ bannerNote %}}

Returns the current version of the quadkey library as a `INT64`.


### H3

[H3](https://eng.uber.com/h3/) is Uber’s Hexagonal Hierarchical Spatial Index. Full documentation of the project can be found at [h3geo](https://h3geo.org/docs).

#### h3.ST_ASH3

{{% bannerNote type="code" %}}
h3.ST_ASH3(geog, resolution)
{{%/ bannerNote %}}

* `geog`: POINT `GEOGRAPHY`.
* `resolution`: `INT64` number between 0 and 15 with the [H3 resolution](https://h3geo.org/docs/core-library/restable).

Returns an H3 cell index where the point is placed in the required `resolution` as an `INT64` number. It will return `NULL` on error (invalid geography type or resolution out of bounds).

{{% bannerNote type="note" title="tip"%}}
If you want the HEX representation of the cell, you can call [H3_ASHEX](#h3h3_ashex) with the output integer.
{{%/ bannerNote %}}

{{% bannerNote type="note" title="tip"%}}
If you want the cells covered by a POLYGON see [ST_ASH3_POLYFILL](#h3st_ash3_polyfill).
{{%/ bannerNote %}}

#### h3.LONGLAT_ASH3

{{% bannerNote type="code" %}}
h3.LONGLAT_ASH3(longitude, latitude, resolution)
{{%/ bannerNote %}}

* `latitude`: `FLOAT64` point latitude in degrees.
* `longitude`: `FLOAT64` point latitude in degrees.
* `resolution`: `INT64` number between 0 and 15 with the [H3 resolution](https://h3geo.org/docs/core-library/restable).

Returns an `INT64` H3 cell index where the point is placed in the required `resolution` as an `INT64` number. It will return `NULL` on error (resolution out of bounds).

#### h3.H3_ASHEX

{{% bannerNote type="code" %}}
h3.H3_ASHEX(index)
{{%/ bannerNote %}}

* `index`: `INT64` H3 cell index.

Returns a `STRING` representing the H3 index as a hexadecimal number. It doesn't do any extra validation checks.

#### h3.H3_FROMHEX

{{% bannerNote type="code" %}}
h3.H3_FROMHEX(index)
{{%/ bannerNote %}}

* `index`: `STRING` H3 cell index as hexadecimal. 

Returns the `INT64` representation of a H3 index from the `STRING` (generated by [H3_ASHEX](#h3h3_ashex)). It doesn't do any extra validation checks.


#### h3.ST_ASH3_POLYFILL

{{% bannerNote type="code" %}}
h3.ST_ASH3_POLYFILL(geography, resolution)
{{%/ bannerNote %}}

* `geography`: `GEOGRAPHY` **POLYGON** or **MULTIPOLYGON** representing the area to cover.
* `resolution`: `INT64` number between 0 and 15 with the [H3 resolution](https://h3geo.org/docs/core-library/restable).

Returns an `ARRAY` with all the `INT64` H3 cell indexes **with centers** contained in a given polygon. It will return `NULL` on error (invalid geography type or resolution out of bounds).

#### h3.ST_BOUNDARY

{{% bannerNote type="code" %}}
h3.ST_BOUNDARY(index)
{{%/ bannerNote %}}

* `index`: `INT64` The H3 cell index.

Returns a `GEOGRAPHY` representing the H3 cell. It will return `NULL` on error (invalid input).

#### h3.ISVALID

{{% bannerNote type="code" %}}
h3.ISVALID(index)
{{%/ bannerNote %}}

* `index`: `INT64` The H3 cell index.

Returns a `BOOLEAN` of value `true` when the given index is valid, `false` otherwise.

#### h3.COMPACT

{{% bannerNote type="code" %}}
h3.COMPACT(indexArray)
{{%/ bannerNote %}}

* `indexArray`: `ARRAY<INT64>` of H3 cell indices of the same resolution.

Returns an `ARRAY` with the `INT64` indexes of a set of hexagons across multiple resolutions that represent the same area as the input set of hexagons.


#### h3.UNCOMPACT

{{% bannerNote type="code" %}}
h3.UNCOMPACT(indexArray, resolution)
{{%/ bannerNote %}}

* `indexArray`: `ARRAY<INT64>` of H3 cell indices.
* `resolution`: `INT64` number between 0 and 15 with the [H3 resolution](https://h3geo.org/docs/core-library/restable).

Returns an `ARRAY` with the `INT64` indexes of a set of hexagons of the same `resolution` that represent the same area as the [compacted](#h3compact) input hexagons.

#### h3.TOPARENT

{{% bannerNote type="code" %}}
h3.TOPARENT(index, resolution)
{{%/ bannerNote %}}

* `index`: `INT64` H3 cell index.
* `resolution`: `INT64` number between 0 and 15 with the [H3 resolution](https://h3geo.org/docs/core-library/restable).

Returns the `INT64` H3 cell index of the parent of the given hexagon at the given resolution.

#### h3.TOCHILDREN

{{% bannerNote type="code" %}}
h3.TOCHILDREN(index, resolution)
{{%/ bannerNote %}}

* `index`: `INT64` H3 cell index.
* `resolution`: `INT64` number between 0 and 15 with the [H3 resolution](https://h3geo.org/docs/core-library/restable).

Returns an `ARRAY` with the `INT64` indexes of the children/descendents of the given hexagon at the given resolution.

#### h3.ISPENTAGON

{{% bannerNote type="code" %}}
h3.ISPENTAGON(index)
{{%/ bannerNote %}}

* `index`: `INT64` The H3 cell index.

Returns a `BOOLEAN` determining whether the given H3 index is a pentagon. Returns `false` on invalid input.

#### h3.DISTANCE

{{% bannerNote type="code" %}}
h3.DISTANCE(origin, destination)
{{%/ bannerNote %}}

* `origin`: `INT64` origin H3 cell index.
* `destination`: `INT64` destination H3 cell index.

Returns the `INT64` **grid distance** between two hexagon indexes. This function may fail to find the distance between two indexes if they are very far apart or on opposite sides of a pentagon.
Returns null on failure or invalid input.

{{% bannerNote type="note" title="tip"%}}
If you want the distance in meters use [ST_DISTANCE](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions#st_distance) between the cells ([ST_BOUNDARY](#h3st_boundary)) or their centroid.
{{%/ bannerNote %}}

#### h3.KRING

{{% bannerNote type="code" %}}
h3.KRING(index, distance)
{{%/ bannerNote %}}

* `index`: `INT64` H3 cell index.
* `distance`: `INT64` distance (in number of cells) to the source.

Returns an `ARRAY` with the `INT64` indexes of all hexagons within `distance` of the given input hexagon. The order of the hexagons is undefined. Returns NULL on invalid input.

#### h3.HEXRING

{{% bannerNote type="code" %}}
h3.HEXRING(index, distance) -> ARRAY<INT64>
{{%/ bannerNote %}}

* `index`: `INT64` H3 cell index.
* `distance`: `INT64` distance (in cells) to the source.

Get all hexagons in a **hollow hexagonal ring** centered at origin with sides of a given length. Unlike kRing, this function will return NULL if there is a pentagon anywhere in the ring.

#### h3.VERSION

{{% bannerNote type="code" %}}
h3.VERSION()
{{%/ bannerNote %}}

Returns a `STRING` with the current version of the H3 library.



### S2

Our S2 module is based on a port of the official s2 geometry library created by Google. Check this [website](http://s2geometry.io/) for more information about S2.

#### s2.ID_FROMHILBERTQUADKEY

{{% bannerNote type="code" %}}
s2.ID_FROMHILBERTQUADKEY(quadkey)
{{%/ bannerNote %}}

* `quadkey`: `STRING` quadkey to be converted.

Returns the conversion of a `STRING` Hilbert quadtree into an `INT64` S2 cell id.

#### s2.HILBERTQUADKEY_FROMID

{{% bannerNote type="code" %}}
s2.HILBERTQUADKEY_FROMID(id)
{{%/ bannerNote %}}

* `id`: `INT64` S2 cell id to be converted.

Returns the conversion of an `INT64` S2 cell id into a `STRING` Hilbert quadtree.


#### s2.LONGLAT_ASID

{{% bannerNote type="code" %}}
s2.LONGLAT_ASID(longitude, latitude, level)
{{%/ bannerNote %}}

* `longitude`: `FLOAT64` horizontal coordinate on the map.
* `latitude`: `FLOAT64` vertical coordinate on the map.
* `level`: `INT64` level of detail or zoom.

Returns the `INT64` S2 cell id for a given longitude, latitude and zoom level.

#### s2.ST_ASID

{{% bannerNote type="code" %}}
s2.ST_ASID(point, resolution)
{{%/ bannerNote %}}

* `point`: `GEOGRAPHY` point to get the quadint from.
* `level`: `INT64` level of detail or zoom.

Returns the `INT64` S2 cell id of a given point at a given level of detail.

#### s2.ST_BOUNDARY

{{% bannerNote type="code" %}}
s2.ST_GEOGFROMID_BOUNDARY(id)
{{%/ bannerNote %}}

* `id`: `INT64` S2 cell id to get the boundary geography from.

Returns the `GEOGRAPHY` boundary for a given S2 cell id. We extract the boundary by getting the corner longitudes and latitudes, then enclose it in a GeoJSON and finally transform it into geography.

#### s2.VERSION

{{% bannerNote type="code" %}}
s2.VERSION()
{{%/ bannerNote %}}

Returns the current version of the S2 module as a `STRING`.

### Placekey

[Placekey](https://www.placekey.io/faq) is a free and open universal standard identifier for any physical place, so that the data pertaining to those places can be shared across organizations easily. Since Placekey is based on H3, here we offer a way to transform to and from that index and delegate any extra functionality to H3 itself.

#### placekey.H3_ASPLACEKEY

{{% bannerNote type="code" %}}
placekey.H3_ASPLACEKEY(h3index)
{{%/ bannerNote %}}

* `h3index`: `INT64` H3 identifier.

Returns the `STRING` Placekey equivalent to the given H3 index.


#### placekey.PLACEKEY_ASH3

{{% bannerNote type="code" %}}
placekey.PLACEKEY_ASH3(placekey)
{{%/ bannerNote %}}

* `placekey`: `STRING` Placekey identifier.

Returns the `INT64` H3 index equivalent to the given Placekey.


#### placekey.ISVALID

{{% bannerNote type="code" %}}
placekey.ISVALID(placekey)
{{%/ bannerNote %}}

* `placekey`: `STRING` Placekey identifier.

Returns a `BOOLEAN` of value `true` when the given string represents a valid Placekey, `false` otherwise.


#### placekey.VERSION

{{% bannerNote type="code" %}}
placekey.VERSION() -> STRING
{{%/ bannerNote %}}

Returns the current version of the Placekey module as a `STRING`.