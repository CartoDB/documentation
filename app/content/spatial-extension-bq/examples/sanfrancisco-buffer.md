## San Francisco Buffer

### Creating buffer (ST_Buffer)

We are going to show how easy could be displaying buffers around geometries. For this example, we are going show the buffer of a San Francisco neighborhood.

```sql
SELECT bqcarto.transformations.ST_BUFFER(neighborhood_geom, 50, 'meters', 5) AS geo FROM `bigquery-public-data`.san_francisco_neighborhoods.boundaries WHERE neighborhood = "Financial District"
```

This query creates a buffer with a radius of 50 meters around San Francisco's Financial District by using `ST_BUFFER`. The number of steps could be modified in order to make the lines smoother if needed.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/2d9418b4-adc8-485a-ae86-f7d9fd95510d" title="San Francisco buffer."></iframe>

On this visualization you will see the Financial Disctrict (darker shape) and the buffer around it. Notice that buffers radius doesn't need to be necesarily positive numbers. Negatives numbers would generate a buffer on the interior of the district geomery.

Note: this visualization is made using Builder, where you can easily import your BigQuery data using our connector, but you can also create a quick visualization using [BigQuery Geo Viz](https://bigquerygeoviz.appspot.com). 

### Bikeshare stations in buffer

Now let's use the buffer as way of defining a bigger region around the Financial District of San Francisco and filtering some other geometries.

```sql
SELECT ST_GEOGPOINT(d2.longitude,d2.latitude) AS geo FROM `bigquery-public-data`.san_francisco_neighborhoods.boundaries d1,
`bigquery-public-data`.san_francisco.bikeshare_stations d2
WHERE d1.neighborhood = "Financial District" AND ST_CONTAINS(bqcarto.transformations.ST_BUFFER(d1.neighborhood_geom, 50, 'meters', 5), ST_GEOGPOINT(d2.longitude, d2.latitude))
```
This query uses the `ST_BUFFER` along with `ST_CONTAINS` in order to filter those bikeshare stations that are contained inside the buffered geometry.

On the next visualization you will see that only bikeshare stations (dots) contained in the buffer are displayed.

<iframe height=480px width=100% style='margin-bottom:20px' src="https://public.carto.com/builder/aca3efb9-c0dd-4dc1-9679-9f71a4632af3" title="US airports routes interpolation."></iframe>
