## Widgets

You can use widgets in your application to provide advanced functionality for exploring and filtering the information. CARTO for React comes with several widgets out-of-the-box that you can add really easily to your spatial apps:

- Category
- Formula
- Geocoder
- Histogram
- Pie

The widgets are implemented combining the functionality of three different library packages:

- `@carto/react-ui`. This package provides the user interface functionality for widgets. This means you can reuse the UI with your own business logic if you need to provide custom functionality.
  
- `@carto/react-widgets`. This package takes advantage of the UI components from the `@carto/react-ui` package and provides the business logic for the filters, including the integration with other components through the Redux store.
 
- `@carto/react-workers`. This package implements the calculations needed by the widgets. Everything is implemented using web workers to improve the performance and the user experience.

### Data sources

The widgets work with vector tiles provided by the Maps API. The workers retrieve the information from the tiles and execute the different calculations needed by each widget. Every time we change the viewport, new tiles are downloaded and the widgets are updated.

{{% bannerNote title="note" %}}
The widgets work with client-side features from the vector tiles, whether the source is a CARTO dataset or a BigQuery Tiler tileset. To avoid counting the same feature two or more times when it is near or crosses a tile border, we need to know what's the name of the feature property that allows us to identify the features. By default it tries to find a property with the name `cartodb_id` or `geoid` (default property name for CARTO datasets and Data Observatory tilesets) but if your source does not contain any of these properties, you can indicate what property to use with the `uniqueIdProperty` parameter in the [`useCartoLayerProps`](../../library-reference/api/#usecartolayerprops--codeobjectcode) function. 
{{%/ bannerNote %}}

{{% bannerNote title="warning" %}}
If your source is a simple tileset that you have generated with the `dropFeatures` strategy, widget calculations at some zoom levels can be inaccurate due to features being dropped from the tiles. 
{{%/ bannerNote %}}

### Common properties

There are some properties that are used by all the widgets, except the geocoder widget:

| Property     | Description          |
| ------------ | -------------------- |
| `id`         | ID for the widget instance |
| `title`      | Title to show in the widget header |
| `dataSource` | ID of the data source to get the data from |
| `column`     | Name of the data source’s column to get the data from |
| `operation`  | Aggregation operation to apply on the column or `operationColumn` values |

### Category widget

Groups features into categories (column) and executes an operation on another column (`operationColumn`) for each group. Displays 5 categories at the same time.

![Category Widget](/img/react/category-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `formatter`  | Formatter for the aggregated value |
| `labels`     | Labels to show for each category |
| `operationColumn`  | Column to use int the aggregation operation |

### Formula widget

Calculates a value executing an aggregation operation on a data source column. 

![Formula Widget](/img/react/formula-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `formatter`  | Formatter for the aggregated value |

### Geocoder widget 

Provides geocoding functionality through a search bar, requiring credentials with access to geocoding services. It works by executing the cdb_geocode_street_point function through the SQL API.

![Geocoder Widget](/img/react/geocoder-widget.png)

When the results are returned, the widget performs an automatic zoom to the best result (no autocomplete) and adds a marker.

### Histogram widget

Groups features into buckets after executing an aggregation operation on a column.

![Histogram Widget](/img/react/histogram-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `formatter`  | Formatter for the aggregated value |
| `ticks`      | Breaks to define the buckets |
| `xAxisFormatter`  | Formatter for X axis values |

### Pie widget

Groups features into categories (column) and executes an operation on another column (`operationColumn`) for each group.

![Pie Widget](/img/react/pie-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `formatter`  | Formatter for the aggregated value |
| `height`     | Chart height (CSS) |
| `operationColumn`  | Column to use int the aggregation operation |
| `tooltipFormatter`  | Formatter for the tooltip |
