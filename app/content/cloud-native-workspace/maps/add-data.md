## Add data

The *Add data* options appear, where you can upload new datasets using a local file or add a dataset from your existing data warehouse connection.

### ADD DATA FROM LOCAL FILE

In the *Add data* section click *Local file*.

![Add data from local file](/img/cloud-native-workspace/maps/map_add_layer_local_file.png)

A new dialog will open so you can upload a CSV, Json, GeoJSON or saved map Json file. You can browse your files, or drag & drop them into the dotted area of the dialog.

![Upload data](/img/cloud-native-workspace/maps/map_add_layer_local_file_upload.png)

Once data is imported, the dataset and layers appears in Builder by default.

![Upload data](/img/cloud-native-workspace/maps/map_add_layer_local_file_paris.png)

You can keep adding multiple data to your map from your different data sources.

### ADD DATA FROM A CONNECTION

You can create maps using data hosted in your data warehouses. You can use this [guide](../../connections/creating-a-connection) to learn how to create a new connection.

In the *Add data* section you will see your existing connections. When choosing one of your connections, a menu will show you different options to add data. We can use a Query to retrieve data, add a whole Table, or a Tileset.
	
![Add data from connection](/img/cloud-native-workspace/maps/map_add_layer_connection.png)
	
#### Add data from SQL

In this example we are going to use a Query. The next step is entering a basic query to a table and click *run*. 

![Enter query name](/img/cloud-native-workspace/maps/map_add_query_name.png)

You can use <a href="https://carto.com/help/tutorials/common-sql-operations/" target="_blank">common SQL Operations</a> to learn how to interact with your datasets in a simple way.

Once data is imported, the dataset and layers appears in Builder by default.

![Map created](/img/cloud-native-workspace/maps/map_query_setup.png)

#### Add data from Tables

In this example we are going to use a Table. The next step is entering the fully qualified table name and click *add*.

![Enter table name](/img/cloud-native-workspace/maps/map_add_table_name.png)

Once data is imported, the dataset and layers appears in Builder by default.

![Map created](/img/cloud-native-workspace/maps/map_table_setup.png)

#### Add data from Tilesets

In this example we are going to use a Tileset. The next step is entering the fully qualified tileset name and click *add*.

![Enter table name](/img/cloud-native-workspace/maps/map_add_tileset_name.png)

Once data is imported, the dataset and layers appears in Builder by default.

![Map created](/img/cloud-native-workspace/maps/map_tileset_setup.png)


In all cases, you can keep adding multiple data to your map from your different data sources.