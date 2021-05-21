## transformations

<div class="badges"><div class="core"></div></div>

This module contains functions that compute geometric constructions, or alter geometry size or shape.

### ST_CENTERMEAN

{{% bannerNote type="code" %}}
transformations.ST_CENTERMEAN(geog)
{{%/ bannerNote %}}

**Description**

Takes a Feature or FeatureCollection and returns the mean center. https://github.com/Turfjs/turf/tree/master/packages/turf-center-mean

* `geog`: `GEOGRAPHY` feature to be centered.

**Return type**

`GEOGRAPHY`

**Example**

``` sql
SELECT sfcarto.transformations.ST_CENTERMEAN(TO_GEOGRAPHY('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- { "coordinates": [ 26, 24 ], "type": "Point" }
```

### ST_CENTERMEDIAN

{{% bannerNote type="code" %}}
transformations.ST_CENTERMEDIAN(geog)
{{%/ bannerNote %}}

**Description**

Takes a FeatureCollection of points and calculates the median center, algorithimically. The median center is understood as the point that is requires the least total travel from all other points. https://github.com/Turfjs/turf/tree/master/packages/turf-center-median

* `geog`: `GEOGRAPHY` feature to be centered.

**Return type**

`GEOGRAPHY`

**Example**

``` sql
SELECT sfcarto.transformations.ST_CENTERMEDIAN(TO_GEOGRAPHY('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- { "coordinates": [ 25, 27.5 ], "type": "Point" }
```

### ST_CENTEROFMASS

{{% bannerNote type="code" %}}
transformations.ST_CENTEROFMASS(geog)
{{%/ bannerNote %}}

**Description**

Takes any Feature or a FeatureCollection and returns its center of mass using this formula: Centroid of Polygon. https://turfjs.org/docs/#centerOfMass

* `geog`: `GEOGRAPHY` feature to be centered.

**Return type**

`GEOGRAPHY`

**Example**

``` sql
SELECT sfcarto.transformations.ST_CENTEROFMASS(TO_GEOGRAPHY('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- { "coordinates": [ 25.454545454545453, 26.96969696969697 ], "type": "Point" }
```

### ST_CONCAVEHULL

{{% bannerNote type="code" %}}
transformations.ST_CONCAVEHULL(geojsons [, maxEdge] [, units])
{{%/ bannerNote %}}

**Description**

Takes a set of points and returns a concave hull Polygon or MultiPolygon. Internally, this uses turf-tin to generate geometries. https://turfjs.org/docs/#concave

* `geojsons`: `ARRAY` array of features in GeoJSON format casted to STRING.
* `maxEdge` (optional): `DOUBLE` the length (in 'units') of an edge necessary for part of the hull to become concave. By default `maxEdge` is `infinity`.
* `units` (optional): `STRING` any of the options supported by turf units: miles, kilometers, degrees or radians. By default `units` is `kilometers`.

**Return type**

`GEOGRAPHY`

**Examples**

``` sql
SELECT sfcarto.transformations.ST_CONCAVEHULL(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(-75.833, 39.284))::STRING, ST_ASGEOJSON(ST_POINT(-75.6, 39.984))::STRING, ST_ASGEOJSON(ST_POINT(-75.221, 39.125))::STRING, ST_ASGEOJSON(ST_POINT(-75.521, 39.325))::STRING));
-- { "coordinates": [ [ [ -75.221, 39.125 ], [ -75.833, 39.284 ], [ -75.6, 39.984 ], [ -75.221, 39.125 ] ] ], "type": "Polygon" }
```

``` sql
SELECT sfcarto.transformations.ST_CONCAVEHULL(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(-75.833, 39.284))::STRING, ST_ASGEOJSON(ST_POINT(-75.6, 39.984))::STRING, ST_ASGEOJSON(ST_POINT(-75.221, 39.125))::STRING, ST_ASGEOJSON(ST_POINT(-75.521, 39.325))::STRING), 100);
-- { "coordinates": [ [ [ -75.833, 39.284 ], [ -75.6, 39.984 ], ...
```

``` sql
SELECT sfcarto.transformations.ST_CONCAVEHULL(ARRAY_CONSTRUCT(ST_ASGEOJSON(ST_POINT(-75.833, 39.284))::STRING, ST_ASGEOJSON(ST_POINT(-75.6, 39.984))::STRING, ST_ASGEOJSON(ST_POINT(-75.221, 39.125))::STRING, ST_ASGEOJSON(ST_POINT(-75.521, 39.325))::STRING), 100, 'kilometers');
-- { "coordinates": [ [ [ -75.833, 39.284 ], [ -75.6, 39.984 ], ...
```

### ST_DESTINATION

{{% bannerNote type="code" %}}
transformations.ST_DESTINATION(startPoint, distance, bearing [, units])
{{%/ bannerNote %}}

**Description**

Takes a Point and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the Haversine formula to account for global curvature. https://turfjs.org/docs/#destination

* `origin`: `GEOGRAPHY` starting point.
* `distance`: `DOUBLE` distance from the origin point.
* `bearing`: `DOUBLE` ranging from -180 to 180.
* `units` (optional): `STRING` any of the options supported by turf units: miles, kilometers, degrees or radians. By default `units` is `kilometers`.

**Return type**

`GEOGRAPHY`

**Examples**

``` sql
SELECT sfcarto.transformations.ST_DESTINATION(ST_POINT(-3.70325,40.4167), 10, 45);
-- { "coordinates": [ -3.6196461743569053, 40.48026145975517 ], "type": "Point" }
```

``` sql
SELECT sfcarto.transformations.ST_DESTINATION(ST_POINT(-3.70325,40.4167), 10, 45, 'miles');
-- { "coordinates": [ -3.56862505487045, 40.518962677753585 ], "type": "Point" }
```

### ST_GREATCIRCLE

{{% bannerNote type="code" %}}
transformations.ST_GREATCIRCLE(startPoint, endPoint [, npoints])
{{%/ bannerNote %}}

**Description**

Calculate great circles routes as LineString or MultiLineString. If the start and end points span the antimeridian, the resulting feature will be split into a MultiLineString. https://turfjs.org/docs/#greatCircle

* `startPoint`: `GEOGRAPHY` source point feature.
* `endPoint`: `GEOGRAPHY` destination point feature.
* `npoints` (optional): `INT` number of points. By default `npoints` is `100`.

**Return type**

`GEOGRAPHY`

**Examples**

``` sql
SELECT sfcarto.transformations.ST_GREATCIRCLE(ST_POINT(-3.70325,40.4167), ST_POINT(-73.9385,40.6643));
-- { "coordinates": [ [ -3.7032499999999993, 40.4167 ], ... 
```

``` sql
SELECT sfcarto.transformations.ST_GREATCIRCLE(ST_POINT(-3.70325,40.4167), ST_POINT(-73.9385,40.6643), 20);
-- { "coordinates": [ [ -3.7032499999999993, 40.4167 ], ... 
```

### ST_LINE_INTERPOLATE_POINT

{{% bannerNote type="code" %}}
transformations.ST_LINE_INTERPOLATE_POINT(geog, distance [, units])
{{%/ bannerNote %}}

**Description**

Takes a LineString and returns a Point at a specified distance along the line. https://turfjs.org/docs/#along

* `geog`: `GEOGRAPHY` input line.
* `distance`: `DOUBLE` distance along the line.
* `units` (optional): `STRING` any of the options supported by turf units: miles, kilometers, degrees and radians. By default `units` is `kilometers`.

**Return type**

`GEOGRAPHY`

**Examples**

``` sql
SELECT sfcarto.transformations.ST_LINE_INTERPOLATE_POINT(TO_GEOGRAPHY('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'), 250);
-- { "coordinates": [ -75.5956489839589, 19.273615818183988 ], "type": "Point" } 
```

``` sql
SELECT sfcarto.transformations.ST_LINE_INTERPOLATE_POINT(TO_GEOGRAPHY('LINESTRING (-76.091308 18.427501,-76.695556 18.729501,-76.552734 19.40443,-74.61914 19.134789,-73.652343 20.07657,-73.157958 20.210656)'), 250, 'miles');
-- { "coordinates": [ -74.297592068938, 19.449810710315635 ], "type": "Point" } 
```

### VERSION

{{% bannerNote type="code" %}}
transformations.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the transformations module.

**Return type**

`STRING`

**Example**

```sql
SELECT sfcarto.transformations.VERSION();
-- 1.0.0
```