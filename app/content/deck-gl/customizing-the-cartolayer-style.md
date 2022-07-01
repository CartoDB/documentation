## Customizing the CartoLayer style

### Introduction

The rendering options available to specify the style for a [CartoLayer](/deck-gl/reference/#cartolayer) depend on the way the spatial information is stored. The CARTO platform supports spatial data defined using two different methods:

- Data stored as traditional geometries defined by longitude-latitude coordinate pairs

- Data stored using geospatial indices from a discrete global grid system like H3 or Quadbin

When working with traditional geometries, the [CartoLayer](/deck-gl/reference/#cartolayer) uses deck.gl [GeoJsonLayer](https://deck.gl/docs/api-reference/layers/geojson-layer) for rendering. All the rendering options from the GeoJsonLayer can be used to customize the styling properties of your `CartoLayer`.

When working with data using geospatial indices, the layer used for rendering depends on the discrete global grid system used:

- If you are using the `CartoLayer` with data stored as [H3 indices]((https://docs.carto.com/analytics-toolbox-bigquery/overview/spatial-indexes/#h3), the [H3HexagonLayer](https://deck.gl/docs/api-reference/geo-layers/h3-hexagon-layer) is used. 

- If you are using it with data stored as [quadbins](https://docs.carto.com/analytics-toolbox-bigquery/overview/spatial-indexes/#quadbin), the [QuadkeyLayer](https://deck.gl/docs/api-reference/geo-layers/quadkey-layer) is used.

This guide mainly focus on working with traditional geometries but most of the rendering properties used are also available in the spatial indices layers and most of the content is applicable to them.

In this guide you will learn about the main options available and how to use them to create great visualizations. We have added links to the properties documentation in the main deck.gl docs site that includes useful information like data type or default values.

### Basic rendering options

These options are used to indicate basic styling properties and the availability of some of them depends on the type of feature geometry:

#### `opacity`

This [option](https://deck.gl/docs/api-reference/core/layer#opacity) controls the feature opacity. By default features are opaque but you can control the layer translucency through this option.

#### `filled`

With this [option](https://deck.gl/docs/api-reference/layers/geojson-layer#filled) you indicate if you want to draw filled polygons. It is also used to indicate if you want to draw filled circles when you have point features and the `pointType` is `'circle'`. It is not applicable to line features.

See the [`getFillColor`](#getfillcolor) accessor to understand how to specify the color for your features.
  
#### `stroked`

This [option](https://deck.gl/docs/api-reference/layers/geojson-layer#stroked) is used to indicate if you want to draw the outline for polygon features. If is also used to indicate if you want to draw the circle outline when you have point features and the `pointType` is `'circle'`. Line features are stroked by default and this option is not applicable to them.

There are many properties available for controlling the outline features. Please see below the [`getLineColor`](#getlinecolor) and [`getLineWidth`](#getlinewidth) accessors.

#### `extruded`

This [option](https://deck.gl/docs/api-reference/layers/geojson-layer#extruded) is used to indicate if you want to extrude the polygon features. It is not applicable to point or line features. 

See the [Extrusions](#extrusions) section for additional guidelines.

### Accessors

[Accessors](https://deck.gl/docs/developer-guide/using-layers#accessors) are properties that allow us to have fine grain control of the visual configuration applied to features. They are a powerful instrument to create advanced visualizations.

We can set the accessor property to a function and this function will be executed for each one of the features. This function must return a data type compatible with the property: for instance if you are specifying a color (`getFillColor`, `getLineColor`), you must return an RGB[A] array; if you are specifying the circle radius or the line width, you must return a number.

For most of the accessors we can also specify a constant value (an array, a number...) and the same value will be applied to all the features. The performance is better if you use constant values because deck.gl does not need to evaluate a function for each feature.

In this section we are going to describe the most common accessors but you can find the complete list of accessor supported by the `GeoJsonLayer` in the deck.gl docs [site](https://deck.gl/docs/api-reference/layers/geojson-layer).

You can use these accessors to create advanced visualizations, including choropleth maps, like the ones available with the [style helpers](#style-helpers), and [proportional symbol maps](#proportional-symbol-maps). You can also use them to apply different styles depending on the current [zoom level](#zoom-based-styling).

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

Highlighting requires to set the layer [`pickable`](https://deck.gl/docs/api-reference/core/layer#pickable) property to `true`. You also need to set the [`uniqueIdProperty`](https://deck.gl/docs/api-reference/carto/carto-layer#uniqueidproperty) to the feature property name that allows to identify each feature uniquely. 

The color to be used for highlighting is specified using the [`highlightColor`](https://deck.gl/docs/api-reference/core/layer#highlightcolor) property. This property is an [accessor](#accessors): you can specify a color to be used always or you can decide which color to use depending on the feature and current visualization properties. 

If you set the [`autoHighlight`](https://deck.gl/docs/api-reference/core/layer#autohighlight) property to `true`, the feature hovered will be highlighted with the color specified by the `highlightColor` property.

We can also manually highlight a feature using the [`highlightedObjectIndex`](https://deck.gl/docs/api-reference/core/layer#highlightedobjectindex) property.

### Point types

{{% bannerNote title="Not applicable to data using spatial indices" %}}

The content in this section is not applicable to datasets using spatial indices.

{{%/ bannerNote %}}

When working with point features, the `GeoJsonLayer` allows to render the points using circles, icons, and texts, or a combination of them, using the [`pointType`](https://deck.gl/docs/api-reference/layers/geojson-layer#pointtype) property. 

Depending on the render mode chosen, the `GeoJsonLayer` uses the [`ScatterplotLayer`](https://deck.gl/docs/api-reference/layers/scatterplot-layer) (circles), the [`IconLayer`](https://deck.gl/docs/api-reference/layers/icon-layer) (icons), and/or the [`TextLayer`](https://deck.gl/docs/api-reference/layers/text-layer) (texts) to perform the actual rendering. 

The actual property names might be different in the `GeoJsonLayer` when comparing with the names in the layer used for rendering: for instance, the `getPointRadius` accessor is called `getRadius` in the `ScatterplotLayer`. In this section, we are using the `GeoJsonLayer` property names and we are linking to the specific property documentation in the deck.gl docs site.

There are different properties available to control the visual configuration depending on the render mode; here we describe the most important ones.

#### Circles

When using [circles](https://deck.gl/docs/api-reference/layers/geojson-layer#pointtypecircle-options) for visualizing point features you need the use the `getPointRadius` accessor to set the radius for the circle (by default in meters) or you can just set the `pointRadiusMinPixels` property. There are also additional properties to specify the units, scale or maximum radius.

##### `getPointRadius`

This accessor is used to indicate the radius for point features. It can be used to create [proportional symbol maps](#proportional-symbol-maps) as shown below. 

##### `pointRadiusMinPixels`

This property allows to specify the minimum radius in pixels to use for circles. By default is 0, so you need to set it to some positive value or the circles won't be visible.

#### Icons

If you set the `pointType` property to `'icon'`, you can then use [icons](https://deck.gl/docs/api-reference/layers/geojson-layer#pointtypeicon-options) to style your point features. If you have multiple icons, the most efficient approach is to use an icon atlas with pre-packed icons and the corresponding mapping with icon positions in the atlas. You can also specify individual URLs to fetch icons.

Please check the [Icon Layer example](/deck-gl/examples/basic-examples/icon-layer) to see how you can use pre-packed icons.

##### `getIcon`

You can use this accessor to specify the icon to use. If you use an icon atlas with icon mappings, you will specify here the icon name in the mapping. If you don't use an icon atlas, you should return an object with the URL to fetch. Please refer to the [documentation](https://deck.gl/docs/api-reference/layers/icon-layer#geticon) for the complete specification.

##### `getIconSize`

This is the [accessor](https://deck.gl/docs/api-reference/layers/icon-layer#getsize) used to specify the icon height in pixels, unless you specify a different unit. By default the value is 1, so you want to set it to the actual height size. It can be used also to create a [proportional symbol map](#proportional-symbol-maps) where the icon size varies according to the value of some feature property or to implement [zoom based styling](#zoom-based-styling) where the icon size is adapted to the current zoom level.

##### `iconAtlas`

This property lets you specify the icon atlas to use when using pre-packed icons. You will usually specify the URL to the atlas resource, but you have also other options that you can check in the [documentation](https://deck.gl/docs/api-reference/layers/icon-layer#iconatlas).

##### `iconMapping`

You will use this property to specify the icon mapping in the atlas when using pre-packed icons. You can specify an object with the [required properties](https://deck.gl/docs/api-reference/layers/icon-layer#iconmapping) or the URL to fetch a JSON file with this information.

#### Texts

The third option to style point features is to render [text labels](https://deck.gl/docs/api-reference/layers/geojson-layer#pointtypetext-options). We can specify many properties such as the color, angle, font family or font size. 

##### `getText`

This [accessor](https://deck.gl/docs/api-reference/layers/text-layer#gettext) is used to retrieve the text to use in the label.

### Extrusions

Extruded polygons in a 3D visualization can help the users to understand better the information they are exploring. Using deck.gl is straightforward to extrude polygon features. You just need to set the [`extruded`](https://deck.gl/docs/api-reference/layers/geojson-layer#extruded) property to `true` and use the [`getElevation`](https://deck.gl/docs/api-reference/layers/geojson-layer#getelevation) accessor to specify the height for each feature. This accessor expects a value in meters if you are using the default [`MapView`](https://deck.gl/docs/api-reference/core/map-view).

You can provide the same `getElevation` value for all features but you will usually want to make the `getElevation` accessor dependent on some feature property. For instance, if we have a layer with polygon features representing building footprints and we have a property indicating the building height, we can use the value of this property to extrude buildings according to their heights.

Depending on the feature property values, you might want to scale them to visualize the information in a more meaningful way. You can use the [`elevationScale`](https://deck.gl/docs/api-reference/layers/geojson-layer#elevationscale) property to achieve that.

Please check the [extrusion](/deck-gl/examples/advanced-examples/extrusion) example to see how you can extrude polygon features.

### Scales-Classification

If you want to create a choropleth map or a proportional symbol map, you can use absolute scaling or distribute the features in classes. In the first case, the color and/or size of a feature in the map is proportional to the value of some property or combination of properties. In the second case, values are classified according to a classification rule. 

There are many classification rules that can be used like equal intervals, jenks natural breaks or classification by quantiles. The choice of classification rule depends on the data and has a great impact on the visualization. These rules can be implemented using accessors like `getFillColor` or `getPointRadius` but you need to be able to calculate the thresholds for each class.

The CartoLayer only works with vector tiles so only the information corresponding to the current viewport and zoom level is downloaded to the client. You can only determine the information needed to calculate the thresholds (min, max, quantiles...) for the whole dataset if the server provides them.

#### Client-side calculations

If you already have the information you need to calculate thresholds, you can do this client-side. You can perform the threshold calculations yourself but our recommendation is to use a library that already implements this functionality such as [d3-scale](https://github.com/d3/d3-scale). This library includes support for many different scales such as linear, threshold, quantile or quantize scales.

These scales map the domain of values into a range. The range can be an array of colors in RGB[A] format if you want to create a choropleth map or an array of numbers if you want to create a proportional symbol map.

For example, if you want to create a choropleth map with a quantize (equal intervals) scale with five different classes, you must specify an array with five colors and the domain for your values. In this case we are going to apply the colors to places with a population between 1 million (1e6) and 1 billion (1e9). We need to use the `getFillColor` accessor to retrieve the corresponding color for each feature property value:

```javascript
const colors = [
  [209, 238, 234],
  [168, 219, 217],
  [133, 196, 201],
  [104, 171, 184],
  [79, 144, 166]
];

const colorScale = d3.scaleQuantize().range(colors).domain([1e6, 1e9]);

layer = new deck.carto.CartoLayer({
    id: 'my-layer',
    connection: 'bqconn',
    type: deck.carto.MAP_TYPES.QUERY,
    data: 'SELECT geom, name, population FROM cartobq.public_account.populated_places', 
    getFillColor: d => colorScale(d.properties.population),
    pointRadiusMinPixels: 2.5
});
```

#### Server-side calculations

With the `CartoLayer` you are using vector tiles, so you just have in the client the data for the current viewport. You cannot calculate thresholds taking into account the whole dataset. In this case, you have only two options: use the statistics provided by the map server (if available) or implement your own calculations using the data from the source table.

If you are going to visualize a static tileset created with the CARTO Analytics Toolbox, the tileset metadata includes information about quantiles for each property. You can retrieve this information using the `CartoLayer` [`onDataLoad`](https://deck.gl/docs/api-reference/carto/carto-layer#ondataload) handler that receives the tileset metadata in [TileJSON](https://github.com/mapbox/tilejson-spec) format as the argument.

If you are using dynamic tiles, you can use the Stats API. You can make a request with the table or query that you are going to use and it is going to return some statistics useful for calculating scales and defining classes.

{{% bannerNote title="Statistical functions in CARTO 2" %}}

If you are using CARTO 2, there is a set of available [functions](https://carto.com/help/working-with-data/carto-functions/#statistical-functions) that implements the jenks natural breaks optimization, quantiles and heads/tails classification rules.

{{%/ bannerNote %}}

### Choropleth maps

Choropleth maps are created assigning different colors to features representing geographic areas such as countries or neighborhoods. Color assignment depends on the value of some property or a combination of two properties (bivariate choropleth map).

If you have a numeric property, you have two options: you can apply a classification rule as shown above to create classes or bins for your data or you can use absolute scaling and map the values to a color ramp. 

If you already have a string property that represents a categorical or qualitative variable, you can use this property as the class and assign a color to each of the possible property values.

It is important to choose a color palette adequate to the type of choropleth map / variable you are using. We have defined a set of data-driven color schemes called [CARTO Colors](https://carto.com/carto-colors/) that you can use in your choropleth maps.

There is a set of schemes appropriate to represent numeric values from low to high (sequential schemes). We provide another set suitable for visualizing categorical differences in qualitative data (qualitative schemes). Finally, we also have defined diverging schemes for those cases where we have an interesting mid-point when using quantitative data. 

In order to create the choropleth map, you can use the [`getFillColor`](#getfillcolor) accessor to provide the color for each feature as shown above in the [Scales/Classification](#scales-classification) section. 

But you can also take advantage of the [style helpers](https://deck.gl/docs/api-reference/carto/styles) provided in the CARTO for deck.gl module. These helpers make it really easy to implement a choropleth map using numeric bins ([colorBins](https://deck.gl/docs/api-reference/carto/styles#colorbins) helper), qualitative data ([colorCategories](https://deck.gl/docs/api-reference/carto/styles#colorcategories) helper), or using a color ramp to map numeric values ([colorContinuous](https://deck.gl/docs/api-reference/carto/styles#color-continuous) helper).

These style helpers allow you to specify the feature property you want to use to create the choropleth, the domain of values for that property and the colors you want to use. The colors can be specified using an array or using a string with the CARTO colors palette name.

Take a look at the [Styling](https://docs.carto.com/deck-gl/examples/gallery/) examples section to see how you can use these style helpers.

### Proportional symbol maps

{{% bannerNote title="Not applicable to data using spatial indices" %}}

The content in this section is not applicable to datasets using spatial indices.

{{%/ bannerNote %}}

Proportional symbol maps assign a larger or smaller symbol to features depending on the value of some property. If you use a circle as the symbol, they are sometimes known as bubble maps. 

You can implement this type of maps by using accessors like [`getPointRadius`](#getpointradius) when using circles or [`getIconSize`](#geticonsize) when using icons as the symbol.

You can also combine proportional symbol maps with style helpers that symbolize the features using different colors. For example, we are going to create a map where we represent the population of each country using a bubble map and then assign a different color to each circle depending on the country continent.

In this case we are going to use absolute scaling (no classes/bins) and we are going to assing a different circle radius to each feature based on the `pop_2015` property. In the `getPointRadius` accessor we need to define the formula for calculating the radius for each feature. The maximum symbol size (radius in pixels) is going to be 30 pixels and the radius for each country is going to be proportional to the square root of the population, so we scale it between 0 and 1 using the square root (~27620) of the country with the biggest population (China). We are going to have fixed size symbols that do not scale with the zoom level so we need to define the [`pointRadiusUnits`](https://deck.gl/docs/api-reference/layers/scatterplot-layer#radiusunits) as pixels (by default is meters). 

```javascript
layer = new deck.carto.CartoLayer({
  ...
  pointRadiusUnits: 'pixels',
  getPointRadius: (d) => {
    return 30.0 * Math.sqrt(d.properties.pop_2015) / 27620.2642999664;
  },
  ...
});
```

Please check the complete example [here](/deck-gl/examples/styling/proportional-symbol-map).

### Zoom based styling

When creating visualizations, sometimes we need to define different styling properties like symbol sizes depending on the zoom level. With deck.gl it is easy to apply zoom-based styling using the available [accessors](#accessors).

We need to listen to the [onViewStateChange](https://deck.gl/docs/api-reference/core/deck#onviewstatechange) event and re-render our layer when it is fired. We can store the zoom level in a variable so we can use it later in the layer accessors:

```javascript
onViewStateChange: ({viewState}) => {
  zoom = viewState.zoom;
  renderLayer();
},
```

Then, in the `renderLayer` function we define our layer and update the `layers` property in the DeckGL object. The process is the following:

1. Define the accessors that will depend on the current zoom level
2. Set the [updateTriggers](https://deck.gl/docs/api-reference/core/layer#updatetriggers) property so the radius is recalculated when the zoom level changes
3. Update the `layers` property

For instance, in the previous example that shows how to create a proportional symbol map, we can make the radius size for points depend on the zoom level:

```javascript
layer = new deck.carto.CartoLayer({
  ...
  pointRadiusUnits: 'pixels',
  getPointRadius: (d) => {
    return 30.0 * zoom * Math.sqrt(d.properties.pop_2015) / 27620.2642999664;
  },
  updateTriggers: {
    getPointRadius: [zoom]
  },
  ...
});
deckgl.setProps({
  layers: [layer]
});
```

You can check a complete example using zoom-based styling [here](/deck-gl/examples/styling/zoom-based-styling).
