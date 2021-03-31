## Widgets

{{% bannerNote title="note" %}}
The widgets work with client-side features from the vector tiles, whether the source is a CARTO dataset or a BigQuery Tiler tileset. To avoid counting the same feature two or more times when it is near or crosses a tile border, we need to know what's the name of the feature property that allows us to identify the features. By default it tries to find a property with the name `cartodb_id` or `geoid` (default property name for CARTO datasets and Data Observatory tilesets) but if your source does not contain any of these properties, you can indicate what property to use with the `uniqueIdProperty` parameter in the [`useCartoLayerProps`](../../library-reference/api/#usecartolayerprops--codeobjectcode) function. 
{{%/ bannerNote %}}

{{% bannerNote title="warning" %}}
If your source is a simple tileset that you have generated with the `dropFeatures` strategy, widget calculations at some zoom levels can be inaccurate due to features being dropped from the tiles. 
{{%/ bannerNote %}}
