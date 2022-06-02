---
title: "New police stations based on Chicago crime location clusters"
description: "In this example we are going to use points clustering to analyze where to locate five new police stations in Chicago based on 5000 samples of crime locations."
image: "/img/bq-analytics-toolbox/examples/chicago-police-stations.png"
type: examples
date: "2021-07-12"
categories:
    - clustering
    - transformations
aliases:
    - /analytics-toolbox-bq/examples/new-police-stations-based-on-chicago-crime-location-clusters/
---
## New police stations based on Chicago crime location clusters

In this example we are going to use points clustering to analyze where to locate five new police stations in Chicago based on 5000 samples of crime locations.

### Generating the clusters

First, we calculate crime locations clusters using the `ST_CLUSTERKMEANS` function:

```sql
WITH clustered_points AS
(
    SELECT `carto-un`.carto.ST_CLUSTERKMEANS(ARRAY_AGG(ST_GEOGPOINT(longitude, latitude)), 5) AS cluster_arr
    FROM cartobq.docs.chicago_crime_sample
)
SELECT cluster_element.cluster, cluster_element.geom AS geom FROM clustered_points, UNNEST(cluster_arr) AS cluster_element
```

This query takes the crimes samples data, gathers their geometries in order to establish clusters and then groups the different geometry clusters. In the following visualization we can easily identify the different clusters by colors.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/557ec65b-9715-49fd-9617-19d684fc8a60" title="Chicago crime clusters."></iframe>

### Calculating the clusters' centers

Once we have split the sample of points into clusters, we can easily work with them to calculate their centers, envelopes, concave/convex hulls and other different transformations. In this particular example we are interested in finding the center of the clusters, since that is where we are going to place the police stations. The Analytics Toolbox offers different functions for this task: `ST_CENTERMEAN`, `ST_CENTERMEDIAN` and `ST_CENTEROFMASS`. In this case let's use `ST_CENTERMEDIAN` to calculate the location of the new police stations:

```sql
WITH clustered_points AS
(
    SELECT `carto-un`.carto.ST_CLUSTERKMEANS(ARRAY_AGG(ST_GEOGPOINT(longitude, latitude)), 5) AS cluster_arr
    FROM cartobq.docs.chicago_crime_sample
)
SELECT cluster_element.cluster, `carto-un`.carto.ST_CENTERMEDIAN(ST_UNION_AGG(cluster_element.geom)) AS geom FROM clustered_points, UNNEST(cluster_arr) AS cluster_element GROUP BY cluster_element.cluster
```

We can see the result in the following visualization, where the bigger dots represent the police stations we have decided to open based on our analysis:

<iframe height=480px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/8630e041-82bb-4100-8af6-6fc1ea1362bd" title="Chicago crime clusters centers."></iframe>

{{% euFlagFunding %}}
