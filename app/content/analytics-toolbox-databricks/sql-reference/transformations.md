## transformations

<div class="badges"><div class="core"></div></div>

This module contains functions that compute geometric constructions, or alter geometry size or shape.

### ST_ANTIMERIDIANSAFEGEOM

{{% bannerNote type="code" %}}
carto.ST_ANTIMERIDIANSAFEGEOM(geom)
{{%/ bannerNote %}}

**Description**

If _geom_ spans the [antimeridian](https://en.wikipedia.org/wiki/180th_meridian), attempt to convert the `Geometry` into an equivalent form that is “antimeridian-safe” (i.e. the output `Geometry` is covered by `BOX(-180 -90, 180 90)`). In certain circumstances, this method may fail, in which case the input `Geometry` will be returned and an error will be logged.

* `geom`: `Geometry` input geom.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(178, 0, 190, 5) AS geom
)
SELECT carto.ST_ASTEXT(carto.ST_ANTIMERIDIANSAFEGEOM(geom)) FROM t;
-- MULTIPOLYGON (((-180 0, -180 5, -170 5, -170 0, -180 0)), ((180 5, 180 0, 178 0, 178 5, 180 5)))
```

### ST_BOUNDARY

{{% bannerNote type="code" %}}
carto.ST_BOUNDARY(geom)
{{%/ bannerNote %}}

**Description**

Returns the boundary, or an empty `Geometry` of appropriate dimension, if _geom_ is empty.

* `geom`: `Geometry` input geom.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 2, 2) AS geom
)
SELECT carto.ST_ASTEXT(carto.ST_BOUNDARY(geom)) FROM t;
-- LINESTRING (0 0, 0 2, 2 2, 2 0, 0 0)
```

### ST_BUFFERPOINT

{{% bannerNote type="code" %}}
carto.ST_BUFFERPOINT(point, radius)
{{%/ bannerNote %}}

**Description**

Returns a `Geometry` covering all points within a given radius of Point _point_, where radius is given in meters.

Returns the boundary, or an empty `Geometry` of appropriate dimension, if _geom_ is empty.

* `point`: `Point` Center of the buffer.
* `buffer`: `Double` radius in meters.

**Return type**

`Geometry`

**Example**

```sql
SELECT carto.ST_ASTEXT(carto.ST_BUFFERPOINT(carto.ST_POINT(0, 0), 1));;
-- POLYGON ((0.000009 0, 0.000009 0.0000006, 0.0000089 0.0000011, 0.0000088 0.0000017, ...
```

### ST_CENTROID

{{% bannerNote type="code" %}}
carto.ST_CENTROID(geom)
{{%/ bannerNote %}}

**Description**

Returns the geometric center of a geometry.

* `geom`: `Geometry` input geom.

**Return type**

`Point`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 2, 2) AS geom
)
SELECT carto.ST_ASTEXT(carto.ST_CENTROID(geom)) FROM t;
-- POINT (1 1)
```

### ST_CLOSESTPOINT

{{% bannerNote type="code" %}}
carto.ST_CLOSESTPOINT(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns the `Point` on _a_ that is closest to _b_. This is the first `Point` of the shortest line.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Point`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_GEOMFROMWKT("LINESTRING (3 1, 1 3)") AS geomA,
  carto.ST_POINT(0, 0) AS geomb
)
SELECT carto.ST_ASTEXT(carto.ST_CLOSESTPOINT(geomA, geomB)) FROM t;
-- POINT (2 2)
```

### ST_CONVEXHULL

{{% bannerNote type="code" %}}
carto.ST_CONVEXHULL(geom)
{{%/ bannerNote %}}

**Description**

Aggregate function. The convex hull of a `Geometry` represents the minimum convex `Geometry` that encloses all geometries _geom_ in the aggregated rows.

* `geom`: `Geometry` input geom.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_GEOMFROMWKT('GEOMETRYCOLLECTION(LINESTRING(1 1, 3 5),POLYGON((-1 -1, -1 -5, -5 -5, -5 -1, -1 -1)))') AS geom
)
SELECT carto.ST_ASTEXT(carto.ST_CONVEXHULL(geom)) FROM t;
-- POLYGON ((-5 -5, -5 -1, 3 5, -1 -5, -5 -5))
```

### ST_DIFFERENCE

{{% bannerNote type="code" %}}
carto.ST_DIFFERENCE(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Return the part of geomA that does not intersect with geomB. 

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 2, 2) AS geomA,
  carto.ST_MAKEBBOX(1, 1, 3, 3) AS geomB
)
SELECT carto.ST_ASTEXT(carto.ST_DIFFERENCE(geomA, geomB)) AS difference FROM t;
-- POLYGON ((0 0, 0 2, 1 2, 1 1, 2 1, 2 0, 0 0))
```

### ST_EXTERIORRING

{{% bannerNote type="code" %}}
carto.ST_EXTERIORRING(geom)
{{%/ bannerNote %}}

**Description**

Returns a `LineString` representing the exterior ring of the geometry; returns null if the `Geometry` is not a `Polygon`.

* `geom`: `Geometry` input geom.

**Return type**

`LineString`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 1, 1) AS geom
)
SELECT carto.ST_ASTEXT(carto.ST_EXTERIORRING(geom)) FROM t;
-- LINESTRING (0 0, 0 1, 1 1, 1 0, 0 0)
```

### ST_IDLSAFEGEOM

{{% bannerNote type="code" %}}
carto.ST_IDLSAFEGEOM(geom)
{{%/ bannerNote %}}

**Description**

Alias of `st_antimeridianSafeGeom`.

* `geom`: `Geometry` input geom.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(178, 0, 190, 5) AS geom
)
SELECT carto.ST_ASTEXT(carto.ST_IDLSAFEGEOM(geom)) AS geom FROM t;
-- MULTIPOLYGON (((-180 0, -180 5, -170 5, -170 0, -180 0)), ((180 5, 180 0, 178 0, 178 5, 180 5)))
```

### ST_INTERIORRINGN

{{% bannerNote type="code" %}}
carto.ST_INTERIORRINGN(geom, n)
{{%/ bannerNote %}}

**Description**

Returns a `LineString` representing the exterior ring of the geometry; returns null if the `Geometry` is not a `Polygon`.

* `geom`: `Geometry` input geom.
* `n`: `Int` nth ring to take.

**Return type**

`LineString`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_GEOMFROMWKT("POLYGON ((10 10, 110 10, 110 110, 10 110, 10 10), (20 20, 20 30, 30 30, 30 20, 20 20), (40 20, 40 30, 50 30, 50 20, 40 20))") AS geom
)
SELECT carto.ST_ASTEXT(carto.ST_INTERIORRINGN(geom, 1)) FROM t;
-- LINESTRING (20 20, 20 30, 30 30, 30 20, 20 20)
```

### ST_INTERSECTION

{{% bannerNote type="code" %}}
carto.ST_INTERSECTION(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns the intersection of the input `Geometries`.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 2, 2) AS geomA,
  carto.ST_MAKEBBOX(1, 1, 3, 3) AS geomB
)
SELECT carto.ST_ASTEXT(carto.ST_INTERSECTION(geomA, geomB)) AS intersection FROM t;
-- POLYGON ((1 2, 2 2, 2 1, 1 1, 1 2))
```

### ST_SIMPLIFY

{{% bannerNote type="code" %}}
carto.ST_SIMPLIFY(geom, tolerance)
{{%/ bannerNote %}}

**Description**

Returns a simplified version of the given `Geometry` using the Douglas-Peucker algorithm. This function does not preserve topology - e.g. polygons can be split, collapse to lines or disappear holes can be created or disappear, and lines can cross. To simplify geometry while preserving topology use ST_SIMPLIFYPRESERVETOPOLOGY. 

* `geom`: `Geometry` input geom.
* `tolerance`: `Double` input distance tolerance.
double 

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_BUFFERPOINT(carto.ST_POINT(0, 0), 10) AS geom
)
SELECT carto.ST_ASTEXT(carto.ST_SIMPLIFY(geom, 0.00001)) AS simplifiedGeom, 
    carto.ST_NUMPOINTS(carto.ST_SIMPLIFY(geom, 0.00001)) AS simplifiedNumpoints, 
    carto.ST_NUMPOINTS(geom) AS numPoints FROM t;
-- POLYGON ((0.0000899 0, 0.0000656 0.0000616, 0 0.0000899, -0.0000616 0.0000656, -0.0000899 0, -0.0000656 -0.0000616, 0 -0.0000899, 0.0000616 -0.0000656, 0.0000899 0)) | 9 | 101
```

### ST_SIMPLIFYPRESERVETOPOLOGY

{{% bannerNote type="code" %}}
carto.ST_SIMPLIFYPRESERVETOPOLOGY(geom, tolerance)
{{%/ bannerNote %}}

**Description**

Simplifies a `Geometry` and ensures that the result is a valid geometry having the same dimension and number of components as the input, and with the components having the same topological relationship.


* `geom`: `Geometry` input geom.
* `tolerance`: `Double` input distance tolerance.
double 

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_BUFFERPOINT(carto.ST_POINT(0, 0), 10) AS geom
)
SELECT carto.ST_ASTEXT(carto.ST_SIMPLIFYPRESERVETOPOLOGY(geom, 1)) AS simplifiedGeom, 
    carto.ST_NUMPOINTS(carto.ST_SIMPLIFYPRESERVETOPOLOGY(geom, 1)) AS simplifiedNumpoints, 
    carto.ST_NUMPOINTS(geom) AS numPoints FROM t;
-- POLYGON ((0.0000899 0, 0 0.0000899, -0.0000899 0, 0 -0.0000899, 0.0000899 0)) | 5 | 101
```

### ST_TRANSLATE

{{% bannerNote type="code" %}}
carto.ST_TRANSLATE(geom, deltaX, deltaY)
{{%/ bannerNote %}}

**Description**

Returns the `Geometry` produced when _geom_ is translated by _deltaX_ and _deltaY_.

* `geom`: `Geometry` input geom.
* `deltaX`: `Double` distance x to be tralslated.
* `deltaY`: `Double` distance y to be tralslated.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_POINT(0, 0) AS point
)
SELECT carto.ST_ASTEXT(carto.ST_TRANSLATE(point, 1, 2)) FROM t;
-- POINT (1 2)
```