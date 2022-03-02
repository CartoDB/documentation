## UI

{{% tableWrapper %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/react-ui  | <a href="https://npmjs.org/package/@carto/react-ui">  <img src="https://img.shields.io/npm/v/@carto/react-ui.svg?style=flat-square" alt="version" style="margin-bottom: 0px; vertical-align: middle;" /></a> | <a href="https://npmjs.org/package/@carto/react-ui">  <img src="https://img.shields.io/npm/dt/@carto/react-ui.svg?style=flat-square" alt="downloads" style="margin-bottom: 0px; vertical-align: middle;" /></a>
{{%/ tableWrapper %}}

A set of UI elements to build CARTO for React applications.

The package includes 2 main elements: a set of values to use a Material UI theme with CARTO brand (`cartoThemeOptions`) + a group of widgets:

- [`CategoryWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-categorywidgetui--default): to display with horizontal bars a magnitude for each selected category (eg. population sum per country).
- [`FeatureSelectionWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-featureselectionwidgetui--default): to specify a shape and use it to filter features spatially.
- [`FormulaWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-formulawidgetui--empty): to represent a single value (eg. average income in $).
- [`HistogramWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-histogramwidgetui--empty): to display the distribution of values, with arbitrary bins (eg. number of stores per annual income).
- [`LegendWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-legendwidgetui--playground): to provide layer switching functionality and display legends for layers.
- [`PieWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-piewidgetui--default): to represent structure, using also 'category' groups, this time displayed with a donut chart.
- [`ScatterPlotWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-scatterplotwidgetui--default): to visualize the correlation between two different fields from a dataset.
- [`TableWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-tablewidgetui--playground): to show feature column values in a tabular view.
- [`TimeSeriesWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-timeserieswidgetui--default): to visualize the evolution through time of features containing a column with timestamp values.
- [`WrapperWidgetUI`](https://storybook-react.carto.com/?path=/docs/custom-components-wrapperwidgetui--default): a collapsible panel with a title, useful to wrap other UI elements.

This package, `@carto/react-ui` contains the user interface components for the widgets and the `@carto/react-widgets` package contains the widgets business logic. The UI is decoupled from the business logic so you can provide your own user interface or modify the business logic.

To get information about the different properties available for each of the widgets, please access our [Storybook catalogue](https://storybook-react.carto.com/), an interactive tool for documenting our Material UI theme and the additional components we have built.

### Constants & enums

#### cartoThemeOptions

A tree of configuration elements (colors, font sizes, families...) to define a theme. See official doc on theming at [Material UI theming](https://material-ui.com/customization/theming/)

- **Example**:

  ```js
  import { createMuiTheme, ThemeProvider } from "@material-ui/core";
  import { cartoThemeOptions } from "@carto/react-ui";

  // Theme build
  let theme = createMuiTheme(cartoThemeOptions);
  theme = responsiveFontSizes(theme, {
    breakpoints: cartoThemeOptions.breakpoints.keys,
    disableAlign: false,
    factor: 2,
    variants: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "subtitle1",
      "subtitle2",
      "body1",
      "body2",
      "button",
      "caption",
      "overline",
    ],
  });

  // ... and its use in the main App component
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      // YOUR APP CONTENT
    </ThemeProvider>
  );
  ```

#### LEGEND_TYPES

Constants for the different legend types available.

- **Options**:

  - `CATEGORY`. Use this type when you are visualizing a choropleth map based on the value of a `string` property.
  - `ICON`. Use this type when you are visualizing a point layer using icons.
  - `CONTINUOUS_RAMP`. Use this type when you are visualizing a layer using a continuous color ramp based on a numeric property.
  - `BINS`. Use this type when you are visualizing a layer assigning colors to bins/intervals based on a numeric property.
  - `PROPORTION`. Use this type when you are visualizing a point layer using proportional symbols (size-varying).
  - `CUSTOM`. Use this type when you have a custom visualization that does not fit with the other legend types. It allows you to provide your own legend component.

- **Example**:

  ```js
  import { LEGEND_TYPES } from "@carto/react-ui";

  console.log(LEGEND_TYPES.CATEGORY); // 'category'
  ```
