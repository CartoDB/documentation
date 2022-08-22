## predicates

<div class="badges"><div class="core"></div></div>

This module contains functions that return a boolean based on the relation between 2 geometries or its properties.

### ST_CONTAINS

{{% bannerNote type="code" %}}
carto.ST_CONTAINS(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns `true` if and only if no points of _b_ lie in the exterior of _a_, and at least one `Point` of the interior of _b_ lies in the interior of _a_.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Boolean`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 2, 2) AS geom,
  carto.ST_MAKEPOINT(1, 1) as Point
)
SELECT carto.ST_CONTAINS(geom, point) FROM t;
-- true
```

### ST_CROSSES

{{% bannerNote type="code" %}}
carto.ST_CROSSES(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns `true` if the supplied geometries have some, but not all, interior points in common.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Boolean`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_GEOMFROMWKT("LINESTRING (1 0, 1 2)") AS lineA,
  carto.ST_GEOMFROMWKT("LINESTRING (0 1, 2 1)") AS lineB
)
SELECT carto.ST_CROSSES(lineA, lineB) FROM t;
-- true
```

### ST_DISJOINT

{{% bannerNote type="code" %}}
carto.ST_DISJOINT(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns `true` if the geometries do not “spatially intersect”; i.e., they do not share any space together. Equivalent to `NOT st_intersects(a, b)`.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Boolean`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_GEOMFROMWKT("LINESTRING (1 0, 1 2)") AS lineA,
  carto.ST_GEOMFROMWKT("LINESTRING (0 1, 2 1)") AS lineB
)
SELECT carto.ST_DISJOINT(lineA, lineB) AS disjoint FROM t;
-- false
```

### ST_EQUALS

{{% bannerNote type="code" %}}
carto.ST_EQUALS(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns `true` if the given `Geometries` represent the same logical `Geometry`. Directionality is ignored.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Boolean`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_GEOMFROMWKT("LINESTRING (0 0, 2 2)") AS lineA,
  carto.ST_GEOMFROMWKT("LINESTRING (0 0, 1 1, 2 2)") AS lineB
)
SELECT carto.ST_EQUALS(lineA, lineB) FROM t;
-- true
```

### ST_INTERSECTS

{{% bannerNote type="code" %}}
carto.ST_INTERSECTS(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns `true` if the geometries spatially intersect in 2D (i.e. share any portion of space). Equivalent to `NOT st_disjoint(a, b)`.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Boolean`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_GEOMFROMWKT("LINESTRING (1 0, 1 2)") AS lineA,
  carto.ST_GEOMFROMWKT("LINESTRING (0 1, 2 1)") AS lineB
)
SELECT carto.ST_INTERSECTS(lineA, lineB) FROM t;
-- true
```

### ST_OVERLAPS

{{% bannerNote type="code" %}}
carto.ST_OVERLAPS(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns `true` if the `Geometries` have some but not all points in common, are of the same dimension, and the intersection of the interiors of the two geometries has the same dimension as the geometries themselves.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Boolean`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 2, 2) AS geomA,
  carto.ST_MAKEBBOX(1, 1, 3, 3) AS geomB
)
SELECT carto.ST_OVERLAPS(geomA, geomB) FROM t;
-- true
```

### ST_RELATE

{{% bannerNote type="code" %}}
carto.### ST_RELATE(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns the DE-9IM 3x3 interaction matrix pattern describing the dimensionality of the intersections between the interior, boundary and exterior of the two geometries.


* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`String`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 2, 2) AS geomA,
  carto.ST_MAKEBBOX(1, 1, 3, 3) AS geomB
)
SELECT carto.ST_RELATE(geomA, geomB) FROM t;
-- true
```

### ST_RELATEBOOL

{{% bannerNote type="code" %}}
carto.ST_RELATEBOOL(geomA, geomB, mask)
{{%/ bannerNote %}}

**Description**

Returns `true` if the DE-9IM interaction matrix mask matches the interaction matrix pattern obtained from `st_relate(a, b)`.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.
* `mask`: `String` DE-9IM interaction matrix mask.

**Return type**

`Boolean`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 2, 2) AS geomA,
  carto.ST_MAKEBBOX(1, 1, 3, 3) AS geomB
)
SELECT carto.ST_RELATEBOOL(geomA, geomB, "212101212") FROM t;
-- true
```

### ST_TOUCHES

{{% bannerNote type="code" %}}
carto.ST_TOUCHES(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns `true` if the geometries have at least one `Point` in common, but their interiors do not intersect.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Boolean`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_MAKEBBOX(0, 0, 2, 2) AS geomA,
  carto.ST_GEOMFROMWKT("LINESTRING (3 1, 1 3)") AS geomB
)
SELECT carto.ST_TOUCHES(geomA, geomB) FROM t;
-- true
```

### ST_WITHIN

{{% bannerNote type="code" %}}
carto.ST_WITHIN(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns _true_ if geometry _a_ is completely inside geometry _b_.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Boolean`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_POINT(1, 1) AS geomA,
  carto.ST_MAKEBBOX(0, 0, 2, 2) AS geomB
)
SELECT carto.ST_WITHIN(geomA, geomB) FROM t;
-- true
```