---
title: "Identifying amenity hotspots in Stockholm"
description: "In this example we identify hotspots of amenity POIs in Stockholm using OpenStreetMap data and the GETIS_ORD_H3 function of the statistics module. "
image: "/img/bq-analytics-toolbox/examples/hotspots_amenity_pois_stockholm.png"
type: examples
date: "2021-27-12"
categories:
    - statistics
---

## Identifying amenity hotspots in Stockholm

In this example we are going to identify hotspots of amenity POIs in Stockholm using OpenStreetMap data and the [GETIS_ORD_H3](../../sql-reference/statistics/#getis_ord_h3) function of the statistics module. POIs data can be found in the publicly available `cartobq.docs.osm_pois_stockholm` table.

The process consists of three simple steps:
* First, we retrieve all POIs from OpenstreetMaps which belong to the category "amenity".
* Next, we find the H3 cell of resolution 9 to which each POI belongs and count the number of amenity POIs inside each cell.
* Finally, we call the [GETIS_ORD_H3](../../sql-reference/statistics/#getis_ord_h3) function, which returns the Getis-Ord Gi* statistic for each H3 cell, calculated over <i style="font-style:italic">n_amenity_pois</i> (number of amenity POIs in the cell).

{{% customSelector %}}𝅺{{%/ customSelector %}}
```sql
WITH
  stockholm AS (
  SELECT h3, CAST(COUNT(*) AS FLOAT64) AS n_amenity_pois,
  FROM (
    SELECT `carto-un`.carto.H3_FROMGEOGPOINT(geom, 9) AS h3,
    FROM cartobq.docs.osm_pois_stockholm
    WHERE amenity IS NOT NULL )
  GROUP BY h3),

  getis_ord AS (
  SELECT `carto-un`.carto.GETIS_ORD_H3(ARRAY_AGG(STRUCT(h3, n_amenity_pois)),
      4, 'triangular') AS output
  FROM stockholm )

SELECT unnested.INDEX AS h3id, unnested.gi
FROM getis_ord, UNNEST(getis_ord.output) AS unnested
```

The results can be explored in the map below, where we can use the histogram widget to narrow down the cells with the highest Gi* values, which correspond to the location of the hotspots of amenity POIs in Stockholm.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://gcp-us-east1.app.carto.com/map/e3702384-809c-4d0d-847c-af71c8b4a30a" title="Identifying amenity hotspots in Stockholm"></iframe>

{{% euFlagFunding %}}
