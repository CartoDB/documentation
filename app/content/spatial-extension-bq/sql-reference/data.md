## data

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions which make use of CARTO DO data.

### ST_GETPOPULATIONDENSITY

{{% bannerNote type="code" %}}
data.ST_GETPOPULATIONDENSITY(point)
{{%/ bannerNote %}}

**Description**

Obtains the population density (inhabitants per square kilometers) at a given point.
It uses 2020 [WorldPop](https://www.worldpop.org/) data at a resolution of 100 meters.

* `point`: `GEOGRAPHY` A point, around which the population density is computed.

**Return type**

`FLOAT64`

**Example**

Get the population density at longitude -75, latitude 40.7 (63.3 people per square km):

```sql
SELECT bqcarto.data.ST_GETPOPULATIONDENSITY(ST_GEOGPOINT(-75.0, 40.7))
-- 63.33362208137477
```

### VERSION

{{% bannerNote type="code" %}}
data.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the DATA module.

**Return type**

`STRING`

**Example**

```sql
SELECT bqcarto.data.VERSION();
-- 1.0.0
```
