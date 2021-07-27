## UI

{{% tableWrapper %}}
| Package | Version | Downloads |
| ------- | ------- | --------- |
| @carto/react-ui  | <a href="https://npmjs.org/package/@carto/react-ui">  <img src="https://img.shields.io/npm/v/@carto/react-ui.svg?style=flat-square" alt="version" /></a> | <a href="https://npmjs.org/package/@carto/react-ui">  <img src="https://img.shields.io/npm/dt/@carto/react-ui.svg?style=flat-square" alt="downloads" /></a>
{{%/ tableWrapper %}}

A set of UI elements to build CARTO for React applications.

The package includes 2 main elements: a set of values to use a Material UI theme with CARTO brand (`cartoThemeOptions`) + a group of widgets:

- `WrapperWidgetUI`: a collapsible panel with a title, useful to wrap other UI elements.
- `CategoryWidgetUI`: to display with horizontal bars a magnitude for each selected category (eg. population sum per country).
- `FormulaWidgetUI`: to represent a single value (eg. average income in $).
- `HistogramWidgetUI`: to display the distribution of values, with arbitrary bins (eg. number of stores per annual income).
- `PieWidgetUI`: to represent structure, using also 'category' groups, this time displayed with a donut chart.

**Tip:** The best place to see UI widgets reference (and how they work) is the [Storybook catalogue](https://storybook-react.carto.com/)

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


