---
title: "A NYC subway connection graph using Delaunay triangulation"
description: "Providing a good network connection between subway stations is critical to ensure an efficient mobility system in big areas. Let's imagine we need to design a well-distributed subway network to connect the stations of a brand-new subway system. A simple and effective solution to this problem is to build a Delaunay triangulation of the predefined stations, which ensures a good connection distribution."
image: "/img/bq-analytics-toolbox/examples/nyc-subway-graph.png"
type: examples
date: "2021-05-12"
categories:
    - processing
aliases:
    - /analytics-toolbox-bq/examples/a-nyc-subway-connection-graph-using-delaunay-triangulation/
---

## A NYC subway connection graph using Delaunay triangulation

Providing a good network connection between subway stations is critical to ensure an efficient mobility system in big areas. Let's imagine we need to design a well-distributed subway network to connect the stations of a brand-new subway system. A simple and effective solution to this problem is to build a Delaunay triangulation of the predefined stations, which ensures a good connection distribution.

For this particular example we are choosing the New York city subway stations to build the cited triangulation. The following query will construct the triangulation using the `ST_DELAUNAYLINES` function from the processing module of the Analytics Toolbox.

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
WITH data AS (
    SELECT ARRAY(
        SELECT geom FROM `cartobq.docs.nyc_subway_stations`
    ) AS array_points
),
delaunay_array AS (
    SELECT `carto-un`.carto.ST_DELAUNAYLINES(array_points) AS nested
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

![](/img/bq-analytics-toolbox/examples/nyc-subway-graph.png)

In the visualization above each subway station is represented by a point whose color and size represent the number of received connections.

As a curiosity, the average number of connections between the existing New Yorks subway stations is close to six, which indicates a balanced distribution of the stations according to the [Delaunay triangulation properties](https://en.wikipedia.org/wiki/Delaunay_triangulation#Properties).

{{% euFlagFunding %}}
