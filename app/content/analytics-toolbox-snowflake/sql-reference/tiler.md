## tiler

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

We currently provide procedures to create two types of tilesets: _simple_ and _aggregation_ tilesets, the former to visualize features individually and the latter to generate aggregated point visualizations. Visit the [Overview section](/analytics-toolbox-snowflake/overview/tilesets/) to learn more about tileset types.


### CREATE_POINT_AGGREGATION_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_POINT_AGGREGATION_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Generates a point aggregation tileset.

* `input`: `VARCHAR` that can either contain a table name (e.g. `database.schema.tablename`) or a full query (e.g.<code>(SELECT * FROM db.schema.tablename)</code>).
* `output_table`: `VARCHAR` of the format `database.schema.tablename` where the resulting tileset will be stored. The database and schema must exist and the caller needs to have permissions to create a new table in it. The process will fail if the table already exists.
* `options`: `VARCHAR` containing a valid JSON with the different options. Valid options are described in the table below.

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `VARCHAR` that indicates the name of the geography column that will be used. The geography colum must be of type `GEOGRAPHY` and contain only points. |
|`zoom_min`| Default: `0`. An `INTEGER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `15`. An `INTEGER` that defines the maximum zoom level for tiles. Any zoom level over this level won't be generated. Maximum is 20.|
|`aggregation_resolution`| Default: `6`. An `INTEGER` that specifies the resolution of the spatial aggregation.<br/><br/>Aggregation for zoom `z` is based on quadkey cells at `z + resolution level`. For example, with resolution `6`, the `z0` tile will be divided into cells that match the `z6` tiles, or the cells contained in the `z10` tile will be the boundaries of the `z16` tiles within them. In other words, each tile is subdivided into `4^resolution` cells, which is the maximum number of resulting features (aggregated) that the tiles will contain.<br/><br/>Note that adding more granularity necessarily means heavier tiles which take longer to be transmitted and processed in the final client, and you are more likely to hit the internal memory limits.|
|`aggregation_placement`| Default: `"cell-centroid"`. A `VARCHAR` that defines what type of geometry will be used for the cells generated in the aggregation. There are currently four options:<br/><ul><li>`"cell-centroid"`: Each feature will be defined as the centroid of the cell, that is, all points that are aggregated together into the cell will be represented in the tile by a single point.</li><li>`"cell"`: Each feature will be defined as the whole cell, thus the final representation in the tile will be a polygon. This gives more precise coordinates but takes more space in the tile and requires more CPU to process it in the renderer.</li><li>`"features-any"`: The point representing a feature will be any random point from the source data, that is, if 10 points fall inside a cell it will use the location of one of them to represent the cell itself</li><li>`"features-centroid"`: The feature will be defined as the centroid (point) of the points that fall into the cell. Note that this only takes into account the points aggregated under a cell, and not the cell shape (as "cell-centroid" does).</li></ul>|
|`metadata`| Default: {}. A JSON object to specify the associated metadata of the tileset. Use this to set the `name`, `description` and `legend` to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`properties`| Default: {}. A JSON object that defines the extra properties that will be included associated to each cell feature. Each `property` is defined by its name, type (Number or String) and formula (any SQL formula that uses an [aggregate function]((https://docs.snowflake.com/en/sql-reference/functions-aggregation.html)) supported by Snowflake and returns the expected type) to generate the properties from all the values of the points that fall under the cell.|
|`max_tile_features`| Default: 100000. A `NUMBER` that sets the maximum number of features (points) a tile might contain. To configure in which order are features kept, use in conjunction with `tile_feature_order`.
A value less than `4^aggregation_resolution` will be innefective, so the default of 100000 applies only if `aggregation_resolution` is greater than 8.|
|`tile_feature_order`| Default: `RANDOM()`. A `STRING` defining the order in which features are added to a tile. This expects the SQL `ORDER BY` **keyword definition**, such as `"aggregated_total DESC"`, the `"ORDER BY"` part must not be included. You can use any source column no matter if it's included in the tile as property or not.|
|`max_tile_size_strategy`| Default: `"throw_error"`. A `STRING` that specifies how to apply the limit defined by `max_tile_features`. There are four options available:<br/><ul><li>`"drop_features"`: In each tile the features that would exceed the limit are dropped. Different fractions of the total features may be dropped in each tile, which on a map can appear as noticeable differences in feature density between tiles.</li><li>`"drop_fraction_as_needed"`: For every zoom level, this process will drop a consistent fraction of features in every tile to make sure all generated tiles are below the limit. Since a constant fraction of the features is dropped for all tiles of a given zoom level, this will in general drop more features in less populated tiles than the other approach.</li><li>`"return_null"` for all tiles that exceed the limits, a row with a NULL DATA column will be produced</li><li>`"throw_error"` if any tile exceeds the limits an error will occur.</li></ul><br/>. For the `drop_` strategies, features will be retained according to the `tile_feature_order` specified.|

{{% bannerNote title="FEATURES PER TILE LIMITS" type="warning" %}}
The value of `aggregation_resolution` sets an upper bound for how many features can be present in a tile. For a value of _n_, 4^_n_ (4 raised to n) features can be present at most in a tile, for example, for an aggregation resolution of 8, the maximum number of features (points) will be 65536 per tile. This value can be too high and produce too large tiles either if the aggregation resolution is high or if many or large properties are included. In that case the `max_tile_features` should be used to limit the size of the tiles to about 1MB, so that visualization in maps is not too slow.
{{%/ bannerNote %}}

**Result**

The generated tileset consists of a table with the following columns, where each row represents a tile:
* `Z`: zoom level of the tile.
* `X`: X-index of the tile (`0` to `2^Z-1`).
* `Y`: Y-index of the tile (`0` to `2^Z-1`).
* `DATA`: contents of the tile, encoded as a GeoJSON string (a feature collection). It will contain the resulting points (location of the aggregated features) and their attributes (as defined by `properties`).

Additionally, there is a row identified with `Z=-1` which contains metadata about the tileset in the `DATA` column in JSON format. It contains the following properties:

* `bounds`: geographical extents of the source as a string in `Xmin, Ymin, Xmax, Ymax` format.
* `center`: center of the geographical extents as `X, Y, Z`, where the `Z` represents the zoom level where a single tile spans the whole extents size.
* `zmin`: minimum zoom level in the tileset.
* `zmax`: maximum zoom level in the tileset.
* `tilestats`: stats about the feature's properties. In addition to its name (`attribute`) and `type`, it contains `min`, `max`, `average`, `sum` and `quantiles` for numeric attributes and `categories` for text attributes.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto.CREATE_POINT_AGGREGATION_TILESET(
  'SELECT geom, population FROM mypopulationtable',
  'MYDB.MYSCHEMA.population_tileset',
  '{
    "geom_column": "geom",
    "zoom_min": 0, "zoom_max": 6,
    "aggregation_resolution": 5,
    "aggregation_placement": "features-centroid",
    "properties": {
      "population_sum": { "formula": "SUM(population)", "type": "NUMBER" }
    }
  }'
)
```


### CREATE_SIMPLE_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_SIMPLE_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Generates a simple tileset.

* `input`: `VARCHAR` that can either contain a table name (e.g. `database.schema.tablename`) or a full query (e.g.<code>'SELECT * FROM db.schema.tablename'</code>).
* `output_table`: Where the resulting table will be stored. It must be a `VARCHAR` of the form <code>'database.schema.tablename'</code>.
* `options`: `VARCHAR` containing a valid JSON with the different options. Valid options are described the table below.

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `VARCHAR` that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `10`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level over this level won't be generated.|
|`metadata`| Default: {}. A JSON object to specify the associated metadata of the tileset. Use this to set the `name`, `description` and `legend` to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`properties`| Default: {}. A JSON object that defines the extra properties that will be included associated to each cell feature. Each property is defined by its name and type (Number or String). Check out the examples included below.|
|`max_tile_features`| Default: `100000`. A `NUMBER` that sets the maximum number of features a tile might contain. This limit is applied only for points. To configure in which order are features kept, use in conjunction with `tile_feature_order`.|
|`max_tile_vertices`| Default: `500000`. A `NUMBER` that sets the maximum number of vertices a tile might contain. This limit is applied only for lines or polygons. Entire features will be dropped when this limit is reached. To configure in which order are features kept, use in conjunction with `tile_feature_order`.|
|`tile_feature_order`| Default: `RANDOM()` for points, `ST_AREA() DESC` for polygons, `ST_LENGTH() DESC` for lines. A `STRING` defining the order in which properties are added to a tile. This expects the SQL `ORDER BY` **keyword definition**, such as `"aggregated_total DESC"`, the `"ORDER BY"` part must not be included. You can use any source column no matter if it's included in the tile as property or not.|
|`max_tile_size_strategy`| Default: `"drop_features"`. A `STRING` that specifies how to apply the limit defined by `max_tile_features` or `max_tile_vertices`. There are two options available:<br/><ul><li>`"drop_features"`: In each tile the features that would exceed the limit are dropped. Different fractions of the total features may be dropped in each tile, which on a map can appear as noticeable differences in feature density between tiles.</li><li>`"drop_fraction_as_needed"`: For every zoom level, this process will drop a consistent fraction of features in every tile to make sure all generated tiles are below the limit. Since a constant fraction of the features is dropped for all tiles of a given zoom level, this will in general drop more features in less populated tiles than the other approach</li><li>`"return_null"` for all tiles that exceed the limits, a row with a NULL DATA column will be produced</li><li>`"throw_error"` if any tile exceeds the limits an error will occur.</li></ul><br/>. For `drop_` strategies, features will be retained according to the `tile_feature_order` specified.|

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto.CREATE_SIMPLE_TILESET(
  'SELECT geom, population FROM mypopulationtable',
  'MYDB.MYSCHEMA.population_tileset',
  '{
    "geom_column": "geom",
    "zoom_min": 0, "zoom_max": 6,
    "properties": {
      "population": "Number",
      "category": "String"
    }
  }'
)
```
