## Widgets

{{% tableWrapper %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/react-widgets  | <a href="https://npmjs.org/package/@carto/react-widgets">  <img src="https://img.shields.io/npm/v/@carto/react-widgets.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-widgets">  <img src="https://img.shields.io/npm/dt/@carto/react-widgets.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a>
{{%/ tableWrapper %}}

A set of advanced widgets, which allow not only a visual representation but a rich interaction with data & map layers, such as filtering or an automatic data refresh on viewport change, thanks to the connection with the CARTO slice on redux.

This package, `@carto/react-widgets` contains the widgets business logic and the `@carto/react-ui` package contains the user interface components. The UI is decoupled from the business logic so you can provide your own user interface or modify the business logic. To review interactively the UI for the widgets, check the [Storybook catalogue](https://storybook-react.carto.com/).

### Components

#### BarWidget

Renders a `<BarWidget />` component, binded to a source at redux. From a data perspective, the BarWidget would present a behaviour equivalent to CategoryWidget (groups or 'categories' from a column, with an aggregated calculation), but with a different UI that uses vertical bars instead of horizontal bars.

- **Input**:
{{% tableWrapper tab="true" overflow-layout="true" %}}
| Param                   | Type                  | Default         | Description                                            |
| ----------------------- | --------------------- | --------------- | ------------------------------------------------------ |
| props                   | `Object`              |                 |                                                        |
| props.id                | `string`              |                 | ID for the widget instance.                            |
| props.title             | `string`              |                 | Title to show in the widget header.                    |
| props.dataSource        | `string`              |                 | ID of the data source to get the data from.            |
| props.column            | `string`              |                 | Name of the data source's column to get the data from. |
| props.operation         | `string`              |                 | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object. |
| [props.operationColumn] | `string | Array<string>` |              | (optional) Name of the data source's column to operate with. If not defined, same as `column`. If multiple columns are provided, they will be combined using the operation specified with the `joinOperation` property. _Note: support for multiple columns is only available beginning with v1.3_ |
| [props.joinOperation]   | `string`              |                 | Operation applied to aggregate multiple operation columns into a single one. Must be one of those defined in `AggregationTypes` object. _Note: this property is only available beginning with v1.3_ |
| [props.global]          | `bool`                | `false`         | (optional) Indicates whether the widget is using the global mode. |
| [props.animation]       | `bool`                | `true`          | (optional) Indicates whether the widget update is animated or jumps directly to the new state. |
| [props.formatter]       | `function` |                 | (optional) _formatterCallback_: Function to format each value returned. |
| [props.labels]          | `Object`   | `{}` | (optional) Overwrite category labels. |
| [props.filterable]      | `bool`                | `true`          | (optional) Indicates whether filtering capabilities are enabled or not. |
| [props.onError]         | `function`            |                 | (optional) _errorCallback_: Function to handle error messages from the widget. |
| [props.wrapperProps]    | `Object`              |                 | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |
| [props.noDataAlertProps] | `Object`  | `{ title: 'No data available', body: 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.' }` | (optional) Message (title and body) to show when there is no data available for the widget. |
| [props.droppingFeaturesAlertProps] | `Object`         | `{ body: 'Data for this widget is not available at this zoom level. Zoom in to get data from features in the map.' }` | (optional) Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
{{%/ tableWrapper %}}

- **Example**:

  In this example, the widget would display the SUM of population for all the countries, grouped by continent:

  ```js
  import { BarWidget } from "@carto/react-widgets";
  
  const customFormatter = (value) => `${value} people`;
  
  return (
    <BarWidget
      id="populationByContinent"
      title="Population by continent"
      dataSource="countriesSourceId"
      column="continent"
      operationColumn="population"
      operation={AggregationTypes.SUM}
      formatter={customFormatter}
      onError={console.error}
    />
  );
  
  // The operationColumn wouldn't be required if using AggregationTypes.COUNT, to count the number of countries per continent
  ```
  > Available beginning with v1.3

  You can also make calculations on widgets using multiple columns. For instance, if you are working with a dataset that contains population data disaggregated by gender: `population_m` and `population_f`, you can use an array in `operationColumn` and sum the values from both columns using the `joinOperation` property. 
  
  ```js
  import { BarWidget } from "@carto/react-widgets";
  
  const customFormatter = (value) => `${value} people`;
  
  return (
    <BarWidget
      id="populationByContinent"
      title="Population by continent"
      dataSource="countriesSourceId"
      column="continent"
      operationColumn={["population_m", "population_f"]}
      joinOperation={AggregationTypes.SUM}
      operation={AggregationTypes.SUM}
      formatter={customFormatter}
      onError={console.error}
    />
  );
  ```

#### CategoryWidget

Renders a `<CategoryWidget />` component, binded to a source at redux. 

- **Input**:
{{% tableWrapper tab="true" overflow-layout="true" %}}
| Param                   | Type                  | Default         | Description                                            |
| ----------------------- | --------------------- | --------------- | ------------------------------------------------------ |
| props                   | `Object`              |                 |                                                        |
| props.id                | `string`              |                 | ID for the widget instance.                            |
| props.title             | `string`              |                 | Title to show in the widget header.                    |
| props.dataSource        | `string`              |                 | ID of the data source to get the data from.            |
| props.column            | `string`              |                 | Name of the data source's column to get the data from. |
| props.operation         | `string`              |                 | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object. |
| [props.operationColumn] | `string | Array<string>` |              | (optional) Name of the data source's column to operate with. If not defined, same as `column`. If multiple columns are provided, they will be combined using the operation specified with the `joinOperation` property. _Note: support for multiple columns is only available beginning with v1.3_ |
| [props.joinOperation]   | `string`              |                 | Operation applied to aggregate multiple operation columns into a single one. Must be one of those defined in `AggregationTypes` object. _Note: this property is only available beginning with v1.3_ |
| [props.global]          | `bool`                | `false`         | (optional) Indicates whether the widget is using the global mode. |
| [props.animation]       | `bool`                | `true`          | (optional) Indicates whether the widget update is animated or jumps directly to the new state. |
| [props.formatter]       | `function`            |                 | (optional) _formatterCallback_: Function to format each value returned. |
| [props.labels]          | `Object`              | `{}` | (optional) Overwrite category labels. |
| [props.filterable]      | `bool`                | `true`          | (optional) Indicates whether filtering capabilities are enabled or not. |
| [props.searchable]      | `bool`                | `true`          | (optional) Indicates whether the functionality for searching in categories not displayed is available or not. |
| [props.onError]         | `function`            |                 | (optional) _errorCallback_: Function to handle error messages from the widget. |
| [props.wrapperProps]    | `Object`              |                 | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |
| [props.noDataAlertProps] | `Object`             | `{ title: 'No data available', body: 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.' }` | (optional) Message (title and body) to show when there is no data available for the widget. |
| [props.droppingFeaturesAlertProps] | `Object`   | `{ body: 'Data for this widget is not available at this zoom level. Zoom in to get data from features in the map.' }` | (optional) Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
{{%/ tableWrapper %}}

- **Example**:

  In this example, the widget would display the SUM of population for all the countries, grouped by continent:

  ```js
  import { CategoryWidget } from "@carto/react-widgets";
  
  const customFormatter = (value) => `${value} people`;
  
  return (
    <CategoryWidget
      id="populationByContinent"
      title="Population by continent"
      dataSource="countriesSourceId"
      column="continent"
      operationColumn="population"
      operation={AggregationTypes.SUM}
      formatter={customFormatter}
      onError={console.error}
    />
  );
  
  // The operationColumn wouldn't be required if using AggregationTypes.COUNT, to count the number of countries per continent
  ```
  > Available beginning with v1.3

  You can also make calculations on widgets using multiple columns. For instance, if you are working with a dataset that contains population data disaggregated by gender: `population_m` and `population_f`, you can use an array in `operationColumn` and sum the values from both columns using the `joinOperation` property. 
  
  ```js
  import { CategoryWidget } from "@carto/react-widgets";
  
  const customFormatter = (value) => `${value} people`;
  
  return (
    <CategoryWidget
      id="populationByContinent"
      title="Population by continent"
      dataSource="countriesSourceId"
      column="continent"
      operationColumn={["population_m", "population_f"]}
      joinOperation={AggregationTypes.SUM}
      operation={AggregationTypes.SUM}
      formatter={customFormatter}
      onError={console.error}
    />
  );
  ```

#### FeatureSelectionWidget

Renders a `<FeatureSelectionWidget />` component. The widget allows the user to draw a shape on the map and apply a filter to select the features within the shape. Once a shape has been drawn, it can be selected and modified by adding/removing vertices or translated to a new location. By default the mask is active but it can be disabled temporarily and re-enabled again.

There are different selection modes supporting different shapes. The mode selected by default is `FEATURE_SELECTION_MODES.POLYGON`. If you want to choose a different default selection mode, you can set the `featureSelectionMode` prop in the `initialStateSlice`.

If you want to use this widget in your app, you need to do two different things:

1. Add the `<FeatureSelectionWidget>` component to the view where you want to have it available. If you are using one of the CARTO for React templates and you want to use it in all of your views, you can add it to the `<MapContainer>` component.

2. Add the `FeatureSelectionLayer` to your layers list. If you are using one of the CARTO for React templates, you need to add it to the `src/components/layers/index.js` file like this:

   ```js
   import { FeatureSelectionLayer } from '@carto/react-widgets';

   export const getLayers = () => {
     return [
       ...,
       FeatureSelectionLayer(),
     ];
   }; 
   ```

- **Input**:

{{% tableWrapper tab="true" overflow-layout="true" %}}
| Param                | Type                | Default        | Description                                        |
| -------------------- | ------------------- | -------------- | -------------------------------------------------- |
| props                | `Object` |                |                                                    |
| [props.className]    | `string` |                | (optional) Material-UI withStyle class for styling |
| [props.selectionModes] | `Array<FEATURE_SELECTION_MODES>`  | `[FEATURE_SELECTION_MODES.CIRCLE, FEATURE_SELECTION_MODES.LASSO_TOOL, FEATURE_SELECTION_MODES.POLYGON, FEATURE_SELECTION_MODES.RECTANGLE]`   | Available selection modes.    |
| [props.editModes]    | `EDIT_MODES`        | `[EDIT_MODES.EDIT]` | Available edit modes.                         |  
| [props.tooltipPlacement] | `string`      | `'bottom'` | Tooltip placement. Allowed values available [here](https://mui.com/api/tooltip/) |
{{%/ tableWrapper %}}

The `FeatureSelectionLayer` accepts the following optional props:

{{% tableWrapper tab="true" overflow-layout="true" %}}
| Param                | Type                | Default        | Description                                        |
| -------------------- | ------------------- | -------------- | -------------------------------------------------- |
| props                | `Object` |                |                                                    |
| [props.eventManager] | `EventManager` |  nebula.gl event manager | (optional) This prop allows using a different event manager instead of the one provided by nebula.gl. It is used for integration with other mapping libraries like Google Maps JavaScript API. |
| [props.mask]         | `bool`   | `true`         | Indicates whether to apply a mask or not to hide the features outside the shape drawn by the user.  |
{{%/ tableWrapper %}}

- **Example**:

  In this example, we add a `FeatureSelectionWidget` supporting just two selection modes using a specific CSS class.

  ```js
  import { FeatureSelectionWidget } from "@carto/react-widgets";
  import { FEATURE_SELECTION_MODES } from '@carto/react-core';
  
  return (
    <FeatureSelectionWidget 
      className={myCSSClassName} 
      selectionModes={[FEATURE_SELECTION_MODES.POLYGON, FEATURE_SELECTION_MODES.RECTANGLE]}
    />
  );
  ```

#### FormulaWidget

Renders a `<FormulaWidget />` component, binded to a source at redux.

- **Input**:

{{% tableWrapper tab="true" overflow-layout="true" %}}
| Param                | Type                  | Default           | Description                                           |
| -------------------- | --------------------- | ----------------- | ----------------------------------------------------- |
| props                | `Object`              |                   |                                                       |
| props.id             | `string`              |                   | ID for the widget instance.                           |
| props.title          | `string`              |                   | Title to show in the widget header.                   |
| props.dataSource     | `string`              |                   | ID of the data source to get the data from.           |
| props.column         | `string | Array<string>` |                | Name of the data source's column to operate with. If multiple columns are provided, they will be combined using the operation specified with the `joinOperation` property. _Note: support for multiple columns is only available beginning with v1.3_ |
| [props.joinOperation] | `string`             |                   | Operation applied to aggregate multiple columns into a single one. Must be one of those defined in `AggregationTypes` object. _Note: this property is only available beginning with v1.3_ |
| props.operation      | `string`              |                   | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.                               |
| [props.global]       | `bool`                | `false`           | (optional) Indicates whether the widget is using the global mode. |
| [props.animation]    | `bool`                | `true`            | Indicates whether the widget update is animated or jumps directly to the new state |
| [props.formatter]    | `function`            |                   | (optional) _formatterCallback_: Function to format each value returned.    |
| [props.onError]      | `errorCallback`       |                   | (optional) _errorCallback_: Function to handle error messages from the widget.                                                      |
| [props.wrapperProps] | `Object`              |                   | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |
| [props.noDataAlertProps] | `Object`  | `{ title: 'No data available', body: 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.' }` | (optional) Message (title and body) to show when there is no data available for the widget. |
| [props.droppingFeaturesAlertProps] | `Object` | `{ body: 'Data for this widget is not available at this zoom level. Zoom in to get data from features in the map.' }` | (optional) Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
{{%/ tableWrapper %}}

- **Example**:

  In this example, the widget would display the AVG sales for all the stores on screen:

  ```js
  import { FormulaWidget } from "@carto/react-widgets";
  
  const customFormatter = (value) => `${value} $`;
  
  return (
    <FormulaWidget
      id="averageRevenue"
      title="Average revenue"
      dataSource="storesSourceId"
      column="revenue"
      operation={AggregationTypes.AVG}
      formatter={customFormatter}
      onError={console.error}
    />
  );
  ```
  > Available beginning with v1.3
  
  You can also make calculations on widgets using multiple columns. For instance, if you are working with a dataset that contains revenue data disaggregated by year: `revenue_2021` and `revenue_2022`, you can use an array in `column` and sum the values from both columns using the `joinOperation` property. 
  
  ```js
  import { FormulaWidget } from "@carto/react-widgets";
  
  const customFormatter = (value) => `${value} $`;
  
  return (
    <FormulaWidget
      id="averageRevenue"
      title="Average revenue"
      dataSource="storesSourceId"
      column={["revenue_2021", "revenue_2022"]}
      joinOperation={AggregationTypes.SUM}
      operation={AggregationTypes.AVG}
      formatter={customFormatter}
      onError={console.error}
    />
  );
  ```

#### GeocoderWidget

Renders a `<GeocoderWidget />` component

- **Input**:

{{% tableWrapper tab="true" %}}
| Param             | Type                  | Description                                                                    |
| ----------------- | --------------------- | ------------------------------------------------------------------------------ |
| props             |                       |                                                                                |
| props.id          | `string`   | ID for the widget instance.                                                    |
| [props.className] | `Object`   | (optional) Material-UI with CSS class for styling                              |
| [props.onError]   | `function` | (optional) _errorCallback_: Function to handle error messages from the widget. |
{{%/ tableWrapper %}}

- **Example**:

  In this example, the widget is using the `geocoder` CSS custom style class and also defines a custom error handler:

  ```js
  import { GeocoderWidget } from "@carto/react-widgets";
  
  const useStyles = makeStyles((theme) => ({
    geocoder: {
      position: 'absolute',
      top: theme.spacing(4),
      left: theme.spacing(4),
      zIndex: 1,
    }
  }));

  const onGeocoderWidgetError = (error) => {
    dispatch(setError(`Geocoding error: ${error.message}`));
  };

  return (
    <GeocoderWidget className={classes.geocoder} onError={onGeocoderWidgetError} />
  );
  ```
  
#### HistogramWidget

Renders a `<HistogramWidget />` component, binded to a source at redux. 

- **Input**:

{{% tableWrapper tab="true" overflow-layout="true" %}}
| Param                  | Type               | Default     | Description                                        |
| ---------------------- | ------------------ | ----------- | -------------------------------------------------- |
| props                  | `Object`           |             |                                                    |
| props.id               | `string`           |             | ID for the widget instance.                        |
| props.title            | `string`           |             | Title to show in the widget header.                |
| props.dataSource       | `string`           |             | ID of the data source to get the data from.        |
| props.column           | `string`           |             | Name of the data source's column to get the data from. |
| props.operation        | `string`           |             | Operation to apply to the column. Must be one of those defined in `AggregationTypes` object. |
| [props.min]            | `number`           |             | (optional) Set this property to use this value as the minimum value instead of calculating it from the dataset. |
| [props.max]            | `number`           |             | (optional) Set this property to use this value as the maximum value instead of calculating it from the dataset.  |
| [props.bins]           | `number`           |             | (optional) Number of bins to use. Incompatible with the `ticks` prop. |
| [props.ticks]          | `Array<number>`    |             | (optional) Array of numbers to build intervals (eg 1, 5, 10 will define 4 intervals: <1, [1,5), [5-10) and >= 10). Incompatible with the `bins` property, but you need to set one of them. |
| [props.global]         | `bool`             | `false`     | (optional) Indicates whether the widget is using the global mode. |
| [props.animation]      | `bool`             | `true`      | (optional) Indicates whether the widget update is animated or jumps directly to the new state |
| [props.filterable]     | `bool`             | `true`      | (optional) Indicates whether filtering capabilities are enabled or not. |
| [props.xAxisFormatter] | `function`         |             | (optional) _formatterCallback_: Function to format X axis values. |
| [props.formatter]      | `function`         |             | (optional) _formatterCallback_: Function to format tooltip and Y axis values. |
| [props.onError]        | `function`         |             | (optional) _errorCallback_: Function to handle error messages from the widget. | 
| [props.wrapperProps]   | `Object`           |             | Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |
| [props.noDataAlertProps] | `Object`         | `{ title: 'No data available', body: 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.' }` | (optional) Message (title and body) to show when there is no data available for the widget. |
| [props.droppingFeaturesAlertProps] | `Object` | `{ body: 'Data for this widget is not available at this zoom level. Zoom in to get data from features in the map.' }` | (optional) Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
{{%/ tableWrapper %}}

- **Example**:

  In this example, the widget would display the number of stores in different ranks, based on their number of sales.

  ```js
  import { HistogramWidget } from "@carto/react-widgets";
  
  const customFormatter = (value) => `${value} $`;
  
  return (
    <HistogramWidget
      id="storesByNumberOfSales"
      title="Stores by number of sales"
      dataSource="storesSourceId"
      operation={AggregationTypes.COUNT}
      column="salesNumber"
      ticks={[10, 100, 500, 1000]}
      onError={console.error}
    />
  );
  // bins for the histogram would be <10, 10 to 100, 100 to 500, 500 to 1000 and > 1000
  ```

#### LegendWidget

Renders a `<LegendWidget />` component. The widget can display a switch to show or hide a layer and a legend for the layer. The legend representation depends on the legend type. You can check the available `LEGEND_TYPES` [here](../ui/#legend_types). The widget accesses the layer information from the store and add the legend for those layers where it has been specified.

- **Input**:

{{% tableWrapper tab="true" %}}
| Param                     | Type                | Default       | Description                                         |
| ------------------------- | ------------------- | ------------- | --------------------------------------------------- |
| props                     | `Object`            |               |                                                     |
| [props.className]         | `string`            |               | (optional) Material-UI withStyle class for styling. |
| [props.customLegendTypes] | `Object.<string, function>` |       | (optional) Object with custom legend types and the components to be used with these types. |
| [props.initialCollapsed]  | `bool`              | `false`       | (optional) Indicates whether the widget is initially collapsed or not. |
| [props.layerOrder]        | `Array<string>`     | `[]`          | Array of layer identifiers. Defines the order of layers in the legend. |
{{%/ tableWrapper %}}

You can control the legend options through the following properties that must be added to the `layerAttributes` property for the layer in the store:

{{% tableWrapper tab="true" %}}
| Param         | Type           | Default       | Description                                                    |
| ------------- | -------------- | ------------- | -------------------------------------------------------------- |
| title         | `string`       |               | Layer title                                                    |
| visible       | `boolean`      | `true`        | Indicates whether the layer is visible by default or not.      |
| opacity       | `Number`       | `1`           | Initial opacity for the layer.                                 |
| showOpacityControl | `boolean` | `true`        | Indicates whether the opacity control is shown or not.         |
| switchable    | `boolean`      | `true`        | Indicates whether the layer can be hide/shown                  |
| legend        | `Object`       |               | Legend properties. Define an empty object `legend: {}` if you just want layer switching capabilities. |
| legend.type   | `string`       |               | Legend type. Must be one of the types defined in the LEGEND_TYPES enum |
| legend.attr   | `string`       |               | Attribute used for styling the layer                           |
| legend.colors | `Array` or `string` |          | Array of colors (RGB arrays) or CARTO colors palette (string). Used for `LEGEND_TYPES.CATEGORY`, `LEGEND_TYPES.BINS` and `LEGEND_TYPES.CONTINUOUS_RAMP`                                   |
| legend.labels | `Array`        |               | - Array of `strings` for labels when using `LEGEND_TYPES.CATEGORY` and `LEGEND_TYPES.ICON`. |
|               |                |               | - Array of `numbers` for `LEGEND_TYPES.BINS` and `LEGEND_TYPES.CONTINUOUS_RAMP`. Since v1.3, it also accepts an array of `{ value: number; label: string }` to format the values. The first and last elements will be used for the labels and the intermediate elements will be used for defining the bins/intervals (for bins ramps) or the colors that we are interpolating (for continuous ramps).      |
|               |                |               | - Array of `[min, max]` numbers for `LEGEND_TYPES.PROPORTION`. |
| legend.icons  | `Array`        |               | Array of string with icons URLs. Used for `LEGEND_TYPES.ICON`. |
| legend.note   | `string`       |               | Note to show below th  legend to add additional explanations.  |
| legend.collapsed | `boolean`   | `false`       | Indicates whether the legend component is collapsed or not.    |
| legend.collapsible | `boolean` | `true`        | Indicates whether the legend component is collapsible or not.  |
{{%/ tableWrapper %}}


- **Example**:

  If you want to show a legend for a layer, you need to do the following:
  
  1. Define some layer attributes (`layerConfig`) before you instantiate the layer. Here we are going to create a `LEGEND_TYPES.BINS` type legend where we are assigning colors and labels to the different legend elements. We use the same colors in the CARTO for deck.gl `colorBins` helper when creating the layer. 
  
  2. When data is loaded for the layer, we add the legend information from the `layerConfig` object to the layer attributes in the Redux store by dispatching the `updateLayer` action. It is important that we call the original `onDataLoad` handler defined in the `useCartoLayerProps` hook for the other widgets in the app to work.
  
  ```js
  import { LEGEND_TYPES } from "@carto/react-ui";
  import { updateLayer } from "@carto/react-redux";
  import { CartoLayer, colorBins } from "@deck.gl/carto";
  
  export const COLORS = [
    [247, 254, 174],
    [183, 230, 165],
    [124, 203, 162],
    [70, 174, 160],
    [4, 82, 117],
  ];
  
  export const LABELS = [
    '$100M',
    '$500M',
    '$1B',
    '$1.5B',
  ];
  
  const layerConfig = {
    title: 'Layer Name',
    visible: true,
    showOpacityControl: true,
    opacity: 0.6,
    legend: {
      attr: 'revenue',
      type: LEGEND_TYPES.BINS,
      labels: LABELS,
      colors: COLORS,
    },
  };
  
  const { myLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, myLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source, layerConfig: myLayer });

  if (myLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      getFillColor: colorBins({
        attr: layerConfig.legend.attr,
        domain: [100e6, 500e6, 1e9, 1.5e9],
        colors: COLORS,
      }),
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: MY_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        cartoLayerProps.onDataLoad && cartoLayerProps.onDataLoad(data);
      }
    });
  }
  ```

  Now you can add the `LegendWidget` component. If you are using the CARTO for React templates, you can add it to the `MapContainer` component so it is shown for all views or add it to a particular view to show it in the sidebar just for that view. In this example, the widget uses a custom CSS class.

  ```js
  import { LegendWidget } from "@carto/react-widgets";
  
  return (
    <LegendWidget className={myCSSClassName} />
  );
  ```

   {{% bannerNote title="tip" %}}
   If you just want layer switching functionality for a layer (show/hide) but you don't want to add a legend, you can just create an empty object for the legend:

   ```js
   const layerConfig = {
     title: 'Layer Name',
     visible: true,
     legend: {},
   };
   ```
   {{%/ bannerNote %}}

#### PieWidget

Renders a `<PieWidget />` component, binded to a source at redux. From a data perspective, PieWidget would present a behaviour equivalent to CategoryWidget (groups or 'categories' from a column, with an aggregated calculation), but with a different UI.

- **Input**:

{{% tableWrapper tab="true" overflow-layout="true" %}}
| Param                    | Type                     | Default            | Description                              |
| ------------------------ | ------------------------ | ------------------ | ---------------------------------------- |
| props                    | `Object`                 |                    |                                          |
| props.id                 | `string`                 |                    | ID for the widget instance.              |
| props.title              | `string`                 |                    | Title to show in the widget header.      |
| props.dataSource         | `string`                 |                    | ID of the data source to get the data from. |
| props.column             | `string`                 |                    | Name of the data source's column to get the data from. |
| props.operation          | `string`                 |                    | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object. |
| [props.height]           | `string`                 | `300px`            | (optional) Height of the chart in CSS format. |
| [props.operationColumn]  | `string | Array<string>` |                    | (optional) Name of the data source's column to operate with. If not defined, same as `column`. If multiple columns are provided, they will be combined using the operation specified with the `joinOperation` property. _Note: support for multiple columns is only available beginning with v1.3_ |
| [props.joinOperation]    | `string`                 |                    | Operation applied to aggregate multiple operation columns into a single one. Must be one of those defined in `AggregationTypes` object. _Note: this property is only available beginning with v1.3_ |
| [props.colors]           | `Array<string>`          | CARTO colors bold palette | (optional) Array of colors to show for each category. |
| [props.labels]           | `Array<string>`          | Column values      | (optional) Labels to show for each category |
| [props.global]           | `bool`                   | `false`            | (optional) Indicates whether the widget is using the global mode. |
| [props.animation]        | `bool`                   | `true`             | (optional) Indicates whether the widget update is animated or jumps directly to the new state |
| [props.filterable]       | `bool`                   | `true`             | (optional) Indicates whether filtering capabilities are enabled or not. |
| [props.formatter]        | `function`               |                    | (optional) _formatterCallback_: Function to format each value returned. |
| [props.tooltipFormatter] | `formatterCallback`      |                    | (optional) _formatterCallback_: Function to format the tooltip values. |
| [props.onError]          | `errorCallback`          |                    | (optional) _errorCallback_: Function to handle error messages from the widget. |
| [props.wrapperProps]     | `Object`                 |                    | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |
| [props.noDataAlertProps] | `Object`                 | `{ title: 'No data available', body: 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.' }` | (optional) Message (title and body) to show when there is no data available for the widget. |
| [props.droppingFeaturesAlertProps] | `Object`       | `{ body: 'Data for this widget is not available at this zoom level. Zoom in to get data from features in the map.' }` | (optional) Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
{{%/ tableWrapper %}}

- **Example**:

  In this example, the widget would display a pie chart by continent with the SUM of population for all the countries in that continent:

  ```js
  import { PieWidget } from "@carto/react-widgets";
  
  return (
    <PieWidget
      id="populationByContinent"
      title="Population by continent"
      dataSource="countriesSourceId"
      column="continent"
      operationColumn="population"
      operation={AggregationTypes.SUM}
    />
  );
  
  // The operationColumn wouldn't be required if using AggregationTypes.COUNT, to count the number of countries per continent
  ```
  
  > Available beginning with v1.3

  You can also make calculations on widgets using multiple columns. For instance, if you are working with a dataset that contains population data disaggregated by gender: `population_m` and `population_f`, you can use an array in `operationColumn` and sum the values from both columns using the `joinOperation` property. 
  
  ```js
  import { PieWidget } from "@carto/react-widgets";
  
  return (
    <PieWidget
      id="populationByContinent"
      title="Population by continent"
      dataSource="countriesSourceId"
      column="continent"
      operationColumn={["population_m", "population_f"]}
      joinOperation={AggregationTypes.SUM}
      operation={AggregationTypes.SUM}
    />
  );
  ```

#### ScatterPlotWidget

Renders a `<ScatterPlotWidget />` component, binded to a source at redux. The widget displays the calculations considering just the viewport features. From a data perspective, the ScatterPlotWidget represents two properties/columns in a cartesian chart from a data source to help understand if there is correlation between them.

- **Input**:

{{% tableWrapper tab="true" overflow-layout="true" %}}
| Param                      | Type          | Default          | Description                                               |
| -------------------------- | ------------- | ---------------- | --------------------------------------------------------- |
| props                      | `Object`      |                  |                                                           |
| props.id                   | `string`      |                  | ID for the widget instance.                               |
| props.title                | `string`      |                  | Title to show in the widget header.                       |
| props.dataSource           | `string`      |                  | ID of the data source to get the data from.               |
| props.xAxisColumn          | `string | Array<string>` |       | Name of the data source's column to get the data for the X axis from. If multiple columns are provided, they will be combined using the operation specified with the `xAxisJoinOperation` property. _Note: support for multiple columns is only available beginning with v1.3_ |
| [props.xAxisJoinOperation] | `string`      |                  | Operation applied to aggregate multiple xAxis columns into a single one. Must be one of those defined in `AggregationTypes` object. _Note: this property is only available beginning with v1.3_ |
| props.yAxisColumn          | `string | Array<string>` |       | Name of the data source's column to get the data for the Y axis from. If multiple columns are provided, they will be combined using the operation specified with the `yAxisJoinOperation` property. _Note: support for multiple columns is only available beginning with v1.3_ |
| [props.yAxisJoinOperation] | `string`      |                  | Operation applied to aggregate multiple yAxis columns into a single one. Must be one of those defined in `AggregationTypes` object. _Note: this property is only available beginning with v1.3_ |
| [props.animation]          | `bool`        | `true`           | Indicates whether the widget update is animated or jumps directly to the new state |
| [props.xAxisFormatter]     | `function`    |                  | (optional) _formatterCallback_: Function to format X axis values.  |
| [props.yAxisFormatter]     | `function`    |                  | (optional) _formatterCallback_: Function to format X axis values. |
| [props.tooltipFormatter]   | `formatterCallback` |            | (optional) _formatterCallback_: Function to format the tooltip values. |
| [props.onError]            | `errorCallback` |                | (optional) _errorCallback_: Function to handle error messages from the widget. |
| [props.wrapperProps]       | `Object`      |                  | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |
| [props.noDataAlertProps]   | `Object`      | `{ title: 'No data available', body: 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.' }` | (optional) Message (title and body) to show when there is no data available for the widget. |
| [props.droppingFeaturesAlertProps] | `Object` | `{ body: 'Data for this widget is not available at this zoom level. Zoom in to get data from features in the map.' }` | (optional) Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
{{%/ tableWrapper %}}

- **Example**:

  In this example, the widget would display the values from the size and revenue columns.

  ```js
  import { ScatterPlotWidget } from "@carto/react-widgets";
  
  return (
    <ScatterPlotWidget
      id="sizeRevenueCorrelation"
      title="Size / Revenue"
      dataSource="storesSourceId"
      xAxisColumn="size"
      yAxisColumn="revenue"
    />
  );
  ```

#### TableWidget

Renders a `<TableWidget />` component, binded to a source at redux. The widget allows to configure the source columns that will be displayed. It includes functionality for data pagination and ordering by column.

- **Input**:

{{% tableWrapper tab="true" %}}
| Param                    | Type                | Default            | Description                                      |
| ------------------------ | ------------------- | ------------------ | ------------------------------------------------ |
| props                    | `Object`            |                    |                                                  |
| props.id                 | `string`            |                    | ID for the widget instance.                      |
| props.title              | `string`            |                    | Title to show in the widget header.              |
| props.dataSource         | `string`            |                    | ID of the data source to get the data from.      |
| [props.columns]          | `Array<object>`     | All columns        | (optional) List of source columns to display. The object allows to configure horizontal alignment and the label to display for each column. See example below. |
| [props.height]           | `string`            | Takes available height in the container. | (optional) Height of the table in CSS format.  |
| [props.dense]            | `bool`              | `false`            | (optional) Indicates whether to use a denser layout or not. |
| [props.initialPageSize]  | `number`            | `10`               | (optional) Initial number of rows per page.  |
| [props.pageSize]         | `number`            |                    | Used to set the page size. |
| [props.onError]          | `errorCallback`     |                    | (optional) _errorCallback_: Function to handle error messages from the widget. |
| [props.wrapperProps]     | `Object`            |                    | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |
| [props.noDataAlertProps] | `Object` | `{ title: 'No data available', body: 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.' }` | (optional) Message (title and body) to show when there is no data available for the widget. |
| [props.droppingFeaturesAlertProps] | `Object`  | `{ body: 'Data for this widget is not available at this zoom level. Zoom in to get data from features in the map.' }` | (optional) Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
{{%/ tableWrapper %}}

- **Example**:

  In this example, the widget would display a table with three columns for each store. All the columns are renamed and aligned to the left. The initial page size is set to 5 rows.

  ```js
  import { TableWidget } from "@carto/react-widgets";

  return (
    <TableWidget
      id='storesTable'
      title='Stores list'
      dataSource={storesSource.id}
      initialPageSize={5}
      columns={[
        { field: 'revenue', headerName: 'Revenue', align: 'left' },
        { field: 'size_m2', headerName: 'Size (m2)', align: 'left' },
        { field: 'storetype', headerName: 'Type', align: 'left' },
      ]}
    />
  );

  ```

#### TimeSeriesWidget

Renders a `<TimeSeriesWidget />` component, binded to a source at redux. From a data perspective, the TimeSeriesWidget groups the features in time intervals and allows to play an animation that filters the features displayed based on the current interval.

- **Input**:

{{% tableWrapper tab="true" overflow-layout="true" %}}
| Param                   | Type              | Default         | Description                                              |
| ----------------------- | ----------------- | --------------- | -------------------------------------------------------- |
| props                   | `Object`          |                 |                                                          |
| props.id                | `string`          |                 | ID for the widget instance.                              |
| props.title             | `string`          |                 | Title to show in the widget header.                      |
| props.dataSource        | `string`          |                 | ID of the data source to get the data from.              |
| props.column            | `string`          |                 | Name of the data source's column with the timestamp/date values |
| props.stepSize          | `GroupDateTypes`  |                 | Time interval size. Available groupings are: GroupDateTypes.YEARS, GroupDateTypes.MONTHS, GroupDateTypes.WEEKS, GroupDateTypes.DAYS, GroupDateTypes.HOURS, GroupDateTypes.MINUTES.  |
| [props.operation]       | `string`          | AggregationTypes.COUNT | (optional) Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object. |
| [props.operationColumn] | `string | Array<string>` |          | (optional) Name of the data source's column to operate with. If not defined, same as `column`. If multiple columns are provided, they will be combined using the operation specified with the `joinOperation` property. _Note: support for multiple columns is only available beginning with v1.3_ |
| [props.joinOperation]   | `string`          |                 | Operation applied to aggregate multiple operation columns into a single one. Must be one of those defined in `AggregationTypes` object. _Note: this property is only available beginning with v1.3_ |
| [props.global]          | `bool`            | `false`         | (optional) Indicates whether the widget is using the global mode. |
| [props.animation]       | `bool`            | `true`          | Indicates whether the widget update is animated or jumps directly to the new state. This does not apply to the animation when the widget is in play mode. Applies only when the data visualized in the chart changes (i.e. when we select a different step size). |
| [props.formatter]       | `function`        |                 | (optional) _formatterCallback_: Function to format each value returned.  |
| [props.height]          | `string`          | '300px'         | (optional) Chart height (CSS) |
| [props.tooltipFormatter] | `formatterCallback` |              | (optional) _formatterCallback_: Function to format the tooltip values. |
| [props.stepSizeOptions] | `Array<GroupDateTypes>` | `[]`      | (optional) Available time interval sizes |
| [props.chartType]       | `enum`            | `TIME_SERIES_CHART_TYPES.LINE` | (optional) Selected chart type (line or bar) |
| [props.tooltip]         | `boolean`         | `true`          | (optional) Whether to show or not the tooltip |
| [props.timeWindow]      | `Array<number|string>` | `[]`       | (optional) Interval for the currently selected time window (timestamps or dates formatted as strings) |
| [props.showControls]    | `boolean`         | `true`          | (optional) Whether to show or not the controls (play, pause, stop, speed selection...) |
| [props.isPlaying]       | `boolean`         | `false`         | (optional) Whether to set the widget to play mode |
| [props.isPaused]        | `boolean`         | `false`         | (optional) Whether to set the widget to pause mode |
| [props.onPlay]          | `functionCallback` |                | (optional) Handler to receive the event emitted when the animation starts to play |
| [props.onPause]         | `functionCallback` |                | (optional) Handler to receive the event emitted when the animation is paused |
| [props.onStop]          | `functionCallback` |                | (optional) Handler to receive the event emitted when the animation is stopped |
| [props.onTimelineUpdate] | `functionCallback` |               | (optional) Handler to receive the event emitted when the animation moves to the next time interval |
| [props.onTimeWindowUpdate] | `functionCallback` |             | (optional) Handler to receive the event emitted when the time window moves to the next time interval |
| [props.onError]         | `errorCallback`   |                 | (optional) _errorCallback_: Function to handle error messages from the widget. |
| [props.wrapperProps]    | `Object`          |                 | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |
| [props.noDataAlertProps] | `Object`         | `{ title: 'No data available', body: 'There are no results for the combination of filters applied to your data. Try tweaking your filters, or zoom and pan the map to adjust the Map View.' }` | (optional) Message (title and body) to show when there is no data available for the widget. |
| [props.droppingFeaturesAlertProps] | `Object` | `{ body: 'Data for this widget is not available at this zoom level. Zoom in to get data from features in the map.' }` | (optional) Extra props to pass to the `NoDataAlert` component when features have been dropped in the data source |
{{%/ tableWrapper %}}

- **Example**:

  In this example, the widget will display the count of features in each time interval defined by the `event_date` column.

  ```js
  import { TimeSeriesWidget } from "@carto/react-widgets";
  import { GroupDateTypes } from "@carto/react-core";
  
  return (
    <TimeSeriesWidget
      id="events"
      title="Events per day"
      dataSource="eventsSourceId"
      column="event_date"
      stepSize={GroupDateTypes.DAYS}
    />
  );
  ```
