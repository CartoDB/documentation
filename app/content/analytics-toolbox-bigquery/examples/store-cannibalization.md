---
title: "Store cannibalization: quantifying the effect of opening new stores on your existing network"
description: "Cannibalization is a very common analysis in retail that consists in quantifying the impact of new store openings on existing stores."
image: "/img/bq-analytics-toolbox/examples/store-cannibalization-0.png"
type: examples
date: "2022-09-06"
categories:
    - h3
    - retail
---
## Store cannibalization: quantifying the effect of opening new stores on your existing network


Cannibalization is a very common analysis in retail that consists in quantifying the impact of new store openings on existing stores. Depending on the business, the metric/s driving this impact can be different, e.g. population, footfall, or simply the overlapping area covered by the catchment area of two stores.

The key to quantifying cannibalization is to measure potential losses in the overlapping areas between the catchment area of existing and new stores.

In this example, we’ll show how to run a cannibalization analysis in two simple steps using the [retail module](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/retail/) in CARTO Analytics Toolbox.

For this analysis we will use [Iowa liquor sales](https://data.iowa.gov/Sales-Distribution/Iowa-Liquor-Sales/m3tr-qhgy) open data available in `bigquery-public-data.iowa_liquor_sales.sales`. In particular, we’ll focus on the area around Waterloo taking a buffer of 30 km around Waterloo city center considering Hy-Vee stores as our customer’s stores (see map at the end of the example).


### Step 1. Get the data ready

First, we need to prepare the data for the analysis. To do this, we’ll use the [BUILD_CANNIBALIZATION_DATA](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/retail/#build_cannibalization_data) procedure that computes and enriches the catchment area of existing stores. The following information is required as input.

1. The type of grid and resolution to be used. Note this is a [spatial index](https://docs.carto.com/analytics-toolbox-bigquery/overview/spatial-indexes/)-based analysis.
2. The existing store locations.

3. The size of the catchment area buffer by urbanity type. See the [procedure documentation](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/retail/#build_cannibalization_data) for details on types of urbanity.
*Note* this uses [CARTO global urbanity categories](https://carto.com/blog/building-spatial-model-classify-global-urbanity-levels/) available through the [Spatial Features](https://carto.com/spatial-data-catalog/browser/?category=derived&provider=carto) datasets for which a [subscription](https://docs.carto.com/analytics-toolbox-bigquery/guides/data-enrichment-using-the-data-observatory/) is required.

4. Variables from the [CARTO’s Data Observatory](https://carto.com/data-observatory/) subscriptions we’d like to use to quantify cannibalization. In this case, population. *Note* the variable slug is required which can be obtained [using the Analytics Toolbox](https://docs.carto.com/analytics-toolbox-bigquery/guides/data-enrichment-using-the-data-observatory/) or on your workspace (see image below).


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/store-cannibalization-1.png" alt="Population variable from Carto Data Observatory" style="width:100%">
</div>



In our example, we’d like to quantify cannibalization through the population overlap between the new store’s catchment area and the existing ones. Therefore, we run the following query to get the data ready:

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
CALL `carto-un`.carto.BUILD_CANNIBALIZATION_DATA(
 --grid_type
 'h3',
 --store_query: must include unique identifier and geometry
 R'''
   WITH store_locations AS (
     SELECT store_name AS store_id, SUM(sale_dollars) as sales, ST_GEOGFROMTEXT(ANY_VALUE(store_location)) AS geom
     FROM `bigquery-public-data.iowa_liquor_sales.sales`
     WHERE EXTRACT(year FROM date) = 2019
     GROUP BY store_id
   )
   SELECT store_id, sales, geom
   FROM store_locations
   WHERE store_id LIKE "%Hy-Vee%" AND
         ST_INTERSECTS(geom, ST_BUFFER(ST_GEOGPOINT(-92.335358, 42.497854), 30000))
 ''',
 --resolution
 9,
 --distances: buffer radii by type of urbanity in kilometers
 [1.3,0.7,0.3],
 --do_variables
 [('population_f5b8d177','sum')],
 --do_urbanity_index: urbanity variable slug
 'urbanity_e1a58891',
 --do_source
 '<my-dataobs-project>.<my-dataobs-dataset>',
 --output_destination
 '<my-project>.<my-dataset>',
 --output_prefix
 'hyvee_waterloo_cannib'
);
```



As a result, the following table contains the information of every cell (spatial index) within each store’s catchment area. This table is later used in step 2.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/store-cannibalization-2.png" alt="Table with the information of every cell (spatial index) within each store’s catchment area." style="width:100%">
</div>



### Step 2. Cannibalization overlap computation

Next, we compute the cannibalization impact of two potential new stores using the [CANNIBALIZATION_OVERLAP](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/retail/#cannibalization_overlap) procedure.

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
CALL `carto-un`.carto.CANNIBALIZATION_OVERLAP(
  --data_table: this is the output table of step 1
  '<my-project>.<my-dataset>.hyvee_waterloo_cannib_output',
  --new_locations_query
   R'''
     SELECT store_id, geom
     FROM UNNEST([STRUCT("new_store_1" AS store_id,
                         ST_GEOGPOINT(-92.337150, 42.504767) AS geom),
                  STRUCT("new_store_2" AS store_id,
                         ST_GEOGPOINT(-92.340272, 42.493134) AS geom)])
   ''',
  --do_urbanity_index
  'urbanity_e1a58891',
  --do_source
  '<my-dataobs-project>.<my-dataobs-dataset>',
  --output_destination
  '<my-project>.<my-dataset>',
  --output_prefix
  'hyvee_waterloo_cannib'
);
```


From the table of results and the map below, we can see that only the first potential new store would have any cannibalization effect on Hy-Vee Food Store #2. In particular, the catchment area of the new store shares 4.7% of its area with the existing store, and this translates into 19.3% of the existing store’s population coverage. Based on these results, the second candidate for a potential new store seems to be a better option since it would not have any cannibalization effect on the existing stores.


<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/store-cannibalization-3.png" alt="Results table with the cannibalization effect." style="width:100%">
</div>

The map below summarizes all the steps of the analysis:

<iframe height=800px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/87c1f87a-9e7b-454c-a55e-c7fac90d8e93" title="Store cannibalization step by step."></iframe>



{{% euFlagFunding %}}