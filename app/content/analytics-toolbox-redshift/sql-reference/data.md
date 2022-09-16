## data

<div class="badges"><div class="advanced"></div></div>

This module contains functions and procedures that make use of data (either Data Observatory or user-provided data) for their computations.


### ENRICH_POINTS

{{% bannerNote type="code" %}}
carto.ENRICH_POINTS(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both and aggregating the result.

As a result of this process, each input point will be enriched with the data from the enrichment query that spatially intersects it. When the input point intersects with more than one enrichment polygon, point, or line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are: `SUM`, `MIN`, `MAX`, `AVG`, and `COUNT`.

<--!
For special types of aggregation, the [`ENRICH_POINTS_RAW`](#enrich_points_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.
-->

**Input parameters**

* `input_query`: `STRING` query to be enriched. A qualified table name can be given as well, e.g. `'schema.database.table-name'` or `'database.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `STRING` a JSON with a property `variables` containing an array of pairs. The column that will be used to enrich the input points and their corresponding aggregation method. e.g. `{"variables":[["var1","sum"],["var2","count"]]}`
* `output`: `STRING` containing the name of an output table to store the results e.g. `'database.table-name'`. The resulting table cannot exist before running the procedure.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL carto.ENRICH_POINTS(
   'SELECT id, geom FROM my-database.my-input',
   'geom',
   'SELECT geom, var1, var2 FROM my-schema.my-database.my-data',
   'geom',
   '{"variables": [["var1", "sum"],["var2", "count"]]}',
   'my-schema.my-database.my-enriched-table']
);
-- The table 'my-schema.my-database.my-enriched-table' will be created
-- with columns: id, geom, var1_sum, var2_count
```

```sql
CALL carto.ENRICH_POINTS(
   'my-database.my-input',
   'geom',
   'SELECT geom, var1, var2 FROM my-schema.my-database.my-data',
   'geom',
   '{"variables": [["var1", "sum"],["var2", "count"]]}',
   'my-schema.my-database.my-enriched-table']
);
-- The table 'my-schema.my-database.my-enriched-table' will be created
-- with columns: id, geom, var1_sum, var2_count
```


### ENRICH_POLYGONS

{{% bannerNote type="code" %}}
carto.ENRICH_POLYGONS(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from another query, spatially matching both and aggregating the result.

As a result of this process, each input polygons will be enriched with the data from the enrichment query that spatially intersects it. When the input polygons intersects with more than one enrichment polygon, point, or line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:

* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the enrichment feature intersected is weighted by the fraction of area or length intersected. If the enrichment features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the enrichment features are points, a simple average is computed.
* `COUNT` It computes the number of enrichment features that contain the enrichment variable and are intersected by the input geography.

<--!
For special types of aggregation, the [`ENRICH_POLYGONS_RAW`](#enrich_poLYGONS_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.
-->

**Input parameters**

* `input_query`: `STRING` query to be enriched. A qualified table name can be given as well, e.g. `'schema.database.table-name'` or `'database.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY/GEOGRAPHY column in the query containing the points to be enriched. The input cannot be a GeometryCollection.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY/GEOGRAPHY column provided in the `data_query`.
* `variables`: `STRING` a JSON with a property `variables` containing an array of pairs. The column that will be used to enrich the input points and their corresponding aggregation method. e.g. `{"variables":[["var1","sum"],["var2","count"]]}`
* `output`: `STRING` containing the name of an output table to store the results e.g. `'database.table-name'`. The resulting table cannot exist before running the procedure.

The input and data geography columns need to be in the same spatial reference system. If they
are not, you will need to convert them.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL carto.ENRICH_POLYGONS(
   'SELECT id, geom FROM my-database.my-input',
   'geom',
   'SELECT geom, var1, var2 FROM my-schema.my-database.my-data',
   'geom',
   '{"variables": [["var1", "sum"],["var2", "count"]]}',
   'my-schema.my-database.my-enriched-table']
);
-- The table 'my-schema.my-database.my-enriched-table' will be created
-- with columns: id, geom, var1_sum, var2_count
```

```sql
CALL carto.ENRICH_POLYGONS(
   'my-database.my-input',
   'geom',
   'SELECT geom, var1, var2 FROM my-schema.my-database.my-data',
   'geom',
   '{"variables": [["var1", "sum"],["var2", "count"]]}',
   'my-schema.my-database.my-enriched-table']
);
-- The table 'my-schema.my-database.my-enriched-table' will be created
-- with columns: id, geom, var1_sum, var2_count
```
