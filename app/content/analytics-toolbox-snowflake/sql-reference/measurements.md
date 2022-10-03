---
aliases:
    - /analytics-toolbox-sf/sql-reference/measurements/
---
## measurements

<div class="badges"><div class="core"></div></div>

This module contains functions that compute measurements of distance, area and angles. There are also functions to compute geometry values determined by measurements.


### ST_MINKOWSKIDISTANCE

{{% bannerNote type="code" %}}
carto.ST_MINKOWSKIDISTANCE(geog [, p])
{{%/ bannerNote %}}

**Description**

Calculate the Minkowski p-norm distance between two features.

* `geojsons`: `ARRAY` array of features in GeoJSON format casted to STRING.
* `p` (optional): `FLOAT64` minkowski p-norm distance parameter. 1: Manhattan distance. 2: Euclidean distance. 1 =< p <= infinity. By default `p` is `2`.

**Return type**

`ARRAY`

**Examples**

``` sql
SELECT carto.ST_MINKOWSKIDISTANCE(
  ARRAY_CONSTRUCT(
    ST_ASGEOJSON(ST_POINT(10,10))::STRING,
    ST_ASGEOJSON(ST_POINT(13,10))::STRING
  )
);
-- [ [ 0, 3.333333333333333e-01 ], [ 3.333333333333333e-01, 0 ] ]
```

``` sql
SELECT carto.ST_MINKOWSKIDISTANCE(
  ARRAY_CONSTRUCT(
    ST_ASGEOJSON(ST_POINT(10,10))::STRING,
    ST_ASGEOJSON(ST_POINT(13,10))::STRING
  ),
  2
);
-- [ [ 0, 3.333333333333333e-01 ], [ 3.333333333333333e-01, 0 ] ]
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Minkowski distance to perform cannibalization analysis](/analytics-toolbox-snowflake/examples/minkowski-distance-to-perform-cannibalization-analysis/)
{{%/ bannerNote %}}
