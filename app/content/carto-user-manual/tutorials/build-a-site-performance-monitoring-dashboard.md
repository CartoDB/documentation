---
title: "Build a retail store performance monitoring dashboard"
description: "In this tutorial we are going to vizualize revenue performance and surface area of retail stores across the USA. We will construct two views, one of individual store performance using bubbles, and one of aggregated performance using hexagons. By vizualizing this information on a map we can easily identify where our business is performing better and which are the most successful stores (revenue inversely correlated with surface area)."
image: "/img/tutorials/retail-stores-usa.png" 
type: tutorials
date: "2022-04-28"
# categories:
#     - easy
#     - widgets
---
## Build a store performance monitoring dashboard for retail stores in the USA

**Context**

In this tutorial we are going to vizualize revenue performance and surface area of retail stores across the USA. We will construct two views, one of individual store performance using bubbles, and one of aggregated performance using hexagons. 

By vizualizing this information on a map we can easily identify where our business is performing better and which are the most successful stores (revenue inversely correlated with surface area).

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

4. Selected "retail_stores" and explore the preview of the map and the details of the table. 

   ![Data Explorer map prewiew](/img/cloud-native-workspace/tutorials/tutorial12_de_map_preview.png)

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial12_de_data_preview.png)

5. Create a map by clicking on the *Create map* button on the top. This will open the table as a layer on a CARTO Builder map. Check [Creating a map from your data](../../data-explorer/creating-a-map-from-your-data) to get started.

   ![Data Explorer create map from table](/img/cloud-native-workspace/tutorials/tutorial12_de_map_from_the_table.png)

6. Change layer name to “Retail Stores”. Click on *Layer style* to start styling the layer.

   ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial12_map_layer_options.png)

7. Click on the “three dots” icon in the Fill Color section and select “Color Based On” feature `Size_m2`. Pick a gradient palette (versus one for a categorical variable), and set the gradient steps to 8

   ![Map fill style based on field](/img/cloud-native-workspace/tutorials/tutorial12_map_fill_color_based_on_field.png)

8. Now click on the options for the Radius configuration and in the section “Radius Based On” pick the column `Revenue`. Play with the minimum/maximum size to style the layer as you like.
 
   ![Map style radius additional features](/img/cloud-native-workspace/tutorials/tutorial12_map_radius_based_on_field.png)

9. Go to Widget tab. If you haven't created a widget yet, you will see the following page:

    ![Map widgets new widget](/img/cloud-native-workspace/tutorials/tutorial12_map_no_widget_added.png)

10. Click on *New widget* button and select "retail_stores".

    ![Map widgets select source](/img/cloud-native-workspace/tutorials/tutorial12_map_widget_select_a_source.png)

11. First, we create a widget for the Total Revenue. Select the SUM operation on the revenue field, adjusting the output value format to Currency. Add a note to indicate we are calculating revenue shown in the viewport. Rename to "Total Revenue":

    ![Map formula widget selected column](/img/cloud-native-workspace/tutorials/tutorial12_map_formula_widget.png)

12. Next, we will create a widget to filter by store type. Select CATEGORY widget, choose `COUNT` operation from the list and select the column `storetype`. Make the widget collapsible and rename to "Type of store".

    ![Map category widget selected column](/img/cloud-native-workspace/tutorials/tutorial12_map_category_widget.png)

    Select "Discount Store" from the list to highlight the category:

    ![Map category widget selected element](/img/cloud-native-workspace/tutorials/tutorial12_map_category_widget_selected_element.png)

13. Then, we create a third widget, a histogram to filter stores by revenue. Create a widget of type HISTOGRAM, based on `revenue`. Set the buckets to 10, formatting to Currency, and make widget collapsible. Rename to "Stores by revenue".

    ![Map histogram widget selected column](/img/cloud-native-workspace/tutorials/tutorial12_map_histogram_widget.png)

14. Now let's configure the tooltip (or info window). Go to Interactions tab, activate the tooltip and select the field `Storetype`, `Address`, `City`, `State`, `Revenue` and `Size_m2`.  

    ![Map tooltips new tooltip](/img/cloud-native-workspace/tutorials/tutorial12_map_show_tooltip.png)

15. Let´s also change our basemap. Go to Basemaps tab and select “Voyager” from CARTO.

    ![Map basemap carto](/img/cloud-native-workspace/tutorials/tutorial12_map_basemap_carto_voyager.png)

16. Next, let´s create a second view of our map. Go to layers and create a new layer by duplicating the "Retail Stores" layer (go to layer menu and click on Duplicate layers).

    ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial12_map_layer_options.png)

17. The second layer will aggregate the revenue values of all stores across separate geographies represented by Hexagons. Select Hexbin as layer type and 28.5km as Hexagon radius. 
Remember to hide the first layer to vizualize the second layer alone.

    ![Map change layer to hexagon](/img/cloud-native-workspace/tutorials/tutorial12_map_hexagon_layer.png)

18. Change the color palette to a gradient of different color than first layer. Set the color to be based on `Revenue`, and aggregate by `Sum`. 

    ![Map fill style based on field](/img/cloud-native-workspace/tutorials/tutorial12_map_hexagon_fill_color_based_on_field.png)

19. Finally, set the height of the hexagons to be based on `Size_m2`, `Linear`size scale, height range between 0 and 500, aggregating Revenue by `Average`, and Height multiplier to 400. Set the Map view to 3D for better results

    ![Map set hexagon height based on field](/img/cloud-native-workspace/tutorials/tutorial12_map_hexagon_set_height_based_on_field.png)

20. Rename the layer to "Revenue grid (3D view)".

21. Enable map dual view. On the left map disable the Revenue grid layer, on the right map disable the Retail stores layer. 

    ![Map dual view of dashboards](/img/cloud-native-workspace/tutorials/tutorial12_map_dual_view.png)

    As we can see, in metro areas in the west coast we have more stores of lower surface area, yet their revenues are much higher than rural areas, where we have stores with higher surface areas. 

22. Switch back to single map Normal view. Hide the Revenue grid layer. Rename the map to "Monitor retail store performance".

    ![Map rename title](/img/cloud-native-workspace/tutorials/tutorial12_map_rename_title.png)

23. We can make the map public and share it online with our colleagues. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial12_map_sharing_options.png)
 
24. Finally, we can visualize the result.

      <iframe width="800px" height="400px" src="https://gcp-us-east1.app.carto.com/map/f2653124-fdb3-4e93-a16b-b8edae70697d"></iframe>