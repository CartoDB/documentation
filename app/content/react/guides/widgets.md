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

| Property                     | Description          |
| ---------------------------- | -------------------- |
| `id`                         | ID for the widget instance |
| `title`                      | Title to show in the widget header |
| `dataSource`                 | ID of the data source to get the data from |
| `global`                     | Indicates whether the widget is using the global mode |
| `animation`                  | Indicates whether the widget update is animated or jumps directly to the new state |
| `wrapperProps`               | Props to pass to the WrapperWidgetUI |
| `noDataAlertProps`           | Message (title and body) to show when there is no data available for the widget |
| `droppingFeaturesAlertProps` | Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
| `onError`                    | Event emitted when an error is thrown while the widget is doing calculations |

### Usage recommendations for data-driven widgets

Every data-driven widget provides different functionality so you should consider carefully which widget you want to use depending on the goals you have:

- If you just want to show the number of features in the current viewport/dataset or you want to make a simple aggregation on a numeric column like calculating the sum or the average, you can use the `FormulaWidget`.
  
- If you are dealing with data that you need to group by category (string values) like store types before making a calculation, you should use a widget that supports columns with categorical values (`BarWidget`, `CategoryWidget`, `PieWidget`).

- If you are interested in understanding the distribution of numeric column values like store revenues, you should use the `HistogramWidget`.

- If you have a column with timestamp values in your dataset and you want to understand trends or evolution through time, you can use the `TimeSeriesWidget`.

- If you want to understand the correlation between two numeric columns of the same dataset, you should use the `ScatterPlotWidget`.

- If you want to display the data in a tabular view and be able to order it by column values, you can use the `TableWidget`.

A particular use case that often arises when dealing with socio-demographics data is how to analyze data by age (i.e. population, employment status...). If we are just interested in the distribution, we should use the `HistogramWidget`, but if we want to define our own ranges/groups, what we are doing is to create categories (those ranges), so we should use a widget that supports categorical data. The main difference is that bars in a `HistogramWidget` cannot be re-ordered, the X axis has numerical values so you need to keep the order; but with widgets supporting categorical data, it might make sense to reorder to show first the category with more elements or to order alphabetically the categorical values.

### Bar widget

Groups features into categories (column) and executes an operation on another column (`operationColumn`) for each group. The categories are then visualized using vertical bars.

![Bar Widget](/img/react/bar-widget.png)

### Category widget

Groups features into categories (column) and executes an operation on another column (`operationColumn`) for each group. The categories are then visualized using horizontal bars. Displays 5 categories at the same time.

![Category Widget](/img/react/category-widget.png)

### Geocoder widget 

Provides geocoding functionality through a search bar, requiring credentials/token with access to geocoding services.

![Geocoder Widget](/img/react/geocoder-widget.png)

When the results are returned, the widget performs an automatic zoom to the best result (no autocomplete) and adds a marker.

### Feature Selection widget 

Provides functionality to filter spatially the features by drawing a shape on the map.

![Feature Selection Widget](/img/react/feature-selection-widget.png)

### Formula widget

Calculates a value executing an aggregation operation on a data source column. 

![Formula Widget](/img/react/formula-widget.png)

### Histogram widget

Groups features into buckets after executing an aggregation operation on a column.

![Histogram Widget](/img/react/histogram-widget.png)

### Legend widget

Creates a widget for switching layers on/off and showing legends. The legend representation depends on the legend type. The widget access the layer information from the store and add the legend for those layers where it has been specified.

![Legend Widget](/img/react/legend-widget.png)

### Pie widget

Groups features into categories (column) and executes an operation on another column (`operationColumn`) for each group.

![Pie Widget](/img/react/pie-widget.png)

### ScatterPlot widget

Represents two properties/columns in a cartesian chart from a data source to help understand if there is correlation between them.

![ScatterPlot Widget](/img/react/scatterplot-widget.png)

### Table widget

Displays the column values for the current features visualized in the map in a tabular way. 

![Table Widget](/img/react/table-widget.png)

### TimeSeries widget

Groups features into time intervals and allows to play an animation that filters the features displayed based on the current interval. 

![TimeSeries Widget](/img/react/time-series-widget.png)
