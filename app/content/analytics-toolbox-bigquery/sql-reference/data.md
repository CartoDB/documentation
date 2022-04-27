---
aliases:
    - /analytics-toolbox-bq/sql-reference/data/
---
## data

<div class="badges"><div class="advanced"></div></div>

This module contains functions and procedures that make use of data (either Data Observatory or user-provided data) for their computations.


### DATAOBS_ENRICH_GRID

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_GRID(grid_type, input_query, input_index_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a set of grid cells of one of the supported types (h3, quadkey, s2, geohash) with data from the  Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment. The cells are identified by their indices.

As a result of this process, each input grid cell will be enriched with the data of the Data Observatory datasets that spatially intersect it. When the input cell intersects with more than one polygon, point, or line of the Data Observatory datasets, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:
* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the Data Observatory feature intersected is weighted by the fraction of area or length intersected. If the Data Observatory features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the Data Observatory features are points, a simple average is computed.
* `COUNT` It computes the number of Data Observatory features that contain the enrichment variable and are intersected by the input geography.

For other types of aggregation, the [`DATAOBS_ENRICH_GRID_RAW`](#dataobs_enrich_grid_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `grid_type`: `STRING` Type of grid: "h3", "quadkey", "s2" or "geohash".
* `input_query`: `STRING` query to be enriched (Standard SQL); this query must produce
   valid grid indices for the selected grid type in a column of the proper type (STRING for h3 or geohash, and INT64 for quadkey or s2). It can include additional columns with data associated with the grid cells that will be preserved. A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_index_column`: `STRING` name of a column in the query that contains the grid indices.
* `variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>`. Variables of the Data Observatory that will be used to enrich the input polygons. For each variable, its slug and the aggregation method must be provided. Use `'default'` to use the variable's default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`, `COUNT`. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY<STRUCT<dataset STRING, expression STRING>>`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `'project-id.dataset-id'` format. If only the `'dataset-id'` is included, it uses the project `'carto-data'` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding slug and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_GRID(
  'h3',
  R'''
  SELECT * FROM UNNEST(['8718496d8ffffff','873974865ffffff','87397486cffffff','8718496daffffff','873974861ffffff','8718496dbffffff','87397494bffffff','8718496ddffffff','873974864ffffff']) AS index
  ''',
  'index',
  [('population_14d9cf55', 'sum')],
  NULL,
  ['my-project.my-dataset.my-enriched-table'],
  'my-dataobs-project.my-dataobs-dataset'
)
-- The table 'my-project.my-dataset.my-enriched-table' will be created
-- with columns: index, population_14d9cf55_sum
```

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_GRID(
  'h3',
  'my-project.my-dataset.my-table',
  'index',
  [('population_14d9cf55', 'sum')],
  NULL,
  ['my-project.my-dataset.my-table'],
  'my-dataobs-project.my-dataobs-dataset'
)
-- The column population_14d9cf55_sum will be added to the table
-- 'my-project.my-dataset.my-table'.
```


### DATAOBS_ENRICH_GRID_RAW

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_GRID_RAW(grid_type, input_query, input_index_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing grid cell indices of one of the supported types (h3, quadkey, s2, geohash) with data from the Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment.

As a result of this process, each input grid cell will be enriched with the data of the Data Observatory datasets that spatially intersect it. The variable values corresponding to all intersecting Data Observatory features for a given input cell will be returned in an ARRAY column. When variables come from multiple Data Observatory geographies, one ARRAY column will be included for each source cell. Data Observatory geography slugs are used for the names of these columns. Each array contains STRUCTs with one field for each variable (named after the variable slug) and additional measure fields `intersection`, `total`, `dimension`. See the output information for more details.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `grid_type`: `STRING` Type of grid: "h3", "quadkey", "s2" or "geohash".
* `input_query`: `STRING` query to be enriched (Standard SQL); this query must produce valid grid indices for the selected grid type in a column of the proper type (STRING for h3 or geohash, and INT64 for quadkey or s2). It can include additional columns with data associated with the grid cells that will be preserved. A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_index_column`: `STRING` name of a column in the query that contains the grid indices.
* `variables`: `ARRAY<STRING>`. Variables of the Data Observatory that will be used to enrich the input polygons. For each variable, its slug must be provided. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY<STRUCT<dataset STRING, expression STRING>>`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `'project-id.dataset-id'` format. If only the `'dataset-id'` is included, it uses the project `'carto-data'` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column for each Data Observatory geography containing enrichment variables, named after their corresponding geography slug.
The array contains STRUCTs with one field for each variable, using the variable slug as the field name. Additional fields will be included with information about the intersection of the grid cell and the Data Observatory geographies.
* `__carto_dimension` dimension of the Data Observatory geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the Data Observatory feature.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_GRID_RAW(
  'h3',
  R'''
  SELECT * FROM UNNEST(['8718496d8ffffff','873974865ffffff','87397486cffffff','8718496daffffff','873974861ffffff','8718496dbffffff','87397494bffffff','8718496ddffffff','873974864ffffff']) AS index
  ''',
  'index',
   ['population_93405ad7'],
   NULL,
   ['my-project.my-dataset.my-enriched-table'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The table 'my-project.my-dataset.my-enriched-table' will be created
-- with columns: index, and wp_grid100m_10955184.
-- Column wp_grid100m_10955184 will have the fields population_93405ad7,
-- __carto_dimension, __carto_intersection and __carto_total.
```

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_GRID_RAW(
  'h3',
  'my-project.my-dataset.my-table',
  'index',
   ['population_93405ad7'],
   NULL,
   ['my-project.my-dataset.my-table'],
   'my-dataobs-project.my-dataset'
);
-- The column wp_grid100m_10955184 will be added to the table
-- 'my-project.my-dataset.my-table'.
-- Column wp_grid100m_10955184 will have the fields population_93405ad7,
-- __carto_dimension, __carto_intersection and __carto_total.
```


### DATAOBS_ENRICH_POINTS

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POINTS(input_query, input_geography_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from the Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment.

As a result of this process, each input point will be enriched with the data of the Data Observatory datasets that spatially intersect it. When the input point intersects with more than one polygon, point or line of the Data Observatory datasets, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are: `SUM`, `MIN`, `MAX`, `AVG`, and `COUNT`.

For special types of aggregation, the [`DATAOBS_ENRICH_POINTS_RAW`](#dataobs_enrich_points_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL). A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>`. Variables of the Data Observatory that will be used to enrich the input polygons. For each variable, its slug and the aggregation method to be used must be provided. Use `'default'` to use the variable's default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`, and `COUNT`. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY<STRUCT<dataset STRING, expression STRING>>`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `'project-id.dataset-id'` format. If only the `'dataset-id'` is included, it uses the project `'carto-data'` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding slug and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POINTS(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-table`
   ''',
   'geom',
   [('population_93405ad7', 'sum')],
   NULL,
   ['my-project.my-dataset.my-enriched-table'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The table 'my-project.my-dataset.my-enriched-table' will be created
-- with columns: id, geom, population_93405ad7_sum
```

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POINTS(
   'my-project.my-dataset.my-table',
   'geom',
   [('population_93405ad7', 'sum')],
   NULL,
   ['my-project.my-dataset.my-table'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The column population_93405ad7_sum will be added to the table
-- 'my-project.my-dataset.my-table'.
```

### DATAOBS_ENRICH_POINTS_RAW

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POINTS_RAW(input_query, input_geography_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from the Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment.

As a result of this process, each input point will be enriched with the data of the Data Observatory datasets that spatially intersect it. The variable values corresponding to all intersecting Data Observatory features for a given input point will be returned in an ARRAY column. When variables come from multiple Data Observatory geographies, one ARRAY column will be included for each source geography. Data Observatory geography slugs are used for the names of these columns. Each array contains STRUCTs with one field for each variable (named after the variable slug) and additional measure fields `total`, `dimension`. See the output information for more details.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL). A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `variables`: `ARRAY<STRING>` of slugs (unique identifiers) of the Data Observatory variables to add to the input points. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY<STRUCT<dataset STRING, expression STRING>>`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `'project-id.dataset-id'` format. If only the `'dataset-id'` is included, it uses the project `'carto-data'` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column for each Data Observatory geography containing enrichment variables, named after their corresponding geography slug.
The array contains STRUCTs with one field for each variable, using the variable slug as the field name. Additional fields will be included with information about the intersected enrichment geographies:
* `__carto_dimension` dimension of the Data Observatory geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the Data Observatory feature.

Moreover, another column named `__carto_input_area` will be added containing the area of the input polygon in square meters.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POINTS_RAW(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-table`
   ''',
   'geom',
   ['population_93405ad7'],
   NULL,
   ['`my-project.my-dataset.my-enriched-table`'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, __carto_input_area and wp_grid100m_10955184.
-- Column wp_grid100m_10955184 will have the fields population_93405ad7, __carto_dimension and __carto_total.
```

Imagine that you need some information about your points of interest. We'll get population information from the Data Observatory at those points:

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POLYGONS_RAW(
  R'''
    SELECT
      'Point1' AS name, ST_GEOGPOINT(1,42) AS geom
    UNION ALL
    SELECT
      'Point2', ST_GEOGPOINT(-2,40) AS geom
  ''',
  ['population_f9004c56'],
  NULL,
  ['my-project.my-dataset.enriched_points'],
  'my-dataobs-project.my-dataobs-dataset'
)
```

Now let's compute the average density of population at each location:

```sql
SELECT
  name,
  AVG(enrichment.population_f9004c56 / NULLIF(enrichment.__carto_total, 0) AS popdens_avg
FROM
  `my-project.my-dataset.enriched_points`, UNNEST(wp_grid1km_b16138c1) enrichment
GROUP BY name
```

Instead of creating a new table we could have modified the source table like this:

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POINTS_RAW(
   'my-project.my-dataset.my-table',
   'geom',
   ['population_93405ad7'],
   NULL,
   ['my-project.my-dataset.my-table'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The columns __carto_input_area and wp_grid100m_10955184
-- will be added to the table 'my-project.my-dataset.my-table'.
```


### DATAOBS_ENRICH_POLYGONS

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POLYGONS(input_query, input_geography_column, variables, filters, output source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from the Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment.

As a result of this process, each input polygon will be enriched with the data of the Data Observatory datasets that spatially intersect it. When the input polygon intersects with more than one polygon, point, or line of the Data Observatory datasets, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:
* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the Data Observatory feature intersected is weighted by the fraction of area or length intersected. If the Data Observatory features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the Data Observatory features are points, a simple average is computed.
* `COUNT` It computes the number of Data Observatory features that contain the enrichment variable and are intersected by the input geography.

For other types of aggregation, the [`DATAOBS_ENRICH_POLYGONS_RAW`](#dataobs_enrich_polygons_raw) procedure can be used to obtain non-aggregated data that can be later applied any desired custom aggregation.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL). A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>`. Variables of the Data Observatory that will be used to enrich the input polygons. For each variable, its slug and the aggregation method to be used must be provided. Use `'default'` to use the variable's default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`, and `COUNT`. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY<STRUCT<dataset STRING, expression STRING>>`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `'project-id.dataset-id'` format. If only the `'dataset-id'` is included, it uses the project `'carto-data'` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding slug and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POLYGONS(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-table`
   ''',
   'geom',
   [('population_93405ad7', 'SUM')],
   NULL,
   ['`my-project.my-dataset.my-enriched-table`'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, population_93405ad7_sum
```

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POLYGONS(
   'my-project.my-dataset.my-table',
   'geom',
   [('population_93405ad7', 'SUM')],
   NULL,
   ['my-project.my-dataset.my-table'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The column  population_93405ad7_sum will be added to the table
-- 'my-project.my-dataset.my-table'.
```

### DATAOBS_ENRICH_POLYGONS_RAW

{{% bannerNote type="code" %}}
carto.DATAOBS_ENRICH_POLYGONS_RAW(input_query, input_geography_column, variables, filters, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from the Data Observatory. The user must be subscribed to all the Data Observatory datasets involved in the enrichment.

As a result of this process, each input polygon will be enriched with the data of the Data Observatory datasets that spatially intersect it. The variable values corresponding to all intersecting Data Observatory features for a given input polygon will be returned in an ARRAY column. When variables come from multiple Data Observatory geographies, one ARRAY column will be included for each source geography. Data Observatory geography slugs are used for the names of these columns. Each array contains STRUCTs with one field for each variable (named after the variable slug) and additional measure fields `intersection`, `total`, `dimension`. See the output information for more details.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL). A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `variables`: `ARRAY<STRING>` of slugs (unique identifiers) of the Data Observatory variables to enrich the input polygons. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation.
* `filters` `ARRAY<STRUCT<dataset STRING, expression STRING>>`. Filters to be applied to the Data Observatory datasets used in the enrichment can be passed here. Each filter is applied to the Data Observatory dataset or geography, identified by its corresponding _slug_, passed in the `dataset` field of the structure. The second field of the structure, `expression`, is an SQL expression that will be inserted in a `WHERE` clause and that can reference any column of the dataset or geography table. Please note that column _names_ (not slugs) should be applied here. The catalog procedures [`DATAOBS_SUBSCRIPTIONS`](#dataobs_subscriptions) and [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find both the column names and the corresponding table slugs.
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.
* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `'project-id.dataset-id'` format. If only the `'dataset-id'` is included, it uses the project `'carto-data'` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column for each Data Observatory geography containing enrichment variables, named after their corresponding geography slug.
The array contains STRUCTs with one field for each variable, using the variable slug as the field name. Additional fields will be included with information about the intersection of the geographies:
* `__carto_dimension` dimension of the Data Observatory geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the Data Observatory feature.

Moreover, another column named `__carto_input_area` will be added containing the area of the input polygon in square meters.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POLYGONS_RAW(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-table`
   ''',
   'geom',
   ['population_93405ad7'],
   NULL,
   ['`my-project.my-dataset.my-enriched-table`'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, __carto_input_area and wp_grid100m_10955184.
-- Column wp_grid100m_10955184 will have the fields population_93405ad7,
-- __carto_dimension, __carto_intersection and __carto_total.
```

Imagine that you need some information about the population in two areas of interest defined as a 100-meter buffer around two given points.

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POLYGONS_RAW(
  R'''
    SELECT
      'Area1' AS name,
      `carto-un`.carto.ST_BUFFER(ST_GEOGPOINT(1,42),100,'meters',6) AS geom
    UNION ALL
    SELECT
      'Area2',
      `carto-un`.carto.ST_BUFFER(ST_GEOGPOINT(-2,40),100,'meters',6)
  ''',
  ['population_f9004c56'],
  NULL,
  ['my-project.my-dataset.enriched_area'],
  'my-dataobs-project.my-dataobs-dataset'
)
```

Now let's compute some aggregated statistics for our area:

* The sum of the population, adjusted by the fraction of intersected enrichment areas
* The average density of population, weighted by the intersection areas

```sql
SELECT
  name,
  SUM(enrichment.population_f9004c56 * enrichment.__carto_intersection / NULLIF(enrichment.__carto_total, 0)) AS population_sum,
  SUM(enrichment.population_f9004c56 / NULLIF(enrichment.__carto_total, 0) * enrichment.__carto_intersection) / NULLIF(SUM(enrichment.__carto_intersection), 0) AS popdens_avg
FROM
  `my-project.my-dataset.enriched_area`, UNNEST(wp_grid1km_b16138c1) enrichment
GROUP BY name
```

Instead of creating a new table we could have modified the source table like this:

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_POLYGONS_RAW(
   'my-project.my-dataset.my-table',
   'geom',
   ['population_93405ad7'],
   NULL,
   ['my-project.my-dataset.my-table'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- Columns __carto_input_area and wp_grid100m_10955184 will be added
-- to the table 'my-project.my-dataset.my-table'.
```

### DATAOBS_SAMPLES

{{% bannerNote type="code" %}}
carto.DATAOBS_SAMPLES(source STRING, filters STRING)
{{%/ bannerNote %}}

**Description**

When calling this procedure, the result shows a list of the DO samples available.

* `source`: `STRING` name of the location where the Data Observatory samples of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-data` by default.
* `filters`: `STRING` SQL expression to filter the results, e.g. `'category="Housing"'`.
  And empty string `''` or `NULL` can be used to omit the filtering.

**Output**

The result is a table with these columns:`
* `dataset_slug` Internal identifier of the DO dataset.
* `dataset_name` name of the DO dataset.
* `dataset_country` name of the country the dataset belongs to.
* `dataset_category` name of the dataset category.
* `dataset_license` type of license, either "Public data" or "Premium data".
* `dataset_provider` name of the dataset provider.
* `dataset_version` version of the dataset.
* `dataset_geo_type` type of geometry used by the geography: "POINT"/"MULTIPOINT"/"LINESTRING"/"MULTILINESTRING"/"POLYGON"/"MULTIPOLYGON"/"GEOMETRYCOLLECTION".
* `dataset_sample_table` name of the user BigQuery sample table.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.DATAOBS_SAMPLES('myproject.mydataset', '');
```

### DATAOBS_SUBSCRIPTIONS

{{% bannerNote type="code" %}}
carto.DATAOBS_SUBSCRIPTIONS(source STRING, filters STRING)
{{%/ bannerNote %}}

**Description**

When calling this procedure, the result shows a list of the DO subscriptions available.

* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-data` by default.
* `filters`: `STRING` SQL expression to filter the results, e.g. `'category="Housing"'`.
  And empty string `''` or `NULL` can be used to omit the filtering.

**Output**

The result is a table with these columns:
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

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.DATAOBS_SUBSCRIPTIONS('myproject.mydataset', '');
```

### DATAOBS_SUBSCRIPTION_VARIABLES

{{% bannerNote type="code" %}}
carto.DATAOBS_SUBSCRIPTION_VARIABLES(source STRING, filters STRING)
{{%/ bannerNote %}}

**Description**

When calling this procedure, the result shows a list of the DO subscriptions and variables available.

* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-data` by default.
* `filters`: `STRING` SQL expression to filter the results, e.g. `'type="STRING"'`.
  And empty string `''` or `NULL` can be used to omit the filtering.

**Output**

The result is a table with one row per variable and these columns:
* `variable_slug` unique identifier of the variable. This can be used for enrichment.
* `variable_name` column name of the variable.
* `variable_description` description of the variable.
* `variable_type` type of the variable column.
* `variable_aggregation` default aggregation method for the variable.
* `dataset_slug` identifier of the dataset the variable belongs to.
* `associated_geography_slug` identifier of the corresponding geography. Note that this is NULL if the dataset itself is a geography..

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.DATAOBS_SUBSCRIPTION_VARIABLES('myproject.mydataset','');
```

### ENRICH_GRID

{{% bannerNote type="code" %}}
carto.ENRICH_GRID(grid_type, input_query, input_index_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a set of grid cells of one of the supported types (h3, quadkey, s2, geohash) with data from another enrichment query. The cells are identified by their indices.

As a result of this process, each input grid cell will be enriched with the data of the enrichment query that spatially intersects it. When the input cell intersects with more than one feature of the enrichment query, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:
* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the enrichment feature intersected is weighted by the fraction of area or length intersected. If the enrichment features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the Data Observatory features are points, a simple average is computed.
* `COUNT` It computes the number of Data Observatory features that contain the enrichment variable and are intersected by the input geography.

For other types of aggregation, the [`ENRICH_GRID_RAW`](#enrich_grid_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

Enrich grid cells with user-provided data.

* `grid_type`: Type of grid: "h3", "quadkey", "s2" or "geohash".
* `input_query`: `STRING` query to be enriched (Standard SQL); this query must produce valid grid indices for the selected grid type in a column of the proper type (STRING for h3 or geohash, and INT64 for quadkey or s2). It can include additional columns with data associated with the grid cells that will be preserved. A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_index_column`: `STRING` name of a column in the query that contains the grid indices.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the cells provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY<STRUCT<column STRING, aggregation STRING>>` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`, `COUNT`).
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.

**Output**

The resulting table has all the input columns and one additional column for each variable in `variables`, named with a suffix indicating the aggregation method used.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.ENRICH_GRID(
   'h3',
   R'''
   SELECT * FROM UNNEST(['8718496d8ffffff','873974865ffffff','87397486cffffff','8718496daffffff','873974861ffffff','8718496dbffffff','87397494bffffff','8718496ddffffff','873974864ffffff']) AS index
   ''',
   'index',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   'geom',
   [('var1', 'sum'), ('var2', 'sum'), ('var2', 'max')],
   ['`my-project.my-dataset.my-enriched-table`']
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: index, var1_sum, var2_sum, var2_max
```

```sql
CALL `carto-un`.carto.ENRICH_GRID(
   'h3',
   'my-project.my-dataset.my-table',
   'index',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   'geom',
   [('var1', 'sum'), ('var2', 'sum'), ('var2', 'max')],
   ['my-project.my-dataset.my-table']
);
-- The columns var1_sum, var2_sum, var2_max will be added to the table
-- 'my-project.my-dataset.my-table'.
```

### ENRICH_GRID_RAW

{{% bannerNote type="code" %}}
carto.ENRICH_GRID_RAW(grid_type, input_query, input_index_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing grid cell indices of one of the supported types (h3, quadkey, s2, geohash) with data from another enrichment query.

As a result of this process, each input grid cell will be enriched with the data of the enrichment query that spatially intersects it. The variable values corresponding to all intersecting enrichment features for a given input cell will be returned in an ARRAY column named `__carto_enrichment`. Each array contains STRUCTs with one field for each variable and additional measure fields `__carto_intersection`, `__carto_total`, `__carto_dimension`. See the output information for more details.

**Input parameters**

* `grid_type`: `STRING` Type of grid: "h3", "quadkey", "s2" or "geohash". A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_query`: `STRING` query to be enriched (Standard SQL); this query must produce
   valid grid indices for the selected grid type in a column of the proper type (STRING for h3 or geohash, and INT64 for quadkey or s2). It can include additional columns with data associated with the grid cells that will be preserved.
* `input_index_column`: `STRING` name of a column in the query that contains the grid indices.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the cells provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY<STRING>` of names of the columns in the enrichment query that will be added to the enriched results.
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra ARRAY column named `__carto_enrichment`. The array contains STRUCTs with one field for each variable. Additional fields will be included with information about the intersection of the grid cell and the enrichment features.
* `__carto_dimension` dimension of the enrichment geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the enrichment feature.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.ENRICH_GRID(
   'h3',
   R'''
   SELECT * FROM UNNEST(['8718496d8ffffff','873974865ffffff','87397486cffffff','8718496daffffff','873974861ffffff','8718496dbffffff','87397494bffffff','8718496ddffffff','873974864ffffff']) AS index
   ''',
   'index',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   'geom',
   ['var1', 'var2'],
   ['`my-project.my-dataset.my-enriched-table`']
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: index, __carto_enrichment. The latter will contain STRUCTs with the fields var1, var2,
-- __carto_intersection, __carto_total, and __carto_dimension.
```

```sql
CALL `carto-un`.carto.ENRICH_GRID(
   'h3',
   'my-project.my-dataset.my-table',
   'index',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   'geom',
   ['var1', 'var2'],
   ['my-project.my-dataset.my-table']
);
-- The column __carto_enrichment will be added to the table
-- 'my-project.my-dataset.my-table'.
-- The new column will contain STRUCTs with the fields var1, var2,
-- __carto_intersection, __carto_total, and __carto_dimension.
```


### ENRICH_POINTS

{{% bannerNote type="code" %}}
carto.ENRICH_POINTS(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both and aggregating the result.

As a result of this process, each input point will be enriched with the data from the enrichment query that spatially intersects it. When the input point intersects with more than one enrichment polygon, point, or line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are: `SUM`, `MIN`, `MAX`, `AVG`, and `COUNT`.

For special types of aggregation, the [`ENRICH_POINTS_RAW`](#enrich_points_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL). A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY<STRUCT<column STRING, aggregation STRING>>` with the columns that will be used to enrich the input points and their corresponding aggregation method
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results * `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`, named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.ENRICH_POINTS(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-input`
   ''',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   [('var1', 'sum'), ('var2', 'sum'), ('var2', 'max')],
   ['`my-project.my-dataset.my-enriched-table`']
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, var1_sum, var2_sum, var2_max
```

```sql
CALL `carto-un`.carto.ENRICH_POINTS(
   'my-project.my-dataset.my-input',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   [('var1', 'sum'), ('var2', 'sum'), ('var2', 'max')],
   ['my-project.my-dataset.my-input']
);
-- The columns var1_sum, var2_sum, var2_max will be added to the table
-- 'my-project.my-dataset.my-input'.
```

### ENRICH_POINTS_RAW

{{% bannerNote type="code" %}}
carto.ENRICH_POINTS_RAW(input_query, input_geography_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both.

As a result of this process, each input point will be enriched with the data of the enrichment query that spatially intersects it. The variable values corresponding to all intersecting enrichment features for a given input point will be returned in an ARRAY column named `__carto_enrichment`. Each array value in this column contains STRUCTs with one field for each variable and additional measure fields `__carto_intersection`, `__carto_total`, `dimension. See the output information for details.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL). A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY<STRING>` of names of the columns in the enrichment query that will be added to the enriched results.
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.

**Output**

The output table will contain all the input columns provided in the `input_query`, and one extra ARRAY column named `__carto_enrichment`. The array contains STRUCTs with one field for each variable. Additional fields will be included with information about the intersection of the geographies:
* `__carto_dimension` dimension of the enrichment geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the enrichment feature.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.ENRICH_POINTS(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-input`
   ''',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   ['var1', 'var2'],
   ['`my-project.my-dataset.my-enriched-table`']
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, __carto_enrichment. The latter will contain STRUCTs with the fields var1, var2,
-- __carto_total, and __carto_dimension.
```

```sql
CALL `carto-un`.carto.ENRICH_POINTS(
   'my-project.my-dataset.my-input',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   ['var1', 'var2'],
   ['my-project.my-dataset.my-input']
);
-- The column __carto_enrichment will be added to the table
-- 'my-project.my-dataset.my-input'.
-- The new column will contain STRUCTs with the fields var1, var2,
-- __carto_total, and __carto_dimension.
```

### ENRICH_POLYGONS

{{% bannerNote type="code" %}}
carto.ENRICH_POLYGONS(input_query, input_geography_column, data_query, data_geography_column, variables, output))
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from another query, spatially matching both and aggregating the result.

As a result of this process, each input polygon will be enriched with the data from the enrichment query that spatially intersects it. When the input polygon intersects with more than one enrichment polygon, point or, line, the data is aggregated using the aggregation methods specified.

Valid aggregation methods are:
* `SUM`: It assumes the aggregated variable is an [_extensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. population). Accordingly, the value corresponding to the enrichment feature intersected is weighted by the fraction of area or length intersected. If the enrichment features are points, then a simple sum is performed.
* `MIN`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `MAX`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`.
* `AVG`: It assumes the aggregated variable is an [_intensive property_](https://en.wikipedia.org/wiki/Intensive_and_extensive_properties) (e.g. temperature, population density). Thus, the value is not altered by the intersected area/length as it's the case for `SUM`. However, a [weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean) is computed, using the intersection areas or lengths as the weight. When the enrichment features are points, a simple average is computed.
* `COUNT` It computes the number of enrichment features that contain the enrichment variable and are intersected by the input geography.

For other types of aggregation, the [`ENRICH_POLYGONS_RAW`](#enrich_polygons_raw) procedure can be used to obtain non-aggregated data that can be later applied to any desired custom aggregation.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL). A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY<STRUCT<column STRING, aggregation STRING>>` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`, `COUNT`).
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.

**Output**

The output table will contain all the input columns provided in the `input_query` and one extra column for each variable in `variables`,  named after its corresponding enrichment column and including a suffix indicating the aggregation method used.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.ENRICH_POLYGONS(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-input`
   ''',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   'geom',
   [('var1', 'sum'), ('var2', 'sum'), ('var2', 'max')],
   ['`my-project.my-dataset.my-enriched-table`']
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, var1_sum, var2_sum, var2_max
```

```sql
CALL `carto-un`.carto.ENRICH_POLYGONS(
   'my-project.my-dataset.my-input',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   [('var1', 'sum'), ('var2', 'sum'), ('var2', 'max')],
   ['my-project.my-dataset.my-input']
);
-- The columns var1_sum, var2_sum, var2_max will be added to the table
-- 'my-project.my-dataset.my-input'.
```

### ENRICH_POLYGONS_RAW

{{% bannerNote type="code" %}}
carto.ENRICH_POLYGONS_RAW(input_query, input_geography_column, data_query, data_geography_column, variables, output))
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from another query, spatially matching both.

As a result of this process, each input polygon will be enriched with the data of the enrichment query that spatially intersects it. The variable values corresponding to all intersecting enrichment features for a given input polygon will be returned in an ARRAY column named `__carto_enrichment`. Each array value in this column contains STRUCTs with one field for each variable and additional measure fields `__carto_intersection`, `__carto_total`, `__carto_dimension`. See the output information for details.

If the enrichment of an input table wants to be repeated, please notice that dropping the added columns will generate problems in consecutive enrichments as Bigquery saves those columns during 7 days for time travel purposes. We recommend storing the original table columns in a temporal table, dropping the input table and then recreating the input table from the temporal table.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL). A qualified table name can be given as well, e.g. `'project-id.dataset-id.table-name'`.
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY<STRING>` of names of the columns in the enrichment query that will be added to the enriched results.
* `output`: `ARRAY<STRING>`|`NULL` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it. The name of the output table should include project and dataset, e.g. ``['project-id.dataset-id.table-name']`` or ``['project-id.dataset-id.table-name', 'PARTITION BY number']``. If `NULL` the enrichment result is returned. When the output table is the same than then input, the input table will be enriched in place.

**Output**

The output table will contain all the input columns provided in the `input_query`, and one extra ARRAY column named `__carto_enrichment`. The array contains STRUCTs with one field for each variable. Additional fields will be included with information about the intersection of the geographies:
* `__carto_dimension` dimension of the enrichment geography: 2 for areas (polygons), 1 for lines, and 0 for points.
* `__carto_intersection` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the intersection.
* `__carto_total` area in square meters (for dimension = 2) or length in meters (for dimension = 1) of the enrichment feature.

Moreover, another column named `__carto_input_area` will be added containing the area of the input polygon in square meters.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.ENRICH_POLYGONS_RAW(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-input`
   ''',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   ['var1', 'var2'],
   ['`my-project.my-dataset.my-enriched-table`']
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, __carto_enrichment. The latter will contain STRUCTs with the fields var1, var2,
-- __carto_intersection, __carto_total, and __carto_dimension.
```

```sql
CALL `carto-un`.carto.ENRICH_POLYGONS_RAW(
   'my-project.my-dataset.my-input',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   ['var1', 'var2'],
   ['my-project.my-dataset.my-input']
);
-- The column __carto_enrichment will be added to the table
-- 'my-project.my-dataset.my-input'.
-- The new column will contain STRUCTs with the fields var1, var2,
-- __carto_intersection, __carto_total, and __carto_dimension.
```