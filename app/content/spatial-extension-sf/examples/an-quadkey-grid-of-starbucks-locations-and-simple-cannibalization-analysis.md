## An Quadkey grid of Starbucks locations and simple cannibalization analysis

### Bulding the Quadkey grid

We are going to demonstrate how fast and easy is to make a visualization of an Quadkey grid to identify the concentration of Starbucks locations in the US.
With a single query, we are going to calculate how many Starbucks locations fall within each quadkey grid cell of resolution 10.

```sql
WITH data AS (
  SELECT sfcarto.quadkey.ST_ASQUADINT(geog, 10) AS qk,
  COUNT(*) as agg_total
  FROM sfcarto.public.starbucks_locations_usa
  WHERE geog IS NOT null
  GROUP BY qk
)
SELECT
  qk, 
  agg_total,
  sfcarto.quadkey.ST_BOUNDARY(qk) AS geom
FROM
  data
```

This query adds two new columns to our dataset: geom, with the boundary of each of the Quadkey grid cells where there’s at least one Starbucks, and agg_total, with the total number of locations that fall within each cell. Finally, we can visualize the result. 

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/ad949347-876c-4ea0-88df-e4113e5dcc91" title="Starbucks locations in the US aggregated in an quadkey grid of resolution 10."></iframe>

### Using finer resolution Quadkey for simple cannibalization analysis

Next, we will analyze in finer detail the grid cells inside to Las Vegas. In order to do that we are going to see two different methods. 

On the first one we will use `KRING` with distance 1 to aggregate the quadkey indexes immediately next to each Starbucks location.

```sql
WITH data AS (
  SELECT sfcarto.quadkey.KRING(
  sfcarto.quadkey.ST_ASQUADINT(geog, 15), 1) AS qk
  FROM sfcarto.public.starbucks_locations_usa
  WHERE city = 'Las Vegas' AND geog IS NOT null
),
flat_qks AS(
  SELECT VALUE::BIGINT as qk,
  count(*) AS agg_total, 
  sfcarto.quadkey.ST_BOUNDARY(VALUE) AS geom
  FROM data, lateral FLATTEN(input => qk)
  GROUP BY VALUE
)
SELECT * FROM flat_qks
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/2834aa81-96c0-4e00-b5bb-5a92c85a1caa" title="Starbucks locations around Las Vegas aggregated in an Quadkey grid of resolution 15 by using krings."></iframe>

On the other approach, we are going to calculate how many Starbucks falls within a given radius in order to try to avoid cannibalization. For that we just have to aggregate the polyfill result for a given radius, in hour case 3 Kilometers. We use `ST_MAKEELLIPSE` to generate a buffer around the points, notice that this function could work by just passing three parameters but in this case reducing the number of default steps will not cause major differences and will improve performance. 

```sql
WITH data AS (
  SELECT sfcarto.quadkey.ST_ASQUADINT_POLYFILL(
  sfcarto.constructors.ST_MAKEELLIPSE(geog, 3, 3, 0, 'kilometers', 12), 15) AS qk
  FROM sfcarto.public.starbucks_locations_usa
  WHERE city = 'Las Vegas' AND geog IS NOT null
),
flat_qks AS(
  SELECT VALUE::BIGINT as qk,
  count(*) AS agg_total, 
  sfcarto.quadkey.ST_BOUNDARY(VALUE) AS geom
  FROM data, lateral FLATTEN(input => qk)
  GROUP BY VALUE
)
SELECT * FROM flat_qks
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/6f911e00-6328-47a8-8145-92a0f9f2d24c" title="Starbucks locations around Las Vegas aggregated in an Quadkey grid of resolution 15 by using ellipses."></iframe>