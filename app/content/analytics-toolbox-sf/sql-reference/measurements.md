## measurements

<div class="badges"><div class="core"></div></div>

This module contains functions that compute measurements of distance, area and angles. There are also functions to compute geometry values determined by measurements.

### ST_ANGLE

{{% bannerNote type="code" %}}
measurements.ST_ANGLE(startPoint, midPoint, endPoint)
{{%/ bannerNote %}}

**Description**

Finds the angle formed by two adjacent segments defined by 3 points. The result will be the (positive clockwise) angle with origin on the startPoint-midPoint segment, or its explementary angle if required.

* `startPoint`: `GEOGRAPHY` start Point Coordinates.
* `midPoint`: `GEOGRAPHY` mid Point Coordinates.
* `endPoint`: `GEOGRAPHY` end Point Coordinates.

**Return type**

`DOUBLE`

**Example**

``` sql
SELECT sfcarto.measurements.ST_ANGLE(ST_POINT(-3.70325 ,40.4167), ST_POINT(-4.70325 ,10.4167), ST_POINT(-5.70325 ,40.4167));
-- 3.933094586
```

### ST_AZIMUTH

{{% bannerNote type="code" %}}
measurements.ST_AZIMUTH(startPoint, endPoint)
{{%/ bannerNote %}}

**Description**

Takes two points and finds the geographic bearing between them, i.e. the angle measured in degrees from the north line (0 degrees).

* `startPoint`: `GEOGRAPHY` starting Point.
* `endPoint`: `GEOGRAPHY` ending Point.

**Return type**

`DOUBLE`

**Example**

``` sql
SELECT sfcarto.measurements.ST_AZIMUTH(ST_POINT(-3.70325 ,40.4167), ST_POINT(-4.70325 ,41.4167));
-- -36.750529085
```

### ST_MINKOWSKIDISTANCE

{{% bannerNote type="code" %}}
measurements.ST_MINKOWSKIDISTANCE(geog [, p])
{{%/ bannerNote %}}

**Description**

Calculate the Minkowski p-norm distance between two features.

* `geojsons`: `ARRAY` array of features in GeoJSON format casted to STRING.
* `p` (optional): `FLOAT64` minkowski p-norm distance parameter. 1: Manhattan distance. 2: Euclidean distance. 1 =< p <= infinity. By default `p` is `2`.

**Return type**

`ARRAY`

**Examples**

``` sql
SELECT sfcarto.measurements.ST_MINKOWSKIDISTANCE(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(10,10))::STRING, ST_ASGEOJSON(ST_POINT(13,10))::STRING));
-- [ [ 0, 3.333333333333333e-01 ], [ 3.333333333333333e-01, 0 ] ]
```

``` sql
SELECT sfcarto.measurements.ST_MINKOWSKIDISTANCE(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(10,10))::STRING, ST_ASGEOJSON(ST_POINT(13,10))::STRING), 2);
-- [ [ 0, 3.333333333333333e-01 ], [ 3.333333333333333e-01, 0 ] ]
```

### VERSION

{{% bannerNote type="code" %}}
measurements.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the measurements module.

**Return type**

`STRING`

**Example**

```sql
SELECT sfcarto.measurements.VERSION();
-- 1.0.0
```