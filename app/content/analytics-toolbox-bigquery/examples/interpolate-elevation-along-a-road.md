---
title: "Interploate elevation along a road"
description: "In this example, we will perform, using the Analytics Toolbox, kriging interpolation of the elevation along the so-called roller coaster road on the island of Hokkaido, Japan. from a nearby elevation measurement."

Interploate elevation along a road
image: "/img/bq-analytics-toolbox/examples/rollercoaster_road.png"
type: examples
date: "2022-01-27"
categories:
    - transformations
---
## Interploating elevation along a road

In this example, we will perform, using the Analytics Toolbox, kriging interpolation of the elevation along the so-called roller coaster road on the island of Hokkaido, Japan. from a nearby elevation measurement.

### The elevation dataset

Let's create a table with 50 elevation points within 500m of the route that I randomly pulled from [the NASADEM made available natively in Bigquery at the data observatory](https://carto.com/spatial-data-catalog/browser/dataset/nasa_nasadem_40e8fa0f/).


<iframe width="640px" height="360px" src="https://gcp-us-east1.app.carto.com/map/7c918d2f-ae08-4a1b-932c-0b68d83df902"></iframe>

### The points to be interpolated

Since the route is straight, you can easily calculate evenly distributed points along the route and save them in a table.

```sql
CREATE OR REPLACE TABLE `yourproject.yourdataset.interp_points` AS (
  SELECT
    ST_GEOGPOINT(142.41*p+142.44*(1-p),43.496*p+43.53*(1-p)) point
  FROM
    # generate 101 points evenly spaced along the route
    UNNEST(GENERATE_ARRAY(0,1,0.01)) p
  );
```

### Computing the interpolation

Now let’s use the kriging interpolation stored procedure to create a table with the result.

```sql
CALL `carto-un.carto.ORDINARY_KRIGING_TABLE`(
         'cartobq.docs.nasadem_jp_extract',
         'yourproject.yourdataset.interp_points',
         'yourproject.yourdataset.kriging_result',
         50,
         1000,
         20,
         'exponential'
     );
```
In this visualization you can see the computed elevation along the route accentuated by a factor of 10.
<iframe width="640px" height="360px" src="https://gcp-us-east1.app.carto.com/map/e351ef87-9e89-47fb-acb5-431226e340bc"></iframe>
