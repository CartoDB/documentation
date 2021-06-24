## Creating simple tilesets without specifying parameters

A tileset can also be generated without the requirement of setting any parameter. We can delegate their choice by using the automatic procedure `tiler.CREATE_TILESET` as shown with the examples below. 

### Visualize the COVID-19 vaccination progress in the USA

In this example, a tileset in which every USA inhabitant is represented by means of a point is built. Each point is tagged with a vaccinated (blue) or non-vaccinated (purple) tag. This visualization allows to depict at a glance which parts of the country are doing better with their resident vaccination.

The query used to produce the tileset is the following:

```sql
CALL cartobq.tiler.CREATE_TILESET(
    "cartobq.maps.covid19_vaccinated_usa_blockgroups",
    "`cartobq.maps.covid19_vaccination_usa_tileset`",
    null
)
```

In case we had tried to produce this tileset using `cartobq.tiler.CREATE_SIMPLE_TILESET`, we would have obtained a limitation of resources error of BigQuery, since the whole dataset (+300M points) is larger than what BigQuery can handle for the tiler. To avoid this, we would have had to sample the data for different zoom levels, difficulting greatly the user experience.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://viewer.carto.com/user/agraciano/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozNy4yMjQ3MTgwMTQ2NjY5MSwibG9uZ2l0dWRlIjotOTIuMDE5MDU2OTE1ODgyNDksInpvb20iOjQsInBpdGNoIjowLCJiZWFyaW5nIjowLCJkcmFnUm90YXRlIjpmYWxzZSwid2lkdGgiOjE5ODQsImhlaWdodCI6MTE5MCwiYWx0aXR1ZGUiOjEuNSwibWF4Wm9vbSI6MjAsIm1pblpvb20iOjAsIm1heFBpdGNoIjo2MCwibWluUGl0Y2giOjAsInRyYW5zaXRpb25EdXJhdGlvbiI6MSwidHJhbnNpdGlvbkludGVycnVwdGlvbiI6MX0sInZpZXdzIjpbeyJAQHR5cGUiOiJNYXBWaWV3IiwiY29udHJvbGxlciI6dHJ1ZSwibWFwU3R5bGUiOiJAQCNDQVJUT19CQVNFTUFQLkRBUktfTUFUVEVSIn1dLCJsYXllcnMiOlt7IkBAdHlwZSI6IkNhcnRvQlFUaWxlckxheWVyIiwiZGF0YSI6ImNhcnRvYnEubWFwcy5zbWFydF90aWxlc2V0X3ZhY2NpbmF0aW9uIiwiY3JlZGVudGlhbHMiOnsidXNlcm5hbWUiOiJhZ3JhY2lhbm8iLCJhcGlLZXkiOiJkZWZhdWx0X3B1YmxpYyJ9LCJnZXRGaWxsQ29sb3IiOnsiQEBmdW5jdGlvbiI6ImNvbG9yQ2F0ZWdvcmllcyIsImF0dHIiOiJ2YWNjaW5hdGVkIiwiZG9tYWluIjpbInRydWUiLCJmYWxzZSIsInVua25vd24iXSwiY29sb3JzIjpbWzEsMjU1LDI1NSw4MF0sWzE5NiwwLDE4NSw4MF0sWzIyNSwyMjUsMjI1LDgwXV19LCJwb2ludFJhZGl1c01pblBpeGVscyI6MSwic3Ryb2tlZCI6ZmFsc2UsImxpbmVXaWR0aE1pblBpeGVscyI6MSwiZ2V0TGluZUNvbG9yIjpbMjU1LDAsMjU1XSwicGlja2FibGUiOnRydWUsImJpbmFyeSI6dHJ1ZSwib25EYXRhRXJyb3IiOnsiQEBmdW5jdGlvbiI6Im9uRGF0YUVycm9yIn19XX0%3D&embed=true" title="COVID-19 vaccination process."></iframe> 

To see the whole story behind this use case, you can check out our [blogpost](https://carto.com/blog/visualizing-covid-19-vaccination-progress/) in which we explain the entire process carried out to allow this.

### United States roads by type

In this example we use a BigQuery public data set from the United States Census Bureau to visualize all the USA national roads. The visualization styling is given in terms of the RTTYP route type code.

This dataset can be produced in a very straighfroward way by executing the next procedure:

```sql
CALL cartobq.tiler.CREATE_TILESET(
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

### NYC growth

This examples shows in a very effective way the historical growth of New York City by means of the year of construction of its more than 800K buildings. The data have been obtained from the [MapPLUTO repository](https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page) of the NYC City planning.

```sql
CALL cartobq.tiler.CREATE_TILESET(
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