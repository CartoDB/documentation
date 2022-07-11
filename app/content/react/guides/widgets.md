## Widgets

You can use widgets in your application to provide advanced functionality for exploring and filtering the information. CARTO for React comes with several widgets out-of-the-box that you can add really easily to your spatial apps:

  - [Bar](#bar-widget)
  - [Category](#category-widget)
  - [FeatureSelection](#feature-selection-widget)
  - [Formula](#formula-widget)
  - [Geocoder](#geocoder-widget)
  - [Histogram](#histogram-widget)
  - [Legend](#legend-widget)
  - [Pie](#pie-widget)
  - [ScatterPlot](#scatterplot-widget)
  - [Table](#table-widget)
  - [TimeSeries](#timeseries-widget)

The widgets are implemented combining the functionality of three different library packages:

- `@carto/react-ui`. This package provides the user interface functionality for widgets. This means you can reuse the UI with your own business logic if you need to provide custom functionality.
  
- `@carto/react-widgets`. This package takes advantage of the UI components from the `@carto/react-ui` package and provides the business logic for the filters, including the integration with other components through the Redux store.
 
- `@carto/react-workers`. This package implements the calculations needed by the widgets. Everything is implemented using web workers to improve the performance and the user experience.

We can group the widgets in two main categories:

- Data-driven widgets. These widgets perform calculations on the data sources, including aggregations, and then show the results using different types of charts. The widgets included in this category are: Bar, Category, Formula, Histogram, Pie, Scatterplot, Table and Time-Series.

- Non data-driven widgets. These widgets provide functionality that does not perform calculations on the data sources. We have the Geocoder widget to provide geocoding functionality, the Legend widget to provide layer selection and legend functionality and the FeatureSelectionWidget to filter features drawing a shape in the map.

### Modes (Behavior)

The data-driven widgets (except the Scatterplot and Table widgets) can work in two different modes: viewport and global. By default the widgets work in viewport mode, meaning they are showing information about the features in the current viewport. But you can also configure them to use the global mode where information is displayed for the full data source.

The main difference is that widgets in global mode are static, they always show the same information, but widgets in viewport mode update the information when the viewport changes.

There is also a difference in how they are implemented. Widgets in viewport mode work with the data that has been downloaded for visualization so all the data needed to make the calculations is available locally in the browser. On the other hand, widgets in global mode get the data by performing a SQL query to the data warehouse.

{{% bannerNote title="Warning" %}}
Global mode is not available for widgets linked to static (pre-generated) tilesets sources, only with dynamic tiling. The main reason for that is that static tilesets are usually created for extremely large datasets (i.e. billions of features) and the SQL query could have a processing time not suitable for an interactive applications. Another reason is that the source table(s) for the tileset might have been updated (or it might not be even available) so the tileset and the widget could potentially show different information.
{{%/ bannerNote %}}

### Data sources

The data-driven widgets work with vector tiles or GeoJSON features provided by the Maps API. The workers retrieve the information from the tiles / GeoJSON features and execute the different calculations needed by each widget. Every time we change the viewport, the widgets are updated.

{{% bannerNote title="note" %}}
If you are working with vector tiles (static or dynamic), you need to provide the name of the field that identifies each feature using the `uniqueIdProperty` property while calling the [`useCartoLayerProps`](../../library-reference/api/#usecartolayerprops) function, except if your source already includes a field called `cartodb_id` or `geoid`. This is needed to ensure that each feature is only counted once even if it is splitted in several tiles.
{{%/ bannerNote %}}

{{% bannerNote title="warning" %}}
If your source is using tiles, widget calculations at some zoom levels can be inaccurate due to features being dropped from the tiles to keep the tile size under the limit. In the particular case of dynamic tiling, the widgets will display a warning message indicating that not all the data needed by the widget is available. 

Since deck.gl v8.8, included by default in CARTO for React 1.3, the `CartoLayer` works always with dynamic tiles. This means that features can be simplified and/or dropped depending on the zoom level. If you have lots of data in the same area, the widgets are not going to show results until no features have been dropped. In these cases, if the dataset is not very large, you can keep using GeoJSON data by using the `fetchLayerData` function to retrieve the data and the `GeoJsonLayer` instead of the `CartoLayer`. Please read the [Data Sources](../data-sources) guide for more information.
{{%/ bannerNote %}}

### Common properties for data-driven widgets

There are some properties that are used by all the data-driven widgets. You can check the full API reference for each widget [here](../../library-reference/widgets):

| Property           | Description          |
| ------------------ | -------------------- |
| `id`               | ID for the widget instance |
| `title`            | Title to show in the widget header |
| `dataSource`       | ID of the data source to get the data from |
| `global`           | Indicates whether the widget is using the global mode |
| `animation`        | Indicates whether the widget update is animated or jumps directly to the new state |
| `wrapperProps`     | Props to pass to the WrapperWidgetUI |
| `noDataAlertProps` | Message (title and body) to show when there is no data available for the widget |
| `droppingFeaturesAlertProps` | Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
| `onError`          | Event emitted when an error is thrown while the widget is doing calculations |

### Bar widget

Groups features into categories (column) and executes an operation on another column (`operationColumn`) for each group. The categories are then visualized using vertical bars.

![Category Widget](/img/react/category-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `column`     | Name of the data source’s column to get the data from |
| `operation`  | Aggregation operation to apply on the `operationColumn` values |
| `operationColumn`  | Column to use in the aggregation operation |
| `formatter`  | Formatter for the aggregated value |
| `labels`     | Labels to show for each category |

### Category widget

Groups features into categories (column) and executes an operation on another column (`operationColumn`) for each group. The categories are then visualized using horizontal bars. Displays 5 categories at the same time.

![Category Widget](/img/react/category-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `column`     | Name of the data source’s column to get the data from |
| `operation`  | Aggregation operation to apply on the `operationColumn` values |
| `operationColumn`  | Column to use in the aggregation operation |
| `formatter`  | Formatter for the aggregated value |
| `labels`     | Labels to show for each category |

### Geocoder widget 

Provides geocoding functionality through a search bar, requiring credentials/token with access to geocoding services.

![Geocoder Widget](/img/react/geocoder-widget.png)

When the results are returned, the widget performs an automatic zoom to the best result (no autocomplete) and adds a marker.

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `className`  | Name of the CSS class to customize the widget style |

### Feature Selection widget 

Provides functionality to filter spatially the features by drawing a shape on the map.

![Feature Selection Widget](/img/react/geocoder-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `className`  | Name of the CSS class to customize the widget style |
| `selectionModes`  | Available selection modes |
| `editModes`  | Available edit modes |
| `defaultEnabled`  | Indicates whether the widget is enabled by default |
| `defaultSelectedMode`  | Selection default mode |
| `tooltipPlacement` | Sets the position where the tooltip is placed |

### Formula widget

Calculates a value executing an aggregation operation on a data source column. 

![Formula Widget](/img/react/formula-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `column`     | Name of the data source’s column to get the data from |
| `operation`  | Aggregation operation to apply on the `column` values |
| `formatter`  | Formatter for the aggregated value |

### Histogram widget

Groups features into buckets after executing an aggregation operation on a column.

![Histogram Widget](/img/react/histogram-widget.png)

Requires/accepts the following additional properties:

| Property          | Description          |
| ----------------- | -------------------- |
| `column`          | Name of the data source’s column to get the data from |
| `operation`       | Aggregation operation to apply on the `column` values |
| `formatter`       | Formatter for the aggregated value |
| `min`             | Set this property to use this value as the minimum value instead of calculating it from the dataset. |
| `max`             | Set this property to use this value as the maximum value instead of calculating it from the dataset. |
| `bins`            | Number of bins to use. Incompatible with the `ticks` prop. |
| `ticks`           | Breaks to define the buckets |
| `xAxisFormatter`  | Formatter for X axis values |


### Legend widget

Creates a widget for switching layers on/off and showing legends. The legend representation depends on the legend type. The widget access the layer information from the store and add the legend for those layers where it has been specified.

![Legend Widget](/img/react/legend-widget.png)

Accepts the following optional property:

| Property             | Description          |
| -------------------- | -------------------- |
| `className`          | Material-UI withStyle class for styling |
| `customLegendTypes`  | Object with custom legend types and the components to be used with these types. |
| `customLayerOptions` | Object with custom layer options and the components to be used with these options. |  
| `initialCollapsed`   | Indicates whether the widget is initially collapsed or not. |
| `layerOrder`         | Array of layer identifiers. Defines the order of layers in the legend. |

### Pie widget

Groups features into categories (column) and executes an operation on another column (`operationColumn`) for each group.

![Pie Widget](/img/react/pie-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `column`     | Name of the data source’s column to get the data from |
| `operation`  | Aggregation operation to apply on the `operationColumn` values |
| `operationColumn`  | Column to use in the aggregation operation |
| `formatter`  | Formatter for the aggregated value |
| `height`     | Chart height (CSS) |
| `tooltipFormatter`  | Formatter for the tooltip |
| `colors`     | Array of colors to show for each category.  |
| `labels`     | Labels to show for each category |

### ScatterPlot widget

Represents two properties/columns in a cartesian chart from a data source to help understand if there is correlation between them.

![ScatterPlot Widget](/img/react/scatterplot-widget.png)

Requires/accepts the following additional properties:

| Property           | Description          |
| ------------------ | -------------------- |
| `xAxisColumn`      | Name of the data source's column to get the data for the X axis from. |
| `yAxisColumn`      | Name of the data source's column to get the data for the Y axis from. |
| `xAxisFormatter`   | Function to format X axis values.  |
| `yAxisFormatter`   | Function to format X axis values. |
| `tooltipFormatter` | Function to format the tooltip values. |

### Table widget

Displays the column values for the current features visualized in the map in a tabular way. 

![Table Widget](/img/react/time-series-widget.png)

Requires/accepts the following additional properties:

| Property           | Description          |
| ------------------ | -------------------- |
| `columns`          | Array of column names to show in the table. |
| `initialPageSize`  | Initial page size for pagination |
| `onPageSizeChange` | Callback function to be called when the page size changes |
| `height`           | Table height (CSS) |
| `dense`            | Indicates whether to use a dense layout (less margin/padding) |
| `pageSize`         | Used to set the page size |

### TimeSeries widget

Groups features into time intervals and allows to play an animation that filters the features displayed based on the current interval. 

![TimeSeries Widget](/img/react/time-series-widget.png)

Requires/accepts the following additional properties:

| Property           | Description          |
| ------------------ | -------------------- |
| `column`           | Column containing the timestamp/date values |
| `operation`        | Aggregation operation to apply on the `operationColumn` values. Default: COUNT |
| `operationColumn`  | Column to use in the aggregation operation |
| `formatter`        | Formatter for the aggregated value |
| `height`           | Chart height (CSS) |
| `tooltipFormatter` | Formatter for the tooltip |
| `stepSize`         | Time interval size |
| `stepSizeOptions`  | Available time interval sizes |
| `chartType`        | Selected chart type: line chart (default) or bar chart |
| `tooltip`          | Whether to show or not the tooltip |
| `timeWindow`       | Interval for the currently selected time window |
| `showControls`     | Whether to show or not the controls (play, pause, stop, speed selection...) |
| `isPlaying`        | Whether to set the widget to play mode |
| `isPaused`         | Whether to set the widget to pause mode |
| `onPlay`           | Event emitted when the animation starts to play |
| `onPause`          | Event emitted when the animation is paused |
| `onStop`           | Event emitted when the animation is stopped |
| `onTimelineUpdate` | Event emitted when the animation moves to the next time interval |
| `onTimeWindowUpdate` | Event emitted when the time window moves to the next time interval |

