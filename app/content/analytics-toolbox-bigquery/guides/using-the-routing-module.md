---
aliases:
    - /analytics-toolbox-bq/guides/using-the-routing-module/
---
## Using the routing module

### Creating a network

#### Importing linestrings from OpenStreetMap

To create a route, we need a network. Let's extract linestrings from New York's Liberty Island from OpenStreetMap planet ways table in BigQuery to build ourselves a playground.

Be careful, this query scans a lot of data (223GB). You may skip this query by creating directly the `mydataset.liberty_island_linestrings` table from this [Newline-delimited JSON](/img/bq-analytics-toolbox/routing/liberty_island_linestrings_data.json) using this [schema](/img/bq-analytics-toolbox/routing/liberty_island_linestrings_schema.json).


```sql
CREATE TABLE
  mydataset.liberty_island_linestrings AS
SELECT
  geometry,
  all_tags
FROM
  `bigquery-public-data.geo_openstreetmap.planet_ways`,
  UNNEST(all_tags) tag
WHERE
  --Keep only highway, discard buildings, borders ...
  key = 'highway'
  AND ST_INTERSECTS(geometry,
    --NY Liberty Island Bounding Box:
    ST_GEOGFROMGEOJSON("""{"type": "Polygon", 
    "coordinates": [[[-74.049031, 40.687619], [-74.041713, 40.687619], [-74.041713, 40.692158], 
    [-74.049031, 40.692158], [-74.049031, 40.687619] ]]}""") ) 
```

#### Creating the network from linestrings

Now let's create a compacted network. During this process all nodes with only two links are removed, but total distances between nodes are kept. 

We are going to use the [`GENERATE_NETWORK_TABLE`](../../sql-reference/routing/#generate_network_table) procedure:

```sql
CALL `carto-un`.carto.GENERATE_NETWORK_TABLE`('mydataset.liberty_island_linestrings', 
'mydataset.liberty_island_network');
```

If you prefer, you can also use the [`GENERATE_NETWORK`](../../sql-reference/routing/#generate_network) function instead, although it requires a slightly more advanced query:

```sql
CREATE OR REPLACE TABLE
  `mydataset.liberty_island_network` AS
WITH
  T AS(
  SELECT
    `carto-un`.carto.GENERATE_NETWORK`(ARRAY_AGG(STRUCT(geometry, 1.))) generate_network
  FROM
    `mydataset.my_test_linestrings` )
SELECT
  myunnest.*
FROM
  T,
  UNNEST(generate_network) myunnest
```

#### Visualizing the network

Let's see the difference between the collection of linestrings (in red) and the compacted network (in blue). Compaction reduces drastically the number of nodes and thus links, but it preserves the length of paths between the remaining nodes.

```sql
SELECT
    geometry, 0 compacted FROM `mydataset.liberty_island_linestrings`
UNION ALL
SELECT
    ST_MAKELINE(src_geo, dest_geo) line, 1 compacted FROM `mydataset.liberty_island_network`
```

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/routing/network.png" alt="Network visualization." style="width:70%">
</div>



### Calculating the shortest path

Let's calculate the shortest path between two points. 

You can use the [`FIND_SHORTEST_PATH_FROM_NETWORK_TABLE`](../../sql-reference/routing/#find_shortest_path_from_network_table) procedure:

```sql
CALL
  `carto-un`.carto.FIND_SHORTEST_PATH_FROM_NETWORK_TABLE`( "mydataset.liberty_island_network",
    "mydataset.my_shortest_path",
    "ST_geogpoint(-74.04665, 40.68983)",
    "ST_geogpoint(-74.0438, 40.68874)" )
```


Our you can use the [`FIND_SHORTEST_PATH_FROM_NETWORK`](../../sql-reference/routing/#find_shortest_path_from_network) function, which is a bit trickier than using the procedure:

```sql
WITH
  T AS(
  SELECT
    `carto-un`.carto.FIND_SHORTEST_PATH_FROM_NETWORK`(ARRAY_AGG(flatten_links),
      ST_geogpoint(-74.04665,
        40.68983),
      ST_geogpoint(-74.0438,
        40.68874)) myroutes
  FROM
    `mydataset.liberty_island_network` flatten_links )
SELECT
  myroutes.*
FROM
  T
```

Here is the result:

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/routing/shortest_path.png" alt="Shortest path visualization." style="width:70%">
</div>



### Calculating a distance map

Given a starting point, we are going to calculate the distances from that point to all the nodes of the network. Then, we are going to visualize the result to identify the destination points that are within a similar distance. 


You can use the [`DISTANCE_MAP_FROM_NETWORK_TABLE`](../../sql-reference/routing/#distance_map_from_network_table) procedure:

```sql
CALL
  `carto-un`.carto.DISTANCE_MAP_FROM_NETWORK_TABLE`( "mydataset.liberty_island_network",
    "mydataset.my_distance_map",
    "ST_geogpoint(-74.0438, 40.68874)" )
```

Or you can use the [`DISTANCE_MAP_FROM_NETWORK`](../../sql-reference/routing/#distance_map_from_network) function, which is a bit trickier than using the procedure:

```sql
WITH
  T AS(
  SELECT
    `carto-un`.carto.DISTANCE_MAP_FROM_NETWORK`(ARRAY_AGG(flatten_links),
      ST_geogpoint(-74.0438,
        40.68874)) distance_map
  FROM
    `mydataset.liberty_island_network` flatten_links )
SELECT
  myunnest.*
FROM
  T,
  UNNEST(distance_map) myunnest
```


Here is the result. The starting point is highlighted in green. Destination points are colored according to the total length of the shortest path from the origin (darker means further).

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/routing/distance_map.png" alt="Distance map visualization." style="width:70%">
</div>

In this GIF we can see all the destination points of the network that are reachable from the origin point, starting with the closest. The compacted network is depicted in gray.

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/routing/distance_map_gif.gif" alt="Distance map visualization gif." style="width:70%">
</div>
