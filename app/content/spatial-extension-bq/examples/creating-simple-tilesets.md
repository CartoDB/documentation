## Creating simple tilesets

### COVID-19 vaccination progress in the USA (points)

In this example we are creating a tileset in which every USA inhabitant is represented by means of a point. Each point is tagged with a _vaccinated_ (blue) or _non-vaccinated_ (purple) tag. This visualization enables to depict at a glance which parts of the country are progressing better in the vaccination race.

The query used to produce the tileset is the following:

```sql
CALL bqcarto.tiler.CREATE_TILESET(
    "cartobq.maps.covid19_vaccinated_usa_blockgroups",
    "`cartobq.maps.covid19_vaccination_usa_tileset`",
    null
)
```

{{% bannerNote type="note" title="NOTE"%}}
The `CREATE_TILESET` procedure implements smart memory management techniques that sample the data when needed in order to avoid hitting BigQuery's memory limits.
{{%/ bannerNote %}}


<iframe height=480px width=100% style='margin-bottom:20px' src="https://viewer.carto.com/user/agraciano/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozNy4yMjQ3MTgwMTQ2NjY5MSwibG9uZ2l0dWRlIjotOTIuMDE5MDU2OTE1ODgyNDksInpvb20iOjQsInBpdGNoIjowLCJiZWFyaW5nIjowLCJkcmFnUm90YXRlIjpmYWxzZSwid2lkdGgiOjE5ODQsImhlaWdodCI6MTE5MCwiYWx0aXR1ZGUiOjEuNSwibWF4Wm9vbSI6MjAsIm1pblpvb20iOjAsIm1heFBpdGNoIjo2MCwibWluUGl0Y2giOjAsInRyYW5zaXRpb25EdXJhdGlvbiI6MSwidHJhbnNpdGlvbkludGVycnVwdGlvbiI6MX0sInZpZXdzIjpbeyJAQHR5cGUiOiJNYXBWaWV3IiwiY29udHJvbGxlciI6dHJ1ZSwibWFwU3R5bGUiOiJAQCNDQVJUT19CQVNFTUFQLkRBUktfTUFUVEVSIn1dLCJsYXllcnMiOlt7IkBAdHlwZSI6IkNhcnRvQlFUaWxlckxheWVyIiwiZGF0YSI6ImNhcnRvYnEubWFwcy5zbWFydF90aWxlc2V0X3ZhY2NpbmF0aW9uIiwiY3JlZGVudGlhbHMiOnsidXNlcm5hbWUiOiJhZ3JhY2lhbm8iLCJhcGlLZXkiOiJkZWZhdWx0X3B1YmxpYyJ9LCJnZXRGaWxsQ29sb3IiOnsiQEBmdW5jdGlvbiI6ImNvbG9yQ2F0ZWdvcmllcyIsImF0dHIiOiJ2YWNjaW5hdGVkIiwiZG9tYWluIjpbInRydWUiLCJmYWxzZSIsInVua25vd24iXSwiY29sb3JzIjpbWzEsMjU1LDI1NSw4MF0sWzE5NiwwLDE4NSw4MF0sWzIyNSwyMjUsMjI1LDgwXV19LCJwb2ludFJhZGl1c01pblBpeGVscyI6MSwic3Ryb2tlZCI6ZmFsc2UsImxpbmVXaWR0aE1pblBpeGVscyI6MSwiZ2V0TGluZUNvbG9yIjpbMjU1LDAsMjU1XSwicGlja2FibGUiOnRydWUsImJpbmFyeSI6dHJ1ZSwib25EYXRhRXJyb3IiOnsiQEBmdW5jdGlvbiI6Im9uRGF0YUVycm9yIn19XX0%3D&embed=true" title="COVID-19 vaccination process."></iframe> 

Check out this [blogpost](https://carto.com/blog/how-we-developed-covid-vaccine-cloud-native-spatial-app/) to learn how we created this dataset and this visualization using the Spatial Extension and a custom application using [CARTO for React](/react).


### United States roads by type (lines)

In this example we use a BigQuery public dataset from the United States Census Bureau to visualize all USA's national roads. The visualization is styled by the [RTTYP route type code](https://gis.stackexchange.com/questions/20545/what-does-the-code-rttyp-represent-in-the-usa-tiger-road-files).

This dataset can be produced in a very straighfroward way by executing the next procedure:

```sql
CALL bqcarto.tiler.CREATE_TILESET(
    R'''
    (   SELECT road_geom AS geom, route_type
        FROM `bigquery-public-data.geo_us_roads.us_national_roads`
        WHERE route_type IS NOT NULL
    )
    ''',
    "`cartobq.maps.usa_roads_tileset`",
    null
);
```

<iframe height=480px width=100% style='margin-bottom:20px' src="https://viewer.carto.com/user/agraciano/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozNy42NTM5Mzk4NjczNTg1NywibG9uZ2l0dWRlIjotOTEuOTAzOTM1NTYxMTc5NjUsInpvb20iOjQsInBpdGNoIjowLCJiZWFyaW5nIjowLCJkcmFnUm90YXRlIjpmYWxzZSwid2lkdGgiOjE5ODQsImhlaWdodCI6MTE5MCwiYWx0aXR1ZGUiOjEuNSwibWF4Wm9vbSI6MjAsIm1pblpvb20iOjAsIm1heFBpdGNoIjo2MCwibWluUGl0Y2giOjAsInRyYW5zaXRpb25EdXJhdGlvbiI6MSwidHJhbnNpdGlvbkludGVycnVwdGlvbiI6MX0sInZpZXdzIjpbeyJAQHR5cGUiOiJNYXBWaWV3IiwiY29udHJvbGxlciI6dHJ1ZSwibWFwU3R5bGUiOiJAQCNDQVJUT19CQVNFTUFQLkRBUktfTUFUVEVSIn1dLCJsYXllcnMiOlt7IkBAdHlwZSI6IkNhcnRvQlFUaWxlckxheWVyIiwiZGF0YSI6ImNhcnRvYnEubWFwcy51c2Ffcm9hZHNfdGlsZXNldCIsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoiZXJuZXN0b21iIiwiYXBpS2V5IjoiZGVmYXVsdF9wdWJsaWMifSwiZ2V0TGluZUNvbG9yIjp7IkBAZnVuY3Rpb24iOiJjb2xvckNhdGVnb3JpZXMiLCJhdHRyIjoicm91dGVfdHlwZSIsImRvbWFpbiI6WyJNIiwiVSIsIlMiLCJJIiwiQyIsIk8iXSwiY29sb3JzIjoiQm9sZCJ9LCJwb2ludFJhZGl1c01pblBpeGVscyI6Miwic3Ryb2tlZCI6ZmFsc2UsImxpbmVXaWR0aE1pblBpeGVscyI6MSwicGlja2FibGUiOnRydWUsImJpbmFyeSI6dHJ1ZSwib25EYXRhRXJyb3IiOnsiQEBmdW5jdGlvbiI6Im9uRGF0YUVycm9yIn19XX0%3D&embed=true" title="USA national roads."></iframe> 


### NYC urban growth (polygons)

This example shows in a very effective way the historical growth of New York City by means of the year of construction of its more than 800K buildings. The dataset has been obtained from the [MapPLUTO repository](https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page) of the NYC Department of City planning.

```sql
CALL bqcarto.tiler.CREATE_TILESET(
    R'''
    (   SELECT geometry AS geom, YearBuilt 
        FROM cartobq.maps.pluto_nyc 
        WHERE YearBuilt > 0
    )
    ''',
    "`cartobq.maps.nyc_footprints_tileset`",
    null
);
```

The [visualization](https://team.carto.com/viewer/user/agraciano/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjo0MC42OTE5MjEwNDgyOTcwNzUsImxvbmdpdHVkZSI6LTczLjkyMDUxOTgxOTI1MjcyLCJ6b29tIjoxMiwicGl0Y2giOjAsImJlYXJpbmciOjAsImRyYWdSb3RhdGUiOmZhbHNlLCJ3aWR0aCI6MTk4NCwiaGVpZ2h0IjoxMTkwLCJhbHRpdHVkZSI6MS41LCJtYXhab29tIjoyMCwibWluWm9vbSI6MCwibWF4UGl0Y2giOjYwLCJtaW5QaXRjaCI6MCwidHJhbnNpdGlvbkR1cmF0aW9uIjoxLCJ0cmFuc2l0aW9uSW50ZXJydXB0aW9uIjoxfSwidmlld3MiOlt7IkBAdHlwZSI6Ik1hcFZpZXciLCJjb250cm9sbGVyIjp0cnVlLCJtYXBTdHlsZSI6IkBAI0NBUlRPX0JBU0VNQVAuREFSS19NQVRURVIifV0sImxheWVycyI6W3siQEB0eXBlIjoiQ2FydG9CUVRpbGVyTGF5ZXIiLCJkYXRhIjoiY2FydG9kYi1nY3AtYmFja2VuZC1kYXRhLXRlYW0uYWdyYWNpYW5vX3Rlc3RzLnBsdXRvX255Y190aWxlc2V0IiwiY3JlZGVudGlhbHMiOnsidXNlcm5hbWUiOiJhZ3JhY2lhbm8iLCJhcGlLZXkiOiJkZWZhdWx0X3B1YmxpYyJ9LCJnZXRGaWxsQ29sb3IiOnsiQEBmdW5jdGlvbiI6ImNvbG9yQ29udGludW91cyIsImF0dHIiOiJZZWFyQnVpbHQiLCJkb21haW4iOlsxODAwLDE5MDAsMTkxMCwxOTIwLDE5MzAsMTk0MCwxOTUwLDE5NjAsMTk3MCwxOTgwLDE5OTAsMjAwMCwyMDA1LDIwMTAsMjAxNSwyMDIwXSwiY29sb3JzIjoiVGVhbCJ9LCJwb2ludFJhZGl1c01pblBpeGVscyI6Miwic3Ryb2tlZCI6ZmFsc2UsImxpbmVXaWR0aE1pblBpeGVscyI6MSwiZ2V0TGluZUNvbG9yIjpbMjU1LDAsMjU1XSwicGlja2FibGUiOnRydWUsImJpbmFyeSI6dHJ1ZSwib25EYXRhRXJyb3IiOnsiQEBmdW5jdGlvbiI6Im9uRGF0YUVycm9yIn19XX0%3D&embed=true) represents older buildings with lighter footprints and more recent ones with darker footprints.

![NYC footprints](/img/bq-spatial-extension/tiler/examples-nyc-footprints.png)

Checkout [this blogpost](https://carto.com/blog/how-to-visualize-urban-growth-spatial-extension-bigquery/) to learn more about this visualization.


### World's road network (lines)

We are going to use a [dataset from CARTO's public Data Observatory](https://carto.com/spatial-data-catalog/browser/geography/ne_roads_9ff89987) to visualize the world's road network.

{{% bannerNote type="warning" title="warning" %}}
This example uses the `CREATE_SIMPLE_TILESET` procedure. We strongly recommend to use `CREATE_TILESET` instead. Learn more [here](../../overview/tilesets/#tileset-types-and-procedures) about the difference between the two procedures.
{{%/ bannerNote %}}

```sql
CALL bqcarto.tiler.CREATE_SIMPLE_TILESET(
  R'''
(
  SELECT geom, type
  FROM `carto-do-public-data.natural_earth.geography_glo_roads_410`
) _input
  ''',
  R'''`cartobq.maps.natural_earth_roads`''',
  R'''
  {
      "zoom_min": 0,
      "zoom_max": 10,
      "max_tile_size_kb": 3072,
      "properties":{
          "type": "String"
       }
  }'''
);
```

The result is a worldwide map with the requested tiles, including the type of each road.

![Natural Earth Roads](/img/bq-spatial-extension/tiler/examples-naturalearthroads.png)

### US block groups (polygons)

We are going to use a [dataset from CARTO's public Data Observatory](https://carto.com/spatial-data-catalog/browser/dataset/acs_sociodemogr_95c726f9) to visualize the block groups of the US including its population.

{{% bannerNote type="warning" title="warning" %}}
This example uses the `CREATE_SIMPLE_TILESET` procedure. We strongly recommend to use `CREATE_TILESET` instead. Learn more [here](../../overview/tilesets/#tileset-types-and-procedures) about the difference between the two procedures.
{{%/ bannerNote %}}

```sql
CALL bqcarto.tiler.CREATE_SIMPLE_TILESET(
  R'''
(
  SELECT
    d.geoid,
    d.total_pop,
    g.geom 
  FROM `carto-do-public-data.usa_acs.demographics_sociodemographics_usa_blockgroup_2015_5yrs_20142018` d
  JOIN `carto-do-public-data.carto.geography_usa_blockgroup_2015` g
    ON d.geoid = g.geoid
) _input
  ''',
  R'''`cartobq.maps.blockgroup_pop`''',
  R'''
  {
      "zoom_min": 0,
      "zoom_max": 14,
      "max_tile_size_kb": 3072,
      "properties":{
          "geoid": "String",
          "total_pop": "Number"
       }
  }'''
);
```

Check the result:

![US Blockgroup population](/img/bq-spatial-extension/tiler/examples-blockgroup_pop.png)



### Zoom-dependant tileset for USA administrative units

You can create a tileset that uses different data sources depending on the zoom level. In this example, we are making use of the Data Observatory's public datasets offering to create a visualization of the different administrative units in the US: the higher the zoom level, the higher is the granularity of the administrative unit being shown.

{{% bannerNote type="warning" title="warning" %}}
This example uses the `CREATE_SIMPLE_TILESET` procedure. We strongly recommend to use `CREATE_TILESET` instead. Learn more [here](../../overview/tilesets/#tileset-types-and-procedures) about the difference between the two procedures.
{{%/ bannerNote %}}

```sql
CALL bqcarto.tiler.CREATE_SIMPLE_TILESET(
R'''(
    SELECT
    14 as zoom_min,
    15 as zoom_max,
    geoid,
    geom
    FROM `carto-do-public-data.carto.geography_usa_block_2019`
    UNION ALL
    SELECT
    13 as zoom_min,
    13 as zoom_max,
    geoid,
    geom
    FROM `carto-do-public-data.carto.geography_usa_blockgroup_2019`
    UNION ALL
    SELECT
    12 as zoom_min,
    12 as zoom_max,
    geoid,
    geom
    FROM `carto-do-public-data.carto.geography_usa_censustract_2019`
    UNION ALL
    SELECT
    10 as zoom_min,
    11 as zoom_max,
    geoid,
    geom
    FROM `carto-do-public-data.carto.geography_usa_zcta5_2019`
    UNION ALL
    SELECT
    6 as zoom_min,
    9 as zoom_max,
    geoid,
    geom
    FROM `carto-do-public-data.carto.geography_usa_county_2019`
    UNION ALL
    SELECT
    0 as zoom_min,
    5 as zoom_max,
    geoid,
    geom
    FROM `carto-do-public-data.carto.geography_usa_state_2019`
) _a''',
R'''`bqcartodemos.tilesets.usa_acs_multisource_example`''',
'''
    {
        "zoom_min": 0,
        "zoom_max": 15,
        "zoom_min_column": "zoom_min",
        "zoom_max_column": "zoom_max",
        "max_tile_size_kb": 2048,
        "skip_validation" : true,
        "properties":
        {
            "geoid": "String"
        }
    }
''');
```

<iframe height=480px width=100% src="https://viewer.carto.com/user/mtejera/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozNi42MjcxMzU5NTkxNDAwMSwibG9uZ2l0dWRlIjotOTQuNTgwMDQ0MzA5NTk1OCwiem9vbSI6Mi43MDE2NjYwNjMyNTE3MDg3LCJwaXRjaCI6MCwiYmVhcmluZyI6MCwiZHJhZ1JvdGF0ZSI6ZmFsc2UsIndpZHRoIjo4NjMsImhlaWdodCI6NzgyLCJhbHRpdHVkZSI6MS41LCJtYXhab29tIjoyMCwibWluWm9vbSI6MCwibWF4UGl0Y2giOjYwLCJtaW5QaXRjaCI6MCwidHJhbnNpdGlvbkR1cmF0aW9uIjowLCJ0cmFuc2l0aW9uSW50ZXJydXB0aW9uIjoxfSwidmlld3MiOlt7IkBAdHlwZSI6Ik1hcFZpZXciLCJjb250cm9sbGVyIjp0cnVlfV0sImxheWVycyI6W3siQEB0eXBlIjoiQ2FydG9CUVRpbGVyTGF5ZXIiLCJkYXRhIjoiYnFjYXJ0b2RlbW9zLnRpbGVzZXRzLnVzYV9hY3NfbXVsdGlzb3VyY2VfZXhhbXBsZSIsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoibXRlamVyYSIsImFwaUtleSI6ImRlZmF1bHRfcHVibGljIn0sImdldEZpbGxDb2xvciI6WzIyNiwyMDMsODAsMjU1XSwicG9pbnRSYWRpdXNNaW5QaXhlbHMiOjIsInN0cm9rZWQiOnRydWUsImxpbmVXaWR0aE1pblBpeGVscyI6MSwiZ2V0TGluZUNvbG9yIjpbMjAsMjAsMjBdLCJwaWNrYWJsZSI6dHJ1ZSwiYmluYXJ5Ijp0cnVlfV19&embed=true" title="CARTO BigQuery Tiler map"></iframe>
