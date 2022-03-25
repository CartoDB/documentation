---
title: "Opening a new Pizza Hut location in Honolulu"
description: "We find the best new location for a specific target demographics using spatial indexes and advanced statistical functions."
image: "/img/bq-analytics-toolbox/examples/starbucks-h3-grid.png"
type: examples
date: "2022-03-24"
categories:
    - h3
    - statistics
    - retail
---
## Opening a new Pizza Hut location in Honolulu

### Context

Identifying an optimal location for a new store is not always an easy task, and we often do not have enough data at our disposal to build a solid model to predict potential revenues across an entire territory. In these cases, managers rely on different business criteria in order to make a sound decision for their expansion strategy. For example, they rely on defining their target market and segmenting population groups accordingly in order to locate the store closer to where the target market lives (e.g. areas with a great presence of youngsters).

In this example, we are going to use CARTO's Analytics Toolbox for BigQuery to explore good locations to open a new Pizza Hut restaurant in Honolulu, Hawaii. To do that, we will run a couple of different spatial analyses based on spatial indices, H3 in this case.

### Area of study

We will start by defining an area of interest for our study. For that, we define a buffer of 5 km around downtown Honolulu.

```sql
SELECT ST_BUFFER(ST_GEOGPOINT(-157.852587, 21.304390), 5000);
```

### Pizza Huts locations in Honolulu

Next, we will get all Pizza Hut restaurants in Honolulu. For that, we use [OpenStreetMaps's Planet Nodes dataset](https://carto.com/spatial-data-catalog/browser/dataset/osm_nodes_74461e34/), available through CARTO's Data Observatory. An extract of this table containing only the Points of Interest in Honolulu can be found in `cartobq.docs.honolulu_planet_nodes`.

```sql
DECLARE honolulu_buffer GEOGRAPHY;
-- We use the ST_BUFFER to define a 5 km buffer centered in Honolulu
SET honolulu_buffer = ST_BUFFER(ST_GEOGPOINT(-157.852587, 21.304390), 5000);
 
SELECT
tag.value AS brand, geometry,
FROM
`cartobq.docs.honolulu_planet_nodes` d,
UNNEST(all_tags) as tag
WHERE ST_CONTAINS(honolulu_buffer, geometry)
AND ((tag.value in ("Pizza Hut") AND tag.key = 'brand'))
```

### Polyfill area of study

For our analysis, we will subdivide the area of study into H3 grid cells of resolution 10 using the [H3_POLYFILL](../../sql-reference/h3/#h3_polyfill) function. The result will be stored in `cartobq.docs.honolulu_pizza_aos`

```sql
DECLARE honolulu_buffer GEOGRAPHY;
-- We use the ST_BUFFER to define a 5 km buffer centered in Honolulu
SET honolulu_buffer = ST_BUFFER(ST_GEOGPOINT(-157.852587, 21.304390), 5000);
 
CREATE TABLE `cartobq.docs.honolulu_pizza_aos` AS (
   SELECT h3id
   FROM UNNEST(`carto-un`.carto.H3_POLYFILL(honolulu_buffer, 10)) h3id
)
```

### Enrich area of study

Our customer is interested in looking for areas with a high density of males and females between 18 and 34 years old and that do not have an existing Pizza Hut restaurant nearby. 

Therefore, we are going to enrich the H3 grid of our area of interest with a set of population variables from the [ACS Sociodemographics dataset at census block group level](https://carto.com/spatial-data-catalog/browser/dataset/acs_sociodemogr_95c726f9), available through the [Data Observatory](https://docs.carto.com/data-observatory), using the [enrichment capabilities](../../sql-reference/data) of CARTO’s Analytics Toolbox.

First, we need to subscribe to the chosen Data Observatory dataset from Data Observatory section of your CARTO Workspace. You can follow [this guide](https://docs.carto.com/data-observatory/guides/subscribing-to-public-and-premium-datasets/#public-datasets) to do so.

Once you have subscribed to the dataset, navigate to the Data Explorer and expand the Data Observatory section. Choose any of the your data subscriptions and click on the “Access in” button on the top right of the page. Copy the BigQuery project and dataset from any of the table locations that you see on the screen, as this is where your data subscriptions are stored and we are going to need this information for the next step. 

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/guides/enrichment_guide_access_in.png" alt="Find the location of your Data Observatory subscriptions" style="width:100%">
</div>

Now we can go to our BigQuery console and double check that we are correctly subscribed to the dataset of choice by using the [DATAOBS_SUBSCRIPTIONS](../../sql-reference/data/#dataobs_subscriptions) procedure, which takes as input the location of your Data Observatory subscriptions that we found in the previous step. 

```sql
CALL `carto-un`.carto.DATAOBS_SUBSCRIPTIONS('carto-data.ac_yyr4gtk5','');
```

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/examples/honolulu_do_subscriptions_bq.png" alt=" Check Data Observatory subscriptions" style="width:100%">
</div>

Next, we can check the list of variables that are available to perform the enrichment using the [DATAOBS_SUBSCRIPTION_VARIABLES](../../sql-reference/data/#dataobs_subscription_variables) procedure. Particularly, we are interested in those variables that contain the word _population_ in the description, so we are going to take advantage of the second input of the procedure, which enables to filter the results.

```sql
CALL `carto-un`.carto.DATAOBS_SUBSCRIPTION_VARIABLES('carto-data.ac_yyr4gtk5',"variable_description LIKE '%population%'");
```

After selecting the variables of interest, in our case those population values for males and females between 18 and 34 years old, we can perform the enrichment using the [DATAOBS_ENRICH_GRID](../../sql-reference/data/#dataobs_enrich_grid) procedure. Please note that the variables are uniquely identified using their _variable slug_. The result of this process can be found in `cartobq.docs.honolulu_pizza_aos_enriched`.

```sql
CALL `carto-un`.carto.DATAOBS_ENRICH_GRID
('h3',
R'''
SELECT * from `cartobq.docs.honolulu_pizza_aos`
''',
'h3id',
[('female_15_to_17_eb1658f1', 'sum'), ('female_18_to_19_6d791436', 'sum'), ('female_20_f727dc', 'sum'), 
('female_21_77f0174a', 'sum'), ('female_22_to_24_121a63e5', 'sum'), ('female_25_to_29_a90c21d6', 'sum'), 
('female_30_to_34_50344313', 'sum'), ('male_15_to_17_8dd9d9ac', 'sum'), ('male_18_to_19_bb6956b', 'sum'), 
('male_20_5264b51', 'sum'), ('male_21_72217bc7', 'sum'), ('male_22_to_24_74d5e2b8', 'sum'), 
('male_25_to_29_cfc3a08b', 'sum'), ('male_30_to_34_36fbc24e', 'sum')],
NULL,
['cartobq.docs.honolulu_pizza_aos_enriched'],
'carto-data.ac_yyr4gtk5')
```

### Process enrich data

We are going to process our resulting enriched table to aggregate all our male and female population variables and store the result into a single column. The result can be found in `cartobq.docs.honolulu_pizza_aos_enriched_sum`.

```sql
DECLARE features ARRAY<STRING>;
DECLARE query STRING;
 
-- We get the names of all columns in the enriched table except for ('h3id')
SET features =
(
 SELECT ARRAY_AGG(column_name)
 FROM `cartobq.docs`.INFORMATION_SCHEMA.COLUMNS
 WHERE table_name = 'honolulu_pizza_aos_enriched' AND NOT column_name IN ('h3id')
);
 
SET query =
 """ CREATE TABLE `cartobq.docs.honolulu_pizza_aos_enriched_sum` AS (SELECT h3id, """
 || ARRAY_TO_STRING(features, " + ")  ||
 """ AS sum_pop FROM `cartobq.docs.honolulu_pizza_aos_enriched`)""";
 
-- We execute such query
EXECUTE IMMEDIATE query;
```

### Calculate the minimum distance to a Pizza Hut

In addition to the population, Pizza Hut would like to consider for the analysis the distance to the closest existing Pizza Hut as they would like to avoid cannibalization between their own restaurants. For that, for every cell of our grid we are going to compute the distance to every Pizza Hut restaurant using the [H3_DISTANCE](../../sql-reference/h3/#h3_distance) function, and then keep the minimum value. The result can be found in `cartobq.docs.honolulu_pizza_aos_enriched_sum_wdist`.

```sql
DECLARE honolulu_buffer GEOGRAPHY;
SET honolulu_buffer = ST_BUFFER(ST_GEOGPOINT(-157.852587, 21.304390), 5000);
 
CREATE TABLE `cartobq.docs.honolulu_pizza_aos_enriched_sum_wdist` AS
(
WITH t1 AS (
 SELECT `carto-un`.carto.H3_FROMGEOGPOINT(geometry, 10) as h3id,
 FROM `cartobq.docs.honolulu_planet_nodes` d,
 UNNEST(all_tags) as tag
 WHERE ST_CONTAINS(honolulu_buffer, geometry)
 AND ((tag.value in ("Pizza Hut") AND tag.key = 'brand'))
  ),
 
t2 AS (
SELECT * FROM `cartobq.docs.honolulu_pizza_aos_enriched_sum`
)
 
SELECT t2.h3id, ANY_VALUE(t2.sum_pop) AS sum_pop, MIN(`carto-un`.carto.H3_DISTANCE(t2.h3id, t1.h3id)) AS dist
FROM t1
CROSS JOIN t2
WHERE sum_pop IS NOT NULL
GROUP BY t2.h3id
);
```

### Find suitable locations

Now, we are going to identify areas that meet Pizza Hut requirements, i.e., locations with large populations aged 15-34 and far from existing Pizza Hut restaurants.

In order to identify these locations, we use the [COMMERCIAL_HOTSPOTS](../../sql-reference/retail/#commercial_hotspots) procedure, part of the retail module of the Analytics Toolbox. This functionality identifies areas with values that are significantly higher than the average.

As can be seen in the query below, we are using both the `sum_pop` (total population aged 15-34) and `dist` (distance to the closest Pizza Hut) variables to identify our hotspots. These variables are given a weight of 0.7 and 0.3, respectively.

```sql
CALL `carto-un`.carto.COMMERCIAL_HOTSPOTS(
  'cartobq.docs.honolulu_pizza_aos_enriched_sum_wdist',
  NULL,
  'h3id',
  'h3',
  ['sum_pop','dist'],
  [0.7, 0.3],
   2,
   0.01
)
```

### Competitor analysis

Finally, we are going to extract Pizza Hut's competitors from the `cartobq.docs.honolulu_planet_nodes` table and compute the local outlier factor (using the [LOF](../../sql-reference/statistics/#lof) function) to identify those that are very close to one another and those far from the other. This will give us additional insights to decide where it would be more interesting to open a new restaurant.

```sql
DECLARE honolulu_buffer GEOGRAPHY;
SET honolulu_buffer = ST_BUFFER(ST_GEOGPOINT(-157.852587, 21.304390), 5000);
 
-- We get all amenities tagged as restaurants or fast_food POIS in Honolulu
WITH fast_food AS (
 SELECT CAST(id AS STRING) AS id , tag.value, geometry as geom
 FROM `cartobq.docs.honolulu_planet_nodes` d,
 UNNEST(all_tags) as tag
 WHERE ST_CONTAINS(honolulu_buffer, geometry)
 AND ((tag.value in ('fast_food', 'restaurant') AND tag.key = 'amenity'))
),
 
-- We calculate the Local Outlier Factor in order to identify restaurants without competition.
lof_output as (
SELECT `carto-un`.carto.LOF(ARRAY_AGG(STRUCT(id,geom)), 5) as lof FROM fast_food
)
SELECT lof.* FROM lof_output, UNNEST(lof_output.lof) AS lof
```

### Visual analysis

To make our final decision, we can plot all the information of our analysis using a CARTO Builder map: 

