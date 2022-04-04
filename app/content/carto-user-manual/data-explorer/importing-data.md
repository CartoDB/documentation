## Importing data

CARTO allows to create geospatial tables in an organization's [CARTO Data Warehouse](../../connections/carto-data-warehouse), [BigQuery connection](../../connections/creating-a-connection/#connection-to-bigquery) and [Snowflake connection](../../connections/creating-a-connection/#connection-to-snowflake), by importing files from your computer or via URL. Once a file is imported, the resulting table can be previewed in Data Explorer and used in Builder and external applications to create maps.

To import your data, go to Data Explorer section, select *Connections* panel and click on *Import data* button on the top left:

![Data Explorer import data icon](/img/cloud-native-workspace/data-explorer/de_import_data_icon.png)

A new dialog will open allowing you to import your data into the available connections.

![Data Explorer import select file](/img/cloud-native-workspace/data-explorer/de_import_select_file.png)

When you import a file, the *Auto-guessing* option is always **enabled** by default. This option allows you to automatically guess column data types in the imported table.

Once you have selected your file, click on *Continue*:

![Data Explorer import select file local continue](/img/cloud-native-workspace/data-explorer/de_import_select_file_continue.png)

The next screen will allow you to set the location and name of the output table. Once you have completed this configuration, click on *Save here*.

![Data Explorer import select file local continue](/img/cloud-native-workspace/data-explorer/de_import_destination_connection.png)

![Data Explorer import select file local continue](/img/cloud-native-workspace/data-explorer/de_import_destination_save_here.png)

The last screen will show you a summary of the details for your confirmation. To confirm, click on *Import*.

![Data Explorer import select file local continue](/img/cloud-native-workspace/data-explorer/de_import_confirmation.png)

Once you click on Import, a new dialog will open informing you that the import may take a while to process and giving you the option to follow the status from a new dialogue box that appears at the top right corner of the screen.

![Data Explorer importing local to carto dw](/img/cloud-native-workspace/data-explorer/de_importing_process.png)

There are three possible status: importing, imported successfully or dataset creation error.

![Data Explorer importing local](/img/cloud-native-workspace/data-explorer/de_importing_local.png)

![Data Explorer imported successfully local](/img/cloud-native-workspace/data-explorer/de_imported_successfully_local.png)

![Data Explorer dataset creation error local](/img/cloud-native-workspace/data-explorer/de_dataset_creation_error_local.png)

When an error occurs, you can click on *Read more* to get more information about the error or hover the mouse over the dataset name or over the information icon. You can also click on *Clear* to clear the list when the imports have finished.

![Data Explorer view error info local](/img/cloud-native-workspace/data-explorer/de_view_error_info_local.png)

Once the your data has been imported, it will be available as a table on your selected folder and you will have access the map and data preview as well as creating map in Builder.

<!-- ![Data Explorer import populated places](/img/cloud-native-workspace/data-explorer/de_import_populated_places.png)
 -->
![Data Explorer import populated places](/img/cloud-native-workspace/data-explorer/de_mappreview_populated_places.png)

You can also overwrite existing files. When you import a file with an existing name, a message will appear warning you that the table already exists in the destination folder. Click on *Save here* to continue and overwrite it or click on *Cancel* if you don't want the changes to be applied.

![Data Explorer import existing files](/img/cloud-native-workspace/data-explorer/de_import_existing_file.png)

If you do not have permissions, a message will appear warning you that the table already exists in the destination folder. Select a new location or click on *Cancel* if you don't want the changes to be applied.

![Data Explorer import no permissions](/img/cloud-native-workspace/data-explorer/de_import_no_permissions.png)

### Importing methods

You can import your data through two different methods: Local or Remote.

-  **Local**

This method allows you to upload your data from your computer. To import a local file, select the icon on the left:

![Data Explorer import local](/img/cloud-native-workspace/data-explorer/de_import_local.png)

-  **Remote**

This method allows you to enter a supported URL file. To import a remote URL, select the icon on the right.

![Data Explorer import remote](/img/cloud-native-workspace/data-explorer/de_import_remote.png)
### Supported formats
Currently, the import of CSV, GeoJSON, GeoPackage, KML, KMZ, TAB and Shapefiles (in a zip package) is supported. The size limit for a single import process is 512MB. Please [get in touch](mailto:support@carto.com) with us if you need a higher limit. 

For CSV files, CARTO will try and autodetect the geometry column or create the geometries from latitude/longitude columns. The supported column names are: 
* For *geometry*: `geom,Geom,geometry,the_geom,wkt,wkb`
* For *latitude*: `latitude,lat,Latitude`
* For *longitude*: `longitude,lon,Lon,Longitude,lng,Lng`

The expected delimiters are: comma (`,`), semi-colon (`;`) or a tabulation.

<!-- provisioned `CARTO Data Warehouse` connection.  -->

<!-- ![Data Explorer import select file](/img/cloud-native-workspace/data-explorer/de_import_select_local_file.png) -->
### Deleting data

In the *Data Explorer* section of the Workspace, you can view the list of your current data warehouse(s) and data observatory subscriptions. You can access the quick actions menu to manage your data by clicking on the "three dots" icon in the top-right corner. There are different options available depending on whether it is a table or a tileset.

![Data Explorer quick actions table menu](/img/cloud-native-workspace/data-explorer/de_quick_actions_table_menu.png)

![Data Explorer qjuick actions tileset menu](/img/cloud-native-workspace/data-explorer/de_quick_actions_tileset_menu.png)

If you click the *Delete* quick action, a dialog will appear allowing you to confirm that you want to delete the selected table or tileset. It includes information about data sources, layers, applications and API calls related to the existing dataset that could potentially be affected by the action. Click the *Yes, delete* button to confirm the changes or click *Cancel* if you don't want the changes to be applied.

![Data Explorer dialog delete table](/img/cloud-native-workspace/data-explorer/de_delete_table.png)
