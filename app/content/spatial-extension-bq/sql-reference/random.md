## random

<div class="badges"><div class="advanced"></div></div>

This module contains functions to generate random geographies.

### ST_GENERATEPOINTS

{{% bannerNote type="code" %}}
random.ST_GENERATEPOINTS(geog, npoints)
{{%/ bannerNote %}}

**Description**

Generates randomly placed points inside a polygon and returns them in an array of geographies.

{{% bannerNote type="warning" title="warning"%}}
It never generates more than the requested number of points, but there is a small chance of generating less points.
{{%/ bannerNote %}}

* `geog`: `GEOGRAPHY` a polygon; the random points generated will be inside this polygon.
* `npoints`: `INT64` number of points to generate.

**Return type**

`ARRAY<GEOGRAPHY>`

**Example**

```sql
WITH blocks AS (
  SELECT d.total_pop, g.blockgroup_geom
  FROM `bigquery-public-data.geo_census_blockgroups.us_blockgroups_national` AS g
  INNER JOIN `bigquery-public-data.census_bureau_acs.blockgroup_2018_5yr` AS d ON g.geo_id = d.geo_id
  WHERE g.county_name = 'Sonoma County'
),
point_lists AS (
  SELECT bqcarto.random.ST_GENERATEPOINTS(blockgroup_geom, CAST(total_pop AS INT64)) AS points
  FROM blocks
)
SELECT points FROM point_lists CROSS JOIN point_lists.points
```

### VERSION

{{% bannerNote type="code" %}}
random.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the random module.

**Return type**

`STRING`

**Example**

```sql
SELECT bqcarto.random.VERSION();
-- 1.0.0
```