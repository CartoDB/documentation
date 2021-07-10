## Tilesets collection

Some of the spatial datasets offered in the Data Observatory are massive (a few TB), either due to their global coverage, such as [Worldpop](https://carto.com/spatial-data-catalog/browser/dataset/wp_population_e683f5e4/) or [NASADEM](https://carto.com/spatial-data-catalog/browser/dataset/nasa_nasadem_ec3517d7/), or their fine granularity, such as [ACS Sociodemographics](https://carto.com/spatial-data-catalog/browser/dataset/acs_sociodemogr_95c726f9/) at census block group level, and their visualization requires the creation of [tilesets](https://docs.carto.com/spatial-extension-bq/overview/tilesets/) using the [Spatial Extension for BigQuery](https://docs.carto.com/spatial-extension-bq/guides/tilesets/).

We have created a collection of ready-to-use Data Observatory tilesets from public datasets that are publicly available in the BigQuery project `carto-do-public-tilesets`.

Use the [gallery](#gallery) to browse examples of the types of visualizations you can achieve and the [catalog](#catalog) to find the location and characteristics of all available tilesets.

### Gallery

{{<grid>}}

{{<imageCard 
  url="https://public.carto.com/viewer/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjo2Ni4wNDM0MTA2NTE3ODIxNSwibG9uZ2l0dWRlIjotOTguNDIwMDMxNjQxNTc3ODUsInpvb20iOjIuNjMzNTY1NjkxNDg4NjAxNCwicGl0Y2giOjAsImJlYXJpbmciOjAsImRyYWdSb3RhdGUiOmZhbHNlLCJ3aWR0aCI6MTA1MSwiaGVpZ2h0Ijo4NTUsImFsdGl0dWRlIjoxLjUsIm1heFpvb20iOjIwLCJtaW5ab29tIjowLCJtYXhQaXRjaCI6NjAsIm1pblBpdGNoIjowLCJ0cmFuc2l0aW9uRHVyYXRpb24iOjAsInRyYW5zaXRpb25JbnRlcnJ1cHRpb24iOjF9LCJ2aWV3cyI6W3siQEB0eXBlIjoiTWFwVmlldyIsImNvbnRyb2xsZXIiOnRydWV9XSwibGF5ZXJzIjpbeyJAQHR5cGUiOiJDYXJ0b0JRVGlsZXJMYXllciIsImRhdGEiOiJjYXJ0by1kby1wdWJsaWMtdGlsZXNldHMuY2FuX3N0YXRpc3RpY3MuZGVtb2dyYXBoaWNzX3NvY2lvZGVtb2dyYXBoaWNzX2Nhbl9jZW5zdXNkaXZpc2lvbl8yMDE2XzV5cnNfMjAxNl90aWxlc2V0XzAwMCIsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoicHVibGljIiwiYXBpS2V5IjoiZGVmYXVsdF9wdWJsaWMifSwiZ2V0RmlsbENvbG9yIjp7IkBAZnVuY3Rpb24iOiJjb2xvckJpbnMiLCJhdHRyIjoicG9wdWxhdGlvbl9zcV9rbSIsImRvbWFpbiI6WzAsMC4xLDAuNSwyLDEwLDUwLDEwMCwyNTAsNTAwLDEwMDBdLCJjb2xvcnMiOiJFbXJsZCJ9LCJwb2ludFJhZGl1c01pblBpeGVscyI6Miwic3Ryb2tlZCI6ZmFsc2UsImxpbmVXaWR0aE1pblBpeGVscyI6MC4yLCJnZXRMaW5lQ29sb3IiOlsyNTUsMjU1LDI1NV0sInBpY2thYmxlIjp0cnVlLCJiaW5hcnkiOnRydWV9XX0%3D"
  target="_blank"
  image="/img/data-observatory/tilesets/can-statistics-sociodemographics-tileset.png" 
  title="Simple Point" 
  description="Simple example with a point layer.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozLjUwNDI3NzgzMTA3MDg0OSwibG9uZ2l0dWRlIjoyMC4yNzU4NjA1NTQ2NjIzNzYsInpvb20iOjIuOTI0NDE2MjU3NjI0MTUyNiwicGl0Y2giOjAsImJlYXJpbmciOjAsImRyYWdSb3RhdGUiOmZhbHNlLCJ3aWR0aCI6MTM0NCwiaGVpZ2h0Ijo5NTMsImFsdGl0dWRlIjoxLjUsIm1heFpvb20iOjIwLCJtaW5ab29tIjowLCJtYXhQaXRjaCI6NjAsIm1pblBpdGNoIjowLCJ0cmFuc2l0aW9uRHVyYXRpb24iOjAsInRyYW5zaXRpb25JbnRlcnJ1cHRpb24iOjF9LCJ2aWV3cyI6W3siQEB0eXBlIjoiTWFwVmlldyIsImNvbnRyb2xsZXIiOnRydWUsIm1hcFN0eWxlIjoiQEAjQ0FSVE9fQkFTRU1BUC5QT1NJVFJPTiJ9XSwibGF5ZXJzIjpbeyJAQHR5cGUiOiJDYXJ0b1NRTExheWVyIiwiZGF0YSI6Im5lXzUwbV9hZG1pbl8wX2JvdW5kYXJ5X2xpbmVzX2xhbmQiLCJjcmVkZW50aWFscyI6eyJ1c2VybmFtZSI6InB1YmxpYyIsImFwaUtleSI6ImRlZmF1bHRfcHVibGljIn0sInN0cm9rZWQiOnRydWUsImxpbmVXaWR0aE1pblBpeGVscyI6MiwiZ2V0TGluZUNvbG9yIjpbMjU1LDAsMjU1XSwicGlja2FibGUiOnRydWV9XX0%3D"
  target="_blank"
  image="/img/deck-gl/example-simple-lines.png" 
  title="Simple Line" 
  description="Simple example with a line layer.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjo1My4wNTM2NzI2MTMxNDYzNCwibG9uZ2l0dWRlIjoyMC44NTMxODg2MzU4NzU0MzMsInpvb20iOjMuNDc4Nzk2MTg5MTQ5ODE3NiwicGl0Y2giOjAsImJlYXJpbmciOjAsImRyYWdSb3RhdGUiOmZhbHNlLCJ3aWR0aCI6MTM0NCwiaGVpZ2h0Ijo5NTMsImFsdGl0dWRlIjoxLjUsIm1heFpvb20iOjIwLCJtaW5ab29tIjowLCJtYXhQaXRjaCI6NjAsIm1pblBpdGNoIjowLCJ0cmFuc2l0aW9uRHVyYXRpb24iOjAsInRyYW5zaXRpb25JbnRlcnJ1cHRpb24iOjF9LCJ2aWV3cyI6W3siQEB0eXBlIjoiTWFwVmlldyIsImNvbnRyb2xsZXIiOnRydWUsIm1hcFN0eWxlIjoiQEAjQ0FSVE9fQkFTRU1BUC5QT1NJVFJPTiJ9XSwibGF5ZXJzIjpbeyJAQHR5cGUiOiJDYXJ0b1NRTExheWVyIiwiZGF0YSI6Im5lXzUwbV9hZG1pbl8wX2NvdW50cmllcyIsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoicHVibGljIiwiYXBpS2V5IjoiZGVmYXVsdF9wdWJsaWMifSwiZ2V0RmlsbENvbG9yIjpbMTUwLDAsMTUwXSwic3Ryb2tlZCI6dHJ1ZSwibGluZVdpZHRoTWluUGl4ZWxzIjoxLCJnZXRMaW5lQ29sb3IiOls1MCw1MCw1MF0sInBpY2thYmxlIjp0cnVlfV19"
  target="_blank"
  image="/img/deck-gl/example-simple-polygon.png" 
  title="Simple Polygon" 
  description="Simple example with a polygon layer.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?data=cartobq.maps.osm_buildings&color_by_value=aggregated_total"
  target="_blank"
  image="/img/deck-gl/example-color-bins.png" 
  title="Color Bins" 
  description="Assigning colors to bins.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozNy45NjQ2NjQwODYzMzU0MDQsImxvbmdpdHVkZSI6LTkxLjYxMTYwNjk5NDA5OTQyLCJ6b29tIjo0LCJwaXRjaCI6MCwiYmVhcmluZyI6MCwiZHJhZ1JvdGF0ZSI6ZmFsc2UsIndpZHRoIjoxMzQ0LCJoZWlnaHQiOjk1MywiYWx0aXR1ZGUiOjEuNSwibWF4Wm9vbSI6MjAsIm1pblpvb20iOjAsIm1heFBpdGNoIjo2MCwibWluUGl0Y2giOjAsInRyYW5zaXRpb25EdXJhdGlvbiI6MSwidHJhbnNpdGlvbkludGVycnVwdGlvbiI6MX0sInZpZXdzIjpbeyJAQHR5cGUiOiJNYXBWaWV3IiwiY29udHJvbGxlciI6dHJ1ZSwibWFwU3R5bGUiOiJAQCNDQVJUT19CQVNFTUFQLlBPU0lUUk9OIn1dLCJsYXllcnMiOlt7IkBAdHlwZSI6IkNhcnRvQlFUaWxlckxheWVyIiwiZGF0YSI6ImNhcnRvZGItb24tZ2NwLXBtLXRlYW0uZGVtby5jb3VudGllc19wb3B1bGF0aW9uIiwiY3JlZGVudGlhbHMiOnsidXNlcm5hbWUiOiJwdWJsaWMiLCJhcGlLZXkiOiJkZWZhdWx0X3B1YmxpYyJ9LCJnZXRGaWxsQ29sb3IiOnsiQEBmdW5jdGlvbiI6ImNvbG9yQ2F0ZWdvcmllcyIsImF0dHIiOiJwb3BfY2F0IiwiZG9tYWluIjpbImxvdyIsIm1lZGl1bSIsImhpZ2giXSwiY29sb3JzIjoiUmVkT3IifSwicG9pbnRSYWRpdXNNaW5QaXhlbHMiOjIsInN0cm9rZWQiOmZhbHNlLCJsaW5lV2lkdGhNaW5QaXhlbHMiOjEsImdldExpbmVDb2xvciI6WzI1NSwwLDI1NV0sInBpY2thYmxlIjp0cnVlLCJiaW5hcnkiOnRydWV9XX0%3D"
  target="_blank"
  image="/img/deck-gl/example-color-categories.png" 
  title="Color Categories" 
  description="Assigning colors to categories.">}}

{{<imageCard 
  url="https://viewer.carto.com/user/public/bigquery?config=eyJkZXNjcmlwdGlvbiI6IkNhcnRvQlFUaWxlckxheWVyIGRlY2xhcmF0aXZlIGV4YW1wbGUiLCJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjozMCwibG9uZ2l0dWRlIjotMTAwLCJ6b29tIjozLCJwaXRjaCI6MCwiYmVhcmluZyI6MCwiZHJhZ1JvdGF0ZSI6ZmFsc2UsIndpZHRoIjo4NjQsImhlaWdodCI6NzczLCJhbHRpdHVkZSI6MS41LCJtYXhab29tIjoyMCwibWluWm9vbSI6MCwibWF4UGl0Y2giOjYwLCJtaW5QaXRjaCI6MCwidHJhbnNpdGlvbkR1cmF0aW9uIjowfSwidmlld3MiOlt7IkBAdHlwZSI6Ik1hcFZpZXciLCJjb250cm9sbGVyIjp0cnVlLCJtYXBTdHlsZSI6IkBAI0NBUlRPX0JBU0VNQVAuUE9TSVRST04ifV0sImxheWVycyI6W3siQEB0eXBlIjoiQ2FydG9CUVRpbGVyTGF5ZXIiLCJkYXRhIjoiY2FydG9icS5tYXBzLmFpc190aWxlc2V0IiwiY3JlZGVudGlhbHMiOnsidXNlcm5hbWUiOiJwdWJsaWMiLCJhcGlLZXkiOiJkZWZhdWx0X3B1YmxpYyJ9LCJnZXRGaWxsQ29sb3IiOnsiQEBmdW5jdGlvbiI6ImNvbG9yQ29udGludW91cyIsImF0dHIiOiJhZ2dyZWdhdGVkX3RvdGFsIiwiZG9tYWluIjpbMSwxMDAsMTAwMCwxMDAwMCw1MDAwMDBdLCJjb2xvcnMiOiJQZWFjaCJ9LCJwb2ludFJhZGl1c01pblBpeGVscyI6Miwic3Ryb2tlZCI6ZmFsc2UsInBpY2thYmxlIjp0cnVlfV19"
  target="_blank"
  image="/img/deck-gl/example-color-continuous.png" 
  title="Color Continuous" 
  description="Assigning a continuous color ramp.">}}

{{</grid>}}

### Catalog

All tilesets can be found in the BigQuery project `carto-do-public-tilesets`. The location column of the following table specifies the BigQuery dataset and table in the format `dataset.table`. Therefore, the full path of the tileset can be constructed by simply appending the project name, i.e. `carto-do-public-tilesets.dataset.table`.

| DO dataset   | Location         | Variables                                     | Tileset type | Example viz |
|------------------|--------------|----------------------------------------------------|----|---|
|     [Sociodemographics - Canada (Census Division) - Statistics Canada](https://carto.com/spatial-data-catalog/browser/dataset/carto-do-public-data.can_statistics.demographics_sociodemographics_can_censusdivision_2016_5yrs_2016)     | carto-do-public-tilesets.can_statistics.demographics_sociodemographics_can_censusdivision_2016_5yrs_2016_tileset_000       | d.c0001_t as population_2016, d.c0004_t as total_dwellings, d.c0006_t as population_sq_km              | Simple | [Example](https://public.carto.com/viewer/user/public/bigquery?config=eyJpbml0aWFsVmlld1N0YXRlIjp7ImxhdGl0dWRlIjo2Ni4wNDM0MTA2NTE3ODIxNSwibG9uZ2l0dWRlIjotOTguNDIwMDMxNjQxNTc3ODUsInpvb20iOjIuNjMzNTY1NjkxNDg4NjAxNCwicGl0Y2giOjAsImJlYXJpbmciOjAsImRyYWdSb3RhdGUiOmZhbHNlLCJ3aWR0aCI6MTA1MSwiaGVpZ2h0Ijo4NTUsImFsdGl0dWRlIjoxLjUsIm1heFpvb20iOjIwLCJtaW5ab29tIjowLCJtYXhQaXRjaCI6NjAsIm1pblBpdGNoIjowLCJ0cmFuc2l0aW9uRHVyYXRpb24iOjAsInRyYW5zaXRpb25JbnRlcnJ1cHRpb24iOjF9LCJ2aWV3cyI6W3siQEB0eXBlIjoiTWFwVmlldyIsImNvbnRyb2xsZXIiOnRydWV9XSwibGF5ZXJzIjpbeyJAQHR5cGUiOiJDYXJ0b0JRVGlsZXJMYXllciIsImRhdGEiOiJjYXJ0by1kby1wdWJsaWMtdGlsZXNldHMuY2FuX3N0YXRpc3RpY3MuZGVtb2dyYXBoaWNzX3NvY2lvZGVtb2dyYXBoaWNzX2Nhbl9jZW5zdXNkaXZpc2lvbl8yMDE2XzV5cnNfMjAxNl90aWxlc2V0XzAwMCIsImNyZWRlbnRpYWxzIjp7InVzZXJuYW1lIjoicHVibGljIiwiYXBpS2V5IjoiZGVmYXVsdF9wdWJsaWMifSwiZ2V0RmlsbENvbG9yIjp7IkBAZnVuY3Rpb24iOiJjb2xvckJpbnMiLCJhdHRyIjoicG9wdWxhdGlvbl9zcV9rbSIsImRvbWFpbiI6WzAsMC4xLDAuNSwyLDEwLDUwLDEwMCwyNTAsNTAwLDEwMDBdLCJjb2xvcnMiOiJFbXJsZCJ9LCJwb2ludFJhZGl1c01pblBpeGVscyI6Miwic3Ryb2tlZCI6ZmFsc2UsImxpbmVXaWR0aE1pblBpeGVscyI6MC4yLCJnZXRMaW5lQ29sb3IiOlsyNTUsMjU1LDI1NV0sInBpY2thYmxlIjp0cnVlLCJiaW5hcnkiOnRydWV9XX0%3D) | 