## quadkey

You can learn more about quadkeys in the [documentation](/spatial-extension-bq/spatial-indexes/overview/spatial-indexes/#quadkeys). 
### QUADINT_FROMZXY

{{% bannerNote type="code" %}}
bqcarto.quadkey.QUADINT_FROMZXY(z, x, y)
{{%/ bannerNote %}}

**Description**

Computes quadint from Z, X, Y coordinates.

* `z`: `INT64` zoom level.
* `x`: `INT64` horizontal position of a tile.
* `y`: `INT64` vertical position of a tile.

**Return type**

`INT64`

**Examples**

```sql
SELECT bqcartost.quadkey.QUADINT_FROMZXY(1, 2, 3);
-- 193
```

### ZXY_FROMQUADINT

{{% bannerNote type="code" %}}
bqcarto.quadkey.ZXY_FROMQUADINT(quadint)
{{%/ bannerNote %}}

**Description**

Computes zoom level `z` and coordinates `x`, `y` for a given quadint.

* `quadint`: `INT64` quadint we want to extract tile information from.

**Return type**

`STRUCT<INT64, INT64, INT64>`

**Examples**

```sql
SELECT bqcarto.quadkey.ZXY_FROMQUADINT(193);
-- z  x  y
-- 1  0  3
```

### LONGLAT_ASQUADINT

{{% bannerNote type="code" %}}
bqcarto.quadkey.LONGLAT_ASQUADINT(longitude, latitude, resolution)
{{%/ bannerNote %}}

* `longitude`: `FLOAT64` horizontal coordinate of the map.
* `latitude`: `FLOAT64` vertical coordinate of the map.
* `resolution`: `INT64` level of detail or zoom.

Returns the `INT64` quadint representation for a given level of detail and geographic coordinates.

### QUADINT_FROMQUADKEY

{{% bannerNote type="code" %}}
bqcarto.quadkey.QUADINT_FROMQUADKEY(quadkey)
{{%/ bannerNote %}}

* `quadkey`: `STRING` quadkey to be converted to quadint.

Returns the `INT64` quadint equivalent to the input bqcarto.quadkey.

### QUADKEY_FROMQUADINT

{{% bannerNote type="code" %}}
bqcarto.quadkey.QUADKEY_FROMQUADINT(quadint)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to be converted to bqcarto.quadkey.

Returns the `STRING` quadkey equivalent to the input quadint.

### TOPARENT

{{% bannerNote type="code" %}}
bqcarto.quadkey.TOPARENT(quadint, resolution)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the parent from.
* `resolution`: `INT64` resolution of the desired parent.

Returns the parent `IN64` quadint of a given quadint for a specific resolution. A parent quadint is the smaller resolution containing quadint.

### TOCHILDREN

{{% bannerNote type="code" %}}
bqcarto.quadkey.TOCHILDREN(quadint, resolution)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the children from.
* `resolution`: `INT64` resolution of the desired children.

Returns an `ARRAY` with the children `INT64` quadints of a given quadint for a specific resolution. A children quadint is a quadint of higher level of detail that is contained by the current quadint. Each quadint has four children by definition.

### SIBLING

{{% bannerNote type="code" %}}
bqcarto.quadkey.SIBLING(quadint, direction)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the sibling from.
* `direction`: `STRING` <code>'right'|'left'|'up'|'down'</code> direction to move in to extract the next sibling. 

Returns the `INT64` quadint directly next to the given quadint at the same zoom level. The direction must be sent as argument and currently only horizontal/vertical movements are allowed.

### KRING

{{% bannerNote type="code" %}}
bqcarto.quadkey.KRING(quadint, distance)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the KRING from.
* `distance`: `INT64` distance (in cells) to the source.

Returns an `ARRAY` containing all the `INT64` quadints directly next to the given quadint at the same level of zoom. Diagonal, horizontal and vertical nearby quadints plus the current quadint are considered, so KRING always returns `(distance*2 + 1)^2` quadints.

### BBOX

{{% bannerNote type="code" %}}
bqcarto.quadkey.BBOX(quadint INT64)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the bbox from.

Returns an `ARRAY` with the boundary box of a given quadint. This boundary box contains the minimum and maximum longitude and latitude as `FLOAT64`. The output format is [West-South, East-North] or [min long, min lat, max long, max lat].

### ST_ASQUADINT

{{% bannerNote type="code" %}}
bqcarto.quadkey.ST_ASQUADINT(point, resolution)
{{%/ bannerNote %}}

* `point`: `GEOGRAPHY` POINT to get the quadint from.
* `resolution`: `INT64` level of detail or zoom.

Returns the `INT64` quadint of a given point at a given level of detail.

### ST_ASQUADINT_POLYFILL

{{% bannerNote type="code" %}}
bqcarto.quadkey.ST_ASQUADINT_POLYFILL(geo, resolution)
{{%/ bannerNote %}}

* `geo`: `GEOGRAPHY` geography to extract the quadints from.
* `resolution`: `INT64` level of detail or zoom.

Returns an `ARRAY` of `INT64` quadints fully contained by the given geography at a given level of detail.

### ST_GEOGFROMQUADINT_BOUNDARY

{{% bannerNote type="code" %}}
bqcarto.quadkey.ST_GEOGFROMQUADINT_BOUNDARY(quadint)
{{%/ bannerNote %}}

* `quadint`: `INT64` quadint to get the boundary geography from.

Returns the `GEOGRAPHY` boundary for a given quadint. We extract the boundary in the same way as when we calculate its [bbox](/spatial-extension-bq/reference/#quadkeybbox), then enclose it in a GeoJSON and finally transform it into a geography.

### LONGLAT_ASQUADINTLIST_RESOLUTION

{{% bannerNote type="code" %}}
bqcarto.quadkey.LONGLAT_ASQUADINTLIST_RESOLUTION(longitude FLOAT64, latitude FLOAT64, __zoom_min INT64, __zoom_max INT64, __zoom_step INT64, __resolution INT64) -> ARRAY< STRUCT < id INT64, z INT64, x INT64, y INT64 > >
{{%/ bannerNote %}}

* `longitude`: `FLOAT64` horizontal coordinate of the map.
* `latitude`: `FLOAT64` vertical coordinate of the map.
* `zoom_min`: `INT64` minimum zoom to get the quadints from.
* `zoom_max`: `INT64` maximum zoom to get the quadints from.
* `zoom_step`: `INT64` used for skipping levels of zoom.
* `resolution`: `INT64` resolution added to the current zoom to extract the quadints.

Returns the quadint index for the given point for each zoom level requested, at the specified resolution (computed as the current zoom level + the value of `resolution`). The output is an `ARRAY` of `STRUCT` with the following elements: quadint `id`, zoom level (`z`), and horizontal (`x`) and vertical (`y`) position of the tile. These quadint indexes can be used for grouping and generating aggregations of points throughout the zoom range requested. Notice the use of an additional variable `resolution` for adjusting the desired level of granularity.

### VERSION

{{% bannerNote type="code" %}}
bqcarto.quadkey.VERSION()
{{%/ bannerNote %}}

Returns the current version of the quadkey library as a `INT64`.
