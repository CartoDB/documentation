## Map styles

When styling map visualizations, you can style your geometry using different settings. By default, CARTO Builder styles by fixed values for size and solid colors. The following sections list the different styling options that you can set for your map. Note that some of them are only available depending on the type of geometry layer (point, line, polygon, etc.).

To style your layers, click on the three dots icon and select *Layer style*.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_style.png)

You will see the different styling options that you can set for your map depending on the type of geometry layer.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_settings.png)

### Visibility by zoom level

With this setting, you can control the zoom range where a layer should be visible. Simply set the lower zoom level where a layer would start appearing on the map; and the higher zoom level where the layer should disappear from the map.

This is specially useful for combining different types of sources: aggregated data for lower zoom levels and non-aggregated at the higher levels, administrative regions of different levels, etc.

![Map style zoom range slider](/img/cloud-native-workspace/maps/slider_visibility_by_zoom.png)

### Resolution

This is only available for [aggregated grids](../data-sources/#aggregated-grids) based on spatial index data.

This slider controls the granularity of the aggregation on each tile, allowing for finer control over the aggregated visualization.

### Fill color

When activated, features on the map are filled in with colors. By default, Builder assigns a color automatically. You can change it by clicking the *Fill* button where the default color is displayed, and then selecting the new predefined color using the *color picker*.

![Map style fill color picker](/img/cloud-native-workspace/maps/fill_color_colorpicker.png)

Our you could also pick one from the predefined set of colors available:

![Map style fill color preset](/img/cloud-native-workspace/maps/fill_color_preset_colors.png)

You can explore additional fill color features by clicking on the *three dots* icon:

![Map style fill color basic properties](/img/cloud-native-workspace/maps/map_fill_color_properties.png)

- **Color based on**: When styling maps, you can assign a color based on the values from a field from your data source.

    1. Click the *Color based on* button. Select a field from your dataset to style your layer. In this example, we style our layer based on the "population" field.

    ![Map style fill color based on field](/img/cloud-native-workspace/maps/map_fill_color_based_on.png)

{{% bannerNote title="NOTE" type="note"%}}
When working with [**aggregated data sources**](../data-sources/#aggregated-grids), you will need to select an aggregation operation for your columns.

Connections to **Redshift** clusters don't support aggregation of categorical properties.
{{%/ bannerNote %}}


A color ramp is applied to our layer, so now we can analyze areas with higher/lower population.

![Map style fill color based on field result](/img/cloud-native-workspace/maps/map_style_fill_color_based_on_result.png)

2. By default, Builder assign a **predefined color palette**. You can change it by clicking the *Fill* button where the default ramp color is displayed, and then selecting the new predefined color palette. Predefined palettes come in diverging, sequential, and qualitative types.

![fill color predefined palette](/img/cloud-native-workspace/maps/map_style_fill_color_based_on_predef_palette.png)

You can also design a **custom palette**. To activate this option, toggle on *custom palette*. Click on each color to pick a new color either by clicking on the color picker or inputting HEX/RGB values. Color steps can be added, removed, or shuffled.

<!-- ![Map style fill color custom palette](/img/cloud-native-workspace/maps/map_style_fill_based_on_custom_colorpalette_toogle.png) -->

![Map style fill color custom palette.png](/img/cloud-native-workspace/maps/map_style_fill_based_on_custom_colorpalette.png)

3. Your color is applied to your map as soon as you select the predefined palette or *confirm* the choices of customized colors.

- **Color scale**: For your color palette, you can choose a quantile, quantize, logarithmic or a custom color scale.

![Map style fill color scale](/img/cloud-native-workspace/maps/map_fill_color_by_scale.png)

* **Quantile**: A quantile color scale is determined by rank. A quantile classification is well suited to linearly distributed data. Each quantile class contains an equal number of features. There are no empty classes or classes with too few or too many values. This can be misleading sometimes, since similar features can be placed in adjacent classes or widely different values can be in the same class, due to equal number grouping.

* **Quantize**: A quantized color scale is determined by grouping values in discrete increments. It allows to transform an initially continuous range into a discrete set of classes. Quantize scales will slice the domain’s extent into intervals of roughly equal lengths.

* **Logarithmic**: A Logarithmic scale based on powers of `10` will be created automatically, based on the number of steps in the selected color palette. Logarithmic scales tend to work well with [**aggregated data sources**](../data-sources/#aggregated-grids), and they will be the default option for them.

* **Custom**: A custom color scale is determined by arbitrary breaks in the classification. A custom scale is well suited to tweak color ramps, adjusting the values to fine tune the visualizations.

The following example shows a short demonstration of how custom breaks allow you to customize a color ramp and the data clasiffications in Builder.

![Custom color scale](/img/cloud-native-workspace/maps/custom-color-scale.gif)

- **Opacity**: Change the transparency of a layer. 1 = opaque, 0 = invisible. You can change the predefined opacity using the *opacity slider* or by directly writting the level of opacity in the *text input*. ![Map style fill opacity](/img/cloud-native-workspace/maps/by_opacity.png)

### Stroke color

When activated, this feature draws outlines around geoshapes. When styling a map layer, the stroke contains the width, color, and opacity for the sides of the geometry. By default, Builder assigns a **predefined stroke color**. You can change it by clicking the *Stroke* button where the default color is displayed, and then selecting the new predefined color using the *color picker*.

![Map style stroke color basic](/img/cloud-native-workspace/maps/map_stroke_color_basic.png)

You can explore additional stroke color features by clicking on the *three dots* icon:

![Map style stroke color based on field](/img/cloud-native-workspace/maps/map_stroke_color_based_on.png)

### Stroke width

This feature allows you to change the thickness of lines, or to assign a width based on a field from your data sources. You can change the predefined stroke width using the *width slider* or by directly inputting the stroke size in the *text input*.

You can explore additional stroke width features by clicking the *three dots* icon:

![Map style stroke width](/img/cloud-native-workspace/maps/map_stroke_width.png)

- **Stroke width based on**: when styling maps, you can assign stroke width based on a field from your dataset(s).

    1. Click the *Stroke based on* button. Select a field from your dataset to style your layer. In this example, we style our layer stroke based on the "population" field.

    ![Map stroke width based on field](/img/cloud-native-workspace/maps/map_stroke_width_based_on_field.png)

    2. By default, Builder assigns a predefined width range. The range slider allows you to set a custom range using a lower and upper threshold for projected stroke width. You can change the predefined stroke width range using the *width range slider* or by directly inputting the lower and upper stroke size in the *text input*.

	![Map stroke width range slider](/img/cloud-native-workspace/maps/map_stroke_width_range_slider.png)

### Custom marker

For point layers, the _Custom Marker_ setting is available and allows you to set an icon or an image as a marker in your map.

The [Maki icons collection](https://labs.mapbox.com/maki-icons/) is readily available.

You can also upload a custom .png or .svg file to be used as marker in the map.

 <p align="center">
  <img src="/img/cloud-native-workspace/maps/custom_markers.png" />
</p>


Advanced options in this section allow to define a custom marker (from the Maki collection or an uploaded one) based on a categorical value.

 <p align="center">
  <img src="/img/cloud-native-workspace/maps/custom_markers_based_on.png"/>
</p>


 There is also an option to rotate the marker based on a numeric column value. The value will be taken as degrees of rotation, taking `0` as the original vertical position of the icon, and rotating clock-wise.

### Radius

Change the radius of points, or assign radius values based on a field from your dataset(s). You can change the predefined radius using the *radius slider* or by directly writting the radius size in the *text input*.

You can explore additional radius features by clicking the three dots icon:

![Map style radius additional features](/img/cloud-native-workspace/maps/map_radius_features.png)

- **Radius based on**: When styling maps, you can assign radius values based on a field from your dataset(s).

Click the *Radius based on* button. Select a field from your dataset to style your layer. In this example, we style our layer radius based on the "population" field.

### Label

Applying text labels to your data enables you to enhance the typography of your map. While adding labels is optional, they are useful for communicating details with the map viewer. Positive effects of label styling will display legible text and considerate placement of labels on the Map View. In CARTO Builder, the STYLE tab of a selected map layer provides basic label options.

Enable the Labels checkbox, select a column and then specify the following options: **Font Size**, **Font Color**, **Text Anchor** or **Alignment**.

![Map style label](/img/cloud-native-workspace/maps/map_style_label.png)

Select an appropriate font, size, and color for your label. For example, consider if the text appears uppercase, lowercase, mixed case, and how the label appears based on the size and style of the typeface.

### Height

This feature allows you to assign polygon heights to build 3D visualizations. You can activate this option by clicking the toogle. You can change the height using the *height slider* or by directly inputting the height in the *text input*.

![Map style height](/img/cloud-native-workspace/maps/map_style_height.png)

You can explore additional height features by clicking on the *three dots* icon:

![Map style height basic properties](/img/cloud-native-workspace/maps/map_height_basic_properties.png)

- **Height based on**: when styling maps, you can assign height based on a field from your dataset(s).
Click the *Height based on* button. Select a field from your dataset to style your layer. In this example, we style our layer height based on the "population" field.

![Map height based on field](/img/cloud-native-workspace/maps/map_height_based_on_field.png)

You can explore the 3D visualization by clicking on the *3D map* button on the upper right corner of the map.
![Activating 3D map visualization](/img/cloud-native-workspace/maps/map_height_3d_map.png)

In the example, we can now explore as a 3D map those polygons with a higher population.

![Map style final map](/img/cloud-native-workspace/maps/map_style_final_map.png)
### Layer blending

You can choose either a Additive, Normal, or Substractive.

![Map style layer blending](/img/cloud-native-workspace/maps/map_layer_blending.png)
