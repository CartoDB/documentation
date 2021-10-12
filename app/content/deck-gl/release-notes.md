## Release notes

### v8.6 - October 12, 2021

- Default to binary mode in `MVTLayer`
- Include API error at the exception message
- Add geoColumn & columns props to `CartoLayer`
- Fix `MVTLayer` autoHighlight with binary data
- Check for correct layerName when highlighting in `MVTLayer`

In addition to these changes to the CARTO for deck.gl module and the `MVTLayer`, we have also implemented support for the new Google Maps vector rendering features in the Google Maps module.

### v8.5 - July 26, 2021

- CARTO 3 integration
- New `CartoLayer` supporting all the Maps API versions (`CartoSQLLayer` and `CartoBQTiler` layers will be deprecated and we recommend migrating existing code)
- Support triangulation of polygons for `MVTLoader` in loaders.gl
- Support `pointType` prop to allow changing point rendering in `GeoJsonLayer`

### v8.4 - February 1, 2021

- Basemap module for `@deck.gl/carto`
- Style helpers and CARTO colors
- Support for CARTO Maps API v2
- Add `onDataLoad` and `onDataError` callbacks to CARTO layers
- TileJSON support to the `MVTLayer`
- `MVTLayer` `getRenderedFeatures`
- `MVTLayer` coordinates transformation to WGS84
- `MVTLayer` binary data support

### v8.3 - October 12, 2020

- Add `@deck.gl/carto` module (`CartoSqlLayer` and `CartoBQTilerLayer`)
- `MVTLayer`: support globe view

### v8.2 - June 28, 2020

- Fix `MVTLayer` projection precision
- `FillStyleExtension` supports `MVTLayer`

### v8.1 - March 17, 2020

- New `MVTLayer` for working with vector tiles