---
aliases:
    - /analytics-toolbox-bq/sql-reference/constructors/
---
## constructors

<div class="badges"><div class="core"></div></div>

This module contains functions that create new geographies from coordinates or already existing geographies.


### ST_BEZIERSPLINE

{{% bannerNote type="code" %}}
carto.ST_BEZIERSPLINE(geog, resolution, sharpness)
{{%/ bannerNote %}}

**Description**

Takes a line and returns a curved version of it by applying a Bezier spline algorithm. Note that the resulting geography will be a LineString with additional points inserted.

* `geog`: `GEOGRAPHY` input LineString.
* `resolution`: `INT64`|`NULL` total time in milliseconds assigned to the line. If `NULL` the default value `10000` is used. Internal curve vertices are generated in 10 ms increments, so the maximum number of resulting points will be `resolution/10` (close points may be merged resulting in less points). A higher number will increase the accuracy of the result but will increase the computation time and number of points.
* `sharpness`: `FLOAT64`|`NULL` a measure of how curvy the path should be between splines. If `NULL` the default value `0.85` is used.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.ST_BEZIERSPLINE(
  ST_GEOGFROMTEXT(
    "LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)"
  ),
  10000,
  0.9
);
-- LINESTRING(-76.091308 18.427501, -76.0916216712943 ...
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Identifying earthquake-prone areas in the state of California](/analytics-toolbox-bigquery/examples/identifying-earthquake-prone-areas-in-the-state-of-california/)
{{%/ bannerNote %}}


### ST_MAKEELLIPSE

{{% bannerNote type="code" %}}
carto.ST_MAKEELLIPSE(geog, xSemiAxis, ySemiAxis, angle, units, steps)
{{%/ bannerNote %}}

**Description**

Takes a Point and calculates the ellipse polygon given two semi-axes expressed in variable units and steps for precision.

* `center`: `GEOGRAPHY` center point.
* `xSemiAxis`: `FLOAT64` semi (major) axis of the ellipse along the x-axis.
* `ySemiAxis`: `FLOAT64` semi (minor) axis of the ellipse along the y-axis.
* `angle`: `FLOAT64`|`NULL` angle of rotation (along the vertical axis), from North in decimal degrees, negative clockwise. If `NULL` the default value `0` is used.
* `units`: `STRING`|`NULL` units of length, the supported options are: miles, kilometers, and degrees. If `NULL`the default value `kilometers` is used.
* `steps`: `INT64`|`NULL` number of steps. If `NULL` the default value `64` is used.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.ST_MAKEELLIPSE(
  ST_GEOGPOINT(-73.9385,40.6643),
  5,
  3,
  -30,
  "miles",
  80
);
-- POLYGON((-73.8558575786687 40.7004828957859 ...
```


### ST_MAKEENVELOPE

{{% bannerNote type="code" %}}
carto.ST_MAKEENVELOPE(xmin, ymin, xmax, ymax)
{{%/ bannerNote %}}

**Description**
Creates a rectangular Polygon from the minimum and maximum values for X and Y.

* `xmin`: `FLOAT64` minimum value for X.
* `ymin`: `FLOAT64` minimum value for Y.
* `xmax`: `FLOAT64` maximum value for X.
* `ymax`: `FLOAT64` maximum value for Y.

**Return type**

`GEOGRAPHY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.ST_MAKEENVELOPE(0,0,1,1);
-- POLYGON((1 0, 1 1, 0 1, 0 0, 1 0))
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Identifying earthquake-prone areas in the state of California](/analytics-toolbox-bigquery/examples/identifying-earthquake-prone-areas-in-the-state-of-california/)
{{%/ bannerNote %}}


### ST_TILEENVELOPE

{{% bannerNote type="code" %}}
carto.ST_TILEENVELOPE(zoomLevel, xTile, yTile)
{{%/ bannerNote %}}

**Description**
Returns the boundary polygon of a [tile](https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames) given its zoom level and its X and Y indices.

* `zoomLevel`: `INT64` zoom level of the tile.
* `xTile`: `INT64` X index of the tile.
* `yTile`: `INT64` Y index of the tile.

**Return type**

`GEOGRAPHY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-os`.carto.ST_TILEENVELOPE(10,384,368);
-- POLYGON((-45 45.089035564831, -45 44.840290651398, -44.82421875 44.840290651398, -44.6484375 44.840290651398, -44.6484375 45.089035564831, -44.82421875 45.089035564831, -45 45.089035564831))
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Census areas in the UK within tiles of multiple resolutions](/analytics-toolbox-bigquery/examples/census-areas-in-the-uk-within-tiles-of-multiple-resolutions/)
{{%/ bannerNote %}}


{{% euFlagFunding %}}