---
title: "Build an animated visualization with time series"
description: "There is an increasing need for conservation and connection with nature in cities. In this sense, geospatial analysis plays an important role in the effective management of our natural resources. In this tutorial we are going to represent the distribution of tree species in the streets of San Francisco by color and we will add some interaction through widgets, which will allow us to explore the map by selecting targered filters of interest. In this example, filters are applied by specie and date of planting." 
image: "/img/tutorials/animated.png" 
type: tutorials
date: "2021-06-12"
# categories:
#     - easy
#     - widgets
---
## Build an animated visualization with time series

**Context**

There is an increasing need for conservation and connection with nature in cities. In this sense, geospatial analysis plays an important role in the effective management of our natural resources.

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

    ![Data Explorer map prewiew](/img/cloud-native-workspace/tutorials/tutorial2_de_map_preview.png)

    ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial2_de_map_preview.png)

5. Create a map by clicking on the *Create map* button on the top. This will open the table as a layer on a CARTO Builder map. Check [Creating a map from your data](../../data-explorer/creating-a-map-from-your-data) to get started.

    ![Data Explorer create map from table](/img/cloud-native-workspace/tutorials/tutorial2_de_map_from_table.png)

6. Change the title of the map to "San Francisco Street Trees" and the layer name to “San Francisco trees”.

    ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial2_map_title_rename.png)

    ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial2_map_layer_rename.png)

7. Change the basemap. Go to Basemaps tab and select “Dark matter” from CARTO.

    ![Map basemap carto](/img/cloud-native-workspace/tutorials/tutorial2_map_basemap_dark_carto.png)

8. Click on *Layer style* to start styling the layer.

    ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial2_map_layer_options.png)

9. Click on the “three dots” icon in the Fill Color section and select “Color Based On” feature `species`. Pick a palette for a categorical variable (versus a gradient).  

    ![Map fill style based on field](/img/cloud-native-workspace/tutorials/tutorial2_map_fill_color_based_on.png)

10. Modify the Radius of the points to make them smaller.
 
    ![Map style radius](/img/cloud-native-workspace/tutorials/tutorial2_map_change_the_radius.png)

11. Go to Widget tab. If you haven't created a widget yet, you will see the following page:

    ![Map widgets add new widget](/img/cloud-native-workspace/tutorials/tutorial2_map_add_new_widget.png)

12. Click on *New widget* button and select "san_francisco_street_trees".

    ![Map widgets select source](/img/cloud-native-workspace/tutorials/tutorial2_map_widget_select_the_source.png)

    When you add a widget, it´s always the Formula widget by default:

    ![Map widget formula by default](/img/cloud-native-workspace/tutorials/tutorial2_map_default_widget_formula.png)

13. Select CATEGORY widget, choose `COUNT` operation from the list and select the column `species`. Now we can filter data by type of species.

    ![Map category widget selected field](/img/cloud-native-workspace/tutorials/tutorial2_map_category_widget_select_the_field.png)

14. Click on the *Back* arrow and then click on *Add widget* to add a second widget (TIME-SERIES), now based on `plant_date`. You will get a time-series widget in order to be able to filter the species based on their plant date.

    ![Map time-series widget selected field](/img/cloud-native-workspace/tutorials/tutorial2_map_time-series_widget_select_the_field.png)

15. Change the default bucket size to "Years" to display different groups of data. You can also include some animation by enabling *Animation controls*.

    ![Map widgets animation](/img/cloud-native-workspace/tutorials/tutorial2_map_widgets_animation_controls.png)

16. Let´s the names of both widgets for "Nº of Species" and “Plant date”. Click on the *Back* arrow and then click on the “three dots” icon to configure rename your widgets.

    ![Map widgets rename](/img/cloud-native-workspace/tutorials/tutorial2_map_widgets_renaming.png)

17. We can also collapse all widgets when we do not need them by enabling *Collapsible control* on the botton of each widget configuration.

    ![Map tooltips new tooltip](/img/cloud-native-workspace/tutorials/tutorial2_map_collapsible_button.png)

    ![Map tooltips new tooltip](/img/cloud-native-workspace/tutorials/tutorial2_map_collapsible_widgets.png)

18. Now let's configure the tooltip (or info window). Go to Interactions tab, activate the tooltip and select the field `species`. 

    ![Map tooltips new tooltip](/img/cloud-native-workspace/tutorials/tutorial2_map_show_tooltip.png)

19. We can make the map public and share it online with our colleagues. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial2_map_public_map_options.png)

20. Finally, we can visualize the result.

    <iframe width="800px" height="400px" src="https://gcp-us-east1.app.carto.com/map/28cf32ed-9901-4865-a523-d2ec48fc36b9"></iframe>
