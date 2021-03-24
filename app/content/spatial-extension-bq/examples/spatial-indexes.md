## Spatial indexes

### An H3 grid of Starbucks locations

We are going to demonstrate how fast and easy it is to make a visualization of an H3 grid to identify the concentration of Starbucks locations in the US.

The first step is to get the Starbucks locations into BigQuery by [importing](https://cloud.google.com/bigquery/docs/batch-loading-data#loading_data_from_local_files) [this dataset](https://www.kaggle.com/starbucks/store-locations) in a table called `starbucks-locations-usa` (note: keep US locations only). Although this dataset contains many attributes for each store, for the moment we are only going to be interested in their latitude and longitude. 

Now, with a single query, we are going to calculate how many Starbucks locations fall within each H3 grid cell of resolution 4. For this example, let's assume this table is part of the `examples` dataset inside `carto-docs` project.

```sql
WITH
  DATA AS (
  SELECT
    bqcarto.h3.ST_ASH3(geog,
      4) AS h3id,
    COUNT(*) AS agg_total
  FROM
    `carto-docs.examples.starbucks-locations-usa`
  GROUP BY
    h3id)
SELECT
  h3id,
  agg_total,
  bqcarto.h3.ST_BOUNDARY(h3id) AS geom
FROM
  DATA
```


This query adds two new columns to our dataset: `geom`, with the boundary of each of the H3 grid cells where there's at least one Starbucks, and `agg_total`, with the total number of locations that fall within each cell. Finally, we can visualize the result. 

<iframe height=480px width=100% src="https://public.carto.com/builder/e88dc8a5-522b-4e62-8998-adbf8348174e" title="Starbucks locations in the US aggregated in an H3 grid of resolution 4."></iframe>

Note: this visualization is made using Builder, where you can easily import your BigQuery data using our connector, but you can also create a quick visualization using [BigQuery Geo Viz](https://bigquerygeoviz.appspot.com). 



### Finer resolution H3 for simple cannibalization analysis

In this example we will continue working with the dataset introduced in [*An H3 grid of Starbucks locations*](#an-h3-grid-of-starbucks-locations) example. In particular, we will analyse in finer detail the grid cell that we have identified contains the highest concentration of Starbucks locations, with ID `595193501273030655`. 

<div class="figures-table" style="text-align:center">
    <figure>
        <img src="/img/bq-spatial-extension/spatial-indexes/h3-most-starbucks.png" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center">H3 grid of resolution 4 with 293 Starbucks locations.</figcaption>
    </figure>
</div>

```sql
WITH
  DATA AS (
  SELECT
    bqcarto.h3.ST_ASH3(geog,
      9) AS h3id,
    COUNT(*) AS agg_total
  FROM
    `carto-docs.examples.starbucks-locations-usa`
  WHERE
    ST_INTERSECTS(geog,
      bqcarto.h3.ST_BOUNDARY(595193501273030655))
  GROUP BY
    h3id)
SELECT
  h3id,
  agg_total,
  bqcarto.h3.ST_BOUNDARY(h3id) AS geom
FROM
  DATA
```

<iframe height=480px width=100% src="https://public.carto.com/builder/38bcfc88-d53c-4d1b-b399-28bea935fa18" title="Starbucks locations around Seattle aggregated in an H3 grid of resolution 9."></iframe>

We can clearly identify there are two H3 cells with the highest concentration of Starbucks locations, and therefore at risk of suffering cannibalisation. These are cells with IDs `617711491567058943` and `617711491559718911` respectively. Finally, to complete our analysis, we can calculate how many locations are within one cell distance of the last cell:

```sql
WITH
  DATA AS (
  SELECT
    bqcarto.h3.ST_ASH3(geog,
      9) AS h3id,
    COUNT(*) AS agg_total
  FROM
    `carto-docs.examples.starbucks-locations-usa`
  WHERE
    ST_INTERSECTS(geog,
      bqcarto.h3.ST_BOUNDARY(595193501273030655))
  GROUP BY
    h3id)
SELECT
  SUM(agg_total)
FROM
  DATA
WHERE
  h3id IN UNNEST(bqcarto.h3.KRING(617711491559718911,
      1))
-- 13
```


### Enriching a quadkey grid with population data

```sql
with DATA as
(
SELECT d.*, g.geom FROM `carto-do-public-data.openstreetmap.pointsofinterest_nodes_usa_latlon_v1_quarterly_v1` d
INNER JOIN  `carto-do-public-data.openstreetmap.geography_usa_latlon_v1` g
    ON d.geoid = g.geoid
WHERE shop = 'supermarket'
)

SELECT
    bqcartost.quadkey.ST_ASQUADINT(geom,
      15) AS qid,
    COUNT(*) AS agg_total
FROM DATA
GROUP BY qid
```

```sql
SELECT d.*, p.population FROM `carto-do-public-data.carto.derived_spatialfeatures_usa_quadgrid15_v1_yearly_2020` p
JOIN `cartodb-on-gcp-pm-team.margara.supermarkets-osm-quad-res15-agg` d
ON qid = bqcartost.quadkey.QUADINT_FROMQUADKEY(geoid)
```


```sql
SELECT
  d.*,
  p.population
FROM
  `carto-do-public-data.carto.derived_spatialfeatures_usa_quadgrid15_v1_yearly_2020` p
JOIN (
  WITH
    DATA AS (
    SELECT
      d.*,
      g.geom
    FROM
      `carto-do-public-data.openstreetmap.pointsofinterest_nodes_usa_latlon_v1_quarterly_v1` d
    INNER JOIN
      `carto-do-public-data.openstreetmap.geography_usa_latlon_v1` g
    ON
      d.geoid = g.geoid
    WHERE
      shop = 'supermarket' )
  SELECT
    bqcartost.quadkey.ST_ASQUADINT(geom,
      15) AS qid,
    COUNT(*) AS agg_total
  FROM
    DATA
  GROUP BY
    qid ) d
ON
  qid = bqcartost.quadkey.QUADINT_FROMQUADKEY(geoid)
```