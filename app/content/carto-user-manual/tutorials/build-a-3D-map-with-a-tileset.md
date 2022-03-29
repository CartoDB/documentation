---
title: "Build a 3D map with a tileset"
description: "A geospatial analysis of land use dynamics has special relevance for the management of many phenomena, such as the assessment of the loss of soil due to erosion or the reduction of rural land in favour of the built-up areas. In this regard, Digital elevation Models (DEM) are important inputs to quantify the characteristics of the land surface. In this example we are building a map from a tileset createad by CARTO from a new NASA Digital Elevation Model (NASADEM). We are going to represent the distribution of land elevation by using a gradual color palette and then build a 3D visualization by assigning heights to polygons." 
image: "/img/tutorials/3d.png"
type: tutorials
date: "2021-02-12"
# categories:
#     - easy
#     - 3D
---
## Build a 3D map with a tileset

**Context**

A geospatial analysis of land use dynamics has special relevance for the management of many phenomena, such as the assessment of the loss of soil due to erosion or the reduction of rural land in favour of the built-up areas.
In this regard, Digital elevation Models (DEM) are important inputs to quantify the characteristics of the land surface.

In this example we are building a map from a tileset createad by CARTO from a new NASA Digital Elevation Model (NASADEM). We are going to represent the distribution of land elevation by using a gradual color palette and then build a 3D visualization by assigning heights to polygons.

<!-- This dataset is provided by Earthdata Nasa Organization. NASADEM is a modernization of the Digital Elevation Model (DEM) and associated products generated from the Shuttle Radar Topography Mission (SRTM) data. CARTO has transformed the original NASADEM HGT v001 raster data into a common geographic support, the Quadkey grid. -->
 
**Steps To Reproduce**

1. Go to the <a href="http://app.carto.com/signup" target="_blank">CARTO signup</a> page.
   - Click on *Log in*.
   - Enter your email address and password. You can also log in with your existing Google account by clicking *Continue with Google*.
   - Once you have entered your credentials: click *Continue*.

   ![Log in Email and password](/img/cloud-native-workspace/get-started/login.png)

2. From the Navigation Menu in the left panel, select Data Explorer. 

   ![Menu features data explorer](/img/cloud-native-workspace/tutorials/tutorial1_the_menu_features_data_explorer.png)

3. Select the [CARTO Data Warehouse](../../connections/carto-data-warehouse) connection and click on *demo data > demo_tilesets* from the collapsible tree. 

   ![Data Explorer content carto data warehouse](/img/cloud-native-workspace/tutorials/tutorial3_content_carto_dw_demo_tilesets.png)

4. Selected "nasadem_glo_quadgrid15" and explore the details and metadata of the tileset. 

   ![Data Explorer tileset details](/img/cloud-native-workspace/tutorials/tutorial3_de_tileset_details.png)

   ![Data Explorer tileset metadata](/img/cloud-native-workspace/tutorials/tutorial3_de_tileset_metadata.png)

5. Create a map by clicking on the *Create map* button on the top. This will open the tileset as a layer on a CARTO Builder map. Check [Creating a tileset from your data](../../data-explorer/creating-a-tileset-from-your-data) to get started.

   ![Data Explorer create map from tileset](/img/cloud-native-workspace/tutorials/tutorial3_map_from_tileset.png)

6. Change layer name to “NASADEM elevation”.

   ![Map layers rename](/img/cloud-native-workspace/tutorials/tutorial3_map_layer_rename.png)

7. Click on *Layer style* to start styling the layer.

   ![Map layers options](/img/cloud-native-workspace/tutorials/tutorial3_map_layer_option.png)

8. Click on the “three dots” icon in the Fill Color section and select “Color Based On” feature `elevation`. Select a sequential color palette for this type of feature. 

   ![Map fill style based on field](/img/cloud-native-workspace/tutorials/tutorial3_map_fill_color_based_on_field.png)

9. In order to be able to visualize this data on a 3D map, we need to detail what feature should be used to obtain the “height” information. Click on the “three dots” icon in the Height section and in the field “Height Based On” pick the feature `elevation` with a linear scale. 

   ![Map fill based on](/img/cloud-native-workspace/tutorials/tutorial3_map_filled_color.png)

   You can change the height using the height slider or by directly inputting the height in the 
text input.

   ![Map height slider](/img/cloud-native-workspace/tutorials/tutorial3_map_height_slider.png)

10. Finally, modify the map visualization to be in 3D by clicking on the “cube” icon in the top bar. 

    ![Map 3D map icon](/img/cloud-native-workspace/tutorials/tutorial3_map_3D_icon.png)

    ![Map 3D map](/img/cloud-native-workspace/tutorials/tutorial3_map_3D_view.png)

11. We can also make the map public and share it online with our colleagues. For more details, see [Publishing and sharing maps](../../maps/publishing-and-sharing-maps).

    ![Map public map](/img/cloud-native-workspace/tutorials/tutorial3_map_public_map.png)

12. Finally, we can visualize the result.

    <iframe width="800px" height="400px" src="https://gcp-us-east1.app.carto.com/map/0b426434-bb05-40b5-a3cf-157e13b3c48b"></iframe> 

  <!--   <iframe width="800x" height="400px" src="https://gcp-europe-west1.app.carto.com/map/7812419f-a7da-4c62-a734-0c1117f6e90a"></iframe> -->