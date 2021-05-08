## Constructor and polygonize

### Identifying earthquake-prone areas in the state of California

For this example, we are going to show some of the functions included in our Spatial Extension in order to highlight zones prone to earthquakes, using a [BigQuery public dataset](https://console.cloud.google.com/marketplace/product/noaa-public/noaa-earthquakes). 

First of all, we choose a region of interest, in this case, a bounding box enclosing the state of California. `ST_MAKEENVELOPE` returns the geometry with which the point filtering process is carried out. Then, by means of `ST_CONCAVEHULL` function, the concave hull polygon enclosing the filtered points is built. For visualization purposes, this polygon is smoothed by applying to it the `ST_BEZIERSPLINE` function. Finally, the boundaries of the polygon are unnested from the resulting array and the final geography is built (using the `ST_POLYGONIZE` function).

```sql
WITH bounds AS (
    SELECT bqcarto.constructors.ST_MAKEENVELOPE(-126.98746757203217, 31.72298737861544, -118.1856191911019, 40.871240645013735) AS bbox
),
data AS (
    SELECT ST_GEOGPOINT(longitude, latitude) AS points
    FROM `bigquery-public-data`.noaa_significant_earthquakes.earthquakes
    JOIN bounds
    ON ST_CONTAINS(bounds.bbox, ST_GEOGPOINT(longitude, latitude))
    WHERE longitude IS NOT NULL AND latitude IS NOT NULL
),
bezier_spline AS (
    SELECT bqcarto.constructors.ST_BEZIERSPLINE(
        ST_BOUNDARY(
        bqcarto.transformations.ST_CONCAVEHULL(ARRAY_AGG(points), 300, "kilometres")), 
        null,
        0.9) AS geom
    FROM data
),
polygon_array AS (
    SELECT bqcarto.processing.ST_POLYGONIZE(ARRAY_AGG(geom)) AS geom
    FROM bezier_spline
) 
SELECT unnested FROM polygon_array, UNNEST(geom) AS unnested
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://team.carto.com/u/agraciano/builder/3e6b32e2-0049-42b9-ba20-d26342f4d14d/layers#/" title="Earthquake-prone area in the state of California"></iframe>