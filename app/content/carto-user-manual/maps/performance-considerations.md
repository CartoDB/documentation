## Performance considerations

Builder will always try and get the data in the most convenient format for a performant visualization. Depending on the size of the data you are loading as a source in Builder, different mechanisms will be used.

### Small datasets

For small tables and SQL queries, the complete dataset will be loaded client-side, in the browser's memory. This means that no further request to the server is needed when panning the map and moving across different zoom levels. Once loaded, this methods offers very good performance and a very smooth user experience across zoom levels. 

The limits for this mode depend on the type of source and the data warehouse used for the connection: 

|   |**BigQuery**|**Redshift**|**Snowflake**|**Databricks**|**PostgreSQL**|
|---|---|---|---|---|---|
|**Tables**|30MB|30k rows|30MB|30MB|30MB|
|**SQL Queries**|30MB|200k rows|200k rows|200k rows|200k rows|

#### Tips for small datasets performance

* Try and load just the columns that you need for your visualization.
* Aggregating data before visualization helps dealing with big volumes of data.
* Sometimes you won't need very precise geometries, try simplifying them.

### Medium size datasets

For datasets bigger than the limits in the chart above, data needs to be loaded progressively as vector tiles. These tiles will be dynamically generated via SQL, directly from a table in your data warehouse and rendered client-side as you pan the map.

Response times and general performance for dynamic tiles will be different depending on many factors: 
* The size of the table
* The size and complexity of the individual geometries
* The zoom level. The lower the zoom level, the more geometries fit in a single tile and the more costly is the query that needs to be performed.
* The data structure. Different mechanisms such as indexing, clusterization or partitions depending on the data warehouse will help a lot with the execution performance of the queries when generating dynamic tiles. 

#### Feature dropping

When there are a lot of geometries to be included in a tile, CARTO will automatically ignore some of them to make sure that the tile size is kept within reasonable limits for transfering and rendering. This can happen in different scenarios, like: 

* When requesting a tile at a lower zoom level than recommended for the extent of your geometries
* When geometries are very densely distributed
* When geometries are small but very complex

Builder will show an information message when feature dropping is happening, so you will be aware that some features are missing in the map. 

Widget data is calculated client-side with the data that is included in the tiles. Therefore, they will also be affected by feature dropping, and widgets might not show accurate data at certain zoom levels. An info message will appear in this cases. 

#### Tips for medium size datasets performance

* In BigQuery, use clustering by the geometry column to ensure that data is structured in a way that is fast to access. Check out [this documentation page](https://cloud.google.com/bigquery/docs/clustered-tables) for more information. 
In order to create a clustered table out of an existing table with geometries, you can try with something like: 
```sql
CREATE TABLE your_dataset.clustered_table
CLUSTER BY geom
AS 
(SELECT * FROM your_original_table)
```
* In PostgreSQL (with PostGIS), [spatial indexes](http://postgis.net/workshops/postgis-intro/indexing.html) will also help with performance. For example: 

```sql
CREATE INDEX nyc_census_blocks_geom_idx
  ON nyc_census_blocks
  USING GIST (geom);
```
* For other cloud data warehouses, geospatial clustering and/or similar functionality will eventually be added by their providers.

### Large tables

When the dynamic tile generation is not an option due to the table size, the complexity of the geometries, or any other of the possible caveats mentioned before, the best option to achieve a peformant visualization is to generate a tileset. 

Generating a tileset basically means that the table (or SQL query) will be pre-processed and a new table containing all the tiles for a selected zoom range will produced. This method is great for visualization of large volumes of data, and it leverages some advanced functionality from the CARTO Analytics Toolbox available for different cloud data warehouses: 

* Tilesets in [BigQuery](https://docs.carto.com/analytics-toolbox-bigquery/overview/tilesets/)
* Tilesets in [Snowflake](https://docs.carto.com/analytics-toolbox-snowflake/overview/tilesets/)
* Tilesets in [Redshift](https://docs.carto.com/analytics-toolbox-redshift/overview/tilesets/)
* Support for tilesets in PostgreSQL and Databricks is coming soon.

