## data

<div class="badges"><div class="advanced"></div></div>

This module contains functions and procedures that make use of data (either Data Observatory or user-provided data) for their computations.


### DATAOBS_ENRICH_GRID

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_GRID(grid_type, input_query, input_index_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a set of grid cells of one of the supported types (quadbin) with data from the  Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment. The cells are identified by their indices.

As a result of this process, each input grid cell will be enriched with the data of the Data Observatory datasets that spatially intersect it. When the input cell intersects with more than one polygon, point, or line of the Data Observatory datasets, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:

* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the Data Observatory feature intersected is weighted by the fraction of area or length intersected. If the Data Observatory features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the Data Observatory features are points, a simple average is computed.
* `COUNT` It computes the number of Data Observatory features that contain the enrichment variable and are intersected by the input geography.

**Input parameters**

* `grid_type`: Type of grid: "quadbin".
* `input_query`: `VARCHAR` query to be enriched; this query must produce valid grid indices for the selected grid type in a column of the proper type (INT for quadbin). It can include additional columns with data associated with the grid cells that will be preserved. A qualified table name can be given as well, e.g. `'database.schema.table-name'` or `'schema.table-name'`.
* `input_index_column`: `VARCHAR` name of a column in the query that contains the grid indices.
* `variables`: `VARCHAR` JSON array of pairs with variables of the Data Observatory that will be used to enrich the input polygons. For each variable, its slug and the aggregation method to be used must be provided. Use `'default'` to use the variable’s default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`, and `COUNT`. e.g. `[["var1","sum"],["var2","count"]`.
* `filters`: `VARCHAR` filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding slug, passed in the dataset field of the structure. The second field of the structure, expression, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column names (not slugs) should be applied here.
* `output_table`: `VARCHAR` containing the name of an output table to store the results e.g. `'database.table-name'`. The resulting table cannot exist before running the procedure.
* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `'database.schema'` or `'schema'` format.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

**Examples**

```sql
CALL carto.DATAOBS_ENRICH_GRID(
  'quadbin',
  'my-database.my-schema.my-table',
  'index',
   '[["population_93405ad7", "avg"]]',
   '[["ags_sociodemogr_8a89f775", "population > 0"]]',
   'my-database.my-schema.my-table'
   'my-database.my-dataobs-schema'
)
-- The table `my-database.my-schema.my-table` will be augmented
-- with columns: population_93405ad7_avg, ags_sociodemogr_8a89f775. 
-- The enrichment query also will filter those rows in the Data Observatory
-- dataset with slug ags_sociodemogr_8a89f775 with a population
-- (name of the actual column) larger than 0
```


### ENRICH_POINTS

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POINTS(input_query, input_geography_column, variables, filters, variables, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from the Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment.

As a result of this process, each input point will be enriched with the data of the Data Observatory datasets that spatially intersect it. When the input point intersects with more than one polygon, point or line of the Data Observatory datasets, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are: `SUM`, `MIN`, `MAX`, `AVG`, and `COUNT`.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well, e.g. `'database.schema.table-name'` or `'schema.table-name'`.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `variables`: `VARCHAR` JSON array of pairs with variables of the Data Observatory that will be used to enrich the input polygons. For each variable, its slug and the aggregation method to be used must be provided. Use `'default'` to use the variable’s default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`, and `COUNT`. e.g. `[["var1","sum"],["var2","count"]]`.
* `filters`: `VARCHAR` filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding slug, passed in the dataset field of the structure. The second field of the structure, expression, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column names (not slugs) should be applied here.
* `output`: `VARCHAR` containing the name of an output table to store the results e.g. `'database.table-name'`. The resulting table cannot exist before running the procedure.
* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `'database.schema'` or `'schema'` format.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding slug and including a suffix indicating the aggregation method used.

**Examples**

```sql
CALL cartp.carto.DATAOBS_ENRICH_POINTS(
   'SELECT id, geom FROM my-schema.my-input',
   'geom',
   '[["population_93405ad7", "sum"]]',
   NULL,
   'my-database.my-schema.my-enriched-table'
   'my-database.my-dataobs-schema'
);
-- The table 'my-database.my-schema.my-enriched-tabl' will be created
-- with columns: id, geom, population_93405ad7_sum
```

```sql
CALL carto.carto.DATAOBS_ENRICH_POINTS(
   'my-schema.my-input',
   'geom',
   '[["population_93405ad7", "avg"]]',
   NULL,
   'my-database.my-schema.my-enriched-table'
   'my-database.my-dataobs-schema'
);
-- The table 'my-database.my-schema.my-enriched-table' will be created
-- with columns the same columns than 'my-schema.my-input'
-- plus population_93405ad7_avg
```

```sql
CALL carto.carto.DATAOBS_ENRICH_POINTS(
   'my-schema.my-input',
   'geom',
   '[["population_93405ad7", "avg"]]',
   '[["ags_sociodemogr_8a89f775", "population > 0"]]',
   'my-database.my-schema.my-enriched-table'
   'my-database.my-dataobs-schema'
);
-- The table 'my-database.my-schema.my-enriched-table' will be created
-- with columns the same columns than 'my-schema.my-input'
-- plus population_93405ad7_avg. The enrichment query also will filter those
-- rows in the Data Observatory dataset with slug ags_sociodemogr_8a89f775 with
-- a population (name of the actual column) larger than 0
```


### ENRICH_POINTS

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POLYGONS(input_query, input_geography_column, variables, filters, variables, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from the Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment.

As a result of this process, each input polygon will be enriched with the data of the Data Observatory datasets that spatially intersect it. When the input polygon intersects with more than one polygon, point, or line of the Data Observatory datasets, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:

* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the enrichment feature intersected is weighted by the fraction of area or length intersected. If the enrichment features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the enrichment features are points, a simple average is computed.
* `COUNT` It computes the number of enrichment features that contain the enrichment variable and are intersected by the input geography.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well, e.g. `'database.schema.table-name'` or `'schema.table-name'`.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `variables`: `VARCHAR` JSON array of pairs with variables of the Data Observatory that will be used to enrich the input polygons. For each variable, its slug and the aggregation method to be used must be provided. Use `'default'` to use the variable’s default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`, and `COUNT`. e.g. `[["var1","sum"],["var2","count"]`.
* `filters`: `VARCHAR` filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding slug, passed in the dataset field of the structure. The second field of the structure, expression, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column names (not slugs) should be applied here.
* `output`: `VARCHAR` containing the name of an output table to store the results e.g. `'database.table-name'`. The resulting table cannot exist before running the procedure.
* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `'database.schema'` or `'schema'` format.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding slug and including a suffix indicating the aggregation method used.

**Examples**

```sql
CALL cartp.carto.DATAOBS_ENRICH_POLYGONS(
   'SELECT id, geom FROM my-schema.my-input',
   'geom',
   '[["population_93405ad7", "sum"]]',
   NULL,
   'my-database.my-schema.my-enriched-table'
   'my-database.my-dataobs-schema'
);
-- The table 'my-database.my-schema.my-enriched-tabl' will be created
-- with columns: id, geom, population_93405ad7_sum
```

```sql
CALL carto.carto.DATAOBS_ENRICH_POLYGONS(
   'my-schema.my-input',
   'geom',
   '[["population_93405ad7", "avg"]]',
   NULL,
   'my-database.my-schema.my-enriched-table'
   'my-database.my-dataobs-schema'
);
-- The table 'my-database.my-schema.my-enriched-table' will be created
-- with columns the same columns than 'my-schema.my-input'
-- plus population_93405ad7_avg
```

```sql
CALL carto.carto.DATAOBS_ENRICH_POLYGONS(
   'my-schema.my-input',
   'geom',
   '[["population_93405ad7", "avg"]]',
   '[["ags_sociodemogr_8a89f775", "population > 0"]]',
   'my-database.my-schema.my-enriched-table'
   'my-database.my-dataobs-schema'
);
-- The table 'my-database.my-schema.my-enriched-table' will be created
-- with columns the same columns than 'my-schema.my-input'
-- plus population_93405ad7_avg. The enrichment query also will filter those
-- rows in the Data Observatory dataset with slug ags_sociodemogr_8a89f775 with
-- a population (name of the actual column) larger than 0
```


### ENRICH_GRID

{{% bannerNote type="code" %}}
carto.ENRICH_GRID(grid_type, input_query, input_index_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a set of grid cells of one of the supported types (quadbin) with data from another enrichment query. The cells are identified by their indices.

As a result of this process, each input grid cell will be enriched with the data of the enrichment query that spatially intersects it. When the input cell intersects with more than one feature of the enrichment query, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:

* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the enrichment feature intersected is weighted by the fraction of area or length intersected. If the enrichment features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the enrichment features are points, a simple average is computed.
* `COUNT` It computes the number of enrichment features that contain the enrichment variable and are intersected by the input geography.

**Input parameters**

* `grid_type`: Type of grid: "quadbin".
* `input_query`: `VARCHAR` query to be enriched; this query must produce valid grid indices for the selected grid type in a column of the proper type (INT for quadbin). It can include additional columns with data associated with the grid cells that will be preserved. A qualified table name can be given as well, e.g. `'database.schema.table-name'` or `'schema.table-name'`.
* `input_index_column`: `VARCHAR` name of a column in the query that contains the grid indices.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `VARCHAR` a JSON array of pairs. The column that will be used to enrich the input points and their corresponding aggregation method. e.g. `[["var1","sum"],["var2","count"]]`.
* `output`: `VARCHAR` containing the name of an output table to store the results e.g. `'schema.table-name'`. The resulting table cannot exist before running the procedure.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

**Examples**

```sql
CALL carto.ENRICH_GRID(
   'quadbin',
   'SELECT 5256779493799886847 AS index
   UNION ALL SELECT 5256779493812469759
   UNION ALL SELECT 5256779493816664063
   UNION ALL SELECT 5256779493808275455
   UNION ALL SELECT 5256779493820858367
   UNION ALL SELECT 5256779493825052671
   UNION ALL SELECT 5256779493900550143
   UNION ALL SELECT 5256779493913133055
   UNION ALL SELECT 5256779493917327359',
   'index',
   'SELECT geom, var1, var2 FROM my-database.my-schema.my-data',
   'geom',
   '[["var1", "sum"],["var2", "sum"],["var2", "max"]]',
   'my-database.my-schema.my-enriched-table'
);
-- The table `my-database.my-schema.myenrichedtable` will be created
-- with columns: index, var1_sum, var2_sum, var2_max
```

```sql
CALL carto.ENRICH_GRID(
   'quadbin',
   'my-database.my-schema.my-table',
   'index',
   'SELECT geom, var1, var2 FROM my-database.my-schema.my-data',
   'geom',
   '[["var1", "sum"],["var2", "sum"],["var2", "max"]]',
   'my-database.my-schema.my-table'
);
-- The table `my-database.my-schema.my-table` will be augmented
-- with columns: var1_sum, var2_sum, var2_max
```


### ENRICH_POINTS

{{% bannerNote type="code" %}}
carto.ENRICH_POINTS(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both and aggregating the result.

As a result of this process, each input point will be enriched with the data from the enrichment query that spatially intersects it. When an input point intersects with more than one enrichment polygon, point, or line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are: `SUM`, `MIN`, `MAX`, `AVG`, and `COUNT`.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well, e.g. `'database.schema.table-name'` or `'schema.table-name'`.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `VARCHAR` a JSON array of pairs. The column that will be used to enrich the input points and their corresponding aggregation method. e.g. `[["var1","sum"],["var2","count"]]`.
* `output`: `VARCHAR` containing the name of an output table to store the results e.g. `'schema.table-name'`. The resulting table cannot exist before running the procedure.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

**Examples**

```sql
CALL carto.ENRICH_POINTS(
   'SELECT id, geom FROM my-schema.my-input',
   'geom',
   'SELECT geom, var1, var2 FROM my-database.my-schema.my-data',
   'geom',
   '{"variables": [["var1", "sum"],["var2", "count"]]}',
   'my-database.my-schema.my-enriched-table'
);
-- The table 'my-database.my-schema.my-enriched-table' will be created
-- with columns: id, geom, var1_sum, var2_count
```

```sql
CALL carto.ENRICH_POINTS(
   'my-schema.my-input',
   'geom',
   'SELECT geom, var1, var2 FROM my-database.my-schema.my-data',
   'geom',
   '{"variables": [["var1", "sum"],["var2", "count"]]}',
   'my-database.my-schema.my-enriched-table'
);
-- The table 'my-database.my-schema.my-enriched-table' will be created
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

**Input parameters**

* `input_query`: `STRING` query to be enriched. A qualified table name can be given as well, e.g. `'schema.database.table-name'` or `'database.table-name'`.
* `input_geography_column`: `STRING` name of the GEOMETRY/GEOGRAPHY column in the query containing the points to be enriched. The input cannot be a GeometryCollection.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `STRING` name of the GEOMETRY/GEOGRAPHY column provided in the `data_query`.
* `variables`: `STRING` a JSON with a property `variables` containing an array of pairs. The column that will be used to enrich the input points and their corresponding aggregation method. e.g. `{"variables":[["var1","sum"],["var2","count"]]}`..
* `output`: `STRING` containing the name of an output table to store the results e.g. `'database.table-name'`. The resulting table cannot exist before running the procedure.

The input and data geography columns need to be in the same spatial reference system. If they
are not, you will need to convert them.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

**Examples**

```sql
CALL carto.ENRICH_POLYGONS(
   'SELECT id, geom FROM my-schema.my-input',
   'geom',
   'SELECT geom, var1, var2 FROM my-database.my-schema.my-data',
   'geom',
   '{"variables": [["var1", "sum"],["var2", "count"]]}',
   'my-database.my-schema.my-enriched-table']
);
-- The table 'my-database.my-schema.my-enriched-table' will be created
-- with columns: id, geom, var1_sum, var2_count
```

```sql
CALL carto.ENRICH_POLYGONS(
   'my-schema.my-input',
   'geom',
   'SELECT geom, var1, var2 FROM my-database.my-schema.my-data',
   'geom',
   '{"variables": [["var1", "sum"],["var2", "count"]]}',
   'my-database.my-schema.my-enriched-table']
);
-- The table 'my-database.my-schema.my-enriched-table' will be created
-- with columns: id, geom, var1_sum, var2_count
```
