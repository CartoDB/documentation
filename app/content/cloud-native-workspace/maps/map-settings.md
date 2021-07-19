## Map settings

### BASEMAPS

Basemaps are image tiles that are used to render the graphical representation of your map background. Basemaps include the natural and cultural features of the world; such as water bodies, topography, park areas, terrains, roads, streets, and sometimes buildings.

The Cloud Native Builder provides a set of CARTO basemaps styles as background map. By default, basemaps are projected using the <a href="https://en.wikipedia.org/wiki/Web_Mercator_projection" target="_blank">Webmercator projection</a>. To setup your map's base map, open the *Base Map panel* to select from a list of default map styles.

![Map created](/img/cloud-native-workspace/maps/map_basemap.png)

Open the basemap style drop down menu to see different basemap options. They include:
- **Voyager**: basemap with colors to clearly differentiate natural and cultural features. This basemap is showed by default when creating a new map.
- **Positron**: light basemap with dark-colored text.
- **Dark**: dark basemap with light-colored text.

![Map created](/img/cloud-native-workspace/maps/map_basemap_list.png)

**Basemap layers:** You can manage basemaps layers to hide and show water, buildings, roads, and more. Options include: 

- Labels: shows labels for cities, neighborhoods, and so on.
- Roads: displays a translucent layer of road lines.
- Borders: shows state and continent borders.
- Buildings: shows building footprints.
- Water: displays bodies of water.
- Land: Shows parks, mountains, and other landscape features.

![Basemap layers order](/img/cloud-native-workspace/maps/map_basemap_layer_show.png)

**Basemap layer order:** to control the order in which map imagery layers are displayed, click the *move to top of data layers* icon:

![Basemap layers order](/img/cloud-native-workspace/maps/map_basemap_layer_order.png)

### LAYERS

Once your datasets are connected to your map, as explained in this [guide](../../maps/add-data), you can use Builder to discover key insights about your location data. This section describes how to view and work with map layers in the Cloud Native Builder.

When opening a map, layers for the selected map appear. The layers list appears by default, displaying the basemap and map data layer(s) that are the backbone for rendering your visualization.

![Map layers](/img/cloud-native-workspace/maps/map_paris.png)

When working with layers in the layer list of Builder, the following features are available:

- **Layers order:** Layers are rendered from bottom to top, with basemaps being the bottom layer. Click and drag a layer to rearrange the hierarchal order of how layers are rendered on your map.

![Map layers order](/img/cloud-native-workspace/maps/map_layers_order.gif)

- **Layer settings:** To apply custom styling to your layer.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_settings.png)

- **Rename layer:** Click on the layer title to edit the name of the layer.

![Map layers rename](/img/cloud-native-workspace/maps/map_layer_rename.png)

- **Duplicate layer:** To create a copy of your layer.

![Map layers duplicate](/img/cloud-native-workspace/maps/map_layer_duplicate.png)

- **Show/hide layer:** To show/hide the layer in the map.

![Map layers show or hide](/img/cloud-native-workspace/maps/map_layer_hide.png)

- **Remove layer:** To remove a layer from the map.

![Map layers remove](/img/cloud-native-workspace/maps/map_layer_remove.png)

-  **Blend layers:** by selecting an option from the dropdown at the bottom of the Layers panel. There are three different ways to blend layers: Normal, Additive, and Subtractive.

![Map layers blending](/img/cloud-native-workspace/maps/map_layer_blending.png)