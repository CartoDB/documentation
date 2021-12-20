---
title: "Bikeshare stations within a San Francisco buffer"
description: "In this example we are going to showcase how easily we can compute buffers around geometries using the Analytics Toolbox."
image: "/img/bq-analytics-toolbox/examples/bikeshare-stations-sf-buffer.png"
type: examples
date: "2021-03-12"
categories:
    - transformations
---
## Bikeshare stations within a San Francisco buffer

In this example we are going to showcase how easily we can compute [buffers](/analytics-toolbox-bq/sql-reference/transformations/#st_buffer) around geometries using the Analytics Toolbox.

### Creating a buffer of a neighborhood

The following query creates a buffer with a radius of 50 meters around San Francisco's Financial District neighborhood using the `ST_BUFFER` function. The number of steps could be modified in order to make the lines smoother if needed.

```sql
SELECT `carto-un`.transformations.ST_BUFFER(neighborhood_geom, 50, 'meters', 5) AS geo FROM `bigquery-public-data`.san_francisco_neighborhoods.boundaries WHERE neighborhood = "Financial District"
```

In this visualization you can see the Financial Disctrict (darker blue) and its buffer around it. Notice that buffers radius are not necesarily positive numbers. Negative numbers would generate a buffer in the interior of the district's geomery.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/2d9418b4-adc8-485a-ae86-f7d9fd95510d" title="San Francisco buffer."></iframe>


### Bikeshare stations within a buffer

Now let's use the buffer as a way of defining a bigger region around the Financial District of San Francisco and filtering some other geometries.

```sql
SELECT ST_GEOGPOINT(d2.longitude,d2.latitude) AS geo FROM `bigquery-public-data`.san_francisco_neighborhoods.boundaries d1,
`bigquery-public-data`.san_francisco.bikeshare_stations d2
WHERE d1.neighborhood = "Financial District" AND ST_CONTAINS(`carto-un`.transformations.ST_BUFFER(d1.neighborhood_geom, 50, 'meters', 5), ST_GEOGPOINT(d2.longitude, d2.latitude))
```
This query uses the `ST_BUFFER` and `ST_CONTAINS` functions in order to filter those bikeshare stations that are contained inside the buffered geometry. The result is displayed below, where bikeshare stations are represented as yellow dots.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/aca3efb9-c0dd-4dc1-9679-9f71a4632af3" title="US airports routes interpolation."></iframe>
