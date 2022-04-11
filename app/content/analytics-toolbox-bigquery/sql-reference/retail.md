---
aliases:
    - /analytics-toolbox-bq/sql-reference/retail/
---
## retail

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains procedures to perform analysis to solve specific retail analytics use cases, such as revenue prediction.

### BUILD_REVENUE_MODEL

{{% bannerNote type="code" %}}
carto.BUILD_REVENUE_MODEL(revenue_model_data, options, output_prefix)
{{%/ bannerNote %}}

**Description**

This procedure is the second step of the Revenue Prediction analysis workflow. It creates the model and its description tables from the input model data (output of the [`BUILD_REVENUE_MODEL_DATA`](#build_revenue_model_data) procedure). It performs the following steps:
1. Compute the model from the input query and options.
2. Compute the revenue `model_shap`, `model_stats` tables (see the output description for more details).

**Input parameters**

* `revenue_model_data`: `STRING` table with the revenue model data generated with the [`BUILD_REVENUE_MODEL_DATA`](#build_revenue_model_data) procedure.
* `options`: `STRING` JSON string to overwrite the model default options. If set to NULL or empty, it will use the default options. Available options are: NUM_PARALLEL_TREE, TREE_METHOD, COLSAMPLE_BYTREE, MAX_TREE_DEPTH, SUBSAMPLE, L1_REG, L2_REG, EARLY_STOP, MAX_ITERATIONS, DATA_SPLIT_METHOD. More information about the model options can be found [here](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-create#model_option_list).
* `output_prefix`: `STRING` destination prefix for the output tables. It must contain the project, dataset and prefix. For example `<my-project>.<my-dataset>.<output-prefix>`.

**Output**

The procedure will output the following:
1. Model: contains the trained model to be used for the revenue prediction. The name of the model includes the suffix `_model`, for example `<my-project>.<my-dataset>.<output-prefix>_model`.
2. Shap table: contains a list of the features and their attribution to the model, computed with [`ML.GLOBAL_EXPLAIN`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-global-explain). The name of the table includes the suffix `_model_shap`, for example `<my-project>.<my-dataset>.<output-prefix>_model_shap`.
3. Stats table: contains the model stats (mean_error, variance, etc.), computed with [`ML.EVALUATE`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-evaluate). The name of the table includes the suffix `_model_stats`, for example `<my-project>.<my-dataset>.<output-prefix>_model_stats`.

To learn more about how to evaluate the results of your model through the concept of _explainability_, refer to [this article](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-xai-overview) (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-xai-overview).

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto.BUILD_REVENUE_MODEL(
    -- Model data
    '<my-project>.<my-dataset>.<output-prefix>_model_data',
    -- Options
    '{"MAX_ITERATIONS": 100}',
    -- Output destination prefix
    '<my-project>.<my-dataset>.<output-prefix>'
);
-- Model `<my-project>.<my-dataset>.<output-prefix>_model` will be created
-- Table `<my-project>.<my-dataset>.<output-prefix>_model_shap` will be created
-- Table `<my-project>.<my-dataset>.<output-prefix>_model_stats` will be created
```


### BUILD_REVENUE_MODEL_DATA

{{% bannerNote type="code" %}}
carto.BUILD_REVENUE_MODEL_DATA(store_query, competitor_query, aoi_query, grid_type, grid_level, kring, decay, do_variables, do_source, custom_variables, custom_query, output_prefix)
{{%/ bannerNote %}}

**Description**

This procedure is the first step of the Revenue Prediction analysis workflow. It prepares the model data to be used in the training and prediction phases by performing the following steps:
1. Polyfill the geometry from the area of interest using the grid type and resolution level.
2. Enrich the grid cells with the revenue, stores, Data Observatory (DO) variables and custom variables.
3. Apply a kring decay function to the enriched DO variables and custom variables. This operation smooths the features for a given cell by taking into account the values of these features in the neighboring cells (defined as those within the specified kring size), applying a scaling factor determined by the decay function of choice.
4. Create the revenue `model_data` table (see the output description for more details).
5. Create the revenue `model_data_stats` table (see the output description for more details).

**Input parameters**

* `store_query`: `STRING` query with the revenue per store information to be used in the model. It must contain the columns `revenue` (revenue of the store), `store` (store unique id) and `geom` (the geographical point of the store).
* `competitor_query`: `STRING` query with the competitors information to be used in the model. It must contain the columns `competitor` (competitor store unique id) and `geom` (the geographical point of the store).
* `aoi_query`: `STRING` query with the geography of the area of interest. It must contain a column `geom` with a single area (Polygon or MultiPolygon).
* `grid_type`: `STRING` type of the cell grid. Supported values are `h3` and `quadkey`.
* `grid_level`: `INT64` level or resolution of the cell grid. Check the available [h3 levels](https://h3geo.org/docs/core-library/restable/) and [quadkey levels](https://docs.microsoft.com/en-us/azure/azure-maps/zoom-levels-and-tile-grid?tabs=csharp).
* `kring`: `INT64` size of the kring where the decay function will be applied. This value can be 0, in which case no kring will be computed and the decay function won't be applied.
* `decay`: `STRING` decay function. Supported values are `uniform`, `inverse`, `inverse_square` and `exponential`. If set to `NULL` or `''`, `uniform` is used by default.
* `do_variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` variables of the Data Observatory that will be used to enrich the grid cells and therefore train the revenue prediction model in the subsequent step of the Revenue Prediction workflow. For each variable, its slug and the aggregation method must be provided. Use `default` to use the variable's default aggregation method. Valid aggregation methods are: `sum`, `avg`, `max`, `min`, `count`. The catalog procedure `DATAOBS_SUBSCRIPTION_VARIABLES` can be used to find available variables and their slugs and default aggregation. It can be set to `NULL`.
* `do_source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `<my-dataobs-project>.<my-dataobs-dataset>` format. If only the `<my-dataobs-dataset>` is included, it uses the project `carto-data` by default. It can be set to `NULL` or `''`.
* `custom_variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` list with the columns of the `custom_query` and their corresponding aggregation method (`sum`, `avg`, `max`, `min`, `count`) that will be used to enrich the grid cells. It can be set to `NULL`.
* `custom_query`: `STRING` query that contains a geography column `geom` and the columns with the custom data that will be used to enrich the grid cells. It can be set to `NULL` or `''`.
* `output_prefix`: `STRING` destination prefix for the output tables. It must contain the project, dataset and prefix. For example `<my-project>.<my-dataset>.<output-prefix>`.

**Output**

The procedure will output two tables:
1. Model data table: contains an `index` column with the cell ids and all the enriched columns: `revenue_avg`, `store_count`, `competitor_count`, DO variables and custom variables. The name of the table includes the suffix `_model_data`, for example `<my-project>.<my-dataset>.<output-prefix>_model_data`.
2. Model data stats table: contains the `morans_i` value computed for the `revenue_avg` column, computed with kring 1 and decay `uniform`. The name of the table includes the suffix `_model_data_stats`, for example `<my-project>.<my-dataset>.<output-prefix>_model_data_stats`.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto.BUILD_REVENUE_MODEL_DATA(
    -- Stores: revenue, store, geom
    '''SELECT revenue, store, geom FROM `<project>.<dataset>.input_stores_data`''',
    -- Competitors: competitor, geom
    '''SELECT competitor, geom FROM `<project>.<dataset>.input_competitors_data`''',
    -- Area of interest: geom
    '''SELECT geom FROM `<project>.<dataset>.area_of_interest`''',
    -- Grid params: grid type and level
    'h3', 6,
    -- Decay params: kring size and decay function
    3, 'exponential',
    -- Data Observatory enrichment
    [('POPCY_4534fac4', 'sum'), ('INCCYPCAP_7c8377cf', 'avg')],
    '<my-dataobs-project>.<my-dataobs-dataset>',
    -- Custom data enrichment
    [('var1', 'sum'), ('var2', 'avg')],
    '''SELECT var1, var2, geom FROM `<project>.<dataset>.custom_data`''',
    -- Output destination prefix
    '<my-project>.<my-dataset>.<output-prefix>'
);
-- Table `<my-project>.<my-dataset>.<output-prefix>_model_data` will be created
-- with columns: index, revenue_avg, store_count, competitor_count, POPCY_4534fac4_sum, INCCYPCAP_7c8377cf_avg, var1_sum, var2_avg
-- Table `<my-project>.<my-dataset>.<output-prefix>_model_data_stats` will be created
-- with the column: morans_i
```

### COMMERCIAL_HOTSPOTS

{{% bannerNote type="code" %}}
carto.COMMERCIAL_HOTSPOTS(input, output, index_column, index_type, variable_columns, variable_weights, kring, pvalue_thresh)
{{%/ bannerNote %}}

**Description**

This procedure is used to locate hotspot areas by calculating a combined [Getis-Ord Gi*](../statistics/#getis_ord_h3) statistic using a uniform kernel over several variables. The input data should be in either an H3 or quadkey grid. Variables can be optionally weighted using the `variable_weights` parameter, uniform weights will be considered otherwise. The combined Gi* statistic for each cell will be computed by taking into account the neighboring cells within the kring of size `kring`.

Only those cells where the Gi* statistics is significant are returned, i.e., those above the p-value threshold (`pvalue_thresh`) set by the user. Hotspots can be identified as those cells with the highest Gi* values.

**Input parameters**

* `input`: `STRING` name of the table containing the input data. It should include project and dataset, i.e., follow the format `<project-id>.<dataset-id>.<table-name>`.
* `output`: `STRING` name of the table where the output data will be stored. It should include project and dataset, i.e., follow the format `<project-id>.<dataset-id>.<table-name>`. If NULL, the procedure will return the output but it will not be persisted. 
* `index_column`: `STRING` name of the column containing the H3 or quadkey indexes.
* `index_type`: `STRING` type of the input cell indexes. Supported values are 'h3' and 'quadkey'.
* `variable_columns`: `ARRAY<STRING>` names of the columns containing the variables to take into account when computing the combined Gi* statistic.
* `variable_weights`: `ARRAY<FLOAT64>` containing the weights associated with each of the variables. These weights can take any value but will be normalized to sum up to 1. If NULL, uniform weights will be considered
* `kring`: `INT64` size of the kring (distance from the origin). This defines the area around each cell that will be taken into account to compute its Gi* statistic. If NULL, uniform weights will be considered.
* `pvalue_thresh`: Threshold for the Gi* value significance, ranging from 0 (most significant) to 1 (least significant). It defaults to 0.05. Cells with a p-value above this threshold won't be returned. 

**Output**
The output will contain the following columns:
* `index`: `STRING` containing the cell index.
* `combined_gi`: `FLOAT64` with the resulting combined Gi*.
* `p_value`: `FLOAT64` with the p-value associated with the combined Gi* statistic.
 
If the output table is not specified when calling the procedure, the result will be returned but it won't be persisted.

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.COMMERCIAL_HOTSPOTS(
    'project_id.dataset_id.my_input_table',
    'project_id.dataset_id.my_output_table',
    'store_location_cell',
    'h3',
    ['raw_visit_counts','population'],
    [0.7, 0.3],
     3,
     0.01
)
-- Table project_id.dataset_id.my_output_table will be created.
-- with columns: index, combined_gi, p_value
```

```sql
CALL `carto-un`.carto.COMMERCIAL_HOTSPOTS(
    'project_id.dataset_id.my_table',
     NULL,
    'index_id',
    'quadkey',
    ['feature_0','feature_1', 'feature_2'],
     NULL,
     1,
     NULL
)
-- {"index": 12802315855, "combined_gi": 4.192, "p_value": 0.000123}
-- {"index": 12807558543, "combined_gi": 4.991, "p_value": 3.01e-07}
-- {"index": 12812801743, "combined_gi": 5.243, "p_value": 1.09e-05}
```

### FIND_WHITESPACE_AREAS

{{% bannerNote type="code" %}}
carto.FIND_WHITESPACE_AREAS(
    revenue_model,
    revenue_model_data,
    generator_query,
    aoi_query,
    minimum_revenue,
    max_results,
    with_competitors,
    with_own_stores
)
{{%/ bannerNote %}}

**Description**

This is a postprocessing step that may be used after completing a Revenue Prediction analysis workflow. It allows you to identify cells with the highest potential revenue (_whitespaces_), while satisfying a series of criteria (e.g. presence of competitors).

It requires as input the model data (output of the [`BUILD_REVENUE_MODEL_DATA`](#build_revenue_model_data) procedure) and the trained model (output of the [`BUILD_REVENUE_MODEL`](#build_revenue_model) procedure), as well as a query with points to use as generators for the area of applicability of the model, plus a series of optional filters.

A cell is eligible to be considered a _whitespace_ if it complies with the filtering criteria (minimum revenue, presence of competitors, etc.) and is within the [area of applicability](https://arxiv.org/abs/2005.07939) of the revenue model provided. 

**Input parameters**

* `revenue_model`: `STRING` with the fully qualified `model` name.
* `revenue_model_data`: `STRING` with the fully qualified `model_data` table name.
* `generator_query`: `STRING` query with the location of a set of generator points as a geography column named geom. The algorithm will look for whitespaces in the surroundings of these locations, therefore avoiding offering results in locations that are not of the interest of the user. Good options to use as generator locations are, for instance, the location of the stores and competitors, or a collection of POIs that are known to drive commercial activity to an area.
* `aoi_query`: `STRING` query with the geography of the area of interest in which to perform the search. May be `NULL`, in which case no spatial filter will be applied.
* `minimum_revenue`: `FLOAT64` the minimum revenue to filter results by. May be `NULL`, in which case no revenue threshold will be applied.
* `max_results`: `INT64` of the maximum number of results, ordered by decreasing predicted revenue. May be `NULL`, in which case all eligible cells are returned.
* `with_own_stores`: `BOOL` specifying whether to consider cells that already have own stores in them. If `NULL`, defaults to `TRUE`.
* `with_competitors`: `BOOL` specifying whether to consider cells that already have competitors in them. If `NULL`, defaults to `TRUE`.

**Output**

The procedure will output a table of cells with the following columns:
* `index`: identifying the H3 or quadkey cell.
* `predicted_revenue_avg`: average revenue of an additional store located in the grid cell.
* `store_count`: number of own stores present in the grid cell.
* `competitor_count`: number of competitors present in the grid cell.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto.FIND_WHITESPACE_AREAS(
    '<my-project>.<my-dataset>.<output-prefix>_model',
    '<my-project>.<my-dataset>.<output-prefix>_model_data'
    'SELECT geom FROM <my-project>.<my-dataset>.<generator-table>',
    'SELECT geom FROM <my-project>.<my-dataset>.<area_of_interest_table>', -- Area of Interest filter
    10000, -- Minimum predicted revenue filter
    5, -- Maximum number of results
    TRUE, -- Whether to include cells with own stores
    FALSE -- Whether to include cells with competitors
)
```

### PREDICT_REVENUE_AVERAGE

{{% bannerNote type="code" %}}
carto.PREDICT_REVENUE_AVERAGE(index, revenue_model, revenue_model_data)
{{%/ bannerNote %}}

**Description**

This procedure is the third and final step of the Revenue Prediction analysis workflow. It predicts the average revenue of an additional store located in the specified grid cell. It requires as input the model data (output of the [`BUILD_REVENUE_MODEL_DATA`](#build_revenue_model_data) procedure) and the trained model (output of the [`BUILD_REVENUE_MODEL`](#build_revenue_model) procedure).

**Input parameters**

* `index`: `STRING` cell index where the new store will be located. It can be an `h3` or a `quadkey` index. For `quadkey`, the value should be cast to string: `CAST(index AS STRING)`. It can also be `'ALL'`, in which case the prediction for all the grid cells of the model data are returned.
* `revenue_model`: `STRING` the fully qualified `model` name.
* `revenue_model_data`: `STRING` the fully qualified `model_data` table name.

**Output**

The procedure will output the `index` and `predicted_revenue_avg` value in the cell, and the same units of the `revenue` column.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto.PREDICT_REVENUE_AVERAGE(
    '862676d1fffffff',
    '<my-project>.<my-dataset>.<output-prefix>_model',
    '<my-project>.<my-dataset>.<output-prefix>_model_data'
);
-- index, predicted_revenue_avg
```