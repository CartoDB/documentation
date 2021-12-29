---
title: "Creating a tileset from a Data Observatory subscription"
description: "In this tutorial we are going to showcase how to leverage the public data offering from our Data Observatory and use the data from a subscription to build an interactive dashboard in our map-making tool, Builder. In order to build this dashboard we are going to first create a tileset in order to be able to visualize a larger amount of data." 
image: "/img/tutorials/canada-sociodemographics.png"
type: tutorials
date: "2021-03-12"
# categories:
#     - easy
#     - 3D
---

## Creating a tileset from a data observatory subscription

**Context**

In this tutorial we are going to showcase how to leverage the public data offering from our Data Observatory and use the data from a subscription to build an interactive dashboard in our map-making tool, Builder. In order to build this dashboard we are going to first create a tileset in order to be able to visualize a larger amount of data.

**Steps To Reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. Go to Data Observatory section to access our Spatial Data Catalog.

   ![Menu features data observatory](/img/cloud-native-workspace/tutorials/tutorial9_the_menu_features_data_observatory.png)

   ![DO Spatial data catalog](/img/cloud-native-workspace/tutorials/tutorial9_do_spatial_data_catalog_overview.png)

3. Browse the catalog to find the best spatial datasets to enrich your analysis. With the catalog filters you can explore the different datasets per country of coverage, category, type of license, data providers and placetypes. 

   ![DO Spatial data catalog filters](/img/cloud-native-workspace/tutorials/tutorial9_do_spatial_data_catalog_filters.png)

4. For this example we are going to look for a dataset in Cada with a public license. In particular we are going to select the dataset from Statistics Canada in the “Demographic” category named “Sociodemographics - Canada (Census Division). 

   ![DO Spatial data catalog filtered](/img/cloud-native-workspace/tutorials/tutorial9_do_spatial_data_catalog_filtered.png)

5. If we select that dataset, we can then access it’s particular page with all associated metadata (summary, data schema and map preview)

   ![DO Spatial data catalog summary](/img/cloud-native-workspace/tutorials/tutorial9_do_spatial_data_catalog_summary.png)

   ![DO Spatial data catalog data](/img/cloud-native-workspace/tutorials/tutorial9_do_spatial_data_catalog_data.png)

   ![DO Spatial data catalog map](/img/cloud-native-workspace/tutorials/tutorial9_do_spatial_data_catalog_map.png)

6. As this is a public dataset we can both access the free sample or directly subscribe to the dataset for free. In this case we are going to go ahead with the full subscription. 

   ![DO Spatial data catalog confirm public subscription](/img/cloud-native-workspace/tutorials/tutorial9_do_catalog_confirm_public_subscription.png)

7. Once we confirm the subscription, we are going to have access to the data from its relevant section in the Data Explorer.

   ![DO access data](/img/cloud-native-workspace/tutorials/tutorial9_do_access_data.png)

8. We have a look at the structure of the dataset to identify what are the main variables we are interseted to analyse. For example: `c0001_t (Population, 2016)`, `c0005_t (Private dwellings occupied by usual residents)`, and `c1677_t (Average value of dwellings)`.

   ![DO view variables](/img/cloud-native-workspace/tutorials/tutorial9_do_view_variables.png)

9. Now, we are going to click on the *Create* button. Note that the table of this dataset is too large to be loaded entirely in Builder of map creation. For this reason, CARTO offers you two options, either to add this dataset with a SQL query filtering the amount of data or creating first a tileset and then leverage this tileset for building your map. 

{{% bannerNote type="note" title="note" %}}
Check the <a href="/analytics-toolbox-bq/overview/tilesets/" target="_blank">Tileset</a> reference reference documentation for a better understanding of what a tileset is and how it works, as well as to get started using the BigQuery Tiler as a solution to visualise massive datasets hosted in BigQuery and CARTO Data Warehouse connections. 
{{%/ bannerNote %}}

   ![DO table too large](/img/cloud-native-workspace/tutorials/tutorial9_do_warning_table_too_large.png)

10. Click on *Create a tileset*. This will open a new modal screen for you to manage the tileset creation process. The first step is to select which connection you want to use for processing the data and create the tileset. In this example we are going to select the `CARTO Data Warehouse` connection. Please note that at the moment tilesets can be created only in Google BigQuery or in the CARTO Data Warehouse. Click on *Continue*.

    ![DO create tileset connection](/img/cloud-native-workspace/tutorials/tutorial9_do_create_tileset_connection.png)

11. In the next step we should select the location of the output tileset and the name we want it to have. We should also select the column we want to use for processing the geometry (e.g. in case there’s more than one) and the output zoom levels for which we want the tileset to work (which we are going to change to be between level 2 and level 10 for this example). We can also add a custom description to the tileset. Click on *Continue*.

    ![DO create tileset settings](/img/cloud-native-workspace/tutorials/tutorial9_do_create_tileset_settings.png)

12. Now it is time to select which columns we want to include in the tileset. In this example we are going to select: `c0001_t (Population, 2016)`, `c0005_t (Private dwellings occupied by usual residents)`, and `c1677_t (Average value of dwellings)`. After selecting the columns we click on *Continue*. 

    ![DO create tileset attributes](/img/cloud-native-workspace/tutorials/tutorial9_do_create_tileset_attributes.png)

13. We confirm that the details are correct and click on *Create*.

    ![DO create tileset confirmation](/img/cloud-native-workspace/tutorials/tutorial9_do_create_tileset_confirmation.png)

14. While the tileset creation process is running you can minimize the progress window and continue working in CARTO. 

    ![DO create tileset processing panel](/img/cloud-native-workspace/tutorials/tutorial9_do_create_tileset_processing_panel.png)

15. Once the process has completed, we can click and access the tileset in the Data Explorer.

    ![DO processing panel view tileset](/img/cloud-native-workspace/tutorials/tutorial9_do_processing_panel_view_tileset.png)

16. In the Data Explorer, now that we have the tileset created, we click on *Create Map*. 

    ![DO tileset created](/img/cloud-native-workspace/tutorials/tutorial9_do_tileset_created.png)

17. In the Builder interface, you will see that a new map has been created with the tileset as the source of data.

    ![DO map created from tileset](/img/cloud-native-workspace/tutorials/tutorial9_do_map_from_tileset.png)

18. We can change the name of the layer.

    ![DO map layer renamed](/img/cloud-native-workspace/tutorials/tutorial9_do_map_layer_renamed.png)

19. We can access the layer styling options to work in our visualization by clicking on “Layer style”.

    ![DO map layer style](/img/cloud-native-workspace/tutorials/tutorial9_do_map_layer_style.png)

20. We can for example style the layer based on the values of the Population field (c0001_t) and select the color palette and opacity that we want for our visualization. 

    ![DO map fill color based on](/img/cloud-native-workspace/tutorials/tutorial9_do_map_fill_color_based_on.png)

21. We can also style the stroke around each polygon.

    ![DO map stroke color and width](/img/cloud-native-workspace/tutorials/tutorial9_do_map_stroke_color_and_width.png)

22. Once we are happy with the style of our layer we click on *Back*.

    ![DO map layer styled](/img/cloud-native-workspace/tutorials/tutorial9_do_map_layer_styled.png)

23. Next we are going to add a series of widgets to interact with the data. For that, we go to the “Widgets” section.

    ![DO map widgets tab](/img/cloud-native-workspace/tutorials/tutorial9_do_map_widgets_tab.png)

24. We are going to add both a Formula and Histogram widget base on the `c0001_t`. For the Formula widget we are going to select the operation “SUM” and modify the Formatting to be in the format “12.3k”. We rename the widget to “Total Population, 2016”.

    ![DO map formula widget](/img/cloud-native-workspace/tutorials/tutorial9_do_map_formula_widget.png)

25. We then add a new widget with the Histogram type based on also on the “c0001_t” field (i.e. Population, 2016). We leave the buckets to 6.

    ![DO map histogram widget](/img/cloud-native-workspace/tutorials/tutorial9_do_map_histogram_widget.png)

    ![DO map formula and histogram widgets](/img/cloud-native-workspace/tutorials/tutorial9_do_map_formula_and_histogram_widgets.png)

26. We are now going to change the basemap. For that, we go to the “Base maps” section.

    ![DO map basemaps tab](/img/cloud-native-workspace/tutorials/tutorial9_do_map_basemaps_tab.png)

27. We can change it for example to Google Maps in the Positron edition.

    ![DO map basemap google maps positron](/img/cloud-native-workspace/tutorials/tutorial9_do_map_google_maps_positron.png)

28. Finally we can click on *Share* and modify the privacy settings of our map. We can also make the map public, which can then be accessed online with an associated url. 

    ![DO map public option](/img/cloud-native-workspace/tutorials/tutorial9_do_map_public_option.png)

    ![DO map public map](/img/cloud-native-workspace/tutorials/tutorial9_do_map_public_map.png)

29. Finally, we can visualize the result.

    <iframe width="800px" height="400px" src="https://gcp-us-east1.app.carto.com/map/20bcf2b8-b50b-426b-a918-cc31e2400027"></iframe>
