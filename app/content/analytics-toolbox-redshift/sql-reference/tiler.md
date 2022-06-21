## tiler

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

We currently provide a procedure to create aggregation tilesets, useful to generate aggregated point visualizations. We will soon support the creation of simple tilesets to visualize features individually. Visit the [Overview section](/analytics-toolbox-redshift/overview/tilesets/) to learn more about tileset types.


### CREATE_POINT_AGGREGATION_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_POINT_AGGREGATION_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Generates a point aggregation tileset.

* `input`: `VARCHAR` that can either contain a table name (e.g. `database.schema.tablename`) or a full query (e.g.<code>(SELECT * FROM database.schema.tablename)</code>).
* `output_table`: `VARCHAR` of the format `database.schema.tablename` where the resulting tileset will be stored. The database and schema must exist and the caller needs to have permissions to create a new table in it. The process will fail if the table already exists.
* `options`: `VARCHAR` containing a valid JSON with the different options. Valid options are described in the table below.

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `VARCHAR` that indicates the name of the geometry column that will be used. This column must be of type `GEOMETRY` with an SRID 4326 and contain only points.|
|`zoom_min`| Default: `0`. An `INTEGER` that defines the minimum zoom level at which tiles will be generated. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `15`; maximum: `20`. An `INTEGER` that defines the maximum zoom level at which tiles will be generated. Any zoom level over this level won't be generated.|
|`aggregation_resolution`| Default: `6`. An `INTEGER` that specifies the resolution of the spatial aggregation.<br/><br/>Aggregation for zoom `z` is based on quadkey cells at `z + resolution level`. For example, with resolution `6`, the `z0` tile will be divided into cells that match the `z6` tiles, or the cells contained in the `z10` tile will be the boundaries of the `z16` tiles within them. In other words, each tile is subdivided into `4^resolution` cells, which is the maximum number of resulting features (aggregated) that the tiles will contain.<br/><br/>Note that adding more granularity necessarily means heavier tiles which take longer to be transmitted and processed in the final client, and you are more likely to hit the internal memory limits.|
|`aggregation_placement`| Default: `"cell-centroid"`. A `VARCHAR` that defines what type of geometry will be used to represent the cells generated in the aggregation, which will be the features of the resulting tileset. There are currently four options:<br/><ul><li>`"cell-centroid"`: Each feature will be defined as the centroid of the cell, that is, all points that are aggregated together into the cell will be represented in the tile by a single point positioned at the centroid of the cell.</li><li>`"cell"`: Each feature will be defined as the entire cell's polygon, thus the final representation in the tile will be a polygon. This provides more precise coordinates but takes more space in the tile and requires more CPU to process it in the renderer.</li><li>`"features-any"`: The aggregation cell will be represented by any random point from the source data contained within it. That is, if 10 points fall inside a cell, the procedure will randomly choose the location of one of them to represent the aggregation cell.</li><li>`"features-centroid"`: The feature will be defined as the centroid (point) of the collection of points within the cell.</li></ul>|
|`metadata`| Default: {}. A JSON object to specify the associated metadata of the tileset. Use this to set the `name`, `description` and `legend` to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`properties`| Default: {}. A JSON object that defines the properties that will be included associated with each cell feature. Each `property` is defined by its name, type (Number, Boolean, String, etc.) and formula to be applied to the values of the points that fall under the cell. This formula can be any SQL formula that uses an [aggregate function]((https://docs.aws.amazon.com/redshift/latest/dg/c_Aggregate_Functions.html)) supported by Redshift and returns the expected type. Please note that every property different from Number will be casted to String.|
|`max_tile_features`| Default: `100000`. A `NUMBER` that sets the maximum number of features (points) a tile can contain. When this maximum is reached, the procedure will drop features according to the chosen `max_tile_size_strategy`. You can configure in which order the features are kept by setting the `tile_feature_order` property. Any value lower than `4^aggregation_resolution` will be ineffective, therefore the default of 100000 only applies if `aggregation_resolution` is higher than 8.|
|`tile_feature_order`| Default: `""` (disabled). A `STRING` defining the order in which features are added to a tile. This expects the SQL `ORDER BY` **keyword definition**, such as `"aggregated_total DESC"`. The `"ORDER BY"` part must not be included. You can use any source column even if it is not included in the tileset as a property. Please note that the default behavior will add features to the tile according to the order in which they appear in the input table or query.|
|`max_tile_size_strategy`| Default: `"throw_error"`. A `STRING` that specifies how to apply the limit defined by `max_tile_features`. There are two options available:<br/><ul><li>`"drop_features"`: In each tile the features that exceed the limit are dropped. Different fractions of the total features may be dropped in each tile, which on a map can appear as noticeable differences in feature density between tiles.</li><li>`"drop_fraction_as_needed"`: For every zoom level, this process will drop a consistent fraction of features in every tile to make sure all generated tiles are below the limit. Since a constant fraction of the features is dropped for all tiles of a given zoom level, this will in general drop more features in less populated tiles than the the `"drop_features"` strategy.</li><li>`"return_null"`: A row with a NULL data column will be produced for all tiles that exceed the limit.</li><li>`"throw_error"`: The procedure execution will be aborted if any tile exceeds the limit.</li></ul><br/>. For the `drop_` strategies, features will be retained according to the `tile_feature_order` specified.|

{{% bannerNote title="FEATURES PER TILE LIMITS" type="warning" %}}
The value of `aggregation_resolution` sets an upper bound to how many features can be present in a tile. For a value of _n_, a maximum of 4^_n_ (4 raised to n) features can be present in a tile. For example, for an aggregation resolution of 8, the maximum number of features (points) will be 65536 per tile. This value can be too high and produce tiles that are too large when either the aggregation resolution is high or many properties are included. In that case, to improve the performance of the map visualizations, the `max_tile_features` should be used to limit the size of the tiles to about 1MB.
{{%/ bannerNote %}}

**Result**

The generated tileset consists of a table with the following columns, where each row represents a tile:
* `z`: zoom level of the tile.
* `x`: X-index of the tile (`0` to `2^Z-1`).
* `y`: Y-index of the tile (`0` to `2^Z-1`).
* `data`: contents of the tile, encoded as a GeoJSON string (a feature collection). It will contain the resulting points (location of the aggregated features) and their attributes (as defined by `properties`).

Additionally, there is a row in the `data` column identified with `Z=-1` which contains metadata about the tileset in JSON format. It contains the following properties:

* `bounds`: geographical extents of the source as a string in `Xmin, Ymin, Xmax, Ymax` format.
* `center`: center of the geographical extents as `X, Y, Z`, where the `Z` represents the zoom level where a single tile spans the whole extents size.
* `zmin`: minimum zoom level in the tileset.
* `zmax`: maximum zoom level in the tileset.
* `tilestats`: stats about the feature's properties. In addition to its name (`attribute`) and `type`, it contains `min`, `max`, `average` and `sum`.

**Example**

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
    },
    "metadata": {"name": "population_tileset", "description": "A description"}
  }'
);
```


### CREATE_SIMPLE_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_SIMPLE_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Generates a simple tileset.

* `input`: `VARCHAR` that can either contain a table name (e.g. `database.schema.tablename`) or a full query (e.g.<code>'SELECT * FROM db.schema.tablename'</code>).
* `output_table`: `VARCHAR` of the format `database.schema.tablename` where the resulting tileset will be stored.
* `options`: `VARCHAR` containing a valid JSON with the different options. Valid options are described in the table below.

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `VARCHAR` that specifies the name of the geometry column that will be used. This column must be of type `GEOMETRY` with an SRID 4326.|
|`zoom_min`| Default: `0`. A `INTEGER` that defines the minimum zoom level at which tiles will be generated. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `10`. A `INTEGER` that defines the minimum zoom level at which tiles will be generated. Any zoom level over this level won't be generated.|
|`metadata`| Default: {}. A JSON object to specify the associated metadata of the tileset. Use this to set the `name`, `description` and `legend` to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`properties`| Default: {}. A JSON object that defines the properties that will be included associated with each cell feature. Each property is defined by its name and type (Number, Boolean, String, etc.). Please note that every property different from Number will be casted to String.|
|`max_tile_features`| Default: `10000`. A `NUMBER` that sets the maximum number of features a tile can contain. This limit only applies when the input geometries are points. When this limit is reached, the procedure will stop adding features into the tile. You can configure in which order the features are kept by setting the `tile_feature_order` property.|
|`max_tile_vertices`| Default: `200000`. A `NUMBER` that sets the maximum number of vertices a tile can contain. This limit only applies when the input geometries are lines or polygons. When this limit is reached, the procedure will stop adding features into the tile. You can configure in which order the features are kept by setting the `tile_feature_order` property.|
|`tile_feature_order`| Default: `RANDOM()` for points, `ST_AREA() DESC` for polygons, `ST_LENGTH() DESC` for lines. A `STRING` defining the order in which properties are added to a tile. This expects the SQL `ORDER BY` **keyword definition**, such as `"aggregated_total DESC"`. The `"ORDER BY"` part must not be included. You can use any source column even if it is not included in the tileset as a property.|
|`max_tile_size_strategy`| Default: `"throw_error"`. A `VARCHAR` that specifies how to apply the limit defined by `max_tile_features` or `max_tile_vertices`. There are four options available:<br/><ul><li>`"drop_features"`: In each tile the features that exceed the limit are dropped. Different fractions of the total features may be dropped in each tile, which on a map can appear as noticeable differences in feature density between tiles.</li><li>`"drop_fraction_as_needed"`: For every zoom level, this process will drop a consistent fraction of features in every tile to make sure all generated tiles are below the limit. Since a constant fraction of the features is dropped for all tiles of a given zoom level, this will in general drop more features in less populated tiles than the the `"drop_features"` strategy.</li><li>`"return_null"`: A row with a NULL data column will be produced for all tiles that exceed the limit.</li><li>`"throw_error"`: The procedure execution will be aborted if any tile exceeds the limit.</li></ul><br/>. For the `drop_` strategies, features will be retained according to the `tile_feature_order` specified.|
|`max_simplification_zoom`| Default: 11. A `NUMBER` that specifies the maximum zoom level in which the simplification will be carried out.|
|`coordinates_precision`| Default: 8. A `NUMBER` that indicates the geometry coordinates precision stored in the final GeoJSON tiles. This parameter should be carefully choosen in order to obtain a good trade-off between the tile size and the geometry precision, since an excessive low precision can lead to geometry collapse and excessive high precision can hit some Redshift size limits (64 KB for GeoJSON).|

**Example**

```sql
CALL carto.CREATE_SIMPLE_TILESET(
  'SELECT geom, population, category FROM mypopulationtable',
  'MYDB.MYSCHEMA.population_tileset',
  '{
    "geom_column": "geom",
    "zoom_min": 0, "zoom_max": 6,
    "properties": {
      "population": "Number",
      "category": "String"
    }
  }'
);
```


### CREATE_SPATIAL_INDEX_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_SPATIAL_INDEX_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Creates a tileset that uses a spatial index (H3 and QUADKEYS are currently supported), aggregating data from an input table that uses that same spatial index.

Aggregated data is computed for all levels between `resolution_min` and `resolution_max`. For each resolution level, all tiles for the area covered by the source table are added, with data aggregated at level `resolution + aggregation resolution`.

* `input`: `VARCHAR` that can either contain a table name (e.g. `database.schema.tablename`) or a full query (e.g.<code>'SELECT * FROM db.schema.tablename'</code>).
* `output_table`: `VARCHAR` of the format `database.schema.tablename` where the resulting tileset will be stored.
* `options`: `VARCHAR` containing a valid JSON with the different options. Valid options are described in the table below.

| Option | Description |
| :----- | :------ |
|`resolution_min`| Default: `2`. A `INTEGER` that defines the minimum resolution level for tiles. Any resolution level under this level won't be generated.|
|`resolution_max`| Default: `15`. A `INTEGER` that defines the minimum resolution level for tiles. Any resolution level over this level won't be generated.|
|`spatial_index_column`| A `VARCHAR` in the format `spatial_index_type:column_name`, with `spatial_index_type` being the type of spatial index used in the input table (can be `quadint` or `h3`), and `column_name` being the name of the column in that input table that contains the tile ids. Notice that the spatial index name is case-sensitive. The type of spatial index also defines the type used in the output table, which will be QUADINT (for spatial index type `quadint`) or H3 (for spatial index type `h3`).|
|`resolution`| A `INTEGER` defining the resolution of the tiles in the input table.|
|`aggregation_resolution`| Defaults: `6` for QUADKEY tilesets, `4` for H3 tilesets. A `INTEGER` defining the resolution to use when aggregating data at each resolution level. For a given `resolution`, data is aggregated at `resolution_level + aggregation resolution`.|
|`metadata`| Default: {}. A JSON object to specify the associated metadata of the tileset. Use this to set the `name`, `description` and `legend` to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`properties`| Default: {}. A JSON object that defines the properties that will be included associated with each cell feature. Each property is defined by its name and type (Number, Boolean, String, etc.). Please note that every property different from Number will be casted to String.|

{{% bannerNote type="note" title="tip"%}}
Any option left as `NULL` will take its default value if available.
{{%/ bannerNote %}}

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto.CREATE_SPATIAL_INDEX_TILESET(
  'SELECT geoid, population FROM mypopulationtable',
  'MYDB.MYSCHEMA.population_tileset',
  '{
    "resolution_min": 4,
    "resolution_max": 8,
    "spatial_index_column": "quadint:geoid",
    "resolution": 15,
    "aggregation_resolution": 4,
    "properties": {
      "pop": {
          "formula":"sum(population)",
          "type":"Number"
      }
    },
    "metadata": {"name": "population_tileset", "description": "A description"}
  }'
);
```
