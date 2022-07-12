## Upgrade Guide

### Upgrading from v1.2 to v1.3

#### External Library Changes

The main change that can have an impact when upgrading is the update of deck.gl to v8.8. In this new version of deck.gl, the `CartoLayer` only works with vector tiles and this change can affect to widgets. If we are using dynamic tiling and there are features dropped in the current zoom level, the widgets are not going to show results but a message indicating that not all the data is available. If you need the widgets to work at all zoom levels and the data source is of small/medium size, you can keep using GeoJSON but directly with the `GeoJsonLayer` as explained [here](../data-sources#dropping-features).

#### Library Changes

We have updated the `HistogramWidget` and now it can work in two different modes: you can keep using the `ticks` property to specify the breaks for the bins, or you can use the new `bins` property where you just specify the number of bins to use and the widget is going to calculate the breaks. 

Sometimes the `HistogramWidget` was used with categorical data but it should be use to show the distribution of a numeric column. We have created a new `BarWidget` that should be used when we want to visualize categorical data using vertical bars.

### Upgrading from v1.1 to v1.2

There are no major changes in v1.2 that should affect your applications when upgrading from v1.1.

### Upgrading from v1.0 to v1.1

CARTO for React v1.1 includes support for deck.gl 8.6 that provides data visualization capabilities for the new [CARTO 3 platform](#compatibility-with-platform-versions). Read more about the capabilities in this new deck.gl version [here](/deck-gl).

#### Library changes

If you update an application that is using v1.0 of the CARTO for React library to v1.1, there are some minor changes that might affect your existing code (we have already updated our documentation with these changes):

- [useCartoLayerProps](/react/library-reference/api/#usecartolayerprops) now uses object destructuring instead of multiple arguments
- [executeSQL](/react/library-reference/api/#executesql) now uses object destructuring instead of multiple arguments
- `SourceTypes` constants have been removed from the `@carto/react-api` package
- The `type` property in data sources now accepts a different set of values. You need to use `MAP_TYPES.QUERY` if you were using `'sql'` or `MAP_TYPES.TILESET` if you were using `'bigquery'`. The `MAP_TYPES` constants are defined in the `@deck.gl/carto` package.

#### Template changes

In this new version 1.1, we have also renamed our existing templates and added three new templates for creating applications with the CARTO 3 platform:

- `base-2` is the new name for the existing CARTO 2 skeleton template, previously the default `@carto` template

   ```shell
   $ yarn create react-app my-app --template @carto/base-2
   ```

- `base-3` is the name for the new CARTO 3 template

   ```shell
   $ yarn create react-app my-app --template @carto/base-3
   ```

- `base-3-typescript` is the name for the new CARTO 3 template for TypeScript

   ```shell
   $ yarn create react-app my-app --template @carto/base-3-typescript
   ```

- `sample-app-2` is the new name for the existing sample app template for CARTO 2, previously named `sample-app`

   ```shell
   $ yarn create react-app my-app --template @carto/sample-app-2
   ```

- `sample-app-3` is the name for the new sample app template for CARTO 3

   ```shell
   $ yarn create react-app my-app --template @carto/sample-app-3
   ```

#### Compatibility with platform versions

CARTO for React v1.1 is the first version compatible with the CARTO 3 platform. CARTO 3 is the new version of the CARTO platform that provides direct connectivity to cloud data warehouses without the need for importing data first into CARTO. If you want to learn more about this new version and sign-up for a free trial, please go to [this page](https://carto.com/carto3/).

