---
aliases:
    - /analytics-toolbox-bq/sql-reference/quadbin/
---
## quadbin

<div class="badges"><div class="core"></div></div>

You can learn more about Quadbins in the [Overview section](/analytics-toolbox-bigquery/overview/spatial-indexes/#quadbin) of the documentation.


### QUADBIN_BBOX

{{% bannerNote type="code" %}}
carto.QUADBIN_BBOX(quadbin)
{{%/ bannerNote %}}

**Description**

Returns an array with the boundary box of a given Quadbin. This boundary box contains the minimum and maximum longitude and latitude. The output format is [West-South, East-North] or [min long, min lat, max long, max lat].

* `quadbin`: `INT64` Quadbin to get the bbox from.

**Return type**

`ARRAY<FLOAT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_BBOX(5209574053332910079);
-- 22.5
-- -21.943045533438166
-- 45.0
-- 0.0
```


### QUADBIN_BOUNDARY

{{% bannerNote type="code" %}}
carto.QUADBIN_BOUNDARY(quadbin)
{{%/ bannerNote %}}

**Description**

Returns the boundary for a given Quadbin as a polygon GEOGRAPHY with the same coordinates as given by the [QUADBIN_BBOX](#quadbin_bbox) function.

* `quadbin`: `INT64` Quadbin to get the boundary geography from.

**Return type**

`GEOGRAPHY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_BOUNDARY(5209574053332910079);
-- POLYGON((22.5 0, 22.5 -21.9430455334382, 45 -21.9430455334382, 45 0, 22.5 0))
```

{{% bannerNote title="tip"%}}
Quadbin Cell edges are spherical geodesics. The boundary edges can be interpreted as straight lines in other GIS tools, so to export the exact shape of the cells, use `ST_GEOGFROM(ST_ASGEOJSON(geog)`. In this process, BigQuery will add intermediate points to preserve the geodesic curves.
{{%/ bannerNote %}}


### QUADBIN_CENTER

{{% bannerNote type="code" %}}
carto.QUADBIN_CENTER(quadbin)
{{%/ bannerNote %}}

**Description**

Returns the center of a given Quadbin. The center is the intersection point of the four immediate children Quadbins.

* `quadbin`: `INT64` Quadbin to get the center from.

**Return type**

`GEOGRAPHY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_CENTER(5209574053332910079);
-- POINT(33.75 -11.1784018737118)
```


### QUADBIN_FROMGEOGPOINT

{{% bannerNote type="code" %}}
carto.QUADBIN_FROMGEOGPOINT(point, resolution)
{{%/ bannerNote %}}

**Description**

Returns the Quadbin of a given point at a given level of detail.

* `point`: `GEOGRAPHY` point to get the Quadbin from.
* `resolution`: `INT64` level of detail or zoom.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_FROMGEOGPOINT(ST_GEOGPOINT(40.4168, -3.7038), 4);
-- 5209574053332910079
```


### QUADBIN_FROMLONGLAT

{{% bannerNote type="code" %}}
carto.QUADBIN_FROMLONGLAT(longitude, latitude, resolution)
{{%/ bannerNote %}}

**Description**

Returns the Quadbin representation of a point for a given level of detail and geographic coordinates.

* `longitude`: `FLOAT64` longitude (WGS84) of the point.
* `latitude`: `FLOAT64` latitude (WGS84) of the point.
* `resolution`: `INT64` level of detail or zoom.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_FROMLONGLAT(40.4168, -3.7038, 4);
-- 5209574053332910079
```


### QUADBIN_FROMQUADKEY

{{% bannerNote type="code" %}}
carto.QUADBIN_FROMQUADKEY(quadkey)
{{%/ bannerNote %}}

**Description**

Compute a quadbin index from a quadkey.

* `quadkey`: `STRING` Quadkey representation of the index.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_FROMQUADKEY('0231001222');
-- 5233974874938015743
```


### QUADBIN_FROMZXY

{{% bannerNote type="code" %}}
carto.QUADBIN_FROMZXY(z, x, y)
{{%/ bannerNote %}}

**Description**

Returns a Quadbin from `z`, `x`, `y` [tile coordinates](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames).

* `z`: `INT64` zoom level.
* `x`: `INT64` horizontal position of a tile.
* `y`: `INT64` vertical position of a tile.

**Constraints**

Tile coordinates `x` and `y` depend on the zoom level `z`. For both coordinates, the minimum value is 0, and the maximum value is two to the power of `z`, minus one (`2^z - 1`).

Note that the `y` coordinate increases from North to South, and the `y` coordinate from West to East.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_FROMZXY(4, 9, 8);
-- 5209574053332910079
```


### QUADBIN_ISVALID

{{% bannerNote type="code" %}}
carto.QUADBIN_ISVALID(quadbin)
{{%/ bannerNote %}}

**Description**

Returns `true` when the given index is a valid Quadbin, `false` otherwise.

* `quadbin`: `INT64` Quadbin index.

**Return type**

`BOOLEAN`

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_ISVALID(5209574053332910079);
-- true
```

```sql
SELECT `carto-os`.carto.QUADBIN_ISVALID(1234);
-- false
```


### QUADBIN_KRING

{{% bannerNote type="code" %}}
carto.QUADBIN_KRING(origin, size)
{{%/ bannerNote %}}

**Description**

Returns all Quadbin cell indexes in a **filled square k-ring** centered at the origin in no particular order.

* `origin`: `INT64` Quadbin index of the origin.
* `size`: `INT64` size of the ring (distance from the origin).

**Return type**

`ARRAY<INT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_KRING(5209574053332910079, 1);
-- 5208043533147045887
-- 5209556461146865663
-- 5209591645518954495
-- 5208061125333090303
-- 5209574053332910079
-- 5209609237704998911
-- 5208113901891223551
-- 5209626829891043327
-- 5209662014263132159
```


### QUADBIN_KRING_DISTANCES

{{% bannerNote type="code" %}}
carto.QUADBIN_KRING_DISTANCES(origin, size)
{{%/ bannerNote %}}

**Description**

Returns all Quadbin cell indexes and their distances in a **filled square k-ring** centered at the origin in no particular order.

* `origin`: `INT64` Quadbin index of the origin.
* `size`: `INT64` size of the ring (distance from the origin).

**Return type**

`ARRAY<STRUCT<index INT64, distance INT64>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_KRING_DISTANCES(5209574053332910079, 1);
-- {"index": "5208043533147045887", "distance": "1"}
-- {"index": "5209556461146865663", "distance": "1"}
-- {"index": "5209591645518954495", "distance": "1"}
-- {"index": "5208061125333090303", "distance": "1"}
-- {"index": "5209574053332910079", "distance": "0"}
-- {"index": "5209609237704998911", "distance": "1"}
-- {"index": "5208113901891223551", "distance": "1"}
-- {"index": "5209626829891043327", "distance": "1"}
-- {"index": "5209662014263132159", "distance": "1"}
```

{{% bannerNote type="note" title="tip"%}}
The distance of the rings is computed as the [Chebyshev distance](https://en.wikipedia.org/wiki/Chebyshev_distance).
{{%/ bannerNote %}}


### QUADBIN_POLYFILL

{{% bannerNote type="code" %}}
carto.QUADBIN_POLYFILL(geography, resolution)
{{%/ bannerNote %}}

**Description**

Returns an array of Quadbins that intersect with the given geography at a given level of detail.

* `geography`: `GEOGRAPHY` geography to extract the Quadbins from.
* `resolution`: `INT64` level of detail or zoom.

**Return type**

`ARRAY<INT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_POLYFILL(
    ST_GEOGFROMTEXT('POLYGON ((-3.71219873428345 40.413365349070865, -3.7144088745117 40.40965661286395, -3.70659828186035 40.409525904775634, -3.71219873428345 40.413365349070865))'),
    17);
-- 5265786693153193983
-- 5265786693163941887
-- 5265786693164466175
-- 5265786693164204031
-- 5265786693164728319
-- 5265786693165514751
```


### QUADBIN_RESOLUTION

{{% bannerNote type="code" %}}
carto.QUADBIN_RESOLUTION(quadbin)
{{%/ bannerNote %}}

**Description**

Returns the resolution of the input Quadbin.

* `quadbin`: `INT64` Quadbin from which to get the resolution.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_RESOLUTION(5209574053332910079);
-- 4
```


### QUADBIN_SIBLING

{{% bannerNote type="code" %}}
carto.QUADBIN_SIBLING(quadbin, direction)
{{%/ bannerNote %}}

**Description**

Returns the Quadbin directly next to the given Quadbin at the same resolution. The direction must be set in the corresponding argument and currently only horizontal/vertical neigbours are supported. It will return `NULL` if the sibling does not exist.

* `quadbin`: `INT64` Quadbin to get the sibling from.
* `direction`: `STRING` <code>'right'|'left'|'up'|'down'</code> direction to move in to extract the next sibling.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_SIBLING(5209574053332910079, 'up');
-- 5208061125333090303
```


### QUADBIN_TOCHILDREN

{{% bannerNote type="code" %}}
carto.QUADBIN_TOCHILDREN(quadbin, resolution)
{{%/ bannerNote %}}

**Description**

Returns an array with the children Quadbins of a given Quadbin for a specific resolution. A children Quadbin is a Quadbin of higher level of detail that is contained by the current Quadbin. Each Quadbin has four direct children (at the next higher resolution).

* `quadbin`: `INT64` Quadbin to get the children from.
* `resolution`: `INT64` resolution of the desired children.

**Return type**

`ARRAY<INT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_TOCHILDREN(5209574053332910079, 5);
-- 5214064458820747263
-- 5214073254913769471
-- 5214068856867258367
-- 5214077652960280575
```


### QUADBIN_TOPARENT

{{% bannerNote type="code" %}}
carto.QUADBIN_TOPARENT(quadbin, resolution)
{{%/ bannerNote %}}

**Description**

Returns the parent (ancestor) Quadbin of a given Quadbin for a specific resolution. An ancestor of a given Quadbin is a Quadbin of smaller resolution that spatially contains it.

* `quadbin`: `INT64` Quadbin to get the parent from.
* `resolution`: `INT64` resolution of the desired parent.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_TOPARENT(5209574053332910079, 3);
-- 5205105638077628415
```


### QUADBIN_TOQUADKEY

{{% bannerNote type="code" %}}
carto.QUADBIN_TOQUADKEY(quadbin)
{{%/ bannerNote %}}

**Description**

Compute a quadkey from a quadbin index.

* `quadbin`: `INT64` Quadbin index.

**Return type**

`STRING`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_TOQUADKEY(5233974874938015743);
-- '0231001222'
```


### QUADBIN_TOZXY

{{% bannerNote type="code" %}}
carto.QUADBIN_TOZXY(quadbin)
{{%/ bannerNote %}}

**Description**

Returns the zoom level `z` and coordinates `x`, `y` for a given Quadbin.

* `quadbin`: `INT64` Quadbin from which to obtain the coordinates.

**Return type**

`STRUCT<INT64, INT64, INT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADBIN_TOZXY(5209574053332910079);
-- z  x  y
-- 4  9  8
```


{{% euFlagFunding %}}