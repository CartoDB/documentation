## Introduction

The CARTO Workspace provides an improved and easier experience to help the user build maps and solutions using their geospatial data.

The *Data Explorer* section in the Workspace allows users to explore their data warehouse(s) and data observatory subscriptions as well as creating maps from their data.

From *Connections* panel, select a connection to view content (database/project(s), schemas/datasets, and tables) from top to bottom in a collapsible tree. If you haven’t registered a connection yet, you will see the following page:

![Data Explorer cartodw](/img/cloud-native-workspace/data-explorer/de_cartodw.png)

From *Data Observatory* panel at the bottom of the page, you can access the different Data Observatory datasets you subscribed to. If you haven’t subscribed to any dataset yet, you will see the following page:

![Data Explorer no subscriptions](/img/cloud-native-workspace/data-explorer/de_nosubscriptions.png)




<!-- 
//creating a map from your import data

To create a map from your import data, click on *Add data* button on the top left:

(Image: Add data - icon)

A new dialog will open allowing you to import your data from your computer and set the name of the output table. 

(Image: Add data - general)

You can upload data through two different methods:

1. Local file

(Carto data warhouse -> organization data -> shared

Todos los usuarios tienen que tener la carpeta shared en organization data por defecto. Backend tenía una tarea de crearle esa carpeta a los usuarios que no la tuvieran (edited)  )

You can easily import data from your computer to CARTO Workspace by browsing a supported file type, such as a Shapefile, GeoJSON, or CSV, and by setting the name of the output table. 

This interface will allow you to browse a supported file type such as a Shapefile, GeoJSON, or CSV, and set the name of the output table. 

(Then, select the *shared* folder from our provisioned CARTO Data Warehouse connection that is created by default.)

Once you have completed this configuration, click on *Continue*: 

(You can drag and drop your files directly onto the CARTO dashboard (your workspace) from your computer, and CARTO will automatically upload your file and create a new CARTO dataset.

Se ha bajado la prioridad de eso pero el día que este sería sobre la pantalla completa y no sobre el árbol)

(Image: Add data - local file)

The next screen will show you a summary of the configuration of the table for your confirmation. To confirm, click on *Import and Add source*:

(Image: Add data - Import and Add Source)

2. Enter your URL

This interface will allow you to enter your URL and set the name of the output table. Once you have completed this configuration, click on *Continue*: 

(Image: Add data - URL)

The next screen will show you a summary of the configuration of the table for your confirmation. To confirm, click on *Import and Add source*:

(Image: Add data - Import and Add Source) 

### ADD SOURCE FROM A LOCAL FILE

NEW: From this menu, you can import local files, URLs (with the possibility to create Sync tables), or import data from other sources such as Google Drive and ArcGIS Server.

Go to *Sources* and click *Add source from...*. From the *Import File* menu, you select your upload method: local files or enter a URL.

The local file interface will allow you to browse your files and set the name of the output table. Once you have completed this configuration, click on *Continue*: 

(Image: Add data - local file)

The URL interface will allow you to enter your URL and set the name of the output table. Once you have completed this configuration, click on *Continue*: 

(Image: Add data - URL)

The next screen will show you a summary of the configuration of the table for your confirmation. To confirm, click on *Import and Add source*:

(Image: Add data - Import and Add Source)


Once the data has been imported, the dataset is included in the Builder map tool as a new layer. You can then add additional layers, or apply styling and analysis features.

![Map local file](/img/cloud-native-workspace/maps/map_paris.png)

In all cases, you can keep adding multiple data to your map from your different data sources available.




---

A new dialog will open allowing you to upload a CSV, Json or GeoJSON. you can import local files, URLs (with the possibility to create Sync tables), or import data from other sources such as Google Drive and ArcGIS Server.


You can browse your files, or drag & drop them into the dotted area of the dialog screen.

![Add source local file](/img/cloud-native-workspace/maps/map_add_source_file.png)

Once the data has been imported, the dataset is included in the Builder map tool as a new layer. You can then add additional layers, or apply styling and analysis features.
	
![Map local file](/img/cloud-native-workspace/maps/map_paris.png)

In all cases, you can keep adding multiple data to your map from your different data sources available. -->
