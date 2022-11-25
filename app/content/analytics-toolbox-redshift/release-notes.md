## Release notes

### November 1, 2022

#### All modules

New

- Create release workflows

Improvement

- Adapt to Semver

### October 25, 2022

#### Module data

Fix

- Fix enrichment procedures not working with VARCHAR variables for aggregation types `MIN`, `MAX` and `COUNT`.

### October 18, 2022

#### Module data

Fix

- Fix enrichment procedures returning inconsistent results for input queries containing `LIMIT`.
- Fix ST_AREA returning NULL by using ST_SIMPLIFY.
- Fix inconsistent values resturned because of ST_ENVELOPE.

### October 10, 2022

#### Module data

New

- Add DATAOBS_ENRICH_POINTS procedure.
- Add DATAOBS_ENRICH_POLYGONS procedure.
- Add DATAOBS_ENRICH_GRID procedure.
- Add ENRICH_GRID procedure.

### October 7, 2022

#### Module clustering

New

- Move ST_CLUSTERKMEANS function to core.
- Move CREATE_CLUSTERKMEANS procedure to core.

#### Module random

New

- Move ST_GENERATEPOINTS function to core.

### October 1, 2022

#### Module lds

Improvement

#### Module lds

Improvement

- Rename `LDS_API_URL` to `API_BASE_URL`.

### September 21, 2022

#### Module tiler

Fix

- Fix CREATE_SPATIAL_INDEX_TILESET returning nested UDFs error when detecting the index type.

### September 19, 2022

#### Module statistics

Improvement

- Add p-values in the output of GETIS_ORD_QUADBIN function.

#### Module tiler

Improvement

- Set `version` field in tilers metadata compliant with AT version.

### September 7, 2022

#### Module data

New

- Add ENRICH_POLYGONS procedure.

### September 2, 2022

#### Module data

New

- Add ENRICH_POINTS procedure.

### August 26, 2022

#### Module statistics

New

- Add GETIS_ORD_QUADBIN function.

### August 19, 2022

#### Module s2

Fix

- Fix S2_BOUNDARY inverted coordinates.

### August 11, 2022

#### Module tiler

Improvement

- Unify `extra_metadata` into `metadata` in tiler metadata.

### August 9, 2022

#### Module statistics

New

- Add P_VALUE function.

### July 22, 2022

#### Module lds

New

- Add GEOCODE_REVERSE_TABLE procedure.

#### Module statistics

New

- Create statistics module.
- Add MORANS_I_QUADBIN function.

### July 20, 2022

#### Module clustering

New

- Add CREATE_CLUSTERKMEANS procedure.

### July 14, 2022

#### Module quadbin

Improvement

- Update functions volatility.
- QUADBIN_FROMZXY accepting BIGINTs as params instead of INTs.

### July 12, 2022

#### Module tiler

Improvement

- Improve speed of CREATE_SPATIAL_INDEX_TILESET.

### July 8, 2022

#### Module quadbin

Improvement

- Release SQL version of QUADBIN_TOZXY.

### July 1, 2022

#### Module tiler

Improvement

- Support h3int from CREATE_SPATIAL_INDEX_TILESET.

### June 27, 2022

#### Module tiler

Improvement

- Support quadbin from CREATE_SPATIAL_INDEX_TILESET instead of quadint.

### June 24, 2022

#### Module quadbin

New

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

### June 20, 2022

#### Module tiler

New

- Add CREATE_SPATIAL_INDEX_TILESET procedure.

### June 7, 2022

#### Module lds

Fix

- Fix chunks in CREATE_ISOLINES.

### June 6, 2022

#### Module lds

Improvement

- Check if the user has enough credits to execute CREATE_ISOLINES.

### June 2, 2022

#### Module lds

New

- Add CREATE_ISOLINES procedure.

### May 19, 2022

#### Module lds

Improvement

- Add optional `language` parameter to GEOCODE_REVERSE function.

### May 13, 2022

#### Module tiler

New

- Add max_simplification_zoom and coordinates_precision parameters.

### April 21, 2022

#### Module tiler

New

- Add max_tile_size_strategy support for CREATE_SIMPLE_TILESET.

Fix

- Fix tile_feature_order not being taken into account for CREATE_POINT_AGGREGATION_TILESET and CREATE_POINT_AGGREGATION_TILESET.

### March 30, 2022

#### Module tiler

Fix

- Escape special characters in generated properties.

### March 25, 2022

#### Module tiler

Improvement

- Raise improper qualified tables errors.
- Limit GeoJSON precision to 6 to comply Redshift VARCHAR size limitations.
- Add ST_Simplify to the tiler.

### March 10, 2022

#### Module tiler

New

- Add CREATE_SIMPLE_TILESET procedure.

### February 25, 2022

#### Module tiler

New

- Create tiler module.
- Add CREATE_POINT_AGGREGATION_TILESET procedure.

### February 18, 2022

#### Module lds

New

- Add GEOCODE_TABLE procedure.
- Add GEOCODE function.
- Add GEOCODE_REVERSE function.
- Add ISOLINE function.
- Add LDS_QUOTA_INFO function.

### December 16, 2021

#### Module transformations

Fix

- Refactor of internal __ST_GEOMFROMGEOJSON function to avoid UDFs nestig Redshift limitations

### December 10, 2021

#### Module constructors

Improvement

- Deployment schema "carto" instead of "constructors".

Removed

- Remove VERSION function.

#### Module placekey

Improvement

- Deployment schema "carto" instead of "placekey".
- Rename H3_ASPLACEKEY function to PLACEKEY_FROMH3.
- Rename PLACEKEY_ASH3 function to PLACEKEY_TOH3.
- Rename ISVALID function to PLACEKEY_ISVALID.

Removed

- Remove VERSION function.

#### Module processing

Improvement

- Deployment schema "carto" instead of "processing".

Removed

- Remove VERSION function.

#### Module s2

Improvement

- Deployment schema "carto" instead of "s2".
- Rename HILBERTQUADKEY_FROMID function to S2_TOHILBERTQUADKEY.
- Rename ID_FROMHILBERTQUADKEY function to S2_FROMHILBERTQUADKEY.
- Rename ID_FROMTOKEN function to S2_FROMTOKEN.
- Rename ID_FROMUINT64REPR function to S2_FROMUINT64REPR.
- Rename LONGLAT_ASID function to S2_FROMLONGLAT.
- Rename RESOLUTION function to S2_RESOLUTION.
- Rename ST_ASID function to S2_FROMGEOGPOINT.
- Rename ST_ASID_POLYFILL_BBOX function to S2_POLYFILL_BBOX.
- Rename ST_BOUNDARY function to S2_BOUNDARY.
- Rename TOCHILDREN function to S2_TOCHILDREN.
- Rename TOKEN_FROMID function to S2_TOTOKEN.
- Rename TOPARENT function to S2_TOPARENT.
- Rename UINT64REPR_FROMID function to S2_TOUINT64REPR.

Removed

- Remove VERSION function.

#### Module transformations

Improvement

- Deployment schema "carto" instead of "transformations".

Removed

- Remove VERSION function.

#### Module clustering

Improvement

- Deployment schema "carto" instead of "clustering".

Removed

- Remove VERSION function.

#### Module random

Improvement

- Deployment schema "carto" instead of "random".
- ST_GENERATEPOINTS now uses a spherically uniform distribution. Previously used to by uniform on projection.

Removed

- Remove VERSION function.

### October 21, 2021

#### Module clustering

Improvement

- ST_CLUSTERKMEANS returning an Array.

### October 6, 2021

#### Module processing

New

- Create processing module.
- Add VERSION function.
- Add ST_POLYGONIZE function.
- Add ST_DELAUNAYLINES function.
- Add ST_DELAUNAYPOLYGONS function.
- Add ST_VORONOILINES function.
- Add ST_VORONOIPOLYGONS function.

#### Module transformations

New

- Create transformations module.
- Add VERSION function.
- Add ST_CENTERMEAN function.
- Add ST_CENTROID function.
- Add ST_CENTEROFMASS function
- Add ST_CENTERMEDIAN function
- Add ST_GREATCIRCLE function
- Add ST_DESTINATION function

### October 5, 2021

#### Module clustering

New

- Create clustering module.
- Add VERSION function.
- Add ST_CLUSTERKMEANS function.

#### Module random

New

- Create random module.
- Add ST_GENERATEPOINTS function.
- Add VERSION function.

### September 23, 2021

#### Module s2

New

- Create s2 module.
- Add HILBERTQUADKEY_FROMID function.
- Add ID_FROMHILBERTQUADKEY function.
- Add ID_FROMTOKEN function.
- Add ID_FROMUINT64REPR function.
- Add LONGLAT_ASID function.
- Add RESOLUTION function.
- Add ST_ASID function.
- Add ST_ASID_POLYFILL_BBOX function.
- Add ST_BOUNDARY function.
- Add TOCHILDREN function.
- Add TOKEN_FROMID function.
- Add TOPARENT function.
- Add UINT64REPR_FROMID function.
- Add VERSION function.

### September 17, 2021

#### Module constructors

New

- Create constructors module.
- Add ST_BEZIERSPLINE function.
- Add ST_MAKEELLIPSE function.
- Add ST_MAKEENVELOPE function.
- Add ST_TILEENVELOPE function.
- Add VERSION function.

### September 7, 2021

#### Module placekey

New

- Create placekey module.
- Add H3_ASPLACEKEY function.
- Add PLACEKEY_ASH3 function.
- Add ISVALID function.
- Add VERSION function.

