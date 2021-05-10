## Release notes

### May 4, 2021

**Features**
* New Accessors module including function `ST_ENVELOPE`.
* New Processing module including functions `ST_VORONOIPOLYGONS`, `ST_VORONOILINES`, `ST_DELAUNAYPOLYGONS`, `ST_DELAUNAYLINES` and `ST_POLYGONIZE`.
* New function `ST_CONCAVEHULL` included in the Transformations module.

### April 30, 2021

**Features**
* New Clustering module including function `ST_CLUSTERKMEANS`.

### April 29, 2021

**Features**
* New functions included in the Transformations module: `ST_CENTERMEAN`, `ST_CENTERMEDIAN`, `ST_CENTEROFMASS`, `ST_DESTINATION`, `ST_GREATCIRCLE` and `ST_INTERPOLATE_POINT`.
* New Constructors module including functions `ST_BEZIERSPLINE`, `ST_MAKEELLIPSE`, `ST_MAKEENVELOPE` and `ST_TILEENVELOPE`.
* New Measurements module including functions `ST_ANGLE`, `ST_AZIMUTH` and `ST_MINKOWSKIDISTANCE`.

### April 16, 2021

**Features**
* New Data module including function `ST_GETPOPULATIONDENSITY`.
* New Transformation module including function `ST_BUFFER`.

**Changes**
* Improved performance of `quadint.TOPARENT`.

### April 9, 2021

**Features**
* New Random module.

**Changed** 
* H3 indexes are now in hexadecimal format instead of integer.
* Placekey indexes are now in hexadecimal format instead of integer.

### March 31, 2021

**Features**
* New Quadkey module.
* New H3 module.
* New S2 module.
* New Placekey module.
* Tiler module: added support for zoom-dependant source layers for the both tiling procedure (see [example](../../examples/tilesets/#zoom-dependant-tileset-for-usa-administrative-units)).

**Changed**
* Tiler module: removed `zoom_step` option.

### February 10, 2021

**Features**
* New Tiler module with two procedures: `CREATE_SIMPLE_TILESET` and `CREATE_POINT_AGGREGATION_TILESET`.