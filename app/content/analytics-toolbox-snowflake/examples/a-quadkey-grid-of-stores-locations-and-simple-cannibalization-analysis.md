---
title: "A Quadkey grid of stores locations and simple cannibalization analysis"
description: "We are going to demonstrate how fast and easy it is to make a visualization of a Quadkey grid to identify the concentration of Starbucks locations in the US."
image: "/img/sf-analytics-toolbox/examples/starbucks-usa-quadkey-grid.png"
type: examples
date: "2021-10-12"
categories:
    - quadbin
aliases:
    - /analytics-toolbox-sf/examples/a-quadkey-grid-of-stores-locations-and-simple-cannibalization-analysis/
---
## A Quadkey grid of stores locations and simple cannibalization analysis

### Bulding the Quadkey grid

We are going to demonstrate how fast and easy it is to make a visualization of a Quadkey grid to identify the concentration of Starbucks locations in the US.
With a single query, we are going to calculate how many Starbucks locations fall within each quadkey grid cell of resolution 10.

```sql
WITH data AS (
  SELECT carto.QUADINT_FROMGEOGPOINT(geog, 10) AS qk,
  COUNT(*) as agg_total
  FROM sfcarto.public.starbucks_locations_usa
  WHERE geog IS NOT null
  GROUP BY qk
)
SELECT
  qk,
  agg_total,
  carto.QUADINT_BOUNDARY(qk) AS geom
FROM
  data
```

This query adds two new columns to our dataset: `geom`, representing the boundary of each of the Quadkey grid cells where there’s at least one Starbucks, and `agg_total`, containing the total number of locations that fall within each cell. Finally, we can visualize the result.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/ad949347-876c-4ea0-88df-e4113e5dcc91" title="Starbucks locations in the US aggregated in an quadkey grid of resolution 10."></iframe>

### Using finer resolution Quadkeys for simple cannibalization analysis

Next, we will analyze in finer detail the grid cells in Las Vegas to identify potential cannibalizations through to analysis of the surroundings of each store. We present the same analysis applying two different methods, which simply differ in the way the influence areas around each store are defined.

The first method uses the `QUADINT_KRING` function with distance 1 to define an area of influence around each store, and then aggregates the quadkey indexes around each Starbucks location.

```sql
WITH data AS (
  SELECT carto.QUADINT_KRING(
  carto.QUADINT_FROMGEOGPOINT(geog, 15), 1) AS qk
  FROM sfcarto.public.starbucks_locations_usa
  WHERE city = 'Las Vegas' AND geog IS NOT null
),
flat_qks AS(
  SELECT VALUE::BIGINT as qk,
  count(*) AS agg_total,
  carto.QUADINT_BOUNDARY(VALUE) AS geom
  FROM data, lateral FLATTEN(input => qk)
  GROUP BY VALUE
)
SELECT * FROM flat_qks
```

Visualizing the results we can clearly identify the areas in Las Vegas that are overserved by Starbucks, represented by the darkest colours.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/2834aa81-96c0-4e00-b5bb-5a92c85a1caa" title="Starbucks locations around Las Vegas aggregated in an Quadkey grid of resolution 15 by using krings."></iframe>

The second approach calculates how many Starbucks fall within a radius of three kilometers around each location. We first use the function `ST_MAKEELLIPSE` to generate the buffer around each point. Notice that we are reducing the number of default steps used to calculate these buffers, as it will not cause major differences in the result but it greatly improves performance.

```sql
WITH data AS (
  SELECT carto.QUADINT_POLYFILL(
  carto.ST_MAKEELLIPSE(geog, 3, 3, 0, 'kilometers', 12), 15) AS qk
  FROM sfcarto.public.starbucks_locations_usa
  WHERE city = 'Las Vegas' AND geog IS NOT null
),
flat_qks AS(
  SELECT VALUE::BIGINT as qk,
  count(*) AS agg_total,
  carto.QUADINT_BOUNDARY(VALUE) AS geom
  FROM data, lateral FLATTEN(input => qk)
  GROUP BY VALUE
)
SELECT * FROM flat_qks
```

Darkest areas on the map are those with the higher coverage by Starbucks.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/6f911e00-6328-47a8-8145-92a0f9f2d24c" title="Starbucks locations around Las Vegas aggregated in an Quadkey grid of resolution 15 by using ellipses."></iframe>