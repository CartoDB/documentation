## Map settings

### Layers

Once your data sources are connected to your map, as explained in this [guide](../../maps/add-source), you can use Builder to analyse and discover key insights from your location data. This guide describes how to work with map layers in CARTO Builder.

When opening a map, all added layers for the selected map appear in the left side panel. The layers list appears by default, displaying the basemap and map data layer(s) that are the backbone for your visualization.

The following features are available in the list of layers of your map in Builder:

- **Layers label:** layers are provided with a label that is created alphabetically (A, B, C, D). Also each layer is labeled with a unique color to help you distinguish them. Each layer icon displays the geometry type behind the data as either a point, line, polygon, or empty.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_label.png)

- **Layers order:** layers are rendered from bottom to top, with basemaps being the bottom layer. Move the mouse to the left of the layer card and click on the dots that appear to drag a layer and rearrange the hierarchal order of how layers are rendered on your map.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_drag.png)

- **Layer style:** click on *Layer style* to apply custom styling to your layer.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_style.png)

- **Rename layer:** click on *Rename* to edit the name of the layer.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_style.png)

![Map layers rename](/img/cloud-native-workspace/maps/map_layer_renamed.png)

- **Duplicate layer:** click on *Duplicate layer* to create a copy of your layer and to add it to the map.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_style.png)

- **Show/hide layer:** to show/hide the layer in the map.

![Map layers show or hide](/img/cloud-native-workspace/maps/map_layer_hide.png)

- **Remove layer:** click on *Delete layer* to remove a layer from the map.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_style.png)

-  **Blend layers:** by selecting an option from the dropdown at the bottom of the Layers panel. There are three different ways to blend layers: Normal, Additive, and Subtractive.

![Map layers blending](/img/cloud-native-workspace/maps/map_layer_blending.png)

### Widgets

This guide describes how to add interactive widgets to view your map data in CARTO Builder. Widgets are embedded within your visualization and do not modify your original data, they simply allow you to explore your map by selecting targeted filters of interest.

In the Widget tab of Builder, you will see the list of your current widgets. If you haven’t created a widget yet, you will see the following page:

![Map widgets new widget](/img/cloud-native-workspace/maps/map_new_widget.png)

Click on *New widget* button to start interacting with your data. When you add a widget, it´s always the Formula widget by default:

![Map widgets](/img/cloud-native-workspace/maps/map_new_widget_dropdown.png)

![Map widgets](/img/cloud-native-workspace/maps/map_widget_formula_bydefault.png)

You can access the quick actions menu to manage your widgets by clicking on the “three dots” icon in the top-right corner. There are two options available: Rename and Delete widget. 

![Map widgets](/img/cloud-native-workspace/maps/map_widget_options_quickmenu.png)

You can also manage your widgets by clicking on the “three dots” icon in the top-right corner of the widget. There are two options available: Widget options and Delete widget.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_quickmenu_widget.png)

Click on the top-right icon to show or hide the list of your widgets from the map:

![Map widgets](/img/cloud-native-workspace/maps/map_widget_icon.png)

If you click on the *Back* arrow, you will exist the widget options and you will be redirected to the Widget tab of Builer from where you will see the list of your current widgets.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_back_to_list.png)

Click on the “three dots” icon to configure your widgets. There are 3 options available: Widgets options, Rename and Delete widget.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_quickmenu_card.png)

To add a new widget to the map, click on *Add widget* button and select the source:

![Map widgets](/img/cloud-native-workspace/maps/map_widget_add_widget.png)

![Map widgets](/img/cloud-native-workspace/maps/map_widget_select_source.png)

At this moment, there are three advanced widgets available to customize your visual representation and get a rich interaction with your data: 
- **Formula**: Calculate aggregated values from numeric columns in COUNT, AVG, MAX, MIN, and SUM. These are useful for viewing analysis results. 
- **Category**: Enable you aggregate the data following different methods, and create categories.
- **Histogram**: Examine numerical values within a given range, distributed across your data map. You can configure values by a data column and define the number of buckets.
#### Formula Widget

From Data, choose the operation from the list and select a field from your source dataset that you want to analyze. The COUNT aggregation is always selected by default.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_formula.png)

In this example, we aggregate our values with AVG operation based on the `revenue` field.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_formula_avg_field_selected.png)

From Display options, you can also add some notes to your histagram and change the format as the values are displayed.

<!-- screenshot needed -->
#### Category Widget

From Data, choose the operation from the list and select a field from your dataset that you want to analyze. In this example, we aggregate our layer based on the `store_type` field.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_category_count_dropdown.png)

![Map widgets](/img/cloud-native-workspace/maps/map_widget_category_count_field_selected.png)

From Display options, you can also add some notes to your histagram and change the format as the values are displayed.

<!-- screenshot needed -->
#### Histogram Widget

From Data, select a field from your source dataset that you want to analyze. In this example, we aggregate our layer based on the `revenue` field.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_histogram.png)

![Map widgets](/img/cloud-native-workspace/maps/map_widget_histogram_field_selected.png)

From Display options, you can also choose the number of buckets of your histogram, add some notes and change the format as the values are displayed.

<!-- screenshot needed -->
### Interactions

![Map interactions](/img/cloud-native-workspace/maps/map_interactions.png)

**Tooltip**

The tooltip is an info window that appears when you hover your mouse over a map feature. A tooltip appears where the mouse cursor is located on the map. You can customize the content of the tooltip by defining the source columns and the formatting.

![Map interactions tooltip](/img/cloud-native-workspace/maps/interactions_tooltip.png)

**Coordinates**

It shows the coordinates where you click with the mouse. The coordinates will appear in the tooltip, so you need to activate the tooltip first.

![Map interactions coordinates](/img/cloud-native-workspace/maps/interactions_coordinates.png)

### Basemaps

Basemaps are image tiles that are used to render the graphical representation of your map background. Basemaps include the natural and cultural features of the world; such as water bodies, topography, park areas, terrains, roads, streets, and sometimes buildings.

The CARTO Builder provides a set of CARTO and Google Maps basemaps styles as background maps. By default, basemaps are projected using the <a href="https://en.wikipedia.org/wiki/Web_Mercator_projection" target="_blank">Webmercator projection</a>. To setup your map's base map, open the *Base Map panel* to select from a list of default map styles.

Select the CARTO Basemap menu to see different basemap options. They include:
- **Voyager**: basemap with colors to clearly differentiate natural and cultural features. This basemap is showed by default when creating a new map.
- **Positron**: light basemap with dark-colored text.
- **Dark**: dark basemap with light-colored text.

![Map basemap carto](/img/cloud-native-workspace/maps/map_basemap_CARTO.png)

**CARTO Basemap layers:** You can manage the CARTO basemaps layers to hide and show water, buildings, roads, and more. Options include: 

- Labels: shows labels for cities, neighborhoods, and so on.
- Roads: displays a translucent layer of road lines.
- Borders: shows state and continent borders.
- Buildings: shows building footprints.
- Water: displays bodies of water.
- Land: Shows parks, mountains, and other landscape features.

![Basemap layers](/img/cloud-native-workspace/maps/map_basemap_layers.png)

Select the Google Maps Basemap menu to see different basemap options. They include:

- **Roadmap**: displays the default road map view.
- **Satellite**: displays Google Earth satellite images.
- **Hybrid**: displays a mixture of normal and satellite views.
- **Terrain**: displays a physical map based on terrain information.
- **Positron**, **Voyager** and **Dark Matter**: new versions that has been developed for Google Maps.

![Map basemap google](/img/cloud-native-workspace/maps/map_basemap_google_maps.png)
