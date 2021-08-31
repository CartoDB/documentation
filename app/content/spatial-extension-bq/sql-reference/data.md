## data

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions and procedures that make use of data (either Data Observatory or user-provided data) for their computations.

{{% bannerNote type="warning" title="warning"%}}
This module is in an experimental phase and therefore is subject to breaking changes.
{{%/ bannerNote %}}

### DATAOBS_ENRICH_GRID

{{% bannerNote type="code" %}}
data.DATAOBS_ENRICH_GRID(grid_type, input_query, input_index_column, variables, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a set of grid cells of one of the supported types (h3, quadkey, s2, geohash) using Data Observatory subscriptions. The cells are identified by their indices.

* `grid_type`: `STRING` Type of grid: "h3", "quadkey", "s2" or "geohash".
* `input_query`: `STRING` query to be enriched (Standard SQL); this query must produce
   valid grid indices for the selected grid type in a column of the proper type (STRING for h3 or geohash, and INT64 for quadkey or s2). It can include additional columns with data associalted to the grid cells that will be preserved.
* `input_index_column`: `STRING` name of a column in the query that contain the grid indices.
* `variables`: `ARRAY<STRUCT<slug STRING, aggr STRING>>`. Variables of the Data Observatory that will be used to enrich the input polygons. For each variable its slug and the aggregation method must be provided. Use `'default'` to use the variable's default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`.
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.
* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-customers` by default.

**Output**

The output table will contain the input columns and one column for each variable in `variables`, named after its corresponding slug and including a prefix indicating the aggregation method used.


**Example**

```sql
CALL carto-st.data.DATAOBS_ENRICH_GRID(
  'h3',
  R'''
  SELECT * FROM UNNEST(['8718496d8ffffff','873974865ffffff','87397486cffffff','8718496daffffff','873974861ffffff','8718496dbffffff','87397494bffffff','8718496ddffffff','873974864ffffff']) AS index
  ''',
  'index',
  [('population_14d9cf55', 'SUM')],
  ['`my-project.my-dataset.my-enriched-table`'],
  'my-dataobs-project.my-dataobs-dataset'
)
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: index, sum_population_14d9cf55
```

### DATAOBS_ENRICH_POINTS

{{% bannerNote type="code" %}}
data.DATAOBS_ENRICH_POINTS(input_query, input_geography_column, variables, output, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from the Data Observatory. The user must be subscribed to all the datasets necessary for the enrichment.
As a result of the enrichment, each point will be associated with the data assigned spatially to it, i.e., with the data of the points, lines or polygons that intersect with the input points.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL).
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `variables`: `ARRAY<STRING>` of slugs (unique identifiers) of the Data Observatory variables to add to the input query.
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.
* `source`: `STRING` name of the location where the Data Observatory samples of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-customers` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one column for each variable in `variables` named after its corresponding slug.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto-st.data.DATAOBS_ENRICH_POINTS(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-table`
   ''',
   'geom',
   ['population_93405ad7'],
   ['`my-project.my-dataset.my-enriched-table`'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, population_93405ad7
```

### DATAOBS_ENRICH_POINTS_WITH_MEASURES

{{% bannerNote type="code" %}}
data.DATAOBS_ENRICH_POINTS_WITH_MEASURES(input_query, input_geography_column, variables, output, subscription_project, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from the Data Observatory. The user must be subscribed to all the datasets necessary for the enrichment.
As a result of the enrichment, each point will be associated with the data assigned spatially to it, i.e., with the data of the points, lines or polygons that intersect with the input points.
In addition to the requested variables, for each variable a field will be created containing the measure (area or length) of the geography to which the variable value is assigned to. This can be used for normalization.
Another field will contain a parameter indicating the type (2, 1 or 0) of this measure: 2 indicates an area measured in square meters; 1 a length in meters, and 0 corresponds to a null measure, which is always the case when enriching with a points dataset.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL).
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `variables`: `ARRAY<STRING>` of slugs (unique identifiers) of the Data Observatory variables to add to the input query.
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.
* `source`: `STRING` name of the location where the Data Observatory samples of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-customers` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and three columns for each variable in `variables`: one with the value, named after its corresponding slug, another one with the corresponding measure (area or length), with the same name and a `measure` suffix, and finally another one with the type of measure with a `measure_type` suffix. There are three possible types of measures: 2 indicates an area measured in square meters; 1 a length in meters, and 0 corresponds to a null measure, which is always the case when enriching with a points dataset.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto-st.data.DATAOBS_ENRICH_POINTS_WITH_MEASURES(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-table`
   ''',
   'geom',
   ['population_93405ad7'],
   ['`my-project.my-dataset.my-enriched-table`'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, population_93405ad7, population_93405ad7_measure, population_93405ad7_measure_type
```

### DATAOBS_ENRICH_POLYGONS_WITH_AGGREGATION

{{% bannerNote type="code" %}}
data.DATAOBS_ENRICH_POLYGONS_WITH_AGGREGATION(input_query, input_geography_column, variables, output, subscription_project, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from the Data Observatory. The user must be subscribed to all the datasets necessary for the enrichment.
As a result of the enrichment, each polygon will be associated with the data assigned spatially to areas that intersect with each polygon.

For each input polygon, the data of all intersecting areas is aggregated using the aggregation methods specified. When the aggregation is `SUM`, the sum is weighted by the proportion of the area (or length in the case of enrichments with linear data, such as traffic intensity) intersected by the input polygons.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL).
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `variables`: `ARRAY<STRUCT<slug STRING, aggr STRING>>`. Variables of the Data Observatory that will be used to enrich the input polygons. For each variable its slug and the aggregation method to be used must be provided. Use `'default'` to use the variable's default aggregation method. Valid aggregation methods are: `SUM`, `AVG`, `MAX`, `MIN`.
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.
* `source`: `STRING` name of the location where the Data Observatory samples of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-customers` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and one column for each variable in `variables`, named after its corresponding slug and including a prefix indicating the aggregation method used.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto-st.data.DATAOBS_ENRICH_POLYGONS_WITH_AGGREGATION(
   R'''
   SELECT id, polygon FROM `my-project.my-dataset.my-table`
   ''',
   'polygon',
   [('population_93405ad7', 'SUM')],
   ['`my-project.my-dataset.my-enriched-table`'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, sum_population_93405ad7
```

### DATAOBS_ENRICH_POLYGONS_WITH_MEASURES

{{% bannerNote type="code" %}}
data.DATAOBS_ENRICH_POLYGONS_WITH_MEASURES(input_query, input_geography_column, variables, output, subscription_project, source)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic polygons with data from the Data Observatory. The user must be subscribed to all the datasets necessary for the enrichment.

As a result of the enrichment, each polygon will be associated with the data assigned spatially to areas that intersect with each polygon.

The values of all intersecting areas are not aggregated so each input row can appear in multiple output rows, one for each intersection. Extra columns are added per enrichment variable to facilitate aggregating or post-processing the results. See the output information for details.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL).
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `variables`: `ARRAY<STRING>` of slugs (unique identifiers) of the Data Observatory variables to enrich the input polygons.
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.
* `source`: `STRING` name of the location where the Data Observatory samples of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-customers` by default.

**Output**

The output table will contain all the input columns provided in the `input_query` and three columns for each variable in `variables`:
* the measure (area or length) of the intersection between the input polygons and the enrichment features. This column has the `intersection_measure` suffix.
* the total measure (area or length) of the enrichment feature. This column has the `total_measure` suffix.
* the type of measure: 2 for areas in square meters, 1 for lengths in meters, 0 for points. This column has the `measure_type` suffix.

Moreover, another column named `input_area` will be added containing the area of the input polygon in square meters.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto-st.data.DATAOBS_ENRICH_POLYGONS_WITH_MEASURES(
   R'''
   SELECT id, polygon FROM `my-project.my-dataset.my-table`
   ''',
   'polygon',
   ['population_93405ad7'],
   ['`my-project.my-dataset.my-enriched-table`'],
   'my-dataobs-project.my-dataobs-dataset'
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, population_93405ad7, population_93405ad7_intersection_measure, population_93405ad7_total_measure, population_93405ad7_measure_type, input_area
```

### DATAOBS_SAMPLES

{{% bannerNote type="code" %}}
data.DATAOBS_SAMPLES(source STRING, filters STRING)
{{%/ bannerNote %}}

**Description**

When calling this procedure, the result shows a list of the DO samples available

* `source`: `STRING` name of the location where the Data Observatory samples of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-customers` by default.
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
* `table` name of the user BigQuery sample table.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto-st.data.DATAOBS_SAMPLES('myproject.mydataset', '');
```

### DATAOBS_SUBSCRIPTIONS

{{% bannerNote type="code" %}}
data.DATAOBS_SUBSCRIPTIONS(source STRING, filters STRING)
{{%/ bannerNote %}}

**Description**

When calling this procedure, the result shows a list of the DO subscriptions available

* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-customers` by default.
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
* `table` name of the user BigQuery subscription table to access the dataset.
* `associated_geography` geography associated with the dataset (NULL if category is `Geography` meanint the dataset itself is a geography); contains a subscription view name if available for the geography or the original (public) BigQuery dataset qualified name otherwise.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto-st.data.DATAOBS_SUBSCRIPTIONS('myproject.mydataset', '');
```

### DATAOBS_SUBSCRIPTION_VARIABLES

{{% bannerNote type="code" %}}
data.DATAOBS_SUBSCRIPTION_VARIABLES(source STRING, filters STRING)
{{%/ bannerNote %}}

**Description**

When calling this procedure, the result shows a list of the DO subscriptions and variables available.

* `source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `project_id.dataset_id` format. If only the `dataset_id` is included, it uses the project `carto-customers` by default.
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

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto-st.data.DATAOBS_SUBSCRIPTION_VARIABLES('myproject.mydataset','');
```

### ENRICH_GRID

{{% bannerNote type="code" %}}
data.ENRICH_GRID(grid_type, input_query, input_index_column, data_query, data_geography_column, variables, output)
{{%/ bannerNote %}}

**Description**

Enrich grid cells with user-provided data.

* `grid_type`: Type of grid: "h3", "quadkey", "s2" or "geohash".
* `input_query`: `STRING` query to be enriched (Standard SQL); this query must produce
   valid grid indices for the selected grid type in a column of the proper type (STRING for h3 or geohash, and INT64 for quadkey or s2). It can include additional columns with data associalted to the grid cells that will be preserved.
* `input_index_column`: `STRING` name of a column in the query that contain the grid indices.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY<STRUCT<column STRING, aggregation STRING>>` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`).
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.


**Output**

The resulting table has all the input columns and one additional column for each variable in `variables`, named with a prefix indicating the aggregation method used.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto-st.data.ENRICH_GRID(
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
-- with columns: index, sum_var1, sum_var2, max_var2
```

### ENRICH_POINTS

{{% bannerNote type="code" %}}
data.ENRICH_POINTS(input_query, input_geography_column, data_query, data_geography_column, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both.
As a result of the enrichment, each point will be associated with the data assigned spatially to it, i.e., with the data of the points, lines or polygons that intersect with the input points.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL).
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.

**Output**

The output table will contain all the input columns provided in the `input_query` and one column for each of the data columns provided in the `data_query` (the result of the enrichment).

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT carto-st.data.ENRICH_POINTS(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-input`
   ''',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   ['`my-project.my-dataset.my-enriched-table`']
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, var1, var2
```

### ENRICH_POINTS_WITH_MEASURES

{{% bannerNote type="code" %}}
data.ENRICH_POINTS_WITH_MEASURES(input_query, input_geography_column, data_query, data_geography_column, output)
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing geographic points with data from another query, spatially matching both.
As a result of the enrichment, each point will be associated with the data assigned spatially to it, i.e., with the data of the points, lines or polygons that intersect with the input points.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL).
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the points to be enriched.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the points provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.

**Output**
The output table will contain all the input columns provided in the `input_query`, one column for each of the data columns provided in the `data_query` (the result of the enrichment) and two extra columns:
* `total_measure`: measure (area/length) of the geography in the data query that was spatially assigned to the input point during the enrichment.
* `measure_type`: type of the measure provided:
  + 2 if the enrichment geography is an area (polygon). In this case `total_measure` is in square meters.
  + 1 if the enrichment geography is a line. In this case `total_measure` is in meters.
  + 0 if the enrichment geography is a point. In this case `total_measure` is 0.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT carto-st.data.ENRICH_POINTS_WITH_MEASURES(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-input`
   ''',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   ['`my-project.my-dataset.my-enriched-table`']
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, var1, var2, total_measure, measure_type
```

### ENRICH_POLYGONS_WITH_AGGREGATION

{{% bannerNote type="code" %}}
data.ENRICH_POLYGONS_WITH_AGGREGATION(input_query, input_geography_column, data_query, data_geography_column, variables, output))
{{%/ bannerNote %}}

**Description**

Enrich a polygons query with data from another query, spatially matching both and aggregating the result.

This procedure enriches a query containing geographic polygons with data from another query.
As a result of the enrichment, each polygon will be associated with the data assigned spatially to areas that intersect with each polygon.

For each input polygon, the data of all intersecting areas is aggregated using the aggregation methods specified. When the aggregation is `SUM`, the sum is weighted by the proportion of the area (or length in the case of enrichments with linear data, such as traffic intensity) intersected by the input polygons.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL).
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `variables`: `ARRAY<STRUCT<column STRING, aggregation STRING>>` with the columns that will be used to enrich the input polygons and their corresponding aggregation method (`SUM`, `AVG`, `MAX`, `MIN`).
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.

**Output**

The output table will contain all the input columns provided in the `input_query` and one column for each variable in `variables`, named with a prefix indicating the aggregation method used.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto-st.data.ENRICH_POLYGONS_WITH_AGGREGATION(
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
-- with columns: id, geom, sum_var1, sum_var2, max_var2
```

### ENRICH_POLYGONS_WITH_MEASURES

{{% bannerNote type="code" %}}
data.ENRICH_POLYGONS_WITH_MEASURES(input_query, input_geography_column, data_query, data_geography_column, output))
{{%/ bannerNote %}}

**Description**

This procedure enriches a query containing goegraphic polygons with data from another query, spatially matching both. As a result of the enrichment, each polygon will be associated with the data assigned spatially to areas that intersect with each polygon.

The values of all intersecting areas are not aggregated so each input row can appear in multiple output rows, one for each intersection. Extra columns are added per enrichment variable to facilitate aggregating or post-processing the results. See the output information for details.

**Input parameters**

* `input_query`: `STRING` query to be enriched (Standard SQL).
* `input_geography_column`: `STRING` name of the GEOGRAPHY column in the query containing the polygons to be enriched.
* `data_query`: `STRING` query that contains both a geography column and the columns with the data that will be used to enrich the polygons provided in the input query.
* `data_geography_column`: `STRING` name of the GEOGRAPHY column provided in the `data_query`.
* `output`: `ARRAY<STRING>` containing the name of an output table to store the results and optionally an SQL clause that can be used to partition it, e.g. `'PARTITION BY number'`. The name of the output table should include project and dataset: `project-id.dataset-id.table-name`. This parameter can be NULL or empty, in which case the enrichment result is simply returned but not stored anywhere.

**Output**

The output table will contain all the input columns provided in the `input_query`, the enrichment columns (all columns
from the data query except the geography) and three additional columns:
* `intersection_measure`: measure (area or length) of the intersection between the input polygons and the enrichment features.
* `total_measure`: total measure (area or length) of the enrichment feature.
* `measure_type`: type of measure: 2 for areas in square meters, 1 for lengths in meters, 0 for points.

Moreover, another column named `input_area` will be added containing the area of the input polygon in square meters.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT carto-st.data.ENRICH_POLYGONS_WITH_MEASURES(
   R'''
   SELECT id, geom FROM `my-project.my-dataset.my-input`
   ''',
   'geom',
   R'''
   SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
   ''',
   ['`my-project.my-dataset.my-enriched-table`']
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: id, geom, var1, var2, intersection_measure, total_measure, measure_type
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
SELECT carto-st.data.VERSION();
-- 1.0.0-beta.7
```