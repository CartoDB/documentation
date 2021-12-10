## transformations

<div class="badges"><div class="core"></div></div>

This module contains functions that compute geometric constructions, or alter geometry size or shape.

### ST_CENTERMEAN

{{% bannerNote type="code" %}}
transformations.ST_CENTERMEAN(geom)
{{%/ bannerNote %}}

**Description**

Takes a Feature or FeatureCollection and returns the mean center.

* `geom`: `GEOMETRY` feature to be centered.


**Return type**

`GEOMETRY`

**Example**

```sql
SELECT transformations.ST_CENTERMEAN(ST_GEOMFROMTEXT('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- POINT (25 27.5)
```

### ST_CENTERMEDIAN

{{% bannerNote type="code" %}}
transformations.ST_CENTERMEDIAN(geom)
{{%/ bannerNote %}}

**Description**

Takes a FeatureCollection of points and calculates the median center, algorithimically. The median center is understood as the point that is requires the least total travel from all other points.

* `geom`: `GEOMETRY` feature to be centered.

**Return type**

`GEOMETRY`

**Example**

```sql
SELECT transformations.ST_CENTERMEDIAN(ST_GEOMFROMTEXT('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- POINT (26.3841869726 19.0088147377)
```

### ST_CENTEROFMASS

{{% bannerNote type="code" %}}
transformations.ST_CENTEROFMASS(geom)
{{%/ bannerNote %}}

**Description**

Takes any Feature or a FeatureCollection and returns its center of mass using this formula: Centroid of Polygon. It's equivalent to the centroid.

* `geom`: `GEOMETRY` feature to be centered.

**Return type**

`GEOMETRY`

**Example**

```sql
SELECT transformations.ST_CENTEROFMASS(ST_GEOMFROMTEXT('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- POINT (25.4545454545 26.9696969697)
```

### ST_CENTROID

{{% bannerNote type="code" %}}
transformations.ST_CENTROID(geom)
{{%/ bannerNote %}}

**Description**

Takes any Feature or a FeatureCollection and returns its centroid. It's equivalent to the center of mass.

* `geom`: `GEOMETRY` feature to be centered.

**Return type**

`GEOMETRY`

**Example**

```sql
SELECT transformations.ST_CENTROID(ST_GEOMFROMTEXT('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))'));
-- POINT (25.4545454545 26.9696969697)

### ST_DESTINATION

{{% bannerNote type="code" %}}
transformations.ST_DESTINATION(geom, distance, bearing, units)
{{%/ bannerNote %}}

**Description**

Takes a Point and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the Haversine formula to account for global curvature.

* `geom`: `GEOMETRY` starting point.
* `distance`: `FLOAT8` distance from the origin point.
* `bearing`: `FLOAT8` ranging from -180 to 180.
* `units` (optional): `VARCHAR(15)` units of length, the supported options are: miles, kilometers, degrees or radians. By default `units` is `kilometers`.

**Return type**

`GEOMETRY`

**Examples**

```sql
SELECT transformations.ST_DESTINATION(ST_MakePoint(-3.70325,40.4167), 10, 45);
-- POINT (-3.61964617436 40.4802614598)
```

```sql
SELECT transformations.ST_DESTINATION(ST_MakePoint(-3.70325,40.4167), 10, 45, 'miles');
-- POINT (-3.56862505482 40.5189626778)
```

### ST_GREATCIRCLE

{{% bannerNote type="code" %}}
transformations.ST_GREATCIRCLE(start_point, end_point, n_points)
{{%/ bannerNote %}}

**Description**

Calculate great circles routes as LineString.

* `start_point`: `GEOMETRY` source point feature.
* `end_point`: `GEOMETRY` destination point feature.
* `n_points` (optional): `INT` number of points. By default `npoints` is `100`.

**Return type**

`GEOMETRY`

**Examples**

```sql
SELECT transformations.ST_GREATCIRCLE(ST_MAKEPOINT(-3.70325,40.4167), ST_MAKEPOINT(-73.9385,40.6643));
-- LINESTRING (-3.70325 40.4167, -4.32969777937 40.6355528695, ...
```

```sql
SELECT transformations.ST_GREATCIRCLE(ST_MAKEPOINT(-3.70325,40.4167), ST_MAKEPOINT(-73.9385,40.6643), 20);
-- LINESTRING (-3.70325 40.4167, -7.01193184681 41.5188665219, ...
```

### VERSION

{{% bannerNote type="code" %}}
transformations.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the transformations module.

**Return type**

`VARCHAR`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT transformations.VERSION();
-- 1.0.0
```