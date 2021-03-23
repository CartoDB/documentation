## Widgets

| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/react-widgets  | <a href="https://npmjs.org/package/@carto/react-widgets">  <img src="https://img.shields.io/npm/v/@carto/react-widgets.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-widgets">  <img src="https://img.shields.io/npm/dt/@carto/react-widgets.svg?style=flat-square" alt="downloads" /></a>

A set of advanced widgets, which allow not only a visual representation but a rich interaction with data & map layers, such as filtering or an automatic data refresh on viewport change, thanks to the connection with the CARTO slice on redux.

**Tip:** To review interactively the widgets, check the [Storybook catalogue](https://storybook-react.carto.com/)

### Components
#### CategoryWidget

Renders a `<CategoryWidget />` component, binded to a source at redux. The widget displays the calculations considering just the viewport features.

- **Input**:

  | Param                   | Type                  | Default         | Description                                                                                                                         |
  | ----------------------- | --------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
  | props                   |                       |                 |                                                                                                                                     |
  | props.id                | <code>string</code>   |                 | ID for the widget instance.                                                                                                         |
  | props.title             | <code>string</code>   |                 | Title to show in the widget header.                                                                                                 |
  | props.dataSource        | <code>string</code>   |                 | ID of the data source to get the data from.                                                                                         |
  | props.column            | <code>string</code>   |                 | Name of the data source's column to get the data from.                                                                              |
  | props.operation         | <code>string</code>   |                 | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.                               |
  | [props.operationColumn] | <code>string</code>   |                 | (optional) Name of the data source's column to operate with. If not defined, same as `column`.                                      |
  | [props.formatter]       | <code>function</code> |                 | (optional) _formatterCallback_: Function to format each value returned.                                                             |
  | [props.labels]          | <code>Object</code>   | <code>{}</code> | (optional) Overwrite category labels.                                                                                                          |
  | [props.onError]         | <code>function</code> |                 | (optional) _errorCallback_: Function to handle error messages from the widget.                                                      |
  | [props.wrapperProps]    | <code>Object</code>   |                 | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |

- **Example**:

  In this example, the widget would display the SUM of population for all the countries, grouped by continent

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

#### FormulaWidget

Renders a `<FormulaWidget />` component, binded to a source at redux. The widget displays the calculations considering just the viewport features.

- **Input**:

  | Param                | Type                       | Default | Description                                                                                                                         |
  | -------------------- | -------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
  | props                |                            |         |                                                                                                                                     |
  | props.id             | <code>string</code>        |         | ID for the widget instance.                                                                                                         |
  | props.title          | <code>string</code>        |         | Title to show in the widget header.                                                                                                 |
  | props.dataSource     | <code>string</code>        |         | ID of the data source to get the data from.                                                                                         |
  | props.column         | <code>string</code>        |         | Name of the data source's column to get the data from.                                                                              |
  | props.operation      | <code>string</code>        |         | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.                               |
  | [props.formatter]    | <code>function</code>      |         | (optional) _formatterCallback_: Function to format each value returned.                                                             |
  | [props.onError]      | <code>errorCallback</code> |         | (optional) _errorCallback_: Function to handle error messages from the widget.                                                      |
  | [props.wrapperProps] | <code>Object</code>        |         | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |

- **Example**:

  In this example, the widget would display the AVG sales for all the stores on screen

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

#### GeocoderWidget

Renders a `<GeocoderWidget />` component

- **Input**:

  | Param             | Type                  | Description                                                                    |
  | ----------------- | --------------------- | ------------------------------------------------------------------------------ |
  | props             |                       |                                                                                |
  | props.id          | <code>string</code>   | ID for the widget instance.                                                    |
  | [props.className] | <code>Object</code>   | (optional) Material-UI withStyle class for styling                             |
  | [props.onError]   | <code>function</code> | (optional) _errorCallback_: Function to handle error messages from the widget. |

#### HistogramWidget

Renders a `<HistogramWidget />` component, binded to a source at redux. The widget displays the calculations considering just the viewport features.

- **Input**:

  | Param                  | Type                              | Default | Description                                                                                                              |
  | ---------------------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
  | props                  |                                   |         |                                                                                                                          |
  | props.id               | <code>string</code>               |         | ID for the widget instance.                                                                                              |
  | props.title            | <code>string</code>               |         | Title to show in the widget header.                                                                                      |
  | props.dataSource       | <code>string</code>               |         | ID of the data source to get the data from.                                                                              |
  | props.column           | <code>string</code>               |         | Name of the data source's column to get the data from.                                                                   |
  | props.operation        | <code>string</code>               |         | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.                    |
  | props.ticks            | <code>Array.&lt;number&gt;</code> |         | Array of numbers to build intervals (eg 1, 5, 10 will define 4 intervals: <1, 1 to 5, 5 to 10 and >10)                   |
  | [props.xAxisformatter] | <code>function</code>             |         | (optional) _formatterCallback_: Function to format X axis values.                                                        |
  | [props.formatter]      | <code>function</code>             |         | (optional) _formatterCallback_: Function to format tooltip and Y axis values.                                            |
  | [props.onError]        | <code>function</code>             |         | (optional) _errorCallback_: Function to handle error messages from the widget.                                           |
  | [props.wrapperProps]   | <code>Object</code>               |         | Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |

- **Example**:

  In this example, the widget would display the number of stores in different ranks, based on their number of sales

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

#### PieWidget

Renders a `<PieWidget />` component, binded to a source at redux. The widget displays the calculations considering just the viewport features. From a data perspective, PieWidget would present a behaviour equivalent to CategoryWidget (groups or 'categories' from a column, with an aggregated calculation), but with a different UI.

- **Input**:

  | Param                    | Type                           | Default            | Description                                                                                                                         |
  | ------------------------ | ------------------------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
  | props                    |                                |                    |                                                                                                                                     |
  | props.id                 | <code>string</code>            |                    | ID for the widget instance.                                                                                                         |
  | props.title              | <code>string</code>            |                    | Title to show in the widget header.                                                                                                 |
  | props.dataSource         | <code>string</code>            |                    | ID of the data source to get the data from.                                                                                         |
  | props.column             | <code>string</code>            |                    | Name of the data source's column to get the data from.                                                                              |
  | props.operation          | <code>string</code>            |                    | Operation to apply to the operationColumn. Must be one of those defined in `AggregationTypes` object.                               |
  | props.height             | <code>string</code>            | <code>300px</code> | Height of the chart in CSS format.                                                                                                  |
  | [props.operationColumn]  | <code>string</code>            |                    | Name of the data source's column to operate with. If not defined it will default to the one defined in `column`.                    |
  | [props.formatter]        | <code>function</code>          |                    | (optional) _formatterCallback_: Function to format each value returned.                                                             |
  | [props.tooltipFormatter] | <code>formatterCallback</code> |                    | (optional) _formatterCallback_: Function to return the HTML of the tooltip.                                                         |
  | [props.onError]          | <code>errorCallback</code>     |                    | (optional) _errorCallback_: Function to handle error messages from the widget.                                                      |
  | [props.wrapperProps]     | <code>Object</code>            |                    | (optional) Extra props to pass to [WrapperWidgetUI](https://storybook-react.carto.com/?path=/docs/widgets-wrapperwidgetui--default) |
