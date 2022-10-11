## Date Filter

The Date Filter in Builder allows to reduce the size of a data source by selecting a specific time range from a `date` or `timestamp` column in your data. 

It is available for dynamically tiled data sources, which basicall means tables bigger than 30MB and Custom SQL queries. Learn more about how different data sources are loaded in Builder [here](../performance-considerations).

### Adding a Date Filter

To add a date filter to your data source, you just need to click on the three dots on the data source's card and click on _'Add Date filter'_

 <p align="center">
  <img src="/img/cloud-native-workspace/maps/date-filter-add.png" />
</p>


After that, a new control will appear in the top-left corner of the map, next to the 'Address Search Bar'. Click on it and select a date range. After this, the map will be reinstantiated. 

 <p align="center">
  <img src="/img/cloud-native-workspace/maps/date-filter-picker.png" />
</p>

{{% bannerNote title="NOTE" type="note"%}}
If you are working with several data sources with a `date` or `timestamp` attribute, you can add the Date filter to each of them independently, and the Date selector UI will allow you to select a range for each one.
{{%/ bannerNote %}}

Know that after adding a Date Filter to your table data source, it will be automatically converted to a SQL Query of this kind: 

```sql
SELECT * FROM your_original_table
WHERE time > {{date_from}} AND time < {{date_to}}
```

Learn more about how to use the Date filter with custom SQL queries in the section below.


### Using parameters in your SQL queries

When working with custom SQL queries as data sources in Builder, the date filter works slightly different than described above: 

Imagine that you have a data source that aggregates data into an H3 grid, like this one: 

```sql
SELECT 
  carto.H3_FROMGEOGPOINT(geom, 10) AS h3,
  SUM(population) AS total_population,
  COUNT(*) AS num_features, 
  max(time) AS latest_time
FROM 
  points_10m
GROUP BY h3
```

The query above will produce an aggregated H3 grid, but it aggregates all of them into the grid, without allowing to filter based on the `time` column. 

When adding a Date filter to this data source, Builder will suggest a filter using parameters in a SQL comment, like:

```sql
SELECT 
  carto.H3_FROMGEOGPOINT(geom, 10) AS h3,
  SUM(population) AS total_population,
  COUNT(*) AS num_features,
  max(time) AS latest_time
FROM 
  points_10m
GROUP BY h3

/*
Use the {{date_from}} and {{date_to}} placeholders to enable filtering using the Date Picker control.
 For instance:
	WHERE time > {{date_from}} AND time < {{date_to}}
*/
```

This way, as an experienced SQL user, you can inject the filter in your SQL query in a way that makes sense for your data. In this example, it would be something like: 

```sql
SELECT 
  carto.H3_FROMGEOGPOINT(geom, 10) AS h3,
  SUM(population) AS total_population,
  COUNT(*) AS num_features,
  max(time) AS latest_time
FROM 
  points_10m
WHERE time > {{date_from}} AND time < {{date_to}}
GROUP BY h3
```

The parameters `{{date_from}}` and `{{date_to}}` will be translated to the start and end dates picked in the date selector and the aggregation will only be performed for the points that match the selected date range.

### Date filter in published maps

When publishing a map, you can also make the date selector available in the public version, enabling a deeper data exploration for viewer users.

Viewers of the public map (or colleagues from the same organization with a _Viewer_ role) will be able to select a date range in the UI, which will update the map's data layer accordingly. 

Check the [Publishing and sharing maps](../publishing-and-sharing-maps/#publishing-options) section in this documentation to learn more about this.

