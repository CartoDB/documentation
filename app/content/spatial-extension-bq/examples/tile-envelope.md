## Tile envelope

### Census areas by tile resolution

Determining census areas is important to keep an easy demography track of cities. Spatial indexes are interesting tools to efficiently work with spatial aggregations. For a further description of their capabilities and types please, go to their reference page (link).

In this example, we show the use of the `ST_TILEENVELOPE` function that returns the bounding geometry of a given quadkey (link to quadkey) 3D tile index. For this purpose, we are using the United Kingdom census areas obtained from the CARTO dataset [Output Area - United Kigdom](https://carto.com/spatial-data-catalog/browser/geography/drd_output_area_73f0b4a3/). Taking as input the longitude and latitude from a geographic point in the city of London, the map depicts the belonging census areas for different tile resolutions (from 11 to 15 zoom levels).

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
    SELECT bqcarto.quadkey.ZXY_FROMQUADINT(
            bqcarto.quadkey.LONGLAT_ASQUADINT(longitude, latitude, resolution)
        ) AS index
    FROM point_data
)
SELECT ANY_VALUE(census.geom) AS area, MAX(index.z) AS level
FROM quadkey_tiles
JOIN census_data AS census
ON 
ST_INTERSECTS(bqcarto.constructors.ST_TILEENVELOPE(index.z, index.x, index.y), census.geom)
GROUP BY census.geoid
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://team.carto.com/u/agraciano/builder/2febc1c3-e3b6-45e1-ab11-9e6dd910a601/layers#/" title="Census areas intersected by the tile envelopes."></iframe>
