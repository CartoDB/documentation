## constructors

<div class="badges"><div class="core"></div></div>

This module contains functions that create geographies from coordinates or already existing geographies.


### ST_MAKEBBOX

{{% bannerNote type="code" %}}
carto.ST_MAKEBBOX(lowerX, lowerY, upperX, upperY)
{{%/ bannerNote %}}

**Description**

Creates a `Geometry` representing a bounding box with the given boundaries.

* `lowerX`: `Double` input lower x value.
* `lowerY`: `Double` input lower y value.
* `upperX`: `Double` input upper x value.
* `upperY`: `Double` input upper y value.

**Return type**

`Geometry`

**Example**

```sql
SELECT carto.ST_ASTEXT(carto.ST_MAKEBBOX(-91.85548, 29.50603, -91.83820, 29.53073)) AS bbox;
-- POLYGON ((-91.85548 29.50603, -91.85548 29.53073, -91.83820 29.53073, -91.8382 29.50603, -91.85548 29.50603))
```


### ST_MAKEBOX2D

{{% bannerNote type="code" %}}
carto.ST_MAKEBOX2D(lowerleft, upperRight)
{{%/ bannerNote %}}

**Description**

Creates a `Geometry` representing a bounding box defined by the given `Points`.

* `lowerleft`: `Point` input lower left Point.
* `upperRight`: `Point` input upper right Point.

**Return type**

`Geometry`

**Example**

```sql
SELECT carto.ST_ASTEXT(carto.ST_MAKEBOX2D(carto.ST_MAKEPOINT(-91.85548, 29.50603), carto.ST_MAKEPOINT(-91.83820, 29.53073))) AS bbox;
-- POLYGON ((-91.85548 29.50603, -91.85548 29.53073, -91.8382 29.53073, -91.8382 29.50603, -91.85548 29.50603))
```


### ST_MAKEPOINT

{{% bannerNote type="code" %}}
carto.ST_MAKEPOINT(x, y)
{{%/ bannerNote %}}

**Description**

Creates a `Point` with an _x_ and _y_ coordinate.

* `x`: `Double` input x value of the point.
* `y`: `Double` input y value of the point.

**Return type**

`Point`

**Example**

```sql
SELECT carto.ST_ASTEXT(carto.ST_MAKEPOINT(-91.85548, 29.50603));
-- POINT (-91.85548 29.50603)
```


### ST_MAKEPOINTM

{{% bannerNote type="code" %}}
carto.ST_MAKEPOINTM(x, y, z)
{{%/ bannerNote %}}

**Description**

Creates a `Point` with an _x_, _y_, and _m_ coordinate.

* `x`: `Double` input x value of the point.
* `y`: `Double` input y value of the point.
* `z`: `Double` input z value of the point.

**Return type**

`Point`

**Example**

```sql
SELECT carto.ST_MAKEPOINTM(-91.8554869, 29.5060349, 5);
-- BINARY OUTPUT - 4QgB6aOA7Ab6jbKZAgo=
```


### ST_MAKEPOLYGON

{{% bannerNote type="code" %}}
carto.ST_MAKEPOLYGON(shell)
{{%/ bannerNote %}}

**Description**

Creates a `Polygon` formed by the given `LineString` shell, which must be closed.

* `shell`: `LineString` input linestring closed.

**Return type**

`Polygon`

**Example**

```sql
SELECT carto.ST_ASTEXT(carto.ST_MAKEPOLYGON(carto.ST_GEOMFROMWKT('LINESTRING(75 29,77 29,77 27, 75 29)')));
-- POLYGON ((75 29, 77 29, 77 27, 75 29))
```


### ST_POINT

{{% bannerNote type="code" %}}
carto.ST_POINT(x, y)
{{%/ bannerNote %}}

**Description**

Returns a `Point` with the given coordinate values. This is an OGC alias for st_makePoint.

* `x`: `Double` input x value of the point.
* `y`: `Double` input y value of the point.

**Return type**

`Point`

**Example**

```sql
SELECT carto.ST_ASTEXT(carto.ST_POINT(-91.85548, 29.50603));
-- POINT (-91.85548 29.50603)
```
