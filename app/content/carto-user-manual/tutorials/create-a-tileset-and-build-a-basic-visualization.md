---
title: "Create a tileset and build a basic visualization"
description: "Understanding the urban areas has important implications in a wide range of geospatial analysis, for example, to inform decision-makers in sectors such as urban planning. In this example we are creating a tileset in which each building in Madrid is represented by a polygon and each of them is assigned a graduated color from the lowest to the highest value of the gross floor area. This visualisation allows us to represent at a glance how the surface area in Madrid is distributed." 
image: "/img/tutorials/tileset.png"
type: tutorials
date: "2021-07-12"
categories: 
   - tag one
   - tag two
   - tag four
---
## Create a tileset and build a basic visualization

**Context**

Understanding the urban areas has important implications in a wide range of geospatial analysis, for example, to inform decision-makers in sectors such as urban planning.

<!-- This dataset is provided by Inspire, and it requires a tileset to be visualized entirely due to their size. -->

In this example we are creating a tileset in which each building in Madrid is represented by a polygon and each of them is assigned a graduated color from the lowest to the highest value of the gross floor area. This visualisation allows us to represent at a glance how the surface area in Madrid is distributed.

**Steps To Reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. From the Navigation Menu in the left panel, select Data Explorer. 

   ![Menu features data explorer](/img/cloud-native-workspace/tutorials/tutorial1_the_menu_features_data_explorer.png)

3. Select the [CARTO Data Warehouse](../../connections/carto-data-warehouse) connection and click on *demo data > demo_tables* from the collapsible tree. 

   ![Data Explorer content carto data warehouse](/img/cloud-native-workspace/tutorials/tutorial1_content_carto_dw.png)

4. Selected "inspire_buildings_madrid" and explore the preview of the map and the details of the table.

   ![Data Explorer map prewiew](/img/cloud-native-workspace/tutorials/tutorial6_de_map_preview.png)

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial6_de_data_preview.png)

5. This table due to its size, and current constraints in Builder, cannot be added to a Builder map without subsampling the number of rows. 

    Therefore, in order to build a visualization with this table, we need to create a tileset by clicking on the *Create > Create tileset* button on the top. This will open the table as a layer on a CARTO Builder map. Check [Creating a tileset from your data](../../data-explorer/creating-a-tileset-from-your-data) to get started.

   ![Data Explorer create tileset](/img/cloud-native-workspace/tutorials/tutorial6_de_create_tileset.png)

6. Now from this interface, you need to select the tileset zoom levels, choose the geometry column and give a location for the output table in a directory within the `CARTO Data Warehouse` where the user has write permissions. In the case of the `CARTO Data Warehouse` connection for this user account the directory is `carto-dw-ac-t4cgd7ox.data`. Once you have completed this configuration, click on *Continue*.

   ![Data Explorer create tileset settings](/img/cloud-native-workspace/tutorials/tutorial6_de_create_tileset_settings.png)

7. From the next screen, you can select the attributes of your table that will be included in the tileset. After completing this step, click on *Continue*. 

   ![Data Explorer create tileset attributes](/img/cloud-native-workspace/tutorials/tutorial6_de_create_tileset_attributes.png)

8. The last screen will show you a summary of the configuration of the tileset for your confirmation. Click on *Create* to confirm.

   ![Data Explorer create tileset confirmation](/img/cloud-native-workspace/tutorials/tutorial6_de_create_tileset_confirmation.png)

9. Tilesets take a while to process. Once the process is completed you will see the message in the “Processing jobs” tab on the top right corner of the screen (blue tab).

   ![Data Explorer processing running](/img/cloud-native-workspace/tutorials/tutorial6_de_processing_running.png)

10. Once the job has completed we can access the tileset in the Data Explorer and create a map visualization with all that data. 

    ![Data Explorer processing successfully](/img/cloud-native-workspace/tutorials/tutorial6_de_processing_successfully.png)

11. Click on *Create map* and this source will be added as a layer in Builder.

    ![Data Explorer create map from new tileset](/img/cloud-native-workspace/tutorials/tutorial6_de_create_map_from_new_tileset.png)

    ![Map created from new tileset](/img/cloud-native-workspace/tutorials/tutorial6_de_map_created_from_new_tileset.png)

12. Now let's style this layer as we want to build a cool visualization.

    ![Map fill based on](/img/cloud-native-workspace/tutorials/tutorial6_map_fill_based_on.png)

13. We can also make the map public and share it online with our colleagues. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial6_map_public.png)

14. Finally, we can visualize the result.

    <iframe width="800px" height="400px" src="https://gcp-europe-west1.app.carto.com/map/c04ec4da-1b01-4133-99fb-5daa8044b6cf"></iframe>