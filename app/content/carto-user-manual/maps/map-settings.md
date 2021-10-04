## Map settings

### LAYERS

Once your data sources are connected to your map, as explained in this [guide](../../maps/add-source), you can use Builder to analyse and discover key insights from your location data. This guide describes how to work with map layers in CARTO Builder.

When opening a map, all added layers for the selected map appear in the left side panel. The layers list appears by default, displaying the basemap and map data layer(s) that are the backbone for your visualization.

![Map layers](/img/cloud-native-workspace/maps/map_paris.png)

The following features are available in the list of layers of your map in Builder:

- **Layers label:** layers are provided with a label that is created alphabetically (A, B, C, D). Also each layer is labeled with a unique color to help you distinguish them. Each layer icon displays the geometry type behind the data as either a point, line, polygon, or empty.

- **Layers order:** layers are rendered from bottom to top, with basemaps being the bottom layer. Click and drag a layer to rearrange the hierarchal order of how layers are rendered on your map.

- **Layer settings:** to apply custom styling to your layer.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_settingsss.png)

- **Rename layer:** click on the layer title to edit the name of the layer.

![Map layers rename](/img/cloud-native-workspace/maps/map_layer_rename.png)

- **Duplicate layer:** to create a copy of your layer and to add it to the map.

![Map layers duplicate](/img/cloud-native-workspace/maps/map_layer_duplicate.png)

- **Show/hide layer:** to show/hide the layer in the map.

![Map layers show or hide](/img/cloud-native-workspace/maps/map_layer_hide.png)

- **Remove layer:** to remove a layer from the map.

![Map layers remove](/img/cloud-native-workspace/maps/map_layer_remove.png)

-  **Blend layers:** by selecting an option from the dropdown at the bottom of the Layers panel. There are three different ways to blend layers: Normal, Additive, and Subtractive.

![Map layers blending](/img/cloud-native-workspace/maps/map_layer_blendingg.png)

### WIDGETS

This guide describes how to add interactive widgets to view your map data in CARTO Builder. Widgets are embedded within your visualization and do not modify your original data, they simply allow you to explore your map by selecting targeted filters of interest.

In the *Wiget* tab of Builder, you will see the list of your current widgets. If you haven’t created a widget yet, you will see the following page:

![Map widgets](/img/cloud-native-workspace/maps/maps_new_widgets.png)

Click on *New widget* button to start interacting with your data:

![Map widgets](/img/cloud-native-workspace/maps/maps_widget.png)

### INTERACTIONS

![Map interactions](/img/cloud-native-workspace/maps/map_interactions.png)

**Tooltip**

The tooltip is an info window that appears when you hover your mouse over a map feature. A tooltip appears where the mouse cursor is located on the map. You can customize the content of the tooltip by defining the source columns and the formatting.

![Map interactions tooltip](/img/cloud-native-workspace/maps/interactions_tooltip.png)

**Coordinates**

It shows the coordinates where you click with the mouse. The coordinates will appear in the tooltip, so you need to activate the tooltip first.

![Map interactions coordinates](/img/cloud-native-workspace/maps/interactions_coordinates.png)

### BASEMAPS

Basemaps are image tiles that are used to render the graphical representation of your map background. Basemaps include the natural and cultural features of the world; such as water bodies, topography, park areas, terrains, roads, streets, and sometimes buildings.

The CARTO Builder provides a set of CARTO and Google Maps basemaps styles as background maps. By default, basemaps are projected using the <a href="https://en.wikipedia.org/wiki/Web_Mercator_projection" target="_blank">Webmercator projection</a>. To setup your map's base map, open the *Base Map panel* to select from a list of default map styles.

Select the CARTO Basemap menu to see different basemap options. They include:
- **Voyager**: basemap with colors to clearly differentiate natural and cultural features. This basemap is showed by default when creating a new map.
- **Positron**: light basemap with dark-colored text.
- **Dark**: dark basemap with light-colored text.

![Map basemap carto](/img/cloud-native-workspace/maps/map_basemap_cartoo.png)

Select the Google Maps Basemap menu to see different basemap options. They include:

- **Roadmap**: displays the default road map view.
- **Satellite**: displays Google Earth satellite images.
- **Hybrid**: displays a mixture of normal and satellite views.
- **Terrain**: displays a physical map based on terrain information.

![Map basemap google](/img/cloud-native-workspace/maps/map_basemap_google.png)

**Basemap layers:** You can manage basemaps layers to hide and show water, buildings, roads, and more. Options include: 

- Labels: shows labels for cities, neighborhoods, and so on.
- Roads: displays a translucent layer of road lines.
- Borders: shows state and continent borders.
- Buildings: shows building footprints.
- Water: displays bodies of water.
- Land: Shows parks, mountains, and other landscape features.

![Basemap layers order](/img/cloud-native-workspace/maps/map_basemap_layer_showss.png)