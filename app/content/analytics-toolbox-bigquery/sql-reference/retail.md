---
aliases:
    - /analytics-toolbox-bq/sql-reference/retail/
---
## retail

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains procedures to perform analysis to solve specific retail analytics use cases, such as revenue prediction.

### BUILD_CANNIBALIZATION_DATA

{{% bannerNote type="code" %}}
carto.BUILD_CANNIBALIZATION_DATA(grid_type, store_query, resolution, distances, do_variables, do_urbanity_index, do_source, output_destination, output_prefix)
{{%/ bannerNote %}}

**Description**

This procedure is the first of two from the Cannibalization analysis workflow. It builds the dataset for the existing locations to be used by the procedure [`CANNIBALIZATION_OVERLAP`](#cannibalization_overlap) to estimate the overlap between existing stores and the potentially new ones.
1. For each store location, the urbanity level based on CARTO Spatial Features dataset is retrieved.
2. For each store location, given the radius specified, the cells of the influence area are found.
3. All cells are enriched with the specified features from Data Observatory subscriptions (e.g. population, footfall, etc.).
4. A table with store_id, cell_id, and features values are created.

**Input parameters**

* `grid_type`: `STRING` type of the cell grid. Supported values are `h3` and `quadbin`.
* `store_query`: `STRING` query with variables related to the stores to be used in the model, including their id and location. It must contain the columns `store_id` (store unique id) and `geom` (the geographical point of the store). The values of these columns cannot be `NULL`.
* `resolution`: `INT64` level or resolution of the cell grid. Check the available [h3 levels](https://h3geo.org/docs/core-library/restable/) and [quadbin levels](https://docs.microsoft.com/en-us/azure/azure-maps/zoom-levels-and-tile-grid?tabs=csharp).
* `distances`: `ARRAY<FLOAT64>` An array with radiuses in Km for each type of urbanity. Sorted from lowest urbanity to highest. Three different types, for Remote/Rural/Low_density_urban - Medium_density_urban - High/Very_High_density_urban locations.
* do_variables: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` variables of the Data Observatory that will be used to enrich the grid cells and therefore compute the overlap between store locations in the subsequent step of the Cannibalization workflow. For each variable, its slug and the aggregation method must be provided. Use default to use the variable's default aggregation method. Valid aggregation methods are: sum, avg, max, min, count. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation. It can be set to NULL.
* do_urbanity_index: `STRING` urbanity index variable slug_id in a CARTO Spatial Features subscription from the Data Observatory.
* do_source: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `<my-dataobs-project>.<my-dataobs-dataset>` format. If only the `<my-dataobs-dataset>` is included, it uses the project carto-data by default. It can be set to NULL or ''.
* `output_destination`: `STRING` destination prefix for the output tables. It must contain the project, dataset and prefix. For example `<my-project>.<my-dataset>`.
* `output_prefix`: `STRING` the prefix for each table in the output destination.

**Output**

This procedure will output one table:
* Table containing the store_id, cell_id, distance from store_id (integer) and the values for each Data Observatory feature. The output table can be found at the output destination with name `<output-prefix>_output`. Overall path `<my-project>.<my-dataset>.<output-prefix>_output`.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto.BUILD_CANNIBALIZATION_DATA(
    --grid_type
    'h3',
    --store_query
    '''SELECT store_id, geom, FROM `<project>.<dataset>.<table_name_with_stores>`''',
    --resolution
    8,
    --distances
    [5.,3.,1.],
    --do_variables
    [('population_f5b8d177','sum')],
    --do_urbanity_index
    'urbanity_e1a58891',
    --do_source
    '<my-dataobs-project>.<my-dataobs-dataset>',
    --output_destination
    '<my-project>.<my-dataset>',
    --output_prefix
    'test_cannib'
);
```


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
* `options`: `STRING` JSON string to overwrite the model default options. If set to NULL or empty, it will use the default options. The following fixed options cannot be modified:
    * MODEL_TYPE: 'BOOSTED_TREE_REGRESSOR'
    * BOOSTER_TYPE: 'GBTREE'
    * ENABLE_GLOBAL_EXPLAIN: TRUE
    * INPUT_LABEL_COLS: ['revenue_avg']

    The following default options can be modified:
    * NUM_PARALLEL_TREE: 1
    * TREE_METHOD: 'AUTO'
    * COLSAMPLE_BYTREE: 1
    * MAX_TREE_DEPTH: 6
    * SUBSAMPLE: 0.85
    * L1_REG: 0
    * L2_REG: 1
    * EARLY_STOP: FALSE
    * MAX_ITERATIONS: 50
    * DATA_SPLIT_METHOD: 'NO_SPLIT'

    This parameter allows using other options compatible with the model. Check the [model documentation](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-create#model_option_list) for more information.
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
carto.BUILD_REVENUE_MODEL_DATA(stores_query, stores_variables, competitors_query, aoi_query, grid_type, grid_level, kring, decay, do_variables, do_source, custom_variables, custom_query, output_prefix)
{{%/ bannerNote %}}

**Description**

This procedure is the first step of the Revenue Prediction analysis workflow. It prepares the model data to be used in the training and prediction phases by performing the following steps:
1. Polyfill the geometry from the area of interest using the grid type and resolution level.
2. Enrich the grid cells with the revenue, stores, Data Observatory (DO) variables and custom variables.
3. Apply a kring decay function to the enriched DO variables and custom variables. This operation smooths the features for a given cell by taking into account the values of these features in the neighboring cells (defined as those within the specified kring size), applying a scaling factor determined by the decay function of choice.
4. Create the revenue `model_data` table (see the output description for more details).
5. Create the revenue `model_data_stats` table (see the output description for more details).

**Input parameters**

* `stores_query`: `STRING` query with variables related to the stores to be used in the model, including their revenue per store (required) and other variables (optional) variables. It must contain the columns `revenue` (revenue of the store), `store` (store unique id) and `geom` (the geographical point of the store). The values of these columns cannot be `NULL`.
* `stores_variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` list with the columns of the `stores_query` and their corresponding aggregation method (`sum`, `avg`, `max`, `min`, `count`) that will be used to enrich the grid cells. It can be set to `NULL`.
* `competitors_query`: `STRING` query with the competitors information to be used in the model. It must contain the columns `competitor` (competitor store unique id) and `geom` (the geographical point of the store).
* `aoi_query`: `STRING` query with the geography of the area of interest. It must contain a column `geom` with a single area (Polygon or MultiPolygon).
* `grid_type`: `STRING` type of the cell grid. Supported values are `h3`, and `quadbin`.
* `grid_level`: `INT64` level or resolution of the cell grid. Check the available [h3 levels](https://h3geo.org/docs/core-library/restable/), and [quadbin levels](https://docs.carto.com/analytics-toolbox-bigquery/overview/spatial-indexes/#quadbin).
* `kring`: `INT64` size of the kring where the decay function will be applied. This value can be 0, in which case no kring will be computed and the decay function won't be applied.
* `decay`: `STRING` decay function. Supported values are `uniform`, `inverse`, `inverse_square` and `exponential`. If set to `NULL` or `''`, `uniform` is used by default.
* `do_variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` variables of the Data Observatory that will be used to enrich the grid cells and therefore train the revenue prediction model in the subsequent step of the Revenue Prediction workflow. For each variable, its slug and the aggregation method must be provided. Use `default` to use the variable's default aggregation method. Valid aggregation methods are: `sum`, `avg`, `max`, `min`, `count`. The catalog procedure `DATAOBS_SUBSCRIPTION_VARIABLES` can be used to find available variables and their slugs and default aggregation. It can be set to `NULL`.
* `do_source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `<my-dataobs-project>.<my-dataobs-dataset>` format. If only the `<my-dataobs-dataset>` is included, it uses the project `carto-data` by default. It can be set to `NULL` or `''`.
* `custom_variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` list with the columns of the `custom_query` and their corresponding aggregation method (`sum`, `avg`, `max`, `min`, `count`) that will be used to enrich the grid cells. It can be set to `NULL`.
* `custom_query`: `STRING` query that contains a geography column `geom` and the columns with the custom data that will be used to enrich the grid cells. It can be set to `NULL` or `''`.
* `output_prefix`: `STRING` destination prefix for the output tables. It must contain the project, dataset and prefix. For example `<my-project>.<my-dataset>.<output-prefix>`.

**Output**

The procedure will output two tables:
1. Model data table: contains an `index` column with the cell ids and all the enriched columns: `revenue_avg`, `store_count`, `competitor_count`, `stores_variables` suffixed by aggregation method, DO variables and custom variables. The name of the table includes the suffix `_model_data`, for example `<my-project>.<my-dataset>.<output-prefix>_model_data`.
2. Model data stats table: contains the `morans_i` value computed for the `revenue_avg` column, computed with kring 1 and decay `uniform`. The name of the table includes the suffix `_model_data_stats`, for example `<my-project>.<my-dataset>.<output-prefix>_model_data_stats`.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.BUILD_REVENUE_MODEL_DATA(
    -- Stores: revenue, store, geom and optional store information
    '''SELECT revenue, store, geom, store_area FROM `<project>.<dataset>.input_stores_data`''',
    -- Stores information variables
    [('store_area','sum')],
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


### CANNIBALIZATION_OVERLAP

{{% bannerNote type="code" %}}
carto.CANNIBALIZATION_OVERLAP(data_table, new_locations_query, do_urbanity_index, do_source, output_destination, output_prefix)
{{%/ bannerNote %}}

**Description**

This procedure is the second step of the Cannibalization analysis workflow. It takes as input the generated table from [`CANNIBALIZATION_BUILD_DATA`](#cannibalization_build_data) and the location of the new store, and estimates the overlap of areas and spatial features that the new store would have with the existing stores included into the generated table.

**Input parameters**

* `data_table`: `STRING` Table with columns `store_id`, `cell_id`, `distance` from `store_id` (integer) and the values for each Data Observatory features.
* `new_locations_query`: `STRING` query with store_id and location of new stores.
* `do_urbanity_index`: `STRING` urbanity index variable name from the Data Observatory subscriptions.
* `do_source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `<my-dataobs-project>.<my-dataobs-dataset>` format. If only the `<my-dataobs-dataset>` is included, it uses the project `carto-data` by default. It can be set to `NULL` or `''`.
* `output_destination`: `STRING` destination prefix for the output tables. It must contain the project, dataset and prefix. For example `<my-project>.<my-dataset>`.
* `output_prefix`: `STRING` The prefix for each table in the output destination.

**Output**

This procedure  will output one table:
* Table contains the store_id that receives the "cannibalization", store_id that causes the cannibalization, area overlap and features overlap for each Data Observatory features included in the analysis. The output table can be found at the output destination with the name `<output-prefix>_output_overlap`. Overall path `<my-project>.<my-dataset>.<output-prefix>_output_overlap`.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL carto.CANNIBALIZATION_OVERLAP(
    --data_table
    '<my-project>.<my-dataset>.output_<suffix from step1>',
    --new_locations_query
     '''SELECT store_id, geom, FROM `<project>.<dataset>.<table_name_with_new_stores>`''',,
    --do_urbanity_index
    'urbanity_e1a58891',
    --do_source
    '<my-dataobs-project>.<my-dataobs-dataset>',
    --output_destination
    '<my-project>.<my-dataset>',
    --output_prefix
    'test_cannib'
);
```


### COMMERCIAL_HOTSPOTS

{{% bannerNote type="code" %}}
carto.COMMERCIAL_HOTSPOTS(input, output, index_column, index_type, variable_columns, variable_weights, kring, pvalue_thresh)
{{%/ bannerNote %}}

**Description**

This procedure is used to locate hotspot areas by calculating a combined [Getis-Ord Gi*](../statistics/#getis_ord_h3) statistic using a uniform kernel over several variables. The input data should be in either an H3 or quadbin grid. Variables can be optionally weighted using the `variable_weights` parameter, uniform weights will be considered otherwise. The combined Gi* statistic for each cell will be computed by taking into account the neighboring cells within the kring of size `kring`.

Only those cells where the Gi* statistics is significant are returned, i.e., those above the p-value threshold (`pvalue_thresh`) set by the user. Hotspots can be identified as those cells with the highest Gi* values.

**Input parameters**

* `input`: `STRING` name of the table containing the input data. It should include project and dataset, i.e., follow the format `<project-id>.<dataset-id>.<table-name>`.
* `output`: `STRING` name of the table where the output data will be stored. It should include project and dataset, i.e., follow the format `<project-id>.<dataset-id>.<table-name>`. If NULL, the procedure will return the output but it will not be persisted.
* `index_column`: `STRING` name of the column containing the H3, or quadbin indexes.
* `index_type`: `STRING` type of the input cell indexes. Supported values are 'h3', or 'quadbin'.
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
    'index',
    'h3',
    ['feature_0', 'feature_1'],
    [0.7, 0.3],
     3,
     0.01
)
-- Table project_id.dataset_id.my_output_table will be created.
-- with columns: index, combined_gi, p_value
```

```sql
CALL `carto-un`.carto.COMMERCIAL_HOTSPOTS(
    'project_id.dataset_id.my_input_table',
    'project_id.dataset_id.my_output_table',
    'index',
    'quadbin',
    ['feature_0', 'feature_1'],
    [0.5, 0.5],
    1,
    0.05
);
-- Table project_id.dataset_id.my_output_table will be created.
-- with columns: index, combined_gi, p_value
```

### FIND_TWIN_AREAS

{{% bannerNote type="code" %}}
carto.FIND_TWIN_AREAS(origin_query, target_query, index_column, pca_explained_variance_ratio, max_results, output_prefix)
{{%/ bannerNote %}}

**Description**

Procedure to obtain the twin areas for a given origin location in a target area. The full description of the method, based on Principal Component Analysis (PCA), can be found [here](https://carto.com/blog/spatial-data-science-site-planning).

The output twin areas are those of the target area considered to be the most similar to the origin location, based on the values of a set of variables. Only variables with numerical values are supported. Both origin and target areas should be provided in grid format (h3, or quadbin) of the same resolution. We recommend using the [carto.GRIDIFY_ENRICH](../#gridify_enrich) procedure to prepare the data in the format expected by this procedure.

**Input**

* `origin_query`: `STRING` query to provide the origin cell (`index` column) and its associated data columns. No NULL values should be contained in any of the data columns provided. The cell can be an h3, or a quadbin index. For quadbin, the value should be cast to `STRING` (`CAST(index AS STRING)`). Example origin queries are:
    ```sql
    -- When selecting the origin cell from a dataset of gridified data
    SELECT * FROM `<project>.<dataset>.<origin_table>`
    WHERE index_column = <cell_id>
    ```

    ```sql
    -- When the input H3 cell ID is inferred from a (longitude, latitude) pair
    SELECT * FROM `<project>.<dataset>.<origin_table>`
    WHERE ST_INTERSECTS(`carto-un`.H3_BOUNDARY(index_column), ST_GEOGPOINT(<longitude>, <latitude>))
    ```

    ```sql
    -- When the input quadbin cell ID is inferred from a (longitude, latitude) pair
    SELECT * FROM `<project>.<dataset>.<origin_table>`
    WHERE ST_INTERSECTS(`carto-un`.carto.QUADBIN_BOUNDARY(index_column), ST_GEOGPOINT(<longitude>, <latitude>))
    ```

    ```sql
    -- When the cell ID is a quadbin and requires to be cast
    SELECT * EXCEPT(index_column), CAST(index_column AS STRING)
    FROM `<project>.<dataset>.<origin_table>`
    ```
* `target_query`: STRING query to provide the target area grid cells (`index` column) and their associated data columns, e.g. `SELECT * FROM <project>.<dataset>.<target_table>`. The data columns should be similar to those provided in the `origin_query`, otherwise the procedure will fail. Grid cells with any NULL values will be excluded from the analysis.
* `index_column`: `STRING` name of the index column for both the `origin_query` and the `target_query`.
* `pca_explained_variance_ratio`: `FLOAT64` of the explained variance retained in the PCA analysis. It defaults to 0.9 if set to`NULL`.
* `max_results`: `INT64` of the maximum number of twin areas returned. If set to `NULL`, all target cells are returned.
* `output_prefix`: `STRING` destination and prefix for the output tables. It must contain the project, dataset and prefix: `<project>.<dataset>.<prefix>`.

**Output**

The procedure outputs the following:

* Twin area model, named `<project>.<dataset>.<prefix>_model`. Please note that the model computation only depends on the `target_query` and therefore the same model can be used if the procedure is re-run for a different `origin_query`. To allow for this scenario in which the model is reused, if the output model already exists, it won't be recomputed. To avoid this behavior, simply choose a different `<prefix>` in the `output_prefix` parameter.

* Results table, named `<project>.<dataset>.<prefix>_<origin_index>_results`, containing in each row the index of the target cells (`index_column`) and its associated `similarity_score` and `similarity_skill_score`. The `similarity_score` corresponds to the distance between the origin and target cell in the Principal Component (PC) Scores spaces; the `similarity_skill_score` for a given target cell `*t*` is computed as `1 - similarity_score(*t*) / similarity_score(<*t*>)`, where `<*t*>` is the average target cell, computed by averaging each retained PC score for all the target cells. This `similarity_skill_score` represents a relative measure: the score will be positive if and only if the target cell is more similar to the origin than the mean vector data, with a score of 1 meaning perfect matching or zero distance. Therefore, a target cell with a larger score will be more similar to the origin under this scoring rule.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.FIND_TWIN_AREAS(
    -- Input queries
    '''SELECT * FROM `cartobq.docs.twin_areas_origin_enriched_quadbin` LIMIT 1''',
    '''SELECT * FROM `cartobq.docs.twin_areas_target_enriched_quadbin`''',
    -- Twin areas model inputs
    'quadbin',
    0.90,
    NULL,
    'my-project.my-dataset.my-prefix'
);
-- Table `<my-project>.<my-dataset>.<output-prefix>_{ID}_results` will be created
-- with the column: quadbin, similarity_score, similarity_skill_score
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
* `index`: identifying the H3, or quadbin cell.
* `predicted_revenue_avg`: average revenue of an additional store located in the grid cell.
* `store_count`: number of own stores present in the grid cell.
* `competitor_count`: number of competitors present in the grid cell.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.FIND_WHITESPACE_AREAS(
    '<my-project>.<my-dataset>.<output-prefix>_model',
    '<my-project>.<my-dataset>.<output-prefix>_model_data',
    'SELECT geom FROM `<my-project>.<my-dataset>.<generator-table>`',
    'SELECT geom FROM `<my-project>.<my-dataset>.<area_of_interest_table>`', -- Area of Interest filter
    10000, -- Minimum predicted revenue filter
    5, -- Maximum number of results
    TRUE, -- Whether to include cells with own stores
    FALSE -- Whether to include cells with competitors
);
```

### GRIDIFY_ENRICH

{{% bannerNote type="code" %}}
carto.GRIDIFY_ENRICH(input_query, grid_type, grid_level, do_variables, do_source, custom_query, custom_variables, output))
{{%/ bannerNote %}}

**Description**

This procedure converts the input geometries into a grid of the specified type and resolution, and enriches it with Data Observatory and custom data. The user must be subscribed to all the Data Observatory datasets involved in the enrichment.

The enrichment operations performed using Data Observatory data and custom data are those described in the [`DATAOBS_ENRICH_GRID`](../data/#dataobs_enrich_grid) and [`ENRICH_GRID`](../data/#enrich_grid) procedures, respectively. Please refer to their definition for more detailed information on the process.

**Input parameters**

* `input_query`: `STRING` query containing the geometries to be gridified and enriched, stored in a column named `geom`. The geometries can be either a set of points, a polygon or a collection of polygons (Polygons or MultiPolygons).
* `grid_type`: `STRING` type of grid. Supported values are "h3", and "quadbin".
* `grid_level`: `INT64` level or resolution of the cell grid. Check the available [H3 levels](https://h3geo.org/docs/core-library/restable/), and [quadbin levels](https://docs.carto.com/analytics-toolbox-bigquery/overview/spatial-indexes/#quadbin).
* `do_variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` variables of the Data Observatory that will be used to enrich the grid cells. For each variable, its slug and the aggregation method must be provided. Use `default` to use the variable’s default aggregation method. Valid aggregation methods are: `sum`, `avg`, `max`, `min`, `count`. The catalog procedure [DATAOBS_SUBSCRIPTION_VARIABLES](../data/#dataobs_subscription_variables) can be used to find available variables and their slugs and default aggregation. It can be set to NULL.
* `do_source`: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `<my-dataobs-project>.<my-dataobs-dataset>` format. If only the `<my-dataobs-dataset>` is included, it uses the project `carto-data` by default. It can be set to `NULL` or `''`.
* `custom_query`: `STRING` query that contains a geography column called `geom` and the columns with the custom data that will be used to enrich the grid cells. It can be set to `NULL` or `''`.
* `custom_variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` list with the columns of the `custom_query` and their corresponding aggregation method (`sum`, `avg`, `max`, `min`, `count`) that will be used to enrich the grid cells. It can be set to NULL.
* `output`: `STRING` containing the name of the output table to store the results of the gridification and the enrichment processes performed by the procedure. The name of the output table should include project and dataset: `project.dataset.table_name`.

**Output**

The output table will contain all the input columns enriched with Data Observatory and custom data for each cell of the specified grid.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.GRIDIFY_ENRICH(
    -- Input query
    'SELECT geom FROM `cartobq.docs.twin_areas_target`',
    -- Grid params: grid type and level
    'quadbin', 15,
    -- Data Observatory enrichment
    [('population_14d9cf55', 'sum')],
    'my-dataobs-project.my-dataobs-dataset',
    -- Custom data enrichment
    '''
    SELECT geom, var1, var2 FROM `my-project.my-dataset.my-data`
    ''',
    [('var1', 'sum'), ('var2', 'sum'), ('var2', 'max')],
    -- Smoothing parameters
    1, 'uniform',
    -- Output table
    'my-project.my-dataset.my-enriched-table'
);
-- The table `my-project.my-dataset.my-enriched-table` will be created
-- with columns: index, population_14d9cf55_sum, var1_sum, var2_sum, var2_max
```

### PREDICT_REVENUE_AVERAGE

{{% bannerNote type="code" %}}
carto.PREDICT_REVENUE_AVERAGE(index, revenue_model, revenue_model_data)
{{%/ bannerNote %}}

**Description**

This procedure is the third and final step of the Revenue Prediction analysis workflow. It predicts the average revenue of an additional store located in the specified grid cell. It requires as input the model data (output of the [`BUILD_REVENUE_MODEL_DATA`](#build_revenue_model_data) procedure) and the trained model (output of the [`BUILD_REVENUE_MODEL`](#build_revenue_model) procedure).

**Input parameters**

* `index`: `STRING` cell index where the new store will be located. It can be an `h3` or a `quadbin` index. For `quadbin`, the value should be cast to string: `CAST(index AS STRING)`. It can also be `'ALL'`, in which case the prediction for all the grid cells of the model data are returned.
* `revenue_model`: `STRING` the fully qualified `model` name.
* `revenue_model_data`: `STRING` the fully qualified `model_data` table name.
* `candidate_data`: `STRING` the fully qualified `candidate_data` table name. It can be set to `NULL`.
* `stores_variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` list with the columns of the `stores_query` and their corresponding aggregation method (`sum`, `avg`, `max`, `min`, `count`) that will be used to enrich the grid cells. It can be set to `NULL`.

**Output**

The procedure will output the `index` and `predicted_revenue_avg` value in the cell, and the same units of the `revenue` column.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CREATE TABLE '<my-project>.<my-dataset>.<output-prefix>_candidate_data'  AS (SELECT 25 store_area);

CALL `carto-un`.carto.PREDICT_REVENUE_AVERAGE(
    '862676d1fffffff',
    '<my-project>.<my-dataset>.<output-prefix>_model',
    '<my-project>.<my-dataset>.<output-prefix>_model_data',
    '<my-project>.<my-dataset>.<output-prefix>_candidate_data',
    [('store_area','sum')]
);
-- index, predicted_revenue_avg
```

{{% euFlagFunding %}}