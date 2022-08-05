---
aliases:
    - /analytics-toolbox-sf/guides/
    - /analytics-toolbox-sf/guides/running-queries-from-builder/
---

## Running queries from Builder

Once you have gained access to the Analytics Toolbox through the Snowflake Data Marketplace (see [_Getting Access_](/analytics-toolbox-snowflake/overview/getting-access) for details), you can create custom SQL layers in Builder that make use of any of the available spatial functions.

To get started, let's run a simple example query to cluster a set of points using the [`ST_CLUSTERKMEANS`](/analytics-toolbox-snowflake/sql-reference/clustering/#st_clusterkmeans) function from the _clustering_ module.

1. Click on the _Add source from_ button in Builder, that can be found at the bottom left of the screen.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/layer_choose_sf_connection.png" alt="Choosing a connection" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/tileset_layer_choose_sf_connection.png" alt="Choosing a connection" style="width:100%">
</div> -->

2. Select the second tab _Custom Query (SQL)_ and pick the Snowflake connection that you will use to run the query. Please make sure this connection has access to the Analytics Toolbox database.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/builder_custom_query_option_sf.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/builder_custom_query_option-sf.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>
 -->
3. Click on _Add source_. A SQL console will be displayed.

<div style="text-align:center" >
<img src="/img/sf-analytics-toolbox/guides/builder_custom_query_console_sf.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

<!-- <div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/builder_custom_query_console.png" alt="Picking a connection to run a custom query" style="width:100%">
</div> -->

4. Copy and paste the following query:

```sql
WITH data AS(
  SELECT geog
  FROM sfcarto.public.starbucks_locations_usa
  WHERE geog IS NOT null
  ORDER BY id
),
clustered_points AS
(
    SELECT sfcarto.clustering.ST_CLUSTERKMEANS(ARRAY_AGG(ST_ASGEOJSON(geog)::STRING), 8) AS cluster_arr
    FROM data
)
SELECT GET(VALUE, 'cluster') AS cluster, TO_GEOGRAPHY(GET(VALUE, 'geom')) AS geom
FROM clustered_points, lateral FLATTEN(input => cluster_arr)
```

5. Run the query. This query computes eight clusters from the points of the `starbucks_locations_usa` table, provided as sample data within the Analytics Toolbox. As a result, each point is assigned a `cluster` ID.

6. Style the layer by the `cluster` attribute.

![Map add query](/img/sf-analytics-toolbox/guides/builder_custom_query_clustering-sf_new.png)


{{% bannerNote title="MORE EXAMPLES" type="note" %}}
For more examples, visit the [Examples](/analytics-toolbox-snowflake/examples/) section or try executing any of the queries included in every function definition in the [SQL Reference](/analytics-toolbox-snowflake/sql-reference).
{{%/ bannerNote %}}