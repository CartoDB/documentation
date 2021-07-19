## Map styles

When styling maps, you can style your geometry using different settings. By default, the Cloud Native Builder styles by fixed values for size and solid colors. The following sections list the different styling options that you can set for your map. Some of them are available depending on the type of layer (point, line, polygon, etc.).

To style your layers, expand the *layer settings panel*.

![Map layers settings](/img/cloud-native-workspace/maps/map_layer_settings.png)

### FILL COLOR

When activated, geo shapes are filled in with colors. By default, Builder assign a **predefined fill color**. You can change it by clicking the *Fill* button where the default color is displayed, and then selecting the new predefined color using the *color picker*.

![Map style fill color](/img/cloud-native-workspace/maps/map_style_fill.png)

You can explore additional fill color features by clicking the *three dots* icon: 

![Map style fill additional features](/img/cloud-native-workspace/maps/map_style_fill_features.png)

- **Color based on**: When styling maps, you can assign color based on a field from your dataset(s).

    1. Click the *Color based on* button. Select a field from your dataset to style your layer. In this example, we style our layer based on the "population" field. 

    ![Map fill style based on field](/img/cloud-native-workspace/maps/map_style_fill_based_on.png)
	
	The color ramp is applied to our layer, so now we can analyze areas with higher/lower population.
	
    ![Map fill style based on field result](/img/cloud-native-workspace/maps/map_style_fill_based_on_result.png)
	
    2. By default, Builder assign a **predefined color palette**. You can change it by clicking the *Fill* button where the default ramp color is displayed, and then selecting the new predefined color palette. Predefined palettes comes in diverging, sequential and qualitative types.
	
	![fill color predefined palette](/img/cloud-native-workspace/maps/map_style_fill_based_on_color_predefined_palette.png)
	
	You can also design a **custom palette**. To activate this option, toggle on *custom palette*. Click on each color to pick new color either by clicking on the color picker or inputting HEX/RGB values. Colors steps can be added, removed or shuffled. 
	
    ![Map style fill color custom palette](/img/cloud-native-workspace/maps/map_style_fill_based_on_custom_color_palette_toogle.png)![Map style fill color custom palette.png](/img/cloud-native-workspace/maps/map_style_fill_based_on_custom_color_palette.png)
	
    3. Your color is applied to your map as soon as you select the predefined palette or *confirm* the choices of customized colors.
	
- **Color scale**: For your color palette, you can choose either a quantile or quantized color scale.
![Map style fill color scale](/img/cloud-native-workspace/maps/map_style_fill_color_scale.png)
    - **Quantile**: A quantile color scale is determined by rank. A quantile classification is well suited to linearly distributed data. Each quantile class contains an equal number of features. There are no empty classes or classes with too few or too many values. This can be misleading sometimes, since similar features can be placed in adjacent classes or widely different values can be in the same class, due to equal number grouping.
	
    - **Quantized**: Quantized color scale is determined by value. To Quantize means to group values with discrete increments. It allows to transform an initial continuous range into a discrete set of classes. Quantize scales will slice the domain’s extent into intervals of roughly equal lengths.
	
- **Opacity**: Change the transparency of a layer. 1 = opaque, 0 = invisible. You can change the predefined opacity using the *opacity slider* or by directly writting the level of opacity in the *text input*.

![Map style fill opacity](/img/cloud-native-workspace/maps/map_style_fill_opacity.png)

### STROKE COLOR

When activated, draws outlines around geoshapes. When styling a map layer, the stroke contains the width, color, and opacity for the sides of the geometry. By default, Builder assign a **predefined stroke color**. You can change it by clicking the *Stroke* button where the default color is displayed, and then selecting the new predefined color using the *color picker*.

![Map style stroke color](/img/cloud-native-workspace/maps/map_style_stroke.png)

You can explore additional stroke color features by clicking the *three dots* icon: 

![Map style stroke additional features](/img/cloud-native-workspace/maps/map_style_stroke_features.png)

- **Color based on**: When styling maps, you can assign stroke color based on a field from your dataset(s).

    1. Click the *Color based on* button. Select a field from your dataset to style your layer. In this example, we style our layer stroke based on the "population" field. 

    ![Map stroke style based on field](/img/cloud-native-workspace/maps/map_style_stroke_based_on.png)
	
	The color ramp is applied to our layer, so now we can analyze areas with higher/lower population.
	
    ![Map stroke style based on field result](/img/cloud-native-workspace/maps/map_style_stroke_based_on_result.png)
	
    2. By default, Builder assign a **predefined color palette**. You can change it by clicking the *Fill* button where the default ramp color is displayed, and then selecting the new predefined color palette. Predefined palettes comes in diverging, sequential and qualitative types.
	
	![stroke color predefined palette](/img/cloud-native-workspace/maps/map_style_stroke_based_on_color_predefined_palette.png)
	
	You can also design a **custom palette**. To activate this option, toggle on *custom palette*. Click on each color to pick new color either by clicking on the color picker or inputting HEX/RGB values. Colors steps can be added, removed or shuffled. 
	
    ![Map style stroke color custom palette](/img/cloud-native-workspace/maps/map_style_stroke_based_on_custom_color_palette_toogle.png)![Map style fill color custom palette.png](/img/cloud-native-workspace/maps/map_style_stroke_based_on_custom_color_palette.png)
	
    3. Your color is applied to your map as soon as you select the predefined palette or *confirm* the choices of customized colors.
	
- **Color scale**: For your color palette, you can choose either a quantile or quantized color scale.
![Map style stroke color scale](/img/cloud-native-workspace/maps/map_style_stroke_color_scale.png)
    - **Quantile**: A quantile color scale is determined by rank. A quantile classification is well suited to linearly distributed data. Each quantile class contains an equal number of features. There are no empty classes or classes with too few or too many values. This can be misleading sometimes, since similar features can be placed in adjacent classes or widely different values can be in the same class, due to equal number grouping.
	
    - **Quantized**: Quantized color scale is determined by value. To Quantize means to group values with discrete increments. It allows to transform an initial continuous range into a discrete set of classes. Quantize scales will slice the domain’s extent into intervals of roughly equal lengths.
	
- **Opacity**: Change the transparency of a layer. 1 = opaque, 0 = invisible. You can change the predefined opacity using the *opacity slider* or by directly writting the level of opacity in the *text input*.

![Map style stroke opacity](/img/cloud-native-workspace/maps/map_style_stroke_opacity.png)

### STROKE WIDTH

Change the thickness of lines, or assign a width based on a field from your dataset(s). You can change the predefined stroke width using the *width slider* or by directly writting the stroke size in the *text input*.

You can explore additional stroke width features by clicking the *three dots* icon: 

![Map style stroke width additional features](/img/cloud-native-workspace/maps/map_style_stroke_width_features.png)

- **Stroke width based on**: When styling maps, you can assign stroke width based on a field from your dataset(s).

    1. Click the *Stroke based on* button. Select a field from your dataset to style your layer. In this example, we style our layer stroke based on the "population" field. 

    ![Map stroke width based on field](/img/cloud-native-workspace/maps/map_style_stroke_width_based_on.png)   
	
    2. By default, Builder assign a predefined width range. The range slider allows you to set custom range using a lower and upper threshold for projected stroke width. You can change the predefined stroke width range using the *width range slider* or by directly writting the lower and upper stroke size in the *text input*.
	
	![Map stroke width based on range](/img/cloud-native-workspace/maps/map_style_stroke_width_based_on_range.png)
	
	![Map stroke width based on field](/img/cloud-native-workspace/maps/map_style_stroke_width_result.png)  

- **Stroke width scale**: For your stroke width range, you can choose either a Linear, Sqrt or Log scale.
    ![Map style stroke width scale](/img/cloud-native-workspace/maps/map_style_stroke_width_scale.png)
	
### HEIGHT

Assign polygons height for 3D visualizations. You can activate this option by clicking the toogle. You can change the height using the *height slider* or by directly writting the height in the *text input*.

![Map style height](/img/cloud-native-workspace/maps/map_style_height.png)

You can explore additional height features by clicking the *three dots* icon: 

![Map style height additional features](/img/cloud-native-workspace/maps/map_style_height_features.png)

- **Height based on**: When styling maps, you can assign height based on a field from your dataset(s).
Click the *Height based on* button. Select a field from your dataset to style your layer. In this example, we style our layer height based on the "population" field. 

![Map height based on field](/img/cloud-native-workspace/maps/map_style_height_based_on.png)   

You can explore the 3D visualization by clicking on the *3D map* button on the upper right corner of the map.
![Activating 3D map visualization](/img/cloud-native-workspace/maps/map_style_height_3d_map.png)

In the example, we can now explore as a 3D map those polygons with more population.

![Map stroke width based on field](/img/cloud-native-workspace/maps/map_style_height_result.png)

- **Height scale**: You can choose either a Linear, Sqrt or Log scale.
![Map style height scale](/img/cloud-native-workspace/maps/map_style_height_scale.png)

### RADIUS

Change the radius of points, or assign radius values based on a field from your dataset(s). You can change the predefined radius using the *radius slider* or by directly writting the radius size in the *text input*.

You can explore additional radius features by clicking the three dots icon:

![Map style radius additional features](/img/cloud-native-workspace/maps/map_style_radius_features.png)

- **Radius based on**: When styling maps, you can assign radius values based on a field from your dataset(s).
Click the *Radius based on* button. Select a field from your dataset to style your layer. In this example, we style our layer radius based on the "population" field.

### Radius range

Set a lower and upper threshold for projected radius size.

### Layer Blending

You can choose either a Additive, Normal or Substractive.

![Map style layer blending](/img/cloud-native-workspace/maps/map_layer_blending.png)