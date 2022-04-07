---
title: "Census areas in the UK within tiles of multiple resolutions"
description: "In this example we are going to showcase the extent of quadkey tiles at different resolutions. For this purpose we are using the United Kingdom census areas dataset from CARTO's Data Observatory."
image: "/img/bq-analytics-toolbox/examples/uk-census-areas.png"
type: examples
date: "2021-02-12"
categories:
    - quadkey
    - constructors
---
## Census areas in the UK within tiles of multiple resolutions

In this example we are going to use the `ST_TILEENVELOPE` function, which returns the bounding geometry of quadkey tile given its 3D coordinates (x, y and resolution), to showcase the extent of quadkey tiles at different resolutions. For this purpose we are using the [United Kingdom census areas dataset](https://carto.com/spatial-data-catalog/browser/geography/drd_output_area_73f0b4a3/) from CARTO's Data Observatory. 

Taking as input the longitude and latitude from a geographic point in the city of London, the resulting map depicts the belonging census areas for different tile resolutions (from 11 to 15 zoom levels).

```sql
WITH census_data AS (
    SELECT geom, geoid
    FROM `carto-do-public-data.gbr_cdrc.geography_gbr_outputarea_2011`
),
point_data AS (
    SELECT -0.10481368396112065 AS longitude, 51.51493384150647 AS latitude, resolution
    FROM UNNEST (GENERATE_ARRAY(11, 15)) AS resolution
),
quadkey_tiles AS (
    SELECT `carto-un`.quadkey.ZXY_FROMQUADINT(
            `carto-un`.quadkey.LONGLAT_ASQUADINT(longitude, latitude, resolution)
        ) AS index
    FROM point_data
)
SELECT ANY_VALUE(census.geom) AS area, MAX(index.z) AS level
FROM quadkey_tiles
JOIN census_data AS census
ON 
ST_INTERSECTS(`carto-un`.constructors.ST_TILEENVELOPE(index.z, index.x, index.y), census.geom)
GROUP BY census.geoid
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://team.carto.com/u/agraciano/builder/2febc1c3-e3b6-45e1-ab11-9e6dd910a601/layers#/" title="Census areas intersected by the tile envelopes."></iframe>
