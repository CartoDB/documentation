## Maps

The Cloud Native Workspace includes functionalities for creating and publishing maps in a simple way, through the Cloud Native map tool: Builder.
Builder is designed to allow technical and non-technical audiences to visualize, explore and filter large amount of location data in your browser.

This guide will teach you how to create a map in the Cloud Native Builder, and perform data analysis by adding data to a map, adding filters, and more.

In the *Maps* section of the Workspace, you will see the list of your current maps. If you haven’t created a map yet, you will see the following page:

![Maps module](/img/cloud-native-workspace/guides/maps/maps_module.png)

For creating a new map, click *New map*. This will open the Cloud Native map tool: Builder.

### Add data

The *Add data* options appear, where you can upload new datasets using a local file or add a dataset from your existing data warehouse connection.

#### ADD DATA FROM LOCAL FILE

In the *Add data* section Click *Local file*.

![Add data from local file](/img/cloud-native-workspace/guides/maps/map_add_layer_local_file.png)

A new dialog will open so you can upload a CSV, Json, GeoJSON or saved map Json file. You can browse your files, or drag & drop them into the dotted area of the dialog.

![Upload data](/img/cloud-native-workspace/guides/maps/map_add_layer_local_file_upload.png)

Once data is imported, the dataset and layers appears in Builder by default.

![Upload data](/img/cloud-native-workspace/guides/maps/map_add_layer_local_file_paris.png)

You can keep adding multiple data to your map from your different data sources.

#### ADD DATA FROM A CONNECTION

You can create maps using data hosted in your data warehouses. You can use this [guide](../../guides/connections) to learn how to create a new connection.

In the *Add data* section you will see your existing connections. When choosing one of your connections, a meny will show you different options to add data. We can use a Query to retrieve data, add a whole Table, or a Tileset.
	
![Add data from connection](/img/cloud-native-workspace/guides/maps/map_add_layer_connection.png)
	
In this example we are going to use a Table. The next step is entering the fully qualified table name and click *add*.

![Enter table name](/img/cloud-native-workspace/guides/maps/map_add_table_name.png)

Once data is imported, the dataset and layers appears in Builder by default.

![Map created](/img/cloud-native-workspace/guides/maps/map_setup.png)

You can keep adding multiple data to your map from your different data sources.

### View data table

Once you have added your datasets to the map, you can visualize the data table. Click the *View table* button and your dataset table will be shown. 

![Map created](/img/cloud-native-workspace/guides/maps/map_view_table.png)

By clicking the *tree dots* icon the Column Context menu will reveal additional options like: Sort on this column, ascending or descending, Pin the column so you can freeze it in the first position, and copy column data.

![Map created](/img/cloud-native-workspace/guides/maps/map_view_table_column.png)

### Map settings

#### BASEMAPS

Basemaps are image tiles that are used to render the graphical representation of your map background. Basemaps include the natural and cultural features of the world; such as water bodies, topography, park areas, terrains, roads, streets, and sometimes buildings.

The Cloud Native Builder provides a set of CARTO basemaps styles as background map. By default, basemaps are projected using the <a href="https://en.wikipedia.org/wiki/Web_Mercator_projection" target="_blank">Webmercator projection</a>. To setup your map's base map, open the *Base Map panel* to select from a list of default map styles.

![Map created](/img/cloud-native-workspace/guides/maps/map_basemap.png)

Open the basemap style drop down menu to see different basemap options. They include:
- **Voyager**: basemap with colors to clearly differentiate natural and cultural features. This basemap is showed by default when creating a new map.
- **Positron**: light basemap with dark-colored text.
- **Dark**: dark basemap with light-colored text.

![Map created](/img/cloud-native-workspace/guides/maps/map_basemap_list.png)

**Basemap layers:** You can manage basemaps layers to hide and show water, buildings, roads, and more. Options include: 

- Labels: shows labels for cities, neighborhoods, and so on.
- Roads: displays a translucent layer of road lines.
- Borders: shows state and continent borders.
- Buildings: shows building footprints.
- Water: displays bodies of water.
- Land: Shows parks, mountains, and other landscape features.

![Basemap layers order](/img/cloud-native-workspace/guides/maps/map_basemap_layer_show.png)

**Basemap layer order:** to control the order in which map imagery layers are displayed, click the *move to top of data layers* icon:

![Basemap layers order](/img/cloud-native-workspace/guides/maps/map_basemap_layer_order.png)

#### LAYERS

Once your datasets are connected to your map, as explained in this [guide](../../guides/maps/#add-data), you can use Builder to discover key insights about your location data. This guide describes how to view and work with map layers in the Cloud Native Builder.

When opening a map, layers for the selected map appear. The layers list appears by default, displaying the basemap and map data layer(s) that are the backbone for rendering your visualization.

![Map layers](/img/cloud-native-workspace/guides/maps/map_paris.png)

When working with layers in the layer list of Builder, the following features are available:

- **Layers order:** Layers are rendered from bottom to top, with basemaps being the bottom layer. Click and drag a layer to rearrange the hierarchal order of how layers are rendered on your map.

![Map layers order](/img/cloud-native-workspace/guides/maps/map_layers_order.gif)

- **Layer settings:** To apply custom styling to your layer.

![Map layers settings](/img/cloud-native-workspace/guides/maps/map_layer_settings.png)

- **Rename layer:** Click on the layer title to edit the name of the layer.

![Map layers rename](/img/cloud-native-workspace/guides/maps/map_layer_rename.png)

- **Duplicate layer:** To create a copy of your layer.

![Map layers duplicate](/img/cloud-native-workspace/guides/maps/map_layer_duplicate.png)

- **Show/hide layer:** To show/hide the layer in the map.

![Map layers show or hide](/img/cloud-native-workspace/guides/maps/map_layer_hide.png)

- **Remove layer:** To remove a layer from the map.

![Map layers remove](/img/cloud-native-workspace/guides/maps/map_layer_remove.png)

-  **Blend layers:** by selecting an option from the dropdown at the bottom of the Layers panel. There are three different ways to blend layers: Normal, Additive, and Subtractive.

![Map layers blending](/img/cloud-native-workspace/guides/maps/map_layer_blending.png)

### Map styles

When styling maps, you can style your geometry using different settings. By default, the Cloud Native Builder styles by fixed values for size and solid colors. The following sections list the different styling options that you can set for your map. Some of them are available depending on the type of layer (point, line, polygon, etc.).

To style your layers, expand the *layer settings panel*.

![Map layers settings](/img/cloud-native-workspace/guides/maps/map_layer_settings.png)

#### FILL COLOR

When activated, geo shapes are filled in with colors. By default, Builder assign a **predefined fill color**. You can change it by clicking the *Fill* button where the default color is displayed, and then selecting the new predefined color using the *color picker*.

![Map style fill color](/img/cloud-native-workspace/guides/maps/map_style_fill.png)

You can explore additional fill color features by clicking the *three dots* icon: 

![Map style fill additional features](/img/cloud-native-workspace/guides/maps/map_style_fill_features.png)

- **Color based on**: When styling maps, you can assign color based on a field from your dataset(s).

    1. Click the *Color based on* button. Select a field from your dataset to style your layer. In this example, we style our layer based on the "population" field. 

    ![Map fill style based on field](/img/cloud-native-workspace/guides/maps/map_style_fill_based_on.png)
	
	The color ramp is applied to our layer, so now we can analyze areas with higher/lower population.
	
    ![Map fill style based on field result](/img/cloud-native-workspace/guides/maps/map_style_fill_based_on_result.png)
	
    2. By default, Builder assign a **predefined color palette**. You can change it by clicking the *Fill* button where the default ramp color is displayed, and then selecting the new predefined color palette. Predefined palettes comes in diverging, sequential and qualitative types.
	
	![fill color predefined palette](/img/cloud-native-workspace/guides/maps/map_style_fill_based_on_color_predefined_palette.png)
	
	You can also design a **custom palette**. To activate this option, toggle on *custom palette*. Click on each color to pick new color either by clicking on the color picker or inputting HEX/RGB values. Colors steps can be added, removed or shuffled. 
	
    ![Map style fill color custom palette](/img/cloud-native-workspace/guides/maps/map_style_fill_based_on_custom_color_palette_toogle.png)![Map style fill color custom palette.png](/img/cloud-native-workspace/guides/maps/map_style_fill_based_on_custom_color_palette.png)
	
    3. Your color is applied to your map as soon as you select the predefined palette or *confirm* the choices of customized colors.
	
- **Color scale**: For your color palette, you can choose either a quantile or quantized color scale.
![Map style fill color scale](/img/cloud-native-workspace/guides/maps/map_style_fill_color_scale.png)
    - **Quantile**: A quantile color scale is determined by rank. A quantile classification is well suited to linearly distributed data. Each quantile class contains an equal number of features. There are no empty classes or classes with too few or too many values. This can be misleading sometimes, since similar features can be placed in adjacent classes or widely different values can be in the same class, due to equal number grouping.
	
    - **Quantized**: Quantized color scale is determined by value. To Quantize means to group values with discrete increments. It allows to transform an initial continuous range into a discrete set of classes. Quantize scales will slice the domain’s extent into intervals of roughly equal lengths.
	
- **Opacity**: Change the transparency of a layer. 1 = opaque, 0 = invisible. You can change the predefined opacity using the *opacity slider* or by directly writting the level of opacity in the *text input*.

![Map style fill opacity](/img/cloud-native-workspace/guides/maps/map_style_fill_opacity.png)

#### STROKE COLOR

When activated, draws outlines around geoshapes. When styling a map layer, the stroke contains the width, color, and opacity for the sides of the geometry. By default, Builder assign a **predefined stroke color**. You can change it by clicking the *Stroke* button where the default color is displayed, and then selecting the new predefined color using the *color picker*.

![Map style stroke color](/img/cloud-native-workspace/guides/maps/map_style_stroke.png)

You can explore additional stroke color features by clicking the *three dots* icon: 

![Map style stroke additional features](/img/cloud-native-workspace/guides/maps/map_style_stroke_features.png)

- **Color based on**: When styling maps, you can assign stroke color based on a field from your dataset(s).

    1. Click the *Color based on* button. Select a field from your dataset to style your layer. In this example, we style our layer stroke based on the "population" field. 

    ![Map stroke style based on field](/img/cloud-native-workspace/guides/maps/map_style_stroke_based_on.png)
	
	The color ramp is applied to our layer, so now we can analyze areas with higher/lower population.
	
    ![Map stroke style based on field result](/img/cloud-native-workspace/guides/maps/map_style_stroke_based_on_result.png)
	
    2. By default, Builder assign a **predefined color palette**. You can change it by clicking the *Fill* button where the default ramp color is displayed, and then selecting the new predefined color palette. Predefined palettes comes in diverging, sequential and qualitative types.
	
	![stroke color predefined palette](/img/cloud-native-workspace/guides/maps/map_style_stroke_based_on_color_predefined_palette.png)
	
	You can also design a **custom palette**. To activate this option, toggle on *custom palette*. Click on each color to pick new color either by clicking on the color picker or inputting HEX/RGB values. Colors steps can be added, removed or shuffled. 
	
    ![Map style stroke color custom palette](/img/cloud-native-workspace/guides/maps/map_style_stroke_based_on_custom_color_palette_toogle.png)![Map style fill color custom palette.png](/img/cloud-native-workspace/guides/maps/map_style_stroke_based_on_custom_color_palette.png)
	
    3. Your color is applied to your map as soon as you select the predefined palette or *confirm* the choices of customized colors.
	
- **Color scale**: For your color palette, you can choose either a quantile or quantized color scale.
![Map style stroke color scale](/img/cloud-native-workspace/guides/maps/map_style_stroke_color_scale.png)
    - **Quantile**: A quantile color scale is determined by rank. A quantile classification is well suited to linearly distributed data. Each quantile class contains an equal number of features. There are no empty classes or classes with too few or too many values. This can be misleading sometimes, since similar features can be placed in adjacent classes or widely different values can be in the same class, due to equal number grouping.
	
    - **Quantized**: Quantized color scale is determined by value. To Quantize means to group values with discrete increments. It allows to transform an initial continuous range into a discrete set of classes. Quantize scales will slice the domain’s extent into intervals of roughly equal lengths.
	
- **Opacity**: Change the transparency of a layer. 1 = opaque, 0 = invisible. You can change the predefined opacity using the *opacity slider* or by directly writting the level of opacity in the *text input*.

![Map style stroke opacity](/img/cloud-native-workspace/guides/maps/map_style_stroke_opacity.png)

#### STROKE WIDTH

Change the thickness of lines, or assign a width based on a field from your dataset(s). You can change the predefined stroke width using the *width slider* or by directly writting the stroke size in the *text input*.

You can explore additional stroke width features by clicking the *three dots* icon: 

![Map style stroke width additional features](/img/cloud-native-workspace/guides/maps/map_style_stroke_width_features.png)

- **Stroke width based on**: When styling maps, you can assign stroke width based on a field from your dataset(s).

    1. Click the *Stroke based on* button. Select a field from your dataset to style your layer. In this example, we style our layer stroke based on the "population" field. 

    ![Map stroke width based on field](/img/cloud-native-workspace/guides/maps/map_style_stroke_width_based_on.png)   
	
    2. By default, Builder assign a predefined width range. The range slider allows you to set custom range using a lower and upper threshold for projected stroke width. You can change the predefined stroke width range using the *width range slider* or by directly writting the lower and upper stroke size in the *text input*.
	
	![Map stroke width based on range](/img/cloud-native-workspace/guides/maps/map_style_stroke_width_based_on_range.png)
	
	![Map stroke width based on field](/img/cloud-native-workspace/guides/maps/map_style_stroke_width_result.png)  

- **Stroke width scale**: For your stroke width range, you can choose either a Linear, Sqrt or Log scale.
    ![Map style stroke width scale](/img/cloud-native-workspace/guides/maps/map_style_stroke_width_scale.png)
	
#### HEIGHT

Assign polygons height for 3D visualizations. You can activate this option by clicking the toogle. You can change the height using the *height slider* or by directly writting the height in the *text input*.

![Map style height](/img/cloud-native-workspace/guides/maps/map_style_height.png)

You can explore additional height features by clicking the *three dots* icon: 

![Map style height additional features](/img/cloud-native-workspace/guides/maps/map_style_height_features.png)

- **Height based on**: When styling maps, you can assign height based on a field from your dataset(s).
Click the *Height based on* button. Select a field from your dataset to style your layer. In this example, we style our layer stroke based on the "population" field. 

![Map height based on field](/img/cloud-native-workspace/guides/maps/map_style_height_based_on.png)   

You can explore the 3D visualization by clicking on the *3D map* button on the upper right corner of the map.
![Activating 3D map visualization](/img/cloud-native-workspace/guides/maps/map_style_height_3d_map.png)

In the example, we can now explore as a 3D map those polygons with more population.

![Map stroke width based on field](/img/cloud-native-workspace/guides/maps/map_style_height_result.png)

- **Height scale**: You can choose either a Linear, Sqrt or Log scale.
![Map style height scale](/img/cloud-native-workspace/guides/maps/map_style_height_scale.png)

#### Radius/Radius based on

Change the radius of points or assign radius values based on a field from your dataset(s).

#### Radius range

Set a lower and upper threshold for projected radius size.



