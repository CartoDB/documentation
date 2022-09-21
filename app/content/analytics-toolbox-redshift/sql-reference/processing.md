## processing

<div class="badges"><div class="core"></div></div>

On this module are contained functions that create geographies from already existing geographies by computing a prior processing.


### ST_DELAUNAYLINES

{{% bannerNote type="code" %}}
carto.ST_DELAUNAYLINES(points)
{{%/ bannerNote %}}

**Description**

Calculates the Delaunay triangulation of the points provided. A MultiLineString object is returned.

* `points`: `GEOMETRY` MultiPoint input to the Delaunay triangulation.

**Return type**

`VARCHAR(MAX)`

**Example**

```sql
SELECT carto.ST_DELAUNAYLINES(ST_GEOMFROMTEXT('MULTIPOINT((-70.3894720672732 42.9988854818585),(-71.1048188482079 42.6986831053718),(-72.6818783178395 44.1191152795997),(-73.8221894711314 35.1057463244819))'));
-- {"type": "MultiLineString", "coordinates": [[[-71.1048188482, 42.6986831054], [-70.3894720673, 42.9988854819], [-73.8221894711, 35.1057463245], [-71.1048188482, 42.6986831054]], ...
```


### ST_DELAUNAYPOLYGONS

{{% bannerNote type="code" %}}
carto.ST_DELAUNAYPOLYGONS(points)
{{%/ bannerNote %}}

**Description**

Calculates the Delaunay triangulation of the points provided. A MultiPolygon object is returned.

* `points`: `GEOMETRY` MultiPoint input to the Delaunay triangulation.

**Return type**

`VARCHAR(MAX)`

**Example**

```sql
SELECT carto.ST_DELAUNAYPOLYGONS(ST_GEOMFROMTEXT('MULTIPOINT((-70.3894720672732 42.9988854818585),(-71.1048188482079 42.6986831053718),(-72.6818783178395 44.1191152795997),(-73.8221894711314 35.1057463244819))'));
-- {"type": "MultiPolygon", "coordinates": [[[[-71.1048188482, 42.6986831054], [-70.3894720673, 42.9988854819], [-73.8221894711, 35.1057463245], [-71.1048188482, 42.6986831054]]], ...
```


### ST_POLYGONIZE

{{% bannerNote type="code" %}}
carto.ST_POLYGONIZE(lines)
{{%/ bannerNote %}}

**Description**

Creates a polygon from a geography which contains lines that represent its edges.

* `line`: `GEOMETRY` lines which represent the polygon edges.

**Return type**

`GEOMETRY`

**Example**

```sql
SELECT carto.ST_POLYGONIZE(ST_GEOMFROMTEXT('LINESTRING(-74.5366825512491 43.6889777784079, -70.7632814028801 42.9679602005825, -70.2005131676838 43.8455720129728, -74.5366825512491 43.6889777784079)'));
-- POLYGON ((-74.5366825512491 43.6889777784079, -70.7632814028801 42.9679602005825, -70.2005131676838 43.8455720129728, -74.5366825512491 43.6889777784079))
```


### ST_VORONOILINES

{{% bannerNote type="code" %}}
carto.ST_VORONOILINES(points)
{{%/ bannerNote %}}

**Description**

Calculates the Voronoi diagram of the points provided. A MultiLineString object is returned.

* `points`: `GEOMETRY` MultiPoint input to the Voronoi diagram.

**Return type**

`VARCHAR(MAX)`

**Example**

```sql
SELECT carto.ST_VORONOILINES(ST_GEOMFROMTEXT('MULTIPOINT((-74.5366825512491 43.6889777784079),(-74.4821382017478 43.3096147774153),(-70.7632814028801 42.9679602005825))'));
-- {"type": "MultiLineString", "coordinates": [[[-72.563891028, 43.7790206765], [-72.6715241053, 42.6074514117]], [[-72.563891028, 43.7790206765], ...
```


### ST_VORONOIPOLYGONS

{{% bannerNote type="code" %}}
carto.ST_VORONOIPOLYGONS(points)
{{%/ bannerNote %}}

**Description**

Calculates the Voronoi diagram of the points provided. A MultiPolygon object is returned.

* `points`: `GEOMETRY` MultiPoint input to the Voronoi diagram.

**Return type**

`VARCHAR(MAX)`

**Example**

```sql
SELECT carto.ST_VORONOIPOLYGONS(ST_GEOMFROMTEXT('MULTIPOINT((-74.5366825512491 43.6889777784079),(-74.4821382017478 43.3096147774153),(-70.7632814028801 42.9679602005825))'));
-- {"type": "MultiPolygon", "coordinates": [[[[-74.8971913401, 43.443541604], [-72.563891028, 43.7790206765], [-72.5122106861, 44.0494865673], [-74.8971913401, 44.0494865673], ...
```
