## Creating a tileset from your data

To create a tileset from your data, select a connection and click on a specific content (database/project(s), schemas/datasets and tables) from the collapsible tree. Once your table or tileset is selected, you can view a preview of the map and the details of the table or tileset. 

You can create a tileset by clicking on the *Create tileset* button on the top. 

![Data Explorer preview table](/img/cloud-native-workspace/data-explorer/de_preview_table2.png)

A new dialog will open so you can create the tileset from a *form* mode or from a *sql* mode. You are initially presented with a *form* mode to configure the tileset. 

This interface will allow you to select the tileset zoom leves and identify the output table. Once you have configured it, click on *Continue* : 

![Data Explorer create tileset](/img/cloud-native-workspace/data-explorer/de_create_tileset(settings).png)

The next interface will allow you to easily select and expect what columns will be loaded in a tileset. After selecting the columns to include in the tileset, click on *Continue* : 

![Data Explorer create tileset](/img/cloud-native-workspace/data-explorer/de_create_tileset(attributes_selected).png)

The last interface will show you the location and attributes of the new tileset. To confirm, click on *Create* :

![Data Explorer create tileset](/img/cloud-native-workspace/data-explorer/de_create_tileset(confirmation).png)

You can also switch to enable the *SQL editor* and have access to advanced options for editing parameters. To confirm, click on *Create* :

![Data Explorer create tileset custom](/img/cloud-native-workspace/data-explorer/de_create_tileset_custom(new).png)

If you edit the SQL query and goes back to the form, a message appears warning you that all changes will be lost. Click on *Clear* to accept this or click on *Cancel* to cancel the tileset creation process:

![Data Explorer create tileset custom](/img/cloud-native-workspace/data-explorer/de_disable_sql_editor.png)

Once you click on *Create*, the tileset creation process can be followed from a new dialogue box that appears in the top right corner. There are three possible states: creating tileset, tileset created successfully or tileset creation error. When an error occurs, you can click on *Read more* to get more information about the error. You can also click on *Clear* to clear the list when the processes have finished.

![Data Explorer job process](/img/cloud-native-workspace/data-explorer/de_jobsprocessing.png)
