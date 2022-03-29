## constructors

<div class="badges"><div class="core"></div></div>

This module contains functions that create geographies from coordinates or already existing geographies.

### ST_BEZIERSPLINE

{{% bannerNote type="code" %}}
carto.ST_BEZIERSPLINE(geog [, resolution] [, sharpness])
{{%/ bannerNote %}}

**Description**

Takes a line as input and returns a curved version by applying a Bezier spline algorithm.

* `geog`: `GEOMETRY` input LineString.
* `resolution` (optional): `INT` time in milliseconds between points. If not specified, the default value of `10000` will be used.
* `sharpness` (optional): `FLOAT8` a measure of how curvy the path should be between splines. If not specified, the default value of `0.85` will be used.

**Return type**

`VARCHAR(MAX)`

**Examples**

```sql
SELECT carto.ST_BEZIERSPLINE(ST_GEOMFROMTEXT('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'));
-- {"type": "LineString", "coordinates": [[-76.091308, 18.427501], [-76.09134585033101, 18.427508082543092], ... 
```


```sql
SELECT carto.ST_BEZIERSPLINE(ST_GEOMFROMTEXT('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'), 10000);
-- {"type": "LineString", "coordinates": [[-76.091308, 18.427501], [-76.09134585033101, 18.427508082543092], ...
```

```sql
SELECT carto.ST_BEZIERSPLINE(ST_GEOMFROMTEXT('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'), 10000, 0.9);
-- {"type": "LineString", "coordinates": [[-76.091308, 18.427501], [-76.09134541990707, 18.42750717125151], ... 
```

### ST_MAKEELLIPSE

{{% bannerNote type="code" %}}
carto.ST_MAKEELLIPSE(geog, xSemiAxis, ySemiAxis [, angle] [, units] [, steps])
{{%/ bannerNote %}}

**Description**

Takes a Point as input and calculates the ellipse polygon given two semi-axes expressed in variable units and steps for precision.

* `center`: `GEOMETRY` center point.
* `xSemiAxis`: `FLOAT8` semi (major) axis of the ellipse along the x-axis.
* `ySemiAxis`: `FLOAT8` semi (minor) axis of the ellipse along the y-axis.
* `angle` (optional): `FLOAT8` angle of rotation (along the vertical axis), from North in decimal degrees, negative clockwise. If not specified, the default value of `0` will be used.
* `units` (optional): `VARCHAR(10)` units of length. The supported options are: miles, kilometers, meters, and degrees. If not specified, `kilometers` will be used.
* `steps` (optional): `INT` number of steps. If not specified, the default value of `64` will be used.

**Return type**

`VARCHAR(MAX)`

**Examples**

```sql
SELECT carto.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3);
-- {"type": "Polygon", "coordinates": [[[-73.87922034627275, 40.6643], [-73.88056149301754, 40.67000644486112], ...
```

```sql
SELECT carto.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3, -30);
-- {"type": "Polygon", "coordinates": [[[-73.88703173808466, 40.68643711664552], [-73.89195608204625, 40.69086946050236], ...
```

```sql
SELECT carto.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3, -30, 'miles');
-- {"type": "Polygon", "coordinates": [[[-73.85566162723387, 40.69992623586439], [-73.86358797643032, 40.707058494394765], ...
```

```sql
SELECT carto.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3, -30, 'miles', 80);
-- {"type": "Polygon", "coordinates": [[[-73.8557003345262, 40.70003619338248], [-73.86178810440265, 40.705912341919415], ...
```

### ST_MAKEENVELOPE

{{% bannerNote type="code" %}}
carto.ST_MAKEENVELOPE(xmin, ymin, xmax, ymax)
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
SELECT carto.ST_MAKEENVELOPE(0,0,1,1);
-- POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0)) 
```

### ST_TILEENVELOPE

{{% bannerNote type="code" %}}
carto.ST_TILEENVELOPE(zoomLevel, xTile, yTile)
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
SELECT carto.ST_TILEENVELOPE(10, 384, 368);
-- {'type': 'Polygon', 'coordinates': [[[-45.0, 44.84029065139799], [-45.0, 45.089035564831015], ...
```