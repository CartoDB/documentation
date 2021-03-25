## Spatial indexes

### An H3 grid of Starbucks locations

We are going to demonstrate how fast and easy it is to make a visualization of an H3 grid to identify the concentration of Starbucks locations in the US.

The first step is to get the Starbucks locations into BigQuery by [importing](https://cloud.google.com/bigquery/docs/batch-loading-data#loading_data_from_local_files) [this dataset](FIX ME) in a table called `starbucks-locations-usa`. 

Now, with a single query, we are going to calculate how many Starbucks locations fall within each H3 grid cell of resolution 4. For this example, let's assume this table is part of the `examples` dataset inside `carto-docs` project.

```sql
WITH
  data AS (
  SELECT
    bqcarto.h3.ST_ASH3(geog, 4) AS h3id,
    COUNT(*) AS agg_total
  FROM `carto-docs.examples.starbucks-locations-usa`
  GROUP BY h3id
  )
SELECT
  h3id, 
  agg_total,
  bqcarto.h3.ST_BOUNDARY(h3id) AS geom
FROM
  data
```


This query adds two new columns to our dataset: `geom`, with the boundary of each of the H3 grid cells where there's at least one Starbucks, and `agg_total`, with the total number of locations that fall within each cell. Finally, we can visualize the result. 

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/e88dc8a5-522b-4e62-8998-adbf8348174e" title="Starbucks locations in the US aggregated in an H3 grid of resolution 4."></iframe>

Note: this visualization is made using Builder, where you can easily import your BigQuery data using our connector, but you can also create a quick visualization using [BigQuery Geo Viz](https://bigquerygeoviz.appspot.com). 



### Finer resolution H3 for simple cannibalization analysis

In this example we will continue working with the dataset introduced in [*An H3 grid of Starbucks locations*](#an-h3-grid-of-starbucks-locations) example. In particular, we will analyze in finer detail the grid cell that we have identified contains the highest concentration of Starbucks locations, with ID `595193501273030655`. 

<div class="figures-table" style="text-align:center">
    <figure>
        <img src="/img/bq-spatial-extension/spatial-indexes/h3-most-starbucks.png" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center">H3 grid of resolution 4 with 293 Starbucks locations.</figcaption>
    </figure>
</div>

```sql
WITH
  data AS (
  SELECT
    bqcarto.h3.ST_ASH3(geog, 9) AS h3id,
    COUNT(*) AS agg_total
  FROM `carto-docs.examples.starbucks-locations-usa`
  WHERE
    ST_INTERSECTS(geog,
      bqcarto.h3.ST_BOUNDARY(595193501273030655))
  GROUP BY h3id
  )
SELECT
  h3id,
  agg_total,
  bqcarto.h3.ST_BOUNDARY(h3id) AS geom
FROM
  data
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/38bcfc88-d53c-4d1b-b399-28bea935fa18" title="Starbucks locations around Seattle aggregated in an H3 grid of resolution 9."></iframe>

We can clearly identify that there are two H3 cells with the highest concentration of Starbucks locations, and therefore at risk of suffering cannibalisation. These are cells with IDs `617711491567058943` and `617711491559718911` respectively. Finally, to complete our analysis, we can calculate how many locations are within one cell distance of the last cell:

```sql
WITH
  data AS (
  SELECT
    bqcarto.h3.ST_ASH3(geog, 9) AS h3id,
    COUNT(*) AS agg_total
  FROM `carto-docs.examples.starbucks-locations-usa`
  WHERE
    ST_INTERSECTS(geog,
      bqcarto.h3.ST_BOUNDARY(595193501273030655))
  GROUP BY h3id
  )
SELECT 
SUM(agg_total)
FROM data
WHERE h3id IN UNNEST(bqcarto.h3.KRING(617711491559718911, 1))
-- 13
```


### Enriching a quadkey grid with population data from the Data Observatory

The pains of working with data in different spatial aggregations can be greately eased by using spatial indexes. In this example we showcase how, in a single query, we can create a quadkey grid of resolution 15 of all supermarket POIs in the US and enrich it with population data. Both datasets, [OpenStreetMap POIs](https://carto.com/spatial-data-catalog/browser/dataset/osm_nodes_74461e34/) and [CARTO Spatial Features](https://carto.com/spatial-data-catalog/browser/dataset/cdb_spatial_fea_640a6186/) for the US, are publicly available in BigQuery as part of our Data Observatory offering. You can learn more about our Spatial Features dataset in this [blog post](https://carto.com/blog/spatial-features-new-derived-dataset-from-carto/).

The query performs three main tasks:
* Filtering the OSM dataset to keep only the ones of type `supermarket`.
* Creating a quadkey grid of resolution 15 with the total number of supermarkets that fall within each grid cell (`agg_total`).
* Enriching each grid cell with its population. As the Spatial Features dataset is also available inresolution 15, this enrichment is done simply by performing a join between these two tables. Please note that the Spatial Features dataset uses quadkeys as a grid identifier, so we have to convert these to quadints by using the appropriate function from the Spatial Extension.

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
    bqcartost.quadkey.ST_ASQUADINT(geom, 15) AS qid,
    COUNT(*) AS agg_total
  FROM data
  GROUP BY qid 
  ) d
ON qid = bqcarto.quadkey.QUADINT_FROMQUADKEY(geoid)
```