## Release notes

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

