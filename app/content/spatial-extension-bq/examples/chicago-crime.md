## Chicago Crime

### Generating clusters (ST_GREATCIRCLE)

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

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/f814e0e6-8b82-4227-b331-d8f2eb65e881" title="Chicago crime clusters."></iframe>

### Generating the cluster centers (ST_CENTERMEAN, ST_CENTERMEDIAN, ST_CENTEROFMASS)

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

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/e35bf735-8b57-4b52-b455-dcda5f61b493" title="Chicago crime clusters centers."></iframe>