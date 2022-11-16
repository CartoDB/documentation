---
aliases:
    - /analytics-toolbox-bq/sql-reference/processing/
---
## processing

<div class="badges"><div class="core"></div></div>

This module contains functions that computes new geographies by processing existing geographies.


### ST_DELAUNAYLINES

{{% bannerNote type="code" %}}
carto.ST_DELAUNAYLINES(points)
{{%/ bannerNote %}}

**Description**

Calculates the Delaunay triangulation of the points provided. An array of line strings is returned.

* `points`: `ARRAY<GEOGRAPHY>` input to the Delaunay triangulation.

Due to technical limitations of the underlying libraries used, the input points' coordinates are truncated to 5 decimal places in order to avoid problems that happen with close but distinct input points. This limits the precision of the results and can alter slightly the position of the resulting polygons (about 1 meter). This can also result in some points being merged together, so that fewer polygons than expected may result.

**Return type**

`ARRAY<GEOGRAPHY>`

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

``` sql
SELECT `carto-os`.carto.ST_DELAUNAYLINES(
  [
    ST_GEOGPOINT(-74.5366825512491, 43.6889777784079),
    ST_GEOGPOINT(-74.4821382017478, 43.3096147774153),
    ST_GEOGPOINT(-70.7632814028801, 42.9679602005825),
    ST_GEOGPOINT(-73.3262122666779, 41.2706174323278),
    ST_GEOGPOINT(-70.2005131676838, 43.8455720129728),
    ST_GEOGPOINT(-73.9704330709753, 35.3953164724094),
    ST_GEOGPOINT(-72.3402283537205, 35.8941454568627),
    ST_GEOGPOINT(-72.514071762468, 36.5823995124737)
  ]
);
-- LINESTRING(-74.5366825512491 43.6889777784079, -70.7632814028801 ...
-- LINESTRING(-74.4821382017478 43.3096147774153, -74.5366825512491  ...
-- LINESTRING(-73.3262122666779 41.2706174323278, -74.4821382017478 ...
-- LINESTRING(-73.9704330709753 35.3953164724094, -72.3402283537205 ...
-- LINESTRING(-73.9704330709753 35.3953164724094, -72.514071762468 ...
-- LINESTRING(-72.514071762468 36.5823995124737, -73.3262122666779 ...
```

Note that if some points are very close together (about 1 meter) they may be merged and the result may have fewer lines than expected, for example these four points result in two lines:

```sql
SELECT `carto-os`.carto.ST_DELAUNAYLINES(
     [
          ST_GEOGPOINT(4.1829523, 43.6347910),
          ST_GEOGPOINT(4.1829967, 43.6347137),
          ST_GEOGPOINT(4.1829955, 43.6347143),
          ST_GEOGPOINT(4.1829321, 43.6347500)
     ]
);
-- [
--   LINESTRING(4.18293 43.63475, 4.183 43.63471, 4.18295 43.63479, 4.18293 43.63475)
-- ]
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [A NYC subway connection graph using Delaunay triangulation](/analytics-toolbox-bigquery/examples/a-nyc-subway-connection-graph-using-delaunay-triangulation/)
{{%/ bannerNote %}}


### ST_DELAUNAYPOLYGONS

{{% bannerNote type="code" %}}
carto.ST_DELAUNAYPOLYGONS(points)
{{%/ bannerNote %}}

**Description**

Calculates the Delaunay triangulation of the points provided. An array of polygons is returned.

* `points`: `ARRAY<GEOGRAPHY>` input to the Delaunay triangulation.

Due to technical limitations of the underlying libraries used, the input points' coordinates are truncated to 5 decimal places in order to avoid problems that happen with close but distinct input points. This limits the precision of the results and can alter slightly the position of the resulting polygons (about 1 meter). This can also result in some points being merged together, so that fewer polygons than expected may result.

**Return type**

`ARRAY<GEOGRAPHY>`

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

``` sql
SELECT `carto-os`.carto.ST_DELAUNAYPOLYGONS(
  [
    ST_GEOGPOINT(-74.5366825512491, 43.6889777784079),
    ST_GEOGPOINT(-74.4821382017478, 43.3096147774153),
    ST_GEOGPOINT(-70.7632814028801, 42.9679602005825),
    ST_GEOGPOINT(-73.3262122666779, 41.2706174323278),
    ST_GEOGPOINT(-70.2005131676838, 43.8455720129728),
    ST_GEOGPOINT(-73.9704330709753, 35.3953164724094),
    ST_GEOGPOINT(-72.3402283537205, 35.8941454568627),
    ST_GEOGPOINT(-72.514071762468, 36.5823995124737)
  ]
);
-- [
--   POLYGON((-74.5366825512491 43.6889777784079, -70.7632814028801 42.9679602005825, -70.2005131676838 43.8455720129728, -74.5366825512491 43.6889777784079)),
--   POLYGON((-70.7632814028801 42.9679602005825, -74.5366825512491 43.6889777784079, -74.4821382017478 43.3096147774153, -70.7632814028801 42.9679602005825)),
--   POLYGON((-70.7632814028801 42.9679602005825, -74.4821382017478 43.3096147774153, -73.3262122666779 41.2706174323278, -70.7632814028801 42.9679602005825)),
--   POLYGON((-73.9704330709753 35.3953164724094, -72.3402283537205 35.8941454568627, -72.514071762468 36.5823995124737, -73.9704330709753 35.3953164724094)),
--   POLYGON((-73.9704330709753 35.3953164724094, -72.514071762468 36.5823995124737, -73.3262122666779 41.2706174323278, -73.9704330709753 35.3953164724094)),
--  POLYGON((-70.7632814028801 42.9679602005825, -73.3262122666779 41.2706174323278, -72.514071762468 36.5823995124737, -70.7632814028801 42.9679602005825))]
-- ]
```

Note that if some points are very close together (about 1 meter) they may be merged and the result may have fewer triangles than expected, for example these four points result in one triangle:

```sql
SELECT `carto-os`.carto.ST_DELAUNAYPOLYGONS(
     [
          ST_GEOGPOINT(4.1829523, 43.6347910),
          ST_GEOGPOINT(4.1829967, 43.6347137),
          ST_GEOGPOINT(4.1829955, 43.6347143),
          ST_GEOGPOINT(4.1829321, 43.6347500)
     ]
);
-- [ POLYGON((4.18293 43.63475, 4.183 43.63471, 4.18295 43.63479, 4.18293 43.63475)) ]
```


### ST_POLYGONIZE

{{% bannerNote type="code" %}}
carto.ST_POLYGONIZE(lines)
{{%/ bannerNote %}}

**Description**

Creates a set of polygons from geographies which contain lines that represent the their edges.

* `lines`: `ARRAY<GEOGRAPHY>` array of lines which represent the polygons edges.

**Return type**

`ARRAY<GEOGRAPHY>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

``` sql
SELECT `carto-os`.carto.ST_POLYGONIZE(
  [
    ST_GEOGFROMTEXT('LINESTRING(-74.5366825512491 43.6889777784079, -70.7632814028801 42.9679602005825, -70.2005131676838 43.8455720129728, -74.5366825512491 43.6889777784079)'),
    ST_GEOGFROMTEXT('LINESTRING(-73.9704330709753 35.3953164724094, -72.514071762468 36.5823995124737, -73.3262122666779 41.2706174323278, -73.9704330709753 35.3953164724094)')
  ]
);
-- POLYGON((-74.5366825512491 43.6889777784079, -70.7632814028801 42.9679602005825, -70.2005131676838 43.8455720129728, -74.5366825512491 43.6889777784079))
-- POLYGON((-73.9704330709753 35.3953164724094, -72.514071762468 36.5823995124737, -73.3262122666779 41.2706174323278, -73.9704330709753 35.3953164724094))
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Identifying earthquake-prone areas in the state of California](/analytics-toolbox-bigquery/examples/identifying-earthquake-prone-areas-in-the-state-of-california/)
{{%/ bannerNote %}}


### ST_VORONOILINES

{{% bannerNote type="code" %}}
carto.ST_VORONOILINES(points, bbox)
{{%/ bannerNote %}}

**Description**

Calculates the Voronoi diagram of the points provided. An array of lines is returned.

* `points`: `ARRAY<GEOGRAPHY>` input to the Voronoi diagram.
* `bbox`: `ARRAY<FLOAT64>|NULL` clipping bounding box. If `NULL` a default [-180,-85,180,-85] bbox will be used.

Due to technical limitations of the underlying libraries used, the input points' coordinates are truncated to 5 decimal places in order to avoid problems that happen with close but distinct input points. This limits the precision of the results and can alter slightly the position of the resulting lines (about 1 meter). This can also result in some points being merged together, so that fewer lines than input points may result.

**Return type**

`ARRAY<GEOGRAPHY>`

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

``` sql
SELECT `carto-os`.carto.ST_VORONOILINES(
  [
    ST_GEOGPOINT(-75.833, 39.284),
    ST_GEOGPOINT(-75.6, 39.984),
    ST_GEOGPOINT(-75.221, 39.125)
  ],
  [-76.0, 39.0, -75.0, 40.0]
);
-- LINESTRING(-76 39.728365, -75.8598447436013 39.6817133217987, ...
-- LINESTRING(-75 39.7356169965076, -75.2196894872026 39.6386876418512, ...
-- LINESTRING(-75.5801299019608 39, -75.509754438183 39.2708791435974, ...
```

Note that if some points are very close together (about 1 meter) they may be merged and the result may have fewer lines than points, for example these three points result in two lines

```sql
SELECT `carto-os`.carto.ST_VORONOILINES(
     [
          ST_GEOGPOINT(4.1829523,43.6347910),
          ST_GEOGPOINT(4.1829967,43.6347137),
          ST_GEOGPOINT(4.1829955,43.6347143)
     ],
     [4.182, 43.634, 4.183, 43.635]
);
-- [
--   LINESTRING(4.183 43.634765625, 4.182 43.634140625, 4.182 43.635, 4.183 43.635, 4.183 43.634765625),
--   LINESTRING(4.182 43.634140625, 4.183 43.634765625, 4.183 43.634, 4.182 43.634, 4.182 43.634140625)
--  ]
```


### ST_VORONOIPOLYGONS

{{% bannerNote type="code" %}}
carto.ST_VORONOIPOLYGONS(points, bbox)
{{%/ bannerNote %}}

**Description**

Calculates the Voronoi diagram of the points provided. An array of polygons is returned.

* `points`: `ARRAY<GEOGRAPHY>` input to the Voronoi diagram.
* `bbox`: `ARRAY<FLOAT64>|NULL` clipping bounding box. If `NULL` a default [-180,-85,180,-85] bbox will be used.

Due to technical limitations of the underlying libraries used, the input points' coordinates are truncated to 5 decimal places in order to avoid problems that happen with close but distinct input points. This limits the precision of the results and can alter slightly the position of the resulting polygons (about 1 meter). This can also result in some points being merged together, so that fewer polygons than input points may result.

**Return type**

`ARRAY<GEOGRAPHY>`

{{% customSelector %}}
**Examples**
{{%/ customSelector %}}

``` sql
SELECT `carto-os`.carto.ST_VORONOIPOLYGONS(
  [
    ST_GEOGPOINT(-75.833, 39.284),
    ST_GEOGPOINT(-75.6, 39.984),
    ST_GEOGPOINT(-75.221, 39.125)
  ],
  [-76.0, 39.0, -75.0, 40.0]
);
-- POLYGON((-76 39, -75.7900649509804 39, -75.5801299019608 39, ...
-- POLYGON((-75 40, -75.25 40, -75.5 40, -75.75 40, -76 40, ...
-- POLYGON((-75.43509742git64706 39, -75.2900649509804 39, ...
```

Note that if some points are very close together (about 1 meter) they may be merged and the result may have fewer polygons than points, for example these three points result in two polygons:

```sql
SELECT `carto-os`.carto.ST_VORONOIPOLYGONS(
     [
          ST_GEOGPOINT(4.1829523,43.6347910),
          ST_GEOGPOINT(4.1829967,43.6347137),
          ST_GEOGPOINT(4.1829955,43.6347143)
     ],
     [4.182, 43.634, 4.183, 43.635]
);
-- [
--   POLYGON((4.183 43.635, 4.182 43.635, 4.182 43.634140625, 4.183 43.634765625, 4.183 43.635)),
--   POLYGON((4.182 43.634, 4.183 43.634, 4.183 43.634765625, 4.182 43.634140625, 4.182 43.634))
-- ]
```

{{% bannerNote type="note" title="ADDITIONAL EXAMPLES"%}}

* [Analyzing weather stations coverage using a Voronoi diagram](/analytics-toolbox-bigquery/examples/analyzing-weather-stations-coverage-using-a-voronoi-diagram/)
{{%/ bannerNote %}}


{{% euFlagFunding %}}