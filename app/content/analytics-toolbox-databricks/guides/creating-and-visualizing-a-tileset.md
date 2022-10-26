## Creating and visualizing a tileset

### Import sample data (optional)

In order to be able to reproduce the following guide, you can optionally import into your Databricks a sample table containing core demographic and environmental data, and POI aggregations by category unified in common geographic H3 support resolution 8.

To do so, please run the following Python script:

```python
%python
import pandas

df = pandas.read_csv("https://storage.googleapis.com/carto-analytics-toolbox-core/samples/derived_spatialfeatures_esp_h3res8_v1_yearly_v2_population.csv")

spark.createDataFrame(df).write.saveAsTable("carto.derived_spatialfeatures_esp_h3res8_v1_yearly_v2_population")
```

### Creating a tileset

As a CARTO Analytics Toolbox module, the Tiler's capabilities are available as procedures that can be executed directly from your **Databricks Notebooks**.

To check that your Databricks account has access to the Tiler, try running this query:


```sql
%sql
SELECT carto.VERSION_ADVANCED()
```

{{% bannerNote title="NOTE" type="note" %}}
Tiler is an advanced module in case of the Analytics Toolbox for Databricks, so it is not open source and requires a specific installation along with a contractual relationship with CARTO.
{{%/ bannerNote %}} 

If you run into any errors when running the query above, contact with our support.


Once you are all set to get access to the Tiler, creating a tileset is as easy as opening your Databricks Notebooks and running a code. In this case, we are going to create a [tileset](../../reference/tiler/) from a table that contains core demographic and environmental data, and POI aggregations by category unified in common geographic H3 support resolution 8:


```sql
%scala
import com.carto.analyticstoolbox.modules.tiler.create_spatial_index_tileset

// input values
val source = "carto.derived_spatialfeatures_esp_h3res8_v1_yearly_v2_population"
val target = "carto_dev_data.spatialfeatures_h3tiler_demo"
val options = """{"min_resolution": 0,
  "max_resolution": 4,
  "resolution": 8,
  "aggregation_resolution": 4,
  "spatial_index_column": "h3",
  "properties": {
    "population": {
        "formula":"sum(population)",
        "type":"Number"
    }
  }
}"""

// Execute tiler
create_spatial_index_tileset(source, target, options)
```

### Visualizing a tileset

#### From the CARTO Workspace

The CARTO Workspace offers access to the Data Explorer, where you will be able to preview your tilesets, and Builder, CARTO's state-of-the-art map making tool, where you will be able to style them, include them in your visualizations and share them.

##### Previewing tilesets from the Data Explorer

The Data Explorer offers a preview of your tilesets and displays their associated details and metadata, such as their size, number of records and statistics regarding the tile sizes per zoom level. Please refer to [this page](/carto-user-manual/data-explorer/introduction/) for more information regarding the Data Explorer.

<div style="text-align:center" >
<img src="/img/databricks-analytics-toolbox/guides/the_tileset_preview_data_explorer.png" alt="Tileset preview from the Data Explorer" style="width:100%">
</div>

##### Creating maps with tilesets using Builder

You can include tilesets as layers in your maps created with Builder. To do so, you have two options:

* use the _Create map_ option from the tileset preview page in the Data Explorer (see previous screenshot). This action will create a new map with your tileset as a its only layer.
* adding a layer to an existing map.

For the latter option, you simply need to follow these simple steps:

1. Click on the _Add source from_ button in Builder, that can be found at the bottom left of the screen.

<div style="text-align:center" >
<img src="/img/databricks-analytics-toolbox/guides/the_tileset_layer_choosing_connection.png" alt="Choosing connection to add tileset from" style="width:100%">
</div>

2. Choose the Databricks connection from where your tileset is accessible.
3. Browse your projects and datasets until you find your tileset in the data explorer tree.

<div style="text-align:center" >
<img src="/img/databricks-analytics-toolbox/guides/the_tileset_layer_choosing_tileset.png" alt="Choosing tileset to add as layer" style="width:100%">
</div>

4. Select your tileset. Your tileset will then be added as a layer.

<div style="text-align:center" >
<img src="/img/databricks-analytics-toolbox/guides/the_tileset_layer_loading.png" alt="Tileset added as layer" style="width:100%">
</div>

5. Style your tileset like any other layer in Builder. For more details on how to style your layers, please visit [this page](/carto-user-manual/maps/map-styles/).

<div style="text-align:center" >
<img src="/img/databricks-analytics-toolbox/guides/the_tileset_layer_styles.png" alt="Tileset added as layer and styled" style="width:100%">
</div>