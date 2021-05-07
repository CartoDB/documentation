## US Airports

### Generating connections (ST_GREATCIRCLE)

We are going to show how easy could be displaying the different paths that can be taken in order to go between different points. In this case we are going to illustrate this example with four of the main US airports.

```sql
WITH data AS(
    SELECT *
    FROM `carto-do-public-data`.natural_earth.geography_glo_airports_410 
	WHERE abbrev = 'JFK' OR abbrev = 'LAX'  OR abbrev = 'SEA'  OR abbrev = 'MIA'
)
SELECT bqcarto.transformations.ST_GREATCIRCLE(t1.geom, t2.geom, 25) AS geo
FROM data AS t1
CROSS JOIN data AS t2
WHERE t1.abbrev != t2.abbrev
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/f54fe4b8-fee3-4e2d-a9d1-4f8a632eba71" title="US airports connections."></iframe>




### Routes interpolation (ST_LINE_INTERPOLATE_POINT)


```sql
WITH data AS(
    SELECT *
    FROM `carto-do-public-data`.natural_earth.geography_glo_airports_410 
	WHERE abbrev = 'JFK' OR abbrev = 'LAX'  OR abbrev = 'SEA'  OR abbrev = 'MIA'
)
SELECT CONCAT(t1.abbrev, " - ", t2.abbrev) as route, bqcarto.transformations.ST_LINE_INTERPOLATE_POINT(bqcarto.transformations.ST_GREATCIRCLE(t1.geom, t2.geom, 25), 500,'kilometers') AS geo
FROM data AS t1
CROSS JOIN data AS t2
WHERE t1.abbrev != t2.abbrev
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/b5c490e8-81ec-4c6f-ad67-864509d734d6" title="US airports routes interpolation."></iframe>