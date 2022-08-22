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
carto.ST_CLOSESTPOINT(geoA, geomB)
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

### st_translate
`Geometry st_translate(Geometry geom, Double deltaX, Double deltaY)`

Returns the `Geometry` produced when _geom_ is translated by _deltaX_ and _deltaY_.
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