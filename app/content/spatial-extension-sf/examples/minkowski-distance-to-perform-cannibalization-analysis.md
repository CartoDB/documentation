## Minkowski distance to perform cannibalization analysis

In this example we are going to showcase how to use the Minkowski distance to evaluate cannibalization across Starbucks stores in Los Ángeles, assuming that the ratio of cannibalization depends on the nearby store sizes and the distance to them. As we do not have real data concerning of the store, for the sake of simplicity we are going to use a randomly generated value: `starbucks_size`.

The first step consists of cross joining the data in order to extract the different Starbucks combinations. Then, we use `ST_MINKOWSKIDISTANCE` to compute the distances between the different geometries. Notice that since this function returns a matrix, we are using `GET` to get the position [0, 1] from this matrix.

```sql
WITH starbucks AS
(
  SELECT geog, 
  ROW_NUMBER() OVER(ORDER BY (SELECT NULL)) - 1 AS id,
  uniform(1, 10, random()) AS starbucks_size
  FROM sfcarto.public.STARBUCKS_LOCATIONS_USA 
  WHERE CITY = 'Los Angeles' AND geog IS NOT NULL
  ORDER BY id
),
crossjoined_starbucks AS
(
  SELECT t1.id AS t1_id, t1.geog AS t1_geog, t2.geog AS t2_geog, t1.starbucks_size AS t1_starbucks_size, t2.starbucks_size AS t2_starbucks_size
  FROM starbucks t1
  CROSS JOIN starbucks t2
  WHERE t1.id != t2.id
),
business_impact AS(
  SELECT t1_id, SUM(t2_starbucks_size * GET(GET(sfcarto.measurements.ST_MINKOWSKIDISTANCE(ARRAY_CONSTRUCT(ST_ASGEOJSON(t1_geog)::STRING,ST_ASGEOJSON(t2_geog)::STRING)), 0), 1)) AS received_cannibalization
  FROM crossjoined_starbucks
  GROUP BY t1_id
)
SELECT geog as geom, starbucks_size, received_cannibalization
FROM starbucks t1 
INNER JOIN business_impact t2 
ON t1.id = t2.t1_id
```

In the following visualization the size of the dots represent the size of the Starbucks stores and the color represents the level of cannibalization by other stores. It can be identified at first sight how those stores that are surrounded by other big stores appear in darker color than the isolated ones.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/325572b5-62d3-4062-af9f-5c5af8249bb1" title="Starbucks locations in the US aggregated in an quadkey grid of resolution 10."></iframe>
