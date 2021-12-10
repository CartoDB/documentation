## constructors

<div class="badges"><div class="core"></div></div>

This module contains functions that create geographies from coordinates or already existing geographies.

### ST_BEZIERSPLINE

{{% bannerNote type="code" %}}
constructors.ST_BEZIERSPLINE(geog [, resolution] [, sharpness])
{{%/ bannerNote %}}

**Description**

Takes a line and returns a curved version by applying a Bezier spline algorithm.

* `geog`: `GEOMETRY` input LineString.
* `resolution` (optional): `INT` time in milliseconds between points. By default `resolution` is `10000`.
* `sharpness` (optional): `FLOAT8` a measure of how curvy the path should be between splines. By default `sharpness` is `0.85`.

**Return type**

`VARCHAR(MAX)`

**Examples**

```sql
SELECT constructors.ST_BEZIERSPLINE(ST_GEOMFROMTEXT('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'));
-- {"type": "LineString", "coordinates": [[-76.091308, 18.427501], [-76.09134585033101, 18.427508082543092], ... 
```


```sql
SELECT constructors.ST_BEZIERSPLINE(ST_GEOMFROMTEXT('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'), 10000);
-- {"type": "LineString", "coordinates": [[-76.091308, 18.427501], [-76.09134585033101, 18.427508082543092], ...
```

```sql
SELECT constructors.ST_BEZIERSPLINE(ST_GEOMFROMTEXT('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'), 10000, 0.9);
-- {"type": "LineString", "coordinates": [[-76.091308, 18.427501], [-76.09134541990707, 18.42750717125151], ... 
```

### ST_MAKEELLIPSE

{{% bannerNote type="code" %}}
constructors.ST_MAKEELLIPSE(geog, xSemiAxis, ySemiAxis [, angle] [, units] [, steps])
{{%/ bannerNote %}}

**Description**

Takes a Point and calculates the ellipse polygon given two semi-axes expressed in variable units and steps for precision.

* `center`: `GEOMETRY` center point.
* `xSemiAxis`: `FLOAT8` semi (major) axis of the ellipse along the x-axis.
* `ySemiAxis`: `FLOAT8` semi (minor) axis of the ellipse along the y-axis.
* `angle` (optional): `FLOAT8` angle of rotation (along the vertical axis), from North in decimal degrees, negative clockwise. By default `angle` is `0`.
* `units` (optional): `VARCHAR(10)` units of length, the supported options are: miles, kilometers, meters, and degrees. By default `units` is `kilometers`.
* `steps` (optional): `INT` number of steps. By default `steps` is `64`.

**Return type**

`VARCHAR(MAX)`

**Examples**

```sql
SELECT constructors.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3);
-- {"type": "Polygon", "coordinates": [[[-73.87922034627275, 40.6643], [-73.88056149301754, 40.67000644486112], ...
```

```sql
SELECT constructors.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3, -30);
-- {"type": "Polygon", "coordinates": [[[-73.88703173808466, 40.68643711664552], [-73.89195608204625, 40.69086946050236], ...
```

```sql
SELECT constructors.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3, -30, 'miles');
-- {"type": "Polygon", "coordinates": [[[-73.85566162723387, 40.69992623586439], [-73.86358797643032, 40.707058494394765], ...
```

```sql
SELECT constructors.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3, -30, 'miles', 80);
-- {"type": "Polygon", "coordinates": [[[-73.8557003345262, 40.70003619338248], [-73.86178810440265, 40.705912341919415], ...
```

### ST_MAKEENVELOPE

{{% bannerNote type="code" %}}
constructors.ST_MAKEENVELOPE(xmin, ymin, xma, ymax)
{{%/ bannerNote %}}

**Description**
Creates a rectangular Polygon from the minimum and maximum values for X and Y.

* `xmin`: `FLOAT8` minimum value for X.
* `ymin`: `FLOAT8` minimum value for Y.
* `xmax`: `FLOAT8` maximum value for X.
* `ymax`: `FLOAT8` maximum value for Y.

**Return type**

`GEOMETRY`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT constructors.ST_MAKEENVELOPE(0,0,1,1);
-- POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0)) 
```

### ST_TILEENVELOPE

{{% bannerNote type="code" %}}
constructors.ST_TILEENVELOPE(zoomLevel, xTile, yTile)
{{%/ bannerNote %}}

**Description**
Returns the boundary polygon of a tile given its zoom level and its X and Y indices.

* `zoomLevel`: `INT` zoom level of the tile.
* `xTile`: `INT` X index of the tile.
* `yTile`: `INT` Y index of the tile.

**Return type**

`VARCHAR`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT constructors.ST_TILEENVELOPE(10, 384, 368);
-- {'type': 'Polygon', 'coordinates': [[[-45.0, 44.84029065139799], [-45.0, 45.089035564831015], ...
```

### VERSION

{{% bannerNote type="code" %}}
constructors.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the constructors module.

**Return type**

`VARCHAR`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT constructors.VERSION();
-- 1.0.0
```