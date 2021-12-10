## quadkey

<div class="badges"><div class="core"></div></div>

You can learn more about quadkeys and quandints in the [Overview section](/spatial-extension-rs/overview/spatial-indexes/#quadkey) of the documentation.


### BBOX

{{% bannerNote type="code" %}}
quadkey.BBOX(quadint)
{{%/ bannerNote %}}

**Description**

Returns an array with the boundary box of a given quadint. This boundary box contains the minimum and maximum longitude and latitude. The output format is [West-South, East-North] or [min long, min lat, max long, max lat].

* `quadint`: `BIGINT` quadint to get the bbox from.

**Return type**

`SUPER`

**Example**

```sql
SELECT quadkey.BBOX(4388);
-- 22.5
-- -21.943045533438177
-- 45.0
-- 0.0
```

### KRING

{{% bannerNote type="code" %}}
quadkey.KRING(origin, size)
{{%/ bannerNote %}}

**Description**

Returns all cell indexes in a **filled square k-ring** centered at the origin in no particular order.

* `origin`: `BIGINT` quadint index of the origin.
* `size`: `INT` size of the ring (distance from the origin).

**Return type**

`SUPER`

**Example**

```sql
SELECT quadkey.KRING(4388, 1);
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

### KRING_DISTANCES

{{% bannerNote type="code" %}}
quadkey.KRING_DISTANCES(origin, size)
{{%/ bannerNote %}}

**Description**

Returns all cell indexes and their distances in a **filled square k-ring** centered at the origin in no particular order.

* `origin`: `BIGINT` quadint index of the origin.
* `size`: `INT` size of the ring (distance from the origin).

**Return type**

`ARRAY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT quadkey.KRING_DISTANCES(4388, 1);
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

### LONGLAT_ASQUADINT

{{% bannerNote type="code" %}}
quadkey.LONGLAT_ASQUADINT(longitude, latitude, resolution)
{{%/ bannerNote %}}

**Description**

Returns the quadint representation for a given level of detail and geographic coordinates.

* `longitude`: `FLOAT8` horizontal coordinate of the map.
* `latitude`: `FLOAT8` vertical coordinate of the map.
* `resolution`: `INT` level of detail or zoom.

**Return type**

`BIGINT`

**Example**

```sql
SELECT quadkey.LONGLAT_ASQUADINT(40.4168, -3.7038, 4);
-- 4388
```

### QUADINT_FROMQUADKEY

{{% bannerNote type="code" %}}
quadkey.QUADINT_FROMQUADKEY(quadkey)
{{%/ bannerNote %}}

**Description**

Returns the quadint equivalent to the input quadkey.

* `quadkey`: `VARCHAR` quadkey to be converted to quadint.

**Return type**

`BIGINT`

**Example**

```sql
SELECT quadkey.QUADINT_FROMQUADKEY('3001');
-- 4388
```

### QUADINT_FROMZXY

{{% bannerNote type="code" %}}
quadkey.QUADINT_FROMZXY(z, x, y)
{{%/ bannerNote %}}

**Description**

Returns a quadint from `z`, `x`, `y` coordinates.

* `z`: `INT` zoom level.
* `x`: `INT` horizontal position of a tile.
* `y`: `INT` vertical position of a tile.

**Constraints**

Tile coordinates `x` and `y` depend on the zoom level `z`. For both coordinates, the minimum value is 0, and the maximum value is two to the power of `z`, minus one (`2^z - 1`).

**Return type**

`BIGINT`

**Example**

```sql
SELECT quadkey.QUADINT_FROMZXY(4, 9, 8);
-- 4388
```

### QUADKEY_FROMQUADINT

{{% bannerNote type="code" %}}
quadkey.QUADKEY_FROMQUADINT(quadint)
{{%/ bannerNote %}}

**Description**

Returns the quadkey equivalent to the input quadint.

* `quadint`: `BIGINT` quadint to be converted to quadkey.

**Return type**

`VARCHAR`

**Example**

```sql
SELECT quadkey.QUADKEY_FROMQUADINT(4388);
-- 3001
```

### SIBLING

{{% bannerNote type="code" %}}
quadkey.SIBLING(quadint, direction)
{{%/ bannerNote %}}

**Description**

Returns the quadint directly next to the given quadint at the same zoom level. The direction must be sent as argument and currently only horizontal/vertical movements are allowed.

* `quadint`: `BIGINT` quadint to get the sibling from.
* `direction`: `VARCHAR` <code>'right'|'left'|'up'|'down'</code> direction to move in to extract the next sibling. 

**Return type**

`BIGINT`

**Example**

```sql
SELECT quadkey.SIBLING(4388, 'up');
-- 3876
```

### ST_ASQUADINT

{{% bannerNote type="code" %}}
quadkey.ST_ASQUADINT(point, resolution)
{{%/ bannerNote %}}

**Description**

Returns the quadint of a given point at a given level of detail.

* `point`: `GEOMETRY` point to get the quadint from.
* `resolution`: `INT` level of detail or zoom.

**Return type**

`BIGINT`

**Example**

```sql
SELECT quadkey.ST_ASQUADINT(ST_POINT(40.4168, -3.7038), 4);
-- 4388
```

### ST_ASQUADINT_POLYFILL

{{% bannerNote type="code" %}}
quadkey.ST_ASQUADINT_POLYFILL(geography, resolution)
{{%/ bannerNote %}}

**Description**

Returns an array of quadints that intersect with the given geography at a given level of detail.

* `geography`: `GEOMETRY` geography to extract the quadints from.
* `resolution`: `INT` level of detail or zoom.

**Return type**

`SUPER`

**Example**

```sql
SELECT quadkey.ST_ASQUADINT_POLYFILL(ST_MAKEPOLYGON(ST_GeomFromText('LINESTRING(-3.71219873428345 40.4133653490709, -3.71440887451172 40.4096566128639, -3.70659828186035 40.4095259047756, -3.71219873428345 40.4133653490709)')), 17);
-- 207301334833
-- 207301334801
-- 207305529073
-- 207305529105
-- 207305529137
-- 207305529169
```

### ST_BOUNDARY

{{% bannerNote type="code" %}}
quadkey.ST_BOUNDARY(quadint)
{{%/ bannerNote %}}

**Description**

Returns the boundary for a given quadint. We extract the boundary in the same way as when we calculate its [BBOX](#bbox), then enclose it in a GeoJSON and finally transform it into a geography.

* `quadint`: `BIGINT` quadint to get the boundary geography from.

**Return type**

`GEOMETRY`

**Example**

```sql
SELECT quadkey.ST_BOUNDARY(4388);
-- {'type': 'Polygon', 'coordinates': [[[22.5, -21.943045533438177], [22.5, 0.0], ...
```

### TOCHILDREN

{{% bannerNote type="code" %}}
quadkey.TOCHILDREN(quadint, resolution)
{{%/ bannerNote %}}

**Description**

Returns an array with the children quadints of a given quadint for a specific resolution. A children quadint is a quadint of higher level of detail that is contained by the current quadint. Each quadint has four children by definition.

* `quadint`: `BIGINT` quadint to get the children from.
* `resolution`: `INT` resolution of the desired children.

**Return type**

`ARRAY`

**Example**

```sql
SELECT quadkey.TOCHILDREN(1155, 4);
-- 4356
-- 4868
-- 4388
-- 4900
```

### TOPARENT

{{% bannerNote type="code" %}}
quadkey.TOPARENT(quadint, resolution)
{{%/ bannerNote %}}

**Description**

Returns the parent quadint of a given quadint for a specific resolution. A parent quadint is the smaller resolution containing quadint.

* `quadint`: `BIGINT` quadint to get the parent from.
* `resolution`: `INT` resolution of the desired parent.

**Return type**

`BIGINT`

**Example**

```sql
SELECT quadkey.TOPARENT(4388, 3);
-- 1155
```

### VERSION

{{% bannerNote type="code" %}}
quadkey.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the quadkey module.

**Return type**

`VARCHAR`

**Example**

```sql
SELECT quadkey.VERSION();
-- 1.0.1
```

### ZXY_FROMQUADINT

{{% bannerNote type="code" %}}
quadkey.ZXY_FROMQUADINT(quadint)
{{%/ bannerNote %}}

**Description**

Returns the zoom level `z` and coordinates `x`, `y` for a given quadint.

* `quadint`: `BIGINT` quadint we want to extract tile information from.

**Return type**

`SUPER`

**Example**

```sql
SELECT quadkey.ZXY_FROMQUADINT(4388);
-- z  x  y
-- 4  9  8
```