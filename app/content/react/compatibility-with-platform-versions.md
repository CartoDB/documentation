## Compatibility with Platform Versions

The latest stable version is 1.0.2 for the templates and 1.0.1 for the library. In this documentation site we have already updated the documentation for version 1.1.0-beta, that includes support for our new CARTO 3 platform.

CARTO 3 is a fully cloud native platform that is currently in beta and provides direct connectivity to cloud data warehouses without the need for importing data first into CARTO. If you want to request access, please fill in [this form](https://carto.com/carto3/).

CARTO for React v1.1 includes support for deck.gl 8.5 that provides data visualization capabilities for the new CARTO 3 platform. Read more about the capabilities in this new deck.gl version [here](/deck-gl).

You can start testing CARTO for React v1.1 beta right now but we don't recommend its use for production applications yet. We will release the final stable version when CARTO 3 is launched.

If you update an application from CARTO for React v1.0 to v1.1 there are some minor changes that might affect your existing code (we have already updated our documentation with these changes):

- `useCartoLayerProps` now uses object destructuring instead of multiple arguments
- `executeSQL` now uses object destructuring instead of multiple arguments
- `SourceTypes` constants have been removed from the `@carto/react-api` package
- The `type` property in data sources now accepts a different set of values. You need to use `MAP_TYPES.QUERY` if you were using `'sql'` or `MAP_TYPES.TILESET` if you were using `'bigquery'`. The `MAP_TYPES` constants are defined in the `@deck.gl\carto` package.
