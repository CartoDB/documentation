## tiler

<div class="badges"><div class="advanced"></div></div>

We currently provide support to create H3 tilesets:

Visit the [Overview](/analytics-toolbox-bigquery/overview/tilesets) section to learn more about tilesets.


### create_spatial_index_tileset

**Description**

Creates a tileset that uses H3 spatial index, aggregating data from an input table.

Aggregated data is computed for all levels between `resolution_min` and `resolution_max`. For each resolution level, all tiles for the area covered by the source table are added, with data aggregated at level `resolution + aggregation resolution`.

* `source_table`: `STRING` that can either be a quoted qualified table name (e.g. <code>\`project-id.dataset-id.table-name\`</code>) or a full query (e.g.<code>SELECT * FROM \`project-id.dataset-id.table-name\`</code>).
* `target_table`: Where the resulting table will be stored. It must be a `STRING` of the form <code>\`catalog.schema.table-name\`</code>. The `catalog` and `schema` can be omitted (in which case the default ones will be used). The caller needs to have permissions over the schema to create a new table on it. The process will fail if the target table already exists.
* `options`: `STRING` containing a valid JSON with the different options. Valid options are described the table below.
| Option | Description |
| :----- | :------ |
|`resolution_min`| Default: `2`. A `NUMBER` that defines the minimum resolution level for tiles. Any resolution level under this level won't be generated.|
|`resolution_max`| Default: `15`. A `NUMBER` that defines the maximum resolution level for tiles. Any resolution level over this level won't be generated.|
|`spatial_index_column`| Default: `h3:h3`. A `STRING` in the format `spatial_index_type:column_name`, with `spatial_index_type` being the type of spatial index used in the input table (for now only `h3` is supported), and `column_name` being the name of the column in that input table that contains the tile ids. The type of spatial index also defines the type used in the output table, which will be or H3 (for spatial index type `h3`).|
|`resolution`| A `NUMBER` defining the resolution of the tiles in the input table. If only the `spatial_index_type` is defined, the column_name will be equal to spatial_index_type, `h3`|
|`aggregation_resolution`| Default: `4`. A `NUMBER` defining the resolution to use when aggregating data at each resolution level. For a given `resolution`, data is aggregated at `resolution_level + aggregation resolution`.|
|`properties`| Default: No properties. A JSON `STRING` containing the aggregated properties to add to each tile in the output table. It cannot be empty, since at least one property is needed for aggregating the original values. The format of the json is `{"property_name": {"formula": "aggregation_formula", "type": "String|Number"}}`. The only accepted types are String and Number and the formula has to be an aggregation formula to do the aggregation based on aggregation resolution.|
|`metadata`| Default: `{}`. A JSON object to specify the associated metadata of the tileset. Use this to set the name, description and legend to be included in the [TileJSON](https://github.com/mapbox/tilejson-spec/tree/master/2.2.0). Other fields will be included in the object extra_metadata.|

**Examples**

You can execute the H3 Tiler in a databricks notebook (see full example below). The only mandatory args in options argument is the input resolution.

```scala
import com.carto.analyticstoolbox.modules.tiler.create_spatial_index_tileset


// input values
val source = "carto_dev_data.input_h3_table_res8"
val target = "carto_dev_data.h3_tileset"
val options = """{
  "min_resolution": 0,
  "max_resolution": 4,
  "resolution": 8,
  "aggregation_resolution": 4,
  "spatial_index_column": "h3",
  "properties": {
    "population": {
        "formula":"sum(population)",
        "type":"Number"
    },
    "majority_sex": {
        "formula":"if(sum(male) > sum(female), 'male', 'female')",
        "type":"String"
    }
  },
  "metadata": {
    "name":"name_a",
    "description": "description_a",
    "legend": "the_legend",
    "extra01": "extra_field"
  }
}"""

// Execute tiler
create_spatial_index_tileset(source, target, options)
```
