---
title: "Identifying earthquake-prone areas in the state of California"
description: "In this example we are going to use some of the functions included in CARTO's Analytics Toolbox in order to highlight zones prone to earthquakes, using a  BigQuery public dataset."
image: "/img/bq-analytics-toolbox/examples/earthquake-prone-california.png"
type: examples
date: "2021-04-12"
categories:
    - constructors
    - transformations
    - processing
---
## Identifying earthquake-prone areas in the state of California

In this example we are going to use some of the [functions](/analytics-toolbox-bq/sql-reference/overview/) included in CARTO's Analytics Toolbox in order to highlight zones prone to earthquakes, using a [BigQuery public dataset](https://console.cloud.google.com/marketplace/product/noaa-public/noaa-earthquakes). 

First we define our region of interest, which in this case is a bounding box enclosing the state of California, using the function `ST_MAKEENVELOPE`. After filtering the earthquake locations with this bounding box, we compute the concave hull polygon enclosing the resulting points using the `ST_CONCAVEHULL` function. For visualization purposes, this polygon is smoothed out by means of the `ST_BEZIERSPLINE` function. Finally, we construct the polygon defining the earthquake-prone area using the `ST_POLYGONIZE` function.

```sql
WITH bounds AS (
    SELECT `carto-un`.constructors.ST_MAKEENVELOPE(-126.98746757203217, 31.72298737861544, -118.1856191911019, 40.871240645013735) AS bbox
),
data AS (
    SELECT ST_GEOGPOINT(longitude, latitude) AS points
    FROM `bigquery-public-data`.noaa_significant_earthquakes.earthquakes
    JOIN bounds
    ON ST_CONTAINS(bounds.bbox, ST_GEOGPOINT(longitude, latitude))
    WHERE longitude IS NOT NULL AND latitude IS NOT NULL
),
bezier_spline AS (
    SELECT `carto-un`.constructors.ST_BEZIERSPLINE(
        ST_BOUNDARY(
        `carto-un`.transformations.ST_CONCAVEHULL(ARRAY_AGG(points), 300, "kilometres")), 
        null,
        0.9) AS geom
    FROM data
),
polygon_array AS (
    SELECT `carto-un`.processing.ST_POLYGONIZE(ARRAY_AGG(geom)) AS geom
    FROM bezier_spline
) 
SELECT unnested FROM polygon_array, UNNEST(geom) AS unnested
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://team.carto.com/u/agraciano/builder/3e6b32e2-0049-42b9-ba20-d26342f4d14d/layers#/" title="Earthquake-prone area in the state of California"></iframe>