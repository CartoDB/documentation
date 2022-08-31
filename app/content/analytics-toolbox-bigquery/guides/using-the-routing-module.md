---
aliases:
    - /analytics-toolbox-bq/guides/using-the-routing-module/
---
## Using the routing module

### Creating a network

#### Importing linestrings from OpenStreetMap

To create a route, we need a network. Let's build ourselves a playground from New York's Liberty Island from OpenStreetMap planet ways table available in the public BigQuery dataset.
During this process nodes and links are created, and the speed between each path is evaluated from OpenStreetMap tags.
We are going to use the [`GENERATE_NETWORK`](../../sql-reference/routing/#generate_network) procedure:

In the fowlowing example, to reduce the amount of scanned data in this guide, we have replace the table `bigquery-public-data.geo_openstreetmap.planet_ways` with the table `cartobq.docs.liberty_island_ways` which is a subset of it around NY Liberty Island.

```sql
DECLARE area_of_interest GEOGRAPHY;
--NY Liberty Island area of interest:
SET area_of_interest = ST_GEOGFROMTEXT("POLYGON((-74.05 40.685, -74.04 40.685, -74.04 40.695, -74.05 40.695, -74.05 40.685))");
  

CALL `cartodb-gcp-backend-data-team.fbaptiste_carto.GENERATE_NETWORK_TABLE`(
"SELECT * FROM `cartobq.docs.liberty_island_ways`",
area_of_interest,
"foot",
'mydataset.liberty_island_network');
```

#### Visualizing the network

Let's see the difference between the compacted links (in red) and the full geometry (in blue). Compaction reduces drastically the number of nodes and thus links, but it preserves the length of paths between the remaining nodes.

```sql
SELECT linestring, ST_MAKELINE(start_geo,dest_geo) compacted
FROM `mydataset.liberty_island_network`
```

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/routing/network.png" alt="Network visualization." style="width:70%">
</div>



### Calculating the shortest path

Let's calculate the shortest path between two points using the [`MATRIX_ROUTING`](../../sql-reference/routing/#matrix_routing) procedure and stare it in 'mydataset.routing_result'.

```sql
CALL
  `carto-un`.carto.fbaptiste_carto.MATRIX_ROUTING`(
    "SELECT * FROM `mydataset.liberty_island_network`",
    [ST_geogpoint(-74.04665, 40.68983)],
    [ST_geogpoint(-74.0438, 40.68874)],
    NULL,
    'mydataset.routing_result'
);
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
  `carto-un`.carto.fbaptiste_carto.MATRIX_ROUTING`(
    "SELECT * FROM `mydataset.liberty_island_network`",
    [ST_geogpoint(-74.0438, 40.68874)],
    NULL,
    NULL,
    'mydataset.distance_map'
);
```


Here is the result. The starting point is highlighted in green. Destination points are colored according to the total length of the shortest path from the origin (darker means further).

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/routing/distance_map.png" alt="Distance map visualization." style="width:70%">
</div>

In this GIF we can see all the destination points of the network that are reachable from the origin point, starting with the closest. The compacted network is depicted in gray.

<div style="text-align:center" >
<img src="/img/bq-analytics-toolbox/routing/distance_map_gif.gif" alt="Distance map visualization gif." style="width:70%">
</div>

{{% euFlagFunding %}}
