## Creating a tileset from your data

{{% bannerNote title="ONLY FOR BIGQUERY AND CARTO DATA WAREHOUSE CONNECTIONS" type="tip" %}}
Creating tilesets is currently only available from BigQuery and CARTO Data Warehouse connections.
{{%/ bannerNote %}}

To create a tileset from your data, select a BigQuery or CARTO Data Warehouse connection and click on a specific table (database/project(s), schemas/datasets and tables) from the collapsible tree.

You can create a tileset by clicking on the *Create tileset* button at the top right of the screen. Please note that this option will only be available for those tables that require a tileset to be visualized entirely due to their size. 

![Data Explorer preview table](/img/cloud-native-workspace/data-explorer/de_preview_table2.png)

A new dialog will open so you can create the tileset from a *form* mode or from a *sql* mode. You are initially presented with a *form* mode to configure the tileset. 

This interface will allow you to select the tileset zoom levels, choose the geometry column and set the location and name of the output table. Once you have completed this configuration, click on *Continue*: 

![Data Explorer create tileset (settings)](/img/cloud-native-workspace/data-explorer/de_create_tileset(settings).png)

The next screen will allow you to easily select the attributes of your table that will be included in the tileset. After completing this step, click on *Continue* : 

![Data Explorer create tileset (attributes)](/img/cloud-native-workspace/data-explorer/de_create_tileset(attributes_selected).png)

The last screen will show you a summary of the configuration of the tileset for your confirmation. To confirm, click on *Create*:

![Data Explorer create tileset (confirmation)](/img/cloud-native-workspace/data-explorer/de_create_tileset(confirmation).png)

At any point of the process you can switch to enable the *SQL editor*. This editor allows you to configure your tileset directly on the query that will be run to create it, therefore allowing you to edit all of the advanced options available. Once you have finished editing the SQL query, click on *Create*:

![Data Explorer create tileset sql editor](/img/cloud-native-workspace/data-explorer/de_create_tileset_sql_editor.png)

Please note that if you edit the SQL query and go back to the form, a message appears warning you that all changes will be lost. Click on *Clear* to accept this or click on *Cancel* to continue editing:

![Data Explorer create tileset disable sql editor](/img/cloud-native-workspace/data-explorer/de_disable_sql_editor.png)

Once you click on *Create*, the tileset creation process status can be followed from a new dialogue box that appears at the top right corner of the screen. There are three possible status: creating tileset, tileset created successfully or tileset creation error. When an error occurs, you can click on *Read more* to get more information about the error. You can also click on *Clear* to clear the list when the processes have finished.

![Data Explorer job process](/img/cloud-native-workspace/data-explorer/de_jobsprocessing.png)
