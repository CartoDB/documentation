## formatters

<div class="badges"><div class="experimental"></div><div class="core"></div></div>

This module contains functions that export geometries to an external format like WKT.


### ST_ASBINARY

{{% bannerNote type="code" %}}
carto.ST_ASBINARY(geom)
{{%/ bannerNote %}}

**Description**

Returns `Geometry` _geom_ in WKB representation.

* `geom`: `Geometry` input geom.

**Return type**

`Array[Byte]`

**Example**

```sql
SELECT carto.ST_ASBINARY(carto.ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'));
-- AIAAAAHAUwXX2/SH/UAybXCj1wo9AAAAAAAAAAA=
```


### ST_ASGEOJSON

{{% bannerNote type="code" %}}
carto.ST_ASGEOJSON(geom)
{{%/ bannerNote %}}

**Description**

Returns `Geometry` _geom_ in GeoJSON representation.

* `geom`: `Geometry` input geom.

**Return type**

`Point`

**Example**

```sql
SELECT carto.ST_ASGEOJSON(carto.ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'));
-- {"type":"Point","coordinates":[-76.0913,18.4275,0.0]}
```


### ST_ASLATLONTEXT

{{% bannerNote type="code" %}}
carto.ST_ASLATLONTEXT(p)
{{%/ bannerNote %}}

**Description**

Returns a `String` describing the latitude and longitude of `Point` _p_ in degrees, minutes, and seconds. (This presumes that the units of the coordinates of _p_ are latitude and longitude).

* `p`: `Point` input point.

**Return type**

`String`

**Example**

```sql
SELECT carto.ST_ASLATLONTEXT(carto.ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'));
-- 18°25'39.000"N 77°54'31.320"W
```


### ST_ASTEXT

{{% bannerNote type="code" %}}
carto.ST_ASTEXT(geom)
{{%/ bannerNote %}}

**Description**

Returns `Geometry` _geom_ in WKT representation.

* `geom`: `Geometry` input geom.

**Return type**

`String`

**Example**

```sql
SELECT carto.ST_ASTEXT(carto.ST_POINT(-76.09130, 18.42750));
-- POINT (-76.0913 18.4275)
```


### ST_ASTWKB

{{% bannerNote type="code" %}}
carto.ST_ASTWKB(geom)
{{%/ bannerNote %}}

**Description**

Returns `Geometry` _geom_ in TWKB representation.

* `geom`: `Geometry` input geom.

**Return type**

`Array[Byte]`

**Example**

```sql
SELECT carto.ST_ASTWKB(carto.ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'));
-- 4QgBz/HU1QXwwN6vAQA=
```


### ST_BITEARRAY

{{% bannerNote type="code" %}}
carto.ST_BITEARRAY(s)
{{%/ bannerNote %}}

**Description**

Encodes string _s_ into an array of bytes using the UTF-8 charset.

* `s`: `String` input geom win WKT format.

**Return type**

`Array[Byte]`

**Example**

```sql
SELECT carto.ST_BYTEARRAY("POINT (-76.0913 18.4275)");
-- UE9JTlQgKC03Ni4wOTEzIDE4LjQyNzUp
```


### ST_CASTTOGEOMETRY

{{% bannerNote type="code" %}}
carto.ST_CASTTOGEOMETRY(geom)
{{%/ bannerNote %}}

**Description**

Casts `Geometry` subclass _g_ to a `Geometry`. This can be necessary e.g. when storing the output of `st_makePoint` as a `Geometry` in a case class.

* `geom`: `Geometry` input geom.

**Return type**

`Geometry`

**Example**

```sql
SELECT carto.ST_CASTTOGEOMETRY(carto.ST_POINT(-76.09130, 18.42750));
-- 4QgBz/HU1QXwwN6vAQA=
```


### ST_CASTTOLINESTRING

{{% bannerNote type="code" %}}
carto.ST_CASTTOLINESTRING(geom)
{{%/ bannerNote %}}

**Description**

Casts `Geometry` _g_ to a `LineString`.

* `geom`: `Geometry` input geom.

**Return type**

`LineString`

**Example**

```sql
SELECT carto.ST_CASTTOLINESTRING(carto.ST_GEOMFROMWKT('LINESTRING(75 29,77 29,77 27, 75 29)'));
-- 4QgBz/HU1QXwwN6vAQA=
```


### ST_CASTTOPOINT

{{% bannerNote type="code" %}}
carto.ST_CASTTOPOINT(geom)
{{%/ bannerNote %}}

**Description**

Casts `Geometry` _g_ to a `Point`.

* `geom`: `Geometry` input geom.

**Return type**

`Point`

**Example**

```sql
SELECT carto.ST_CASTTOPOINT(carto.ST_GEOMFROMWKT('POINT(75 29)'));
-- 4QgBgN6gywWAssiUAgA=
```


### ST_CASTTOPOLYGON

{{% bannerNote type="code" %}}
carto.ST_CASTTOPOLYGON(geom)
{{%/ bannerNote %}}

**Description**

Casts `Geometry` _g_ to a `Polygon`.

* `geom`: `Geometry` input geom.

**Return type**

`Polygon`

**Example**

```sql
SELECT carto.ST_CASTTOPOLYGON(carto.ST_GEOMFROMWKT('POLYGON((75 29, 77 29, 77 27, 75 29))'));
-- 4wgBAQSA3qDLBYCyyJQCAIC0iRMAAAD/s4kTAP+ziROAtIkTAA==
```


### ST_GEOHASH

{{% bannerNote type="code" %}}
carto.ST_GEOHASH(geom, prec)
{{%/ bannerNote %}}

**Description**

Returns the Geohash (in base-32 representation) of an interior point of `Geometry` _geom_. See [Geohash](https://www.geomesa.org/documentation/stable/user/appendix/utils.html#geohash) for more information on Geohashes.

* `geom`: `Geometry` input geom.
* `prec`: `Int` input precision.

**Return type**

`Point`

**Example**

```sql
SELECT carto.ST_GEOHASH(carto.ST_GEOMFROMWKT('POINT(-76.09130 18.42750)'), 8);
-- d4
```
