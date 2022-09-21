---
aliases:
    - /analytics-toolbox-sf/sql-reference/constructors/
---
## constructors

<div class="badges"><div class="core"></div></div>

This module contains functions that create geographies from coordinates or already existing geographies.


### ST_BEZIERSPLINE

{{% bannerNote type="code" %}}
carto.ST_BEZIERSPLINE(geog [, resolution] [, sharpness])
{{%/ bannerNote %}}

**Description**

Takes a line and returns a curved version by applying a Bezier spline algorithm.

* `geog`: `GEOGRAPHY` input LineString.
* `resolution` (optional): `INT` time in milliseconds between points. By default `resolution` is `10000`.
* `sharpness` (optional): `DOUBLE` a measure of how curvy the path should be between splines. By default `sharpness` is `0.85`.

**Return type**

`GEOGRAPHY`

**Examples**

```sql
SELECT carto.ST_BEZIERSPLINE(TO_GEOGRAPHY('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'));
-- { "coordinates": [ [ -76.091308, 18.427501 ], [ -76.09134585033101, 18.427508082543092 ], ... 
```

```sql
SELECT carto.ST_BEZIERSPLINE(TO_GEOGRAPHY('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'), 10000);
-- { "coordinates": [ [ -76.091308, 18.427501 ], [ -76.09134585033101, 18.427508082543092 ], ... 
```

```sql
SELECT carto.ST_BEZIERSPLINE(TO_GEOGRAPHY('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'), 10000, 0.9);
-- { "coordinates": [ [ -76.091308, 18.427501 ], [ -76.09134541990707, 18.42750717125151 ], ... 
```


### ST_MAKEELLIPSE

{{% bannerNote type="code" %}}
carto.ST_MAKEELLIPSE(geog, xSemiAxis, ySemiAxis [, angle] [, units] [, steps])
{{%/ bannerNote %}}

**Description**

Takes a Point and calculates the ellipse polygon given two semi-axes expressed in variable units and steps for precision.

* `center`: `GEOGRAPHY` center point.
* `xSemiAxis`: `DOUBLE` semi (major) axis of the ellipse along the x-axis.
* `ySemiAxis`: `DOUBLE` semi (minor) axis of the ellipse along the y-axis.
* `angle` (optional): `DOUBLE` angle of rotation (along the vertical axis), from North in decimal degrees, negative clockwise. By default `angle` is `0`.
* `units` (optional): `STRING` units of length, the supported options are: miles, kilometers, and degrees. By default `units` is `kilometers`.
* `steps` (optional): `INT` number of steps. By default `steps` is `64`.

**Return type**

`GEOGRAPHY`

**Examples**

```sql
SELECT carto.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3);
-- { "coordinates": [ [ [ -73.87922034627275, 40.6643 ], [ -73.88056149301754, 40.67000644486112 ], ... 
```

```sql
SELECT carto.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3, -30);
-- { "coordinates": [ [ [ -73.88715365786175, 40.68678300909311 ], [ -73.89207802212195, 40.691215338152176 ], ... 
```

```sql
SELECT carto.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3, -30, 'miles');
-- { "coordinates": [ [ [ -73.85585757866869, 40.700482895785946 ], [ -73.8637839804274, 40.70761511598624 ], ... 
```

```sql
SELECT carto.ST_MAKEELLIPSE(ST_Point(-73.9385,40.6643), 5, 3, -30, 'miles', 80);
-- { "coordinates": [ [ [ -73.85585757866869, 40.700482895785946 ], [ -73.86194538052666, 40.70635901954343 ], ... 
```


### ST_MAKEENVELOPE

{{% bannerNote type="code" %}}
carto.ST_MAKEENVELOPE(xmin, ymin, xma, ymax)
{{%/ bannerNote %}}

**Description**
Creates a rectangular Polygon from the minimum and maximum values for X and Y.

* `xmin`: `DOUBLE` minimum value for X.
* `ymin`: `DOUBLE` minimum value for Y.
* `xmax`: `DOUBLE` maximum value for X.
* `ymax`: `DOUBLE` maximum value for Y.

**Return type**

`GEOGRAPHY`

**Example**

```sql
SELECT carto.ST_MAKEENVELOPE(0,0,1,1);
-- { "coordinates": [ [ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 0, 0 ] ] ], "type": "Polygon" }
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

`GEOGRAPHY`

**Example**

```sql
SELECT carto.ST_TILEENVELOPE(10,384,368);
-- {"coordinates": [[[-45,45.08903556483103], [-45, 44.840290651397986], ...
```
