## quadbin

<div class="badges"><div class="core"></div></div>

You can learn more about quadbins in the [Overview section](/analytics-toolbox-redshift/overview/spatial-indexes/#quadbin) of the documentation.

### QUADBIN_BBOX

{{% bannerNote type="code" %}}
carto.QUADBIN_BBOX(quadbin)
{{%/ bannerNote %}}

**Description**

Returns an array with the boundary box of a given quadbin. This boundary box contains the minimum and maximum longitude and latitude. The output format is [West-South, East-North] or [min long, min lat, max long, max lat].

* `quadbin`: `BIGINT` quadbin to get the boundary box from.

**Return type**

`SUPER`

**Example**

```sql
SELECT carto.QUADBIN_BBOX(5209574053332910079);
-- 22.5
-- -21.943045533438177
-- 45.0
-- 0.0
```

### QUADBIN_BOUNDARY

{{% bannerNote type="code" %}}
carto.QUADBIN_BOUNDARY(quadbin)
{{%/ bannerNote %}}

**Description**

Returns the boundary for a given quadbin. We extract the boundary in the same way as when we calculate its [QUADBIN_BBOX](#quadbin_bbox), then enclose it in a GeoJSON and finally transform it into a geography.

* `quadbin`: `BIGINT` quadbin to get the boundary geography from.

**Return type**

`VARCHAR`

**Example**

```sql
SELECT carto.QUADBIN_BOUNDARY(5209574053332910079);
-- POLYGON ((22.5 -21.9430455334, 22.5 0, 45 0, 45 -21.9430455334, 22.5 -21.9430455334))
```

### QUADBIN_CENTER

{{% bannerNote type="code" %}}
carto.QUADBIN_CENTER(quadbin)
{{%/ bannerNote %}}

**Description**

Returns the center for a given quadbin. The center is defined as the intersection point of the four immediate children quadbin.

* `quadbin`: `BIGINT` quadbin to get the center from.

**Return type**

`GEOMETRY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT carto.QUADBIN_CENTER(5209574053332910079);
-- POINT (33.75 -10.9715227667)
```

### QUADBIN_FROMGEOGPOINT

{{% bannerNote type="code" %}}
carto.QUADBIN_FROMGEOGPOINT(point, resolution)
{{%/ bannerNote %}}

**Description**

Returns the quadbin of a given point at a given level of detail.

* `point`: `GEOMETRY` point to get the quadbin from.
* `resolution`: `INT` level of detail or zoom.

**Return type**

`BIGINT`

**Example**

```sql
SELECT carto.QUADBIN_FROMGEOGPOINT(ST_POINT(40.4168, -3.7038), 4);
-- 5209574053332910079
```

### QUADBIN_FROMLONGLAT

{{% bannerNote type="code" %}}
carto.QUADBIN_FROMLONGLAT(longitude, latitude, resolution)
{{%/ bannerNote %}}

**Description**

Returns the quadbin representation for a given level of detail and geographic coordinates.

* `longitude`: `FLOAT8` horizontal coordinate of the map.
* `latitude`: `FLOAT8` vertical coordinate of the map.
* `resolution`: `INT` level of detail or zoom.

**Return type**

`BIGINT`

**Example**

```sql
SELECT carto.QUADBIN_FROMLONGLAT(40.4168, -3.7038, 4);
-- 5209574053332910079
```

### QUADBIN_FROMZXY

{{% bannerNote type="code" %}}
carto.QUADBIN_FROMZXY(z, x, y)
{{%/ bannerNote %}}

**Description**

Returns a quadbin from `z`, `x`, `y` coordinates.

* `z`: `BIGINT` zoom level.
* `x`: `BIGINT` horizontal position of a tile.
* `y`: `BIGINT` vertical position of a tile.

**Constraints**

Tile coordinates `x` and `y` depend on the zoom level `z`. For both coordinates, the minimum value is 0, and the maximum value is two to the power of `z`, minus one (`2^z - 1`).

**Return type**

`BIGINT`

**Example**

```sql
SELECT carto.QUADBIN_FROMZXY(4, 9, 8);
-- 5209574053332910079
```

### QUADBIN_ISVALID

{{% bannerNote type="code" %}}
carto.QUADBIN_ISVALID(quadbin)
{{%/ bannerNote %}}

**Description**

Returns `true` when the given index is valid, `false` otherwise.

* `quadbin`: `BIGINT` quadbin index.

**Return type**

`BOOLEAN`

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

```sql
SELECT carto.QUADBIN_ISVALID(5209574053332910079);
-- true
```

```sql
SELECT carto.QUADBIN_ISVALID(1234);
-- false
```

### QUADBIN_KRING

{{% bannerNote type="code" %}}
carto.QUADBIN_KRING(origin, size)
{{%/ bannerNote %}}

**Description**

Returns all cell indexes in a **filled square k-ring** centered at the origin in no particular order.

* `origin`: `BIGINT` quadbin index of the origin.
* `size`: `INT` size of the ring (distance from the origin).

**Return type**

`SUPER`

**Example**

```sql
SELECT carto.QUADBIN_KRING(5209574053332910079, 1);
-- 5208043533147045887
-- 5208061125333090303
-- 5208113901891223551
-- 5209556461146865663
-- 5209574053332910079
-- 5209626829891043327
-- 5209591645518954495
-- 5209609237704998911
-- 5209662014263132159
```

### QUADBIN_KRING_DISTANCES

{{% bannerNote type="code" %}}
carto.QUADBIN_KRING_DISTANCES(origin, size)
{{%/ bannerNote %}}

**Description**

Returns all cell indexes and their distances in a **filled square k-ring** centered at the origin in no particular order.

* `origin`: `BIGINT` quadbin index of the origin.
* `size`: `INT` size of the ring (distance from the origin).

**Return type**

`SUPER`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT carto.QUADBIN_KRING_DISTANCES(5209574053332910079, 1);
-- {"index":5208043533147045887,"distance":1}
-- {"index":5208061125333090303,"distance":1}
-- {"index":5208113901891223551,"distance":1}
-- {"index":5209556461146865663,"distance":1}
-- {"index":5209574053332910079,"distance":0}
-- {"index":5209626829891043327,"distance":1}
-- {"index":5209591645518954495,"distance":1}
-- {"index":5209609237704998911,"distance":1}
-- {"index":5209662014263132159,"distance":1}
```

{{% bannerNote type="note" title="tip"%}}
The distance of the rings is computed as the [Chebyshev distance](https://en.wikipedia.org/wiki/Chebyshev_distance).
{{%/ bannerNote %}}

### QUADBIN_POLYFILL

{{% bannerNote type="code" %}}
carto.QUADBIN_POLYFILL(geography, resolution)
{{%/ bannerNote %}}

**Description**

Returns an array of quadbins that intersect with the given geography at a given level of detail.

* `geography`: `GEOMETRY` geography to extract the quadbins from.
* `resolution`: `INT` level of detail or zoom.

**Return type**

`SUPER`

**Example**

```sql
SELECT carto.QQUADBIN_POLYFILL(ST_GeomFromText('POLYGON ((-3.71219873428345 40.413365349070865, -3.7144088745117 40.40965661286395, -3.70659828186035 40.409525904775634, -3.71219873428345 40.413365349070865))'), 17);
-- 5265786693164204031
-- 5265786693163941887
-- 5265786693153193983
-- 5265786693164466175
-- 5265786693164728319
-- 5265786693165514751
```

### QUADBIN_RESOLUTION

{{% bannerNote type="code" %}}
carto.QUADBIN_RESOLUTION(quadbin)
{{%/ bannerNote %}}

**Description**

Returns the resolution of the input quadbin.

* `quadbin`: `INT64` quadbin from which to get resolution.

**Return type**

`BIGINT`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT carto.QUADBIN_RESOLUTION(5209574053332910079);
-- 4
```

### QUADBIN_SIBLING

{{% bannerNote type="code" %}}
carto.QUADBIN_SIBLING(quadbin, direction)
{{%/ bannerNote %}}

**Description**

Returns the quadbin directly next to the given quadbin at the same zoom level. The direction must be included as an argument and currently only horizontal/vertical movements are allowed.

* `quadbin`: `BIGINT` quadbin to get the sibling from.
* `direction`: `VARCHAR` <code>'right'|'left'|'up'|'down'</code> direction to move in to extract the next sibling. 

**Return type**

`BIGINT`

**Example**

```sql
SELECT carto.QUADBIN_SIBLING(5209574053332910079, 'up');
-- 5208061125333090303
```

### QUADBIN_TOCHILDREN

{{% bannerNote type="code" %}}
carto.QUADBIN_TOCHILDREN(quadbin, resolution)
{{%/ bannerNote %}}

**Description**

Returns an array with the children quadbins of a given quadbin for a specific resolution. A children quadbin is a quadbin of higher level of detail that is contained within the current quadbin. Each quadbin has four children by definition.

* `quadbin`: `BIGINT` quadbin to get the children from.
* `resolution`: `INT` resolution of the desired children.

**Return type**

`ARRAY`

**Example**

```sql
SELECT carto.QUADBIN_TOCHILDREN(5209574053332910079, 5);
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

Returns the parent quadbin of a given quadbin for a specific resolution. A parent quadbin is the smaller resolution containing quadbin.

* `quadbin`: `BIGINT` quadbin to get the parent from.
* `resolution`: `INT` resolution of the desired parent.

**Return type**

`BIGINT`

**Example**

```sql
SELECT carto.QUADBIN_TOPARENT(5209574053332910079, 3);
-- 5205105638077628415
```

### QUADBIN_TOZXY

{{% bannerNote type="code" %}}
carto.QUADBIN_TOZXY(quadbin)
{{%/ bannerNote %}}

**Description**

Returns the zoom level `z` and coordinates `x`, `y` for a given quadbin.

* `quadbin`: `BIGINT` quadbin we want to extract tile information from.

**Return type**

`SUPER`

**Example**

```sql
SELECT carto.QUADBIN_TOZXY(5209574053332910079);
-- z  x  y
-- 4  9  8
```