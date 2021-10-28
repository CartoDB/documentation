## Widgets

You can use widgets in your application to provide advanced functionality for exploring and filtering the information. CARTO for React comes with several widgets out-of-the-box that you can add really easily to your spatial apps:

  - [Category](#category-widget)
  - [Formula](#formula-widget)
  - [Histogram](#histogram-widget)
  - [Legend](#legend-widget)
  - [Pie](#pie-widget)
  - [ScatterPlot](#scatterplot-widget)
  - [TimeSeries](#timeseries-widget)

The widgets are implemented combining the functionality of three different library packages:

- `@carto/react-ui`. This package provides the user interface functionality for widgets. This means you can reuse the UI with your own business logic if you need to provide custom functionality.
  
- `@carto/react-widgets`. This package takes advantage of the UI components from the `@carto/react-ui` package and provides the business logic for the filters, including the integration with other components through the Redux store.
 
- `@carto/react-workers`. This package implements the calculations needed by the widgets. Everything is implemented using web workers to improve the performance and the user experience.

### Data sources

The widgets (except the Legend widget) work with vector tiles or GeoJSON features provided by the Maps API. The workers retrieve the information from the tiles / GeoJSON features and execute the different calculations needed by each widget. Every time we change the viewport, the widgets are updated.

{{% bannerNote title="note" %}}
If you are working with tilesets / vector tiles, you need to provide the name of the field that identifies each feature using the `uniqueIdProperty` property while calling the [`useCartoLayerProps`](../../library-reference/api/#usecartolayerprops) function, except if your source already includes a field called `cartodb_id` or `geoid`. 
{{%/ bannerNote %}}

{{% bannerNote title="warning" %}}
If your source is a tileset, widget calculations at some zoom levels can be inaccurate due to features being dropped from the tiles to keep the tile size under the limit. 
{{%/ bannerNote %}}

### Common properties

There are some properties that are used by all the widgets, except the Legend widget. You can check the full API reference for each widget [here](../../library-reference/widgets):

| Property     | Description          |
| ------------ | -------------------- |
| `id`         | ID for the widget instance |
| `title`      | Title to show in the widget header |
| `dataSource` | ID of the data source to get the data from |
| `wrapperProps` | Props to pass to the WrapperWidgetUI |
| `noDataAlertProps` | Message (title and body) to show when there is no data available for the widget |
| `onError` | Event emitted when an error is thrown while the widget is doing calculations |

### Category widget

Groups features into categories (column) and executes an operation on another column (`operationColumn`) for each group. Displays 5 categories at the same time.

![Category Widget](/img/react/category-widget.png)

Requires/accepts the following additional properties:

| Property     | Description          |
| ------------ | -------------------- |
| `column`     | Name of the data source’s column to get the data from |
| `operation`  | Aggregation operation to apply on the `operationColumn` values |
| `operationColumn`  | Column to use in the aggregation operation |
| `formatter`  | Formatter for the aggregated value |
| `labels`     | Labels to show for each category |

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

| Property     | Description          |
| ------------ | -------------------- |
| `column`     | Name of the data source’s column to get the data from |
| `operation`  | Aggregation operation to apply on the `column` values |
| `formatter`  | Formatter for the aggregated value |
| `ticks`      | Breaks to define the buckets |
| `xAxisFormatter`  | Formatter for X axis values |


### Legend widget

Creates a widget for switching layers on/off and showing legends. The legend representation depends on the legend type. The widget access the layer information from the store and add the legend for those layers where it has been specified.

![Legend Widget](/img/react/legend-widget.png)

Accepts the following optional property:

| Property    | Description          |
| ----------- | -------------------- |
| `className` | Material-UI withStyle class for styling |

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

### TimeSeries widget

Groups features into time intervals and allows to play an animation that filters the features displayed based on the current interval. 

![TimeSeries Widget](/img/react/time-series-widget.png)

Requires/accepts the following additional properties:

| Property           | Description          |
| ------------------ | -------------------- |
| `column`     | Column containing the timestamp/date values |
| `operation`  | Aggregation operation to apply on the `operationColumn` values. Default: COUNT |
| `operationColumn`  | Column to use in the aggregation operation |
| `formatter`  | Formatter for the aggregated value |
| `height`     | Chart height (CSS) |
| `tooltipFormatter`  | Formatter for the tooltip |
| `stepSize` | Time interval size |
| `stepSizeOptions` | Available time interval sizes |
| `chartType` | Selected chart type: line chart (default) or bar chart |
| `tooltip` | Whether to show or not the tooltip |
| `timeWindow` | Interval for the currently selected time window |
| `showControls` | Whether to show or not the controls (play, pause, stop, speed selection...) |
| `isPlaying` | Whether to set the widget to play mode |
| `isPaused` | Whether to set the widget to pause mode |
| `onPlay` | Event emitted when the animation starts to play |
| `onPause` | Event emitted when the animation is paused |
| `onStop` | Event emitted when the animation is stopped |
| `onTimelineUpdate` | Event emitted when the animation moves to the next time interval |
| `onTimeWindowUpdate` | Event emitted when the time window moves to the next time interval |

