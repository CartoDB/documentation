## clustering

<div class="badge core"></div>

### ST_CLUSTERKMEANS

{{% bannerNote type="code" %}}
clustering.ST_CLUSTERKMEANS(geog, numberOfClusters)
{{%/ bannerNote %}}

**Description**

Takes a set of points and partition them into clusters using the k-mean. It uses the k-means algorithm. Returns an array with the cluster index for each of the input features. https://turfjs.org/docs/#clustersKmeans

* `geog`: `ARRAY<GEOGRAPHY>` points to be clustered.
* `numberOfClusters`: `INT64`|`NULL` numberOfClusters that will be generated. If `NULL` the default value `Math.sqrt(<NUMBER OF POINTS>/2)` is used.

**Return type**

`ARRAY<INT64>`

**Example**

```sql
SELECT bqcarto.clustering.ST_CLUSTERKMEANS([ST_GEOGPOINT(0, 0), ST_GEOGPOINT(0, 1), ST_GEOGPOINT(5, 0), ST_GEOGPOINT(1, 0)], 2);
-- [1, 1, 0, 1]
```

### VERSION

{{% bannerNote type="code" %}}
clustering.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the clustering module.

**Return type**

`STRING`

**Example**

```sql
SELECT bqcarto.clustering.VERSION();
-- 1.0.0
```
