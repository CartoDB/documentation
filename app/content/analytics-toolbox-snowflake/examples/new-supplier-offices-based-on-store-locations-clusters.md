---
title: "New supplier offices based on store locations clusters"
description: "In this example we are going to use points clustering to analyze where to locate 10 new supplier offices in US so they can best serve all Starbucks locations."
image: "/img/sf-analytics-toolbox/examples/supplier-offices-clusters.png"
type: examples
date: "2021-07-12"
categories:
    - clustering
    - transformations
aliases:
    - /analytics-toolbox-sf/examples/new-supplier-offices-based-on-store-locations-clusters/
---
## New supplier offices based on store locations clusters

In this example we are going to use points clustering to analyze where to locate 10 new supplier offices in US so they can best serve all Starbucks locations.

### Generating the clusters

First, we calculate Starbucks locations clusters using the `ST_CLUSTERKMEANS` function:

```sql
WITH data AS(
  SELECT geog
  FROM sfcarto.public.starbucks_locations_usa
  WHERE geog IS NOT null
  ORDER BY id
),
clustered_points AS
(
    SELECT carto.ST_CLUSTERKMEANS(ARRAY_AGG(ST_ASGEOJSON(geog)::STRING), 10) AS cluster_arr
    FROM data
)
SELECT GET(VALUE, 'cluster') AS cluster, TO_GEOGRAPHY(GET(VALUE, 'geom')) AS geom
FROM clustered_points, lateral FLATTEN(input => cluster_arr)
```

This query gathers the geometries of the Starbucks locations in order to establish clusters and then groups the different geometry clusters. Each of them is represented in a different colour in the following visualization.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/f5aea541-c0d8-476c-9533-dbbe99f07152" title="Starbucks locations clusters."></iframe>

### Calculating the clusters' centers

Once we have split the sample of points into clusters, we can easily work with them to calculate their centers, envelopes, concave/convex hulls and other different transformations. In this particular example we are interested in finding the center of the clusters, since that is where we are going to place the offices. The Analytics Toolbox offers different functions for this task, for example `ST_CENTERMEAN`, `ST_CENTERMEDIAN` and `ST_CENTEROFMASS`.

In this case we are going to use `ST_CENTEROFMASS` to calculate the location of the new offices:

```sql
WITH data AS(
  SELECT geog
  FROM sfcarto.public.starbucks_locations_usa
  WHERE geog IS NOT null
  ORDER BY id
),
clustered_points AS
(
    SELECT carto.ST_CLUSTERKMEANS(ARRAY_AGG(ST_ASGEOJSON(geog)::STRING), 10) AS cluster_arr
    FROM data
)
SELECT GET(VALUE, 'cluster') AS cluster, carto.ST_CENTEROFMASS(ST_COLLECT(TO_GEOGRAPHY(GET(VALUE, 'geom')))) AS geom
FROM clustered_points, lateral FLATTEN(input => cluster_arr)
GROUP BY cluster
```

We can see the result in the following visualization, where the bigger dots represent the supplier offices locations we have decided to open based on our analysis.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/c2221971-9acf-4838-8c21-35d4057391d0" title="Starbucks locations clusters centers."></iframe>

