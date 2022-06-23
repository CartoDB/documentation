---
aliases:
    - /analytics-toolbox-bq/sql-reference/measurements/
---
## measurements

<div class="badges"><div class="core"></div></div>

This module contains functions that compute measurements of distance, area and angles. There are also functions to compute geometry values determined by measurements.

### ST_ANGLE

{{% bannerNote type="code" %}}
carto.ST_ANGLE(startPoint, midPoint, endPoint, mercator)
{{%/ bannerNote %}}

**Description**

Finds the angle formed by two adjacent segments defined by 3 points. The result will be the (positive clockwise) angle with origin on the startPoint-midPoint segment, or its explementary angle if required.

* `startPoint`: `GEOGRAPHY` start Point Coordinates.
* `midPoint`: `GEOGRAPHY` mid Point Coordinates.
* `endPoint`: `GEOGRAPHY` end Point Coordinates.
* `mercator`: `BOOLEAN`|`NULL` if calculations should be performed over Mercator or WGS84 projection. If `NULL` the default value `false` is used.

**Return type**

`FLOAT64`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

``` sql
SELECT `carto-os`.carto.ST_ANGLE(ST_GEOGPOINT(-3.70325 ,40.4167), ST_GEOGPOINT(-4.70325 ,10.4167), ST_GEOGPOINT(-5.70325 ,40.4167), false);
-- 3.933094586038578
```

### ST_MINKOWSKIDISTANCE

{{% bannerNote type="code" %}}
carto.ST_MINKOWSKIDISTANCE(geog, p)
{{%/ bannerNote %}}

**Description**

Calculate the Minkowski p-norm distance between two features.

* `geog`: `ARRAY<GEOGRAPHY>` featureCollection.
* `p`: `FLOAT64` minkowski p-norm distance parameter. 1: Manhattan distance. 2: Euclidean distance. 1 =< p <= infinity. If `NULL` the default value `2` is used.

**Return type**

`ARRAY<STRING>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

``` sql
SELECT `carto-os`.carto.ST_MINKOWSKIDISTANCE([ST_GEOGPOINT(10,10),ST_GEOGPOINT(13,10)],2);
-- ["0,0.3333333333333333","0.3333333333333333,0"]
```

{{% euFlagFunding %}}