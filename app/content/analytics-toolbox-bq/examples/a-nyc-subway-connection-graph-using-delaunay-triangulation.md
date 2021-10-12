## A NYC subway connection graph using Delaunay triangulation

Providing a good network connection between subway stations is critical to ensure an efficient mobility system in big areas. Let's imagine we need to design a well-distributed subway network to connect the stations of a brand-new subway system. A simple and effective solution to this problem is to build a Delaunay triangulation of the predefined stations, which ensures a good connection distribution.

For this particular example we are choosing the New York city subway stations to build the cited triangulation. The following query will construct the triangulation using the `ST_DELAUNAYLINES` function from the processing module of the Analytics Toolbox.

```sql
WITH data AS (
    SELECT ARRAY(
        SELECT geom FROM `cartobq.docs.nyc_subway_stations`
    ) AS array_points
),
delaunay_array AS (
    SELECT `carto-un`.processing.ST_DELAUNAYLINES(array_points) AS nested
    FROM data
),
delaunay_triangles AS (
    SELECT geom 
    FROM delaunay_array, UNNEST(nested) AS geom
)

SELECT ANY_VALUE(subways.geom) AS geom, COUNT(*) AS connections
FROM `cartobq.docs.nyc_subway_stations` AS subways
JOIN delaunay_triangles
ON ST_INTERSECTS(delaunay_triangles.geom, subways.geom)
GROUP BY(subways.id)
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://team.carto.com/u/agraciano/builder/042cc9d2-437e-49b4-bd3d-a293ad9123e1/layers#/" title="Delaunay triangulation of the NYC subway stations. The line connections are represented with the color and size of the points."></iframe>

In the visualization above each subway station is represented by a point whose color and size represent the number of received connections.

As a curiosity, the average number of connections between the existing New Yorks subway stations is close to six, which indicates a balanced distribution of the stations according to the [Delaunay triangulation properties](https://en.wikipedia.org/wiki/Delaunay_triangulation#Properties).

