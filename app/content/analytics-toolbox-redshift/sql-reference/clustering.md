## clustering

<div class="badges"><div class="advanced"></div></div>

This module contains functions that perform clustering on geographies.


### CREATE_CLUSTERKMEANS

{{% bannerNote type="code" %}}
carto.CREATE_CLUSTERKMEANS(input, output_table, geom_column, number_of_clusters)
{{%/ bannerNote %}}

**Description**

Takes a set of points as input and partitions them into clusters using the k-means algorithm. Creates a new table with the same columns as `input` plus a `cluster_id` with the cluster index for each of the input features.

* `input`: `VARCHAR` name of the table or literal SQL query to be clustered.
* `output_table`: `VARCHAR` name of the output table.
* `geom_column`: `VARCHAR` name of the column to be clusterd.
* `number_of_clusters`: `INT` number of clusters that will be generated.

{{% bannerNote type="warning" title="warning"%}}
Keep in mid that due to some restrictions in the Redshift `VARCHAR` size, the maximum number of features (points) allow to be clusterized is around 2500.
{{%/ bannerNote %}}

**Examples**

```sql
CALL carto.CREATE_CLUSTERKMEANS('my-schema.my-input-table', 'my-schema.my-output-table', 'geom', 5);
-- The table `my-schema.my-output-table` will be created
-- adding the column cluster_id to those in `my-schema.my-input-table`.
```

```sql
CALL carto.CREATE_CLUSTERKMEANS('select * my-schema.my-input-table', 'my-schema.my-output-table', 'geom', 5);
-- The table `my-schema.my-output-table` will be created
-- adding the column cluster_id to those returned in the input query.
```


### ST_CLUSTERKMEANS

{{% bannerNote type="code" %}}
carto.ST_CLUSTERKMEANS(geog [, numberOfClusters])
{{%/ bannerNote %}}

**Description**

Takes a set of points as input and partitions them into clusters using the k-means algorithm. Returns an array of tuples with the cluster index for each of the input features and the input geometry.

* `geog`: `GEOMETRY` points to be clustered.
* `numberOfClusters` (optional): `INT` number of clusters that will be generated. It defaults to `Math.sqrt(<NUMBER OF POINTS>/2)`.

**Return type**

`SUPER`: containing objects with `cluster` as the cluster id and `geom` as the geometry in GeoJSON format.

**Examples**

```sql
SELECT carto.ST_CLUSTERKMEANS(ST_GEOMFROMTEXT('MULTIPOINT ((0 0), (0 1), (5 0), (1 0))'));
-- {"cluster":0,"geom":{"type":"Point","coordinates":[0.0,0.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[0.0,1.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[5.0,0.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[1.0,0.0]}}
```

```sql
SELECT carto.ST_CLUSTERKMEANS(ST_GEOMFROMTEXT('MULTIPOINT ((0 0), (0 1), (5 0), (1 0))'), 2);
-- {"cluster":0,"geom":{"type":"Point","coordinates":[0.0,0.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[0.0,1.0]}}
-- {"cluster":1,"geom":{"type":"Point","coordinates":[5.0,0.0]}}
-- {"cluster":0,"geom":{"type":"Point","coordinates":[1.0,0.0]}}
```
