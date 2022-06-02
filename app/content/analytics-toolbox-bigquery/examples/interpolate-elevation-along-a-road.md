---
title: "Interpolating elevation along a road using kriging"
description: "In this example, we will perform kriging interpolation of the elevation along the so-called roller coaster road on the island of Hokkaido, Japan, using as reference points a nearby elevation measurement."
image: "/img/bq-analytics-toolbox/examples/kriging_elevation_interpolation.png"
type: examples
date: "2022-01-27"
categories:
    - statistics
---
## Interpolating elevation along a road using kriging

In this example, we will perform kriging interpolation of the elevation along the so-called roller coaster road on the island of Hokkaido, Japan, using as reference points a nearby elevation measurement.

### Reference elevation data

The elevation data that will be used as reference to perform the interpolation is composed of 50 elevation points within 500m of the route that were randomly sampled from [the NASADEM dataset](https://carto.com/spatial-data-catalog/browser/dataset/nasa_nasadem_e6e4b116/), available from [CARTO's Data Observatory](/data-observatory). This data can be accessed publicly from the table `cartobq.docs.nasadem_jp_extract` and is previewed in the map below:

<iframe height=800px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/9f8801c6-6a51-447f-860f-a433af169df7" title="Elevation data from Japan"></iframe>

### Points to be interpolated

Since the route is straight, we can easily calculate evenly distributed points along the route and use them as the points for which to perform the interpolation. The result can be publicly accessed from `cartobq.docs.kriging_jp_interp_points`.

```sql
SELECT
  ST_GEOGPOINT(142.41*p+142.44*(1-p),43.496*p+43.53*(1-p)) point
FROM
  # generate 101 points evenly spaced along the route
  UNNEST(GENERATE_ARRAY(0,1,0.01)) p;
```

### Computing the interpolation

Now let’s use the kriging interpolation stored procedure, [ORDINARY_KRIGING_TABLE](../../sql-reference/statistics/#ordinary_kriging_table) to create a table with the result.

```sql
CALL `carto-un`.carto.ORDINARY_KRIGING_TABLE(
         'cartobq.docs.nasadem_jp_extract',
         'cartobq.docs.kriging_jp_interp_points',
         'cartobq.docs.kriging_jp_result',
         50,
         1000,
         20,
         'exponential'
     );
```
In this visualization we can see the computed elevation along the route accentuated by a factor of 10.

<iframe height=800px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/9f285926-6e77-4e42-826d-f0e2683f9fae" title="Kriging result"></iframe>

{{% euFlagFunding %}}
