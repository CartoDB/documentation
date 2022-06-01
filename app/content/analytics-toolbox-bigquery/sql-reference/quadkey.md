---
aliases:
    - /analytics-toolbox-bq/sql-reference/quadkey/
---
## quadkey

<div class="badges"><div class="core"></div></div>

You can learn more about quadkeys and quandints in the [Overview section](/spatial-extension-bq/overview/spatial-indexes/#quadkey) of the documentation.

### QUADINT_BBOX

{{% bannerNote type="code" %}}
carto.QUADINT_BBOX(quadint)
{{%/ bannerNote %}}

**Description**

Returns an array with the boundary box of a given quadint. This boundary box contains the minimum and maximum longitude and latitude. The output format is [West-South, East-North] or [min long, min lat, max long, max lat].

* `quadint`: `INT64` quadint to get the bbox from.

**Return type**

`ARRAY<FLOAT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_BBOX(4388);
-- 22.5
-- -21.943045533438177
-- 45.0
-- 0.0
```

### QUADINT_BOUNDARY

{{% bannerNote type="code" %}}
carto.QUADINT_BOUNDARY(quadint)
{{%/ bannerNote %}}

**Description**

Returns the boundary for a given quadint. We extract the boundary in the same way as when we calculate its [QUADINT_BBOX](#quadint_bbox), then enclose it in a GeoJSON and finally transform it into a geography.

* `quadint`: `INT64` quadint to get the boundary geography from.

**Return type**

`GEOGRAPHY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_BOUNDARY(4388);
-- POLYGON((22.5 0, 22.5 -21.9430455334382, 22.67578125 ...
```

### QUADINT_CENTER

{{% bannerNote type="code" %}}
carto.QUADINT_CENTER(quadint)
{{%/ bannerNote %}}

**Description**

Returns the center for a given quadint. The center is defined as the intersection point of the four immediate children quadint. 

* `quadint`: `INT64` quadint to get the center from.

**Return type**

`GEOGRAPHY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_CENTER(4388);
-- POINT(33.75 -11.1784018737118)
```

### QUADINT_FROMGEOGPOINT

{{% bannerNote type="code" %}}
carto.QUADINT_FROMGEOGPOINT(point, resolution)
{{%/ bannerNote %}}

**Description**

Returns the quadint of a given point at a given level of detail.

* `point`: `GEOGRAPHY` point to get the quadint from.
* `resolution`: `INT64` level of detail or zoom.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_FROMGEOGPOINT(ST_GEOGPOINT(40.4168, -3.7038), 4);
-- 4388
```

### QUADINT_FROMLONGLAT

{{% bannerNote type="code" %}}
carto.QUADINT_FROMLONGLAT(longitude, latitude, resolution)
{{%/ bannerNote %}}

**Description**

Returns the quadint representation for a given level of detail and geographic coordinates.

* `longitude`: `FLOAT64` horizontal coordinate of the map.
* `latitude`: `FLOAT64` vertical coordinate of the map.
* `resolution`: `INT64` level of detail or zoom.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_FROMLONGLAT(40.4168, -3.7038, 4);
-- 4388
```

### QUADINT_FROMLONGLAT_ZOOMRANGE

{{% bannerNote type="code" %}}
carto.QUADINT_FROMLONGLAT_ZOOMRANGE(longitude, latitude, zoom_min, zoom_max, zoom_step, resolution)
{{%/ bannerNote %}}

**Description**

Returns the quadint index for the given point for each zoom level requested, at the specified resolution (computed as the current zoom level + the value of `resolution`). The output is an array of structs with the following elements: quadint `id`, zoom level (`z`), and horizontal (`x`) and vertical (`y`) position of the tile. These quadint indexes can be used for grouping and generating aggregations of points throughout the zoom range requested. Notice the use of an additional variable `resolution` for adjusting the desired level of granularity.

* `longitude`: `FLOAT64` horizontal coordinate of the map.
* `latitude`: `FLOAT64` vertical coordinate of the map.
* `zoom_min`: `INT64` minimum zoom to get the quadints from.
* `zoom_max`: `INT64` maximum zoom to get the quadints from.
* `zoom_step`: `INT64` used for skipping levels of zoom.
* `resolution`: `INT64` resolution added to the current zoom to extract the quadints.

**Return type**

`ARRAY<STRUCT<INT64, INT64, INT64>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_FROMLONGLAT_ZOOMRANGE(40.4168, -3.7038, 3, 6, 1, 4);
-- id        z  x   y
-- 268743    3  4   4
-- 1069960   4  9   8
-- 4286249   5  19  16
-- 17124938  6  39  32
```

### QUADINT_FROMQUADKEY

{{% bannerNote type="code" %}}
carto.QUADINT_FROMQUADKEY(quadkey)
{{%/ bannerNote %}}

**Description**

Returns the quadint equivalent to the input quadkey.

* `quadkey`: `STRING` quadkey to be converted to quadint.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_FROMQUADKEY("3001");
-- 4388
```

### QUADINT_FROMZXY

{{% bannerNote type="code" %}}
carto.QUADINT_FROMZXY(z, x, y)
{{%/ bannerNote %}}

**Description**

Returns a quadint from `z`, `x`, `y` coordinates.

* `z`: `INT64` zoom level.
* `x`: `INT64` horizontal position of a tile.
* `y`: `INT64` vertical position of a tile.

**Constraints**

Tile coordinates `x` and `y` depend on the zoom level `z`. For both coordinates, the minimum value is 0, and the maximum value is two to the power of `z`, minus one (`2^z - 1`).

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_FROMZXY(4, 9, 8);
-- 4388
```

### QUADINT_KRING

{{% bannerNote type="code" %}}
carto.QUADINT_KRING(origin, size)
{{%/ bannerNote %}}

**Description**

Returns all cell indexes in a **filled square k-ring** centered at the origin in no particular order.

* `origin`: `INT64` quadint index of the origin.
* `size`: `INT64` size of the ring (distance from the origin).

**Return type**

`ARRAY<INT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_KRING(4388, 1);
-- 3844
-- 3876
-- 3908
-- 4356
-- 4388
-- 4420
-- 4868
-- 4900
-- 4932
```

### QUADINT_KRING_DISTANCES

{{% bannerNote type="code" %}}
carto.QUADINT_KRING_DISTANCES(origin, size)
{{%/ bannerNote %}}

**Description**

Returns all cell indexes and their distances in a **filled square k-ring** centered at the origin in no particular order.

* `origin`: `INT64` quadint index of the origin.
* `size`: `INT64` size of the ring (distance from the origin).

**Return type**

`ARRAY<STRUCT<index INT64, distance INT64>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_KRING_DISTANCES(4388, 1);
-- {"index": "4388", "distance": "0"}
-- {"index": "4932", "distance": "1"}
-- {"index": "4900", "distance": "1"}
-- {"index": "4868", "distance": "1"}
-- {"index": "4420", "distance": "1"}
-- {"index": "4356", "distance": "1"}
-- {"index": "3908", "distance": "1"}
-- {"index": "3876", "distance": "1"}
-- {"index": "3844", "distance": "1"}
```

{{% bannerNote type="note" title="tip"%}}
The distance of the rings is computed as the [Chebyshev distance](https://en.wikipedia.org/wiki/Chebyshev_distance).
{{%/ bannerNote %}}

### QUADINT_POLYFILL

{{% bannerNote type="code" %}}
carto.QUADINT_POLYFILL(geography, resolution)
{{%/ bannerNote %}}

**Description**

Returns an array of quadints that intersect with the given geography at a given level of detail.

* `geography`: `GEOGRAPHY` geography to extract the quadints from.
* `resolution`: `INT64` level of detail or zoom.

**Return type**

`ARRAY<INT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_POLYFILL(
    ST_MAKEPOLYGON(ST_MAKELINE([ST_GEOGPOINT(-363.71219873428345, 40.413365349070865), ST_GEOGPOINT(-363.7144088745117, 40.40965661286395), ST_GEOGPOINT(-363.70659828186035, 40.409525904775634), ST_GEOGPOINT(-363.71219873428345, 40.413365349070865)])), 
    17);
-- 207301334801
-- 207305529105
-- 207305529073
-- 207305529137
-- 207305529169
-- 207301334833
```

### QUADINT_RESOLUTION

{{% bannerNote type="code" %}}
carto.QUADINT_RESOLUTION(quadint)
{{%/ bannerNote %}}

**Description**

Returns the resolution of the input quadint.

* `quadint`: `INT64` quadint from which to get resolution.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_RESOLUTION(4388);
-- 4
```

### QUADINT_SIBLING

{{% bannerNote type="code" %}}
carto.QUADINT_SIBLING(quadint, direction)
{{%/ bannerNote %}}

**Description**

Returns the quadint directly next to the given quadint at the same zoom level. The direction must be sent as argument and currently only horizontal/vertical movements are allowed.

* `quadint`: `INT64` quadint to get the sibling from.
* `direction`: `STRING` <code>'right'|'left'|'up'|'down'</code> direction to move in to extract the next sibling. 

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_SIBLING(4388, 'up');
-- 3876
```

### QUADINT_TOCHILDREN

{{% bannerNote type="code" %}}
carto.QUADINT_TOCHILDREN(quadint, resolution)
{{%/ bannerNote %}}

**Description**

Returns an array with the children quadints of a given quadint for a specific resolution. A children quadint is a quadint of higher level of detail that is contained by the current quadint. Each quadint has four children by definition.

* `quadint`: `INT64` quadint to get the children from.
* `resolution`: `INT64` resolution of the desired children.

**Return type**

`ARRAY<INT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_TOCHILDREN(1155, 4);
-- 4356
-- 4868
-- 4388
-- 4900
```

### QUADINT_TOGEOGPOINT

{{% bannerNote type="code" %}}
carto.QUADINT_TOGEOGPOINT(quadint)
{{%/ bannerNote %}}

**Description**

Returns the centroid for a given quadint.

* `quadint`: `INT64` quadint to get the centroid geography from.

**Return type**

`GEOGRAPHY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_TOGEOGPOINT(4388);
-- 	POINT(33.75 22.2982994295938)
```

### QUADINT_TOPARENT

{{% bannerNote type="code" %}}
carto.QUADINT_TOPARENT(quadint, resolution)
{{%/ bannerNote %}}

**Description**

Returns the parent quadint of a given quadint for a specific resolution. A parent quadint is the smaller resolution containing quadint.

* `quadint`: `INT64` quadint to get the parent from.
* `resolution`: `INT64` resolution of the desired parent.

**Return type**

`INT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_TOPARENT(4388, 3);
-- 1155
```

### QUADINT_TOQUADKEY

{{% bannerNote type="code" %}}
carto.QUADINT_TOQUADKEY(quadint)
{{%/ bannerNote %}}

**Description**

Returns the quadkey equivalent to the input quadint.

* `quadint`: `INT64` quadint to be converted to quadkey.

**Return type**

`STRING`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_TOQUADKEY(4388);
-- 3001
```

### QUADINT_TOZXY

{{% bannerNote type="code" %}}
carto.QUADINT_TOZXY(quadint)
{{%/ bannerNote %}}

**Description**

Returns the zoom level `z` and coordinates `x`, `y` for a given quadint.

* `quadint`: `INT64` quadint we want to extract tile information from.

**Return type**

`STRUCT<INT64, INT64, INT64>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.QUADINT_TOZXY(4388);
-- z  x  y
-- 4  9  8
```

{{% euFlagFunding %}}
