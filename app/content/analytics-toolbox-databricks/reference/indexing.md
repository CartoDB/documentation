## indexing

<div class="badges"><div class="experimental"><div class="core"></div></div>

This module contains functions used for indexing


### ST_CRSFROMTEXT

{{% bannerNote type="code" %}}
carto.ST_CRSFROMTEXT(proj4)
{{%/ bannerNote %}}

**Description**

Creates a CoordinateReferenceSystem from a PROJ.4 projection parameter string.

* `proj4`: `String` input projection parameter string.

**Return type**

`Geometry`

**Example**

```sql
SELECT carto.ST_CRSFROMTEXT('+proj=merc +lat_ts=56.5 +ellps=GRS80');
-- +proj=merc +lat_ts=56.5 +ellps=GRS80
```


### ST_EXTENTFROMGEOM

{{% bannerNote type="code" %}}
carto.ST_EXTENTFROMGEOM(geom)
{{%/ bannerNote %}}

**Description**

Creates a Geotrellis [Extent](https://geotrellis.readthedocs.io/en/latest/guide/core-concepts.html#extents) from the given `Geometry`.

* `geom`: `Geometry` input Geometry.

**Return type**

`Extent`

**Example**

```sql
SELECT carto.ST_EXTENTFROMGEOM(carto.ST_MAKEBBOX(0, 0, 1, 1))
-- {"xmin": 0, "ymin": 0, "xmax": 1, "ymax": 1}
```


### ST_EXTENTTOGEOM

{{% bannerNote type="code" %}}
carto.ST_EXTENTTOGEOM(extent)
{{%/ bannerNote %}}

**Description**

Creates a `Geometry` representing the bounding box of the the given Geotrellis [Extent](https://geotrellis.readthedocs.io/en/latest/guide/core-concepts.html#extents).

* `extent`: `Extent` input extent.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_EXTENTFROMGEOM(carto.ST_MAKEBBOX(0, 0, 1, 1)) as extent
)
SELECT carto.ST_ASTEXT(carto.ST_EXTENTTOGEOM(extent)) FROM t;
-- POLYGON ((0 0, 0 1, 1 1, 1 0, 0 0))
```


### GEOMREPROJECT

{{% bannerNote type="code" %}}
carto.ST_GEOMREPROJECT(geom, crsA, crsB)
{{%/ bannerNote %}}

**Description**

Transform a `Geometry` from The Common Reference System _crsA_ to _crsB_.

* `geom`: `Geometry` input geom.
* `crsA`: `CRS` input crsA.
* `crsB`: `CRS` input crsB.

**Return type**

`Geometry`

**Example**

```sql
WITH t AS (
  SELECT carto.ST_POINT(3, 5) AS point,
  carto.ST_CRSFROMTEXT('+proj=merc +lat_ts=56.5 +ellps=GRS80') AS crsa,
  carto.ST_CRSFROMTEXT('+proj=longlat +ellps=GRS80 +datum=NAD83 +no_defs') AS crsb
)
SELECT carto.ST_ASTEXT(carto.ST_GEOMREPROJECT(point, crsa, crsb)) FROM t;
-- POINT (0.00003 0.00005)
```


### ST_MAKEEXTENT

{{% bannerNote type="code" %}}
carto.ST_MAKEEXTENT(lowerX, lowerY, upperX, upperY)
{{%/ bannerNote %}}

**Description**

Creates a [Extent](https://geotrellis.readthedocs.io/en/latest/guide/core-concepts.html#extents) representing a bounding box with the given boundaries.

* `lowerX`: `Double` input lower x value.
* `lowerY`: `Double` input lower y value.
* `upperX`: `Double` input upper x value.
* `upperY`: `Double` input upper y value.

**Return type**

`Extent`

**Example**

```sql
SELECT carto.ST_MAKEEXTENT(0, 0, 1, 1);
-- {"xmin": 0, "ymin": 0, "xmax": 1, "ymax": 1}
```
