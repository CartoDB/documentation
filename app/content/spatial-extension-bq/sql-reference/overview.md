## Overview

The CARTO Spatial Extension's pocedures and functions are organized in modules based on the functionality they offer. On this page you will find the full list with direct links to their definition and the Release Notes.

### Index

| Module | Function or Procedure |
| :----- | :------ |
| Tiler | <ul style="list-style:none"><li><a href="../tiler/#create_simple_tileset">CREATE_SIMPLE_TILESET</a></li><li><a href="../tiler/#create_point_aggregation_tileset">CREATE_POINT_AGGREGATION_TILESET</a></li></ul>|
| Quadkey | <ul style="list-style:none"><li><a href="../quadkey/#quadint_fromzxy">QUADINT_FROMZXY</a></li><li><a href="../quadkey/#zxy_fromquadint">ZXY_FROMQUADINT</a></li><li><a href="../quadkey/#longlat_asquadint">LONGLAT_ASQUADINT</a></li><li><a href="../quadkey/#quadint_fromquadkey">QUADINT_FROMQUADKEY</a></li><li><a href="../quadkey/#quadkey_fromquadint">QUADKEY_FROMQUADINT</a></li><li><a href="../quadkey/#toparent">TOPARENT</a></li><li><a href="../quadkey/#tochildren">TOCHILDREN</a></li><li><a href="../quadkey/#sibling">SIBLING</a></li><li><a href="../quadkey/#kring">KRING</a></li><li><a href="../quadkey/#bbox">BBOX</a></li><li><a href="../quadkey/#st_asquadint">ST_ASQUADINT</a></li><li><a href="../quadkey/#st_asquadint_polyfill">ST_ASQUADINT_POLYFILL</a></li><li><a href="../quadkey/#st_boundary">ST_BOUNDARY</a></li><li><a href="../quadkey/#longlat_asquadintlist_resolution">LONGLAT_ASQUADINTLIST_RESOLUTION</a></li><li><a href="../quadkey/#version">VERSION</a></li></ul>|
| H3 | <ul style="list-style:none"><li><a href="../h3/#st_ash3">ST_ASH3</a></li><li><a href="../h3/#longlat_ash3">LONGLAT_ASH3</a></li><li><a href="../h3/#h3_ashex">H3_ASHEX</a></li><li><a href="../h3/#h3_fromhex">H3_FROMHEX</a></li><li><a href="../h3/#st_ash3_polyfill">ST_ASH3_POLYFILL</a></li><li><a href="../h3/#st_boundary">ST_BOUNDARY</a></li><li><a href="../h3/#isvalid">ISVALID</a></li><li><a href="../h3/#compact">COMPACT</a></li><li><a href="../h3/#uncompact">UNCOMPACT</a></li><li><a href="../h3/#toparent">TOPARENT</a></li><li><a href="../h3/#tochildren">TOCHILDREN</a></li><li><a href="../h3/#ispentagon">ISPENTAGON</a></li><li><a href="../h3/#distance">DISTANCE</a></li><li><a href="../h3/#kring">KRING</a></li><li><a href="../h3/#hexring">HEXRING</a></li><li><a href="../h3/#version">VERSION</a></li></ul>|
| S2 | <ul style="list-style:none"><li><a href="../s2/#id_fromhilbertquadkey">ID_FROMHILBERTQUADKEY</a></li><li><a href="../s2/#hilbertquadkey_fromid">HILBERTQUADKEY_FROMID</a></li><li><a href="../s2/#longlat_asid">LONGLAT_ASID</a></li><li><a href="../s2/#st_asid">ST_ASID</a></li><li><a href="../s2/#st_boundary">ST_BOUNDARY</a></li><li><a href="../s2/#version">VERSION</a></li></ul>|
| Placekey | <ul style="list-style:none"><li><a href="../placekey/#h3_asplacekey">H3_ASPLACEKEY</a></li><li><a href="../placekey/#placekey_ash3">PLACEKEY_ASH3</a></li><li><a href="../placekey/#isvalid">ISVALID</a></li><li><a href="../placekey/#version">VERSION</a></li></ul>|

### Release notes

**April 9, 2021**

**March 31, 2021**

Features:
* New Quadkey module.
* New H3 module.
* New S2 module.
* New Placekey module.
* Tiler module: added support for zoom-dependant source layers for the both tiling procedure.

Changed: 
* Tiler module: removed `zoom_step` option.


**February 10, 2021**

Features:
* New Tiler module with two procedures: CREATE_SIMPLE_TILESET and CREATE_AGGREGATION_TILESET.