## Analyzing weather stations coverage using a Voronoi diagram

Voronoi diagrams are a very useful tool to build influence regions from a set of points and the Analytics Toolbox provides a convenient function to build them. An example application of these diagrams is the calculation of the coverage areas of a series of weather stations. In the following query we are going to calculate these influence areas in the state of New York. 

The result can be seen in the visualization below, where the color of each polygon indicates its area, which gives an insight on the coverage provided by the station.

```sql
WITH world_stations AS (
  SELECT ST_GEOGPOINT(longitude, latitude) AS geom
  FROM `bigquery-public-data.ghcn_d.ghcnd_stations`
),
nys_bounds AS (
  SELECT state_geom AS geom
  FROM `bigquery-public-data.geo_us_boundaries.states`
  WHERE state_fips_code = '36' -- New york
),
stations_nys AS (
  SELECT ARRAY (
    SELECT world_stations.geom AS geom
    FROM nys_bounds
    JOIN world_stations ON ST_CONTAINS(nys_bounds.geom , world_stations.geom)
  ) AS array_stations
),
voronoi_array AS (
  SELECT bqcarto.processing.ST_VORONOIPOLYGONS(stations_nys.array_stations, null) AS nested_voronoi
  FROM stations_nys
),
voronoi_polygons AS (
  SELECT ST_INTERSECTION(nys_bounds.geom, unnested_voronoi) AS geom
  FROM voronoi_array, UNNEST(nested_voronoi) AS unnested_voronoi, nys_bounds
)
SELECT ST_AREA(geom) AS area, geom FROM voronoi_polygons 
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://team.carto.com/u/agraciano/builder/4eb6e9e6-9552-4bda-9a4e-dc375cc79829/layers#/" title="Weather stations coverage visualization by means of a Voronoi diagram."></iframe>


Prior to the calculation of the Voronoi diagrams, the weather stations belonging to the New York State are collected from the table `ghcn_d.ghcnd_stations` by filtering them against the state's boundary. This same boundary is also used to clip the resulting Voronoi polygons: since a null bounding box parameter is passed to `ST_VORONOIPOLYGONS`, the polygons otherwise would extend all over the map.

With this simple analysis we can identify at a glance areas where the coverage should be improved and therefore new stations are needed.




