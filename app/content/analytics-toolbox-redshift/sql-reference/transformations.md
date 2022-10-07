## transformations

<div class="badges"><div class="core"></div></div>

This module contains functions that compute geometric constructions, or alter geometry size or shape.


### ST_CENTERMEAN

{{% bannerNote type="code" %}}
carto.ST_CENTERMEAN(geom)
{{%/ bannerNote %}}

**Description**

Takes a Feature or FeatureCollection and returns the mean center (average of its vertices).

* `geom`: `GEOMETRY` for which to compute the mean center.

**Return type**

`GEOMETRY`

**Example**

```sql
SELECT carto.ST_CENTERMEAN(ST_GEOMFROMTEXT('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- POINT (25 27.5)
```


### ST_CENTERMEDIAN

{{% bannerNote type="code" %}}
carto.ST_CENTERMEDIAN(geom)
{{%/ bannerNote %}}

**Description**

Takes a FeatureCollection of points and computes the median center. The median center is understood as the point that requires the least total travel from all other points.

* `geog`: `GEOMETRY` for which to compute the center.

**Return type**

`GEOMETRY`

**Example**

```sql
SELECT carto.ST_CENTERMEDIAN(ST_GEOMFROMTEXT('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- POINT (26.3841869726 19.0088147377)
```


### ST_CENTEROFMASS

{{% bannerNote type="code" %}}
carto.ST_CENTEROFMASS(geom)
{{%/ bannerNote %}}

**Description**

Takes any Feature or a FeatureCollection and returns its center of mass. It is equivalent to [`ST_CENTROID`](#st_centroid).

* `geom`: `GEOMETRY` for which to compute the center of mass.

**Return type**

`GEOMETRY`

**Example**

```sql
SELECT carto.ST_CENTEROFMASS(ST_GEOMFROMTEXT('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- POINT (25.4545454545 26.9696969697)
```


### ST_CENTROID

{{% bannerNote type="code" %}}
carto.ST_CENTROID(geom)
{{%/ bannerNote %}}

**Description**

Takes any Feature or a FeatureCollection as input and returns its centroid. It is equivalent to [`ST_CENTEROFMASS`](#st_centerofmass).

* `geom`: `GEOMETRY` for which to compute the centroid.

**Return type**

`GEOMETRY`

**Example**

```sql
SELECT carto.ST_CENTROID(ST_GEOMFROMTEXT('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- POINT (25.4545454545 26.9696969697)


### ST_DESTINATION

{{% bannerNote type="code" %}}
carto.ST_DESTINATION(geom, distance, bearing, units)
{{%/ bannerNote %}}

**Description**

Takes a Point and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and a bearing in degrees. This uses the Haversine formula to account for global curvature.

* `geom`: `GEOMETRY` starting point.
* `distance`: `FLOAT8` distance from the origin point in the units specified.
* `bearing`: `FLOAT8` counter-clockwise angle from East, ranging from -180 to 180 (e.g. 0 is East, 90 is North, 180 is West, -90 is South).
* `units` (optional): `VARCHAR(15)` units of length. The supported options are: `miles`, `kilometers`, `degrees` or `radians`. If `NULL`the default value `kilometers` is used.

**Return type**

`GEOMETRY`

**Examples**

```sql
SELECT carto.ST_DESTINATION(ST_MakePoint(-3.70325,40.4167), 10, 45);
-- POINT (-3.61964617436 40.4802614598)
```

```sql
SELECT carto.ST_DESTINATION(ST_MakePoint(-3.70325,40.4167), 10, 45, 'miles');
-- POINT (-3.56862505482 40.5189626778)
```


### ST_GREATCIRCLE

{{% bannerNote type="code" %}}
carto.ST_GREATCIRCLE(start_point, end_point, n_points)
{{%/ bannerNote %}}

**Description**

Calculates a great circle route as a LineString.

* `start_point`: `GEOMETRY` source point feature.
* `end_point`: `GEOMETRY` destination point feature.
* `n_points` (optional): `INT` number of points. Defaults to `100`.

**Return type**

`GEOMETRY`

**Examples**

```sql
SELECT carto.ST_GREATCIRCLE(ST_MAKEPOINT(-3.70325,40.4167), ST_MAKEPOINT(-73.9385,40.6643));
-- LINESTRING (-3.70325 40.4167, -4.32969777937 40.6355528695, ...
```

```sql
SELECT carto.ST_GREATCIRCLE(ST_MAKEPOINT(-3.70325,40.4167), ST_MAKEPOINT(-73.9385,40.6643), 20);
-- LINESTRING (-3.70325 40.4167, -7.01193184681 41.5188665219, ...
```
