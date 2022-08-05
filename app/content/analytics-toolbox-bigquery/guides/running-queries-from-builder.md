---
aliases:
    - /analytics-toolbox-bq/guides/running-queries-from-builder/
---
## Running queries from Builder

Once you have created your BigQuery connection in the CARTO Workspace (see [_Getting Access_](/analytics-toolbox-bigquery/overview/getting-access/#access-from-carto-workspace/) for details), you can create custom SQL layers in Builder that make use of the Analytics Toolbox for BigQuery.

{{% bannerNote title="From the CARTO Data Warehouse connection" type="tip" %}}
You can also run queries from Builder using the Analytics Toolbox for BigQuery from your CARTO Data Warehouse connection. This connection is available and ready-to-use for all CARTO accounts.
{{%/ bannerNote %}}

The Analytics Toolbox functions are available from the `carto-un` and `carto-un-eu` BigQuery projects. These projects are deployed in the US and EU multi-regions, respectively, and you may choose one or the other depending on the location of your data. 

To get started, let's run a simple example query to cluster a set of points using the [`ST_CLUSTERKMEANS`](/analytics-toolbox-bigquery/sql-reference/clustering/#st_clusterkmeans) function. 

1. Click on the _Add source from_ button in Builder, that can be found at the bottom left of the screen.

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/tiler/the_tileset_layer_choosing_connection.png" alt="Choosing a connection" style="width:100%">
</div>

2. Select the second tab _Custom Query (SQL)_ and pick the BigQuery or CARTO Data Warehouse connection that you will use to run the query.

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/the_builder_custom_query_option.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

3. Click on _Add source_. A SQL console will be displayed.

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/the_builder_custom_query_console.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

4. Copy and paste the following query:

```sql
with clustered_points AS
(
    SELECT `carto-un`.carto.ST_CLUSTERKMEANS(ARRAY_AGG(geom ignore nulls), 6) AS cluster_arr
    FROM carto-demo-data.demo_tables.sample_customer_home_locations
)

SELECT cluster_element.cluster, cluster_element.geom AS geom FROM clustered_points, UNNEST(cluster_arr) AS cluster_element
```

5. Run the query. This query computes five clusters from the points of the `sample_customer_home_locations` table. As a result, each point is assigned a `cluster` ID. 

6. Style the layer by the `cluster` attribute.

![Map add query](/img/cloud-native-workspace/maps/the_map_custom-query-analytics-toolbox-clustering.png)


{{% bannerNote title="MORE EXAMPLES" type="note" %}}
For more examples, visit the [Examples](/analytics-toolbox-bigquery/examples/) section or try executing any of the queries included in every function definition in the [SQL Reference](/analytics-toolbox-bigquery/sql-reference).
{{%/ bannerNote %}}

{{% euFlagFunding %}}
