## Importing data

CARTO allows to create geospatial tables in an organization's CARTO Datawarehouse by importing files from your computer or via URL. Once a file is imported, the resulting table can be previewed in Data Explorer and used in Builder and external applications to create maps.

Currently, the import of GeoJSON and Shapefiles (in a zip package) is supported. The size limit for a single import process is 512MB. Please [get in touch](mailto:support@carto.com) with us if you need a higher limit. 

To import your data, go to *Connections* panel and click on *Import data* button on the top left:

![Data Explorer import data icon](/img/cloud-native-workspace/data-explorer/de_import_data_icon.png)

A new dialog will open allowing you to import your data from your computer into the provisioned `CARTO Data Warehouse` connection. 

![Data Explorer import select file](/img/cloud-native-workspace/data-explorer/de_import_select_file_local.png)

You can import your data through two different methods: Local or Remote.

-  **Local**

To import a local file, select the icon on the left:

![Data Explorer import local](/img/cloud-native-workspace/data-explorer/de_import_local.png)

This interface will allow you to upload a supported file, such as GeoJSON or Shapefile (.zip), into `CARTO Data Warehouse` and set the name of the output table on your organization data *shared* folder.

![Data Explorer import select file local](/img/cloud-native-workspace/data-explorer/de_import_select_file_local.png)

Once you have completed this configuration, click on *Continue*: 

![Data Explorer import select file local continue](/img/cloud-native-workspace/data-explorer/de_import_select_file_local_continue.png)

The next screen will show you a summary of the configuration of the table for your confirmation. To confirm, click on *Import* :

![Data Explorer import confirmation local](/img/cloud-native-workspace/data-explorer/de_import_confirmation_local.png)

Once you click on Import, a new dialog will open informing you that the import may take a while to process and giving you the option to follow the status from a new dialogue box that appears at the top right corner of the screen. 

![Data Explorer importing local to carto dw](/img/cloud-native-workspace/data-explorer/de_importing_local_to_cartodw.png)

There are three possible status: importing, imported successfully or dataset creation error. 

![Data Explorer importing local](/img/cloud-native-workspace/data-explorer/de_importing_local.png)

![Data Explorer imported successfully local](/img/cloud-native-workspace/data-explorer/de_imported_successfully_local.png)

![Data Explorer dataset creation error local](/img/cloud-native-workspace/data-explorer/de_dataset_creation_error_local.png)

When an error occurs, you can click on *Read more* to get more information about the error or hover the mouse over the dataset name or over the information icon. You can also click on *Clear* to clear the list when the imports have finished.

![Data Explorer view error info local](/img/cloud-native-workspace/data-explorer/de_view_error_info_local.png)

Once the your data has been imported, it will be available as a table on your organization data *shared* folder and you will have access the map and data preview as well as creating map in Builder.

![Data Explorer import populated places](/img/cloud-native-workspace/data-explorer/de_import_populated_places.png)

-  **Remote**

To import a remote URL, select the icon on the right.

![Data Explorer import remote](/img/cloud-native-workspace/data-explorer/de_import_remote.png)

This interface will allow you to enter your supported URL file, such as GeoJSON or Shapefile (.zip), into `CARTO Data Warehouse` and set the name of the output table on your organization data *shared* folder.

![Data Explorer import select file url](/img/cloud-native-workspace/data-explorer/de_import_select_file_url.png)

Once you have completed this configuration, click on *Continue*: 

![Data Explorer import selected file continue url](/img/cloud-native-workspace/data-explorer/de_import_selected_file_continue_url.png)

The next screen will show you a summary of the configuration of the table for your confirmation. To confirm, click on *Import* :

![Data Explorer import confirmation url](/img/cloud-native-workspace/data-explorer/de_import_confirmation_url_.png)

Once you click on Import, a new dialog will open informing you that the import may take a while to process and giving you the option to follow the status from a new dialogue box that appears at the top right corner of the screen.

![Data Explorer importing url to carto dw](/img/cloud-native-workspace/data-explorer/de_importing_url_to_cartodw.png)

There are three possible status: importing, imported successfully or dataset creation error. 

![Data Explorer importing url](/img/cloud-native-workspace/data-explorer/de_importing_url.png)

![Data Explorer imported successfully url](/img/cloud-native-workspace/data-explorer/de_imported_successfully_url.png)

![Data Explorer dataset creation error url](/img/cloud-native-workspace/data-explorer/de_dataset_creation_error_url.png)

When an error occurs, you can click on *Read more* to get more information about the error or hover the mouse over the dataset name or over the information icon. You can also click on *Clear* to clear the list when the imports have finished.

![Data Explorer url view error info](/img/cloud-native-workspace/data-explorer/de_view_error_info_url.png)

Once the your data has been imported, it will be available as a table on your organization data *shared* folder and you will have access the map and data preview as well as creating map in Builder.

![Data Explorer import land](/img/cloud-native-workspace/data-explorer/de_import_land.png)
### Deleting data

In the *Data Explorer* section of the Workspace, you can view the list of your current data warehouse(s) and data observatory subscriptions. You can access the quick actions menu to manage your data by clicking on the "three dots" icon in the top-right corner. There are different options available depending on whether it is a table or a tileset.

![Data Explorer quick actions table menu](/img/cloud-native-workspace/data-explorer/de_quick_actions_table_menu.png)

![Data Explorer qjuick actions tileset menu](/img/cloud-native-workspace/data-explorer/de_quick_actions_tileset_menu.png)

If you click the *Delete* quick action, a dialog will appear allowing you to confirm that you want to delete the selected table or tileset. It includes information about data sources, layers, applications and API calls related to the existing dataset that could potentially be affected by the action. Click the *Yes, delete* button to confirm the changes or click *Cancel* if you don't want the changes to be applied.

![Data Explorer dialog delete table](/img/cloud-native-workspace/data-explorer/de_delete_table.png)