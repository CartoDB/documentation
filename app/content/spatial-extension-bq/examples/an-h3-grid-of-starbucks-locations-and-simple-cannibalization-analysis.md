## An H3 grid of Starbucks locations and simple cannibalization analysis

### Bulding the H3 grid

We are going to demonstrate how fast and easy it is to make a visualization of an H3 grid to identify the concentration of Starbucks locations in the US.

The first step is to [import](https://cloud.google.com/bigquery/docs/batch-loading-data#loading_data_from_local_files) the Starbucks locations [dataset](https://libs.cartocdn.com/spatial-extension/samples/starbucks-locations-usa.csv) into a BigQuery table called `starbucks_locations_usa`. Then, with a single query, we are going to calculate how many Starbucks locations fall within each H3 grid cell of resolution 4.

```sql
WITH
  data AS (
  SELECT
    bqcarto.h3.ST_ASH3(geog, 4) AS h3id,
    COUNT(*) AS agg_total
  FROM `cartobq.docs.starbucks_locations_usa`
  GROUP BY h3id
  )
SELECT
  h3id, 
  agg_total,
  bqcarto.h3.ST_BOUNDARY(h3id) AS geom
FROM
  data
```


This query adds two new columns to our dataset: `geom`, representing the boundary of each of the H3 grid cells where there's at least one Starbucks, and `agg_total`, containing the total number of locations that fall within each cell. Finally, we can visualize the result. 

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/e88dc8a5-522b-4e62-8998-adbf8348174e" title="Starbucks locations in the US aggregated in an H3 grid of resolution 4."></iframe>

Note: this visualization is made using Builder, where you can easily import your BigQuery data using our connector, but you can also create a quick visualization using [BigQuery Geo Viz](https://bigquerygeoviz.appspot.com). 



### Using finer resolution H3 for simple cannibalization analysis

Next, we will analyze in finer detail the grid cell that we have identified contains the highest concentration of Starbucks locations, with ID `8428d55ffffffff`. 

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
  FROM `cartobq.docs.starbucks_locations_usa`
  WHERE
    ST_INTERSECTS(geog,
      bqcarto.h3.ST_BOUNDARY('8428d55ffffffff'))
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

We can clearly identify that there are two H3 cells with the highest concentration of Starbucks locations, and therefore at risk of suffering cannibalization. These are cells with IDs `8928d542c17ffff` and `8928d542c87ffff` respectively. Finally, to complete our analysis, we can calculate how many locations are within one cell distance of this first cell:

```sql
WITH
  data AS (
  SELECT
    bqcarto.h3.ST_ASH3(geog, 9) AS h3id,
    COUNT(*) AS agg_total
  FROM `cartobq.docs.starbucks_locations_usa`
  WHERE
    ST_INTERSECTS(geog,
      bqcarto.h3.ST_BOUNDARY('8428d55ffffffff'))
  GROUP BY h3id
  )
SELECT 
SUM(agg_total)
FROM data
WHERE h3id IN UNNEST(bqcarto.h3.KRING('8928d542c17ffff', 1))
-- 13
```