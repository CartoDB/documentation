## Release notes

### June 24, 2022

#### Module quadbin

Feature
- Add QUADBIN_BBOX function.
- Add QUADBIN_BOUNDARY function.
- Add QUADBIN_CENTER function.
- Add QUADBIN_FROMGEOGPOINT function.
- Add QUADBIN_FROMLONGLAT function.
- Add QUADBIN_FROMZXY function.
- Add QUADBIN_ISVALID function.
- Add QUADBIN_KRING function.
- Add QUADBIN_KRING_DISTANCES function.
- Add QUADBIN_POLYFILL function.
- Add QUADBIN_RESOLUTION function.
- Add QUADBIN_SIBLING function.
- Add QUADBIN_TOCHILDREN function.
- Add QUADBIN_TOPARENT function.
- Add QUADBIN_TOZXY function.

### June 9, 2022

#### Module tiler

Fixed
- Fix metadata tilestats to include only columns in properties
- Fix numeric metadata tilestats which were treated as categories

### April 22, 2022

#### Module tiler

Feature
- Add `max_tile_features` option.
- Add output table existence early check.
- Add `throw_error` and `return_null` size strategy.
- Set `tile_feature_order` empty as default.
- Input query without parenthesis allowed.
- Use of MD5 hash for temporary tables naming.

### April 7, 2022

#### Module tiler

Feature
- Add CREATE_POINT_AGGREGATION_TILESET procedure.
- Add CREATE_SIMPLE_TILESET procedure.

