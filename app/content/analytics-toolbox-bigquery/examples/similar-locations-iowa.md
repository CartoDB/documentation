---
title: "Find similar locations based on their trade areas"
description: "In this example, we demonstrate how easy it is to use the Analytics Toolbox functions to find how similar different locations are to a chosen one."
image: "/img/bq-analytics-toolbox/examples/similar-locations-iowa.png"
type: examples
date: "2022-12-21"
categories:
  - CPG
aliases:
  - /analytics-toolbox-bq/examples/similar-locations-iowa/
---

## Find similar locations based on their trade areas

In the retail and CPG industries, it is common to find the need to understand a set of candidate locations when making different supply and stock decisions. In this example, we follow the steps that one can follow using CARTO and the Analytics Toolbox to rank a set of locations based on the demographic similarity to a chosen location.

These are the main steps to follow, starting with a set of locations:
1. Define their **trade areas**.
2. **Enrich** such trade areas **using demographic data** from the Data Observatory.
3. Run the **analysis of similar locations** and visualize it on a map.

### Choosing a sample of locations

In this example, we will use a small subset of the locations available in the [Iowa Liquor Sales dataset](https://data.iowa.gov/Sales-Distribution/Iowa-Liquor-Sales/m3tr-qhgy), which is publicly available. For this example, we will keep only stores in Des Moines that were active during 2021.

```sql
CREATE OR REPLACE TABLE
  `<your-project>.<your-dataset>.stores` AS (
    SELECT
      store_number,
      ANY_VALUE(store_name) AS store_name,
      ANY_VALUE(store_location) AS store_location
    FROM
      `bigquery-public-data.iowa_liquor_sales.sales`
    WHERE
      store_location IS NOT NULL
      AND date BETWEEN '2021-01-01' AND '2021-12-31'
      AND city LIKE '%DES MOINES%'
    GROUP BY
      store_number
  )
```

We can visualize this sample in the following map:

<iframe width=100% style="aspect-ratio: 1.5; margin-bottom: 2em" src="https://clausa.app.carto.com/map/96a10b79-4ed8-48fc-bee3-81e63752e20b"></iframe>

Our sample has a column named `store_number` that uniquely identifies each of the locations. This column is relevant because it is a requirement for the `FIND_SIMILAR_LOCATIONS` function. We also filter those whose geographical location is known because we will use that location for the next step (generating the trade areas). Bear in mind that the Analytics Toolbox provides functions like [`GEOCODE_TABLE`](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/lds/#geocode_table) to infer the geography from an address, like in [this example](../geocoding-your-address-data).

### Generating the trade areas

In this step, we will define each location's trade area. We can understand these trade areas as the zones influenced by each of the stores. The Analytics Toolbox also provides a handy function to achieve this, [`GENERATE_TRADE_AREAS`](https://docs.carto.com/analytics-toolbox-bigquery/sql-reference/cpg/#generate_trade_areas):

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
CALL `carto-un`.carto.GENERATE_TRADE_AREAS(
  '''
  SELECT
    store_number AS store_id,
    store_location AS geom
  FROM
    `<your-project>.<your-dataset>.stores`
  ''',
  'buffer',
  "{'buffer':500.0}",
  '<your-project>.<your-dataset>.stores'
);
```

Running this procedure will generate the table `<your-project>.<your-dataset>.stores_trade_areas`, which will map each `store_id` to a 500m-radius circular buffer.

This is the simplest way to generate a trade area; a more complex example of this function can be found in [this example](../trade-areas-based-on-isolines), which showcases how to generate isoline-based trade areas. Remember that the enrichment functions simply require a polygon-based `GEOGRAPHY` column; any other custom geometry can also be used as trade area.

### Enriching the trade areas

Now that we already have a defined set of trade areas per location, we can use external data available to enrich such areas. For this example, we will be fetching some basic population variables segmented by age and gender from the [American Community Survey data](https://carto.com/spatial-data-catalog/browser/?provider=usa_acs). 

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
CALL `carto-un`.carto.ENRICH_POLYGONS(
   -- Trade areas table
   'SELECT * FROM `<your-project>.<your-dataset>.stores_trade_areas`',
   'geom',
   -- External data available for Des Moines
   'SELECT * FROM `cartobq.docs.similar_locations_example_sociodemo`',
   'geom',
   [
      ('total_pop', 'sum'),
      ('male_21', 'sum'),
      ('female_21', 'sum')
   ],
   -- Destination slug
   ['`<your-project>.<your-dataset>.stores_trade_areas_enriched`']
);
```

It is also possible to enrich the trade areas using variables straight from the Data Observatory, as long as you have an active subscription to them. To achieve it, we can use `DATAOBS_SUBSCRIPTIONS`, `DATAOBS_VARIABLES`, and `DATAOBS_ENRICH_POLYGONS` functions in the Analytics Toolbox as per [this guide](https://docs.carto.com/analytics-toolbox-bigquery/guides/data-enrichment-using-the-data-observatory/).

### Run the analysis of similar locations

Now that each trade area is enriched, let's run the similarity analysis. To do so, we need to choose the following:
  - An **origin location**, that will be taken as a reference to measure similarity.
  - A set of **target locations**, that will be analyzed to check how similar each of them is to the origin location.

Since both our origin and target locations come from the same source, let us save it as a table in BigQuery:

```sql
CREATE OR REPLACE TABLE
  `<your-project>.<your-dataset>.store_features` AS (
    SELECT
      store_info.store_number,
      trade_area.* EXCEPT (geom, method, input_arguments, store_id)
    FROM
      `<your-project>.<your-dataset>.stores` store_info
      LEFT JOIN `<your-project>.<your-dataset>.stores_trade_areas_enriched` trade_area
      ON store_info.store_number = trade_area.store_id
  )
```

In this convenience table, we have `store_number` serving as unique ID and all the feature columns we have previously computed.

As we said before, in this example, both origin and target locations come from the same source, but that is not a requirement: origin and target locations can come from different places as long as they can be enriched with the same variables in a comparable scale. 

For this example, we are going to take as reference store #2628.

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
CALL `carto-un`.carto.FIND_SIMILAR_LOCATIONS(
    -- Origin query
    """
    SELECT
      *
    FROM
      `<your-project>.<your-dataset>.store_features`
    WHERE
      store_number = '2682'
    """,
    -- Target query
    """
    SELECT
      *
    FROM
      `<your-project>.<your-dataset>.store_features`
    WHERE
      store_number <> '2682'
    """,
    -- Function parameters
    'store_number',
    0.90,
    NULL,
    '<your-project>.<your-dataset>.similar_locations'
);
```

This procedure will create the table `<your-project>.<your-dataset>.similar_locations_2682_results`, where we can find the `similarity_skill_score` column that we need for our analysis. Let us display these values on a map to check the results.

<iframe width=100% style="aspect-ratio: 1.5; margin-bottom: 2em" src="https://clausa.app.carto.com/map/bd7d9d72-37b6-4f67-af86-55ca797cf3c0"></iframe>

The first thing we can notice is how the map contains fewer locations than before: the similar locations procedure only returns those stores that are more similar than the average. Out of those, we can check the individual similarity using the column `similarity_score` (which we can think of as a "distance" to the original location, the lower the better) or `similarity_skill_score` (a normalized version that we can thking of as a similarity measure, the higher the better).

Using this `similarity_skill_score`, we can see how the nearby stores get a very high level of similarity, since our trade areas were solely based in the vicinity of each location. However, we can see how different patterns emerge as well in other parts of the city, were similar locations are found as well.

{{% euFlagFunding %}}