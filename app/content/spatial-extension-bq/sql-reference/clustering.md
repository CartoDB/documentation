## clustering

<div class="badges"><div class="advanced"></div></div>

This module contains functions that perform clustering on geographies.

### ST_CLUSTERKMEANS

{{% bannerNote type="code" %}}
clustering.ST_CLUSTERKMEANS(geog, numberOfClusters)
{{%/ bannerNote %}}

**Description**

Takes a set of points and partition them into clusters using the k-mean. It uses the k-means algorithm. Returns an array of tuples with the cluster index for each of the input features and the input geometry.

* `geog`: `ARRAY<GEOGRAPHY>` points to be clustered.
* `numberOfClusters`: `INT64`|`NULL` numberOfClusters that will be generated. If `NULL` the default value `Math.sqrt(<NUMBER OF POINTS>/2)` is used.

**Return type**

`ARRAY<STRUCT<cluster INT64, geom GEOGRAPHY>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT carto-st.clustering.ST_CLUSTERKMEANS([ST_GEOGPOINT(0, 0), ST_GEOGPOINT(0, 1), ST_GEOGPOINT(5, 0), ST_GEOGPOINT(1, 0)], 2);
-- {cluster: 1, geom: POINT(0 0)}
-- {cluster: 1, geom: POINT(0 1)}
-- {cluster: 0, geom: POINT(5 0)}
-- {cluster: 1, geom: POINT(1 0)}
```

### VERSION

{{% bannerNote type="code" %}}
clustering.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the clustering module.

**Return type**

`STRING`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT carto-st.clustering.VERSION();
-- 1.0.1
```