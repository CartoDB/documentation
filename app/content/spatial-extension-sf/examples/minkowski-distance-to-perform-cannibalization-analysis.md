## Minkowski distance to perform cannibalization analysis

In this example we are going to see how we can use Minkowski distance to evaluate cannibalization across Starbucks stores in Los Ángeles. In this case we will consider that the ratio of cannibalization depends on the nearby stores sizes and the distance to them. As we don’t have data concerning how one store influences the others we are going to simplify this problem by using a random generated value, starbucks_size.

First of all we cross join de data in order to extract the different Starbucks combinations. As `ST_MINKOWSKIDISTANCE` returns a matrix with the distances between the different geometries compared we are using GET to get the position [0, 1] from the matrix.

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

In this example the size of the dot represents the size of the Starbuck store and the color represents how much could be cannibalize by other stores.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/325572b5-62d3-4062-af9f-5c5af8249bb1" title="Starbucks locations in the US aggregated in an quadkey grid of resolution 10."></iframe>
