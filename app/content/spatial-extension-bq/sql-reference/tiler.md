## tiler

<div class="badge advanced"></div>

We currently provide two procedures to tilify a dataset: _CREATE_SIMPLE_TILESET_ and _CREATE_POINT_AGGREGATION_TILESET_, the former to visualize features individually and the latter to generate aggregated point visualizations. Visit the [Overview](../../overview/tilesets/#tileset-types) section to learn more about tileset types.

### CREATE_SIMPLE_TILESET

{{% bannerNote type="code" %}}
tiler.CREATE_SIMPLE_TILESET(source_table, target_table, options)
{{%/ bannerNote %}}

**Description**

Generates a simple tileset.

* `source_table`: `STRING` that can either be a quoted qualified table name (e.g. <code>\`projectID.dataset.tablename\`</code>) or a full query contained by parentheses (e.g.<code>(SELECT * FROM \`projectID.dataset.tablename\`)</code>).
* `target_table`: Where the resulting table will be stored. It must be a `STRING` of the form <code>\`projectID.dataset.tablename\`</code>. The projectID can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRING` containing a valid JSON with the different options. Valid options are described the table below.

{{% bannerNote type="note" title="tip"%}}
To avoid issues in the process when building the queries that will be executed internally against BigQuery, it is highly recommended to use [raw strings](https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#string_and_bytes_literals) when passing long queries in the `source_table` that might contain special characters.
{{%/ bannerNote %}}

zoom_min_column is the column that each row could have to modify its starting zoom. It can be NULL (then zoom_miin will be used). It must be a positive number between zoom_min and zoom_max.
zoom_max_column is the column that each row could have to modify its end zoom level. It can be NULL (then zoom_max will be used). It must be a positive number between zoom_min and zoom_max.

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `STRING` that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level over this level won't be generated.|
|`zoom_min_column`| Default: `NULL`. It is the column that each row could have to modify its starting zoom. It can be NULL (then zoom_miin will be used). It must be a positive number between `zoom_min` and `zoom_max`.|
|`zoom_max_column`| Default: `NULL`. It is the column that each row could have to modify its end zoom level. It can be NULL (then zoom_max will be used). It must be a positive number between `zoom_min` and `zoom_max`.|
|`target_partitions`| Default: `4000`. Max: `4000`. A `NUMBER` that defines the **maximum** amount of partitions to be used in the target table. The partition system, which uses a column named `carto_partition`, divides the available partitions first by zoom level and spatial locality to minimize the cost of tile read requests in web maps. Beware that this does not necessarily mean that all the partitions will be used, as a sparse dataset will leave some of these partitions unused. If you are using [BigQuery BI Engine](https://cloud.google.com/bi-engine/docs/overview) consider that it supports a maximum of 500 partitions per table.|
|`target_tilestats`| Default: `true`. A `BOOLEAN` to determine whether to include statistics of the properties in the metadata. These statistics are based on [mapbox-tilestats](https://github.com/mapbox/mapbox-geostats) and depend on the property type:<br/><ul><li>Number: MIN, MAX, AVG, SUM and quantiles (from 3 to 20 breaks).</li><li>String / Boolean: List of the top 10 most common values and their count.</li></ul>In Simple Tilesets, these statistics are based on the source data.|
|`tile_extent`| Default: `4096`. A `NUMBER` defining the extent of the tile in integer coordinates as defined by the MVT spec.
|`tile_buffer`| Default: `16`. A `NUMBER` defining the additional buffer added around the tiles in extent units, which is useful to facilitate geometry stitching across tiles in the renderers.|
|`max_tile_size_kb`| Default: `1024`. Maximum allowed: `6144`. A `NUMBER` defining setting the approximate maximum size for a tile in kilobytes. 
|`max_tile_size_strategy`| Default: `"throw_error"`. A `STRING` that determines what to do when the maximum size of a tile is reached while it is still processing data. There are three options available:<br/><ul><li>`"return_null"`: The process will return a NULL buffer. This might appear as empty in the map.</li><li>`"throw_error"`: The process will throw an error cancelling the aggregation, so no tiles or table will be generated.</li><li>`"drop_fraction_as_needed"`: For every zoom level, this process will drop a consistent fraction of features in every tile to make sure all generated tiles are below the maximum size set in `max_tile_size_kb.` This could lead to features disappearing at different zoom levels. Features will be dropped according to the `tile_feature_order` parameter, which becomes mandatory when using this strategy.</li></ul>|
|`max_tile_features`| Default: `0` (disabled). A `NUMBER` that sets the maximum number of features a tile might contain. This limit is applied before `max_tile_size_kb`, i.e., the tiler will first drop as many features as needed to keep this amount, and then continue with the size limits (if required). To configure in which order are features kept, use in conjunction with `tile_feature_order`.|
|`tile_feature_order`| Default: `""` (disabled). A `STRING` defining the order in which properties are added to a tile. This expects the SQL `ORDER BY` **keyword definition**, such as `"aggregated_total DESC"`, the `"ORDER BY"` part isn't necessary. Note that in aggregation tilesets you can only use columns defined as properties, but in simple feature tilesets you can use any source column no matter if it's included in the tile as property or not. **This is an expensive operation, so it's recommended to only use it when necessary.**|
|`drop_duplicates`| Default: `false`. A `BOOLEAN` to drop duplicate features in a tile. This will drop only exact matches (both the geometry and the properties are exactly equal). As this requires sorting the properties, which is expensive, it should only be used when necessary.|
|`metadata`| Default: {}. A JSON object to specify the associated metadata of the tileset. Use this to set the `name`, `description` and `legend` to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`properties`| Default: {}. A JSON object that defines the extra properties that will be included associated to each cell feature. Each property is defined by its name and type (Number, Boolean or String). Check out the examples included below.|

**Examples**

```sql
CALL bqcarto.tiler.CREATE_SIMPLE_TILESET(
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

### CREATE_POINT_AGGREGATION_TILESET

{{% bannerNote type="code" %}}
tiler.CREATE_POINT_AGGREGATION_TILESET(source_table, target_table, options)
{{%/ bannerNote %}}

**Description**

Generates a point aggregation tileset.

* `source_table`: `STRING` that can either be a quoted qualified table name (e.g. ``projectID.dataset.tablename``) or a full query contained by parentheses (e.g.<code>(Select * FROM \`projectID.dataset.tablename`)</code>).
* `target_table`: Where the resulting table will be stored. It must be a `STRING` of the form ``projectID.dataset.tablename``. The projectID can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRING` containing a valid JSON with the different options. Valid options are described the table below.

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A `STRING` that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `0`. A `NUMBER` that defines the minimum zoom level for tiles. Any zoom level over this level won't be generated.|
|`zoom_min_column`| Default: `NULL`. It is the column that each row could have to modify its starting zoom. It can be NULL (then zoom_miin will be used). It must be a positive number between `zoom_min` and `zoom_max`.|
|`zoom_max_column`| Default: `NULL`. It is the column that each row could have to modify its end zoom level. It can be NULL (then zoom_max will be used). It must be a positive number between `zoom_min` and `zoom_max`.|
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
|`metadata`| Default: {}. A JSON object to specify the associated metadata of the tileset. Use this to set the `name`, `description` and `legend` to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0).|
|`properties`| Default: {}. A JSON object that defines the extra properties that will be included associated to each cell feature. In Point Aggregation Tilesets we have two kinds of `properties`: the main ones, `"properties"`, which are the result of an aggregate function, and `"single_point_properties"`, which are properties that are only applied when there is a single point in the cell, therefore, they are columns from the source data points themselves, not an aggregation.<br/><br/>Each main `property` is defined by its name, type (Number, Boolean or String) and formula (any formula that uses an [aggregate function]((https://cloud.google.com/bigquery/docs/reference/standard-sql/functions-and-operators#aggregate_functions)) supported by BigQuery and returns the expected type) to generate the properties from all the values of the points that fall under the cell. Only name and type are necessary for `"single_point_properties"`. Check out the examples included below. |

**Examples**

```sql
CALL bqcarto.tiler.CREATE_POINT_AGGREGATION_TILESET(
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
      "aggregation_type": "quadkey",
      "aggregation_resolution": 7,
      "aggregation_placement": "cell-centroid",
      "properties":{
        "aggregated_total": {
          "formula":"count(*)",
          "type":"Number"
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
            "formula":"count(*)",
            "type":"Number"
        },
        "most_common_ethnicity": {
            "formula":"APPROX_TOP_COUNT(ethnicity, 1)[OFFSET(0)].value",
            "type":"String"
        },
        "has_other_ethnicities": {
            "formula":"countif(ethnicity = 'other_race') > 0",
            "type":"Boolean"
        } 
    },
    "single_point_properties": {
        "name":"String",
        "address":"String"
    }
}
'''
```

In the example above, for all features we would get a property `"new_column_name"` with the number of points that fall in it, the `"most_common_ethnicity"` of those rows and whether there are points whose ethnicity value matches one specific value (`"has_other_ethnicities"`). In addition to this, when there is only one point that belongs to this property (and only in that case) we will also get the column values from the source data: `"name"` and `"address"`.
