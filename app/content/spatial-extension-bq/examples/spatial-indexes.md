## Spatial indexes

### An H3 grid of Starbucks locations

We are going to demonstrate how fast and easy it is to make a visualization of an H3 grid to identify the concentration of Starbucks locations in the US.

The first step is to get the Starbucks locations into BigQuery by [importing](https://cloud.google.com/bigquery/docs/batch-loading-data#loading_data_from_local_files) [this dataset](https://www.kaggle.com/starbucks/store-locations) in a table called `starbucks-locations-usa` (note: keep US locations only). Although this dataset contains many attributes for each store, for the moment we are only going to be interested in their latitude and longitude. 

Now, with a single query, we are going to calculate how many Starbucks locations fall within each H3 grid cell of resolution 4. For this example, let's assume this table is part of the `examples` dataset inside `carto-docs` project.

```sql
WITH
  DATA AS (
  SELECT
    bqcarto.h3.LONGLAT_ASH3(longitude,
      latitude,
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

<iframe height=480px width=100% src="https://public.carto.com/builder/8b512dff-114a-495d-8277-4588c9b66300" title="Starbucks locations in the US aggregated in an H3 grid of resolution 4."></iframe>

Note: this visualization is made using Builder, where you can easily import your BigQuery data using our connector, but you can also create a quick visualization using [BigQuery Geo Viz](https://bigquerygeoviz.appspot.com). 



### Finer resolution H3 for simple cannibalization analysis

In this example we will continue working with the dataset introduced in [*An H3 grid of Starbucks locations*](#an-h3-grid-of-starbucks-locations) example. In particular, we will analyse in finer detail the grid cell that we have identified contains the highest concentration of Starbucks locations, with ID `595215130728333311`. 

<div class="figures-table" style="text-align:center">
    <figure>
        <img src="/img/bq-spatial-extension/spatial-indexes/h3-most-starbucks.png" alt="Multiresolution quadkeys">
        <figcaption class="figcaption" style="text-align:center">H3 grid of resolution 4 with 319 Starbucks locations.</figcaption>
    </figure>
</div>

```sql
WITH
  DATA AS (
  SELECT
    bqcartost.h3.LONGLAT_ASH3(longitude,
      latitude,
      9) AS h3id,
    COUNT(*) AS agg_total
  FROM
    `cartodb-on-gcp-pm-team.margara.starbucks-locations-usa-kaggle`
  WHERE
    ST_INTERSECTS(ST_GEOGPOINT(longitude,
        latitude),
      bqcartost.h3.ST_BOUNDARY(595215130728333311))
  GROUP BY
    h3id)
SELECT
  h3id,
  agg_total,
  bqcartost.h3.ST_BOUNDARY(h3id) AS geom
FROM
  DATA
WHERE
  h3id IN UNNEST(bqcartost.h3.TOCHILDREN(595215130728333311,
      9))
```

<iframe height=480px width=100% src="https://public.carto.com/builder/88be8c7a-64bd-4fad-a24d-bd2db960606e" title="Starbucks locations around New York aggregated in an H3 grid of resolution 9."></iframe>

