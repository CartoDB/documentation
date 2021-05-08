## Delaunay

### A NYC subway connection graph

Choosing a good network connection between subway stations is critical to ensure an efficient mobility in big areas. Let's imagine we have as a task to provide a well-distributed subway routes among some point of interests where the stations of a brand-new subway system is planned. A quick and easy solution would be to build a Delaunay triangulation of the predefined stations, which leads to a good connection distribution.

In this use case we are taking the New York city subway stations to build the cited triangulation. Assuming we have loaded the subway data into the table `carto-docs.examples.nyc_subway_stations`, the next query will construct the triangulation.

```sql
WITH data AS (
    SELECT ARRAY(
        SELECT geom FROM `carto-docs.examples.nyc_subway_stations`
    ) AS array_points
),
delaunay_array AS (
    SELECT bqcarto.processing.ST_DELAUNAYLINES(array_points) AS nested
    FROM data
),
delaunay_triangles AS (
    SELECT geom 
    FROM delaunay_array, UNNEST(nested) AS geom
)

SELECT ANY_VALUE(subways.geom) AS geom, COUNT(*) AS connections
FROM `carto-docs.examples.nyc_subway_stations` AS subways
JOIN delaunay_triangles
ON ST_INTERSECTS(delaunay_triangles.geom, subways.geom)
GROUP BY(subways.id)
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://team.carto.com/u/agraciano/builder/042cc9d2-437e-49b4-bd3d-a293ad9123e1/layers#/" title="Delaunay triangulation of the NYC subway stations. The line connections are represented with the color and size of the points."></iframe>

In this example, also each subway station is represented by a point whose color and size represent the number of received connections.

As a curiosity, the average number of connections is close to 6 that indicates a balanced distribution of the stations, according to the Delaunay triangulation [properties](https://en.wikipedia.org/wiki/Delaunay_triangulation#Properties).

