---
aliases:
    - /analytics-toolbox-sf/sql-reference/data/
---
## data

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions and procedures that make use of data (either Data Observatory or user-provided data) for their computations.


### DATAOBS_ENRICH_GRID

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_GRID(grid_type, input_query, input_index_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing grid cell indexes of one of the supported types (H3, Quadbin) with data from the Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment. The cells must all have the same resolution.

The Data Observatory Catalog tables (`SPATIAL_CATALOG_DATASETS` and `SPATIAL_CATALOG_VARIABLES`) must also be present in the same schema as the procedures.

If the enrich data is indexed by an H3 or Quadbin grid compatible with the input (same grid type and equal or greater resolution), then the enrichment will be performed much more efficiently by matching the index values rather than intersecting associated GEOGRAPHY elements.

As a result of this process, each input grid cell will be enriched with the data of the Data Observatory datasets that spatially intersect it. When the input cell intersects with more than one polygon, point, or line of the Data Observatory datasets, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:

* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the Data Observatory feature intersected is weighted by the fraction of area or length intersected. If the Data Observatory features are points or grid index matching is used, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the Data Observatory features are points or grid index matching is used, a simple average is computed.
* `COUNT` It computes the number of Data Observatory features that contain the enrichment variable and are intersected by the input geography.

For other types of aggregation, the [`DATAOBS_ENRICH_GRID_RAW`](#dataobs_enrich_grid_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

**Input parameters**

* `grid_type`: `VARCHAR` Type of grid: "h3" or "quadbin".
* `input_query`: `VARCHAR` query to be enriched; this query must produce
   valid grid indexes for the selected grid type in a column of the proper type (VARCHAR for H3, and INT for Quadbin). It can include additional columns with data associated with the grid cells that will be preserved. A qualified table name can be given as well.
* `input_index_column`: `VARCHAR` name of a column in the query that contains the grid indexes.
* `variables`: `ARRAY` of `OBJECT`s with fields `variable` and `aggregation`. Variables of the Data Observatory that will be used to enrich the input polygons. For each variable, its slug and the aggregation method must be provided. Use `'default'` to use the variable's default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`, and `COUNT`. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY` of `OBJECT`s with fields `dataset` and `expression`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than the input, the input table will be enriched in place.
* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `DATABASE.SCHEMA` format. If only the `SCHEMA` is included, it uses the database where the Analytics Toolbox is installed by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding slug and including a suffix indicating the aggregation method used.

If a new output table is created, it will be clustered by the spatial index to optimize its performance when filtering data by it or using it to join to other grid tables. This is important to visualize the results in a map efficiently. If an SQL clause is included in the `output` parameter this optimization will not be performed.

**Examples**

```sql
CALL carto.DATAOBS_ENRICH_GRID(
  'h3',
  'mydb.myschema.mytable',
  'INDEX',
  ARRAY_CONSTRUCT(
    OBJECT_CONSTRUCT('variable', 'population_14d9cf55', 'aggregation', 'SUM')
  ),
  NULL,
  TO_ARRAY('mydb.myschema.mytable'),
  'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
)
-- The table `mydb.myschema.mytable` will be augmented
-- with column POPULATION_14D9CF55_SUM
```


### DATAOBS_ENRICH_GRID_RAW

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_GRID_RAW(grid_type, input_query, input_index_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing grid cell indexes of one of the supported types (H3, Quadbin) with data from the Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment. The cells must all have the same resolution.

The Data Observatory Catalog tables (`SPATIAL_CATALOG_DATASETS` and `SPATIAL_CATALOG_VARIABLES`) must also be present in the same schema as the procedures.

As a result of this process, each input grid cell will be enriched with the data from the Data Observatory datasets that spatially intersect it. The variable values corresponding to all intersecting Data Observatory features for a given input polygon will be returned in an ARRAY column. When variables come from multiple Data Observatory geographies, one ARRAY column will be included for each source geography table. Data Observatory geography slugs are used for the names of these columns. Each array contains OBJECTs with one field for each variable (named after the variable slug) and additional measure fields `__carto_intersection`, `__carto_total`, `__carto_dimension`. See the output information for more details.

If the enrich data is indexed by an H3 or Quadbin grid compatible with the input (same grid type and equal or greater resolution), then the enrichment will be performed much more efficiently by matching the index values rather than intersecting associated GEOGRAPHY elements. In this case the additional measure fields are omitted.

**Input parameters**

* `grid_type`: `VARCHAR` Type of grid: "h3" or "quadbin"
* `input_query`: `VARCHAR` query to be enriched; this query must produce
   valid grid indexes for the selected grid type in a column of the proper type (VARCHAR for H3, and INT for Quadbin). It can include additional columns with data associated with the grid cells that will be preserved. A qualified table name can be given as well.
* `input_index_column`: `VARCHAR` name of a column in the query that contains the grid indexes.
* `variables`: `ARRAY` of VARCHAR with slugs (unique identifiers) of the Data Observatory variables to enrich the input polygons. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY` of `OBJECT`s with fields `dataset` and `expression`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than the input, the input table will be enriched in place.
* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `DATABASE.SCHEMA` format. If only the `SCHEMA` is included, it uses the database where the Analytics Toolbox is installed by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column for each Data Observatory geography containing enrichment variables, named after their corresponding geography slug.

The array contains OBJECTs with one field for each variable, using the variable slug as the field name. Additional fields will be included with information about the intersection of the geographies unless the grid matching described above is performed:

* `__carto_dimension` dimension of the Data Observatory geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the Data Observatory feature.

Moreover, another column named `__CARTO_INPUT_AREA` will be added containing the area of the input polygon in square meters.

If a new output table is created, it will be clustered by the spatial index to optimize its performance when filtering data by it or using it to join to other grid tables. This is important to visualize the results in a map efficiently. If an SQL clause is included in the `output` parameter this optimization will not be performed.

**Examples**

```sql
CALL carto.DATAOBS_ENRICH_GRID_RAW(
  'h3',
  $$
  SELECT VALUE AS INDEX FROM TABLE(FLATTEN(ARRAY_CONSTRUCT(
    '8718496d8ffffff','873974865ffffff','87397486cffffff','8718496daffffff','873974861ffffff','8718496dbffffff','87397494bffffff','8718496ddffffff','873974864ffffff')))
  $$,
  'INDEX',
  ARRAY_CONSTRUCT('population_14d9cf55'),
  TO_ARRAY('MYENRICHEDTABLE'),
  'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
)
-- The table MYENRICHEDTABLE will be created
-- with columns: INDEX, and WP_GRID100M_10955184.
-- The latter will be of OBJECT type with the fields population_93405ad7,
-- __carto_dimension, __carto_intersection and __carto_total.
```

```sql
CALL carto.DATAOBS_ENRICH_GRID_RAW(
  'h3',
  'mydb.myschema.mytable',
  'INDEX',
  ARRAY_CONSTRUCT('population_14d9cf55'),
  NULL,
  TO_ARRAY('mydb.myschema.mytable'),
  'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
)
-- The table `mydb.myschema.mytable` will be augmented
-- with the column WP_GRID100M_10955184.
-- It will be of OBJECT type with the fields population_93405ad7,
-- __carto_dimension, __carto_intersection and __carto_total.
```


### DATAOBS_ENRICH_POINTS

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POINTS(input_query, input_geography_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from the Data Observatory, The user must be subscribed to all the Data Observatory datasets involved in the enrichment. The Data Observatory Catalog tables (`SPATIAL_CATALOG_DATASETS` and `SPATIAL_CATALOG_VARIABLES`) must also be present in the same schema as the procedures.

As a result of this process, each input point will be enriched with the data from the Data Observatory that spatially intersect it. When the input point intersects with more than one data observatory polygon, point or line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are: `SUM`, `MIN`, `MAX`, `AVG`, and `COUNT`.

For other types of aggregation, the [`DATAOBS_ENRICH_POINTS_RAW`](#dataobs_enrich_points_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `variables`: `ARRAY` of `OBJECT`s with fields `variable` and `aggregation`. Variables of the Data Observatory that will be used to enrich the input points. For each variable, its slug and the aggregation method must be provided. Use `'default'` to use the variable's default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`, and `COUNT`. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY` of `OBJECT`s with fields `dataset` and `expression`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `DATABASE.SCHEMA` format. If only the `SCHEMA` is included, it uses the database where the Analytics Toolbox is installed by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding slug and including a suffix indicating the aggregation method used.

If a new output table is created, it will be ordered by the x and y coordinates optimize the performance of spatial filters and joins. This is important to visualize the results in a map efficiently.

**Examples**

```sql
CALL carto.DATAOBS_ENRICH_POINTS(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('variable', 'population_93405ad7', 'aggregation', 'SUM')
   ),
   NULL,
   TO_ARRAY('MYENRICHEDTABLE'),
   'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, POPULATION_93405AD7_SUM
```

```sql
CALL carto.DATAOBS_ENRICH_POINTS(
   'mydb.myschema.mytable', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('variable', 'population_93405ad7', 'aggregation', 'SUM')
   ),
   NULL,
   TO_ARRAY('mydb.myschema.mytable'),
   'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
);
-- The table `mydb.myschema.mytable` will be augmented
-- with column POPULATION_93405AD7_SUM
```


### DATAOBS_ENRICH_POINTS_RAW

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POINTS_RAW(input_query, input_geography_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from the Data Observatory, The user must be subscribed to all the Data Observatory datasets involved in the enrichment. The Data Observatory Catalog tables (`SPATIAL_CATALOG_DATASETS` and `SPATIAL_CATALOG_VARIABLES`) must also be present in the same schema as the procedures.

As a result of this process, each input point will be enriched with the data of the Data Observatory datasets that spatially intersect it. The variable values corresponding to all intersecting Data Observatory features for a given input point will be returned in an ARRAY column. When variables come from multiple Data Observatory geographies, one ARRAY column will be included for each source geography. Data Observatory geography slugs are used for the names of these columns. Each array contains OBJECTs with one field for each variable (named after the variable slug) and additional measure fields `__carto_total`, `__carto_dimension`. See the output information for more details.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `variables`: `ARRAY` of VARCHAR with slugs (unique identifiers) of the Data Observatory variables to enrich the input polygons. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY` of `OBJECT`s with fields `dataset` and `expression`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `DATABASE.SCHEMA` format. If only the `SCHEMA` is included, it uses the database where the Analytics Toolbox is installed by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column for each Data Observatory geography containing enrichment variables, named after their corresponding geography slug.
The array contains OBJECTs with one field for each variable, using the variable slug as the field name. Additional fields will be included with information about the intersected enrichment geographies:

* `__carto_dimension` dimension of the Data Observatory geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the Data Observatory feature.

If a new output table is created, it will be ordered by the x and y coordinates optimize the performance of spatial filters and joins. This is important to visualize the results in a map efficiently.

**Examples**

```sql
CALL carto.DATAOBS_ENRICH_POINTS_RAW(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   ARRAY_CONSTRUCT('population_93405ad7'),
   NULL,
   TO_ARRAY('MYENRICHEDTABLE'),
   'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, and WP_GRID100M_10955184.
-- Column WP_GRID100M_10955184 will have the fields population_93405ad7, __carto_dimension and __carto_total.
```

```sql
CALL carto.DATAOBS_ENRICH_POINTS_RAW(
   'mydb.myschema.mytable', 'GEOM',
   ARRAY_CONSTRUCT('population_93405ad7'),
   NULL,
   TO_ARRAY('mydb.myschema.mytable'),
   'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
);
-- The table `mydb.myschema.mytable` will be augmented
-- with columns WP_GRID100M_10955184.
-- Column WP_GRID100M_10955184 will have the fields population_93405ad7, __carto_dimension and __carto_total.
```


### DATAOBS_ENRICH_POLYGONS

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POLYGONS(input_query, input_geography_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from the Data Observatory, The user must be subscribed to all the Data Observatory datasets involved in the enrichment. The Data Observatory Catalog tables (`SPATIAL_CATALOG_DATASETS` and `SPATIAL_CATALOG_VARIABLES`) must also be present in the same schema as the procedures.

As a result of this process, each input polygon will be enriched with the data from the Data Observatory that spatially intersects it. When the input polygon intersects with more than one data observatory polygon, point or line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:

* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the Data Observatory feature intersected is weighted by the fraction of area or length intersected. If the Data Observatory features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the enrichment features are points, a simple average is computed.
* `COUNT` It computes the number of enrichment features that contain the Data Observatory variable and are intersected by the input geography.

For other types of aggregation, the [`DATAOBS_ENRICH_POLYGONS_RAW`](#dataobs_enrich_polygons_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `variables`: `ARRAY` of `OBJECT`s with fields `variable` and `aggregation`. Variables of the Data Observatory that will be used to enrich the input polygons. For each variable, its slug and the aggregation method must be provided. Use `'default'` to use the variable's default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`, and `COUNT`. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY` of `OBJECT`s with fields `dataset` and `expression`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog tables `SPATIAL_CATALOG_VARIABLES` and `SPATIAL_CATALOG_DATASETS` can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `DATABASE.SCHEMA` format. If only the `SCHEMA` is included, it uses the database where the Analytics Toolbox is installed by default.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding slug and including a suffix indicating the aggregation method used.

If a new output table is created, it will be ordered by the minimum x and y coordinates of each polygon to optimize the performance of spatial filters and joins. This is important to visualize the results in a map efficiently.

**Examples**

```sql
CALL carto.DATAOBS_ENRICH_POLYGONS(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('variable', 'population_93405ad7', 'aggregation', 'SUM')
   ),
   NULL,
   TO_ARRAY('MYENRICHEDTABLE'),
   'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, POPULATION_93405AD7_SUM
```

```sql
CALL carto.DATAOBS_ENRICH_POLYGONS(
   'mydb.myschema.mytable', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('variable', 'population_93405ad7', 'aggregation', 'SUM')
   ),
   NULL,
   TO_ARRAY('mydb.myschema.mytable'),
   'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
);
-- The table `mydb.myschema.mytable` will be augmented
-- with column POPULATION_93405AD7_SUM
```


### DATAOBS_ENRICH_POLYGONS_RAW

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POLYGONS_RAW(input_query, input_geography_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from the Data Observatory, The user must be subscribed to all the Data Observatory datasets involved in the enrichment.

As a result of this process, each input polygon will be enriched with the data of the Data Observatory datasets that spatially intersect it. The variable values corresponding to all intersecting Data Observatory features for a given input polygon will be returned in an ARRAY column. When variables come from multiple Data Observatory geographies, one ARRAY column will be included for each source geography. Data Observatory geography slugs are used for the names of these columns. Each array contains OBJECTs with one field for each variable (named after the variable slug) and additional measure fields `__carto_intersection`, `__carto_total`, `__carto_dimension`. See the output information for more details.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `variables`: `ARRAY` of VARCHAR with slugs (unique identifiers) of the Data Observatory variables to enrich the input polygons. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY` of `OBJECT`s with fields `dataset` and `expression`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog tables `SPATIAL_CATALOG_VARIABLES` and `SPATIAL_CATALOG_DATASETS` can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `DATABASE.SCHEMA` format. If only the `SCHEMA` is included, it uses the database where the Analytics Toolbox is installed by default.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column for each Data Observatory geography containing enrichment variables, named after their corresponding geography slug.
The array contains OBJECTs with one field for each variable, using the variable slug as the field name. Additional fields will be included with information about the intersection of the geographies:

* `__carto_dimension` dimension of the Data Observatory geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the Data Observatory feature.

Moreover, another column named `__CARTO_INPUT_AREA` will be added containing the area of the input polygon in square meters.

If a new output table is created, it will be ordered by the minimum x and y coordinates of each polygon to optimize the performance of spatial filters and joins. This is important to visualize the results in a map efficiently.

**Examples**

```sql
CALL carto.DATAOBS_ENRICH_POLYGONS_RAW(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   ARRAY_CONSTRUCT('population_93405ad7'),
   ),
   NULL,
   TO_ARRAY('MYENRICHEDTABLE'),
   'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, __CARTO_INPUT_AREA and WP_GRID100M_10955184.
-- The latter will be of OBJECT type with the fields population_93405ad7,
-- __carto_dimension, __carto_intersection and __carto_total.
```

Imagine that you need some information about the population in two areas of interest defined by polygons.

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POLYGONS_RAW(
  $$
    SELECT
      'Area1' AS NAME,
      TO_GEOGRAPHY('POLYGON((1 42,1.1 42,1.1 42.1,1 42.1,1 42))') AS GEOM
    UNION ALL
    SELECT
      'Area2',
      TO_GEOGRAPHY('POLYGON((-2 40,-1.9 40,-1.9 40.1,-2 40.1,-2 40))')
  $$,
  'GEOM',
  ARRAY_CONSTRUCT('population_f9004c56'),
  NULL,
  ARRAY_CONSTRUCT('ENRICHEDAREA'),
  'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
)
```

Now let's compute some aggregated statistics for our area:

* The sum of the population, adjusted by the fraction of intersected enrichment areas
* The average density of population, weighted by the intersection areas

```sql
WITH FLATENRICHMENT AS (
  SELECT
    NAME,
    GET(MATCH.VALUE, 'population_f9004c56') AS POP,
    GET(MATCH.VALUE, '__carto_intersection') INTER,
    GET(MATCH.VALUE, '__carto_total') TOTAL
  FROM ENRICHEDAREA,
    TABLE(FLATTEN(WP_GRID1KM_B16138C1)) MATCH
)
SELECT
  NAME,
  SUM(POP * INTER / NULLIFZERO(TOTAL)) AS POP_SUM,
  SUM(POP / NULLIFZERO(TOTAL) * INTER) / NULLIFZERO(SUM(INTER)) AS POPDENS_AVG
FROM FLATENRICHMENT
GROUP BY NAME
```

### In-place enrichment

```sql
CALL carto.DATAOBS_ENRICH_POLYGONS_RAW(
   'mydb.myschema.mytable', 'GEOM',
   ARRAY_CONSTRUCT('population_93405ad7'),
   NULL,
   TO_ARRAY('mydb.myschema.mytable'),
   'MY_DATAOBS_DB.MY_DATAOBS_SCHEMA'
);
-- The table `mydb.myschema.mytable` will be augmented
-- with columns __CARTO_INPUT_AREA and WP_GRID100M_10955184.
-- The latter will be of OBJECT type with the fields population_93405ad7,
-- __carto_dimension, __carto_intersection and __carto_total.
```


### DATAOBS_SUBSCRIPTIONS

{{% bannerNote type="code" %}}
carto.DATAOBS_SUBSCRIPTIONS(source, filters)
{{%/ bannerNote %}}

**Description**

When calling this procedure, the result shows a list of the DO subscriptions available.

* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `DATABASE.SCHEMA` format. If only the `SCHEMA` is included, it uses the database where the Analytics Toolbox is installed by default.
* `filters`: `VARCHAR` SQL expression to filter the results, e.g. `$$dataset_category='Housing'$$`.
  And empty string `''` or `NULL` can be used to omit the filtering.

**Output**

The result is an array of objects with the following fields:

* `dataset_slug` Internal identifier of the DO dataset.
* `dataset_name` name of the DO dataset.
* `dataset_country` name of the country the dataset belongs to.
* `dataset_category` name of the dataset category.
* `dataset_license` type of license, either "Public data" or "Premium data".
* `dataset_provider` name of the dataset provider.
* `dataset_version` version of the dataset.
* `dataset_geo_type` type of geometry used by the geography: "POINT"/"MULTIPOINT"/"LINESTRING"/"MULTILINESTRING"/"POLYGON"/"MULTIPOLYGON"/"GEOMETRYCOLLECTION".
* `dataset_table` name of the user BigQuery subscription table to access the dataset.
* `associated_geography_table` geography associated with the dataset (NULL if category is `Geography` meaning the dataset itself is a geography); contains a subscription table/view if available for the geography or the original (public) BigQuery dataset qualified name otherwise.
* `associated_geography_slug` internal identifier of the geography associated with the dataset (NULL if category is `Geography`).

**Example**

```sql
CALL carto.DATAOBS_SUBSCRIPTIONS('MY_DATAOBS_DB.MY_DATAOBS_SCHEMA', '');
```


### DATAOBS_SUBSCRIPTION_VARIABLES

{{% bannerNote type="code" %}}
carto.DATAOBS_SUBSCRIPTION_VARIABLES(source, filters)
{{%/ bannerNote %}}

**Description**

When calling this procedure, the result shows a list of the DO subscriptions and variables available.

* `source`: `VARCHAR` name of the location where the Data Observatory subscriptions of the user are stored, in `DATABASE.SCHEMA` format. If only the `SCHEMA` is included, it uses the database where the Analytics Toolbox is installed by default.
* `filters`: `VARCHAR` SQL expression to filter the results, e.g. `$$variable_type='STRING'$$`.
  And empty string `''` or `NULL` can be used to omit the filtering.

**Output**

The result is an array of objects with the following fields:

* `variable_slug` unique identifier of the variable. This can be used for enrichment.
* `variable_name` column name of the variable.
* `variable_description` description of the variable.
* `variable_type` type of the variable column.
* `variable_aggregation` default aggregation method for the variable.
* `dataset_slug` identifier of the dataset the variable belongs to.
* `associated_geography_slug` identifier of the corresponding geography. Note that this is NULL if the dataset itself is a geography..

**Example**

```sql
CALL carto.DATAOBS_SUBSCRIPTION_VARIABLES('MY_DATAOBS_DB.MY_DATAOBS_SCHEMA', '');
```


### ENRICH_GRID

{{% bannerNote type="code" %}}
carto.ENRICH_GRID(grid_type, input_query, input_index_column, data_query data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing grid cell indexes of one of the supported types (H3, Quadbin) with data from another enrichment query that contains geographies, thus effectively transferring geography-based data to an spatial grid.

As a result of this process, each input grid cell will be enriched with the data of the enrichment query that spatially intersects it. When the input cell intersects with more than one feature of the enrichment query, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:

* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the enrichment feature intersected is weighted by the fraction of area or length intersected. If the enrichment features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the enrichment features are points, a simple average is computed.
* `COUNT` It computes the number of enrichment features that contain the enrichment variable and are intersected by the input geography.

For other types of aggregation, the [`ENRICH_GRID_RAW`](#enrich_grid_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

**Input parameters**

* `grid_type`: Type of grid: "h3" or "quadbin".
* `input_query`: `VARCHAR` query to be enriched; this query must produce valid grid indexes for the selected grid type in a column of the proper type (VARCHAR for H3 and INT for Quadbin). It can include additional columns with data associated with the grid cells that will be preserved. A qualified table name can be given as well.
* `input_index_column`: `VARCHAR` name of a column in the query that contains the grid indexes.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query. All rows in the table must contain the same kind of geometry (points/lines/polygons) in the geography column.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`, `COUNT`). Each element in this array should be an `OBJECT` with fields `column` and `aggregation`.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

If a new output table is created, it will be clustered by the spatial index to optimize its performance when filtering data by it or using it to join to other grid tables. This is important to visualize the results in a map efficiently. If an SQL clause is included in the `output` parameter this optimization will not be performed.

**Examples**

```sql
CALL carto.ENRICH_GRID(
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

```sql
CALL carto.ENRICH_GRID(
   'h3',
   'mydb.myschema.mytable',
   'index',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('column', 'VAR1', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'max')
   ),
   TO_ARRAY('mydb.myschema.mytable')
);
-- The table `mydb.myschema.mytable` will be augmented
-- with columns: VAR1_SUM, VAR2_SUM, VAR2_MAX
```


### ENRICH_GRID_RAW

{{% bannerNote type="code" %}}
carto.ENRICH_GRID_RAW(grid_type, input_query, input_index_column, data_query data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing grid cell indexes of one of the supported types (H3, Quadbin) with data from another enrichment query that contains geographies, thus effectively transferring geography-based data to an spatial grid.

**Input parameters**

* `grid_type`: Type of grid: "h3" or "quadbin".
* `input_query`: `VARCHAR` query to be enriched; this query must produce valid grid indexes for the selected grid type in a column of the proper type (VARCHAR for H3 and INT for Quadbin). It can include additional columns with data associated with the grid cells that will be preserved. A qualified table name can be given as well.
* `input_index_column`: `VARCHAR` name of a column in the query that contains the grid indexes.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query. All rows in the table must contain the same kind of geometry (points/lines/polygons) in the geography column.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` of `VARCHAR` elements with names of the columns in the enrichment query that will be added to the enriched results.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column named `__CARTO_ENRICHMENT`. The array contains OBJECTs with one field for each variable. Additional fields will be included with information about the intersection of the geographies:

* `__carto_dimension` dimension of the enrichment geography: 2 for areas (polygons), 1 for lines and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the enrichment feature.

If a new output table is created, it will be clustered by the spatial index to optimize its performance when filtering data by it or using it to join to other grid tables. This is important to visualize the results in a map efficiently. If an SQL clause is included in the `output` parameter this optimization will not be performed.

**Examples**

```sql
CALL carto.ENRICH_GRID_RAW(
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

```sql
CALL carto.ENRICH_GRID_RAW(
   'h3',
   'mydb.myschema.mytable',
   'index',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT('VAR1', 'VAR2'),
   TO_ARRAY('mydb.myschema.mytable')
);
-- The table `mydb.myschema.mytable` will be augmented
-- with column __CARTO_ENRICHMENT which will contain OBJECTSs with the fields VAR1, VAR2, __carto_intersection, __carto_total and __carto_dimension.
```


### ENRICH_POINTS

{{% bannerNote type="code" %}}
carto.ENRICH_POINTS(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both and aggregating the result.

As a result of this process, each input point will be enriched with the data from the enrichment query that spatially intersects it. When the input point intersects with more than one enrichment polygon, point or line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are: `SUM`, `MIN`, `MAX`, `AVG`, and `COUNT`.

For special types of aggregation, the [`ENRICH_POINTS_RAW`](#enrich_points_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query. All rows in the table must contain the same kind of geometry (points/lines/polygons) in the geography column.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`, `COUNT`). Each element in this array should be an `OBJECT` with fields `column` and `aggregation`.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

If a new output table is created, it will be ordered by the x and y coordinates optimize the performance of spatial filters and joins. This is important to visualize the results in a map efficiently.

**Examples**

```sql
CALL carto.ENRICH_POINTS(
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

```sql
CALL carto.ENRICH_POINTS(
   'mydb.myschema.mytable', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('column', 'VAR1', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'max')
   ),
   TO_ARRAY('mydb.myschema.mytable')
);
-- The table `mydb.myschema.mytable` will be created
-- with columns: VAR1_SUM, VAR2_SUM, VAR2_MAX
```


### ENRICH_POINTS_RAW

{{% bannerNote type="code" %}}
carto.ENRICH_POINTS_RAW(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both.

As a result of this process, each input polygon will be enriched with the data from the enrichment query that spatially intersects it. The variable values corresponding to all intersecting enrichment features for a given input point will be returned in an ARRAY column named `__CARTO_ENRICHMENT`. Each array value in this column contains OBJECTSs with one field for each variable and additional measure fields `__carto_total` and `__carto_dimension`. See the output information for details.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query. All rows in the table must contain the same kind of geometry (points/lines/polygons) in the geography column.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` of `VARCHAR` elements with names of the columns in the enrichment query that will be added to the enriched results.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column named `__CARTO_ENRICHMENT`. The array contains OBJECTs with one field for each variable. Additional fields will be included with information about the intersection of the geographies:

* `__carto_dimension` dimension of the enrichment geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the enrichment feature.

If a new output table is created, it will be ordered by the x and y coordinates optimize the performance of spatial filters and joins. This is important to visualize the results in a map efficiently.

**Examples**

```sql
CALL carto.ENRICH_POINTS_RAW(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT('VAR1', 'VAR2'),
   TO_ARRAY('MYENRICHEDTABLE')
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, __CARTO_ENRICHMENT. The latter will contain OBJECTSs with the fields VAR1, VAR2, __carto_total and __carto_dimension.
```

```sql
CALL carto.ENRICH_POINTS_RAW(
   'mydb.myschema.mytable', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT('VAR1', 'VAR2'),
   TO_ARRAY('mydb.myschema.mytable')
);
-- The table `mydb.myschema.mytable` will be augmented
-- with column __CARTO_ENRICHMENT which will contain OBJECTSs with the fields VAR1, VAR2, __carto_total and __carto_dimension.
```


### ENRICH_POLYGONS

{{% bannerNote type="code" %}}
carto.ENRICH_POLYGONS(input_query, input_geography_column, data_query, data_geography_column, variables, output)
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

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query. All rows in the table must contain the same kind of geometry (points/lines/polygons) in the geography column.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`, `COUNT`). Each element in this array should be an `OBJECT` with fields `column` and `aggregation`.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

If a new output table is created, it will be ordered by the minimum x and y coordinates of each polygon to optimize the performance of spatial filters and joins. This is important to visualize the results in a map efficiently.

**Examples**

```sql
CALL carto.ENRICH_POLYGONS(
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

```sql
CALL carto.ENRICH_POLYGONS(
   'mydb.myschema.mytable', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT(
     OBJECT_CONSTRUCT('column', 'VAR1', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'sum'),
     OBJECT_CONSTRUCT('column', 'VAR2', 'aggregation', 'max')
   ),
   TO_ARRAY('mydb.myschema.mytable')
);
-- The table `mydb.myschema.mytable` will be augmented
-- with columns: VAR1_SUM, VAR2_SUM, VAR2_MAX
```


### ENRICH_POLYGONS_RAW

{{% bannerNote type="code" %}}
carto.ENRICH_POLYGONS_RAW(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from another query, spatially matching both.

As a result of this process, each input polygon will be enriched with the data of the enrichment query that spatially intersects it. The variable values corresponding to all intersecting enrichment features for a given input polygon will be returned in an ARRAY column named `__CARTO_ENRICHMENT`. Each array value in this column contains OBJECTSs with one field for each variable and additional measure fields `__carto_intersection`, `__carto_total` and `__carto_dimension`. See the output information for details.

**Input parameters**

* `input_query`: `VARCHAR` query to be enriched. A qualified table name can be given as well.
* `input_geography_column`: `VARCHAR` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `data_query`: `VARCHAR` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query. All rows in the table must contain the same kind of geometry (points/lines/polygons) in the geography column.
* `data_geography_column`: `VARCHAR` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY` of `VARCHAR` elements with names of the columns in the enrichment query that will be added to the enriched results.
* `output`: `ARRAY` of `VARCHAR` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'CLUSTER BY number'`. When the output table is the same than then input, the input table will be enriched in place.

Note that GeometryCollection/FeatureCollection geographies are not supported at the moment.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column named `__CARTO_ENRICHMENT`. The array contains OBJECTs with one field for each variable. Additional fields will be included with information about the intersection of the geographies:

* `__carto_dimension` dimension of the enrichment geography: 2 for areas (polygons), 1 for lines and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the enrichment feature.

Moreover, another field named `__carto_input_area` will be included in `__CARTO_ENRICHMENT`, containing the area of the input polygon in square meters.

If a new output table is created, it will be ordered by the minimum x and y coordinates of each polygon to optimize the performance of spatial filters and joins. This is important to visualize the results in a map efficiently.

**Examples**

```sql
CALL carto.ENRICH_POLYGONS_RAW(
   'SELECT ID, GEOM FROM MYTABLE', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT('VAR1', 'VAR2'),
   TO_ARRAY('MYENRICHEDTABLE')
);
-- The table `MYENRICHEDTABLE` will be created
-- with columns: ID, GEOM, __CARTO_ENRICHMENT. The latter will contain OBJECTSs with the fields VAR1, VAR2, __carto_intersection, __carto_total, dimension and __carto_input_area.
```

```sql
CALL carto.ENRICH_POLYGONS_RAW(
   'mydb.myschema.mytable', 'GEOM',
   'SELECT GEOM, VAR1, VAR2 FROM MYDATATABLE', 'GEOM',
   ARRAY_CONSTRUCT('VAR1', 'VAR2'),
   TO_ARRAY('mydb.myschema.mytable')
);
-- The table `mydb.myschema.mytable` will be augmented
-- with columns __CARTO_ENRICHMENT which will contain OBJECTSs with the fields VAR1, VAR2, __carto_intersection, __carto_total, dimension and __carto_input_area.
```
