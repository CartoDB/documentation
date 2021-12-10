## clustering

<div class="badges"><div class="advanced"></div></div>

This module contains functions that perform clustering on geographies.

### ST_CLUSTERKMEANS

{{% bannerNote type="code" %}}
clustering.ST_CLUSTERKMEANS(geog [, numberOfClusters])
{{%/ bannerNote %}}

**Description**

Takes a set of points and partition them into clusters using the k-mean. It uses the k-means algorithm. Returns an array of tuples with the cluster index for each of the input features and the input geometry.

* `geog`: `GEOMETRY` points to be clustered.
* `numberOfClusters` (optional): `INT` numberOfClusters that will be generated. By default `numberOfClusters` is `Math.sqrt(<NUMBER OF POINTS>/2)`.

**Return type**

`SUPER`: containing objects with `cluster`, as the cluster id, and `geom`, as the geometry geojson.

**Examples**

```sql
SELECT clustering.ST_CLUSTERKMEANS(ST_GEOMFROMTEXT('MULTIPOINT ((0 0), (0 1), (5 0), (1 0))'));
-- {"cluster":0,"geom":{"type":"Point","coordinates":[0.0,0.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[0.0,1.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[5.0,0.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[1.0,0.0]}}
```

```sql
SELECT clustering.ST_CLUSTERKMEANS(ST_GEOMFROMTEXT('MULTIPOINT ((0 0), (0 1), (5 0), (1 0))'), 2);
-- {"cluster":0,"geom":{"type":"Point","coordinates":[0.0,0.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[0.0,1.0]}}
-- {"cluster":1,"geom":{"type":"Point","coordinates":[5.0,0.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[1.0,0.0]}}
```


### VERSION

{{% bannerNote type="code" %}}
clustering.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the clustering module.

**Return type**

`VARCHAR`

**Example**

```sql
SELECT clustering.VERSION();
-- 1.0.1
```