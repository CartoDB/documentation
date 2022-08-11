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

This guide describes how to add interactive widgets to your map in CARTO Builder. Widgets are embedded within your visualization and do not modify your original data, they simply allow you to explore your data and get insights by drilling-down different types of filters that are conected to each other and the map's viewport.

In the Widgets tab of Builder, you will see the list of your current widgets. If you haven’t created a widget yet, you will see the following page:

![Map widgets new widget disable](/img/cloud-native-workspace/maps/map_new_widget_button_disabled.png)

<!-- ![Map widgets new widget](/img/cloud-native-workspace/maps/map_add_new_widget.png) -->

Click on *New widget* button to start interacting with your data. When you add a widget, it´s always the Formula widget by default:

![Map widgets select a source](/img/cloud-native-workspace/maps/map_new_widget_select_source.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_new_widget_dropdown.png) -->

![Map widgets formula by default](/img/cloud-native-workspace/maps/map_widget_formula_default.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_formula_bydefault.png) -->

You can access the quick actions menu to manage your widgets by clicking on the “three dots” icon in the top-right corner. There are two options available: Rename and Delete widget. 

![Map widgets](/img/cloud-native-workspace/maps/map_widget_options_quickactions.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_options_quickmenu.png) -->

You can also manage your widgets by clicking on the “three dots” icon in the top-right corner of the widget. There are two options available: Widget options and Delete widget.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_options_2quickactions.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_quick_menu_widget.png) -->

Click on the top-right icon to show or hide the list of your widgets from the map:

![Map widgets](/img/cloud-native-workspace/maps/map_widget_icon.png)

If you click on the *Back* arrow, you will exist the widget options and you will be redirected to the Widget tab of Builer from where you will see the list of your current widgets.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_back_arrow.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_back_to_list.png) -->

Click on the “three dots” icon to configure your widgets. There are 3 options available: Widgets options, Rename and Delete widget.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_quickactions_card.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_quickmenu_card.png) -->

To add a new widget to the map, click on *Add widget* button and select the data source:

![Map widgets](/img/cloud-native-workspace/maps/map_widget_add_widget_icon.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_add_widget.png) -->

![Map widgets](/img/cloud-native-workspace/maps/map_widget_select_data_source.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_select_source.png) -->

#### Modes (behavior)

The widgets can work in two different modes: viewport and global.

- **Filter by viewport**: the widgets in viewport mode update the information when the viewport changes. They work with the data that has been downloaded for visualization so all the data needed to make the calculations is available locally in the browser.
- **Global**: the widgets in global mode are static, they always show the same information. They get the data by performing a SQL query to the data warehouse.

By default the widgets work in viewport mode, meaning they are showing information about the features in the current viewport.

<!-- ![Map widgets viewport by default](/img/cloud-native-workspace/maps/map_widget_viewport_default.png) -->

![Map widgets viewport by default](/img/cloud-native-workspace/maps/map_widget_viewport_mode.png)

But you can also configure them to use the global mode where information is displayed for the full data source.

![Map widgets viewport by default](/img/cloud-native-workspace/maps/map_widget_global_mode.png)

At this moment, there are six types of widgets available to customize your visualization and enable a richer interaction with your data: 
- **Formula**: Shows aggregated numerical data from the features in the map's viewport.
- **Category**: Breaks down the data into categories and shows aggregated values.
- **Histogram**: Shows the frequency distribution across equal bins in the data range.
- **Range Widget**: Shows a specific range of numerical data that is filtered by using a slider or manual inputs.
- **Time-Series**: Shows the frequency distribution aggregated by a fixed temporal period (Days, Weeks, Months or Years). It also allows to create animated maps.
- **Table Widget**: It shows tabular information of the features in the viewport.

#### Formula Widget

From Data, choose the operation from the list (`COUNT`, `AVG`, `MAX`, `MIN`, or `SUM`) and select a field from your source dataset that you want to analyze. 

![Map widgets](/img/cloud-native-workspace/maps/map_widget_formula_count_operation.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_formula_by_count.png) -->

From Display options, you can also change the format as the values are displayed and add some notes to your widget. In this example, we aggregate the data by the average total of revenue based on the `revenue` column. 

![Map widgets](/img/cloud-native-workspace/maps/map_widget_formula_avg_operation.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_formula_by_avg.png) -->

#### Category Widget

From Data, choose the operation from the list and select a field from your dataset that you want to analyze. 

![Map widgets](/img/cloud-native-workspace/maps/map_widget_category_count_operation.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_category_by_count.png) -->

From Display options, you can also change the format as the values are displayed and add some notes to your histagram. In this example, we aggregate the average `revenue` on each category from the `storetype` column.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_category_average_operation.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_category_by_avg.png) -->

You can select one or more values from a category widget to highlight particular columns of interest. If you select an element from the list, only the selected filters appear styled on your map, and the rest of the categories are temporarily removed from your visualization.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_category_select.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_select_category_from_list.png) -->

Click on the same filters again to deselect them, or click on *Clear* to show all relevant categories from the widget again. You can also *Lock* and *Unlock* to enable or disable the interactivity with the map.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_category_selected.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_search_elements_from_list.png) -->

The Category widgets display the top five categories of data, based on the Map View of your visualization. The `Other` category groups together the less relevant values that may not be visible from your Map View. 

You can manually search for values from the `Other`category by clicking on *Search in "X" elements*, or you can modify the order of how values appear in the category widget. As you zoom or pan the map, the category widget filters change. By doing this, it can help you re-evaluate how your Map View should appear. 

Click on *Search in “X” elements* and then click the box next to the other value(s) to be included. You can type a value, or search through the list of available values.Then click *Apply* to filter the category widget by the selected values, or *Cancel*  if you don’t want the filters to be applied.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_category_search_elements.png)

<!-- You can Unlock to view the default categories again. -->

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_search_elements_from_list.png) -->

#### Histogram Widget

From Data, select a field from your source dataset that you want to analyze. In this example, we divide the data range of the `size_m2` column in 15 buckets. The histogram widget displays the number of features in each bucket, allowing you to select and visualize a specific range of data.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_histogram.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_histograma.png) -->

When hovering over a specific bucket, the number of features for that specific range is displayed. This is a good indicator of where you might want to filter data.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_histogram_hover.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_histogram_hover_over.png) -->

Click once on a bucket. Only the features for that specific range will be displayed on your map, and any analyses are rerun and recalculated.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_histogram_select_range.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_histogram_range_selected.png) -->

For advanced analysis, you can add all widgets in a single map so you can combine your filters and get a better visualisation of your data:

![Map widgets](/img/cloud-native-workspace/maps/map_widget_all.png)

<!-- ![Map widgets](/img/cloud-native-workspace/maps/map_widget_all_together.png)

![Map widgets](/img/cloud-native-workspace/maps/map_widget_all_together_filtered.png) -->

#### Range Widget

From Data, select a field from your source dataset that you want to analyze. The selected column must be a numeric data type. In this example, we filter the features on the map based on the `revenue` column. The default range is always the minimum and maximum value of the data that can be selected.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_range_widget.png)

When dragging the pointer over the slider, the features for that specific range of values are displayed on the map. Values get smaller towards the left of the slider and larger towards the right of it. 

![Map widgets](/img/cloud-native-workspace/maps/map_widget_range_filter_with_slider.png)

The selected range is identified by a dark blue line  bounded by two dots. The lighter line is those data that have not been selected but they are within the available range of data.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_range_filter_with_slider_lightblue.png)

When zoomed out, the map view changes. In this case, the selected range remains the same and the light line below it indicates the range of data visible in the current map view.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_range_filter_with_slider_zoom.png)

From Display options, you can also manually set custom minimum and maximum values and these will be reflected in the range widget. 

![Map widgets](/img/cloud-native-workspace/maps/map_widget_range_filter_manually.png)

When you set a minimum or maximum value that it is out of range, the new value will not be reflected in the range widget. 

![Map widgets](/img/cloud-native-workspace/maps/map_widget_range_filter_manually_outofrange.png)

In this example, the same minimum value remanins and a new grey line appears reflecting values below or above the available data range.

In this example, it keeps the same minimun value and the grey line reflects those values that are below the range of available data.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_range_filter_slider_outofrange.png)

This means that there is no data for that specific range in the `revenue` column, so if we drag the pointer over that line, no data will be displayed on the map.

![Map widgets](/img/cloud-native-workspace/maps/map_widget_range_filter_no_data.png)

<!-- This is particularly useful when you want to do some data preparation, for example to remove edge values. -->


The following video shows a short demonstration of how range widget allows to filter a map based on precise numeric values. This is particularly useful when you want to do some data preparation, for example to remove edge values. 
 
![Range widget video](/img/cloud-native-workspace/maps/range_widget.gif)
#### Time-Series Widget

From Data, choose the operation from the list and select a field from your source dataset that you want to analyze.
The selected column for the widget must be of type date, and you can define how the date is aggregated (by Years, Months, Weeks, Days) to visualize a selected range of time.

In this example, we aggregate the data range of the `time` column by months. The histogram widget displays the number of earthquakes in each month over time, allowing you to select and visualize a specific range of data.

<!-- ![Map widgets time-series](/img/cloud-native-workspace/maps/map_widget_time-series.png) -->

{{% bannerNote title="NOTE" type="note"%}}
Bear in mind that the most important requirement is that your date column contains valid timestamp values, otherwise the data may not appear correctly.
{{%/ bannerNote %}}

From the widget, you can play, pause or stop the animation and filter by a selected range of values. To activate the animation, toggle on *Animation controls*.

![Map widgets time-series animation control](/img/cloud-native-workspace/maps/map_widget_time-series_animation_controls.png)

![Map widgets time-series animation controls activated](/img/cloud-native-workspace/maps/map_widget_time-series_animation_activated.png)

<!-- ![Map widgets time-series animation controls activated](/img/cloud-native-workspace/maps/map_widget_time-series_animation_controls_activated.png) -->

To change the speed of the animation, click on the clock icon and select the speed: 0.5x, 1x, 2x or 3x.

![Map widgets time-series clock icon](/img/cloud-native-workspace/maps/map_widget_time-series_animation_clock.png)

You can also filter your data within a given range. The selected range is distributed across your map to display groups of data aggregated by the selected date type.

![Map widgets time-series filter](/img/cloud-native-workspace/maps/map_widget_time-series_filter_data.png)

<!-- ![Map widgets time-series filter](/img/cloud-native-workspace/maps/map_widget_time-series_filter.png) -->

This enables you to click and drag the start and end range of selected data. In this example, we add a second widget to display the number of earthquakes filtered in each range.

![Map widgets time-series filter](/img/cloud-native-workspace/maps/map_widget_timeseries_and_formula.png)

<!-- ![Map widgets time-series filter](/img/cloud-native-workspace/maps/map_widget_time-series_and_formula.png) -->

#### Table Widget

From Data, select the columns from your source dataset for which you want to display the tabular information. In this example, we select some columns. 

![Map widgets table](/img/cloud-native-workspace/maps/map_widget_table_somecolumns.png)

<!-- ![Map widgets table](/img/cloud-native-workspace/maps/map_widget_table_allcolumns.png) -->

<!-- ![Map widgets table](/img/cloud-native-workspace/maps/map_widget_table.png) -->

From the widget, you can select the number of rows per page and use pagination to visualize the rest of the results.

![Map widgets table rows and pagination](/img/cloud-native-workspace/maps/map_widget_table_rows_and_pagination.png)

You can also sort the data in ascending or descending order. To activate the sorting option, hover the mouse over the columns and select the ascending (up arrow) or descending (down arrow) option.

![Map widgets table ascending order](/img/cloud-native-workspace/maps/map_widget_table_ascending_order.png)

![Map widgets table descending order](/img/cloud-native-workspace/maps/map_widget_table_descending_order.png)

You can also add several table widgets at the same time in Builder maps. Each one will create a new tab that can be selected. When a tab is selected, the others will remain disabled.

![Map widgets table](/img/cloud-native-workspace/maps/map_widget_table_add_multiple_tabs.png)

<!-- ![Map widgets table](/img/cloud-native-workspace/maps/map_widget_table_multiple_tabs.png) -->

### Interactions

The _Interactions_ menu allows to configure different kinds of pop-ups that appear when you click or hover on a map feature. You can customize the content of the pop-up by renaming and formatting the properties, or changing the style (light, dark...) of the window. 

In the Interactions tab of Builder, you will see the list of your current layers. The pop-ups will be configured individually for each layer. By default, they're deactivated.

![Map interactions tooltip](/img/cloud-native-workspace/maps/map_interactions_tooltip_bydefault.png)

If you activate the pop-up, you can select different configurations for Click and Hover. For both configurations, the default style is `None` and no pop-up will be shown.

![Map interactions tooltip activated](/img/cloud-native-workspace/maps/map_interactions_tooltip_activated.png)

Click on the dropdown to see all available styling options. The styles for the Pop-up window are available in both configurations, but the Info Panel is only available for the ‘Click’ configuration.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_styling_options.png)

To add a pop-up to the map, select a style and add the properties you want to be displayed by clicking on *Add a field*.

In this example, we have selected the 'Click' configuration with a black style, using the `storetype` property.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_click_dark_storetype.png)

To add all properties at once, click on *Add all* or *None* to add or remove all of them. Also, you can customise the name of the label to be displayed by clicking on the default name.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_customise_options.png)

Once you have configured the content, click on any feature on the map and it will be displayed in a pop-up window.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_popup_window.png)

Now, let´s display the information on a slider that appears from the right side of the screen by selecting the option 'Info panel' from the dropdown.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_select_the_infopanel.png)

In this example, the information is displayed more clearly in a new info panel, and a pin marks the location of the selected feature in the map.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_the_infopanel.png)

We are going to add some additional properties and rename all of them with a more suitable label. Go to *Add a field* and select the properties `revenue` and `size_m2`. As shown in the image below, the new changes are updated directly in the Info Panel.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_customise_infopanel.png)

At any time, you can close the info panel by clicking on the “X” or you can revert to the default property values by clicking on the *reset overrides* button from the Iterations tab.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_close_infopanel.png)

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_reset_the_configuration.png)

You can also customise your popups by adding images or modifying the styling. Let´s show an example of how to edit the HTML of the pop-ups. For this purpose, click on *Switch to HTML mode* button.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_html_mode_button.png)

A template will be generated to reflect the selected fields, and the appearance of the popup will be the same. Click on *Edit HTML* to start editing. 

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_html_edit_html_button.png)

When you click on *Edit HTML*, a new dialog will appear. You can modify the content directly by typing on the template in a quick and easy way.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_html_new_dialog.png)

Let´s do some changes in the content, for example, we can add an image and change the background color. Then, click on *Apply changes*.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_html_edited_dialog.png)

If you want to go back to the standard mode, click on *Switch to field list mode* button.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_standard_mode_button.png)

A new message will appear warning you that the current changes applied will be lost when switching back to the standard mode. Click on *Continue* to keep the new changes or click on *Cancel* if you don’t want to keep them.

![Map interactions tooltips](/img/cloud-native-workspace/maps/map_interactions_tooltip_warning_switching_mode.png)

<!-- The comparison mode helps you to compare numeric values between two different features on the map through the tooltips. The results can be compared in absolute or relative values. You can change it from the comparison type option.

![Map interactions](/img/cloud-native-workspace/maps/map_interactions_tooltip_comparison_type.png)

Activate the comparison mode and then click on a map feature. The tooltip will stays fixed. Then, hover the mouse over another feature without clicking it.

![Map interactions](/img/cloud-native-workspace/maps/map_interactions_tooltip_comparison_mode.png)

In this example, the tooltip on the right (Primary) remains fixed (until you click on another area of the map).The tooltip on the left is the feature you want to compare with. The number in green is the difference between both parameters. In this case, the column `cartodb_id` in absolute values.

**Coordinates**

It shows the coordinates where you click with the mouse. The coordinates will appear in the tooltip, so you need to activate the tooltip first.

![Map interactions coordinates](/img/cloud-native-workspace/maps/map_interactions_coordinates.png) -->

### Legend

Legends help you to describe your data on the map and they are a essential for understanding geospatial data visualizations. This guide describes how to add and configure a legend to your map in CARTO Builder.

In the Legend tab of Builder, you will see the list of your current legends. If you haven’t added any layer yet, you will see the following page:

![Map widgets new widget](/img/cloud-native-workspace/maps/map_add_a_legend.png)

Once your data is added as a layer to the map, as explained in this [guide](../../maps/add-source), the legend is automatically generated and it is displayed in a fixed position at the bottom left of the map. 

When choosing a style based on a property on your data (check [this section](/carto-user-manual/maps/map-styles/) for more information about it), a legend will be automatically generated based on the type of visualization:
* Discrete color bins for categories and quantile data classifications.
* Continuous color ramps for quantize classifications.
* Proportional symbols for point radius. 

By default, the legend is collapsed so you need to click on the layers icon to expand it.

![Map legend](/img/cloud-native-workspace/maps/map_show_layer_panel.png)

![Map legend](/img/cloud-native-workspace/maps/map_layer_added_legend.png)

From the Legend tab, you can manage the visibility of the legends and change the text of the labels. Click on *Remove from legend* to not show the legend of a specific layer or click on the default layer name to change the text label.

![Map legend](/img/cloud-native-workspace/maps/map_legend_tab_remove_from_leyend.png)

![Map legend](/img/cloud-native-workspace/maps/map_legend_tab_change_text_label.png)

You can always revert to the default name by clicking on *Revert overrides*.

![Map legend](/img/cloud-native-workspace/maps/map_legend_tab_revert_overrides.png)

From "More legend options" you can manage the visibility of each layer and how the layers panel is displayed on the map. By activating "Layer selector", you will be able to control the visibility of layers from the layer panel, and by activating "Open when loading the map", you will be able to display the layer panel expanded by default when loading the map.

![Map legend](/img/cloud-native-workspace/maps/map_legend_tab_moreoptions_activated.png)

You can also select different style options from the Layer style panel to enable different types of legends that can be managed through the Legend tab.
 
In this example, we style the layer based on the column `store_type`. The legend shows a symbol and a label per category that we can edit from the Legend Tab.

![Map legend](/img/cloud-native-workspace/maps/map_legend_style_by_color.png)

You can also add other properties to the legend, such as the radius of the point based on a column. In this example, we show the radius of the stores based on the column `revenue`.

![Map legend](/img/cloud-native-workspace/maps/map_legend_style_by_color_radius.png)

<!-- You can also select different style options in Builder (from the Layer style panel) to enable different types of legends that can be managed through the Legend tab. -->
### Basemaps

Basemaps are image tiles that are used to render the graphical representation of your map background. Basemaps include the natural and cultural features of the world; such as water bodies, topography, park areas, terrains, roads, streets, and sometimes buildings.

The CARTO Builder provides a set of CARTO and Google Maps basemaps styles as background maps. By default, basemaps are projected using the <a href="https://en.wikipedia.org/wiki/Web_Mercator_projection" target="_blank">Webmercator projection</a>. To setup your map's base map, open the *Base Map panel* to select from a list of default map styles.

#### CARTO

Select _CARTO_ in the menu to see different basemap options. They include:
- **Voyager**: basemap with colors to clearly differentiate natural and cultural features. This basemap is showed by default when creating a new map.
- **Positron**: light basemap with dark-colored text.
- **Dark**: dark basemap with light-colored text.

![Map basemap carto](/img/cloud-native-workspace/maps/map_basemap_CARTO.png)

You can manage the CARTO basemaps layers to hide and show water, buildings, roads, and more. Options include: 

- Labels: shows labels for cities, neighborhoods, and so on.
- Roads: displays a translucent layer of road lines.
- Borders: shows state and continent borders.
- Buildings: shows building footprints.
- Water: displays bodies of water.
- Land: Shows parks, mountains, and other landscape features.

![Basemap layers](/img/cloud-native-workspace/maps/map_basemap_layers.png)

#### Google Maps

Select _Google Maps_ in the menu to see different basemap options. They include:

- **Roadmap**: displays the default road map view.
- **Satellite**: displays Google Earth satellite images.
- **Hybrid**: displays a mixture of normal and satellite views.
- **Terrain**: displays a physical map based on terrain information.
- **Positron**, **Voyager** and **Dark Matter**: new versions that has been developed for Google Maps.

![Map basemap google](/img/cloud-native-workspace/maps/map_basemap_google_maps.png)


#### Amazon Location

Select _Amazon Location_ in the menu to see the options to use a base map from the [Amazon Location Service](https://docs.aws.amazon.com/location/index.html).

To use an Amazon Location maps, you will need to introduce some credentials from your Amazon Location Service account. Lear more about it in [this guide](https://docs.aws.amazon.com/location/latest/developerguide/using-maps.html): 

- Cognito Pool ID: Amazon Cognito provides authentication, authorization, and user management for web and mobile apps. You can use Amazon Cognito unauthenticated identity pools with Amazon Location as a way for applications to retrieve temporary, scoped-down AWS credentials. Learn more about how to get a Cognito Pool ID [here](https://docs.aws.amazon.com/location/latest/developerguide/authenticating-using-cognito.html).

- Map name: The name of the map style from your [Maps home page](https://console.aws.amazon.com/location/maps/home) in your AWS console.

![Map basemap amazon](/img/cloud-native-workspace/maps/map_basemap_amazon_location.png)

Once you have set the credentials, click on _Apply_. The current configuration will be saved in this map. 

To use another base map from Amazon Location, specify the new credentials and click _Apply_ again. The map will be updated and saved.

