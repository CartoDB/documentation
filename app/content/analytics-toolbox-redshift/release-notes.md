## Release notes

### December 10, 2021

#### Module constructors v1.1.0

Changed
- Deployment schema "carto" instead of "constructors".

Removed
- Remove VERSION function.

#### Module placekey v1.1.0

Changed
- Deployment schema "carto" instead of "placekey".
- Rename H3_ASPLACEKEY function to PLACEKEY_FROMH3.
- Rename PLACEKEY_ASH3 function to PLACEKEY_TOH3.
- Rename ISVALID function to PLACEKEY_ISVALID.

Removed
- Remove VERSION function.

#### Module processing v1.1.0

Changed
- Deployment schema "carto" instead of "processing".

Removed
- Remove VERSION function.

#### Module quadkey v1.1.0

Changed
- Deployment schema "carto" instead of "quadkey".
- Rename ZXY_FROMQUADINT function to QUADINT_TOZXY.
- Rename LONGLAT_ASQUADINT function to QUADINT_FROMGEOGPOINT.
- Rename QUADKEY_FROMQUADINT function to QUADINT_TOQUADKEY.
- Rename TOPARENT function to QUADINT_TOPARENT.
- Rename TOCHILDREN function to QUADINT_TOCHILDREN.
- Rename SIBLING function to QUADINT_SIBLING.
- Rename KRING function to QUADINT_KRING.
- Rename KRING_DISTANCES function to QUADINT_KRING_DISTANCES.
- Rename BBOX function to QUADINT_BBOX.
- Rename ST_ASQUADINT function to QUADINT_FROMGEOGPOINT.
- Rename ST_ASQUADINT_POLYFILL function to QUADINT_POLYFILL.
- Rename ST_BOUNDARY function to QUADINT_BOUNDARY.

Removed
- Remove VERSION function.

#### Module s2 v1.1.0

Changed
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

#### Module transformations v1.1.0

Changed
- Deployment schema "carto" instead of "transformations".

Removed
- Remove VERSION function.

#### Module clustering v1.1.0

Changed
- Deployment schema "carto" instead of "clustering".

Removed
- Remove VERSION function.

#### Module random v1.1.0

Changed
- Deployment schema "carto" instead of "random".

Removed
- Remove VERSION function.

#### Module random v1.0.1

Changed
- ST_GENERATEPOINTS now uses a spherically uniform distribution. Previously used to by uniform on projection.

### October 21, 2021

#### Module clustering v1.0.1

Changed
- ST_CLUSTERKMEANS returning an Array.

### October 6, 2021

#### Module processing v1.0.0

Feature
- Create processing module.
- Add VERSION function.
- Add ST_POLYGONIZE function.
- Add ST_DELAUNAYLINES function.
- Add ST_DELAUNAYPOLYGONS function.
- Add ST_VORONOILINES function.
- Add ST_VORONOIPOLYGONS function.

#### Module transformations v1.0.0

Feature
- Create transformations module.
- Add VERSION function.
- Add ST_CENTERMEAN function.
- Add ST_CENTROID function.
- Add ST_CENTEROFMASS function
- Add ST_CENTERMEDIAN function
- Add ST_GREATCIRCLE function
- Add ST_DESTINATION function

### October 5, 2021

#### Module clustering v1.0.0

Feature
- Create clustering module.
- Add VERSION function.
- Add ST_CLUSTERKMEANS function.

#### Module random v1.0.0

Feature
- Create random module.
- Add ST_GENERATEPOINTS function.
- Add VERSION function.

### September 23, 2021

#### Module s2 v1.0.0

Feature
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

### September 22, 2021

#### Module quadkey v1.0.1

Feature
- Add KRING_DISTANCES function.

Changed
- Review KRING function.

### September 17, 2021

#### Module constructors v1.0.0

Feature
- Create constructors module.
- Add ST_BEZIERSPLINE function.
- Add ST_MAKEELLIPSE function.
- Add ST_MAKEENVELOPE function.
- Add ST_TILEENVELOPE function.
- Add VERSION function.

### September 9, 2021

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
- Add VERSION function.

### September 7, 2021

#### Module placekey v1.0.0

Feature
- Create placekey module.
- Add H3_ASPLACEKEY function.
- Add PLACEKEY_ASH3 function.
- Add ISVALID function.
- Add VERSION function.

