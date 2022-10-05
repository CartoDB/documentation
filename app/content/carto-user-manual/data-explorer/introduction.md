## Introduction

<!-- The CARTO Workspace provides an improved and easier experience to help the user build maps and solutions using their geospatial data. -->

The Data Explorer section in the Workspace allows users to explore their data warehouse(s) and data observatory subscriptions as well as creating maps from their data. 

From *Connections* tab, select a connection to view content (database/project(s), schemas/datasets, and tables) from top to bottom in a collapsible tree. If you haven’t registered a connection yet, you will see the following page.

![Data Explorer cartodw](/img/cloud-native-workspace/data-explorer/de_the_cartodw.png)

If you want to <a href="https://docs.carto.com/carto-user-manual/connections/creating-a-connection/" target="_blank">create a connection</a> you can use the *Add new connection* button that appears at the bottom of the tree in the Connection tab.

![Data Explorer add new connection](/img/cloud-native-workspace/data-explorer/de_add_the_new_connection.png) 

From *Data Observatory* tab, you can access the different Data Observatory datasets you subscribed to. If you haven’t subscribed to any dataset yet, you will see the following page.

![Data Explorer no subscriptions](/img/cloud-native-workspace/data-explorer/de_no_subscriptions.png)

In the same way, you can use the *Add new subscriptions* button from Data Observatory tab, in order to [add a subscription](../../data-observatory/introduction/#your-subscriptions-and-samples) from the <a href="https://docs.carto.com/carto-user-manual/data-observatory/introduction/" target="_blank">Spatial Catalog</a>.

![Data Explorer add new subscriptions](/img/cloud-native-workspace/data-explorer/de_add_the_new_subscriptions.png) 

This dataset is added as any other table in the Data Explorer. Meaning, that you can access the map and data preview of the table as well as creating a map in Builder. 

When you select a connection to view the content  (database/project(s), schemas/datasets, and tables/tilesets), you will be able to perform three actions through the buttons on the top right corner: *Import*, *Refresh* and *Grid view*.

![Data Explorer new buttons](/img/cloud-native-workspace/data-explorer/de_new_buttons.png) 

The *Import* button will allow you to import your data into the available connections through two different methods: Local or Remote.

![Data Explorer import icon](/img/cloud-native-workspace/data-explorer/de_import_icon.png) 

The *Refresh* button will allow you to update any change in the collapsible tree/view page.

![Data Explorer refresh icon](/img/cloud-native-workspace/data-explorer/de_refresh_icon.png) 

You can also change the page view. By default the view is displayed as a table. 

![Data Explorer grid view](/img/cloud-native-workspace/data-explorer/de_grid_view.png) 

When you click on the *Grid view* button, your content will be displayed as cards.

![Data Explorer list view](/img/cloud-native-workspace/data-explorer/de_list_view.png) 

In order to search for an specific content (database/project, schema/dataset or table/tileset), you can use the search bar to type what you are looking for.

![Data Explorer search bar](/img/cloud-native-workspace/data-explorer/de_search_bar.png)

You can also check the number of results that you are currently viewing on the list.

![Data Explorer order arrow](/img/cloud-native-workspace/data-explorer/de_order_arrow.png)

Click on the up/down arrow if you want to sort alphabetically in ascending or descending order.

![Data Explorer number results](/img/cloud-native-workspace/data-explorer/de_number_results.png)

From the list, you can also check whether it is a table or a tileset from the *Type* column.

![Data Explorer type dataset](/img/cloud-native-workspace/data-explorer/de_type_dataset.png) 

Once your table or tileset is selected, you can check the full path of the table/tileset and click on the *Copy qualified name* link to copy it. You can also move through the path by clicking on the different folders (database/project and schema/dataset) or go back to the previous page by clicking on the arrow on the top left corner.

![Data Explorer breadcrumbs](/img/cloud-native-workspace/data-explorer/de_breadcrumbs.png)

<!-- ![Data Explorer breadcrumbs](/img/cloud-native-workspace/data-explorer/de_the_breadcrumbs.png) -->

{{% bannerNote title="NOTE" type="warning"%}}
[Partitioned BigQuery tables](https://cloud.google.com/bigquery/docs/partitioned-tables) will fail to preview, since they always require a `WHERE` clause in the query that filters by the column used for the partition.

They can still be loaded in Builder, adding them as a SQL Query source like: 
```sql
SELECT * 
FROM project.dataset.my_partitioned_table 
WHERE partition_column = 'value'
```

{{%/ bannerNote %}}

