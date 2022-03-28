---
title: "Build an interactive map and embedded it"
description: "In this section, we provide a tutorial that showcases how easy it is to create an interactive map using CARTO Builder and share it, embed it on your web page, or using a low code tool to create a story map."
image: "/img/tutorials/tutorial11_share_pitch_bearing.png" 
type: tutorials
date: "2022-03-10"
# categories:
#     - easy
#     - embedded capabilities
---
## Build an interactive map and embedded it

**Context**

In this section, we provide a tutorial that showcases how easy it is to create an interactive map using CARTO Builder and share it, embed it on your web page, or using a low code tool to create a story map.

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

4. Select “paris_cycling_network” and explore the preview of the map and the details of the table. 

   ![Data Explorer map prewiew](/img/cloud-native-workspace/tutorials/tutorial11_de_map_preview.png)

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial11_de_data_preview.png)

5. Create a map by clicking the *Create map* button on the top. This will open the table as a layer on a CARTO Builder map. Check [Creating a map from your data](../../data-explorer/creating-a-map-from-your-data) to get started.

   ![Data Explorer create map from table](/img/cloud-native-workspace/tutorials/tutorial11_de_map_from_table.png)

6. Change layer name to “Paris cycling network”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial11_map_layer_rename.png)

7. Click *Layer style* to start styling the layer.

   ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial11_map_layer_options.png)

8. Click the “three dots” icon in the Stroke Color section and select “Stroke color Based on” feature `longeur`. Pick a palette for a sequential variable (gradient). Now the cycling network on the map will display a ramp color based on the length of the traces.  

   ![Map stroke style based on field](/img/cloud-native-workspace/tutorials/tutorial11_map_stroke_color_based_on_field.png)

9. Go to the *Widget tab*. If you haven’t created a widget yet, you will see the following page:
 
    ![Map widgets new widget](/img/cloud-native-workspace/tutorials/tutorial11_map_new_widget.png)

10. Click the *New widget* button and select "paris_cycling_network".

    ![Map widgets select source](/img/cloud-native-workspace/tutorials/tutorial11_map_widget_select_source.png)

    When you add a widget, it´s always the Formula widget by default, based on a Count operation on the number of features displayed on the map viewport:

    ![Map widgets formula by default](/img/cloud-native-workspace/tutorials/tutorial11_map_widget_formula_by_default.png)
	
11. Click the “three dots” icon and select the Rename option.

    ![Map widgets formula rename option](/img/cloud-native-workspace/tutorials/tutorial11_map_widget_formula_rename_option.png)

    Rename the widget to “Nº of cycling traces”.

    ![Map widgets formula rename](/img/cloud-native-workspace/tutorials/tutorial11_map_widget_formula_rename.png)

    Click the Back arrow to go back to the widget's list:

    ![Map widgets formula back](/img/cloud-native-workspace/tutorials/tutorial111_map_widget_formula_back.png)
	
12. Now we are going to add a few more interactive widgets (CATEGORY). Click the *Add widget* button and select “paris_cycling_network”.

    ![Map widgets select source category](/img/cloud-native-workspace/tutorials/tutorial11_map_widget_select_source_category.png)

    Select the CATEGORY widget, choose `SUM` operation from the list, select the column `highway` for the categorization, and the aggregation column `longeur`. Now the widget shows the length of the cycling network in meters for each highway category. 
    Rename the widget to “Cycling network by type and length (m)”, as explained in step 11. 

    ![Map category widget select field](/img/cloud-native-workspace/tutorials/tutorial11_map_category_widget_select_field.png)

    Now using the category widget, we can filter the data based on the highway type. For example, we can select the “cycleway” category from the list to highlight this particular category and temporally remove the others from your visualization, getting those traces from the network that are only destinated to cycling paths:
	
    ![Map category widget selected element](/img/cloud-native-workspace/tutorials/tutorial11_map_category_widget_selected_element.png)
	
	Click the “Clear” button to remove the selection.

    ![Map category widget clear element](/img/cloud-native-workspace/tutorials/tutorial11_map_category_widget_clear_element.png) ![Map category widget cleared element](/img/cloud-native-workspace/tutorials/tutorial11_map_category_widget_cleared_element.png)

13. We are going to add the last widget. For that, go back to the widget’s list, click the *Add widget* button and select “paris_cycling_network”. Choose the HISTOGRAM widget and select `longeur` for the aggregation column. In the Display options, change the number of buckets to 10. Rename the widget to “Cycling network by length (m)”, as explained in step 11.

    ![Map histogram widget selected field](/img/cloud-native-workspace/tutorials/tutorial11_map_histogram_widget_selected_field.png)

    You will get a histogram widget where you can filter the cycling network traces based on their length.
	
    ![Map histogram widget](/img/cloud-native-workspace/tutorials/tutorial11_map_histogram_widget.png)

14. Now let's configure the tooltip (or info window). Go to Interactions tab, activate the tooltip and select the fields `longeur`, `Highway` and `revetement`. 

    ![Map tooltips new tooltip](/img/cloud-native-workspace/tutorials/tutorial11_map_tooltip.png)

15. We can change our base map. Go to the Base maps tab and select “Voyager” from CARTO.

    ![Map basemap carto](/img/cloud-native-workspace/tutorials/tutorial11_map_basemap_carto.png)

16. Finally, we can change the name of the map to “Paris cycling network”.

    ![Map rename](/img/cloud-native-workspace/tutorials/tutorial11_map_rename.png)

17. Once the map is ready, we can share it online with your teammates or make it public. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps). We are going to select the option “Public map”.

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial11_map_public_map.png)
	
18. In the *Shared Link* tab, there are different sharing options, by clicking the “Copy public share link” button, the public map link will be copied in your clipboard and you can share it. Anyone with this link will be able to access the map in a "view mode", without the possibility to make any change in the source map. Users with the link will be able to zoom in and out, visualize map features, explore using the tooltip, and filter the map using the widgets.

    ![Map published map](/img/cloud-native-workspace/tutorials/tutorial111_map_published_map.png)
	
19. You can also control how it is displayed using URL parameters. This is especially helpful for integration with no/low-code tools, and story-telling with maps. We can control the center, zoom level, pitch, bearing, and visible layers of a public map by adding `lat` and `lng`, `center`, `pitch`, `bearing` and `layers` parameters. Check the complete reference [here](/carto-user-manual/maps/publishing-and-sharing-maps/#embed-api). Some examples:

    - Control the center and zoom level: https://gcp-us-east1.app.carto.com/map/c869093a-4eea-4239-a3ec-7cce66eb015e?lat=48.856087&lng=2.348647&zoom=15

    <iframe width="860px" height="680px" src="https://gcp-us-east1.app.carto.com/map/c869093a-4eea-4239-a3ec-7cce66eb015e?lat=48.856087&lng=2.348647&zoom=15"></iframe>


    - Control the pitch and bearing: https://gcp-us-east1.app.carto.com/map/c869093a-4eea-4239-a3ec-7cce66eb015e?lat=48.856087&lng=2.348647&zoom=15&pitch=40&bearing=90

    <iframe width="860px" height="680px" src="https://gcp-us-east1.app.carto.com/map/c869093a-4eea-4239-a3ec-7cce66eb015e?lat=48.856087&lng=2.348647&zoom=15&pitch=40&bearing=90"></iframe>

20. We can also embed this map in a website by Copy and Paste the HTML code into documents to show map on web pages. As we have done with the embedded maps shown on Step 19.

    ![Map embed map](/img/cloud-native-workspace/tutorials/tutorial111_map_embed_map.png)
	
	This is especially useful if you want to use your CARTO maps on your website, or to build a story map using a no/low-code tools (like Webflow, SquareSpace, etc.) or presentations tools (like Slides.com). <a href="https://slides.com/" target="_blank">Slides.com</a> is a tool for creating, presenting and sharing modern presentations. It enables anyone with a web browser to easily create beautiful presentations with interactivity (click, hover, etc.) that can simulate buttons, images, animations, iframes, and much more.

    ![Slides.com features](/img/cloud-native-workspace/tutorials/tutorial11_embedded_slides_settings_menu.png)
	
	In the iframes you can include the link to published CARTO Builder maps, as explained in step 18, like you can see in the following image:
	![Slides.com features](/img/cloud-native-workspace/tutorials/tutorial11_embedded_slides_settings.png)
	
	Check the <a href="https://maps.carto.io/analyzing-cycling-network.html?controls=false&progress=false" target="_blank">story map</a> that we created in Slides.com, using the "Paris cycling network" dataset of this tutorial, along with additional data from <a href="https://carto.com/spatial-data-catalog/" target="_blank">CARTO Data Observatory</a>.
	
	<a href="https://maps.carto.io/analyzing-cycling-network.html?controls=false&progress=false" target="_blank"><img src="/img/cloud-native-workspace/tutorials/tutorial11_embedded_app.png" alt="Ebedded Map Application"></a>