## Routing

### Creating a network

#### Importing linestrings from openstreetmap

To make some routing, we need some network. Let's extract linestings from New York Liberty Island from openstreetmap planet ways to build us a playground.
Carefull this query scan a lot of data. You may skip this query by creating directly `mydataset.liberty_island_linestrings` table from this [Newline-delimited JSON](/img/bq-spatial-extension/routing/liberty_island_linestrings_data.json) using this [schema](/img/bq-spatial-extension/routing/liberty_island_linestrings_schema.json).


```sql
CREATE TABLE mydataset.liberty_island_linestrings AS
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
    ST_GEOGFROMGEOJSON("""{"type": "Polygon","coordinates": [[[-74.049031, 40.687619], [-74.041713, 40.687619], [-74.041713, 40.692158], [-74.049031, 40.692158], [-74.049031, 40.687619] ]]}""") )
``` 

#### Creating the network from linestrings

Now let's create a compacted network where all two legs intermediate nodes have been contracted.

We have created a procedure for that:

```sql
CALL `bqcarto.routing.GENERATE_NETWORK_TABLE`('mydataset.liberty_island_linestrings', 'mydataset.liberty_island_network');
```

Or you can go the hard way using a function.

```sql
    CREATE OR REPLACE TABLE `mydataset.liberty_island_network`
      AS
        WITH T as(
            SELECT
              `bqcarto.routing.GENERATE_NETWORK`(ARRAY_AGG(geometry)) generate_network
            FROM
              `mydataset.my_test_linestrings`
                  )
      SELECT myunnest.*
      FROM T,
      unnest(generate_network) myunnest
```

#### Visualising the network

Let's see the difference beetween the collection of linestrings (in red) and the compacted graph (in blue). Compaction reduce drasticacly the numer of nodes and thus links but preserve the length of paths beetween remaining nodes.
![network visualization](/img/bq-spatial-extension/routing/network.png)
```sql
SELECT
    geometry, 0 compacted FROM `mydataset.liberty_island_linestrings`
UNION ALL
SELECT
    ST_MAKELINE(src_geo, dest_geo) line, 1 compacted FROM `mydataset.liberty_island_network`
);
```


### Calculating Shortest path

Let's calculate a shortest path between two points. 

#### Using a procedure

Again we have created a procedure for that:

```sql
CALL
  `bqcarto.routing.FIND_SHORTEST_PATH_FROM_NETWORK_TABLE`(
      "mydataset.liberty_island_network","mydataset.my_shortest_path",
      "ST_geogpoint(-74.04665, 40.68983)",
      "ST_geogpoint(-74.0438, 40.68874)"
      )
```

#### Using a function

And again, you can choose to go the hard way using a function.

```sql
        WITH T as(
            SELECT
              `bqcarto.routing.FIND_SHORTEST_PATH_FROM_NETWORK`(ARRAY_AGG(flatten_links),
                ST_geogpoint(-74.04665, 40.68983),
                ST_geogpoint(-74.0438, 40.68874)) myroutes
            FROM
              `mydataset.liberty_island_network` flatten_links
              )
      SELECT myroutes.*
      from T
```

#### Visualising the shortest path
![shortest path visualization](/img/bq-spatial-extension/routing/shortest_path.png)


### Calculating Distance map

Let's calculate a shortest path between two points. 

#### Using a procedure

Again we have created a procedure for that:

```sql
CALL
  `bqcarto.routing.DISTANCE_MAP_FROM_NETWORK_TABLE`(
      "mydataset.liberty_island_network",
      "mydataset.my_distance_map",
      "ST_geogpoint(-74.0438, 40.68874)"
      )
```

#### Using a function

And again, you can choose to go the hard way using a function.

```sql
        WITH T as(
            SELECT
              `bqcarto.routing.DISTANCE_MAP_FROM_NETWORK`(ARRAY_AGG(flatten_links),
                ST_geogpoint(-74.0438, 40.68874)) distance_map
            FROM
              `mydataset.liberty_island_network` flatten_links
              )
      SELECT myunnest.*
      from T,
      unnest(distance_map) myunnest
```

#### Visualising the distance map
![distance map visualization](/img/bq-spatial-extension/routing/distance_map.png)


