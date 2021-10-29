## Build a 3D map with a tileset

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. From the Navigation Menu in the left panel, select Data Explorer. 

   ![Menu features data explorer](/img/cloud-native-workspace/tutorials/tutorial1_the_menu_features_data_explorer.png)

3. Select the [CARTO Data Warehouse](../../connections/carto-data-warehouse) connection and click on *demo data > demo_tilesets* from the collapsible tree. 

   ![Data Explorer content carto data warehouse](/img/cloud-native-workspace/tutorials/tutorial3_content_carto_dw_demo_tilesets.png)

4. Selected "nasadem_glo_quadgrid15" and explore the details and metadata of the tileset. 

   ![Data Explorer map prewiew](/img/cloud-native-workspace/tutorials/tutorial3_tileset_details.png)

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial3_tileset_metadata.png)

5. Create a map by clicking on the *Create map* button on the top. This will open the table as a layer on a CARTO Builder map. Check the [Creating a tileset from your data](../../data-explorer/creating-a-tileset-from-your-data) to get started.

   ![Data Explorer data prewiew](/img/cloud-native-workspace/tutorials/tutorial3_create_map_from_tileset.png)

6. Change layer name to “NASADEM elevation”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial3_map_layer_rename.png)

7. Click on *Layer style* to start styling the layer.

   ![Map layers style](/img/cloud-native-workspace/tutorials/tutorial3_map_layer_style.png)

8. Click on the “three dots” icon in the Fill Color section and select “Color Based On” feature `elevation`. Select a sequential color palette for this type of feature. 

   ![Map fill style based on field](/img/cloud-native-workspace/tutorials/tutorial3_map_fill_based_on.png)

9. In order to be able to visualize this data on a 3D map, we need to detail what feature should be used to obtain the “height” information. Click on the “three dots” icon in the Height section and in the field “Height Based On” pick the feature `elevation` with a linear scale.

   ![Map height](/img/cloud-native-workspace/tutorials/tutorial3_map_height.png)

   You can also change the height using the height slider or by directly inputting the height in the 
text input.

   ![Map height slider](/img/cloud-native-workspace/tutorials/tutorial3_map_height_slider.png)

10. Finally, modify the map visualization to be in 3D by clicking on the “cube” icon in the top bar. 

   ![Map 3D map](/img/cloud-native-workspace/tutorials/tutorial3_map_3D.png)

11. We can also make the map public and share it online with our colleagues. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

   ![Map public map](/img/cloud-native-workspace/tutorials/tutorial3_map_public.png)
