## accessors

<div class="badges"><div class="core"></div></div>

This module contains functions that provide information about internal geometries.


### ST_COORDDIM

{{% bannerNote type="code" %}}
carto.ST_COORDDIM(geom)
{{%/ bannerNote %}}

**Description**

Returns the number of dimensions of the coordinates of `Geometry` _geom_.

* `geom`: `Geometry` input geom.

**Return type**

`Int`

**Example**

```sql
SELECT carto.ST_COORDDIM(carto.ST_MAKEPOINTM(1, 2, 3));
-- 3
```


### ST_DIMENSION

{{% bannerNote type="code" %}}
carto.ST_DIMENSION(geom)
{{%/ bannerNote %}}

**Description**

Returns the inherent number of dimensions of this `Geometry` object, which must be less than or equal to the coordinate dimension.

* `geom`: `Geometry` input geom.

**Return type**

`Int`

**Example**

```sql
SELECT carto.ST_DIMENSION(carto.ST_GEOMFROMWKT("LINESTRING(0 0, 1 1)"));
-- 1
```


### ST_ENVELOPE

{{% bannerNote type="code" %}}
carto.ST_ENVELOPE(geom)
{{%/ bannerNote %}}

**Description**

Returns a `Geometry` representing the bounding box of _geom_.

* `geom`: `Geometry` input geom.

**Return type**

`Geometry`

**Example**

```sql
SELECT carto.ST_ASTEXT(carto.ST_ENVELOPE(carto.ST_GEOMFROMWKT("LINESTRING(1 1, 2 3)")));
-- POLYGON ((1 1, 1 3, 2 3, 2 1, 1 1))
```


### ST_GEOMETRYN

{{% bannerNote type="code" %}}
carto.ST_GEOMETRYN(geom, n)
{{%/ bannerNote %}}

**Description**

Returns the _n_-th `Geometry` (1-based index) of _geom_ if the `Geometry` is a `GeometryCollection`, or _geom_ if it is not.

* `geom`: `Geometry` input geom.
* `n`: `Int` input number of geom to take.

**Return type**

`Geometry`

**Example**

```sql
SELECT carto.ST_ASTEXT(
  carto.ST_GEOMETRYN(
    carto.ST_GEOMFROMWKT(
      "GEOMETRYCOLLECTION(LINESTRING(1 1, 2 3), POINT(0 4), LINESTRING EMPTY)"
    ),
    2
  )
);
-- POINT (0 4)
```


### ST_ISCLOSED

{{% bannerNote type="code" %}}
carto.ST_ISCLOSED(geom)
{{%/ bannerNote %}}

**Description**

Returns `true` if geom is a `LineString` or `MultiLineString` and its start and end points are coincident. Returns true for all other `Geometry` types.

* `geom`: `Geometry` input geom.

**Return type**

`Boolean`

**Example**

```sql
SELECT carto.ST_ISCLOSED(carto.ST_GEOMFROMWKT("LINESTRING(1 1, 2 3, 4 3, 1 1)"));
-- true
```


### ST_ISCOLLECTION

{{% bannerNote type="code" %}}
carto.ST_ISCOLLECTION(geom)
{{%/ bannerNote %}}

**Description**

Returns `true` if _geom_ is a `GeometryCollection`.

* `geom`: `Geometry` input geom.

**Return type**

`Boolean`

**Example**

```sql
SELECT carto.ST_ISCOLLECTION(
  carto.ST_GEOMFROMWKT(
    "GEOMETRYCOLLECTION(LINESTRING(1 1, 2 3), POINT(0 4)), LINESTRING EMPTY"
  )
);
-- true
```


### ST_ISEMPTY

{{% bannerNote type="code" %}}
carto.ST_ISEMPTY(geom)
{{%/ bannerNote %}}

**Description**

Returns `true` if _geom_ is an empty geometry.

* `geom`: `Geometry` input geom.

**Return type**

`Boolean`

**Example**

```sql
SELECT carto.ST_ISEMPTY(carto.ST_GEOMFROMWKT("LINESTRING EMPTY"));
-- true
```


### ST_ISGEOMFIELD

{{% bannerNote type="code" %}}
carto.ST_ISGEOMFIELD(geom)
{{%/ bannerNote %}}

**Description**

Returns `true` if _geom_ is string containing WKT or WKB representation of a geometry.

* `geom`: `Geometry` input geom.

**Return type**

`Boolean`

**Example**

```sql
SELECT carto.ST_ISGEOMFIELD("LINESTRING(1 1, 2 3)");
-- true
```


### ST_ISRING

{{% bannerNote type="code" %}}
carto.ST_ISRING(geom)
{{%/ bannerNote %}}

**Description**

Returns `true` if _geom_ is a `LineString` or a `MultiLineString` and is both closed and simple.

* `geom`: `Geometry` input geom.

**Return type**

`Boolean`

**Example**

```sql
SELECT carto.ST_ISRING(carto.ST_GEOMFROMWKT("LINESTRING(1 1, 2 3, 4 3, 1 1)"));
-- true
```


### ST_ISSIMPLE

{{% bannerNote type="code" %}}
carto.ST_ISSIMPLE(geom)
{{%/ bannerNote %}}

**Description**

Returns `true` if _geom_ has no anomalous geometric points, such as self intersection or self tangency.

* `geom`: `Geometry` input geom.

**Return type**

`Boolean`

**Example**

```sql
SELECT carto.ST_ISSIMPLE(carto.ST_GEOMFROMWKT("LINESTRING(1 1, 2 3, 4 3, 2 3)"));
-- false
```


### ST_ISVALID

{{% bannerNote type="code" %}}
carto.ST_ISVALID(geom)
{{%/ bannerNote %}}

**Description**

Returns `true` if the `Geometry` is topologically valid according to the OGC SFS specification.

* `geom`: `Geometry` input geom.

**Return type**

`Boolean`

**Example**

```sql
SELECT carto.ST_ISVALID(carto.ST_GEOMFROMWKT("POLYGON((0 0, 1 1, 1 2, 1 1, 0 0))"));
-- false
```


### ST_NUMGEOMETRIES

{{% bannerNote type="code" %}}
carto.ST_NUMGEOMETRIES(geom)
{{%/ bannerNote %}}

**Description**

If _geom_ is a `GeometryCollection`, returns the number of geometries. For single geometries, returns `1`,

* `geom`: `Geometry` input geom.

**Return type**

`Int`

**Example**

```sql
SELECT carto.ST_NUMGEOMETRIES(
  carto.ST_GEOMFROMWKT(
    "GEOMETRYCOLLECTION(LINESTRING(1 1, 2 3), POINT(0 4), LINESTRING EMPTY)"
  )
);
-- 3
```


### ST_NUMPOINTS

{{% bannerNote type="code" %}}
carto.ST_NUMPOINTS(geom)
{{%/ bannerNote %}}

**Description**

Returns the number of vertices in `Geometry` _geom_.

* `geom`: `Geometry` input geom.

**Return type**

`Int`

**Example**

```sql
SELECT carto.ST_NUMPOINTS(carto.ST_GEOMFROMWKT("LINESTRING(1 1, 2 3, 4 4)"));
-- 3
```


### ST_POINTN

{{% bannerNote type="code" %}}
carto.ST_POINTN(geom, n)
{{%/ bannerNote %}}

**Description**

If _geom_ is a `LineString`, returns the _n_-th vertex of _geom_ as a `Point`. Negative values are counted backwards from the end of the `LineString`. Returns `null` if _geom_ is not a `LineString`.

* `geom`: `Geometry` input geom.
* `n`: `Int` input number of vertex to take.

**Return type**

`Point`

**Example**

```sql
SELECT carto.ST_ASTEXT(
  carto.ST_POINTN(
    carto.ST_GEOMFROMWKT(
      "LINESTRING(1 1, 2 3, 4 4, 3 4)"),
      3
    )
  );
-- POINT (4 4)
```


### ST_X

{{% bannerNote type="code" %}}
carto.ST_X(geom)
{{%/ bannerNote %}}

**Description**

If _geom_ is a `Point`, return the X coordinate of that point.

* `geom`: `Geometry` input Point.

**Return type**

`Double`

**Example**

```sql
SELECT carto.ST_X(carto.ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'));
-- -76.09131
```


### ST_Y

{{% bannerNote type="code" %}}
carto.ST_Y(geom)
{{%/ bannerNote %}}

**Description**

If _geom_ is a `Point`, return the Y coordinate of that point.

* `geom`: `Geometry` input Point.

**Return type**

`Double`

**Example**

```sql
SELECT carto.ST_Y(carto.ST_POINT(-76.09130, 18.42750));
-- 18.4275
```
