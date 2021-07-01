## Release notes

### July 1, 2021

#### Module tiler v1.12.0

Feature
- Add new version of tiler to create simple tilesets: `CREATE_TILESET`.

### June 2, 2021

#### Module data v1.0.0-alpha.1

Feature
- Create data module.
- Add VERSION function.
- ADD DATAOBS_ENRICH_POINTS procedure.
- ADD DATAOBS_ENRICH_POINTS_WITH_MEASURES procedure.
- ADD DATAOBS_ENRICH_POLYGONS_WITH_AGGREGATION procedure.
- ADD DATAOBS_ENRICH_POLYGONS_WITH_MEASURES procedure.
- ADD ENRICH_POINTS procedure.
- ADD ENRICH_POINTS_WITH_MEASURES procedure.
- ADD ENRICH_POLYGONS_WITH_AGGREGATION procedure.
- ADD ENRICH_POLYGONS_WITH_MEASURES procedure.

### June 1, 2021

#### Module s2 v1.1.0

Feature
- Add TOKEN_FROMID function.
- Add ID_FROMTOKEN function.
- Add ID_FROM_UINT64REPR function.
- Add UINT64REPR_FROM_ID function.

### May 19, 2021

#### Module tiler v1.11.0

Changed
- Use semantic versioning.
- Add `features_count` and `geometry` labels to the tilesets.

### May 6, 2021

#### Module clustering v1.0.1

Changed
- Change ST_CLUSTERKMEANS returning cluster and geom

### May 4, 2021

#### Module accessors v1.0.0

Feature
- Create accessors module.
- Add ST_ENVELOPE function.
- Add VERSION function.

#### Module processing v1.0.0

Feature
- Create processing module.
- Add ST_VORONOIPOLYGONS function.
- Add ST_VORONOILINES function.
- Add ST_DELAUNAYPOLYGONS function.
- Add ST_DELAUNAYLINES function.
- Add ST_POLYGONIZE function.
- Add VERSION function.

#### Module transformations v1.2.0

Feature
- Add ST_CONCAVEHULL function.

### April 30, 2021

#### Module clustering v1.0.0

Feature
- Create clustering module.
- Add ST_CLUSTERKMEANS function.
- Add VERSION function.

### April 29, 2021

#### Module constructors v1.1.0

Feature
- Add ST_BEZIERSPLINE function.
- Add ST_MAKEELLIPSE function.

#### Module measurements v1.0.0

Feature
- Create measurements module.
- Add ST_ANGLE function.
- Add ST_AZIMUTH function.
- Add ST_MINKOWSKIDISTANCE function.

#### Module transformations v1.1.0

Feature
- Rename module to transformations.
- Add ST_CENTERMEAN function.
- Add ST_CENTERMEDIAN function.
- Add ST_CENTEROFMASS function.
- Add ST_DESTINATION function.
- Add ST_GREATCIRCLE function.
- Add ST_LINE_INTERPOLATE_POINT function.

#### Module tiler v10

Removed
- Remove quota & project checking.

### April 28, 2021

#### Module constructors v1.0.0

Feature
- Create constructors module.
- Add ST_MAKEENVELOPE function.
- Add ST_TILEENVELOPE function.
- Add VERSION function.

### April 16, 2021

#### Module quadkey v1.0.1

Changed
- Changed TOPARENT implementation to pure SQL.

#### Module transformations v1.0.0

Feature
- Create transformation module.
- Add ST_BUFFER function.
- Add VERSION function.

### April 9, 2021

#### Module h3 v1.0.1

Changed
- Use hexadecimal as default type instead of int for h3 indexes.

Fixed
- Fix ST_BOUNDARY generating error when not able to parse geometry.

#### Module placekey v1.0.1

Changed
- Placekey conversions works with hexadecimal h3 indexes instead of int.

#### Module random v1.0.0

Feature
- Create random module.
- Add ST_GENERATEPOINTS function.
- Add VERSION function.

### March 31, 2021

#### Module h3 v1.0.0

Feature
- Create h3 module.
- Add ST_ASH3 function.
- Add LONGLAT_ASH3 function.
- Add ST_ASH3_POLYFILL function.
- Add ST_BOUNDARY function.
- Add ISVALID function.
- Add COMPACT function.
- Add UNCOMPACT function.
- Add TOPARENT function.
- Add TOCHILDREN function.
- Add ISPENTAGON function.
- Add DISTANCE function.
- Add KRING function.
- Add HEXRING function.
- Add VERSION function.

#### Module placekey v1.0.0

Feature
- Create placekey module.
- Add H3_ASPLACEKEY function.
- Add PLACEKEY_ASH3 function.
- Add ISVALID function.
- Add VERSION function.

#### Module quadkey v1.0.0

Feature
- Create quadkey module.
- Add QUADINT_FROMZXY function.
- Add ZXY_FROMQUADINT function.
- Add LONGLAT_ASQUADINT function.
- Add QUADINT_FROMQUADKEY function.
- Add QUADKEY_FROMQUADINT function.
- Add TOPARENT function.
- Add TOCHILDREN function.
- Add SIBLING function.
- Add KRING function.
- Add BBOX function.
- Add ST_ASQUADINT function.
- Add ST_ASQUADINT_POLYFILL function.
- Add ST_BOUNDARY function.
- Add LONGLAT_ASQUADINTLIST_RESOLUTION function.
- Add VERSION function.

#### Module s2 v1.0.0

Feature
- Create s2 module.
- Add ID_FROMHILBERTQUADKEY function.
- Add HILBERTQUADKEY_FROMID function.
- Add LONGLAT_ASID function.
- Add ST_ASID function.
- Add ST_BOUNDARY function.
- Add VERSION function.

#### Module tiler v9

Feature
- Add QUOTA procedure in order to display the monthly quota and quota available.
- Implement support for layer name.
- Add a max limit to the `max_tile_size_kb` property. Adds a new option (`skip_validation`) to circunvent this limit, which also allows going over the max partition limit.
- Add a limit to the max amount of **expected** tiles at the highest zoom level for Simple Tilesets. It can be disabled via the `skip_validation` option of modified (for tests using `max_tiles_at_maxzoom`).
- Add new `drop_fraction_as_needed` strategy initial implementation. Also adds **internal** `debug` and `fraction_drop_per_zoom_level` options to help debugging.
- Add new `metadada` input parameter to set the properties `name`, `description`, `legends` and also `extra_metadata`.
- Add `zoom_min_column` and `zoom_max_column` to control the zoom level at which particular features are visible.

Changed
- Change the default and max partition limit to 3999.
- Make aggregation tilesets to use the quadkey module UDF LONGLAT_ASQUADINTLIST_RESOLUTION in order to generate quadkey aggregations.

Removed
- Removed `zoom_step` option.

Fixed
- Fix bug that left empty the generator options in the metadata cell.
- Fix CREATE_SIMPLE_TILESET failing with single column tables.
- Fix collision with `frequency` column name.

### February 10, 2021

#### Module tiler v8

Feature
- Add tileset type to metadata and BigQuery labels.
- Add the prefix "aggregation_" to aggregation options: type, resolution and placement.

Changed
- Moved to the Advanced Spatial Extension.
- Change "max_tile_size_strategy" default to "throw_error", matching the other defaults and improve the exception error message in CreatePointAggregationTileset.
- Rename adapting to BigQuery conventions, using UPPER CASE and separating words with underscore "_".
- Set up limits for the procedures based on a limits table in the config project. The users can only execute the tiler from the "billing_project" and they have a maximum amount of processed bytes per month.

Removed
- Remove compression levels 10-12 to reduce library size.
- Remove ST prefix from functions not using geographies.
- Remove unused functions like st_tileenvelope or st_tileenvelope_bbox.

