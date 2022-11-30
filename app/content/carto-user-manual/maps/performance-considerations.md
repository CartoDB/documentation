## Performance considerations

Builder will always try and get the data in the most convenient format for a performant visualization. Depending on the size of the data you are loading as a source in Builder, different mechanisms will be used.

### Small datasets

For small tables, the complete dataset will be loaded client-side, in the browser's memory. This means that no further request to the server is needed when panning the map and moving across different zoom levels. Once loaded, this methods offers very good performance and a very smooth user experience across zoom levels.

The limits for this mode depend on the type of source and the data warehouse used for the connection:

|   |**BigQuery**|**Redshift**|**Snowflake**|**Databricks**|**PostgreSQL**|
|---|---|---|---|---|---|
|**Table size**|30MB|30k rows|30MB|30MB|30MB|

#### Tips for small datasets performance

* Try and load just the columns that you need for your visualization.
* Aggregating data before visualization helps dealing with big volumes of data.
* Sometimes you won't need very precise geometries, try simplifying them.

### Medium size datasets and SQL Queries

For all SQL queries, and datasets bigger than the limits in the chart above, data needs to be loaded progressively as vector tiles. These tiles will be dynamically generated via SQL queries pushed down to your data warehouse and rendered client-side as you pan the map.

Response times and general performance for dynamic tiles will be different depending on many factors:
* The size of the table or query result.
* The size and complexity of the individual geometries.
* The zoom level. The lower the zoom level, the more geometries fit in a single tile and the more costly is the query that needs to be performed.
* The data structure. Different mechanisms such as indexing, clusterization or partitions depending on the data warehouse will help a lot with the execution performance of the queries when generating dynamic tiles.

#### Feature dropping

When there are a lot of geometries to be included in a tile, CARTO will automatically ignore some of them to make sure that the tile size is kept within reasonable limits for transferring and rendering. This can happen in different scenarios, like:

* When requesting a tile at a lower zoom level than recommended for the extent of your geometries
* When geometries are very densely distributed
* When geometries are small but very complex

Builder will show an information message when feature dropping is happening, so you will be aware that some features are missing in the map.

Widget data is calculated client-side with the data that is included in the tiles. Therefore, they will also be affected by feature dropping, and widgets will be deactivated at certain zoom levels. An info message will appear in these cases.

#### Tips for medium size datasets performance

There are optimizations that can be applied to a table to improve query performance and reduce processing cost:

##### BigQuery
Use clustering by the geometry column to ensure that data is structured in a way that is fast to access. Check out [this documentation page](https://cloud.google.com/bigquery/docs/clustered-tables) for more information.
In order to create a clustered table out of an existing table with geometries, you can try with something like:
```sql
CREATE TABLE your_dataset.clustered_table
CLUSTER BY geom
AS
(SELECT * FROM your_original_table)
```

##### Snowflake
The [Search Optimization Service](https://docs.snowflake.com/en/user-guide/search-optimization-service.html#) can help getting faster results when querying geospatial data. In order to profit from this feature, it **needs to be enabled in your Snowflake account**. Additionally, it requires that the table is ordered in a specific way that takes into account the coordinates of each geometry:

```sql
CREATE OR REPLACE TABLE POINTS_SORTED
AS SELECT * FROM POINTS_10M ORDER BY ST_XMIN(geom), ST_YMIN(geom);
```

##### PostgreSQL (with PostGIS)
[Database indexes](http://postgis.net/workshops/postgis-intro/indexing.html) will also help with performance. For example:

```sql
CREATE INDEX nyc_census_blocks_geom_idx
  ON nyc_census_blocks
  USING GIST (geom);
```
For optimal performance, geometries need to be projected into `EPSG:4326` and make sure that the SRID is set for the column. Take a look at the [`ST_Transform`](https://postgis.net/docs/ST_Transform.html) and [`ST_SetSRID`](https://postgis.net/docs/ST_SetSRID.html) functions reference.

##### Redshift

For optimal performance, geometries need to be projected into `EPSG:4326` and make sure that the SRID is set for the column. Take a look at the [`ST_Transform`](https://docs.aws.amazon.com/redshift/latest/dg/ST_Transform-function.html) and [`ST_SetSRID`](https://docs.aws.amazon.com/redshift/latest/dg/ST_SetSRID-function.html) functions reference.

---
For other cloud data warehouses, geospatial clustering and/or similar functionality will eventually be added by their providers.

#### Tips for spatial index tables

Working with spatial indexes has many performance advantages by itself, but there are some optimizations that can be applied to your tables to improve query performance and reduce the processing cost.

##### BigQuery
Clustering the tables by the column containing the spatial index:
```sql
CREATE TABLE table_name CLUSTER BY (h3) AS SELECT h3 from table_name
```
or
```sql
CREATE TABLE table_name CLUSTER BY (quadbin) AS SELECT quadbin from table_name
```
---
##### Snowflake
Clustering the tables by the column containing the spatial index:
```sql
ALTER TABLE table_name CLUSTER BY (h3)
```
or
```sql
ALTER TABLE table_name CLUSTER BY (quadbin)
```
---
##### Databricks
Optimizing the table using `ZORDER BY` expression, like:
```sql
OPTIMIZE table_name  ZORDER BY h3
```
---
##### Redshift
Using the `SORTKEY`:
```sql
ALTER TABLE table_name ALTER SORTKEY (h3);
```
or
```sql
ALTER TABLE table_name ALTER SORTKEY (quadbin);
```
---
##### PostgreSQL
Creating an index and using it to cluster the table:
```sql
CREATE INDEX index_name ON table_name (h3);
```
or
```sql
CREATE INDEX index_name ON table_name (quadbin);
```
and
```sql
CLUSTER table_name USING index_name;
```

### Large tables

When the dynamic tile generation is not an option due to the table size, the complexity of the geometries, or any other of the possible caveats mentioned before, the best option to achieve a performant visualization is to generate a tileset.

Generating a tileset basically means that the table (or SQL query) will be pre-processed and a new table containing all the tiles for a selected zoom range will produced. This method is great for visualization of large volumes of data, and it leverages some advanced functionality from the CARTO Analytics Toolbox available for different cloud data warehouses:

* Tilesets in [BigQuery](https://docs.carto.com/analytics-toolbox-bigquery/overview/tilesets/)
* Tilesets in [Snowflake](https://docs.carto.com/analytics-toolbox-snowflake/overview/tilesets/)
* Tilesets in [Redshift](https://docs.carto.com/analytics-toolbox-redshift/overview/tilesets/)
* Tilesets in [PostgreSQL](https://docs.carto.com/analytics-toolbox-postgres/overview/tilesets/)
* Support for tilesets in Databricks is coming soon.
