---
title: "Analyzing store location coverage using a Voronoi diagram"
description: "Voronoi diagrams are a very useful tool to build influence regions from a set of points and the Analytics Toolbox provides a convenient function to build them. An example application of these diagrams is the calculation of the coverage areas of a series of Starbucks stores. In the following query we are going to calculate these influence areas in Atlanta."
image: "/img/sf-analytics-toolbox/examples/voronoi-store-location.png"
type: examples
date: "2021-06-12"
categories:
    - accessors
    - processing
aliases:
    - /analytics-toolbox-sf/examples/analyzing-store-location-coverage-using-a-voronoi-diagram/
---
## Analyzing store location coverage using a Voronoi diagram

Voronoi diagrams are a very useful tool to build influence regions from a set of points and the Analytics Toolbox provides a convenient function to build them. An example application of these diagrams is the calculation of the coverage areas of a series of Starbucks stores. In the following query we are going to calculate these influence areas in Atlanta.

The result can be seen in the visualization below, where the color of each polygon indicates its area, which gives an insight on the coverage provided by each store.

```sql
WITH starbucks AS
(
  SELECT geog
  FROM carto.STARBUCKS_LOCATIONS_USA
  WHERE CITY = 'Atlanta' AND geog IS NOT NULL
  ORDER BY id
),
starbucks_array AS (
  SELECT ARRAY_AGG(ST_ASGEOJSON(geog)::STRING) AS geog_array
  FROM starbucks
),
voronoi_array AS (
  SELECT carto.ST_ENVELOPE_ARR(geog_array) AS envelope,
  carto.ST_VORONOIPOLYGONS(geog_array, ARRAY_CONSTRUCT(ST_XMIN(envelope), ST_YMIN(envelope), ST_XMAX(envelope), ST_YMAX(envelope))) AS nested_voronoi
  FROM starbucks_array
)
SELECT TO_GEOGRAPHY(VALUE) AS geom, ST_AREA(geom) AS area FROM voronoi_array, lateral FLATTEN(input => nested_voronoi)
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://team.carto.com/u/agraciano/builder/44a8ae78-3443-4471-96a2-888c5dd1d9c8/layers#/" title="Starbucks stores coverage visualization by means of a Voronoi diagram."></iframe>

Prior to the calculation of the Voronoi diagrams, we use `ST_ENVELOPE` in order to calculate a boundary that covers all the Starbucks stores in our selection. This boundary is used to clip the resulting Voronoi polygons. If the bounding box parameter were not passed to `ST_VORONOIPOLYGONS`, the polygons would extend all over the map.

With this simple analysis we can identify at a glance areas where the coverage could be improved and therefore new stores could be placed.




