## processing

<div class="badges"><div class="core"></div></div>

On this module are contained functions that create geographies from already existing geographies by computing a prior processing.


### ST_DELAUNAYLINES

{{% bannerNote type="code" %}}
carto.ST_DELAUNAYLINES(points)
{{%/ bannerNote %}}

**Description**

Calculates the Delaunay triangulation of the points provided. An array of linestrings in GeoJSON format is returned.

* `points`: `ARRAY` array of points in GeoJSON format casted to STRING.

**Return type**

`ARRAY`

**Example**

```sql
SELECT carto.ST_DELAUNAYLINES(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(-75.833, 39.284))::STRING, ST_ASGEOJSON(ST_POINT(-75.6, 39.984))::STRING, ST_ASGEOJSON(ST_POINT(-75.221, 39.125))::STRING, ST_ASGEOJSON(ST_POINT(-75.521, 39.325))::STRING));
--  "{\"coordinates\":[[-75.833,39.284],[-75.221,39.125],[-75.6,39.984],[-75.833,39.284]],\"type\":\"LineString\"}",
--  "{\"coordinates\":[[-75.833,39.284],[-75.521,39.325],[-75.6,39.984],[-75.833,39.284]],\"type\":\"LineString\"}",
--  "{\"coordinates\":[[-75.833,39.284],[-75.521,39.325],[-75.221,39.125],[-75.833,39.284]],\"type\":\"LineString\"}",
--  "{\"coordinates\":[[-75.521,39.325],[-75.221,39.125],[-75.6,39.984],[-75.521,39.325]],\"type\":\"LineString\"}"
```

### ST_DELAUNAYLINES

{{% bannerNote type="code" %}}
carto.ST_DELAUNAYLINES(points)
{{%/ bannerNote %}}

**Description**

Calculates the Delaunay triangulation of the points provided. An array of polygons in GeoJSON format is returned.

* `points`: `ARRAY` array of points in GeoJSON format casted to STRING.

**Return type**

`ARRAY`

**Example**

```sql
SELECT carto.ST_DELAUNAYPOLYGONS(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(-75.833, 39.284))::STRING, ST_ASGEOJSON(ST_POINT(-75.6, 39.984))::STRING, ST_ASGEOJSON(ST_POINT(-75.221, 39.125))::STRING, ST_ASGEOJSON(ST_POINT(-75.521, 39.325))::STRING));
-- "{\"coordinates\":[[[-75.833,39.284],[-75.221,39.125],[-75.6,39.984],[-75.833,39.284]]],\"type\":\"Polygon\"}",
-- "{\"coordinates\":[[[-75.833,39.284],[-75.521,39.325],[-75.6,39.984],[-75.833,39.284]]],\"type\":\"Polygon\"}",
-- "{\"coordinates\":[[[-75.833,39.284],[-75.521,39.325],[-75.221,39.125],[-75.833,39.284]]],\"type\":\"Polygon\"}",
-- "{\"coordinates\":[[[-75.521,39.325],[-75.221,39.125],[-75.6,39.984],[-75.521,39.325]]],\"type\":\"Polygon\"}"
```


### ST_POLYGONIZE

{{% bannerNote type="code" %}}
carto.ST_POLYGONIZE(lines)
{{%/ bannerNote %}}

**Description**

Creates a set of polygons from geographies which contain lines that represent the their edges.

* `lines`: `ARRAY` array of lines which represent the polygons edges in GeoJSON format casted to STRING.

**Return type**

`ARRAY`

**Example**

```sql
SELECT carto.ST_POLYGONIZE(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_GEOGRAPHYFROMWKT('LINESTRING(-74.5366825512491 43.6889777784079, -70.7632814028801 42.9679602005825, -70.2005131676838 43.8455720129728, -74.5366825512491 43.6889777784079)'))::STRING,ST_ASGEOJSON(ST_GEOGRAPHYFROMWKT('LINESTRING(-73.9704330709753 35.3953164724094, -72.514071762468 36.5823995124737, -73.3262122666779 41.2706174323278, -73.9704330709753 35.3953164724094)'))::STRING));
-- "{\"coordinates\":[[[-74.5366825512491,43.6889777784079],[-70.7632814028801,42.9679602005825],[-70.2005131676838,43.8455720129728],[-74.5366825512491,43.6889777784079]]],\"type\":\"Polygon\"}",
-- "{\"coordinates\":[[[-73.9704330709753,35.3953164724094],[-72.514071762468,36.5823995124737],[-73.3262122666779,41.2706174323278],[-73.9704330709753,35.3953164724094]]],\"type\":\"Polygon\"}"
```

### ST_VORONOILINES

{{% bannerNote type="code" %}}
carto.ST_VORONOILINES(points [, bbox])
{{%/ bannerNote %}}

**Description**

Calculates the Voronoi diagram of the points provided. An array of linestrings in GeoJSON format is returned.

* `points`: `ARRAY` array of points in GeoJSON format casted to STRING.
* `bbox` (optional): `ARRAY` clipping bounding box. By default the [-180,-85,180,85] bbox will be used.

**Return type**

`ARRAY`

**Examples**

```sql
SELECT carto.ST_VORONOILINES(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(-75.833, 39.284))::STRING, ST_ASGEOJSON(ST_POINT(-75.6, 39.984))::STRING, ST_ASGEOJSON(ST_POINT(-75.221, 39.125))::STRING, ST_ASGEOJSON(ST_POINT(-75.521, 39.325))::STRING));
--  "{\"type\":\"LineString\",\"coordinates\":[[-180,74.34550785714367],[-75.72047348298037,39.63532260219203],[-75.6178875502008,38.854668674698786],[-107.79581617647065,-85],[-180,-85],[-180,74.34550785714367]]}",
--  "{\"type\":\"LineString\",\"coordinates\":[[27.59130606860346,85],[-75.04333534909291,39.716496976360624],[-75.72047348298037,39.63532260219203],[-180,74.34550785714367],[-180,85],[27.59130606860346,85]]}",
--  "{\"type\":\"LineString\",\"coordinates\":[[-107.79581617647065,-85],[-75.6178875502008,38.854668674698786],[-75.04333534909291,39.716496976360624],[27.59130606860346,85],[180,85],[180,-85],[-107.79581617647065,-85]]}",
--  "{\"type\":\"LineString\",\"coordinates\":[[-75.72047348298037,39.63532260219203],[-75.04333534909291,39.716496976360624],[-75.6178875502008,38.854668674698786],[-75.72047348298037,39.63532260219203]]}"
```

```sql
SELECT carto.ST_VORONOILINES(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(-75.833, 39.284))::STRING, ST_ASGEOJSON(ST_POINT(-75.6, 39.984))::STRING, ST_ASGEOJSON(ST_POINT(-75.221, 39.125))::STRING, ST_ASGEOJSON(ST_POINT(-75.521, 39.325))::STRING), ARRAY_CONSTRUCT(-76.0, 35.0, -70.0, 45.0));
--  "{\"type\":\"LineString\",\"coordinates\":[[-76,39.728365000000004],[-75.72047348298037,39.63532260219203],[-75.6178875502008,38.854668674698786],[-76,37.38389622641511],[-76,39.728365000000004]]}",
--  "{\"type\":\"LineString\",\"coordinates\":[[-70,41.941670547147794],[-75.04333534909291,39.716496976360624],[-75.72047348298037,39.63532260219203],[-76,39.728365000000004],[-76,45],[-70,45],[-70,41.941670547147794]]}",
--  "{\"type\":\"LineString\",\"coordinates\":[[-76,37.38389622641511],[-75.6178875502008,38.854668674698786],[-75.04333534909291,39.716496976360624],[-70,41.941670547147794],[-70,35],[-76,35],[-76,37.38389622641511]]}",
--  "{\"type\":\"LineString\",\"coordinates\":[[-75.72047348298037,39.63532260219203],[-75.04333534909291,39.716496976360624],[-75.6178875502008,38.854668674698786],[-75.72047348298037,39.63532260219203]]}"
```

### ST_VORONOIPOLYGONS

{{% bannerNote type="code" %}}
carto.ST_VORONOIPOLYGONS(points [, bbox])
{{%/ bannerNote %}}

**Description**

Calculates the Voronoi diagram of the points provided. An array of polygons in GeoJSON format is returned.

* `points`: `ARRAY` array of points in GeoJSON format casted to STRING.
* `bbox` (optional): `ARRAY` clipping bounding box. By default the [-180,-85,180,85] bbox will be used.

**Return type**

`ARRAY`

**Examples**

```sql
SELECT carto.ST_VORONOIPOLYGONS(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(-75.833, 39.284))::STRING, ST_ASGEOJSON(ST_POINT(-75.6, 39.984))::STRING, ST_ASGEOJSON(ST_POINT(-75.221, 39.125))::STRING, ST_ASGEOJSON(ST_POINT(-75.521, 39.325))::STRING));
--  "{\"type\":\"Polygon\",\"coordinates\":[[[-180,74.34550785714367],[-75.72047348298037,39.63532260219203],[-75.6178875502008,38.854668674698786],[-107.79581617647065,-85],[-180,-85],[-180,74.34550785714367]]]}",
--  "{\"type\":\"Polygon\",\"coordinates\":[[[27.59130606860346,85],[-75.04333534909291,39.716496976360624],[-75.72047348298037,39.63532260219203],[-180,74.34550785714367],[-180,85],[27.59130606860346,85]]]}",
--  "{\"type\":\"Polygon\",\"coordinates\":[[[-107.79581617647065,-85],[-75.6178875502008,38.854668674698786],[-75.04333534909291,39.716496976360624],[27.59130606860346,85],[180,85],[180,-85],[-107.79581617647065,-85]]]}",
--  "{\"type\":\"Polygon\",\"coordinates\":[[[-75.72047348298037,39.63532260219203],[-75.04333534909291,39.716496976360624],[-75.6178875502008,38.854668674698786],[-75.72047348298037,39.63532260219203]]]}"
```

```sql
SELECT carto.ST_VORONOIPOLYGONS(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(-75.833, 39.284))::STRING, ST_ASGEOJSON(ST_POINT(-75.6, 39.984))::STRING, ST_ASGEOJSON(ST_POINT(-75.221, 39.125))::STRING, ST_ASGEOJSON(ST_POINT(-75.521, 39.325))::STRING), ARRAY_CONSTRUCT(-76.0, 35.0, -70.0, 45.0));
--  "{\"type\":\"Polygon\",\"coordinates\":[[[-76,39.728365000000004],[-75.72047348298037,39.63532260219203],[-75.6178875502008,38.854668674698786],[-76,37.38389622641511],[-76,39.728365000000004]]]}",
--  "{\"type\":\"Polygon\",\"coordinates\":[[[-70,41.941670547147794],[-75.04333534909291,39.716496976360624],[-75.72047348298037,39.63532260219203],[-76,39.728365000000004],[-76,45],[-70,45],[-70,41.941670547147794]]]}",
--  "{\"type\":\"Polygon\",\"coordinates\":[[[-76,37.38389622641511],[-75.6178875502008,38.854668674698786],[-75.04333534909291,39.716496976360624],[-70,41.941670547147794],[-70,35],[-76,35],[-76,37.38389622641511]]]}",
--  "{\"type\":\"Polygon\",\"coordinates\":[[[-75.72047348298037,39.63532260219203],[-75.04333534909291,39.716496976360624],[-75.6178875502008,38.854668674698786],[-75.72047348298037,39.63532260219203]]]}"
```