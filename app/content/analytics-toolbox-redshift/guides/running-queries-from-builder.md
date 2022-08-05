---
aliases:
    - /analytics-toolbox-rs/guides/
    - /analytics-toolbox-rs/guides/running-queries-from-builder/
---

## Running queries from Builder

Once you have created your Redshift connection in the CARTO Workspace (see [_Getting Access_](/analytics-toolbox-redshift/overview/getting-access) for details), you can create custom SQL layers in Builder that make use of the Analytics Toolbox for Redshift.

To get started, let's run a simple example query to compute the paths that interconnect a set of points using the [`ST_GREATCIRCLE`](/analytics-toolbox-redshift/sql-reference/transformations/#st_greatcircle) function from the _transformations_ module.

1. Click on the _Add source from_ button in Builder, that can be found at the bottom left of the screen.

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/layer_choose_rs_connection.png" alt="Choosing a connection" style="width:100%">
</div>

2. Select the second tab _Custom Query (SQL)_ and pick the Snowflake connection that you will use to run the query. Please make sure this connection has access to the Analytics Toolbox database.

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/builder_custom_query_option_rs.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

3. Click on _Add source_. A SQL console will be displayed.

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/builder_custom_query_console_rs.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

4. Copy and paste the following query: 

```sql
WITH data AS(
   select  'JKF' as iata, 'John_F_Kennedy_International_Airport' as name, ST_POINT(-73.77890, 40.63980) as geom 
   union all select 'LAX','Los_Angeles_International_Airport', ST_POINT(-118.40800,33.94250) 
   union all select 'SEA','Seattle_Tacoma_International_Airport',ST_POINT(-122.30900,47.44900) 
   union all select 'MIA','Miami_International_Airport',ST_POINT(-80.29060,25.79320)
)
SELECT carto.ST_GREATCIRCLE(t1.geom, t2.geom, 25) AS geom
FROM data AS t1
CROSS JOIN data AS t2
WHERE t1.iata != t2.iata
```
You can also take advantage of this function directly from a table from your database.

```sql
WITH data AS(
    SELECT *
    FROM mydatabase.myschema.table
)
SELECT carto.ST_GREATCIRCLE(t1.geom, t2.geom, 25) AS geom
FROM data AS t1
CROSS JOIN data AS t2
WHERE t1.column != t2.column
```

5. Run the first query. In this example we will showcase how easily we can compute all the paths that interconnect the main four US airports using the Analytics Toolbox.

<div style="text-align:center" >
<img src="/img/rs-analytics-toolbox/guides/builder_custom_query_greatcircle-rs.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

This query first creates all the possible combinations between airports and then generates the paths between them using the `ST_GREATCIRCLE` function. The resulting paths contain 25 points, but you can set the number of points in order to make the lines smoother if needed.

{{% bannerNote title="MORE EXAMPLES" type="note" %}}
For more examples, visit the [Examples](/analytics-toolbox-redshift/examples/) section or try executing any of the queries included in every function definition in the [SQL Reference](/analytics-toolbox-redshift/sql-reference).
{{%/ bannerNote %}}