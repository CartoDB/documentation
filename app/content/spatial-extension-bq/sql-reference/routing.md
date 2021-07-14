## routing

<div class="badges"><div class="experimental"></div><div class="advanced"></div></div>

This module contains functions that perform routing and path calculations.

### DISTANCE_MAP

{{% bannerNote type="code" %}}
routing.DISTANCE_MAP(linestring_collection, point)
{{%/ bannerNote %}}

**Description**

Takes a set of Linestrings to form a network and a reference point as input. Returns the length of the shortest path in terms of the distance between the node closest to the reference point and each of the nodes of the network.

* `linestring_collection`: `ARRAY<GEOGRAPHY>` Linestrings that form the network.
* `point`: `GEOGRAPHY` Reference point. The node of the network nearest to this point will be used as the reference point to compute the distance map.

**Return type**

`ARRAY<STRUCT<weight FLOAT64, geography GEOGRAPHY>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-st.routing.DISTANCE_MAP`(ARRAY_AGG(geo), ST_GEOGPOINT(-74.0, 40.0))
FROM (
  SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint(lon, lat))) geo
  FROM unnest(GENERATE_ARRAY(-74.00, -73.90, 0.01)) lon, unnest(GENERATE_ARRAY(40.60, 40.85, 0.03)) lat
  GROUP BY lon
  UNION ALL
  SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint(lon, lat))) geo
  FROM unnest(GENERATE_ARRAY(-74.15, -73.87, 0.03)) lon, unnest(GENERATE_ARRAY(40.68, 40.77, 0.02)) lat
  GROUP BY lat
);
-- [{"weight": "0.0", "geography": "POINT(-74 40.6)"},
--  {"weight": "13343.412141298875", "geography": "POINT(-74 40.72)"},
--  ...]
```

### DISTANCE_MAP_FROM_NETWORK

{{% bannerNote type="code" %}}
routing.DISTANCE_MAP_FROM_NETWORK(network, point)
{{%/ bannerNote %}}

**Description**

Takes a network and a reference point as input. Returns the cost and geometry of the shortest path in terms of weights of links between the node closest to the reference point and each of the nodes of the network.

* `network`: `ARRAY<STRUCT<src_idx INT64, src_geo GEOGRAPHY, dest_idx INT64, dest_geo GEOGRAPHY>>` The network from which to compute the shortest path. You can use the result of the `GENERATE_NETWORK` function.
* `point`: `GEOGRAPHY` Reference point. The node of the network nearest to this point will be used as the reference point to compute the distance map.

**Return type**

`ARRAY<STRUCT<weight FLOAT64, geography GEOGRAPHY>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-st.routing.DISTANCE_MAP_FROM_NETWORK`(network, ST_GEOGPOINT(-74.0, 40.0))
FROM (
  SELECT `carto-st.routing.GENERATE_NETWORK`(ARRAY_AGG(geo)) network
  FROM (
    SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint( lon, lat ))) geo
    FROM unnest(GENERATE_ARRAY(-74.00, -73.90, 0.01)) lon, unnest(GENERATE_ARRAY(40.60, 40.85, 0.01)) lat
    WHERE lon+lat<-73.95+40.75 --remove some nodes of the grid
    GROUP BY lon
    UNION ALL
    SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint( lon, lat ))) geo
    FROM unnest(GENERATE_ARRAY(-74.15, -73.87, 0.01)) lon, unnest(GENERATE_ARRAY(40.68, 40.77, 0.01)) lat
    WHERE lon+lat<-73.95+40.75 --remove some nodes of the grid
    GROUP BY lat
  )
);
-- [{"weight": "0.0", "geography": "POINT(-74 40.6)"},
--  {"weight": "8895.606418682444", "geography": "POINT(-74 40.68)"},
--  ...]
```

### DISTANCE_MAP_FROM_NETWORK_TABLE

{{% bannerNote type="code" %}}
routing.DISTANCE_MAP_FROM_NETWORK_TABLE(src_fullname, target_fullname_quoted, point)
{{%/ bannerNote %}}

**Description**

Procedure that takes a network table and a reference point as input. Returns a table with the cost and geometry of the shortest path in terms of weights of links between the node closest to the reference point and each of the nodes of the network.

* `src_fullname`: `STRING` The source table from where the network will be read. A `STRING` of the form `projectID.dataset.tablename` is expected. The projectID can be omitted (in which case the default one will be used). You can use the result of the `GENERATE_NETWORK_TABLE` procedure.
* `target_fullname_quoted`: The resulting table were the result will be stored. A `STRING` of the form <code>\`projectID.dataset.tablename\`</code> is expected. The projectID can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table in it. The process will fail if the target table already exists.
* `point`: `STRING` The reference geogpoint as an SQL evaluable string. The node of the network nearest to this point will be used as the reference point to compute the distance map.

**Return type**

`ARRAY<STRUCT<weight FLOAT64, geography GEOGRAPHY>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-st.routing.DISTANCE_MAP_FROM_NETWORK_TABLE`(
  'mydataset.network_table',
  'mydataset.distance_map_table',
  'ST_GEOGPOINT(-74.5, 40.5)'
);
```

To generate a network table check out the [`GENERATE_NETWORK_TABLE`](#generate_network_table) procedure.

### FIND_SHORTEST_PATH

{{% bannerNote type="code" %}}
routing.FIND_SHORTEST_PATH(linestring_collection, pointA, pointB)
{{%/ bannerNote %}}

**Description**

Takes a set of Linestrings to form a network, a source point and a destination point as input. Returns the length and the geometry of the shortest path in terms of distance between the node closest to the source point and the node closest to the destination point. The geometry of the shortest path is based on a compacted geometry of the network.

* `linestring_collection`: `ARRAY<GEOGRAPHY>` Linestrings that form the network.
* `pointA`: `GEOGRAPHY` Source point. The node of the network nearest to this point will be used as the source point to compute the shortest path.
* `pointB`: `GEOGRAPHY` Destination point. The node of the network nearest to this point will be used as the destination point to compute the shortest path.

**Return type**

`STRUCT<weight FLOAT64, ARRAY<geography GEOGRAPHY>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-st.routing.FIND_SHORTEST_PATH`(
  ARRAY_AGG(geo), ST_GEOGPOINT(-74.0, 40.0), ST_GEOGPOINT(-73.5, 41.0)
)
FROM (
  SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint(lon, lat))) geo
  FROM unnest(GENERATE_ARRAY(-74.00, -73.90, 0.01)) lon, unnest(GENERATE_ARRAY(40.60, 40.85, 0.03)) lat
  GROUP BY lon
  UNION ALL
  SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint(lon, lat))) geo
  FROM unnest(GENERATE_ARRAY(-74.15, -73.87, 0.03)) lon, unnest(GENERATE_ARRAY(40.68, 40.77, 0.02)) lat
  GROUP BY lat
);
-- {"weight": "34271.61998982268", "path": "LINESTRING(-74 40.6, -74 40.72, -73.97 40.72, -73.94 40.72, -73.91 40.72, -73.91 40.84)"}
```

### FIND_SHORTEST_PATH_FROM_NETWORK

{{% bannerNote type="code" %}}
routing.FIND_SHORTEST_PATH_FROM_NETWORK(network, pointA, pointB)
{{%/ bannerNote %}}

**Description**

Takes a network, a source point and a destination point as input. Returns the length and the geometry of the shortest path in terms of weights of links between the node closest to the source point and the node closest to the destination point.

* `network`: `ARRAY<STRUCT<src_idx INT64, src_geo GEOGRAPHY, dest_idx INT64, dest_geo GEOGRAPHY>>` The network from which to compute the shortest path. You can use the result of the `GENERATE_NETWORK` function.
* `pointA`: `GEOGRAPHY` Source point. The node of the network nearest to this point will be used as the source point to compute the shortest path.
* `pointB`: `GEOGRAPHY` Destination point. The node of the network nearest to this point will be used as the destination point to compute the shortest path.

**Return type**

`ARRAY<STRUCT<weight FLOAT64, geom GEOGRAPHY, path ARRAY<STRUCT<idx INT64, geom GEOGRAPHY>>>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-st.routing.FIND_SHORTEST_PATH_FROM_NETWORK`(
  network, ST_GEOGPOINT(-73.0, 40.0), ST_GEOGPOINT(-75.0, 41.0)
)
FROM (
  SELECT `carto-st.routing.GENERATE_NETWORK`(ARRAY_AGG(geo)) network
  FROM (
    SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint( lon, lat ))) geo
    FROM unnest(GENERATE_ARRAY(-74.00, -73.90, 0.01)) lon, unnest(GENERATE_ARRAY(40.60, 40.85, 0.01)) lat
    WHERE lon+lat<-73.95+40.75 --remove some nodes of the grid
    GROUP BY lon
    UNION ALL
    SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint( lon, lat ))) geo
    FROM unnest(GENERATE_ARRAY(-74.15, -73.87, 0.01)) lon, unnest(GENERATE_ARRAY(40.68, 40.77, 0.01)) lat
    WHERE lon+lat<-73.95+40.75 --remove some nodes of the grid
    GROUP BY lat
  )
);
-- {"weight": "39117.62820259647", "geom": "LINESTRING(-73.91 40.6, -73.91 40.68, -73.91 40.69, -73.92 40.7, ...)",
--  "path": [{"idx": "79", "GEOGRAPHY": "POINT(-73.91 40.6)"}, {"idx": "80", "GEOGRAPHY": "POINT(-73.91 40.68)"}, ...]}
```

### FIND_SHORTEST_PATH_FROM_NETWORK_TABLE

{{% bannerNote type="code" %}}
routing.FIND_SHORTEST_PATH_FROM_NETWORK_TABLE(src_fullname, target_fullname_quoted, pointA, pointB)
{{%/ bannerNote %}}

**Description**

Procedure that takes a network, a source point and a destination point as input. Returns the length and the geometry of the shortest path in terms of weights of links between the node closest to the source point and the node closest to the destination point. It stores the result into a table.

* `src_fullname`: `STRING` The source table from where the network will be read to compute the shortest path. A `STRING` of the form <code>\`projectID.dataset.tablename\`</code> is expected. The projectID can be omitted (in which case the default one will be used). You can use the result of the `GENERATE_NETWORK_TABLE` procedure.
* `target_fullname_quoted`: The resulting table were the result will be stored. A `STRING` of the form <code>\`projectID.dataset.tablename\`</code> is expected. The projectID can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table in it. The process will fail if the target table already exists.
* `pointA`: `STRING` The source geogpoint as an SQL evaluable string. The node of the network nearest to this point will be used as the source point to compute the shortest path.
* `pointB`: `STRING` The destination geogpoint as an SQL evaluable string. The node of the network nearest to this point will be used as the destination point to compute the shortest path.


{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-st.routing.FIND_SHORTEST_PATH_FROM_NETWORK_TABLE`(
  "mydataset.network_table",
  "mydataset.shortest_path_table",
  "ST_GEOGPOINT(-74.0, 40.0)",
  "ST_GEOGPOINT(-75.0, 41.0)"
);
```

To generate a network table check out the [`GENERATE_NETWORK_TABLE`](#generate_network_table) procedure.

### GENERATE_NETWORK

{{% bannerNote type="code" %}}
routing.GENERATE_NETWORK(linestring_collection)
{{%/ bannerNote %}}

**Description**

Generates a network graph from a collection of linestrings. The network is based on a compacted geometry of the linestring collection where all nodes with only two links are dropped.

* `linestring_collection`: `ARRAY<GEOGRAPHY>` Linestrings that form the network.

**Return type**

`ARRAY<STRUCT<src_idx INT64, src_geo GEOGRAPHY, dest_idx INT64, dest_geo GEOGRAPHY>>`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT `carto-st.routing.GENERATE_NETWORK`(ARRAY_AGG(geo))
FROM (
  SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint(lon, lat))) geo
  FROM unnest(GENERATE_ARRAY(-74.00, -73.90, 0.01)) lon, unnest(GENERATE_ARRAY(40.60, 40.85, 0.03)) lat
  GROUP BY lon
  UNION ALL
  SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint(lon, lat))) geo
  FROM unnest(GENERATE_ARRAY(-74.15, -73.87, 0.03)) lon, unnest(GENERATE_ARRAY(40.68, 40.77, 0.02)) lat
  GROUP BY lat
);
-- [{"src_idx": "0", "src_geo": "POINT(-74 40.6)", "dest_idx": "1", "dest_geo": "POINT(-74 40.72)"},
--  {"src_idx": "1", "src_geo": "POINT(-74 40.72)", "dest_idx": "0", "dest_geo": "POINT(-74 40.6)"},
--  ...]
```

### GENERATE_NETWORK_TABLE

{{% bannerNote type="code" %}}
routing.GENERATE_NETWORK_TABLE(src_fullname, target_fullname_quoted)
{{%/ bannerNote %}}

**Description**

Procedure that generates a network graph from a table of linestrings and stores the result into a table. The network is based on a compacted geometry of the linestring collection where all nodes with only two links are dropped.

* `src_fullname`: `STRING` The linestrings table from where the network will be read to compute the shortest path. A `STRING` of the form <code>\`projectID.dataset.tablename\`</code> is expected. The projectID can be omitted (in which case the default one will be used).
* `target_fullname_quoted`: `STRING` The resulting table where the network will be stored. A `STRING` of the form <code>\`projectID.dataset.tablename\`</code> is expected. The projectID can be omitted (in which case the default one will be used). The dataset must exist and the caller needs to have permissions to create a new table in it. The process will fail if the target table already exists.

This procedure implements the same functionality as the `GENERATE_NETWORK` function, with the only difference that it stores the resulting network into a table.

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
CALL `carto-st.routing.GENERATE_NETWORK_TABLE`(
  'mydataset.linestring_collection_table', 'mydataset.network_table'
);
```

Here is a query to create a sample input table:

```sql
CREATE TABLE mydataset.linestring_collection_table AS
  SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint( lon, lat ))) geo
  FROM unnest(GENERATE_ARRAY(-74.00, -73.90, 0.01)) lon, unnest(GENERATE_ARRAY(40.60, 40.85, 0.01)) lat
  WHERE lon+lat<-73.95+40.75 --remove some nodes of the grid
  GROUP BY lon
  UNION ALL
  SELECT ST_MAKELINE(ARRAY_AGG(ST_geogpoint( lon, lat ))) geo
  FROM unnest(GENERATE_ARRAY(-74.15, -73.87, 0.01)) lon, unnest(GENERATE_ARRAY(40.68, 40.77, 0.01)) lat
  WHERE lon+lat<-73.95+40.75 --remove some nodes of the grid
  GROUP BY lat;
```

### VERSION

{{% bannerNote type="code" %}}
routing.VERSION()
{{%/ bannerNote %}}

**Description**

Returns the current version of the routing module.

**Return type**

`STRING`

{{% customSelector %}}
**Example**
{{%/ customSelector %}}

```sql
SELECT carto-st.routing.VERSION();
-- 1.0.0-beta.1
```