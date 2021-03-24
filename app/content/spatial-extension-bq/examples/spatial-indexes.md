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

<iframe height=480px width=100% src="https://team.carto.com/u/mtejera/builder/66728606-22e4-4137-8fa5-150fb3727142/layers#/" title="Starbucks locations in the US aggregated in an H3 grid of resolution 4."></iframe>

Note: this visualization is made using Builder, where you can easily import your BigQuery data using our connector, but you can also create a quick visualization using [BigQuery Geo Viz](https://bigquerygeoviz.appspot.com). 