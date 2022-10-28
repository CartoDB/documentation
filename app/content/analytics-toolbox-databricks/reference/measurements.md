## measurements

<div class="badges"><div class="experimental"></div><div class="core"></div></div>

This module contains functions that compute measurements of distance, area and angles. There are also functions to compute geometry values determined by measurements.


### ST_AREA

{{% bannerNote type="code" %}}
carto.ST_AREA(geom)
{{%/ bannerNote %}}

**Description**

If `Geometry` _g_ is areal, returns the area of its surface in square units of the coordinate reference system (for example, `degrees^2` for EPSG:4326). Returns `0.0` for non-areal geometries (e.g. `Points`, non-closed `LineStrings`, etc.).

* `geom`: `Geometry` input geom.

**Return type**

`Double`

**Example**

```sql
SELECT carto.ST_AREA(carto.ST_MAKEBBOX(0, 0, 2, 2));
-- 4
```


### ST_DISTANCE

{{% bannerNote type="code" %}}
carto.ST_DISTANCE(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Returns the 2D Cartesian distance between the two geometries in units of the coordinate reference system (e.g. degrees for EPSG:4236).

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Double`

**Example**

```sql
SELECT carto.ST_DISTANCE(carto.ST_POINT(0, 0), carto.ST_POINT(0, 5));
-- 5
```


### ST_DISTANCESPHERE

{{% bannerNote type="code" %}}
carto.ST_DISTANCESPHERE(geomA, geomB)
{{%/ bannerNote %}}

**Description**

Approximates the minimum distance (in meters) between two longitude/latitude geometries assuming a spherical earth.

* `geomA`: `Geometry` input geom A.
* `geomB`: `Geometry` input geom B.

**Return type**

`Double`

**Example**

```sql
SELECT carto.ST_DISTANCESPHERE(carto.ST_POINT(0, 0), carto.ST_POINT(0, 5)) / 1000;
-- 555.9753986718438 (distance in km)
```


### ST_LENGTH

{{% bannerNote type="code" %}}
carto.ST_LENGTH(line)
{{%/ bannerNote %}}

**Description**

Returns the 2D path length of linear geometries, or perimeter of areal geometries, in units of the the coordinate reference system (e.g. degrees for EPSG:4236). Returns `0.0` for other geometry types (e.g. `Point`).

* `line`: `LineString` input line.

**Return type**

`Double`

**Example**

```sql
SELECT carto.ST_LENGTH(carto.ST_GEOMFROMWKT('LINESTRING(0 0, 0 3, 5 3)'));
-- 8
```


### ST_LENGTHSPHERE

{{% bannerNote type="code" %}}
carto.ST_LENGTHSPHERE(line)
{{%/ bannerNote %}}

**Description**

Approximates the 2D path length of a `LineString` geometry using a spherical earth model. The returned length is in units of meters. The approximation is within 0.3% of st_lengthSpheroid and is computationally more efficient.

* `line`: `LineString` input line.

**Return type**

`Double`

**Example**

```sql
SELECT carto.ST_LENGTHSPHERE(carto.ST_GEOMFROMWKT('LINESTRING(0 0, 0 3, 5 3)')) / 1000;
-- 888.7982099954688 (distance in km)
```
