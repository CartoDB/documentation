## Add source

When you open a map, the Layers tab will appear on the left side panel. There you can add data as layers to the map by clicking on *Add source from*, where you can access the contents from your existing data warehouse connections. If you haven’t added a data layer to the map yet, you will see the following page:

![Add source to your map](/img/cloud-native-workspace/maps/map_add_source_to_your_map.png)

### Add source from a connection

From the Layers tab, go to the Sources panel and click on *Add source from...*. A new dialog screen will open allowing you to select a table or a tileset from on of your connections. Insert the *Fully Qualified Table* or the *Tileset Name* and click *Add source*.

![Add source select a connection bq](/img/cloud-native-workspace/maps/map_add_source_select_a_bq_connection.png)

![Add source select a table](/img/cloud-native-workspace/maps/map_add_source_select_table.png)

Once the process is finished, the table or tileset is included in the Builder map as a new layer. The map displays the basemap and the new layer on top. You can add additional layers, or start applying styling and analysis features.
	
![Map created](/img/cloud-native-workspace/maps/map_created.png)

Once you have added your datasets to the map, you can visualize the data table. Click on the three dots icon, select *Show data table* and your dataset table will be displayed. 

![Map source options view data table](/img/cloud-native-workspace/maps/map_source_options.png)

By clicking the *tree dots* icon the Column Context menu will reveal additional options such as: Sort on this column, ascending or descending, Pin the column so you can freeze it in the first position, and copy column data.

![Map table column](/img/cloud-native-workspace/maps/map_table_column.png)

Once you have added your datasets to the map, you can always add a new layer or delete the source. Click on the three dots icon and select *Add layer* or *Delete source*.

![Map source options delete source](/img/cloud-native-workspace/maps/map_source_options.png)

### Add source from a custom query

From the Layers tab, go to the Sources panel and click on *Add source from...*. A new dialog screen will open allowing you to create your own query or run a SQL analysis to data on your connection. Select an option and click *Add source*.

![Add source custom query](/img/cloud-native-workspace/maps/map_add_source_a_custom_query.png)

![Add source analysis query](/img/cloud-native-workspace/maps/map_add_source_an_analysis_query.png)

Once the process is finished, the SQL Editor appears in the Builder interface, where you can type your query and then click *Run* when it is active to execute the query. Please make sure to use *Fully Qualified Table* names.

![Map new sql panel](/img/cloud-native-workspace/maps/map_new_sql_panel.png)

From the SQL Editor, you can easily toggle to full screen mode, minimize, maximize or close the panel.

<!-- ![Map sql console](/img/cloud-native-workspace/maps/map_sql_console.png) -->

<!-- ![Map sql console](/img/cloud-native-workspace/maps/map_sql_panel_enter_full_screen.png) -->

![Map sql panel enter full screen](/img/cloud-native-workspace/maps/map_sql_panel_enter_fullscreen.png)

<!-- ![Map sql console](/img/cloud-native-workspace/maps/map_sql_panel_minimize.png) -->

![Map sql panel minimize screen](/img/cloud-native-workspace/maps/map_sql_panel_minimizescreen.png)

![Map sql panel close](/img/cloud-native-workspace/maps/map_sql_panel_close.png)

Full screen mode allows you to easily work with long SQL queries. Once your query is executed, you can always restore to default screen by clicking on *Exit full screen*.

![Map sql panel full screen](/img/cloud-native-workspace/maps/map_sql_panel_fullscreen.png)

Also note that while typing the query, a label will indicate that the SQL Editor is in edit mode.

![Map sqñ panel edited](/img/cloud-native-workspace/maps/map_sql_panel_edited.png)

For BigQuery data sources, when you enter a query in the SQL Editor, a query validator (`dry-run`) verifies the query syntax and provides an estimate of the number of bytes read by the query. You can check out [this documentation page](https://cloud.google.com/bigquery/docs/samples/bigquery-query-dry-run) for more information. 

<!-- In the following examples we are going to use a table accessible via a [BigQuery connection](../../connections/creating-a-connection/#connection-to-bigquery) to show how it works. 
 -->
If the query is valid, then a check mark automatically appears along with the amount of data that the query will process. 

![Map sql panel valid query(bq)](/img/cloud-native-workspace/maps/map_sql_panel_valid_query(bq).png)

![Map sql panel add query](/img/cloud-native-workspace/maps/map_sql_panel_add_query.png)

If the query is invalid, then an exclamation point appears along with an error message (syntax error, permission issues, etc.).

![Map sql panel syntax error(bq)](/img/cloud-native-workspace/maps/map_sql_panel_syntax_error(bq).png)

![Map sqlm panel syntax error](/img/cloud-native-workspace/maps/map_sql_panel_sintax_error.png)

{{% bannerNote title="NOTE" type="note"%}}
Bear in mind that the `dry-run` option is only available for BigQuery data sources ([CARTO Data Warehouse](../../connections/carto-data-warehouse) and [BigQuery connection](../../connections/creating-a-connection/#connection-to-bigquery))
{{%/ bannerNote %}}

When you click on *Run*, a timer will appear while the query is running informing you how long the query is taking until it's finished. A label will also appear along indicating the connection being used to execute the query. In this example, the BigQuery connection named as `custom_name`.

<!-- ![Map add query](/img/cloud-native-workspace/maps/map_sql_panel_running_query.png) -->

![Map sql panel run query](/img/cloud-native-workspace/maps/map_sql_panel_run_query.png)

You can click on *Cancel* at any time to stop running the query. At this poing, the layer loading will also be cancelled.

<!-- ![Map add query](/img/cloud-native-workspace/maps/map_sql_panel_cancel_query.png) -->

![Map add cancel query](/img/cloud-native-workspace/maps/map_sql_panel_cancelling_query.png)

If you keep the query running and it executes successfully, the table will be included in the Builder map tool as a layer. You can also persist the query as a table by clicking on *Create table from query* button that will be available when the query is successfully completed.

![Map sql panel create table from query](/img/cloud-native-workspace/maps/map_sql_panel_create_table_from_query.png)

Click on *Create table from query* button. A new dialog will open allowing you to create your table from query into the available connections. This interface will allow you to set the location and name of the output table. Click on *Create table from query* to continue or click on *Cancel* if you don’t want the changes to be applied.

![Map sql modal create table from query](/img/cloud-native-workspace/maps/map_sql_modal_create_table_from_query.png)

This option is only available for the same connection used for running the query. If you try to select a different location, a message will appear warning you that the connection cannot be changed in this process.

![Map sql modal create table from query warning](/img/cloud-native-workspace/maps/map_sql_modal_create_table_from_query_warning.png)

Select the location and click on *Create table from query*.

![Map sql modal create table from query OK](/img/cloud-native-workspace/maps/map_sql_modal_create_table_from_query_OK.png)

Once the process is finished, the table is included in the Builder map as a new layer. The map displays the basemap and the new layer on top. You can add additional layers, or start applying styling and analysis features.

![Map sql panel table from query created](/img/cloud-native-workspace/maps/map_sql_table_from_query_created.png)
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


To learn more, please visit the Documentation page of the CARTO Analytics Toolbox for each provider: 
* [Analytics Toolbox for BigQuery](/analytics-toolbox-bigquery) (also valid for the CARTO Data Warehouse)
* [Analytics Toolbox for Snowflake](/analytics-toolbox-snowflake)
* [Analytics Toolbox for Redshift](/analytics-toolbox-redshift)
* [Analytics Toolbox for Databricks](/analytics-toolbox-databricks)

### Add source from a local or remote file

CARTO allows to create geospatial tables in an organization's CARTO Datawarehouse by importing files from your computer or via URL. Once a file is imported, the resulting table can be previewed in Data Explorer and used in Builder and external applications to create maps.
#### Supported formats
Currently, the import of CSV, KML, KMZ, TAB, GeoJSON, GeoPackage and Shapefiles (in a zip file) is supported. The size limit for a single import process is 512MB. Please [get in touch](mailto:support@carto.com) with us if you need a higher limit. 

For CSV files, CARTO will try and autodetect the geometry column or create the geometries from latitude/longitude columns. The supported column names are: 
* For *geometry*: `geom,Geom,geometry,the_geom,wkt,wkb`
* For *latitude*: `latitude,lat,Latitude`
* For *longitude*: `longitude,lon,Lon,Longitude,lng,Lng`

The expected delimiters are: comma (`,`), semi-colon (`;`) or a tabulation.


From the Layers tab, go to the Sources panel, click on *Add source from...* and select the Import file tab. A new dialog will open allowing you to import your data into the available connections.

![Add source import file](/img/cloud-native-workspace/maps/map_add_source_import_file.png)

You can upload your data through two different methods: Local or Remote.

-  **Local**

To import a local file, select the icon on the left:

![Map import local](/img/cloud-native-workspace/maps/map_import_local.png)

This interface will allow you to upload a supported file from your computer. Once you have selected the file, click on *Continue* : 

![Map add source import local file](/img/cloud-native-workspace/maps/map_import_file.png)

![Map import local](/img/cloud-native-workspace/maps/map_select_local_file.png)

The next screen will allow you to set the location and name of the output table. Once you have completed this configuration, click on *Continue*.

![Data Explorer import select file local continue](/img/cloud-native-workspace/maps/map_import_select_connection.png)

![Data Explorer import select file local continue](/img/cloud-native-workspace/maps/map_import_selected_folder_continue.png)

The last screen will show you a summary of the configuration of the new table. Click on *Add Source* to confirm or click on *Edit details* if you want to edit any previous step.

![Data Explorer import select file local continue](/img/cloud-native-workspace/maps/map_import_add_source.png)

A new dialog will open informing you that the import may take a while to process and giving you the option to follow the status from a new dialogue box that appears at the top right corner of the screen.

![Data Explorer importing local to carto dw](/img/cloud-native-workspace/maps/map_importing_file.png)

Once the data has been imported, the dataset is included in the Builder map tool as a new layer. You can then add additional layers, or apply styling and analysis features.

![Map add source import urban areas](/img/cloud-native-workspace/maps/map_imported_file.png)

-  **Remote**

To import a remote URL, select the icon on the right.

![Map import remote](/img/cloud-native-workspace/maps/map_import_remote.png)

This interface will allow you to enter a supported URL file. Once you have entered the URL, click on *Continue*.

![Map add source import remote url](/img/cloud-native-workspace/maps/map_select_remote.png)

The next screen will allow you to set the location and name of the output table. Once you have completed this configuration, click on *Continue*.

![Data Explorer import select file local continue](/img/cloud-native-workspace/maps/map_import_remote_selected_folder_continue.png)

The last screen will show you a summary of the configuration of the new table. Click on *Add Source* to confirm or click on *Edit details* if you want to edit any previous step.

![Data Explorer import select file local continue](/img/cloud-native-workspace/maps/map_import_remote_add_source.png)

A new dialog will open informing you that the import may take a while to process and that once the file has been imported, it will be added as a data source to the map.

![Data Explorer importing local to carto dw](/img/cloud-native-workspace/maps/map_importing_remote_file.png)

Once the data has been imported, the dataset is included in the Builder map tool as a new layer. You can then add additional layers, or apply styling and analysis features.

![Map add source import urban areas](/img/cloud-native-workspace/maps/map_imported_remote_file.png)
### Add source from Data Observatory

From the Layers tab, go to the Sources panel and click on *Add source from…*. Go to the "Data Observatory" tab. A new dialog screen will open allowing you to select your subscriptions or samples from one of your connections. Select a subscription or a sample and click on *Add source*.

![Add source select a connection bq](/img/cloud-native-workspace/maps/map_add_source_from_do_select_a_connection.png)

![Add source select a table](/img/cloud-native-workspace/maps/map_add_source_from_do_tree.png)

{{% bannerNote title="NOTE" type="note"%}}
Bear in mind that **subscriptions** are only available from CARTO Data Warehouse, BigQuery and Snowflake connections, while **samples** are only available from CARTO Data Warehouse and BigQuery connections.
{{%/ bannerNote %}}

If you try to visualize a sample from a unavailable connection, a message will appear warning you that this sample is not available from that connection.

![Add source select a table](/img/cloud-native-workspace/maps/map_add_source_from_do_sample_warning_sf.png)

To learn more about how to visualize your Data Observatory datasets in Builder, please visit its dedicated [documentation page](/data-observatory/guides/visualizing-data-observatory-datasets/#visualizing-data-observatory-datasets).

<!-- Read our [documentation] if you want to learn about the specific permissions CARTO requires. -->




