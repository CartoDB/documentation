---
aliases:
    - /analytics-toolbox-pg/guides/
    - /analytics-toolbox-pg/guides/running-queries-from-builder/
---

## Running queries from Builder

Once you have created your Postgres connection in the CARTO Workspace (see [_Getting Access_](/analytics-toolbox-postgres/overview/getting-started) for details), you can create custom SQL layers in Builder that make use of the Analytics Toolbox for Postgres.

To get started, let's run a simple example query to subdivide the area into Quadbin grid cells using the [`QUADBIN_POLYFILL`](/analytics-toolbox-postgres/sql-reference/quadbin/#QUADBIN_POLYFILL) function from the _quadbin_ module.

1. Click on the _Add source from_ button in Builder, that can be found at the bottom left of the screen.

<div style="text-align:center" >
<img src="/img/pg-analytics-toolbox/guides/layer_choose_postgres_connection.png" alt="Choosing a connection" style="width:100%">
</div>

2. Select the second tab _Custom Query (SQL)_ and pick the Postgres connection that you will use to run the query. Please make sure this connection has access to the Analytics Toolbox database.

<div style="text-align:center" >
<img src="/img/pg-analytics-toolbox/guides/builder_custom_query_option_pg.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

3. Click on _Add source_. A SQL console will be displayed.

<div style="text-align:center" >
<img src="/img/pg-analytics-toolbox/guides/builder_custom_query_console_pg.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

4. Copy and paste the following query: 

```sql
WITH data AS(
select 'New York' as city, ST_POINT(-74.00597, 40.71427) as geom 
union all select 'Boston', ST_POINT(-71.05977, 42.35843) 
union all select 'Philadelphia',ST_POINT(-75.16379, 39.95233) 
union all select 'Washington',ST_POINT(-77.03637, 38.89511)
)
SELECT carto.QUADBIN_FROMGEOGPOINT((geom),9) as quadbin from data
```
You can also take advantage of the function directly from a table from your database and combine it with other functions, such as the `QUADBIN_BOUNDARY` function, to get the geography boundary for a given quadbin:

```sql
WITH data as (SELECT geom
FROM mydatabase.myschema.table),
quadbins as (
SELECT carto.QUADBIN_POLYFILL(geom
, 14) quadbins_polyfill from data
)
SELECT carto.QUADBIN_BOUNDARY(unnest(quadbins_polyfill)) as geom from quadbins
```

5. Run the first query. In this example we will showcase how to get the quadbin representationat at resolution level 9 for the geographic coordinates of four US cities dusing the `QUADBIN_POLYFILL` function. 

<div style="text-align:center" >
<img src="/img/pg-analytics-toolbox/guides/builder_custom_query_quadbin_polyfill-pg.png" alt="Picking a connection to run a custom query" style="width:100%">
</div>

{{% bannerNote title="MORE EXAMPLES" type="note" %}}
For more examples, visit the [Examples](/analytics-toolbox-postgres/examples/) section or try executing any of the queries included in every function definition in the [SQL Reference](/analytics-toolbox-postgres/sql-reference).
{{%/ bannerNote %}}