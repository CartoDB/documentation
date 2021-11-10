## data

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions and procedures that make use of data (either Data Observatory or user-provided data) for their computations.


### ENRICH_GRID

{{% bannerNote type="code" %}}
data.ENRICH_GRID(grid_type, input_query, input_index_column, data_query data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a set of grid cells of one of the supported types (h3, quadkey, s2) with data from another enrichment query. The cells are identified by their indices.

As a result of this process, each input grid cell will be enriched with the data of the enrichment query that spatially intersects it. When the input cell intersects with more than one feature of the enrichment query, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:
* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the enrichment feature intersected is weighted by the fraction of area or length intersected. If the enrichment features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the enrichment features are points, a simple average is computed.
* `COUNT` It computes the number of enrichment features that contain the enrichment variable and are intersected by the input geography.

For other types of aggregation, the [`ENRICH_GRID_RAW`](#enrich_grid_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

**Input parameters**

* `grid_type`: Type of grid: "h3", "quadkey" or "s2".
* `input_query`: `VARCHAR` query to be enriched; this query must produce valid grid indices for the selected grid type in a column of the proper type (VARCHAR for h3 or geohash, and INT for quadkey or s2). It can include additional columns with data associated with the grid cells that will be preserved.
* `input_index_column`: `VARCHAR` name of a column in the query that contains the grid indices.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`, `COUNT`). Each element in this array should be an `OBJECT` with fields `column` and `aggregation`.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. This parameter cannot be NULL or empty.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL sfcarto.data.ENRICH_GRID(
   'h3',
   $$
   SELECT value AS index FROM TABLE(FLATTEN(ARRAY_CONSTRUCT(
     '8718496d8ffffff','873974865ffffff','87397486cffffff','8718496daffffff','873974861ffffff','8718496dbffffff','87397494bffffff','8718496ddffffff','873974864ffffff'
    )))
   $$,
   'index',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('column', 'VAR1', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'max')
   ),
   TO_ARRAY('MYENRICHEDTABLE')
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: INDEX, VAR1_SUM, VAR2_SUM, VAR2_MAX
```


### ENRICH_GRID_RAW

{{% bannerNote type="code" %}}
data.ENRICH_GRID_RAW(grid_type, input_query, input_index_column, data_query data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a set of grid cells of one of the supported types (h3, quadkey, s2) with data from another enrichment query. The cells are identified by their indices.

**Input parameters**

* `grid_type`: Type of grid: "h3", "quadkey" or "s2".
* `input_query`: `VARCHAR` query to be enriched; this query must produce valid grid indices for the selected grid type in a column of the proper type (VARCHAR for h3 or geohash, and INT for quadkey or s2). It can include additional columns with data associated with the grid cells that will be preserved.
* `input_index_column`: `VARCHAR` name of a column in the query that contains the grid indices.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` of `VARCHAR` elements with names of the columns in the enrichment query that will be added to the enriched results.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. This parameter cannot be NULL or empty.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column named `__CARTO_ENRICHMENT`. The array contains OBJECTs with one field for each variable. Additional fields will be included with information about the intersection of the geographies:
* `__carto_dimension` dimension of the enrichment geography: 2 for areas (polygons), 1 for lines and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the enrichment feature.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL sfcarto.data.ENRICH_GRID_RAW(
   'h3',
   $$
   SELECT value AS index  FROM TABLE(FLATTEN(ARRAY_CONSTRUCT(
     '8718496d8ffffff','873974865ffffff','87397486cffffff','8718496daffffff','873974861ffffff','8718496dbffffff','87397494bffffff','8718496ddffffff','873974864ffffff'
    )))
   $$,
   'index',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT('VAR1', 'VAR2'),
   TO_ARRAY('MYENRICHEDTABLE')
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: INDEX, __CARTO_ENRICHMENT. The latter will contain OBJECTSs with the fields VAR1, VAR2, __carto_intersection, __carto_total and __carto_dimension.
```


### ENRICH_POINTS

{{% bannerNote type="code" %}}
data.ENRICH_POINTS(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both and aggregating the result.

As a result of this process, each input point will be enriched with the data from the enrichment query that spatially intersects it. When the input point intersects with more than one enrichment polygon, point or line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are: `SUM`, `MIN`, `MAX`, `AVG`, and `COUNT`.

For special types of aggregation, the [`ENRICH_POINTS_RAW`](#enrich_points_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`, `COUNT`). Each element in this array should be an `OBJECT` with fields `column` and `aggregation`.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. This parameter cannot be NULL or empty.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL sfcarto.data.ENRICH_POINTS(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('column', 'VAR1', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'max')
   ),
   TO_ARRAY('MYENRICHEDTABLE')
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, VAR1_SUM, VAR2_SUM, VAR2_MAX
```


### ENRICH_POINTS_RAW

{{% bannerNote type="code" %}}
data.ENRICH_POINTS_RAW(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both.

As a result of this process, each input polygon will be enriched with the data from the enrichment query that spatially intersects it. The variable values corresponding to all intersecting enrichment features for a given input point will be returned in an ARRAY column named `_CARTO_ENRICHMENT_`. Each array value in this column contains OBJECTSs with one field for each variable and additional measure fields `total` and `dimension`. See the output information for details.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` of `VARCHAR` elements with names of the columns in the enrichment query that will be added to the enriched results.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. This parameter cannot be NULL or empty.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column named `__CARTO_ENRICHMENT`. The array contains OBJECTs with one field for each variable. Additional fields will be included with information about the intersection of the geographies:
* `__carto_dimension` dimension of the enrichment geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the enrichment feature.

**Example**
{{%/ customSelector %}}

```sql
CALL sfcarto.data.ENRICH_POINTS_RAW(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT('VAR1', 'VAR2'),
   TO_ARRAY('MYENRICHEDTABLE')
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, __CARTO_ENRICHMENT. The latter will contain OBJECTSs with the fields VAR1, VAR2, __carto_total and __carto_dimension.
```


### ENRICH_POLYGONS

{{% bannerNote type="code" %}}
data.ENRICH_POLYGONS(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from another query, spatially matching both and aggregating the result.

As a result of this process, each input polygon will be enriched with the data from the enrichment query that spatially intersects it. When the input polygon intersects with more than one enrichment polygon, point or line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:
* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the enrichment feature intersected is weighted by the fraction of area or length intersected. If the enrichment features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the enrichment features are points, a simple average is computed.
* `COUNT` It computes the number of enrichment features that contain the enrichment variable and are intersected by the input geography.

For other types of aggregation, the [`ENRICH_POLYGONS_RAW`](#enrich_polygons_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`, `COUNT`). Each element in this array should be an `OBJECT` with fields `column` and `aggregation`.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. This parameter cannot be NULL or empty.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL sfcarto.data.ENRICH_POLYGONS(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('column', 'VAR1', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'max')
   ),
   TO_ARRAY('MYENRICHEDTABLE')
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, VAR1_SUM, VAR2_SUM, VAR2_MAX
```


### ENRICH_POLYGONS_RAW

{{% bannerNote type="code" %}}
data.ENRICH_POLYGONS_RAW(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from another query, spatially matching both.

As a result of this process, each input polygon will be enriched with the data of the enrichment query that spatially intersects it. The variable values corresponding to all intersecting enrichment features for a given input polygon will be returned in an ARRAY column named `_CARTO_ENRICHMENT_`. Each array value in this column contains OBJECTSs with one field for each variable and additional measure fields `intersection`, `total` and `dimension`. See the output information for details.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` of `VARCHAR` elements with names of the columns in the enrichment query that will be added to the enriched results.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. This parameter cannot be NULL or empty.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column named `__CARTO_ENRICHMENT`. The array contains OBJECTs with one field for each variable. Additional fields will be included with information about the intersection of the geographies:
* `__carto_dimension` dimension of the enrichment geography: 2 for areas (polygons), 1 for lines and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the enrichment feature.

Moreover, another field named `__carto_input_area` will be included in `__CARTO_ENRICHMENT`, containing the area of the input polygon in square meters.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL sfcarto.data.ENRICH_POLYGONS_RAW(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT('VAR1', 'VAR2'),
   TO_ARRAY('MYENRICHEDTABLE')
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, __CARTO_ENRICHMENT. The latter will contain OBJECTSs with the fields VAR1, VAR2, __carto_intersection, __carto_total, dimension and __carto_input_area.
```


### VERSION

{{% bannerNote type="code" %}}
data.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the data module.

**Return type**

`STRING`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT sfcarto.data.VERSION();
-- 1.0.0
```