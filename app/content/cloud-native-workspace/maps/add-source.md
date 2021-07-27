## Add source

The *Layers* tab appear, where you can upload new datasets using a local file or add a dataset from your existing data warehouse connection. If you haven’t added a source yet, you will see the following page:

![Layers no source](/img/cloud-native-workspace/maps/map_layers_no_source.png)

### ADD SOURCE FROM A CONNECTION

Go to *Sources* and click *Add source from...*. A new dialog will open so you can select a table or a tileset from your connection. Insert the *Fully Qualified Table* or the *Tileset Name* and click *Add source*.

![Enter table name](/img/cloud-native-workspace/get-started/map_add_source.png)

Once the process is finished, the BigQuery table is included in the Builder map tool as a new layer. The map displays the basemap and map layer that are the backbone for rendering your visualization. You can add additional layers, or apply styling and analysis features.
	
![Map created](/img/cloud-native-workspace/maps/map_style_connection.png)

The CARTO 3 Builder contains many features that guide you through the process of creating a map, changing the styling, and selecting how your data appears. Use the following task list as guide for some of the main CARTO 3 Builder features:

- Add your source [guide](../../maps/add-data)
- View your data table [guide](../../maps/view-data-table)
- Configure your map settings [guide](../../maps/map-settings)
- Style your maps [guide](../../maps/map-styles)

### ADD SOURCE FROM A CUSTOM QUERY

Go to *Sources* and click *Add source from...*. A new dialog will open so you can create your own query or run a SQL analysis from your connection. Select an option and click *Add source*.

![Enter table name](/img/cloud-native-workspace/maps/map_add_source_custom_query.png)

![Enter table name](/img/cloud-native-workspace/maps/map_add_source_analysis_query.png)

Once the process is finished, the SQL console is included in the Builder map view. You can type your query by inserting the *Fully Qualified Table* or the *Tileset Name* and then click *Run*. 

![Enter table name](/img/cloud-native-workspace/maps/map_sql_console.png)

The BigQuery table is included in the Builder map tool as a new layer. The map displays the basemap and map layer that are the backbone for rendering your visualization. You can add additional layers, or apply styling and analysis features.
	
![Map created](/img/cloud-native-workspace/maps/map_style_query.png)

The CARTO 3 Builder contains many features that guide you through the process of creating a map, changing the styling, and selecting how your data appears. Use the following task list as guide for some of the main CARTO 3 Builder features:

- Add your source [guide](../../maps/add-data)
- View your data table [guide](../../maps/view-data-table)
- Configure your map settings [guide](../../maps/map-settings)
- Style your maps [guide](../../maps/map-styles)


### ADD SOURCE FROM A LOCAL FILE

Go to *Sources* and click *Add source from...*. A new dialog will open so you can upload a CSV, Json, GeoJSON or saved map Json file. You can browse your files, or drag & drop them into the dotted area of the dialog.

![Enter table name](/img/cloud-native-workspace/maps/map_add_source_file2.png)

Once data is imported, the dataset is included in the Builder map tool as a new layer. The map displays the basemap and map layer that are the backbone for rendering your visualization. You can add additional layers, or apply styling and analysis features.
	
![Map created](/img/cloud-native-workspace/maps/map_style_file.png)

The CARTO 3 Builder contains many features that guide you through the process of creating a map, changing the styling, and selecting how your data appears. Use the following task list as guide for some of the main CARTO 3 Builder features:

- Add your source [guide](../../maps/add-data)
- View your data table [guide](../../maps/view-data-table)
- Configure your map settings [guide](../../maps/map-settings)
- Style your maps [guide](../../maps/map-styles)

In all cases, you can keep adding multiple data to your map from your different data sources.