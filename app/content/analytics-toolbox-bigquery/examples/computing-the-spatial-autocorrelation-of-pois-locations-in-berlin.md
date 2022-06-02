---
title: "Computing the spatial autocorrelation of POIs locations in Berlin"
description: "In this example we analyze the spatial correlation of POIs locations in Berlin using OpenStreetMap data and the MORANS_I_H3 function available in the statistics module. "
image: "/img/bq-analytics-toolbox/examples/spatial_autocorrelation_pois_berlin.png"
type: examples
date: "2021-30-12"
categories:
    - statistics
---

## Computing the spatial autocorrelation of POIs locations in Berlin

In this example we are going to analyze the spatial correlation of POIs locations in Berlin using OpenStreetMap data and the [Moran's I](../../sql-reference/statistics/#morans_i_h3) function available in the statistics module. POIs data can be found in the publicly available `cartobq.docs.osm_pois_berlin` table.

First, we are going to visually analyze the distribution of the POIs in the Berlin area by plotting the aggregation of POIs in each H3 cell of resolution 9. This can be done simply by applying the [H3_FROMGEOGPOINT](../../sql-reference/h3/#h3_fromgeogpoint) function to compute the H3 cell that each POI belongs to and then performing a group by to count the number of POIs inside each cell (<i style="font-style:italic">n_pois</i>). 

By looking at the resulting map below, it is clear that there is a level of spatial autocorrelation in the distribution of the POIs:

<iframe height=480px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/a1bd26d7-0a30-4f3d-a2e5-8cbc06a04124" title="Computing the spatial autocorrelation of POIs locations in Berlin"></iframe>

We can measure this spatial autocorrelation using the [MORANS_I_H3](../../sql-reference/statistics/#morans_i_h3) function, which yields a result of `0.698` by applying the query below:

```sql
WITH berlin AS (
  SELECT
    h3, CAST(COUNT(*) AS FLOAT64) AS n_pois
  FROM (
    SELECT `carto-un`.carto.H3_FROMGEOGPOINT(geom, 9) AS h3
    FROM `cartobq.docs.osm_pois_berlin` )
  GROUP BY h3)
SELECT `carto-un`.carto.MORANS_I_H3(ARRAY_AGG(STRUCT(h3, n_pois)),
    1, 'exponential')
FROM berlin 
```

{{% euFlagFunding %}}
