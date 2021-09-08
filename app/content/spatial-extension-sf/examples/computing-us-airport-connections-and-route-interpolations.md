## Computing US airport connections and route interpolations

### Generating connections

In this example we will showcase how easily we can compute all the paths that interconnect the main four US airports using the Spatial Extension.

```sql
WITH data AS(
  SELECT 'SEA' AS abbrev, TO_GEOGRAPHY('POINT(-122.302289722924 47.4435819127259)') as geog UNION 
  SELECT 'MIA', TO_GEOGRAPHY('POINT(-80.2789718277441 25.7949407212406)') UNION
  SELECT 'LAX', TO_GEOGRAPHY('POINT(-118.402468548522 33.9441742543586)') UNION
  SELECT 'JFK', TO_GEOGRAPHY('POINT(-73.7863268609295 40.6459595584081)')
)
SELECT sfcarto.transformations.ST_GREATCIRCLE(t1.geog, t2.geog, 25) AS geom
FROM data AS t1
CROSS JOIN data AS t2
WHERE t1.abbrev != t2.abbrev
```

This query first creates all the possible combinations between airports and then generates the paths between them using the `ST_GREATCIRCLE` function. The resulting paths contain 25 points, but you can set the number of points in order to make the lines smoother if needed (you could also not include this parameter).

The result is displayed in this visualization. Notice that we are not using straight lines to interconnect the different airports, but great circles instead.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/8d5fabb5-6d8f-4933-b970-9ba637222cf5" title="US airports connections."></iframe> 


### Routes interpolation

Now let's put to the test how to perform line interpolations using the `ST_LINE_INTERPOLATE_POINT` function. In this example we will compute the airplane position after taking off from the different airports and travelling a certain distance.

```sql
WITH data AS(
  SELECT 'SEA' AS abbrev, TO_GEOGRAPHY('POINT(-122.302289722924 47.4435819127259)') as geog UNION 
  SELECT 'MIA', TO_GEOGRAPHY('POINT(-80.2789718277441 25.7949407212406)') UNION
  SELECT 'LAX', TO_GEOGRAPHY('POINT(-118.402468548522 33.9441742543586)') UNION
  SELECT 'JFK', TO_GEOGRAPHY('POINT(-73.7863268609295 40.6459595584081)')
)
SELECT CONCAT(t1.abbrev, ' - ', t2.abbrev) as route, 
  sfcarto.transformations.ST_LINE_INTERPOLATE_POINT(sfcarto.transformations.ST_GREATCIRCLE(t1.geog, t2.geog, 25), 500) AS geom
FROM data AS t1
CROSS JOIN data AS t2
WHERE t1.abbrev != t2.abbrev
```

This query uses the `ST_LINE_INTERPOLATE_POINT` function over each great circle in order to calculate the location of the plane after travelling 500 kilometers. In the following visualization you can see the resulting locations as well as their origin and destination airports.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/461a93f2-971c-4f59-89dc-623d19620f2e" title="US airports routes interpolation."></iframe>

