## Working with geospatial data in Databricks

Databricks doesn't have native support for geospatial data types. That means not being able to store geospatial data as a geometry.

The CARTO Analytics Toolbox for Databricks provides geospatial capabilities through the functions it includes, but most of these functions expect geometry data as input, and return geometry data as output. 

How can we make them work when there is not a geometry data type available? This guide will help you with that. 

### Storing geospatial data

CARTO Maps API can work directly with geospatial data represented as <!-- [GeoJSON](https://geojson.org/), --> [WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) strings. 

That means you can preview your data in Data Explorer, load it in Builder to create maps and use it in your custom applications, if it's stored as a text string in any of those formats.

{{% bannerNote title="NOTE" type="tip" %}}
In order to preview your tables from Data Explorer, the column that contains the geometry string needs to be called `geom` or `geometry`
{{%/ bannerNote %}} 

<div style="text-align:center" >
  <img src="/img/databricks-analytics-toolbox/databricks-dataexplorer.png" alt="Preview geospatial data in your Data Explorer" style="width:100%">
</div>

<!-- ADD SCREENSHOT WHEN FIXED -->

### Spatial SQL with the Analytics Toolbox

As mentioned above, many the functions from the Analytics Toolbox expect a geometry data type as input. See the [SQL Reference](../../sql-reference/overview) to get more detailed information on each function.

If the geometries in your tables or files are stored as a GeoJSON, WKT or WKB string, they  need to be converted to the `Geometry` type to be used. The functions in the [Geometry Constructors](../../sql-reference/geometry-constructors/) section can help with that. 

For example, if we wanted to get the points that intersects with a specific bounding box, we can use this query: 

```sql
SELECT * FROM points
WHERE st_Intersects(
  st_geomfromWKT(geom),
  st_makeBBOX(-85.0, 30.0, -90.0, 40.0))
```

Since our points are stored as WKT strings in the `geom` column, we just need to create the geometry with `st_geomfromWKT(geom)`.

<div style="text-align:center" >
  <img src="/img/databricks-analytics-toolbox/databricks-builder-intersection.png" alt="Work with Spatial SQL in Builder" style="width:100%">
</div>

The map above shows a point layer and as an overlay, the intersection between that layer and the bounding box defined in the example query. 
