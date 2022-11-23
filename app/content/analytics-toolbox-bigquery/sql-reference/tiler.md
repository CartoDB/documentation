---
aliases:
    - /analytics-toolbox-bq/sql-reference/tiler/
---
## tiler

<div class="badges"><div class="advanced"></div></div>

We currently provide procedures to create the following kind of tilesets:

* Spatial index tiles (aggregates spatial indexes into tiles at specific resolutions)
* Geometry-based MVT tiles of two types:
  * _simple_ tilesets to visualize features individually
  * _aggregation_ tilesets to generate aggregated point visualizations

Visit the [Overview](/analytics-toolbox-bigquery/overview/tilesets) section to learn more about tileset types and which procedures to use in each case.


### CREATE_POINT_AGGREGATION_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_POINT_AGGREGATION_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Generates a point aggregation tileset.

* `input`: `STRING` that can either be a quoted qualified table name (e.g. ``project-id.dataset-id.table-name``) or a full query wrapped in parentheses (e.g.<code>(Select * FROM \`project-id.dataset-id.table-name`)</code>).
* `output_table`: Where the resulting table will be stored. It must be a `STRING` of the form ``project-id.dataset-id.table-name``. The `project-id` can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRING` containing a valid JSON with the different options. Valid options are described the table below.

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `STRING` that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `0`. A `NUMBER` that defines the maximum zoom level for tiles. Any zoom level over this level won't be generated.|
|`zoom_min_column`| Default: `NULL`. It is the column that each row could have to modify its starting zoom. It can be NULL (then `zoom_min` will be used). When provided, if its value is greater than `zoom_min`, it will take precedence and be used as the actual minimum.|
|`zoom_max_column`| Default: `NULL`. It is the column that each row could have to modify its end zoom level. It can be NULL (then zoom_max will be used). When provided, if its value is lower than `zoom_max`, it will be taken as the real maximum zoom level.|
|`target_partitions`| Default: `3999`. Max: `3999`. A `NUMBER` that defines the **maximum** number of partitions to be used in the target table. The partition system, which uses a column named `carto_partition`, divides the available partitions first by zoom level and spatial locality to minimize the cost of tile read requests in web maps. Beware that this does not necessarily mean that all the partitions will be used, as a sparse dataset will leave some of these partitions unused. If you are using [BigQuery BI Engine](https://cloud.google.com/bi-engine/docs/overview) consider that it supports a maximum of 500 partitions per table.|
|`target_tilestats`| Default: `true`. A `BOOLEAN` to determine whether to include statistics of the properties in the metadata. These statistics are based on [mapbox-tilestats](https://github.com/mapbox/mapbox-geostats) and depend on the property type:<br/><ul><li>Number: MIN, MAX, AVG, SUM and quantiles (from 3 to 20 breaks).</li><li>String / Boolean: List of the top 10 most common values and their count.</li></ul>For aggregation tilesets, these statistics refer to the cells at the maximum zoom generated.|
|`tile_extent`| Default: `4096`. A `NUMBER` defining the extent of the tile in integer coordinates as defined by the MVT spec.
|`tile_buffer`| Default: `0` (disabled). A `NUMBER` defining the additional buffer added around the tiles in extent units, which is useful to facilitate geometry stitching across tiles in the renderers. In aggregation tilesets, this property is currently not available and always `0` as no geometries go across tile boundaries.|
|`max_tile_size_kb`| Default: `1024`. A `NUMBER` specifying the approximate maximum size for a tile.
|`max_tile_size_strategy`| Default: `"throw_error"`. A `STRING` that determines what to do when the maximum size of a tile is reached while it is still processing data. There are three options available:<br/><ul><li>`"return_null"`: The process will return a NULL buffer. This might appear as empty in the map.</li><li>`"throw_error"`: The process will throw an error cancelling the aggregation, so no tiles or table will be generated.</li><li>`"drop_fraction_as_needed"`: For every zoom level, this process will drop a consistent fraction of features in every tile to make sure all generated tiles are below the maximum size set in `max_tile_size_kb.` This could lead to features disappearing at different zoom levels. Features will be dropped according to the `tile_feature_order` parameter, which becomes mandatory when using this strategy.</li></ul>|
|`max_tile_features`| Default: `0` (disabled). A `NUMBER` that sets the maximum number of features a tile might contain. This limit is applied before `max_tile_size_kb`, i.e., the tiler will first drop as many features as needed to keep this amount, and then continue with the size limits (if required). To configure in which order features are kept, use in conjunction with `tile_feature_order`.|
|`tile_feature_order`| Default: `""` (disabled). A `STRING` defining the order in which properties are added to a tile. This expects the SQL ORDER BY keyword definition, such as "aggregated_total DESC", the "ORDER BY" part isn't necessary. Note that in aggregation tilesets you can only use columns defined as properties, but in simple feature tilesets you can use any source column no matter if it's included in the tile as property or not. **This is an expensive operation, so it's recommended to only use it when necessary.**|
|`aggregation_type`| Default: `"quadgrid"`. A `STRING` defining what kind of spatial aggregation is to be used. Currently only [quadgrid](https://docs.carto.com/analytics-toolbox-bigquery/overview/spatial-indexes/#quadbin) is supported.|
|`aggregation_resolution`| Default: `6`. A `NUMBER` that specifies the resolution of the spatial aggregation.<br/><br/>For quadgrid the aggregation for zoom `z` is done at `z + resolution level`. For example, with resolution `6`, the `z0` tile will be divided into cells that match the `z6` tiles, or the cells contained in the `z10` tile will be the boundaries of the `z16` tiles within them. In other words, each tile is subdivided into `4^resolution` cells.<br/><br/>Note that adding more granularity necessarily means heavier tiles which take longer to be transmitted and processed in the final client, and you are more likely to hit the internal memory limits.|
|`aggregation_placement`| Default: `"cell-centroid"`. A `STRING` that defines what type of geometry will be used for the cells generated in the aggregation. For a quadgrid aggregation, there are currently four options:<br/><ul><li>`"cell-centroid"`: Each feature will be defined as the centroid of the cell, that is, all points that are aggregated together into the cell will be represented in the tile by a single point.</li><li>`"cell"`: Each feature will be defined as the whole cell, thus the final representation in the tile will be a polygon. This gives more precise coordinates but takes more space in the tile and requires more CPU to process it in the renderer.</li><li>`"features-any"`: The point representing a feature will be any random point from the source data, that is, if 10 points fall inside a cell it will use the location of one of them to represent the cell itself</li><li>`"features-centroid"`: The feature will be defined as the centroid (point) of the points that fall into the cell. Note that this only takes into account the points aggregated under a cell, and not the cell shape (as "cell-centroid" does).</li></ul>|
|`metadata`| Default: `{}`. A JSON object to specify the associated metadata of the tileset. Use this to set the name, description and legend to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0). Other fields will be included in the object extra_metadata.|
|`properties`| Default: `{}`. A JSON object that defines the properties that will be included associated with each cell feature. Each `property` is defined by its name, type (Number, Boolean, String, etc.) and formula to be applied to the values of the points that fall under the cell. This formula can be any SQL formula that uses an [aggregate function](https://cloud.google.com/bigquery/docs/reference/standard-sql/functions-and-operators#aggregate_functions) supported by BigQuery and returns the expected type. Note that every property different from Number will be casted to String.|

{{% bannerNote type="note" title="warning"%}}
There are some cases where [flat-rates](https://cloud.google.com/bigquery/pricing#flat-rate_analysis_pricing) is the only option to create a tileset. Some tables containing huge geographies might trigger a `Query exceeded resource limits` error because of the high CPU usage.
{{%/ bannerNote %}}

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.CREATE_POINT_AGGREGATION_TILESET(
  R'''(
    SELECT ST_CENTROID(geometry) as geom
    FROM `bigquery-public-data.geo_openstreetmap.planet_features`
    WHERE 'building' IN (SELECT key FROM UNNEST(all_tags)) AND geometry IS NOT NULL
  )''',
  '`your-project.your-dataset.osm_buildings_14_7`',
  R'''
    {
      "zoom_min": 0,
      "zoom_max": 14,
      "aggregation_resolution": 7,
      "aggregation_placement": "cell-centroid",
      "properties": {
        "aggregated_total": {
          "formula": "COUNT(*)",
          "type": "Number"
        }
      }
    }
  ''');
```

Here is an example of valid `properties` for a Point Aggregation Tileset:

```sql
R'''
{
    "properties": {
        "new_column_name": {
            "formula": "COUNT(*)",
            "type": "Number"
        },
        "most_common_ethnicity": {
            "formula": "APPROX_TOP_COUNT(ethnicity, 1)[OFFSET(0)].value",
            "type": "String"
        },
        "has_other_ethnicities": {
            "formula": "COUNTIF(ethnicity = 'other_race') > 0",
            "type": "Boolean"
        },
        "name": {
            "formula": "IF(COUNT(*) <= 1, ANY_VALUE(name), NULL)",
            "type": "String"
        },
        "address": {
            "formula": "IF(COUNT(*) <= 1, ANY_VALUE(address), NULL)",
            "type": "String"
        }
    }
}
'''
```

In the example above, for all features we would get a property `"new_column_name"` with the number of points that fall in it, the `"most_common_ethnicity"` of those rows and whether there are points whose ethnicity value matches one specific value (`"has_other_ethnicities"`). In addition to this, when there is only one point that belongs to this property (and only in that case) we will also get the column values from the source data: `"name"` and `"address"`.

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Creating aggregation tilesets](/analytics-toolbox-bigquery/examples/creating-aggregation-tilesets/)
{{%/ bannerNote %}}


### CREATE_SIMPLE_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_SIMPLE_TILESET(input, output_table, options)
{{%/ bannerNote %}}

{{% bannerNote type="warning" title="warning"%}}
This procedure is the older version of `carto.CREATE_TILESET` and you can achieve exactly the same results with either of these procedures. However, `carto.CREATE_TILESET` is capable of finding the right configuration for your input data, whereas this procedure requires you to set them yourself. Please use this procedure _only_ if you need a really specific configuration for your tileset or need to tweak a particular option that it's not available in `carto.CREATE_TILESET`.
{{%/ bannerNote %}}

**Description**

Generates a simple tileset.

* `input`: `STRING` that can either be a quoted qualified table name (e.g. <code>\`project-id.dataset-id.table-name\`</code>) or a full query contained by parentheses (e.g.<code>(SELECT * FROM \`project-id.dataset-id.table-name\`)</code>).
* `output_table`: Where the resulting table will be stored. It must be a `STRING` of the form <code>\`projectI-id.dataset-id.table-name\`</code>. The `project-id` can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRING` containing a valid JSON with the different options. Valid options are described the table below.

{{% bannerNote type="note" title="tip"%}}
To avoid issues in the process when building the queries that will be executed internally against BigQuery, it is highly recommended to use [raw strings](https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#string_and_bytes_literals) when passing long queries in the `input` that might contain special characters.
{{%/ bannerNote %}}

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `STRING` that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `0`. A `NUMBER` that defines the maximum zoom level for tiles. Any zoom level over this level won't be generated.|
|`zoom_min_column`| Default: `NULL`. It is the column that each row could have to modify its starting zoom. It can be NULL (then zoom_min will be used). When provided, if its value is greater than `zoom_min`, it will take precedence and be used as the actual minimum.|
|`zoom_max_column`| Default: `NULL`. It is the column that each row could have to modify its end zoom level. It can be NULL (then zoom_max will be used). When provided, if its value is lower than `zoom_max`, it will be taken as the real maximum zoom level.|
|`target_partitions`| Default: `3999`. Max: `3999`. A `NUMBER` that defines the **maximum** amount of partitions to be used in the target table. The partition system, which uses a column named `carto_partition`, divides the available partitions first by zoom level and spatial locality to minimize the cost of tile read requests in web maps. Beware that this does not necessarily mean that all the partitions will be used, as a sparse dataset will leave some of these partitions unused. If you are using [BigQuery BI Engine](https://cloud.google.com/bi-engine/docs/overview) consider that it supports a maximum of 500 partitions per table.|
|`target_tilestats`| Default: `true`. A `BOOLEAN` to determine whether to include statistics of the properties in the metadata. These statistics are based on [mapbox-tilestats](https://github.com/mapbox/mapbox-geostats) and depend on the property type:<br/><ul><li>Number: MIN, MAX, AVG, SUM and quantiles (from 3 to 20 breaks).</li><li>String / Boolean: List of the top 10 most common values and their count.</li></ul>In Simple Tilesets, these statistics are based on the source data.|
|`tile_extent`| Default: `4096`. A `NUMBER` defining the extent of the tile in integer coordinates as defined by the [MVT specification](https://github.com/mapbox/vector-tile-spec).
|`tile_buffer`| Default: `16`. A `NUMBER` defining the additional buffer added around the tiles in extent units, which is useful to facilitate geometry stitching across tiles in the renderers.|
|`max_tile_size_kb`| Default: `1024`. Maximum allowed: `6144`. A `NUMBER` specifying the approximate maximum size for a tile in kilobytes.
|`max_tile_size_strategy`| Default: `"throw_error"`. A `STRING` that determines what to do when the maximum size of a tile is reached while it is still processing data. There are three options available:<br/><ul><li>`"return_null"`: The process will return a NULL buffer. This might appear as empty in the map.</li><li>`"throw_error"`: The process will throw an error cancelling the aggregation, so no tiles or table will be generated.</li><li>`"drop_fraction_as_needed"`: For every zoom level, this process will drop a consistent fraction of features in every tile to make sure all generated tiles are below the maximum size set in `max_tile_size_kb.` This could lead to features disappearing at different zoom levels. Features will be dropped according to the `tile_feature_order` parameter, which becomes mandatory when using this strategy.</li></ul>|
|`max_tile_features`| Default: `0` (disabled). A `NUMBER` that sets the maximum number of features a tile might contain. This limit is applied before `max_tile_size_kb`, i.e., the tiler will first drop as many features as needed to keep this amount, and then continue with the size limits (if required). To configure in which order features are kept, use in conjunction with `tile_feature_order`.|
|`tile_feature_order`| Default: `""` (disabled). A `STRING` defining the order in which properties are added to a tile. This expects the SQL `ORDER BY` **keyword definition**, such as `"aggregated_total DESC"`, the `"ORDER BY"` part isn't necessary. Note that in aggregation tilesets you can only use columns defined as properties, but in simple feature tilesets you can use any source column no matter if it's included in the tile as property or not. **This is an expensive operation, so it's recommended to only use it when necessary.**|
|`drop_duplicates`| Default: `false`. A `BOOLEAN` to drop duplicate features in a tile. This will drop only exact matches (both the geometry and the properties are exactly equal). As this requires sorting the properties, which is expensive, it should only be used when necessary.|
|`generate_feature_id`| Default: `false`. A `BOOLEAN` used to add a unique numeric id in the [MVT tile](https://github.com/mapbox/vector-tile-spec/tree/master/2.1#42-features).|
|`metadata`| Default: `{}`. A JSON object to specify the associated metadata of the tileset. Use this to set the name, description and legend to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0). Other fields will be included in the object extra_metadata.|
|`properties`| Default: `{}`. A JSON object that defines the extra properties that will be included associated to each cell feature. Each property is defined by its name and type (Number, Boolean or String). Check out the examples included below.|

{{% bannerNote type="note" title="tip"%}}
If `drop_fraction_as_needed` is used, a `fraction_dropped_per_zoom` property will be included in the TileJSON, containing an estimate of the percentage of the features that have been dropped per zoom level. Please bear in mind that the exact percentages can be up to 5% higher.
{{%/ bannerNote %}}

{{% bannerNote type="note" title="warning"%}}
There are some cases where [flat-rates](https://cloud.google.com/bigquery/pricing#flat-rate_analysis_pricing) is the only option to create a tileset. Some tables containing huge geographies might trigger a `Query exceeded resource limits` error because of the high CPU usage.
{{%/ bannerNote %}}

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.CREATE_SIMPLE_TILESET(
  R'''(
    SELECT geom, type
    FROM `carto-do-public-data.natural_earth.geography_glo_roads_410`
  ) _input
  ''',
  R'''`cartobq.maps.natural_earth_roads`''',
  R'''
  {
    "properties":{
      "type": "String"
    }
  }'''
);
```

In Simple Tilesets, the `properties` are defined by the source data itself. You only have to write the name of the column (as defined in the source query or table) and its type. It doesn't support any extra transformations or formulae since those can be applied to the source query directly.

```sql
R'''
{
    "properties": {
        "source_column_name": "Number",
        "source_column_name_2": "String"
    }
}
'''
```

Here is an example of a valid JSON for the `options` parameter:

```sql
R'''
{
    "geom_column": "geom",

    "zoom_min": 0,
    "zoom_max": 0,

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

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Creating simple tilesets](/analytics-toolbox-bigquery/examples/creating-simple-tilesets/)
{{%/ bannerNote %}}


### CREATE_SPATIAL_INDEX_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_SPATIAL_INDEX_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Creates a tileset that uses a spatial index (H3 and QUADBIN are currently supported), aggregating data from an input table that uses that same spatial index.

Aggregated data is computed for all levels between `resolution_min` and `resolution_max`. For each resolution level, all tiles for the area covered by the source table are added, with data aggregated at level `resolution + aggregation resolution`.

* `input`: `STRING` that can either be a quoted qualified table name (e.g. <code>\`project-id.dataset-id.table-name\`</code>) or a full query contained by parentheses (e.g.<code>(SELECT * FROM \`project-id.dataset-id.table-name\`)</code>).
* `output_table`: Where the resulting table will be stored. It must be a `STRING` of the form <code>\`project-id.dataset-id.table-name\`</code>. The `project-id` can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRING` containing a valid JSON with the different options. Valid options are described the table below.
| Option | Description |
| :----- | :------ |
|`resolution_min`| Default: `0`. A `NUMBER` that defines the minimum resolution level for tiles. Any resolution level under this level won't be generated.|
|`resolution_max`| Default: `0`. A `NUMBER` that defines the maximum resolution level for tiles. Any resolution level over this level won't be generated.|
|`spatial_index_column`| A `STRING` in the format `spatial_index_type:column_name`, with `spatial_index_type` being the type of spatial index used in the input table (can be `quadbin` or `h3`), and `column_name` being the name of the column in that input table that contains the tile ids. Notice that the spatial index name is case-sensitive. The type of spatial index also defines the type used in the output table, which will be QUADBIN (for spatial index type `quadbin`) or H3 (for spatial index type `h3`).|
|`resolution`| A `NUMBER` defining the resolution of the tiles in the input table.|
|`aggregation_resolution`| Defaults: `6` for QUADBIN tilesets, `4` for H3 tilesets. A `NUMBER` defining the resolution to use when aggregating data at each resolution level. For a given `resolution`, data is aggregated at `resolution_level + aggregation resolution`.|
|`properties`| A JSON object containing the aggregated properties to add to each tile in the output table. It cannot be empty, since at least one property is needed for aggregating the original values|
|`metadata`| Default: `{}`. A JSON object to specify the associated metadata of the tileset. Use this to set the name, description and legend to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0). Other fields will be included in the object extra_metadata.|

{{% bannerNote type="note" title="tip"%}}
Any option left as `NULL` will take its default value if available.
{{%/ bannerNote %}}

{{% bannerNote type="note" title="warning"%}}
There are some cases where [flat-rates](https://cloud.google.com/bigquery/pricing#flat-rate_analysis_pricing) is the only option to create a tileset. Some tables containing huge geographies might trigger a `Query exceeded resource limits` error because of the high CPU usage.
{{%/ bannerNote %}}

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

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
  '(SELECT * FROM YOUR_DATABASE.YOUR_SCHEMA.INPUT_TABLE_H3_LEVEL10)',
  'YOUR_DATABASE.YOUR_SCHEMA.OUTPUT_TILESET_H3_LEVEL10',
  R'''{
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
  }'''
);
```

{{% bannerNote type="note" title="warning"%}}
In case of `input` being set as a query, it should be taken into account that [CTEs](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#simple_cte) are not allowed. Also, the query should be as simple as possible in order to avoid BigQuery limitations about the complexity of the final query.
{{%/ bannerNote %}}

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Creating spatial index tilesets](/analytics-toolbox-bigquery/examples/creating-spatial-index-tilesets/)
{{%/ bannerNote %}}


### CREATE_TILESET

{{% bannerNote type="code" %}}
carto.CREATE_TILESET(input, output_table, options)
{{%/ bannerNote %}}

**Description**

Creates a simple tileset. It differs from `carto.CREATE_SIMPLE_TILESET` in that the procedure performs a previous analysis in order to find automatically the right options for the tileset. It is done by extracting all the properties to be included within the tileset and sampling the data in order to avoid BigQuery limitations. Therefore, only `input` and `output_table` are mandatory and `options` can be set to `NULL`.

* `input`: `STRING` that can either be a quoted qualified table name (e.g. <code>\`project-id.dataset-id.table-name\`</code>) or a full query contained by parentheses (e.g.<code>(SELECT * FROM \`project-id.dataset-id.table-name\`)</code>).
* `output_table`: Where the resulting table will be stored. It must be a `STRING` of the form <code>\`project-id.dataset-id.table-name\`</code>. The `project-id` can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRUCT<name STRING, description STRING,legend STRING, zoom_min INT64, zoom_max INT64, geom_column_name STRING, zoom_min_column STRING, zoom_max_column STRING, max_tile_size_kb INT64, tile_feature_order STRING, drop_duplicates BOOL, extra_metadata STRING>|NULL` containing the different options. Valid options are described in the table below.

| Option | Description |
| :----- | :------ |
|`name`| Default: `""`. A `STRING` that contains the name of tileset to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`description`| Default: `""`. A `STRING` that contains a description for the tileset to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`legend`| Default: `""`. A `STRING` that contains a legend for the tileset to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`zoom_min`| Default: `0` for `POINTS` datasets and `2` for `POLYGON/LINESTRING` datasets. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `0`. A `NUMBER` that defines the maximum zoom level for tiles. Any zoom level over this level won't be generated.|
|`geom_column_name`| Default: `"geom"`. A `STRING` that contains the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min_column`| Default: `NULL`. It is the column that each row could have to modify its starting zoom. It can be NULL (then `zoom_min` will be used). It must be a positive number between `zoom_min` and `zoom_max`.|
|`zoom_max_column`| Default: `NULL`. It is the column that each row could have to modify its end zoom level. It can be NULL (then `zoom_max` will be used). It must be a positive number between `zoom_min` and `zoom_max`.|
|`max_tile_size_kb`| Default: `512`. Maximum allowed: `6144`. A `NUMBER` setting the approximate maximum size for a tile in kilobytes. For every zoom level, a consistent fraction of features will be dropped in every tile to make sure all generated tiles are below this maximum.
|`tile_feature_order`| Default: `NULL`. A `STRING` defining the order in which properties are added to a tile. This expects the SQL `ORDER BY` **keyword definition**, such as `"aggregated_total DESC"`, the `"ORDER BY"` part isn't necessary. Note that in aggregation tilesets you can only use columns defined as properties, but in simple feature tilesets you can use any source column no matter if it's included in the tile as property or not. **This is an expensive operation, so it's recommended to only use it when necessary**. If no order is provided, a custom dropping depending on the geometry type is performed. In case of `POINT` geometries, features are dropped randomly. In case of `POLYGON` geometries the features are added ordered by their area, while for `LINESTRING` geometries the criteria is the feature length.|
|`drop_duplicates`| Default: `false`. A `BOOLEAN` to drop duplicate features in a tile. This will drop only exact matches (both the geometry and the properties are exactly equal). As this requires sorting the properties, which is expensive, it should only be used when necessary.|
|`extra_metadata`| Default: {}. A JSON object to specify the custom metadata of the tileset.|

{{% bannerNote type="note" title="tip"%}}
Any option left as `NULL` will take its default value. This also applies for geometry type dependant options such as `zoom_min` or `tile_feature_order`.
{{%/ bannerNote %}}

{{% bannerNote type="note" title="tip"%}}
A `fraction_dropped_per_zoom` property will be included in the TileJSON, containing an estimate of the percentage of the features that have been dropped per zoom level as a result of applying the `drop_fraction_as_needed` strategy. Please bear in mind that the exact percentages can be up to 5% higher.
{{%/ bannerNote %}}

{{% bannerNote type="note" title="warning"%}}
It should be taken into account that `CREATE_TILESET` will not be executed for any level that reaches more than 10 millions tiles. This threshold is set in order to avoid some BigQuery limitations. This could occur if the input dataset is very sparse or `zoom_max` is quite large.
{{%/ bannerNote %}}

{{% bannerNote type="note" title="warning"%}}
There are some cases where [flat-rates](https://cloud.google.com/bigquery/pricing#flat-rate_analysis_pricing) is the only option to create a tileset. Some tables containing huge geographies might trigger a `Query exceeded resource limits` error because of the high CPU usage.
{{%/ bannerNote %}}

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.CREATE_TILESET(
  R'''(
    SELECT geom, type
    FROM `carto-do-public-data.natural_earth.geography_glo_roads_410`
  )
  ''',
  R'''`cartobq.maps.natural_earth_roads`''',
  NULL
);
```

If any of the options introduced above are required, the remaining fields should also be provided or set to `NULL`. Here is an example of a valid structure for the `options` parameter (the field alias can be ignored):

```sql
CALL `carto-un`.carto.CREATE_TILESET(
  R'''(
    SELECT geom, type
    FROM `carto-do-public-data.natural_earth.geography_glo_roads_410`
  )
  ''',
  R'''`cartobq.maps.natural_earth_roads`''',
  STRUCT(
    "Tileset name" AS name,
    "Tileset description" AS description,
    NULL AS legend,
    0 AS zoom_min,
    10 AS zoom_max,
    "geom" AS geom_column_name,
    NULL AS zoom_min_column,
    NULL AS zoom_max_column,
    1024 AS max_tile_size_kb,
    "RAND() DESC" AS tile_feature_order,
    true AS drop_duplicates,
    R'''
      "custom_metadata": {
        "version": "1.0.0",
        "layer": "layer1"
      }
    ''' AS extra_metadata
  )
);
```

{{% bannerNote type="note" title="warning"%}}
In case of `input` is set as a query, it should be taken into account that [CTEs](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#simple_cte) are not allowed. Also, the query should be as simple as possible in order to avoid BigQuery limitations about the complexity of the final query.
{{%/ bannerNote %}}

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Creating simple tilesets](/analytics-toolbox-bigquery/examples/creating-simple-tilesets/)
{{%/ bannerNote %}}


{{% euFlagFunding %}}