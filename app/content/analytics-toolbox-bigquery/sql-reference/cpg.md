---
aliases:
    - /analytics-toolbox-bq/sql-reference/cpg/
---

## cpg

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains procedures to perform spatial analysis to solve specific use-cases for the Consumer Packaged Goods (CPG) industry, such as customer segmentation.


### GENERATE_TRADE_AREAS

{{% bannerNote type="code" %}}
carto.GENERATE_TRADE_AREAS(customers_query, method, options, output_prefix)
{{%/ bannerNote %}}

**Description**

This procedure generates the trade areas for each location specified based on the method and the options provided. Four methods are available: `buffer`, `kring-h3`, `kring-quadbin` and `isoline`. For the `isoline` method, the use of this procedure requires providing authorization credentials. Two parameters are needed: api_base_url and lds_token. Both the API Base URL and your LDS Token can be found in the Developers section of the CARTO user interface. Please check the following documentation page for more details: <https://docs.carto.com/carto-user-manual/developers/carto-for-developers/>

**Input parameters**

* `customers_query`: `STRING` query with store id and location. It must contain the columns `store_id` (store unique id) and `geom` (the geographical point of the store). The values of these columns cannot be `NULL`.
* `method`: `STRING` indicates the method of trade area generation. Four options available: `buffer`, `kring-h3`, `kring-quadbin` and `isoline`. This method applies to all locations provided.
* `options`: `JSON` A JSON string containing the required parameters for the specified method. For `buffer`: {`buffer`: radius - `FLOT64`}, `kring-h3`:{`resolution`: resolution-`INT64`, `kring`:number of layers - `INT64`}, `kring-quadbin` : {`resolution`: zoom level - `INT64`, `kring`:number of layers - `INT64`}, `isoline` : {`mode`: type of transport. Supported: 'walk', 'car' - `STRING`, `time`: range of the isoline in seconds  - `INT64`, `api_base_url` :  url of the API where the customer account is stored -  `STRING`, `lds_token`: customer's token for accessing the different API services - `STRING`}.
* `output_prefix`: `STRING` the prefix for each table in the output destination.

**Output**

This procedure will output one table:

* Table containing the `store_id`, `geom`, `method`, `options`. The output table can be found at the output destination with name `<output-prefix>_output`. Overall path `<my-project>.<my-dataset>.<output-prefix>_trade_areas`.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.GENERATE_TRADE_AREAS(
    --customers_query
    '''SELECT store_id, geom, FROM `<project>.<dataset>.<table_name_with_stores>`''',
    --method
    'buffer',
    --options
    "{'buffer':500.0}",
    --output_prefix
    '<my-project>.<my-dataset>.<output-prefix>'
);
```


### CUSTOMER_SEGMENTATION_ANALYSIS_DATA

{{% bannerNote type="code" %}}
carto.CUSTOMER_SEGMENTATION_ANALYSIS_DATA(customers_query, do_variables, do_source, custom_variables, custom_query, output_prefix)
{{%/ bannerNote %}}

**Description**

This procedure prepares the "data table" to be fed into [`RUN_CUSTOMER_SEGMENTATION`](#run_customer_segmentation). It takes as input a set of locations along with optional preprocessed features, and either it further enriches these locations with new features from "Data Observatory subscriptions" or custom features "from the user's own tables", and then performs descriptives analysis, correlation analyis on the features and produces three "output" tables:

* A table with the data to fed into the next procedure, with store_id, geom and all the features that will be considered for the segmentation.
* Correlation table, where the Pearson correlation between each pair of features is included.
* Descriptives table, where the `count`, `mean`, `std`, `min`, 10th, 25th, 50th, 75th, 90th percentiles, and `max` values per features are included.

**Input parameters**

* `customers_query`: `STRING` query with store id and location and any optional preprocessed feature. It must contain the columns `store_id` (store unique id) and `geom` (the geographical point of the store). The values of these columns cannot be `NULL`.
* do_variables: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` variables of the Data Observatory that will be used to enrich the provided trade areas of each location. For each variable, its slug and the aggregation method must be provided. Use 'default' to use the variable's default aggregation method. Valid aggregation methods are: sum, avg, max, min, count. The catalog procedure [`DATAOBS_SUBSCRIPTION_VARIABLES`](#dataobs_subscription_variables) can be used to find available variables and their slug ids and default aggregation methods. It can be set to `NULL`.
* do_source: `STRING` name of the location where the Data Observatory subscriptions of the user are stored, in `<my-dataobs-project>.<my-dataobs-dataset>` format. If only the `<my-dataobs-dataset>` is included, it uses the project carto-data by default. It can be set to `NULL` or ''.
* `custom_variables`: `ARRAY<STRUCT<variable STRING, aggregation STRING>>` list with the columns of the `custom_query` and their corresponding aggregation method (`sum`, `avg`, `max`, `min`, `count`) that will be used to enrich the provided trade areas of each location. It can be set to `NULL`.
* `custom_query`: `STRING` query that contains a geography column `geom` and the columns with the custom data that will be used to enrich the provided trade areas of each location. It can be set to `NULL` or `''`.
* `output_prefix`: `STRING` the prefix for each table in the output destination.

**Output**

This procedure will output three tables:

* Table containing the `store_id`, `geom` and all features to be considered for the segmentation (i.e. pre-processed, from DO subscription, or features from other tables included by the user). The output table can be found at the output destination with name `<output-prefix>_enrich`. Overall path `<my-project>.<my-dataset>.<output-prefix>_enrich`.
* Table containing the correlation amongst features. Three columns, `feature 1`, `feature 2` and `correlation` between feature 1 and feature 2. The output table can be found at the output destination with name `<output-prefix>_correlation`. Overall path `<my-project>.<my-dataset>.<output-prefix>_correlation`.
* Table containing the descriptive statistics of the features. For each feature the `count`, `mean`, `std`, `min`, 10th, 25th, 50th, 75th, 90th percentiles and `max` values are calculated. The output table can be found at the output destination with name `<output-prefix>_descriptives`. Overall path `<my-project>.<my-dataset>.<output-prefix>_descriptives`.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.CUSTOMER_SEGMENTATION_ANALYSIS_DATA(
  R'''
  SELECT store_id, geom, feature_1, feature_2 ... FROM `<project>.<dataset>.<table_name_with_stores>`
  ''',
  -- Data Observatory enrichment
    [('POPCY_4534fac4', 'sum'), ('INCCYPCAP_7c8377cf', 'avg')],
    '<my-dataobs-project>.<my-dataobs-dataset>',
    -- Custom data enrichment
    [('var1', 'sum'), ('var2', 'avg')],
    '''SELECT var1, var2, geom FROM `<project>.<dataset>.custom_data`''',
  '<my-project>.<my-dataset>.<output-prefix>'
);
```


### RUN_CUSTOMER_SEGMENTATION

{{% bannerNote type="code" %}}
carto.RUN_CUSTOMER_SEGMENTATION(customers_data_table, number_of_clusters, pca_explain_ratio, output_prefix)
{{%/ bannerNote %}}

**Description**

This procedure is the final step of the Customer Segmentation workflow, and it uses the output from the  [`CUSTOMER_SEGMENTATION_ANALYSIS_DATA`](#customer_segmentation_analysis_data). The function performs clustering (KMeans algorithm) and clusterizes the stores into a number of clusters. Multiple number of clusters - cases can be defined. The clustering is either performed directly on the input data or the capability of performing Principal Component Analysis (PCA) on the input data first exists. If PCA is enabled then the input data are firstly passed into PCA having been standardized, in order to remove multicolinearity or correlation amongst features, and the output of the PCA is passed into the KMeans. If PCA is not enabled, then the input data are standardized and then passed to the KMeans algorithm. The input to this function consists of the output table from the aformentioned function, the enrich table, a list with the options for the number of clusters, the variance explainability ratio for PCA and the output_perfix.  As output, the function produces the following tables:

* A table with the `store_id`, `geom`, the number of clusters on that scenario/case, and the cluster the store belongs to.
* A table with descriptives statistics of each feature for each scenario of different number of clusters and the specific cluster of the store.
* A table with statistics of the KMeans performance for each number of clusters.

**Input parameters**

* `customers_data_table`: `STRING` table, output from [`CUSTOMER_SEGMENTATION_ANALYSIS_DATA`](#customer_segmentation_analysis_data) which contains `store_id`, `geom`, and features values.
* `number_of_clusters`: `ARRAY<INT64>` list with number of clusters to perform the segmentation. It can be regarded as the different number of cases for segmentation.
* `pca_explain_ratio`: `FLOAT64` of the explained variance retained in the PCA analysis. It defaults to 0.9. If 0 or `NULL` is passed then PCA is not enabled and the raw data are passed into the clustering algorithm.
* `output_prefix`: `STRING` the prefix for each table in the output destination.

**Output**

This procedure will output three tables:

* Table containing the `store_id`, `geom`, one column per scenario (number of clusters), in which the cluster the store belongs to is included for this scenario. The output table can be found at the output destination with name `<output-prefix>_clusters`. Overall path `<my-project>.<my-dataset>.<output-prefix>_clusters`.
* Table containing statistics of the clusterings. It contains the davies bouldin index and  mean squared distance for each case, scenario - number of clusters. The output table can be found at the output destination with name `<output-prefix>_clusters_stats`. Overall path `<my-project>.<my-dataset>.<output-prefix>_clusters_stats`.
* Table containing the descriptive statistics for each scenario (number of clsuters). Eleven columns, scenario (number of clusters), cluster value, count, mean, std, min, 10,25, 50, 75, 90 percentiles and max values. The output table can be found at the output destination with name `<output-prefix>_clusters_descr`. Overall path `<my-project>.<my-dataset>.<output-prefix>_clusters_descr`.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.RUN_CUSTOMER_SEGMENTATION(
    '<project>.<dataset>.<table_name_with_stores>_enrich',
    [4,5],
    0.9,
    '<my-project>.<my-dataset>.<output-prefix>'
);
```


### FIND_SIMILAR_LOCATIONS

{{% bannerNote type="code" %}}
carto.FIND_SIMILAR_LOCATIONS(origin_query, target_query, index_column, pca_explained_variance_ratio, max_results, output_prefix)
{{%/ bannerNote %}}

**Description**

Procedure to obtain the similar locations for a given location (origin) on a set of external variables. These similar locations are selected from a set of candidates (target locations), that can be stores, restaurants, etc. Internally it works just like the [`FIND_TWIN_AREAS`](../retail/#find_twin_areas) function, so please refer to its documentation for further examples and details of the implementation.

The output similar locations are those of the target candidates considered to be the most similar to the origin locations, based on the values of a set of variables. Only variables with numerical values are supported. Both origin and target locations should be uniquely identified by an index column.

This procedure expects to receive features that characterize each of the locations, for which we recommend taking into account:

- [`carto.GENERATE_TRADE_AREAS`](#generate_trade_areas) procedure to generate different types of service areas for both origin and target locations,
- [`carto.ENRICH_POLYGONS`](../data/#enrich_polygons) or [`carto.DATAOBS_ENRICH_POLYGONS`](../data/#dataobs_enrich_polygons) procedure to enrich the defined trade areas resulting in the format expected for this procedure.

**Input**

- `origin_query`: `STRING` query to provide the origin location (identified with its `index_column` value) and its associated data columns. No `NULL` values should be contained in any of the data columns provided.
- `target_query`: `STRING` query to provide the target locations (uniquely identified by `index_column`) and their associated data columns, e.g. `SELECT * FROM <project>.<dataset>.<target_table>`. The data columns should be equal to those provided in the `origin_query`, otherwise the procedure will fail. Locations with any `NULL` values will be excluded from the analysis.
- `index_column`: `STRING` name of the index column for both the `origin_query` and the `target_query`. This index has to uniquely identify each of the individual locations in the queries.
- `pca_explained_variance_ratio`: `FLOAT64` of the explained variance retained in the PCA analysis. It defaults to 0.9 if set to`NULL`.
- `max_results`: `INT64` of the maximum number of similar locations returned. If set to `NULL`, all target locations are returned.
- `output_prefix`: `STRING` destination and prefix for the output tables. It must contain the project, dataset and prefix: `<project>.<dataset>.<prefix>`.

**Output**

The procedure outputs the following:

- Similar locations model, named `<project>.<dataset>.<prefix>_model`. Please note that the model computation only depends on the `target_query` and therefore the same model can be used if the procedure is re-run for a different `origin_query`. To allow for this scenario in which the model is reused, if the output model already exists, it won't be recomputed. To avoid this behavior, simply choose a different `<prefix>` in the `output_prefix` parameter.

- Results table, named `<project>.<dataset>.<prefix>_<origin_index>_results`, containing in each row the index of the target locations (`index_column`) and its associated `similarity_score` and `similarity_skill_score`. The `similarity_score` corresponds to the distance between the origin and target location: the `similarity_skill_score` for a given target locations `*t*` is computed as `1 - similarity_score(*t*) / similarity_score(<*t*>)`, where `<*t*>` is the average target location, computed by averaging each feature for all the target locations. This `similarity_skill_score` represents a relative measure: the score will be positive if and only if the target location is more similar to the origin than the mean vector data, with a score of 1 meaning perfect matching or zero distance. Therefore, a target location with a larger score will be more similar to the origin under this scoring rule.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.FIND_SIMILAR_LOCATIONS(
    -- Origin location
    """
        SELECT * FROM `cartobq.docs.similar_locations_enriched`
        WHERE location_id = '001'
    """,
    -- Target locations (candidates)
    """
        SELECT * FROM `cartobq.docs.similar_locations_enriched`
        WHERE location_id <> '001'
    """,
    -- Similar locations model inputs
    'location_id',
    0.90,
    NULL,
    'my-project.my-dataset.my-prefix'
);
-- Table `<my-project>.<my-dataset>.<output-prefix>_{ID}_results` will be created
-- with the column: location_id, similarity_score, similarity_skill_score
```


### FIND_SIMILAR_LOCATIONS_WEIGHTED

{{% bannerNote type="code" %}}
carto.FIND_SIMILAR_LOCATIONS_WEIGHTED(origin_query, target_query, index_column, weights, max_results, output_prefix)
{{%/ bannerNote %}}

**Description**

Procedure to obtain the similar locations for a given location (origin) on a set of weighted external variables. These similar locations are selected from a set of candidates (target locations), that can be stores, restaurants, etc. The function is similar to the [`FIND_SIMILAR_LOCATIONS`](#find_similar_locations), but it includes user-defined weights for the variables. Internally it works just like the [`FIND_TWIN_AREAS_WEIGHTED`](../retail/#find_twin_areas_weighted) function, so please refer to its documentation for further examples and details of the implementation.

The output similar locations are those of the target query considered to be the most similar to the origin location, based on the values of a set of variables. Only variables with numerical values are supported. Both origin and target locations should be uniquely identified by an index column.

This procedure expects to receive features that characterize each of the locations, for which we recommend taking into account:

- [`carto.GENERATE_TRADE_AREAS`](#generate_trade_areas) procedure to generate different types of service areas for both origin and target locations,
- [`carto.ENRICH_POLYGONS`](../data/#enrich_polygons) or [`carto.DATAOBS_ENRICH_POLYGONS`](../data/#dataobs_enrich_polygons) procedure to enrich the defined trade areas resulting in the format expected for this procedure.

**Input**

- `origin_query`: `STRING` query to provide the origin location (identified with its `index_column` value) and its associated data columns. No `NULL` values should be contained in any of the data columns provided.
- `target_query`: `STRING` query to provide the target locations (uniquely identified by `index_column`) and their associated data columns, e.g. `SELECT * FROM <project>.<dataset>.<target_table>`. The data columns should be equal to those provided in the `origin_query`, otherwise the procedure will fail. Locations with any `NULL` values will be excluded from the analysis.
- `index_column`: `STRING` name of the index column for both the `origin_query` and the `target_query`. This index has to uniquely identify each of the individual locations in the queries.
- `weights`: `ARRAY<STRUCT<name STRING, value FLOAT64>>` the weights on the features. If set to `NULL`, then all features are treated equally. This parameter is considered only if the length of weights is greater or equal than one. The sum of weights must be less than or equal to 1. If less weights than the number of features are provided, then for the undefined features, the remaining 1 - sum(weights) is distributed evenly.
- `max_results`: `INT64` of the maximum number of similar locations returned. If set to `NULL`, all target locations are returned.
- `output_prefix`: `STRING` destination and prefix for the output tables. It must contain the project, dataset and prefix: `<project>.<dataset>.<prefix>`.

**Output**

The procedure outputs the following:

- Results table, named `<project>.<dataset>.<prefix>_<origin_index>_results`, containing in each row the index of the target locations (`index_column`) and its associated `similarity_score` and `similarity_skill_score`. The `similarity_score` corresponds to the distance between the origin and target location taking into account the user defined weights; the `similarity_skill_score` for a given target location `*t*` is computed as `1 - similarity_score(*t*) / similarity_score(<*t*>)`, where `<*t*>` is the average target location, computed by averaging each feature for all the target locations. This `similarity_skill_score` represents a relative measure: the score will be positive if and only if the target location is more similar to the origin than the mean vector data, with a score of 1 meaning perfect matching or zero distance. Therefore, a target location with a larger score will be more similar to the origin under this scoring rule.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-un`.carto.FIND_SIMILAR_LOCATIONS_WEIGHTED(
    """
        SELECT * FROM `cartobq.docs.similar_locations_enriched`
        WHERE location_id = '001'
    """,
    -- Target locations (candidates)
    """
        SELECT * FROM `cartobq.docs.similar_locations_enriched`
        WHERE location_id <> '001'
    """,
    -- Similar locations model inputs
    'location_id',
    NULL,
    NULL,
    'my-project.my-dataset.my-prefix'
);
-- Table `<my-project>.<my-dataset>.<output-prefix>_{ID}_results` will be created
-- with the column: location_id, similarity_score, similarity_skill_score
```


{{% euFlagFunding %}}