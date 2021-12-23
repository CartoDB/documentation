## Enriching a quadkey grid with population data from the Data Observatory

The pains of working with data in different spatial aggregations can be greatly eased by using spatial indexes. In this example we showcase how, in a single query, we can create a quadkey grid of resolution 15 of all supermarket POIs in the US and enrich it with population data. Both datasets, [OpenStreetMap POIs](https://carto.com/spatial-data-catalog/browser/dataset/osm_nodes_74461e34/) and [CARTO Spatial Features](https://carto.com/spatial-data-catalog/browser/dataset/cdb_spatial_fea_640a6186/) for the US, are publicly available in BigQuery as part of our Data Observatory offering. You can learn more about our Spatial Features dataset in this [blog post](https://carto.com/blog/spatial-features-new-derived-dataset-from-carto/).

The query performs three main tasks:
* Filtering the OSM dataset to keep only the ones of type `supermarket`.
* Creating a quadkey grid of resolution 15 with the total number of supermarkets that fall within each grid cell (`agg_total`).
* Enriching each grid cell with its population. As the Spatial Features dataset is also available in resolution 15, this enrichment is done simply by performing a join between these two tables. Please note that the Spatial Features dataset uses quadkeys as a grid identifier, so we have to convert these to quadints by using the appropriate function from the Analytics Toolbox.

```sql
SELECT
  d.*,
  p.population
FROM
  `carto-do-public-data.carto.derived_spatialfeatures_usa_quadgrid15_v1_yearly_2020` p
JOIN (
  WITH
    data AS (
    SELECT
      d.*,
      g.geom
    FROM `carto-do-public-data.openstreetmap.pointsofinterest_nodes_usa_latlon_v1_quarterly_v1` d
    INNER JOIN `carto-do-public-data.openstreetmap.geography_usa_latlon_v1` g
    ON d.geoid = g.geoid
    WHERE shop = 'supermarket' )
  SELECT
    `carto-un`.carto.QUADINT_FROMGEOGPOINT(geom, 15) AS qid,
    COUNT(*) AS agg_total
  FROM data
  GROUP BY qid 
  ) d
ON qid = geoid
```
