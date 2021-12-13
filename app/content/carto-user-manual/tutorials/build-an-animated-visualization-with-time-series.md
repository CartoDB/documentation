---
title: "Build an animated visualization with time series"
description: "There is an increasing need for conservation and connection with nature in cities. In this sense, geospatial analysis plays an important role in the effective management of our natural resources. In this tutorial we are going to represent the distribution of tree species in the streets of San Francisco by color and we will add some interaction through widgets, which will allow us to explore the map by selecting targered filters of interest. In this example, filters are applied by specie and date of planting." 
image: "/img/tutorials/animated.png" 
type: tutorials
date: "2021-08-12"
categories:
    - easy
---
## Build an animated visualization with time series

**Context**

There is an increasing need for conservation and connection with nature in cities. In this sense, geospatial analysis plays an important role in the effective management of our natural resources.

<!-- This dataset is provided by San Francisco Department of Public Works, and it includes a list of maintained streets trees including: Planting data, species and location. -->

In this tutorial we are going to represent the distribution of tree species in the streets of San Francisco by color and we will add some interaction through widgets, which will allow us to explore the map by selecting targered filters of interest. In this example, filters are applied by specie and date of planting.

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

4. Selected "san_francisco_street_trees" and explore the preview of the map and the details of the table. 

   ![Data Explorer map prewiew](/img/cloud-native-workspace/tutorials/tutorial2_map_preview.png)

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial2_data_preview.png)

5. Create a map by clicking on the *Create > Create map* button on the top. This will open the table as a layer on a CARTO Builder map. Check [Creating a map from your data](../../data-explorer/creating-a-map-from-your-data) to get started.

   ![Data Explorer create map from table](/img/cloud-native-workspace/tutorials/tutorial2_create_map_from_table.png)

6. Change layer name to “San Francisco trees”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial2_map_layer_rename.png)

7. Change the basemap. Go to Basemaps tab and select “Dark matter” from CARTO.

    ![Map basemap](/img/cloud-native-workspace/tutorials/tutorial2_map_basemap.png)

8. Click on *Layer style* to start styling the layer.

   ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial2_map_layer_options.png)

   ![Map layers style](/img/cloud-native-workspace/tutorials/tutorial2_map_layer_style.png)

9. Click on the “three dots” icon in the Fill Color section and select “Color Based On” feature `species`. Pick a palette for a categorical variable (versus a gradient).  

   ![Map fill style based on field](/img/cloud-native-workspace/tutorials/tutorial2_map_fill_based_on.png)

10. Modify the Radius of the points to make them smaller.
 
   ![Map style radius](/img/cloud-native-workspace/tutorials/tutorial2_map_radius.png)

11. Go to Widget tab. If you haven't created a widget yet, you will see the following page:

    ![Map widgets add new widget](/img/cloud-native-workspace/tutorials/tutorial2_map_add_new_widget.png)

12. Add a widget based on the column `species`. Now we can filter the data based on type of tree.

    ![Map widgets first widget](/img/cloud-native-workspace/tutorials/tutorial2_map_first_widget.png)

    ![Map widgets first widget_values in](/img/cloud-native-workspace/tutorials/tutorial2_map_first_widget_valuesin.png)

13. Add a second widget, now based on `plant_date`. This will generate a time-series widget directly on the map.

    ![Map widgets second widget](/img/cloud-native-workspace/tutorials/tutorial2_map_second_widget.png)

14. Modify the time window to be “incremental”.

    ![Map widgets second widget incremental](/img/cloud-native-workspace/tutorials/tutorial2_map_second_widget_incremental.png)


14. Now let's configure the tooltip (or info window). Go to Interactions tab, activate the tooltip and select the field `species`. 

    ![Map widgets new tooltip](/img/cloud-native-workspace/tutorials/tutorial2_map_tooltip.png)

15. We can make the map public and share it online with our colleagues. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial2_map_public.png)

16. Finally, we can visualize the result.

    <iframe width="800x" height="400px" src="https://gcp-europe-west1.app.carto.com/map/7bcfaa45-137f-4ecc-8527-5f40f54ada7d"></iframe>