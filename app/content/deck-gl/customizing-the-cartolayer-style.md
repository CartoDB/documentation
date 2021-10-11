## Customizing the CartoLayer style

### Introduction

The [CartoLayer](/deck-gl/reference/#cartolayer) uses deck.gl [GeoJsonLayer](https://deck.gl/docs/api-reference/layers/geojson-layer) for rendering. All the rendering options from the GeoJsonLayer can be used to customize the styling properties of your `CartoLayer`.

In this guide you will learn about the main options available and how to use them to create great visualizations. We have added links to the properties documentation in the main deck.gl docs site that includes useful information like data type or default values.

### Basic rendering options

These options are used to indicate basic styling properties and the availability of some of them depends on the type of feature geometry:

#### `opacity`

This [option](https://deck.gl/docs/api-reference/core/layer#opacity) controls the feature opacity. By default features are opaque but you can control the layer translucency through this option.

#### `filled`

With this [option]((https://deck.gl/docs/api-reference/layers/geojson-layer#filled) you indicate if you want to draw filled polygons. It is also used to indicate if you want to draw filled circles when you have point features and the `pointType` is `'circle'`. It is not applicable to line features.

See the `getFillColor` accessor to understand how to specify the color for your features.
  
#### `stroked`

This [option](https://deck.gl/docs/api-reference/layers/geojson-layer#stroked) is used to indicate if you want to draw the outline for polygon features. If is also used to indicate if you want to draw the circle outline when you have point features and the `pointType` is `'circle'`. Line features are stroked by default and this option is not applicable to them.

There are many properties available for controlling the outline features. Please see below the `getLineColor` and `getLineWidth` accessors.

#### `extruded`

This [option](https://deck.gl/docs/api-reference/layers/geojson-layer#extruded) is used to indicate if you want to extrude the polygon features. It is not applicable to point or line features. 

See the [Extrusions](#extrusions) section for additional guidelines.

### Accessors

[Accessors](https://deck.gl/docs/developer-guide/using-layers#accessors) are properties that allows us to have fine grain control of the visual configuration applied to features. They are a powerful instrument to create advanced visualizations.

We can set the accessor property to a function and this function will be executed for each one of the features. This function must return a data type compatible with the property: for instance if you are specifying a color (`getFillColor`, `getLineColor`), you must return an RGB[A] array; if you are specifying the circle radius or the line width, you must return a number.

For most of the accessors we can also specify a constant value (an array, a number...) and the same value will be applied to all the features. The performance is better if you use constant values because deck.gl does not need to evaluate a function for each feature.

In this section we are going to describe the most common accessors but you can find the complete list of accessor supported by the `GeoJsonLayer` in the deck.gl docs [site](https://deck.gl/docs/api-reference/layers/geojson-layer).

You can use these accessors to create advanced visualizations, including choropleth maps like the ones available with the [style helpers](#style-helpers) and [bubble maps](#bubble-maps). You can also use them to apply different styles depending on the current [zoom level](#zoom-based-styling).

#### `getFillColor`

This [accessor](https://deck.gl/docs/api-reference/layers/geojson-layer#getfillcolor) is used to specify the fill color in RGBA format for polygon features. It can be used also with point features when the `pointType` is `'circle'`. 

#### `getLineColor`

This [accessor](https://deck.gl/docs/api-reference/layers/geojson-layer#getlinecolor) is used to specify the color for line features. If the `stroked` property is set to `true`, it can be used also to specify the circle outline color with point features when the `pointType` is `'circle'` and the polygon outline color with polygon features. 

#### `getLineWidth`

This [accessor](https://deck.gl/docs/api-reference/layers/geojson-layer#getlinewidth) is used to indicate the line width for line features. If the `stroked` property is set to `true`, it can be used also to specify the circle outline width with point features when the `pointType` is `'circle'` and the polygon outline width with polygon features. 

#### `getElevation`

This [accessor](https://deck.gl/docs/api-reference/layers/geojson-layer#getelevation) is used to indicate the elevation of polygon features when `extruded` is set to `true`.  

### Highlighting features

The CartoLayer uses vector rendering. This means the feature geometry is available client-side so we can easily know if the user is hovering over a feature and highlight it.

Highlighting requires to set the layer [`pickable`](https://deck.gl/docs/api-reference/core/layer#pickable) property to `true`. If the CartoLayer is using vector tiles (`type == MAP_TYPES.TILESET` and/or `format = FORMATS.TILEJSON`), you also need to set the [`uniqueIdProperty`](https://deck.gl/docs/api-reference/carto/carto-layer#uniqueidproperty) to the feature property name that allows to identify each feature uniquely. 

The color to be used for highlighting is specified using the [`highlightColor`](https://deck.gl/docs/api-reference/core/layer#highlightcolor) property. This property is a [data accessor](#data-accessors) and you can specify a color to be used always or you can decide which color to use depending on the feature and current visualization properties. 

If you set the [`autoHighlight`](https://deck.gl/docs/api-reference/core/layer#autohighlight) property to `true`, the feature hovered will be highlighted with the color specified by the `highlightColor` property.

We can also manually highlight a feature using the [`highlightedObjectIndex`](https://deck.gl/docs/api-reference/core/layer#highlightedobjectindex) property.

### Point types

When working with point features, the `GeoJsonLayer` allows to render the points using circles, icons, and texts, or a combination of them, using the [`pointType`](https://deck.gl/docs/api-reference/layers/geojson-layer#pointtype) property. 

Depending on the render mode chosen, the `GeoJsonLayer` uses the [`ScatterplotLayer`](https://deck.gl/docs/api-reference/layers/scatterplot-layer) (circles), the [`IconLayer`](https://deck.gl/docs/api-reference/layers/icon-layer) (icons) and/or the [`TextLayer`](https://deck.gl/docs/api-reference/layers/text-layer) (texts) to perform the actual rendering. 

The actual property names might be different in the `GeoJsonLayer` when comparing with the names used in the layer used for rendering: for instance, the `getPointRadius` accessor is called `getRadius` in the `ScatterplotLayer`. In this section, we are using the `GeoJsonLayer` property names and we are linking to the specific property documentation in the deck.gl docs site.

There are different properties available to control the visual configuration depending on the render mode; here we describe the most important ones.

#### Circles

The two mandatory properties you need to specify when using [circles](https://deck.gl/docs/api-reference/layers/geojson-layer#pointtypecircle-options) are `getPointRadius` and `pointRadiusMinPixels`. There are also additional properties to specify the units, scale or maximum radius.

##### `getPointRadius`

This accessor is used to indicate the radius for point features. It can be used to create [bubble maps](#bubble-maps) as shown below. 

##### `pointRadiusMinPixels`

This property allows to specify the minimum radius in pixels to use for circles. By default is 0, so you need to set it to some positive value or the circles won't be visible.

#### Icons

If you set the `pointType` property to `'icon'`, you can then use [icons]((https://deck.gl/docs/api-reference/layers/geojson-layer#pointtypeicon-options)) to style your point features. If you have multiple icons, the most efficient approach is to use an icon atlas with pre-packed icons and the corresponding mapping with icon positions in the atlas. You can also specify individual URLs to fetch icons.

Please check the [Icon Layer example](/deck-gl/examples/basic-examples/icon-layer) to see how you can use pre-packed icons.

##### `getIcon`

You can use this accessor to specify the icon to use. If you use an icon atlas with icon mappings, you will specify here the icon name in the mapping. If you don't use an icon atlas, you should return an object with the URL to fetch. Please refer to the [documentation](https://deck.gl/docs/api-reference/layers/icon-layer#geticon) for the complete specification.

##### `getIconSize`

This is the [accessor](https://deck.gl/docs/api-reference/layers/icon-layer#getsize) used to specify the icon height in pixels, unless you specify a different unit. By default the value is 1, so you want to set it to the actual height size. It can be used also to create a [proportional symbol map](#bubble-maps) where the icon size varies according to the value of some feature property or to implement [zoom based styling](#zoom-based-styling) where the icon size is adapted to the current zoom level.

##### `iconAtlas`

This property lets you specify the icon atlas to use when using pre-packed icons. You will usually specify the URL to the atlas resource, but you have also other options that you can check in the [documentation](https://deck.gl/docs/api-reference/layers/icon-layer#iconatlas).

##### `iconMapping`

You will use this property to specify the icon mapping in the atlas when using pre-packed icons. You can specify an object with the [required properties](https://deck.gl/docs/api-reference/layers/icon-layer#iconmapping) or the URL to fetch a JSON file with this information.

#### Texts

The third option to style point features is to render [text labels](https://deck.gl/docs/api-reference/layers/geojson-layer#pointtypetext-options). We can specify many properties such as the color, angle, font family or font size. 

##### `getText`

This [accessor](https://deck.gl/docs/api-reference/layers/text-layer#gettext) is used to retrieve the text to use in the label.

### Extrusions

Extruded polygons in a 3D visualization can help the users to understand better the information they are exploring. Using deck.gl is straightforward to extrude polygon features. You just need to set the [`extrude`](https://deck.gl/docs/api-reference/layers/geojson-layer#extruded) property to `true` and use the [`getElevation`](https://deck.gl/docs/api-reference/layers/geojson-layer#getelevation) accessor to specify the height for each feature. This accessor expects a value in meters if you are using the default [`MapView`](https://deck.gl/docs/api-reference/core/map-view).

You can provide the same `getElevation` value for all features buy you will usually want to make the `getElevation` accessor dependent on some feature property. For instance, if we have a layer with polygon features representing building footprints and we have a property indicating the building height, we can use the value of this property to extrude buildings according to their heights.

Depending on the feature property values, you might want to scale them to visualize the information in a more meaningful way. You can use the `elevationScale`(https://deck.gl/docs/api-reference/layers/geojson-layer#elevationscale) property to achieve that.

Please check the [extrusion](/deck-gl/examples/advanced-examples/extrusion) example to see how you can extrude polygon features.

### Style helpers

colorBins, colorCategories, colorContinuous. Link to the reference.

### Color scales

d3-scale (linear, threshold, quantile, quantize)

CDB_ functions for CARTO 2

### Bubble maps

These maps are created using point features and choosing the `'circle'` `pointType`. The circle radius is scaled according to the value of some feature property. They can be included among the more general category of proportional symbol maps or graduated symbol maps when using other symbols like icons.

Try to add the instructions for creating the map in this blogpost: https://carto.com/blog/proportional-symbol-maps/

### Zoom based styling

Get current zoom level from the viewstate and use it in accessors for getFillColor, pointRadiusMinPixels, getIconSize