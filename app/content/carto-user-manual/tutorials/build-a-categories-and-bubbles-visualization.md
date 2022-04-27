---
title: "Build a categories & bubbles visualization"
description: "Understanding population distribution has important implications in a wide range of geospatial analysis such as human exposure to hazards and climate change or improving geomarketing and site selection strategies. In this tutorial we are going to represent the distribution of the most populated places by applying colours to each type of place and a point size based on the maximum population. Therefore, we can easily understand how the human settlement areas is distributed with a simple visualization that we can use in further analysis."
image: "/img/tutorials/bubbles.png" 
type: tutorials
date: "2021-09-12"
# categories:
#     - easy
#     - widgets
---
## Build a categories & bubbles visualization

**Context**

Understanding population distribution has important implications in a wide range of geospatial analysis such as human exposure to hazards and climate change or improving geomarketing and site selection strategies.

In this tutorial we are going to represent the distribution of the most populated places by applying colours to each type of place and a point size based on the maximum population. Therefore, we can easily understand how the human settlement areas is distributed with a simple visualization that we can use in further analysis.

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

4. Selected "populated_places" and explore the preview of the map and the details of the table. 

   ![Data Explorer map prewiew](/img/cloud-native-workspace/tutorials/tutorial1_de_map_preview.png)

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial1_de_data_preview.png)

5. Create a map by clicking on the *Create map* button on the top. This will open the table as a layer on a CARTO Builder map. Check [Creating a map from your data](../../data-explorer/creating-a-map-from-your-data) to get started.

   ![Data Explorer create map from table](/img/cloud-native-workspace/tutorials/tutorial1_de_map_from_the_table.png)

6. Change layer name to “Populated Places”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial1_map_layer_rename.png)

7. Click on *Layer style* to start styling the layer.

   ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial1_map_layer_options.png)

8. Click on the “three dots” icon in the Fill Color section and select “Color Based On” feature `featurecla`. It has information about what kind of places there are. Pick a palette for a categorical variable (versus a gradient).  

   ![Map fill style based on field](/img/cloud-native-workspace/tutorials/tutorial1_map_fill_color_based_on_a_field.png)

9. Now click on the options for the Radius configuration and in the section “Radius Based On” pick the column `pop_max`. Play with the minimum/maximum size to style the layer as you like.
 
   ![Map style radius additional features](/img/cloud-native-workspace/tutorials/tutorial1_map_radius_based_on_field.png)

10. Go to Widget tab. If you haven't created a widget yet, you will see the following page:

    ![Map widgets new widget](/img/cloud-native-workspace/tutorials/tutorial1_map_no_widget_added.png)

11. Click on *New widget* button and select "populated_places".

    ![Map widgets select source](/img/cloud-native-workspace/tutorials/tutorial1_map_widget_select_a_source.png)

    When you add a widget, it´s always the Formula widget by default:

    ![Map widgets formula by default](/img/cloud-native-workspace/tutorials/tutorial1_map_formula_widget_by_default.png)

12. Select CATEGORY widget, choose `COUNT` operation from the list and select the column `admin0name`. Now we can filter the data based on the country.

    ![Map category widget selected column](/img/cloud-native-workspace/tutorials/tutorial1_map_category_widget_selected_column.png)

13. Select "United States of America" from the list to highlight this particular category and temporally remove the others from your visualization:

    ![Map category widget selected element](/img/cloud-native-workspace/tutorials/tutorial1_map_category_widget_select_an_element.png)

14. Click on the *Back* arrow and then click on *Add widget* to add a second widget (HISTOGRAM), now based on `pop_max`. You will get a histogram widget in order to be able to filter the populated places based on their population.

    ![Map histogram widget selected field](/img/cloud-native-workspace/tutorials/tutorial1_map_histogram_widget_selected_a_field.png)

15. Change the names of both widgets for "Nº of Countries" and “Size (inhab.)”. Click on the *Back* arrow and then click on the “three dots” icon to configure rename your widgets.

    ![Map widgets rename](/img/cloud-native-workspace/tutorials/tutorial1_map_widgets_renaming.png)

16. You can also change the format as the values are displayed and add some notes to your widget.

    ![Map histogram widget note](/img/cloud-native-workspace/tutorials/tutorial1_map_histogram_widget_add_note.png) 

17. Now let's configure the tooltip (or info window). Go to Interactions tab, activate the tooltip and select the fields `admin0name`, `Featurecla` and `Pop_max`. 

    ![Map tooltips new tooltip](/img/cloud-native-workspace/tutorials/tutorial1_map_show_tooltip.png)

18. Finally we can change our basemap. Go to Basemaps tab and select “Dark matter” from CARTO.

    ![Map basemap carto](/img/cloud-native-workspace/tutorials/tutorial1_map_basemap_carto_dark.png)

19. Rename the map to "Populated Places".

    ![Map rename title](/img/cloud-native-workspace/tutorials/tutorial1_map_rename_title.png)

20. We can make the map public and share it online with our colleagues. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial1_map_sharing_options.png)
 
21. Finally, we can visualize the result.

      <iframe width="800px" height="400px" src="https://gcp-us-east1.app.carto.com/map/89271f82-fb00-4072-bb01-2204797c5509"></iframe>