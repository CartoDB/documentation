## Introduction

CARTO 3 Workspace provides a better and easy experience to help the user to build maps and solutions using their geospatial data.
This section will allow users to explore their data warehouses and create maps from their data.

Select a connection and see the content (database/project(s), schemas/datasets and tables) from top to bottom in a collapsible tree. If you click on a specific project/database or dataset/schema, we should prioritize that one.


In the *Data Explorer* section in the Workspace, you will see the list of your current connections. You can select a connection and see the content (database/project(s), schemas/datasets and tables) from top to bottom in a collapsible tree. If you haven’t registered a connection yet, you will see the following page:

![Data Explorer first connection](/img/cloud-native-workspace/data-explorer/data_explorer_first_connection.png)

## Adding your first connection

For adding your first connection, follow the next steps:

1. Click on *Create your first connection*. It will be switched to the *Connections* section. 
2. From the *Connections* sections, select your data warehouse: BigQuery, PostgreSQL, Redshift, Snowflake, etc.
2. Click the *Setup connection* button, or the *Connect using a service account* button if you are connecting to BigQuery.
3. Enter the connection parameters and credentials. You need to enter the connection parameters such as the server, username, password, or provide a service account, depending on the connector.

The following screen shows the connection setup options for BigQuery:

![Connection setup with BigQuery](/img/cloud-native-workspace/get-started/the_connections_bigquery_the_parameters.png)

After you have provided the connection parameters, click the Connect button. Then you will see the list of your current connections:

![Successful connection](/img/cloud-native-workspace/get-started/the_connections_successful.png)

Once you have added a connection, go back to the *Data Explorer* section in the Workspace, where you will see the list of your current connections. If you have registered a connection, you will see the following page:

![Data Explorer first connection](/img/cloud-native-workspace/data-explorer/data_explorer_bigquery.png)

## Creating a map from your data

For creating a map from your data, select a connection and click on a specific content (database/project(s), schemas/datasets and tables) from the collapsible tree. 

![Data Explorer first connection](/img/cloud-native-workspace/data-explorer/data_explorer_content.png)

Once your table or tileset is selected, you can see a preview of the map and the details of the table or tileset. You can create a map by clicking on the *Create map* button on the top. This will open the CARTO 3 map tool: Builder.

![Data Explorer first connection](/img/cloud-native-workspace/data-explorer/data_explorer_preview.png)

In this example, we have created a map from the tileset that was selected in the previous step:

![Data Explorer first connection](/img/cloud-native-workspace/data-explorer/data_explorer_create_map.png)

To create and style your maps, learn how to:

- Add your data [guide](../../maps/add-data)
- View your data table [guide](../../maps/view-data-table)
- Configure your map settings [guide](../../maps/map-settings)
- Style your maps [guide](../../maps/map-styles)



