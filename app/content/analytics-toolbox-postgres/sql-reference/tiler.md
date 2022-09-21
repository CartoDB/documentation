## Tiler

<div class="badges"><div class="advanced"></div></div>

We currently provide procedures to create two types of tilesets: _simple_ and _aggregation_ tilesets, the former to visualize features individually and the latter to generate aggregated point visualizations.


### CREATE_POINT_AGGREGATION_TILESET

{{% bannerNote type="code" %}}
tiler.CREATE_POINT_AGGREGATION_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Generates a point aggregation tileset.

* `input`: `TEXT` that can either contain a table name (e.g. `database.schema.tablename`) or a full query (e.g.<code>(SELECT * FROM database.schema.tablename)</code>).
* `output_table`: `TEXT` of the format `database.schema.tablename` where the resulting tileset will be stored. The database and schema must exist and the caller needs to have permissions to create a new table in it. The process will fail if the table already exists.
* `options`: `TEXT` containing a valid JSON with the different options. Valid options are described in the table below.

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `STRING` that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `2`. An `INTEGER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `NULL`. An `INTEGER` that defines the minimum zoom level for tiles. Any zoom level over this level won't be generated.|
|`aggregation_resolution`| Default: `6`. An `INTEGER` that specifies the resolution of the spatial aggregation.<br/><br/>For quadkey the aggregation for zoom `z` is done at `z + resolution level`. For example, with resolution `6`, the `z0` tile will be divided into cells that match the `z6` tiles, or the cells contained in the `z10` tile will be the boundaries of the `z16` tiles within them. In other words, each tile is subdivided into `4^resolution` cells.<br/><br/>Note that adding more granularity necessarily means heavier tiles which take longer to be transmitted and processed in the final client, and you are more likely to hit the internal memory limits.|
|`aggregation_placement`| Default: `"cell-centroid"`. A `TEXT` that defines what type of geometry will be used to represent the cells generated in the aggregation, which will be the features of the resulting tileset. There are currently four options:<br/><ul><li>`"cell-centroid"`: Each feature will be defined as the centroid of the cell, that is, all points that are aggregated together into the cell will be represented in the tile by a single point positioned at the centroid of the cell.</li><li>`"cell"`: Each feature will be defined as the entire cell's polygon, thus the final representation in the tile will be a polygon. This provides more precise coordinates but takes more space in the tile and requires more CPU to process it in the renderer.</li><li>`"features-any"`: The aggregation cell will be represented by any random point from the source data contained within it. That is, if 10 points fall inside a cell, the procedure will randomly choose the location of one of them to represent the aggregation cell.</li><li>`"features-centroid"`: The feature will be defined as the centroid (point) of the collection of points within the cell.</li></ul>|
|`metadata`| Default: `{}`. A JSON object to specify the associated metadata of the tileset. Use this to set the name, description and legend to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0). Other fields will be included in the object extra_metadata.|
|`properties`| Default: `{}`. A JSON object that defines the properties that will be included associated with each cell feature. Each `property` is defined by its name, type (Number, Boolean, String, etc.) and formula to be applied to the values of the points that fall under the cell. This formula can be any SQL formula that uses an [aggregate function](https://www.postgresql.org/docs/9.5/functions-aggregate.html) supported by Postgres and returns the expected type. Note that every property different from Number will be casted to String.|
|`tile_extent`| Default: `4096`. An `INTEGER` defining the extent of the tile in integer coordinates as defined by the MVT spec.|
|`tile_buffer`| Default: `16`. An `INTEGER` defining the additional buffer added around the tiles in extent units, which is useful to facilitate geometry stitching across tiles in the renderers. In aggregation tilesets, this property is currently not available and always `0` as no geometries go across tile boundaries.|
|`max_tile_size_kb`| Default: `1024`. An `INTEGER` defining the approximate maximum size for a tile in kilobytes, before compression.|
|`max_tile_features`| Default: `0` (disabled). An `INTEGER` that sets the maximum number of features a tile might contain. This limit is applied before `max_tile_size_kb`, i.e., the tiler will first drop as many features as needed to keep this amount, and then continue with the size limits (if required). To configure in which order are features kept, use in conjunction with `tile_feature_order`.|
|`tile_feature_order`| Default: `""`. A `TEXT` defining the order in which properties are added to a tile. This expects the SQL ORDER BY keyword definition, such as "aggregated_total DESC", the "ORDER BY" part isn't necessary. Note that in aggregation tilesets you can only use columns defined as properties, but in simple feature tilesets you can use any source column no matter if it's included in the tile as property or not.|
|`max_tile_size_strategy`| Default: `"throw_error"`. A `STRING` that specifies how to apply the limit defined by `max_tile_features`. There are three options available:<br/><ul><li>`"drop_fraction_as_needed"`: For every zoom level, this process will drop a consistent fraction of features in every tile to make sure all generated tiles are below the limit. For this strategy, features will be retained according to the `tile_feature_order` specified.</li><li>`"return_null"`: A row with a NULL data column will be produced for all tiles that exceed the limit.</li><li>`"throw_error"`: The procedure execution will be aborted if any tile exceeds the limit.</li></ul><br/>|

**Result**

The generated tileset consists of a table with the following columns, where each row represents a tile:

* `z`: zoom level of the tile.
* `x`: X-index of the tile (`0` to `2^Z-1`).
* `y`: Y-index of the tile (`0` to `2^Z-1`).
* `data`: contents of the tile in [MVT](https://postgis.net/docs/ST_AsMVTGeom.html) format. It will contain the resulting points or cell (location of the aggregated features according to `aggregation_placement`) and their attributes (as defined by `properties`).

Additionally, there is a row in the `data` column identified with `Z=-1` which contains metadata about the tileset in JSON format. It contains the following properties:

* `bounds`: geographical extents of the source as a string in `Xmin, Ymin, Xmax, Ymax` format.
* `center`: center of the geographical extents as `X, Y, Z`, where the `Z` represents the zoom level where a single tile spans the whole extents size.
* `zmin`: minimum zoom level in the tileset.
* `zmax`: maximum zoom level in the tileset.
* `tilestats`: stats about the feature's properties. In addition to its name (`attribute`) and `type`, it contains `min`, `max`, `average` and `sum`.

**Example**

```sql
CALL carto.CREATE_POINT_AGGREGATION_TILESET(
  'SELECT * FROM database.schema.cities_table',
  'database.schema.cities_tileset',
  '{
    "geom_column": "geom",
    "zoom_min": 0,
    "zoom_max": 12,
    "aggregation_resolution": 5,
    "aggregation_placement": "cell-centroid",
    "properties": {
      "num_cities": {
        "formula": "COUNT(*)",
        "type": "Number"
      },
      "population_sum": {
        "formula": "SUM(population)",
        "type": "Number"
      },
      "city_name": {
        "formula": "(CASE WHEN COUNT(*) <= 1 THEN MIN(city_name) ELSE NULL END)",
        "type": "String"
      }
    },
    "metadata": {
      "name": "Population",
      "description": "Population in the cities"
    }
  }'
);
```

In the example above, for all features we would get a property `"num_cities"` with the number of points that fall in it and `"population_sum"` with the sum of the population in those cities. In addition to this, when there is only one point that belongs to this property (and only in that case) we will also get the column values from the source data in `"city_name"`.


### CREATE_SIMPLE_TILESET

{{% bannerNote type="code" %}}
tiler.CREATE_SIMPLE_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Create a simple tileset from a table, with feature dropping.

* `input`: `TEXT` that can either contain a table name (e.g. `database.schema.tablename`) or a full query (e.g.<code>(SELECT * FROM database.schema.tablename)</code>).
* `output_table`: `TEXT` of the format `database.schema.tablename` where the resulting tileset will be stored. The database and schema must exist and the caller needs to have permissions to create a new table in it. The process will fail if the table already exists.
* `options`: `TEXT` containing a valid JSON with the different options. Valid options are described in the table below.

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `STRING` that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `2`. An `INTEGER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `NULL`. An `INTEGER` that defines the minimum zoom level for tiles. Any zoom level over this level won't be generated. If not provided, the appropriate maximum zoom level is inferred from the size of the features.|
|`tile_extent`| Default: `4096`. An `INTEGER` defining the extent of the tile in integer coordinates as defined by the MVT spec.
|`tile_buffer`| Default: `16`. An `INTEGER` defining the additional buffer added around the tiles in extent units, which is useful to facilitate geometry stitching across tiles in the renderers. In aggregation tilesets, this property is currently not available and always `0` as no geometries go across tile boundaries.|
|`max_tile_size_kb`| Default: `1024`. An `INTEGER` that determines the maximum tile size, in kilobytes, before compression.
|`max_tile_features`| Default: `0` (disabled). An `INTEGER` that sets the maximum number of features a tile might contain. This limit is applied before `max_tile_size_kb`, i.e., the tiler will first drop as many features as needed to keep this amount, and then continue with the size limits (if required). To configure in which order are features kept, use in conjunction with `tile_feature_order`.|
|`tile_feature_order`| Default: `""`. A `TEXT` defining the order in which properties are added to a tile. This expects the SQL ORDER BY keyword definition, such as "aggregated_total DESC", the "ORDER BY" part isn't necessary. Note that in aggregation tilesets you can only use columns defined as properties, but in simple feature tilesets you can use any source column no matter if it's included in the tile as property or not. As suggestion, we recommend to use `RANDOM()` for points datasets, `ST_LENGTH()` from lines and `ST_AREA()` for polygons.|
|`max_tile_size_strategy`| Default: `"throw_error"`. A `STRING` that specifies how to apply the limit defined by `max_tile_features`. There are three options available:<br/><ul><li>`"drop_fraction_as_needed"`: For every zoom level, this process will drop a consistent fraction of features in every tile to make sure all generated tiles are below the limit. For this strategy, features will be retained according to the `tile_feature_order` specified.</li><li>`"return_null"`: A row with a NULL data column will be produced for all tiles that exceed the limit.</li><li>`"throw_error"`: The procedure execution will be aborted if any tile exceeds the limit.</li></ul><br/>|
|`generate_feature_id`| Default: `true`. A `BOOLEAN` used to add a unique numeric id in the [MVT tile](https://github.com/mapbox/vector-tile-spec/tree/master/2.1#42-features).|
|`metadata`| Default: `{}`. A JSON object to specify the associated metadata of the tileset. Use this to set the name, description and legend to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0). Other fields will be included in the object extra_metadata.|
|`properties`| Default: `{}`. A JSON object that defines the extra properties that will be included associated to each cell feature. Each property is defined by its name and type (Number, Boolean or String). Check out the examples included below. |

**Result**

The generated tileset consists of a table with the following columns, where each row represents a tile:

* `z`: zoom level of the tile.
* `x`: X-index of the tile (`0` to `2^Z-1`).
* `y`: Y-index of the tile (`0` to `2^Z-1`).
* `data`: contents of the tile in [MVT](https://postgis.net/docs/ST_AsMVTGeom.html) format. It will contain the resulting features and their attributes (as defined by `properties`).

Additionally, there is a row in the `data` column identified with `Z=-1` which contains metadata about the tileset in JSON format. It contains the following properties:

* `bounds`: geographical extents of the source as a string in `Xmin, Ymin, Xmax, Ymax` format.
* `center`: center of the geographical extents as `X, Y, Z`, where the `Z` represents the zoom level where a single tile spans the whole extents size.
* `zmin`: minimum zoom level in the tileset.
* `zmax`: maximum zoom level in the tileset.
* `tilestats`: stats about the feature's properties. In addition to its name (`attribute`) and `type`, it contains `min`, `max`, `average` and `sum`.

**Example**

```sql
CALL carto.CREATE_SIMPLE_TILESET(
  'select * from MYDB.MYSCHEMA.carto_geography_usa_censustract',
  'MYDB.MYSCHEMA.carto_geography_usa_censustract_tileset',
  '{
    "zoom_min":0,
    "zoom_max":5,
    "metadata": {
      "name": "censustract_tileset",
      "description": "A description"
    },
    "properties":{
      "geoid":"String",
      "do_perimeter":"Number",
      "do_label":"String"
    }
  }'
);
```


### CREATE_SPATIAL_INDEX_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_SPATIAL_INDEX_TILESET(source_table, target_table, options)
{{%/ bannerNote %}}

**Description**

Creates a tileset that uses a spatial index (H3 and QUADBIN are currently supported), aggregating data from an input table that uses that same spatial index.

Aggregated data is computed for all levels between `resolution_min` and `resolution_max`. For each resolution level, all tiles for the area covered by the source table are added, with data aggregated at level `resolution + aggregation_resolution`.

* `source_table`: `TEXT` that can either be a table name (e.g. `schema.tablename` or a full query (e.g.<code>SELECT * FROM database.schema.tablename</code>).
* `target_table`: Where the resulting table will be stored. It must be a `TEXT` of the form <code>database.schema.tablename</code>. The `database` can be omitted (in which case the current one will be used). The `schema` can also be omitted and the first on the `search_path` will be used. The schema must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `TEXT` containing a valid JSON with the different options. Valid options are described the table below.
| Option | Description |
| :----- | :------ |
|`resolution_min`| Default: `2`. An `NUMBER` that defines the minimum resolution level for tiles. Any resolution level under this level won't be generated.|
|`resolution_max`| Default: `15`. A `NUMBER` that defines the maximum resolution level for tiles. Any resolution level over this level won't be generated.|
|`spatial_index_column`| A `STRING` in the format `spatial_index_type:column_name`, with `spatial_index_type` being the type of spatial index used in the input table (can only be `quadbin` at the moment), and `column_name` being the name of the column in that input table that contains the tile ids. Notice that the spatial index name is case-sensitive. The type of spatial index also defines the type used in the output table, which will be QUADBIN (for spatial index type `quadbin`).|
|`resolution`| A `NUMBER` defining the resolution of the tiles in the input table.|
|`aggregation_resolution`| Defaults: `6` for QUADBIN tilesets, `4` for H3 tilesets. A `NUMBER` defining the resolution to use when aggregating data at each resolution level. For a given `resolution`, data is aggregated at `resolution_level + aggregation resolution`.|
|`properties`| A JSON object containing the aggregated properties to add to each tile in the output table. It cannot be empty, since at least one property is needed for aggregating the original values|
|`metadata`| Default: `{}`. A JSON object to specify the associated metadata of the tileset. Use this to set the name, description and legend to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0). Other fields will be included in the object extra_metadata.|

{{% bannerNote type="note" title="tip"%}}
Any option left as `NULL` will take its default value if available.
{{%/ bannerNote %}}

**Examples**

```sql
CALL carto.CREATE_SPATIAL_INDEX_TILESET(
  'YOUR_DATABASE.YOUR_SCHEMA.INPUT_TABLE_QUADBIN_LEVEL14',
  'YOUR_DATABASE.YOUR_SCHEMA.OUTPUT_TILESET_QUADBIN_LEVEL14',
  '{
    "spatial_index_column": "quadbin:index",
    "resolution": 14,
    "resolution_min": 0,
    "resolution_max": 8,
    "aggregation_resolution": 6,
    "properties": {
      "population": {
        "formula": "SUM(population)",
        "type": "Number"
      }
    }
  }'
);
```

```sql
CALL carto.CREATE_SPATIAL_INDEX_TILESET(
  'SELECT * FROM YOUR_DATABASE.YOUR_SCHEMA.INPUT_TABLE_H3_LEVEL10',
  'YOUR_DATABASE.YOUR_SCHEMA.OUTPUT_TILESET_H3_LEVEL10',
  '{
    "spatial_index_column": "h3:index",
    "resolution": 10,
    "resolution_min": 0,
    "resolution_max": 6,
    "aggregation_resolution": 4,
    "properties": {
      "population": {
        "formula": "SUM(population)",
        "type": "Number"
      }
    }
  }'
);
```
