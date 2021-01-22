## Reference


### Tiler

We currently provide two procedures to tilify a dataset: _CreateSimpleTileset_ and _CreatePointAggregationTileset_, the former to visualize features individually and the latter to generate aggregated point visualizations.

#### tiler.CreatePointAggregationTileset

`tiler.CreatePointAggregationTileset (source_table, target_table, options)`

* `source_table`: `STRING` that can either be a quoted qualified table name (e.g. ``projectID.dataset.tablename``) or a full query contained by parentheses (e.g. `(Select * FROM `projectID.dataset.tablename`)`).
* `target_table`: Where the resulting table will be stored. It must be a `STRING` of the form ``projectID.dataset.tablename``. The projectID can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRING` containing a valid JSON with the different options.

Valid options are:

| Option | Description |
| :----- | :------ |
|`geom_column`| Default: `"geom"`. A STRING that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`. |
|`zoom_min`| Default: `0`. A NUMBER that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.|
|`zoom_max`| Default: `0`. A NUMBER that defines the minimum zoom level for tiles. Any zoom level over this level won't be generated.|
|`zoom_step`| Default: `1`. A NUMBER that defines the zoom level step. Only the zoom levels that match zoom_min + zoom_step * N, with N being a positive integer will be generated. For example, with `{ zoom_min: 10, zoom_max: 15, zoom_step : 2 }` only the tiles in zoom levels [10, 12, 14] will be generated.|
|`target_partitions`| Default: `4000`. Max: `4000`. A NUMBER that defines the **maximum** amount of partitions to be used in the target table. The partition system, which uses a column named `carto_partition`, divides the available partitions first by zoom level and spatial locality to minimize the cost of tile read requests in web maps. Beware that this does not necessarily mean that all the partitions will be used, as a sparse dataset will leave some of these partitions unused. If you are using [BigQuery BI Engine](https://cloud.google.com/bi-engine/docs/overview) consider that it supports a maximum of 500 partitions per table.|
|`target_tilestats`| Default: `true`. A BOOLEAN to determine whether to include statistics of the properties in the metadata. These statistics are based on [mapbox-tilestats](https://github.com/mapbox/mapbox-geostats) and depend on the property type:<br/><ul><li>Number: MIN, MAX, AVG, SUM and quantiles (from 3 to 20 breaks).</li>String / Boolean: List of the top 10 most common values and their count.<li>String / Boolean: List of the top 10 most common values and their count.</li></ul>Note that for aggregation tilesets, these statistics refer to the cells at the maximum zoom generated. In simple tilesets, they are based on the source data.|





* `geom_column`: Default: `"geom"`. A STRING that marks the name of the geography column that will be used. It must be of type `GEOGRAPHY`.
* `zoom_min`: Default: `0`. A NUMBER that defines the minimum zoom level for tiles. Any zoom level under this level won't be generated.
* `zoom_max`: Default: `0`. A NUMBER that defines the minimum zoom level for tiles. Any zoom level over this level won't be generated.
* `zoom_step`: Default: `1`. A NUMBER that defines the zoom level step. Only the zoom levels that match zoom_min + zoom_step * N, with N being a positive integer will be generated. For example, with `{ zoom_min: 10, zoom_max: 15, zoom_step : 2 }` only the tiles in zoom levels [10, 12, 14] will be generated.
* `target_partitions`: Default: `4000`. Max: `4000`. A NUMBER that defines the **maximum** amount of partitions to be used in the target table. The partition system, which uses a column named `carto_partition`, divides the available partitions first by zoom level and spatial locality to minimize the cost of tile read requests in web maps. Beware that this does not necessarily mean that all the partitions will be used, as a sparse dataset will leave some of these partitions unused. If you are using [BigQuery BI Engine](https://cloud.google.com/bi-engine/docs/overview) consider that it supports a maximum of 500 partitions per table.
* `target_tilestats`: Default: `true`. A BOOLEAN to determine whether to include statistics of the properties in the metadata. These statistics are based on [mapbox-tilestats](https://github.com/mapbox/mapbox-geostats) and depend on the property type:
    * Number: MIN, MAX, AVG, SUM and quantiles (from 3 to 20 breaks).
    * String / Boolean: List of the top 10 most common values and their count.<br/><br/> Note that for aggregation tilesets, these statistics refer to the cells at the maximum zoom generated. In simple tilesets, they are based on the source data.
* `tile_extent`: Default: 4096. A `NUMBER` defining the extent of the tile in integer coordinates as defined by the MVT spec.
* `tile_buffer`: Default: 16 (0 in aggregation). A `NUMBER` defining the additional buffer added around the tiles in extent units, which is useful to facilitate geometry stitching across tiles in the renderers. In aggregation tilesets, this property is currently not available and always 0 as no geometries go across tile boundaries.
* `max_tile_size_kb`: Default: 1024. A `NUMBER` defining setting the approximate max size for a tile.
* `max_tile_size_strategy`: Default: "throw_error". A `STRING` that determines what to do when the maximum size of a tile is reached while it is still processing data. There are 3 options available:
    * "return_null": The process will return a NULL buffer. This might appear as empty in the map.
    * "throw_error": The process will throw an error cancelling the aggregation, so no tiles or table will be generated.
    * "drop_features": The process will stop processing more data and return what it has already processed, ignoring the rest. This could lead to holes in the map.
* `max_tile_features`: Default: 0 (disabled). A `NUMBER` defining setting the max number of features a tile might contain. This limit is applied before `max_tile_size_kb`, i.e., the tiler will first drop as many features as needed to keep this amount, and then continue with the size limits (if required). To configure in which order are features kept, use in conjunction with `tile_feature_order`.
* `tile_feature_order`: Default: "" (disabled). A `STRING` defining the order in which properties are added to a tile. This expects the SQL ORDER BY keyword definition, such as "aggregated_total DESC", the "ORDER BY" part isn't necessary. Note that in aggregation tilesets you can only use columns defined as properties, but in simple feature tilesets you can use any source column no matter if it's included in the tile as property or not.

{{% bannerNote %}}
This is an expensive operation, so it's recommended to only use it when necessary.
{{%/ bannerNote %}}


* `drop_duplicates`: Default: false. A `BOOLEAN` to drop duplicate features in a tile. This will drop only exact matches (both the geometry and the properties are exactly equal). As this requires sorting the properties, which is expensive, it should only be used when necessary.

* `properties`. Default: {}. A JSON object that defines the extra properties that will be included associated to each cell feature. Each property is defined by its name and type (Number, Boolean or String). In aggregation tilesets you also need to define which formula to use to generate the properties from all the values of the points that fall under the cell.


{{% bannerNote title="tip" %}}
To avoid issues in the process when building the queries that will be executed internally against BigQuery, it is highly recommended to use [raw strings](https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#string_and_bytes_literals) when passing long queries in the `source_table` that might contain special characters.
{{%/ bannerNote %}}

For example:
```sql
R'''
(
    SELECT
        ST_CENTROID(geometry) as geom
    FROM `bigquery-public-data.geo_openstreetmap.planet_features`
    WHERE
        'building' IN (SELECT key FROM UNNEST(all_tags)) AND
        geometry IS NOT NULL
)
'''
```





