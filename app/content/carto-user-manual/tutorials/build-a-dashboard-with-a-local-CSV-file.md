---
title: "Build a dashboard with a local CSV file"
description: "In this tutorial we are going to showcase how to upload a local CSV file to your CARTO Data Warehouse and then use it to build an interactive dashboard with our map-making tool, Builder."
image: "/img/tutorials/las-vegas-spatial-features.png" 
type: tutorials
date: "2021-08-12"
# categories:
#     - easy
#     - widgets
---
## Build a dashboard with a local CSV file

**Context**

In this tutorial we are going to showcase how to upload a local CSV file to your CARTO Data Warehouse and then use it to build an interactive dashboard with our map-making tool, Builder.

As a local CSV file in this example we are going to use a dataset with a sample of [CARTO Spatial Features](https://carto.com/spatial-data-catalog/browser/dataset/cdb_spatial_fea_94e6b1f/) dataset in Las Vegas. You can download this file from [here](https://drive.google.com/file/d/1ezUqybFlQJNIz2fhT9QimEn7XO_7fZOO/view).

**Steps To Reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

    ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. From the Navigation Menu in the left panel, select Data Explorer. 

    ![Menu features data explorer](/img/cloud-native-workspace/tutorials/tutorial1_the_menu_features_data_explorer.png)

3. Click on the icon for uploading a local file that you can find at the top of the Connections tab.

    ![Data explorer import button](/img/cloud-native-workspace/tutorials/tutorial8_de_import_button.png)

4. In the modal screen, select the local file you want to upload and give a name to the imported table. The file will be uploaded to the CARTO Data Warehouse, and as mentioned in the introduction of this tutorial, we are going to use a dataset with a sample of CARTO Spatial Features that you can download from [here](https://drive.google.com/file/d/1ezUqybFlQJNIz2fhT9QimEn7XO_7fZOO/view). Click on *Continue*.

    ![Data explorer import data select file](/img/cloud-native-workspace/tutorials/tutorial8_de_import_data_select_file.png)

5. Review the details before starting the importing process and then click on *Import*. This will start the importing process, you can minimise the modal screen and continue working in CARTO while the file is being imported. 

    ![Data explorer import data confirmation](/img/cloud-native-workspace/tutorials/tutorial8_de_import_data_confirmation.png)

    ![Data explorer import data importing](/img/cloud-native-workspace/tutorials/tutorial8_de_import_data_importing.png)

6. When the import process completes, we can click on *Access Dataset* from the process window, and it will take you to the page of the imported table in the Data Explorer.

    ![Data explorer process window view dataset](/img/cloud-native-workspace/tutorials/tutorial8_de_process_window_view_dataset.png)

    ![Data explorer imported table](/img/cloud-native-workspace/tutorials/tutorial8_de_imported_table.png)

7. We click on *Create map* in order to start a map in CARTO Builder with the table loaded as a first layer. 

    ![Map create map from table](/img/cloud-native-workspace/tutorials/tutorial8_map_from_table.png)

8. We can change the layer name to something like “Spatial Features - Las Vegas”.

    ![Map rename layer](/img/cloud-native-workspace/tutorials/tutorial8_map_rename_layer.png)

9. We can also then start styling the layer. We click on *Layer style* and we are going to start by styling the hexagons based on one attribute. For that we click on the “three dots” icon in the Color section and we select that “Color Based On” the field `population`. 

    ![Map fill color based on](/img/cloud-native-workspace/tutorials/tutorial8_map_fill_color_based_on.png)

10. We change the Opacity to 0,6 to be able to visualize the information from the basemap (which we will change on a later step).

    ![Map change opacity](/img/cloud-native-workspace/tutorials/tutorial8_map_change_opacity.png)

11. We are going to activate the “Height” option and define “Height Based On” the field `elevation`. We configure the “Elevation Scale” to be 20 and the “Height Range” between 0 and 500.

    ![Map height](/img/cloud-native-workspace/tutorials/tutorial8_map_height.png)

12. We can modify the visualization to be a map in 3D by modifying the “Map view” options.

    ![Map 3D view](/img/cloud-native-workspace/tutorials/tutorial8_map_3D_view.png)

    ![Map 3D](/img/cloud-native-workspace/tutorials/tutorial8_map_3D.png)

13. We are now going to add some widgets to the map in order to be able to filter out the data and get some insights. Let’s now move to the “Widgets” section.

    ![Map widgets tab](/img/cloud-native-workspace/tutorials/tutorial8_map_widgets_tab.png)

14. We are going to first add a Formula widget that sums the total population. We modify the “Formatting” to the “12.3k” format.

    ![Map formula widget](/img/cloud-native-workspace/tutorials/tutorial8_map_formula_widget.png)

15. We change the widget name to “Total Population”.

    ![Map rename formula widget](/img/cloud-native-workspace/tutorials/tutorial8_map_rename_formula_widget.png)

    ![Map formula widget renamed](/img/cloud-native-workspace/tutorials/tutorial8_map_formula_widget_renamed.png)

16. We add a second widget to the map, now based on the “Histogram” type. We select the field `elevation` and modify the number of buckets to 12. We rename the widget to “Elevation”.

    ![Map histogram widget renamed](/img/cloud-native-workspace/tutorials/tutorial8_map_histogram_widget_renamed.png)

17. Let’s add a third widget to the map! We will now select the type “Category” and select the field `urbanity` from our table, leaving the operation to “Count”. We change the widget name to “Urbanity level”.

    ![Map category widget renamed](/img/cloud-native-workspace/tutorials/tutorial8_map_category_widget_renamed.png)

18. We are going to add a final “Histogram” widget. For this one, we are going to pick the field `prec_apr` from our table and change the number of buckets to 12. We change the name of the widget to “Avg. Precipitation April”. 
    
    ![Map second histogram widget renamed](/img/cloud-native-workspace/tutorials/tutorial8_map_second_histogram_widget_renamed.png)

19. We are now going to design the popup/info-windows that appear when we hover over the hexagon cells from the H3 grid. For that we move to the “Interactions” section.

    ![Map interactions tab](/img/cloud-native-workspace/tutorials/tutorial8_map_interactions_tab.png)

20. In the Tooltip we are going to select the following fields: `population`, `urbanity`, `elevation` and `prec_apr`. 

    ![Map interactions selected fields](/img/cloud-native-workspace/tutorials/tutorial8_map_interactions_selected_fields.png)

21. Check that now when we hover our cursor over the cells we see the information from the selected fields in the previous step. 

    ![Map interactions window](/img/cloud-native-workspace/tutorials/tutorial8_map_interactions_window.png)

22. We are now going to select the type of basemap that we want for our map. We move to the “Base maps” section. 

    ![Map basemaps tab](/img/cloud-native-workspace/tutorials/tutorial8_map_basemaps_tab.png)

23. We can pick basemaps from different providers, such as CARTO, Google Maps and Amazon Location. For example we are going to modify the default basemap by CARTO’s Voyager edition. 

    ![Map basemaps carto voyager](/img/cloud-native-workspace/tutorials/tutorial8_map_basemaps_carto_voyager.png)

24. Another cool functionality of CARTO Builder is the ability to have a dual map configuration. We can switch to this mode by selecting it from the “Map view” options.

    ![Map dual view](/img/cloud-native-workspace/tutorials/tutorial8_map_dual_view.png)

    ![Map dual](/img/cloud-native-workspace/tutorials/tutorial8_map_dual.png)

25. In order to have a different visualization in each of the maps. We are going to duplicate our current layer. 

    ![Map duplicate layer](/img/cloud-native-workspace/tutorials/tutorial8_map_duplicate_layer.png)

26. We rename the layer as “B Layer”. 

    ![Map rename duplicated layer](/img/cloud-native-workspace/tutorials/tutorial8_map_rename_duplicated_layer.png)

27. We now ensure that each of the 2 maps is visualizing a different layer. For this we click on the button *Show layer panel*.

    ![Map show layer panel](/img/cloud-native-workspace/tutorials/tutorial8_map_show_layer_panel.png)

28. In each of the maps we make visible only one of the layers.

    ![Map visible layers](/img/cloud-native-workspace/tutorials/tutorial8_map_visible_layers.png)


29. We are going to modify the second layer. For that we click on *Layer style* in one of the options for the layer named “B Layer”.

    ![Map layer style](/img/cloud-native-workspace/tutorials/tutorial8_map_layer_style.png)

30. We are going to style the color of the layer based on the field `tavg_apr` (i.e. average temperature in the months of April over a period of 20 years). We can pick a different color palette.

    ![Map second layer fill color](/img/cloud-native-workspace/tutorials/tutorial8_map_second_layer_fill_color.png)

31. We are going to use the attribute `prec_apr` (i.e. average precipitation in the months of April over a period of 20 years) as the Height. 

    ![Map second layer height](/img/cloud-native-workspace/tutorials/tutorial8_map_second_layer_height.png)

    ![Map dual styled](/img/cloud-native-workspace/tutorials/tutorial8_map_dual_styled.png)

32. Now that we are done styling our layers, we can hide the editor panel by clicking on the icon below and start operating the dashboard through the widgets.

    ![Map editor panel hidden](/img/cloud-native-workspace/tutorials/tutorial8_map_editor_panel_hidden.png)

33. For example we can filter the layers in order to analyse the Rural and Remote areas with higher precipitations in April. 

    ![Map first filter](/img/cloud-native-workspace/tutorials/tutorial8_map_first_filter.png)

35. Or we can filter the Very high density urban, High density urban and Medium density urban areas at higher elevations.

    ![Map second filter](/img/cloud-native-workspace/tutorials/tutorial8_map_second_filter.png)

36. We can finally change the privacy settings of the map or even publishing it online by clicking on the “Share” options.

    ![Map share button](/img/cloud-native-workspace/tutorials/tutorial8_map_share_button.png)

37. We select the option to make this a “Public map”, which we then can share by providing an URL.

    ![Map public option](/img/cloud-native-workspace/tutorials/tutorial8_map_public_option.png)

    ![Map public option](/img/cloud-native-workspace/tutorials/tutorial8_map_public_map.png)

38. Finally, we can visualize the result.

    <iframe width="800px" height="400px" src="https://gcp-us-east1.app.carto.com/map/37911dd4-613e-4aa2-bbe7-c9694a50281b"></iframe>