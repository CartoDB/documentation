## Chicago Crime

### Generating clusters (ST_CLUSTERKMEANS)

In this example we are going to show some of the posibilities of points clustering. In order to illustrate it, we are going take 5000 samples of crimes in Chicago and will decide were to locate 5 police stations by calculating the centers of these clusters.

```sql
WITH data AS(
    SELECT ST_GEOGPOINT(longitude, latitude) AS geom
    FROM `bigquery-public-data`.chicago_crime.crime
    WHERE longitude IS NOT NULL AND latitude IS NOT NULL
    LIMIT 5000
),
clustered_points AS
(
    SELECT bqcarto.clustering.ST_CLUSTERKMEANS(ARRAY_AGG(geom), 5) AS cluster_arr
    FROM data
)
SELECT cluster_element.cluster, ST_UNION_AGG(cluster_element.geom) AS geo FROM clustered_points, UNNEST(cluster_arr) AS cluster_element GROUP BY cluster_element.cluster
```

This query takes the crimes sample, gathers their geometries in order to stablish clusters and then groups the different geometry clusters.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/f814e0e6-8b82-4227-b331-d8f2eb65e881" title="Chicago crime clusters."></iframe>

On this visualization we can easily identify the different clusters by colors.

Note: this visualization is made using Builder, where you can easily import your BigQuery data using our connector, but you can also create a quick visualization using [BigQuery Geo Viz](https://bigquerygeoviz.appspot.com). 

### Calculating the cluster centers (ST_CENTERMEDIAN)

Once we have splitted the sample of points into cluster we can easily work with them calculating centers, envelopes, concave/convex hulls and other different transformations.

```sql
WITH data AS(
    SELECT ST_GEOGPOINT(longitude, latitude) AS geom
    FROM `bigquery-public-data`.chicago_crime.crime
    WHERE longitude IS NOT NULL AND latitude IS NOT NULL
    LIMIT 5000
),
clustered_points AS
(
    SELECT bqcarto.clustering.ST_CLUSTERKMEANS(ARRAY_AGG(geom), 5) AS cluster_arr
    FROM data
)
SELECT cluster_element.cluster, bqcarto.transformations.ST_CENTERMEDIAN(ST_UNION_AGG(cluster_element.geom)) AS center FROM clustered_points, UNNEST(cluster_arr) AS cluster_element GROUP BY cluster_element.cluster
```

In order to find the center of a set of geometries we currently provide different possibilities: `ST_CENTERMEAN`, `ST_CENTERMEDIAN` and `ST_CENTEROFMASS`. As you an see in the previous query we have used `ST_CENTERMEDIAN` to calculate the placement of the differnet police stations.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/e35bf735-8b57-4b52-b455-dcda5f61b493" title="Chicago crime clusters centers."></iframe>

On the previous visualization the 5 bigger dots represent where would be located the different police stations.