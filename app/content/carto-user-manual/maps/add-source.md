## Add source

When you open a map, the *Layers* tab will appear on the left side panel. There you can add data as layers to the map by clicking on "Add source from", where you can access the contents from your existing data warehouse connections. If you haven’t added a data layer to the map yet, you will see the following page:

![Add source to your map](/img/cloud-native-workspace/maps/map_add_source_to_your_map.png)

### Add source from a connection

From the *Layers* tab, go to the *Sources* panel and click on *Add source from...*. A new dialog screen will open allowing you to select a table or a tileset from on of your connections. Insert the *Fully Qualified Table* or the *Tileset Name* and click *Add source*.

![Add source select a connection](/img/cloud-native-workspace/maps/map_add_source_select_a_connection.png)

![Add source select a table](/img/cloud-native-workspace/maps/map_add_source_table.png)

Once the process is finished, the table or tileset is included in the Builder map as a new layer. The map displays the basemap and the new layer on top. You can add additional layers, or start applying styling and analysis features.
	
![Map created](/img/cloud-native-workspace/maps/map_created.png)

Once you have added your datasets to the map, you can visualize the data table. Click on the three dots icon, select *Show data table* and your dataset table will be displayed. 

![Map source options view data table](/img/cloud-native-workspace/maps/map_source_options.png)

By clicking the *tree dots* icon the Column Context menu will reveal additional options such as: Sort on this column, ascending or descending, Pin the column so you can freeze it in the first position, and copy column data.

![Map table column](/img/cloud-native-workspace/maps/map_table_column.png)

Once you have added your datasets to the map, you can always add a new layer or delete the source. Click on the three dots icon and select *Add layer* or *Delete source*.

![Map source options delete source](/img/cloud-native-workspace/maps/map_source_options.png)

### Add source from a custom query

Go to *Sources* and click *Add source from...*. A new dialog screen will open allowing you to create your own query or run a SQL analysis to data on your connection. Select an option and click *Add source*.

![Add source custom query](/img/cloud-native-workspace/maps/map_add_source_custom_query.png)

![Add source analysis query](/img/cloud-native-workspace/maps/map_add_source_analysis_query.png)

Once the process is finished, the SQL console appears in the Builder interface, where you can type your query and then click *Run*. Please make sure to use *Fully Qualified Table* names.

![Map sql console](/img/cloud-native-workspace/maps/map_sql_console.png)

In this example we are going to use a table accessible via a BigQuery connection. The BigQuery table is included in the Builder map tool as a new layer. You can add additional layers, or apply styling and analysis features.
	
![Map add query](/img/cloud-native-workspace/maps/map_add_query.png)


#### Custom queries using the Analytics Toolbox

You can also use the Analytics Toolbox functions in your custom SQL queries. For example, you can perform a simple clustering using the [`ST_CLUSTERKMEANS`](/analytics-toolbox-bq/sql-reference/clustering/#st_clusterkmeans) function by running this query from your CARTO Data Warehouse connection:

```sql
with clustered_points AS
(
    SELECT `carto-un`.clustering.ST_CLUSTERKMEANS(ARRAY_AGG(geom ignore nulls), 6) AS cluster_arr
    FROM carto-demo-data.demo_tables.sample_customer_home_locations
)

SELECT cluster_element.cluster, cluster_element.geom AS geom FROM clustered_points, UNNEST(cluster_arr) AS cluster_element
```

This query computes five clusters from the points of the `sample_customer_home_locations` table. As a result, each point is assigned a `cluster` ID. By styling the layer by this `cluster` attribute, we get the following result:

![Map add query](/img/cloud-native-workspace/maps/map_custom-query-analytics-toolbox-clustering.png)


To learn more, please visit the Documentation page of the [Analytics Toolbox for BigQuery](/analytics-toolbox-bq) (also valid for the CARTO Data Warehouse) and [Analytics Toolbox for Snowflake](/analytics-toolbox-sf).

### Add source from a local file

From the *Layers* tab, go to the *Sources* panel, click on *Add source from...* and select *Import file* tab. A new dialog will open allowing you to import your data from your computer and set the name of the output table. 

![Add source import file](/img/cloud-native-workspace/maps/map_add_source_import_file.png)

You can upload your data through two different methods: Local or Remote.

-  **Local**

<!-- From Upload Method, select the icon on the left.

![Map import upload method file](/img/cloud-native-workspace/maps/map_import_upload_method_file.png)
 -->
This interface will allow you to browse a supported file (Shapefile or GeoJSON), and set the name of the output table. 

![Map import dataset file](/img/cloud-native-workspace/maps/map_import_dataset_file.png)

Once you have completed this configuration, click on *Continue*: 

![Map import dataset file contine](/img/cloud-native-workspace/maps/map_import_dataset_file_continue.png)

The next screen will show you a summary of the configuration of the table for your confirmation. To confirm, click on *Add Source* :

![Map import add source](/img/cloud-native-workspace/maps/map_import_add_source.png)

At this moment, the default location to import your data is your organization´s *shared* folder from our provisioned CARTO Data Warehouse connection.

Once the data has been imported, the dataset is included in the Builder map tool as a new layer. You can then add additional layers, or apply styling and analysis features.

-  **Remote**

<!-- From Upload Method, select the icon on the right.

![Map import upload method url](/img/cloud-native-workspace/maps/map_import_upload_method_url.png) -->

This interface will allow you to enter your URL and set the name of the output table. 

![Map import data icon](/img/cloud-native-workspace/maps/map_import_dataset_file_url.png)

Once you have completed this configuration, click on *Continue*: 

![Map import data icon](/img/cloud-native-workspace/maps/map_import_dataset_file_continue_url.png)

The next screen will show you a summary of the configuration of the table for your confirmation. To confirm, click on *Add Source* :

![Map import confirmation](/img/cloud-native-workspace/maps/map_import_add_source_url.png)

At this moment, the default location to import your data is your organization´s *shared* folder from our provisioned CARTO Data Warehouse connection.

Once the data has been imported, the dataset is included in the Builder map tool as a new layer. You can then add additional layers, or apply styling and analysis features.









