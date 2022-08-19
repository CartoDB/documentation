### ST_BOX2DFROMGEOHASH

{{% bannerNote type="code" %}}
carto.ST_BOX2DFROMGEOHASH(geomHash, prec)
{{%/ bannerNote %}}

**Description**

Alias of st_geomFromGeoHash.

* `geomHash`: `String` Geohash code.
* `prec`: `Geometry` precison.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT ST_ASGEOHASH(ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'), 8) AS geohash
)
SELECT ST_ASTEXT(ST_BOX2DFROMGEOHASH(geohash, 5)) FROM t;
-- POLYGON ((-90 11.25, -90 22.5, -67.5 22.5, -67.5 11.25, -90 11.25))
```

### ST_GEOMETRYFROMTEXT
{{% bannerNote type="code" %}}
carto.ST_GEOMETRYFROMTEXT(wkt)
{{%/ bannerNote %}}

**Description**

Alias of st_geomFromWKT.

* `wkt`: `String` WKT text.

**Return type**

`Geometry`

**Example**

```sql
SELECT ST_ASGEOJSON(ST_GEOMETRYFROMTEXT('POINT(-76.09130 18.42750)'))
-- {"type":"Point","coordinates":[-76.0913,18.4275,0.0]}
```

### ST_GEOMFROMGEOHASH

{{% bannerNote type="code" %}}
carto.ST_GEOMFROMGEOHASH(geomHash, prec)
{{%/ bannerNote %}}

**Description**

Returns the `Geometry` of the bounding box corresponding to the Geohash string _geohash_ (base-32 encoded) with a precision of prec bits. See [Geohash](https://www.geomesa.org/documentation/stable/user/appendix/utils.html#geohash) for more information on GeoHashes.

* `geomHash`: `String` Geohash code.
* `prec`: `Geometry` precison.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT ST_ASGEOHASH(ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'), 8) AS geohash
)
SELECT ST_ASTEXT(ST_GEOMFROMGEOHASH(geohash, 8)) FROM t;
-- POLYGON ((-90 11.25, -90 22.5, -67.5 22.5, -67.5 11.25, -90 11.25))
```

### ST_GEOMFROMGEOJSON
{{% bannerNote type="code" %}}
carto.ST_GEOMFROMGEOJSON(geojson)
{{%/ bannerNote %}}

**Description**

Creates a `Geometry` from the given GeoJSON.

* `geojson`: `String` geojson text.

**Return type**

`Geometry`

**Example**

```sql
SELECT ST_ASTEXT(ST_GEOMFROMGEOJSON('{"type":"Point","coordinates":[-76.0913,18.4275,0.0]}'))
-- POINT (-76.0913 18.4275)
```

### ST_GEOMFROMWKB
{{% bannerNote type="code" %}}
carto.ST_GEOMFROMWKB(wkb)
{{%/ bannerNote %}}

**Description**

Creates a `Geometry` from the given Well-Known Binary representation (WKB).

* `wkb`: `Array[Byte]` geom in WKB format.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT ST_ASBINARY(ST_GEOMFROMWKT('POINT(-76.09130 18.42750)')) AS wkb
)
SELECT ST_GEOMFROMWKB(wkb) FROM t;
-- 4QgBz/HU1QXwwN6vAQA=
```

### ST_GEOMFROMWKT

{{% bannerNote type="code" %}}
carto.ST_GEOMFROMWKT(wkt)
{{%/ bannerNote %}}

**Description**

Creates a `Geometry` from the given Well-Known Text representation (WKT).

* `wkt`: `String` WKT text.

**Return type**

`Geometry`

**Example**

```sql
SELECT ST_ASGEOJSON(ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'))
-- {"type":"Point","coordinates":[-76.0913,18.4275,0.0]}
```

### ST_LINEFROMTEXT
{{% bannerNote type="code" %}}
carto.ST_LINEFROMTEXT(wkt)
{{%/ bannerNote %}}

**Description**

Creates a `LineString` from the given WKT representation.

* `wkt`: `String` geom in WKT format.

**Return type**

`LineString`

**Example**

```sql
SELECT ST_ASGEOJSON(ST_LINEFROMTEXT('LINESTRING(0 0, 0 3, 5 3)'))
-- {"type":"LineString","coordinates":[[0.0,0.0,0.0],[0.0,3,0.0],[5,3,0.0]]}
```

### ST_MLINEFROMTEXT
{{% bannerNote type="code" %}}
carto.ST_MLINEFROMTEXT(wkt)
{{%/ bannerNote %}}

**Description**

Creates a `MultiLineString` corresponding to the given WKT representation.

* `wkt`: `String` geom in WKT format.

**Return type**

`MultiLineString`

**Example**

```sql
SELECT ST_ASGEOJSON(ST_MLINEFROMTEXT('MULTILINESTRING((1 1, 3 5), (-5 3, -8 -2))'))
-- {"type":"MultiLineString","coordinates":[[[1,1,0.0],[3,5,0.0]],[[-5,3,0.0],[-8,-2,0.0]]]}
```

### ST_MPOINTFROMTEXT
{{% bannerNote type="code" %}}
carto.ST_MPOINTFROMTEXT(wkt)
{{%/ bannerNote %}}

**Description**

Creates a `MultiPoint` corresponding to the given WKT representation.

* `wkt`: `String` geom in WKT format.

**Return type**

`MultiPoint`

**Example**

```sql
SELECT ST_ASGEOJSON(ST_MPOINTFROMTEXT('MULTIPOINT (10 40, 40 30, 20 20, 30 10)'))
-- {"type":"MultiPoint","coordinates":[[10,40,0.0],[40,30,0.0],[20,20,0.0],[30,10,0.0]]}
```

### ST_MPOLYFROMTEXT
{{% bannerNote type="code" %}}
carto.ST_MPOLYFROMTEXT(wkt)
{{%/ bannerNote %}}

**Description**

Creates a `MultiPolygon` corresponding to the given WKT representation.

* `wkt`: `String` geom in WKT format.

**Return type**

`MultiPolygon`

**Example**

```sql
SELECT ST_ASGEOJSON(ST_MPOLYFROMTEXT('MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)),((15 5, 40 10, 10 20, 5 10, 15 5)))'))
-- {"type":"MultiPolygon","coordinates":[[[[30,20,0.0],[45,40,0.0],[10,40,0.0],[30,20,0.0]]]...
```

### ST_POINTFROMGEOHASH
{{% bannerNote type="code" %}}
carto.ST_POINTFROMGEOHASH(geohash, prec)
{{%/ bannerNote %}}

**Description**

Return the `Point` at the geometric center of the bounding box defined by the Geohash string _geohash_ (base-32 encoded) with a precision of prec bits. See [Geohash](https://www.geomesa.org/documentation/stable/user/appendix/utils.html#geohash) for more information on Geohashes.

* `geomHash`: `String` Geohash code.
* `prec`: `Geometry` precison.

**Return type**

`Point`

**Example**

```sql
WITH t AS (
  SELECT ST_ASGEOHASH(ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'), 8) AS geohash
)
SELECT ST_ASTEXT(ST_POINTFROMGEOHASH(geohash, 5)) FROM t;
-- POINT (-67.5 22.5)
```

### ST_POINTFROMTEXT
{{% bannerNote type="code" %}}
carto.ST_POINTFROMTEXT(wkt)
{{%/ bannerNote %}}

**Description**

Creates a `Point` corresponding to the given WKT representation.

* `wkt`: `String` geom in WKT format.

**Return type**

`Point`

**Example**

```sql
SELECT ST_ASGEOJSON(ST_POINTFROMTEXT('POINT(-76.09130 18.42750)'))
-- {"type":"Point","coordinates":[-76.0913,18.4275,0.0]}
```

### ST_POINTFROMWKB
{{% bannerNote type="code" %}}
carto.ST_POINTFROMWKB(wkb)
{{%/ bannerNote %}}

**Description**

Creates a `Point` corresponding to the given WKB representation.

* `wkb`: `Array[Byte]` geom in WKB format.

**Return type**

`Point`

**Example**

```sql
WITH t AS (
  SELECT ST_ASBINARY(ST_GEOMFROMWKT('POINT(-76.09130 18.42750)')) AS wkb
)
SELECT ST_POINTFROMWKB(wkb) FROM t;
-- 4QgBz/HU1QXwwN6vAQA=
```

### ST_POLYGONFROMTEXT
{{% bannerNote type="code" %}}
carto.ST_POLYGONFROMTEXT(wkt)
{{%/ bannerNote %}}

**Description**

Creates a `Polygon` corresponding to the given WKT representation.

* `wkt`: `String` geom in WKT format.

**Return type**

`Polygon`

**Example**

```sql
SELECT ST_ASGEOJSON(ST_POLYGONFROMTEXT('POLYGON((-73.98955 40.71278, -73.98958 40.71299, -73.98955 40.71278))'))
-- {"type":"Polygon","coordinates":[[[-73.98955,40.71278,0.0],[-73.98958,40.71299,0.0],[-73.98955,40.71278,0.0]...
```