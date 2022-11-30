## SQL Analyses

CARTO Builder offers a UI that helps building SQL queries to perform geospatial analysis operations.

To get started with SQL Analysis, add a source to your Builder map and click on the three dots to find the *Add SQL Analysis* option:

![](/img/cloud-native-workspace/maps/add_sql_analysis.png)
After that, you will see a list of analyses compatible with your source. Compatibility depends on some factors, like whether or not the CARTO Analytics Toolbox is needed, or the connection's cloud data warehouse.

![](/img/cloud-native-workspace/maps/add_sql_analysis_panel.png)

Check this table to find out which analyses are available for each data warehouse:

|   |**BigQuery**|**CARTO DW**|**Redshift**|**Snowflake**
|---|---|---|---|---|
|**Intersect and Aggregate**|✅|✅|✅|
|**Create buffers**|✅|✅||
|**Add column from second source**|✅|✅|✅|✅
|**Filter by column value**|✅|✅|✅|✅
|**Calculate Centroids**|✅|✅|✅|✅
|**Clustering K-Means**|✅ (\*)|✅||
|**Trade Areas**|✅ (\*)|✅|✅ (\*)|✅ (\*)

_(*) Requires the CARTO Analytics Toolbox to be installed_

---
Each analysis will create a SQL query that performs the geospatial operation. These SQL queries will use [CTEs (Common Table Expressions)](https://en.wikipedia.org/wiki/Hierarchical_and_recursive_queries_in_SQL#Common_table_expression) to be able to chain different analyses and create a more complex sequence.

<!-- TO DO copy SQL query -->

The resulting SQL queries from each analysis will take into account the syntax, specific functions and other nuances between different cloud data warehouses.

The resulting SQL query can be loaded in the map in different ways:

* **Run SQL analysis** will load the query as a SQL Query source in Builder immediately.
* **Preview SQL analysis query** will load the query in the SQL panel in Builder, so you will be able to review and modify the query before running it.
* **Save results in a new table** will let you select the destination of a table that will contain the result of the query. The table will then be loaded as a source to the map.

The following are the currently available SQL analysis:

### Intersect and aggregate
This analysis allows to perform a geospatial intersection between two different sources, aggregating data from the second source into the base one, when geometries from the second source intersect with geometries in the base source.

The result of this SQL analysis includes all columns from the base source and an extra one, called `agg_value`, that contains the aggregated data from the features in the second source that intersect with each row in the base source.

![](/img/cloud-native-workspace/maps/parameters_intersect_and_aggregte.png)

**Parameters**
* **Second source:** pick an existing source from your map, or a table from your cloud data warehouse to be used as the second source for this analysis
* **Aggregation operation:** select the operation to aggregate the data from the second source.
* **Aggregation column:** select the column from the second source that will be aggregated.

**Example**

A very common use case for this SQL Analysis would be _"Get the average revenue from all stores in each neighborhood"_. In this hypothetical scenario:
* a table containing the polygon geometries for each neighborhood would be the **base source**.
* a table containing the point geometries of each store would be the **second source**.
* the aggregation operation would be the **average** (`AVG`).
* the aggregation column would be the one that contains the **revenue** in the stores table.

### Add column from second source

This analysis allows creating a `LEFT JOIN` SQL query, allowing to include columns from both base and second source to be included in the result.

![](/img/cloud-native-workspace/maps/parameters_add_column_from_2ndsource.png)

**Parameters**
* **Key columns:** For each source, a key column needs to be selected. This column will be used to join the rows from the base and second source that share the same value.
* **Columns to be included in the result:** Select the columns from each source that will be included in the result.

### Filter by column value

This analysis allows to keep or discard rows based on a column value.

![](/img/cloud-native-workspace/maps/parameters_filter_by_column.png)

**Parameters**

* **Target column:** Select the column that we'll be used for the filter.
* **Filter operator:** Select a type of filter from the list of available operators.
* **Values:** Use the selector to configure your filter.

### Create buffers

This analysis creates a distance buffer around your existing geometries. It works with points, lines and polygons, and the resulting geometry will always be polygons.

![](/img/cloud-native-workspace/maps/parameters_create_buffer.png)

**Parameters**

* **Distance:** Select the distance that will be used to create the buffers.
* **Tracts:** Select the number of concentric buffers that will be created.
* **Individual/Combined result:** Select between having an individual buffer created for each row, or combine them all in a single polygon.


### Compute centroids

This analysis will produce a point that represent the centroid of the geometries in your source. By default, it will produce a single point. Using the _Categorize_ optional parameter we can get a centroid per category in the dataset.

![](/img/cloud-native-workspace/maps/parameters_compute_centroids.png)

**Parameters**
* **Categorize:** Select a column that contains categories to create one centroid per category in your dataset.
* **Aggregation:** Aggregate data from the original dataset into the resulting centroids. The result of the analysis will include a column `aggregated_value` that contains the value of the aggregation.
  * Aggregation Operation: Select an aggregation operation from the list.
  * Aggregation Column: Select a column to be aggregated.

### K-Means Clustering

This analysis uses the [`ST_CLUSTERKMEANS`](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/clustering/#st_clusterkmeans) function from the CARTO Analytics Toolbox for BigQuery, taking a set of points and finding a defined number of clusters based on the k-means algorithim. It generates a `cluster_no` column that indicates the cluster that each point belongs to.

![](/img/cloud-native-workspace/maps/k_means_clustering.png)


**Parameters**
* **Number of clusters:** Define the number of clusters that will be

This analysis can be performed safely with up to \~700K rows. Bigger sources can cause the resulting SQL query to hit some limits BigQuery.

### Trade Areas

This analysis leverages the `CREATE_ISOLINES` function in the CARTO Analytics Toolbox for [BigQuery](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/lds/#create_isolines), [Snowflake](https://docs.carto.com/analytics-toolbox-snowflake/sql-reference/lds/#create_isolines) and [Redshift](https://docs.carto.com/analytics-toolbox-redshift/sql-reference/lds/#create_isolines) to generate time or distance isolines based on different modes of transportation.

The input source for this analysis should contain point geometries that will be taken as the origin point for the isoline generation.

This SQL Analysis is available for BigQuery, Snowflake and Redshift connections, and it requires a specific minimum version of the CARTO Analytics Toolbox Advanced module to be installed:
* Snowflake: `2022.06.09`
* Redshift: `2022.06.07`

The result from this analysis can only be saved as a new table.

![](/img/cloud-native-workspace/maps/parameters_trade_areas.png)

**Parameters**

* **Mode:** Define the transportation mode that will be used for the isoline computation.
* **Range Type:** Define the type of range that will be be used for the isoline computation:
  * Distance: The resulting isoline will describe the area that can be covered by traveling a specific distance set in meters.
  * Time: The resulting isoline will describe the area that can be covered by traveling during a specific time set in seconds.
